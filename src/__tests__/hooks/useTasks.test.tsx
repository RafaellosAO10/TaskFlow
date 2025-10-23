import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../../hooks/useTasks';

// Mock do storage ANTES de tudo
jest.mock('../../utils/storage', () => {
  const mockStorage = {
    getTasks: jest.fn(() => []),
    saveTasks: jest.fn(),
  };
  return { storage: mockStorage };
});

// Agora importamos o mock
import { storage } from '../../utils/storage';

describe('useTasks Hook', () => {
  beforeEach(() => {
    (storage.getTasks as jest.Mock).mockClear();
    (storage.saveTasks as jest.Mock).mockClear();
    (storage.getTasks as jest.Mock).mockReturnValue([]);
  });

  test('deve carregar tarefas iniciais', () => {
    (storage.getTasks as jest.Mock).mockReturnValue([
      {
        id: '1',
        title: 'Tarefa Existente',
        description: 'Descrição',
        status: 'TODO',
        priority: 'MEDIUM',
        responsible: 'Teste',
        createdAt: new Date(),
      }
    ]);

    const { result } = renderHook(() => useTasks());
    
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Tarefa Existente');
  });

  test('deve adicionar uma nova tarefa', () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.addTask({
        title: 'Nova tarefa de teste',
        description: 'Descrição da tarefa',
        status: 'TODO',
        priority: 'MEDIUM',
        responsible: 'Testador',
      });
    });

    // Verifica se saveTasks foi chamado
    expect(storage.saveTasks).toHaveBeenCalled();
    
    // Verifica se a tarefa foi adicionada ao estado
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Nova tarefa de teste');
  });
});