// types/taskType.ts
export type TaskType = {
    id: string;
    title?: string | null;
    description?: string | null;  
    icon?: string | null;        
    isCompleted: boolean;
    createdAt?: Date;
};