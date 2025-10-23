import { Edit2, Trash2, User } from 'lucide-react';
import { Task, TaskPriority } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const priorityConfig: Record<TaskPriority, { label: string; className: string; icon: string }> = {
  CRITICAL: { label: 'Crítica', className: 'bg-priority-critical-bg text-priority-critical border-priority-critical', icon: '🔥' },
  HIGH: { label: 'Alta', className: 'bg-priority-high-bg text-priority-high border-priority-high', icon: '⚡' },
  MEDIUM: { label: 'Média', className: 'bg-priority-medium-bg text-priority-medium border-priority-medium', icon: '📌' },
  LOW: { label: 'Baixa', className: 'bg-priority-low-bg text-priority-low border-priority-low', icon: '📋' },
};

const statusLabels = {
  TODO: 'A Fazer',
  IN_PROGRESS: 'Em Progresso',
  DONE: 'Concluído',
};

const statusColors = {
  TODO: 'bg-status-todo-bg text-status-todo border-status-todo',
  IN_PROGRESS: 'bg-status-progress-bg text-status-progress border-status-progress',
  DONE: 'bg-status-done-bg text-status-done border-status-done',
};

export const TaskTable = ({ tasks, onTaskClick, onDeleteTask }: TaskTableProps) => {
  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Título</TableHead>
            <TableHead className="w-[15%]">Responsável</TableHead>
            <TableHead className="w-[12%]">Prioridade</TableHead>
            <TableHead className="w-[12%]">Status</TableHead>
            <TableHead className="w-[13%]">Criada em</TableHead>
            <TableHead className="w-[13%]">Concluída em</TableHead>
            <TableHead className="w-[5%] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Nenhuma tarefa encontrada
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => {
              const priority = priorityConfig[task.priority];
              return (
                <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="text-foreground">{task.title}</div>
                      {task.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {task.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{task.responsible}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('border', priority.className)}>
                      <span className="mr-1">{priority.icon}</span>
                      {priority.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('border', statusColors[task.status])}>
                      {statusLabels[task.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(task.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(task.completedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskClick(task);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                            onDeleteTask(task.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
