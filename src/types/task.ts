export const TASK_STATUSES = {
    ALL: "all",
    COMPLETED: "completed",
    ACTIVE: "active",
  } as const;
  
export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES];