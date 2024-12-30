"use client";

import { editTask } from "../../lib/database/taskActions";
import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TaskType } from "../../types/taskType";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importing a checkmark icon from react-icons
import { useLanguage } from "../../context/LanguageContext";

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

  // In EditTask.tsx
return (
  <div className="flex items-center w-full">
    {!isEditing && (
      <Button
        onClick={handleEdit}
        text={<BiEdit />}
        actionButton
      />
    )}
    
    {isEditing && (
      <Form
        action={editTask}
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="flex items-center gap-4">
          <Button
            onClick={handleEdit}
            text={<FaTimes />}
            actionButton
          />
          
          <div className="flex-1">
            <Input
              name="inputId"
              type="hidden"
              value={task.id}
              onChange={() => {}}
              placeholder=""
            />
            <Input
              name="newTitle"
              type="text"
              value={newTitle}
              onChange={handleInputChange}
              placeholder={language === "en" ? "Edit task" : "Rediger opgave"}
              className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#1e1e1e] dark:hover:border-[#4d4d4d]"
            />
          </div>

          <Button
            type="submit"
            actionButton
            text={<FaCheck />}
          />
        </div>
        
        {warning && (
          <div className="text-red-500 text-sm text-center font-medium mt-2">
            {warning}
          </div>
        )}
      </Form>
    )}
  </div>
);
}