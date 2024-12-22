"use client";

import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { createFormData } from "../../src/app/actions/taskActions";
import { FaPlus } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export const AddTask = () => {
  const { language } = useLanguage();

  return (
    <Form className="w-1/2 m-auto" action={createFormData}>
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