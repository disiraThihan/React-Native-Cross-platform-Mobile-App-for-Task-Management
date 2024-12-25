export const TaskPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
} as const;
export type TaskPriority = keyof typeof TaskPriority;