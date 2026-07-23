import '@angular/compiler';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Injector, runInInjectionContext, signal } from '@angular/core';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let mockTaskService: any;

  beforeEach(() => {
    mockTaskService = {
      getTasks: vi.fn().mockReturnValue(signal<Task[]>([]))
    };

    const injector = Injector.create({
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    });

    runInInjectionContext(injector, () => {
      component = new TaskListComponent();
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks from TaskService on init', () => {
    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.tasks()).toEqual([]);
  });
});
