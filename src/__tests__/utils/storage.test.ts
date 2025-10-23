import { storage } from '../../utils/storage';
import { Task } from '../../types/task';

// Mock global do localStorage que FUNCIONA
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Aplica o mock GLOBALMENTE
Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

describe('Storage Utilities', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  test('deve salvar tarefas no localStorage', () => {
    const mockTasks: Task[] = [
      { 
        id: '1', 
        title: 'Tarefa Teste', 
        description: 'Descrição',
        status: 'TODO', 
        priority: 'MEDIUM', 
        responsible: 'Teste',
        createdAt: new Date('2024-10-23'),
      }
    ];

    storage.saveTasks(mockTasks);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'taskflow_tasks',
      JSON.stringify(mockTasks)
    );
  });

  test('deve carregar tarefas do localStorage quando existem dados', () => {
    const mockTasks: Task[] = [
      { 
        id: '1', 
        title: 'Tarefa Teste', 
        description: 'Descrição de teste',
        status: 'TODO', 
        priority: 'MEDIUM', 
        responsible: 'Teste',
        createdAt: new Date('2024-10-23'),
      }
    ];

    // Pré-popula o localStorage
    mockLocalStorage.setItem('taskflow_tasks', JSON.stringify(mockTasks));

    const tasks = storage.getTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Tarefa Teste');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('taskflow_tasks');
  });

  test('deve retornar array vazio quando não há dados no localStorage', () => {
    const tasks = storage.getTasks();
    expect(Array.isArray(tasks)).toBe(true);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('taskflow_tasks');
  });
});
