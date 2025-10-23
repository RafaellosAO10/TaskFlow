import { Task } from '@/types/task';

const STORAGE_KEY = 'taskflow_tasks';

export const storage = {
  getTasks: (): Task[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const tasks = JSON.parse(data);
      // Convert date strings back to Date objects
      return tasks.map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error loading tasks from storage:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
    }
  },
};
