import { ListTodo, LayoutGrid, List } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

interface HeaderProps {
  viewMode: 'kanban' | 'list';
  onViewModeChange: (mode: 'kanban' | 'list') => void;
}

export const Header = ({ viewMode, onViewModeChange }: HeaderProps) => {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <ListTodo className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
              <p className="text-sm text-muted-foreground">Sistema Ágil de Gerenciamento</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border bg-background p-1">
              <Button
                variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('kanban')}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Kanban</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Lista</span>
              </Button>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
