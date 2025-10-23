import { storage } from '../../utils/storage';
import { Task } from '../../types/task';

// Mock simples que funciona em qualquer ambiente
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Só define no objeto global se window existir (evita erro no GitHub Actions)
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
} else {
  // Mock para ambiente Node.js (GitHub Actions)
  global.localStorage = mockLocalStorage as any;
}

describe('Storage Utilities', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
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

    expect(mockLocalStorage.setItem).toHaveBeenCalled();
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
        createdAt: new Date(),
      }
    ];

    // Simula que há dados no localStorage
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockTasks));

    const tasks = storage.getTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Tarefa Teste');
  });

  test('deve retornar array vazio quando não há dados no localStorage', () => {
    // Simula localStorage vazio
    mockLocalStorage.getItem.mockReturnValue(null);

    const tasks = storage.getTasks();

    expect(Array.isArray(tasks)).toBe(true);
  });
});
