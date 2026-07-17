# Pivot Project Overview

This is a to-do app that displays a list of to-do task items. It enables a user to add a new task, edit a task, and delete a task. Each task has a status assigned to it. Statuses are New, In Progress, Rejected, Verified, Completed, Features. 

## Data Persistence

The application uses localStorage to save state between sessions, therefore no need to connect to a database. 

## Architecture

This is a decoupled design (using an interface3), and service-based architecture allows for future integration with a real database very easily.

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
