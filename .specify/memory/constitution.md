
# Pivot Constitution

## Core Principles

### I. Angular Standalone and Signals-First Architecture
Focus on using modern Angular (v22+) standards, using signals for local component state and
derived state via `computed()`. Standalone components are default; developers must not set
`standalone: true` or `changeDetection: ChangeDetectionStrategy.OnPush` explicitly inside Angular
decorators. Legacy decorator properties must be replaced with the `input()` and `output()` functions
to maintain consistent signals-based data flow. Never use `mutate` on signals; use `set` or
`update` to preserve state predictability and clean change tracking.

### II. Component & Template Discipline
Keep components small and strictly focused on a single responsibility. Prefer inline templates
for small components. Native control flow (`@if`, `@for`, `@switch`) MUST be used instead of
traditional directives (`*ngIf`, `*ngFor`, `*ngSwitch`). Avoid setting dynamic styles/classes
via legacy directives (`ngClass`, `ngStyle`); use native `class` and `style` bindings instead.
All external template/style paths must be relative to the component file, and templates must not
assume the availability of global objects (such as `new Date()`).

### III. Service and Dependency Injection Standards
Design all services around a single responsibility, and expose singletons using the standard
`providedIn: 'root'` option. For new singleton services in Angular v22+, prefer the modern
`@Service` decorator over `@Injectable({providedIn: 'root'})`. Developers MUST use the modern
`inject()` function instead of constructor injection for managing dependencies cleanly and
uniformly.

### IV. Signal & Reactive Forms Discipline
When building forms, prefer Signal Forms (`@angular/forms/signals`) which are stable in Angular
v22+, as they provide signal-based state, type-safe field access, and schema-based validation.
If Signal Forms are not suitable for a specific requirement, developers MUST use standard
Reactive Forms instead of template-driven forms.

### V. Accessibility (A11y) & Strict TypeScript Quality
The application MUST pass all AXE accessibility checks and strictly adhere to WCAG AA minimum
standards, including active focus management, color contrast, and proper ARIA attributes.
Write strict TypeScript: enable strict type checking, avoid the `any` type (prefer `unknown`
when uncertain), and utilize type inference when obvious. Use `NgOptimizedImage` for all static
images except inline base64 images.

## Decoupled Architecture and Storage Constraints
The application is designed using a decoupled, service-based architecture (using an interface3
approach) to allow future integration with real databases very easily. All state data is
persisted client-side using `localStorage`. No external database connection is required for normal
operation.

## Testing and Quality Gates
Unit testing is performed using the Vitest test runner. Execute unit tests with `ng test` to ensure
correct behavior. Any modifications or additions of components, services, or forms must be
accompanied by comprehensive unit tests. Build and code formatting checks (e.g., using Prettier)
must pass cleanly prior to code merge or production build.

## Governance
This constitution is the supreme authority for development practices on the Pivot project. All code
contributions, pull requests, and peer reviews must verify compliance with these principles.
Any introduction of complexity (such as new external libraries, custom state patterns, or
architectural layers) must be thoroughly justified. Developers should refer to `README.md` and
`.claude/CLAUDE.md` for daily runtime guidance. Amendments to this constitution must be documented,
increment the constitution version, and be ratified by project maintainers.

**Version**: 1.0.0 | **Ratified**: 2026-07-18 | **Last Amended**: 2026-07-18
