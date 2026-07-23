# Tasks: Task Management

**Input**: 
- Feature Specification: `specs/001-task-management/spec.md`
- Implementation Plan: `specs/001-task-management/plan.md`
- Project Constitution: `Pivot/.specify/memory/constitution.md` (v1.1.0)
- UI Assets: `specs/001-task-management/assets/*.png`

**Prerequisites**:
- Angular CLI 22.0.7
- Node.js v26.4.0
- Tailwind CSS 4.3.3
- Angular Material configured with Azure Blue theme
- AXE accessibility toolkit

---

## Execution Strategy & Cadence

The agent must follow these strict operational rules:
1. **Atomic Execution**: Break the Implementation Roadmap into atomic, testable tasks.
2. **The Cycle**: For every task: Write test → Write implementation → Execute test (`ng test`) → Execute build (`ng build --configuration development`).
3. **Critical Halt**: Upon passing the test, the agent MUST halt execution, display `[WAITING FOR MANUAL VERIFICATION]`, and wait for the developer to commit/approve changes before initiating the next task.

---

## Phase 1: Setup & Constitutional Alignment

- [ ] T001 Verify baseline project structure and create any missing empty directories (`src/app/components`, `src/app/services`, `src/app/models`) according to the "Source Code" section of `./specs/001-task-management/plan.md`
- [X] T002 Check that the Angular project is initialized correctly with required dependencies ()
- [x] T003 [P] Configure linting and formatting tools (Done)

---

## Phase 2: Foundational Types & Models

- [ ] T004 [Halt & Verify] Generate the Task model interface strictly according to the "Model" section of `./specs/001-task-management/plan.md` in `./src/app/models/task.model.ts`

---

## Phase 3: Foundational Services

- [ ] T005 [Halt & Verify] Generate ErrorHandlingService strictly according to the "Services" section of `./specs/001-task-management/plan.md` in `./src/app/services/error-handling.service.ts`
- [ ] T006 [Halt & Verify] Generate StorageService strictly according to the "Services" section of `./specs/001-task-management/plan.md` in `./src/app/services/storage.service.ts`
- [ ] T007 [Halt & Verify] Generate TaskService strictly according to the "Services" section of `./specs/001-task-management/plan.md` in `./src/app/services/task.service.ts`

---

## Phase 4: Feature UI & Logic

- [ ] T008 [Halt & Verify] Generate TaskListComponent using standalone architecture in ./src/app/components/task-list/ and inject TaskService.
- [ ] T009 [Halt & Verify] Generate TaskModalComponent using standalone architecture in ./src/app/components/task-modal/.
- [ ] T010 [Halt & Verify] [Halt & Verify] Update TaskListComponent to implement the Search/Filter input field (UI) AND implement the real-time Title filtering logic using Angular Signals computed() (Logic).
- [ ] T011 [Halt & Verify] Update TaskListComponent to generate the Core Task Data Grid (MatTable) driven by custom Signals from TaskService. Wire up the inline Delete action icon to call TaskService.deleteTask.
- [ ] T012 [Halt & Verify] Update TaskListComponent to implement the MatSort table headers (UI) AND implement the column-based sorting logic using Angular Signals computed() (Logic).
- [ ] T013 [Halt & Verify] Update TaskListComponent to add the Pagination Footer (MatPaginator) and connect it to the grid data.
- [ ] T014 [Halt & Verify] Update TaskModalComponent to establish the baseline Add/Edit Modal layout using MatDialog, implement MAT_DIALOG_DATA state checking (Add vs Edit), and initialize the empty Reactive Form.
- [ ] T015 [Halt & Verify] Update TaskModalComponent to add the Title mat-input and the Verbose Datepicker (MatDatepicker) to the reactive form.
- [ ] T016 [Halt & Verify] Update TaskModalComponent to add the Category mat-select, Description textarea, and Status mat-select to the reactive form.
- [ ] T017 [Halt & Verify] Update TaskModalComponent to implement footer actions ("Cancel" and "Save Task"). Ensure "Save Task" is disabled if the form is invalid.
- [ ] T018 [Halt & Verify] Update TaskModalComponent to implement Signal-based form validation and reactive <mat-error> messaging for all required fields.
---

## Phase 5: Global Layout, Logic & Wiring

- [ ] T019 [Halt & Verify] Update ./src/app/app.component.html to implement the Global Navigation Bar, "Pivot" branding, and the central data card container. Explicitly embed <app-task-list> inside the container so the dashboard renders.
- [ ] T020 [Halt & Verify] Update app.component.ts and task-list.component.ts to implement MatDialog open/close handlers for adding tasks (from global nav) and editing tasks (from table action icons). Bind these handlers to the respective UI buttons created in earlier steps.

---

## Phase 6: Polish & Compliance

- [ ] T021 [Halt & Verify] Execute the full unit test suite in headless mode (`npx vitest run`) to validate signal-based components written with Angular Testing Library and ensure zero cross-component regressions.
- [ ] T022 [Halt & Verify] Run static code analysis and type-checking (`ng lint` or `tsc --noEmit`) to maintain project standards.
- [ ] T023 [Halt & Verify] Perform full AXE accessibility audit and remediate findings.
- [ ] T024 [Halt & Verify] Execute final `ng build --configuration production` and verify output size budgets.
- [ ] T025 [Halt & Verify] Final run of quickstart.md validation scenarios.