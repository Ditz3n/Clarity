"use client";

import { editTask } from "@/app/actions/taskActions";
import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TaskType } from "../../types/taskType";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa"; // Importing a checkmark icon from react-icons
import { useLanguage } from "@/context/LanguageContext";

export const EditTask = ({ task, isEditing, setIsEditing }: { task: TaskType, isEditing: boolean, setIsEditing: (isEditing: boolean) => void }) => {
  const { language } = useLanguage();
  const [newTitle, setNewTitle] = useState(task.title || "");
  const [warning, setWarning] = useState("");

  const handleEdit = () => {
    if (task.isCompleted === true) {
      return;
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!newTitle?.trim()) {
      e.preventDefault();
      setWarning(language === "en" ? "Title cannot be blank" : "Titlen kan ikke være tom");
      return;
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    if (warning) {
      setWarning("");
    }
  };

  return (
    <div className="flex items-center gap-5 justify-end w-full">
      <Button
        onClick={handleEdit}
        text={<BiEdit />}
        actionButton
      />
    
      {isEditing ? (
        <Form
          action={editTask}
          onSubmit={handleSubmit}
          className="flex items-center gap-2 w-full justify-end"
        >
          <Input
            name="inputId"
            type="hidden"
            value={task.id}
          />
          <Input
            name="newTitle"
            type="text"
            value={newTitle}
            onChange={handleInputChange}
            placeholder={language === "en" ? "Edit task" : "Rediger opgave"}
          />

          <Button
            type="submit"
            actionButton
            text={<FaCheck />} // Adding the checkmark icon
          />
          {warning && <span className="text-red-500 text-sm text-center font-medium">{warning}</span>}
        </Form>
      ) : null}
    </div>
  );
};