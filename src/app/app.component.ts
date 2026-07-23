import { Component, signal } from '@angular/core';

import { TaskListComponent } from './components/task-list/task-list.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('Pivot');
}
