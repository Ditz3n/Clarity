"use client";

import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { createTask } from "../../src/app/actions/taskActions.tsx";
import { FaPlus } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useSession } from "next-auth/react";

export const AddTask = () => {
  const { language } = useLanguage();
  const { data: session } = useSession();

  const createFormData = async (formData: FormData) => {
    const input = formData.get("input") as string;
    if (session?.user?.id) {
      await createTask(input, session.user.id);
    }
  };

  return (
    <Form
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto transition-max-width"
      action={createFormData}
    >
      <div className="flex items-center gap-4 text-gray-700">
        <Input
          name="input"
          type="text"
          placeholder={language === "en" ? "Add a task..." : "Tilføj en opgave..."}
        />
        <Button
          type="submit"
          text={<FaPlus />}
        />
      </div>
    </Form>
  );
}