// types/index.ts | A file for defining custom types and extending NextAuth types

// Task Types
export type TaskType = {
    id: string;
    title?: string | null;
    description?: string | null;  
    icon?: string | null;        
    isCompleted: boolean;
    createdAt?: Date;
};

// Auth Types
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user?: {
            id?: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        email: string;
        isVerified?: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
    }
}