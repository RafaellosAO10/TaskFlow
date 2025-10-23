import { storage } from '../../utils/storage';
import { Task } from '../../types/task';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Storage Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve salvar e carregar tarefas do localStorage', () => {
    const mockTasks: Task[] = [
      { 
        id: '1', 
        title: 'Tarefa Teste', 
        description: 'Descrição de teste',
        status: 'TODO', 
        priority: 'MEDIUM', 
        responsible: 'Teste',
        createdAt: new Date(),
      }
    ];

    // Mock do localStorage retornando nossas tarefas
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks));

    const tasks = storage.getTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Tarefa Teste');
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
        createdAt: new Date(),
      }
    ];

    storage.saveTasks(mockTasks);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'taskflow_tasks',
      JSON.stringify(mockTasks)
    );
  });
});
