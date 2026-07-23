import '@angular/compiler';
import { TaskModalComponent } from './task-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { describe, it, expect, beforeEach } from 'vitest';
import { Injector, runInInjectionContext } from '@angular/core';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;

  describe('Add Mode', () => {
    beforeEach(() => {
      const injector = Injector.create({
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: null }
        ]
      });

      runInInjectionContext(injector, () => {
        component = new TaskModalComponent();
      });
    });

    it('should create in Add Mode when data is null', () => {
      expect(component).toBeTruthy();
      expect(component.isEditMode).toBe(false);
    });
  });

  describe('Edit Mode', () => {
    beforeEach(() => {
      const injector = Injector.create({
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { id: '1', title: 'Test Task' } }
        ]
      });

      runInInjectionContext(injector, () => {
        component = new TaskModalComponent();
      });
    });

    it('should create in Edit Mode when data is provided', () => {
      expect(component).toBeTruthy();
      expect(component.isEditMode).toBe(true);
    });
  });
});
