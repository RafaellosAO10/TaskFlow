import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import { Header } from '@/components/Header';
import { Filters } from '@/components/Filters';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskTable } from '@/components/TaskTable';
import { TaskModal } from '@/components/TaskModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'kanban' | 'list';

const Index = () => {
  const { tasks, filters, setFilters, addTask, updateTask, deleteTask, updateTaskStatus } = useTasks();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  // Load view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('taskflow_view_mode') as ViewMode;
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode to localStorage
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('taskflow_view_mode', mode);
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
      toast({
        title: "Tarefa atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      addTask(taskData as Omit<Task, 'id' | 'createdAt'>);
      toast({
        title: "Tarefa criada",
        description: "A nova tarefa foi adicionada com sucesso.",
      });
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsModalOpen(false);
      toast({
        title: "Tarefa excluída",
        description: "A tarefa foi removida com sucesso.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {viewMode === 'kanban' ? 'Quadro Kanban' : 'Lista de Tarefas'}
            </h2>
            <p className="text-muted-foreground mt-1">
              Gerencie suas tarefas de forma ágil e eficiente
            </p>
          </div>
          <Button onClick={handleCreateTask} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Nova Tarefa
          </Button>
        </div>

        <div className="mb-6">
          <Filters filters={filters} onFiltersChange={setFilters} />
        </div>

        {viewMode === 'kanban' ? (
          <KanbanBoard
            tasks={tasks}
            onTaskClick={handleTaskClick}
            onTaskStatusChange={updateTaskStatus}
            onCreateTask={handleCreateTask}
          />
        ) : (
          <TaskTable
            tasks={tasks}
            onTaskClick={handleTaskClick}
            onDeleteTask={deleteTask}
          />
        )}
      </main>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={selectedTask ? handleDeleteTask : undefined}
      />
    </div>
  );
};

export default Index;
