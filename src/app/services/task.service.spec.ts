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
      loadTasks: vi.fn().mockReturnValue([]),
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
    expect(service.getTasks()()).toEqual([]);
  });

  it('should add a task and save to storage', () => {
    const task: Task = { id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true };
    service.addTask(task);
    
    expect(service.getTasks()()).toEqual([task]);
    expect(mockStorageService.saveTasks).toHaveBeenCalledWith([task]);
  });

  it('should update a task and save to storage', () => {
    const task: Task = { id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true };
    service.addTask(task);
    
    const updatedTask: Task = { ...task, title: 'Updated Title' };
    service.updateTask(updatedTask);
    
    expect(service.getTasks()()).toEqual([updatedTask]);
    expect(mockStorageService.saveTasks).toHaveBeenCalledWith([updatedTask]);
  });

  it('should perform a soft delete', () => {
    const task: Task = { id: '1', title: 'Test', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true };
    service.addTask(task);
    
    service.deleteTask('1');
    
    const tasks = service.getTasks()();
    expect(tasks.length).toBe(1);
    expect(tasks[0].isActive).toBe(false); // soft delete verification
    expect(mockStorageService.saveTasks).toHaveBeenCalled();
  });
});
