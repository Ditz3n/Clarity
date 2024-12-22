"use client";
import { editTask } from "@/app/actions/taskActions";
import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TaskType } from "../../types/taskType";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";

export const EditTask = ({ task } : { task: TaskType }) => {

  const [EditTask, setEditTask] = useState(false);

  const handleEdit = () => {
    if (task.isCompleted === true) {
      return;
    }
    setEditTask(!EditTask);
  };

  const handleSubmit = () => {
    setEditTask(false);
  };

  return (
    <div className="flex items-center gap-5">
      <Button
        onClick={handleEdit}
        text={<BiEdit />}
        actionButton
      />
    
      {EditTask ? (
        <Form
          action={editTask}
          onSubmit={handleSubmit}
        >
          <Input
            name="inputId"
            type="hidden"
            value={task.id}
          />
        <div className="flex justify-center">
          <Input
            name="newTitle"
            type="text"
            placeholder="Edit task..."
          />
          <Button
            type="submit"
            text="Save"
          />
        </div>
        </Form>
      ) : null}

    </div>
  );
}
