import { storage } from '../../utils/storage';
import { Task, TaskPriority, TaskStatus } from '../../types/task';

describe('Storage Utilities', () => {
  test('deve ter os métodos saveTasks e getTasks definidos', () => {
    expect(storage.saveTasks).toBeDefined();
    expect(storage.getTasks).toBeDefined();
    expect(typeof storage.saveTasks).toBe('function');
    expect(typeof storage.getTasks).toBe('function');
  });

  test('getTasks deve sempre retornar um array', () => {
    const tasks = storage.getTasks();
    expect(Array.isArray(tasks)).toBe(true);
  });

  test('saveTasks deve executar sem erros com dados válidos', () => {
    const mockTasks: Task[] = [
      { 
        id: '1', 
        title: 'Tarefa Teste', 
        description: 'Descrição',
        status: 'TODO' as TaskStatus, 
        priority: 'MEDIUM' as TaskPriority, 
        responsible: 'Teste',
        createdAt: new Date(),
      }
    ];

    // Testa se a função executa sem lançar erro
    expect(() => {
      storage.saveTasks(mockTasks);
    }).not.toThrow();
  });
});
