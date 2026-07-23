export interface Task {
  id: string;
  title: string;
  category: 'Personal' | 'Professional Development' | 'Finance' | 'Health';
  dueDate: string;
  description?: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Rejected' | 'Verified';
  isActive: boolean;
}
