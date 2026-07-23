import '@angular/compiler';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Injector, runInInjectionContext, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let mockTaskService: any;
  let mockTasksSignal: ReturnType<typeof signal>;

  beforeEach(() => {
    mockTasksSignal = signal<Task[]>([
      { id: '1', title: 'Buy Groceries', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true, description: '' },
      { id: '2', title: 'Finish Report', category: 'Professional Development', dueDate: '2026-12-31', status: 'In Progress', isActive: true, description: '' }
    ]);

    mockTaskService = {
      getTasks: vi.fn().mockReturnValue(mockTasksSignal),
      deleteTask: vi.fn()
    };

    const injector = Injector.create({
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: MatDialog, useValue: { open: vi.fn() } }
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
    expect(component.tasks().length).toBe(2);
  });

  it('should filter tasks by title case-insensitively', () => {
    expect(component.filteredTasks().length).toBe(2);

    component.searchQuery.set('groceries');
    expect(component.filteredTasks().length).toBe(1);
    expect(component.filteredTasks()[0].title).toBe('Buy Groceries');

    component.searchQuery.set('REPORT');
    expect(component.filteredTasks().length).toBe(1);
    expect(component.filteredTasks()[0].title).toBe('Finish Report');

    component.searchQuery.set('Nonexistent');
    expect(component.filteredTasks().length).toBe(0);
    expect(component.paginatedTasks().length).toBe(0);
  });

  it('should call TaskService.deleteTask when deleteTask is called', () => {
    component.deleteTask('1');
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith('1');
  });

  it('should sort tasks when sortData is called', () => {
    component.sortData({ active: 'title', direction: 'asc' });
    expect(component.paginatedTasks()[0].title).toBe('Buy Groceries');
    expect(component.paginatedTasks()[1].title).toBe('Finish Report');
    
    // Reverse sort
    component.sortData({ active: 'title', direction: 'desc' });
    expect(component.paginatedTasks()[0].title).toBe('Finish Report');
    expect(component.paginatedTasks()[1].title).toBe('Buy Groceries');
  });

  it('should paginate tasks correctly', () => {
    component.pageSize.set(1);
    expect(component.paginatedTasks().length).toBe(1);
    expect(component.paginatedTasks()[0].title).toBe('Buy Groceries');

    component.handlePageEvent({ pageIndex: 1, pageSize: 1, length: 2 });
    expect(component.paginatedTasks().length).toBe(1);
    expect(component.paginatedTasks()[0].title).toBe('Finish Report');
  });
});
