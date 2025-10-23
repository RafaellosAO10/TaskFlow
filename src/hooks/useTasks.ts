import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, TaskFilters } from '@/types/task';
import { storage } from '../utils/storage'; 

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: 'ALL',
    priority: 'ALL',
  });

  // Load tasks from storage on mount
  useEffect(() => {
    const loadedTasks = storage.getTasks();
    setTasks(loadedTasks);
  }, []);

  // Save tasks to storage whenever they change
  useEffect(() => {
    if (tasks.length >= 0) {
      storage.saveTasks(tasks);
    }
  }, [tasks]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task;
      
      const updatedTask = { ...task, ...updates, updatedAt: new Date() };
      
      // If status changed to DONE, set completedAt
      if (updates.status === 'DONE' && task.status !== 'DONE') {
        updatedTask.completedAt = new Date();
      }
      // If status changed from DONE to something else, clear completedAt
      else if (updates.status && updates.status !== 'DONE' && task.status === 'DONE') {
        updatedTask.completedAt = undefined;
      }
      
      return updatedTask;
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    updateTask(id, { status });
  }, [updateTask]);

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.responsible.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'ALL' || task.status === filters.status;
    const matchesPriority = filters.priority === 'ALL' || task.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};
