// types/taskType.ts | Type definition for TaskType
export type TaskType = {
    id: string;
    title?: string | null;
    isCompleted: boolean;
    createdAt?: Date;
};