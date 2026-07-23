import { StorageService } from './storage.service';
import { ErrorHandlingService } from './error-handling.service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Task } from '../models/task.model';
import { Injector, runInInjectionContext } from '@angular/core';

describe('StorageService', () => {
  let service: StorageService;
  let mockErrorService: any;
  let mockStorage: { [key: string]: string };

  beforeEach(() => {
    mockStorage = {};
    mockErrorService = {
      logError: vi.fn()
    };

    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => mockStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => { mockStorage[key] = value; }),
    });

    const injector = Injector.create({
      providers: [
        { provide: ErrorHandlingService, useValue: mockErrorService }
      ]
    });

    runInInjectionContext(injector, () => {
      service = new StorageService();
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should load tasks from localStorage', () => {
    const tasks: Task[] = [{ id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', description: '', isActive: true }];
    mockStorage['pivot_tasks'] = JSON.stringify(tasks);
    
    const loaded = service.loadTasks();
    expect(loaded).toEqual(tasks);
  });

  it('should return empty array if no tasks found', () => {
    const loaded = service.loadTasks();
    expect(loaded).toEqual([]);
  });

  it('should save tasks to localStorage', () => {
    const tasks: Task[] = [{ id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', description: '', isActive: true }];
    service.saveTasks(tasks);
    
    expect(mockStorage['pivot_tasks']).toBe(JSON.stringify(tasks));
  });

  it('should catch JSON parse errors and return empty array', () => {
    mockStorage['pivot_tasks'] = 'invalid json';
    const loaded = service.loadTasks();
    
    expect(loaded).toEqual([]);
    expect(mockErrorService.logError).toHaveBeenCalledWith(
      'StorageService',
      expect.any(Error),
      expect.anything()
    );
  });
});
