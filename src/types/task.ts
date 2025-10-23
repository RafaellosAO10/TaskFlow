export type TaskPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  responsible: string;
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
}

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'ALL';
  priority: TaskPriority | 'ALL';
}
