"use client";

import { ChangeTask } from "./ChangeTask";
import { TaskType } from "../../types/taskType";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";
import { useState } from "react";

export const Task = ({ task }: { task: TaskType }) => {
  const [isEditing, setIsEditing] = useState(false);

  const taskStyle = {
    color: task.isCompleted === true ? "gray" : "black",
    opacity: task.isCompleted === true ? 0.5 : 1,
  };

  return (
    <div
  style={taskStyle}
  className={`w-full flex ${isEditing ? "flex-col gap-2 items-start" : "justify-between items-center"} bg-gray-100 dark:bg-[#272727] p-3 scroll-px-56 rounded-2xl shadow-md`}
>
  {!isEditing && <ChangeTask task={task} />}
  {!isEditing && (
    <span className="text-gray-700 dark:text-white text-lg font-bold uppercase">
      {task.title}
    </span>
  )}
  {!isEditing && (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {task.createdAt?.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  )}

  {/* Editing State */}
  {isEditing && (
    <div className="flex flex-col gap-2 w-full">
      <EditTask task={task} isEditing={isEditing} setIsEditing={setIsEditing} />
    </div>
  )}

  {/* Action Buttons */}
  {!isEditing && (
    <div className="flex items-center gap-5">
      <EditTask task={task} isEditing={isEditing} setIsEditing={setIsEditing} />
      <DeleteTask task={task} />
    </div>
  )}
</div>
  );
};