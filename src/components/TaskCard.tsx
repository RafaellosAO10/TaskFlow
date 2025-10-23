import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, User, AlertCircle } from 'lucide-react';
import { Task, TaskPriority } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const priorityConfig: Record<TaskPriority, { label: string; className: string; icon: string }> = {
  CRITICAL: { label: 'Crítica', className: 'bg-priority-critical-bg text-priority-critical border-priority-critical', icon: '🔥' },
  HIGH: { label: 'Alta', className: 'bg-priority-high-bg text-priority-high border-priority-high', icon: '⚡' },
  MEDIUM: { label: 'Média', className: 'bg-priority-medium-bg text-priority-medium border-priority-medium', icon: '📌' },
  LOW: { label: 'Baixa', className: 'bg-priority-low-bg text-priority-low border-priority-low', icon: '📋' },
};

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priority = priorityConfig[task.priority];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group cursor-pointer rounded-lg border bg-card p-4 transition-all hover:shadow-md',
        isDragging && 'opacity-50 shadow-lg ring-2 ring-primary'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <button
          className="cursor-grab touch-none text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 active:cursor-grabbing"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-5 w-5" />
        </button>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-2">{task.title}</h3>
            <Badge variant="outline" className={cn('shrink-0 border', priority.className)}>
              <span className="mr-1">{priority.icon}</span>
              {priority.label}
            </Badge>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          )}
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{task.responsible}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
