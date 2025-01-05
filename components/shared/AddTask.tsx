// components/shared/AddTask.tsx | A component for adding a new task
"use client";
import { useState } from "react";
import { createTask } from "@/lib/database/taskActions";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import NewTaskModal from "../modals/NewTaskModal";
import { Button } from "../ui/Button";
import { FaPlus } from "react-icons/fa";
import LanguageToggleTransition from "@/components/themes_and_language/LanguageToggleTransition";

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const AddTask = () => {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = async (data: { title: string; description: string; icon: string }) => {
    if (!session?.user?.id) {
      console.error('No user session found');
      return;
    }

    try {
      // Ensure we have all required data before calling createTask
      const taskData = {
        title: data.title.trim(),
        description: data.description.trim(),
        icon: data.icon,
        userId: session.user.id
      };

      await createTask(taskData, session.user.id);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <>
      <Button
        className="flex items-center justify-between gap-2 w-full px-4" 
        onClick={() => setIsModalOpen(true)}
      >
        <span>
          <LanguageToggleTransition
            en="Add a new task"
            da="Tilføj en ny opgave"
          />
        </span> 
        <FaPlus /> 
      </Button>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </>
  );
};