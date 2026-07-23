import { TaskService } from './task.service';
import { StorageService } from './storage.service';
import { ErrorHandlingService } from './error-handling.service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Task } from '../models/task.model';
import { Injector, runInInjectionContext } from '@angular/core';

describe('TaskService', () => {
  let service: TaskService;
  let mockStorageService: any;
  let mockErrorService: any;

  beforeEach(() => {
    mockStorageService = {
      // Mock existing tasks to bypass the seeding logic in tests
      loadTasks: vi.fn().mockReturnValue([{ id: '99', title: 'Existing Task', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true }]),
      saveTasks: vi.fn()
    };
    mockErrorService = {
      logError: vi.fn()
    };

    const injector = Injector.create({
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        { provide: ErrorHandlingService, useValue: mockErrorService }
      ]
    });

    runInInjectionContext(injector, () => {
      service = new TaskService();
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should load initial tasks from storage', () => {
    expect(mockStorageService.loadTasks).toHaveBeenCalled();
    expect(service.getTasks()().length).toBe(1);
  });

  it('should add a task and save to storage', () => {
    const task: Task = { id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true };
    service.addTask(task);
    
    const tasks = service.getTasks()();
    expect(tasks.length).toBe(2);
    expect(mockStorageService.saveTasks).toHaveBeenCalledWith(tasks);
  });

  it('should update a task and save to storage', () => {
    const task: Task = { id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true };
    service.addTask(task);
    
    const updatedTask: Task = { ...task, title: 'Updated Title' };
    service.updateTask(updatedTask);
    
    const tasks = service.getTasks()();
    expect(tasks.find(t => t.id === '1')?.title).toBe('Updated Title');
    expect(mockStorageService.saveTasks).toHaveBeenCalledWith(tasks);
  });

  it('should perform a soft delete', () => {
    const task: Task = { id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true };
    service.addTask(task);
    
    service.deleteTask('1');
    
    const tasks = service.getTasks()();
    expect(tasks.find(t => t.id === '1')?.isActive).toBe(false); // soft delete verification
    expect(mockStorageService.saveTasks).toHaveBeenCalled();
  });

  it('should seed dummy data if storage is empty', () => {
    // Override the mock to return empty array
    mockStorageService.loadTasks.mockReturnValue([]);
    
    const injector = Injector.create({
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        { provide: ErrorHandlingService, useValue: mockErrorService }
      ]
    });

    let newService: TaskService;
    runInInjectionContext(injector, () => {
      newService = new TaskService();
    });

    const tasks = newService.getTasks()();
    expect(tasks.length).toBe(10); // 10 dummy tasks seeded
    expect(mockStorageService.saveTasks).toHaveBeenCalledWith(tasks);
  });
});
