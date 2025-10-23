import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Plus, ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskStatusChange: (taskId: string, status: TaskStatus) => void;
  onCreateTask: () => void;
}

const columns: { id: TaskStatus; title: string; icon: typeof ListTodo; className: string }[] = [
  { id: 'TODO', title: 'A Fazer', icon: ListTodo, className: 'border-status-todo' },
  { id: 'IN_PROGRESS', title: 'Em Progresso', icon: Clock, className: 'border-status-progress' },
  { id: 'DONE', title: 'Concluído', icon: CheckCircle2, className: 'border-status-done' },
];

const DroppableColumn = ({ 
  id, 
  children, 
  isOver 
}: { 
  id: string; 
  children: React.ReactNode; 
  isOver: boolean;
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-1 space-y-3 rounded-lg border-2 border-dashed bg-muted/20 p-4 min-h-[400px] transition-colors",
        isOver && "border-primary bg-primary/5"
      )}
    >
      {children}
    </div>
  );
};

export const KanbanBoard = ({ tasks, onTaskClick, onTaskStatusChange, onCreateTask }: KanbanBoardProps) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? over.id.toString() : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const task = tasks.find(t => t.id === active.id);
      // Check if we're over a column (status)
      const targetStatus = columns.find(col => col.id === over.id)?.id;
      
      if (task && targetStatus && task.status !== targetStatus) {
        onTaskStatusChange(task.id, targetStatus);
      }
    }
    
    setActiveTask(null);
    setOverId(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
    setOverId(null);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          const Icon = column.icon;
          const isOver = overId === column.id;
          
          return (
            <div key={column.id} className="flex flex-col">
              <div className={cn(
                "mb-4 rounded-lg border-2 bg-card p-4",
                column.className
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <h3 className="font-semibold">{column.title}</h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {columnTasks.length}
                    </span>
                  </div>
                  {column.id === 'TODO' && (
                    <Button
                      size="sm"
                      onClick={onCreateTask}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <SortableContext
                items={columnTasks.map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <DroppableColumn id={column.id} isOver={isOver}>
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => onTaskClick(task)}
                    />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                      Nenhuma tarefa
                    </div>
                  )}
                </DroppableColumn>
              </SortableContext>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 scale-105 opacity-90">
            <TaskCard task={activeTask} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
