# Data Model: Task Management

## Task Entity

```typescript
export interface Task {
  id: string;
  title: string;
  category: 'Personal' | 'Finance' | 'Health' | 'Professional Development';
  dueDate: Date;
  description: string;
  status: 'New' | 'In Progress' | 'Rejected' | 'Verified' | 'Completed';
  order: number;
  isActive: boolean;
}
```

## Validation Rules
- `title`: MUST not be empty.
- `dueDate`: MUST be a valid future or present date.
- `status` and `category`: MUST be one of the specified enum values.
- `description` is optional

