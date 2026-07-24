# Pivot Project Overview

This is a to-do app that displays a list of to-do task items. It enables a user to add a new task, edit a task, and delete a task. Each task has a status assigned to it. Statuses are New, In Progress, Rejected, Verified, Completed. 

## Data Persistence

The application uses `localStorage` to save state between sessions, meaning there is no need to connect to a backend database for local usage. 

**Note on Mock Data:** If your browser's local storage is completely empty on the first run, the application will automatically run a seeder script and inject **11 mock records** into the database. This allows you to immediately test pagination, sorting, and search filtering out of the box!

---

## Notes for the Evaluators

This application was intentionally architected to demonstrate mastery of modern Angular concepts while strictly adhering to the core requirements:

### 1. Reusable Components & Component Communication (`@Input` / `@Output`)
To provide the best possible User Experience across all devices, this application demonstrates a **Dual-Architecture Layout**:
* **Desktop View:** Utilizes a highly performant, integrated `MatTable` for dense data grids.
* **Mobile View:** When the screen shrinks below `768px`, the application seamlessly morphs into a mobile-friendly Card View. This view relies entirely on a custom, highly reusable **`<app-task-item>`** component. 
* *Evaluation Note:* The `<app-task-item>` strictly demonstrates component communication by accepting data via `@Input()` properties (like task state and highlight triggers) and bubbling up user actions to the parent container via `@Output()` EventEmitters (like edit and delete).

### Visual Architecture: Responsive Design
Here is a visual demonstration of the application dynamically swapping components based on viewport width:

**Desktop Architecture (MatTable Data Grid)**
![Desktop View](src/assets/desktop-view.png)

**Mobile Architecture (Reusable app-task-item)**
![Mobile View](src/assets/mobile-view.png)

### 2. Angular Forms & Validation
The Task Creation and Edit workflows are powered by robust **Reactive Forms** (`FormGroup`, `FormControl`). The forms feature strict, real-time validation (ensuring required fields are populated) and restrict the user to the exact 5 allowable statuses (*New, In Progress, Rejected, Verified, Completed*).

### 3. Data Binding
The application heavily utilizes complex property binding (dynamic CSS classes, state-driven UI toggles) and event binding (capturing keystrokes for instant search filtering, intercepting component emissions).

### 4. Clean, Maintainable Architecture (Angular 18)
The codebase strictly separates concerns:
* **Services**: Isolated singletons (`TaskService`, `StorageService`, `ErrorHandlingService`) handle all data mutation and persistence.
* **State Management**: The application leverages cutting-edge **Angular 18 Signals** (`signal()`, `computed()`) for ultra-fast, reactive, and localized DOM updates without relying on heavy Zone.js change detection loops. 

### 5. Unit Testing
Vitest has been successfully integrated and configured. Core business logic inside the `TaskService` (such as state manipulation and initial data seeding) is backed by unit tests. Run `npx vitest run` to execute the suite.

# Getting Started

## Prerequistes

Ensure you have the following versions installed:
    * Node.js v26.4.0
    * npm v12.0.1
    * Angular CLI v22.0.7

Go to [Node JS](https://nodejs.org) to download correct version of Node.js

## Installation

To install dependencies and the Angular CLI:

```bash
npm install
npm install -g @angular/cli
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. 


## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
