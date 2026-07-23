# Feature Specification: Task Management

**Feature Branch**: `task-management`
**Status**: Draft

## Input
We need a simple interface for users to effectively track, organize, and manage their daily tasks. 
- When the project loads, the user is taken to the list view.
- The user can see previously created tasks and a "Create" button.
- The user can click an edit (pencil) icon to open an Edit modal, or a trash can icon to delete a task.
- Modals (Create/Edit) must include: Title (String), Category (Enum), Due Date (Date), Description (String), Status (Enum).
- Modal interactions: Save (success message "successfully saved the task") or Cancel (modal disappears).
- Delete interaction: "successfully deleted task" message. (Note: Delete is a soft-delete).
- List view features: 
    - Text box at the top of the grid for searching/filtering by Title.
    - Header row with upward/downward arrows for sorting columns.

## User Scenarios

### US1: View and Search Tasks (Priority: P1)
*The user can view, filter, and sort their existing task inventory.*

- **Given** the app is loaded, **When** the user views the task grid, **Then** they see all active tasks.
- **Given** the task grid, **When** the user types in the Title search box, **Then** the list filters to match the query.
- **Given** the task grid, **When** the user clicks the Up/Down arrows in the header, **Then** the column sorts accordingly.

### US2: Manage Tasks (Priority: P1)
*The user can create, update, and remove tasks.*

- **Given** the user clicks "Create", **When** the modal opens and they fill out all fields, **Then** they can Save to persist the task.
- **Given** an existing task, **When** the user clicks the pencil icon, **Then** the Edit modal opens pre-populated with task data.
- **Given** a task, **When** the user clicks the trash icon, **Then** the task is soft-deleted and a success message appears.

## Requirements

### Functional Requirements
- **FR-001**: System MUST display a list view as the default entry point.
- **FR-002**: System MUST allow searching the "Title" column via a text input.
- **FR-003**: System MUST provide sortable columns via Up/Down arrow indicators in the header.
- **FR-004**: Create and Edit actions MUST trigger a modal interface.
- **FR-005**: Modal fields MUST be: Title (String), Category (Enum), Due Date (String - ISO 8601 Format), Description (String), Status (Enum).
- **FR-006**: Save/Cancel operations MUST close the modal and return to the list view.
- **FR-007**: System MUST display a "successfully saved the task" message upon saving.
- **FR-008**: System MUST perform a "Soft Delete" (setting `isActive` to false) and display "successfully deleted task" upon clicking the trash icon.
- **FR-009**: Title, Category, Due Date, and Status MUST be mandatory; show error messages if invalid.
- **FR-010**: Save button MUST be disabled until all mandatory fields are valid.

## Key Entities
- **Task**: { 
    id: string, 
    title: string, 
    category: enum ('Personal' | 'Work' | 'Finance' | 'Health'), 
    dueDate: string, 
    description: string, 
    status: enum ('New' | 'In Progress' | 'Completed' | 'Rejected' | 'Verified'), 
    isActive: boolean 
  }

### Non-Functional Requirements
- **NFR-001**: All styling must use Tailwind CSS.
- **NFR-002**: UI must use Angular Material components.
- **NFR-003**: State management must utilize Angular Signals.
- **NFR-004**: Persistence must use browser `localStorage`.
- **NFR-005**: Application must remain accessible (AXE checks).

