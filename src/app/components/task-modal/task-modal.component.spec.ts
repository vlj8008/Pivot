import '@angular/compiler';
import { TaskModalComponent } from './task-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Injector, runInInjectionContext } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;

  describe('Add Mode', () => {
    beforeEach(() => {
      const injector = Injector.create({
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: null },
          { provide: MatDialogRef, useValue: { close: vi.fn() } },
          FormBuilder
        ]
      });

      runInInjectionContext(injector, () => {
        component = new TaskModalComponent();
      });
    });

    it('should create in Add Mode when data is null', () => {
      expect(component).toBeTruthy();
      expect(component.isEditMode).toBe(false);
      expect(component.taskForm.get('title')?.value).toBe('');
      expect(component.taskForm.get('category')?.value).toBe('');
      expect(component.taskForm.get('description')?.value).toBe('');
      expect(component.taskForm.get('status')?.value).toBe('New');
    });
  });

  describe('Edit Mode', () => {
    beforeEach(() => {
      const injector = Injector.create({
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { id: '1', title: 'Test Task' } },
          { provide: MatDialogRef, useValue: { close: vi.fn() } },
          FormBuilder
        ]
      });

      runInInjectionContext(injector, () => {
        component = new TaskModalComponent();
      });
    });

    it('should create in Edit Mode when data is provided', () => {
      expect(component).toBeTruthy();
      expect(component.isEditMode).toBe(true);
      expect(component.taskForm.get('title')?.value).toBe('Test Task');
    });
  });
});
