"use client";
import { useState } from "react";
import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { createTask } from "../../lib/database/taskActions";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import AnimatedPlaceholderInput from "../AnimatedPlaceholderInput";

// Extend the Session type to include user id
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
  const [inputvalue, setInputValue] = useState("");

  const createFormData = async (formData: FormData) => {
    const input = formData.get("input") as string;
    if (session?.user?.id) {
      await createTask(input, session.user.id);
      setInputValue("");
    }
  };

  return (
    <Form
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto transition-max-width"
      action={createFormData}
    >
      <div className="flex items-center gap-4 text-gray-700">
        <AnimatedPlaceholderInput
          name="input"
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholderEn="Add a task"
          placeholderDa="Tilføj en opgave"
          className="w-full shadow-sm h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#1e1e1e] dark:hover:border-[#4d4d4d]"
        />
        <Button
          type="submit"
          text={<FaPlus />}
        />
      </div>
    </Form>
  );
}