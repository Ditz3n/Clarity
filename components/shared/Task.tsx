"use client";

import { ChangeTask } from "./ChangeTask";
import { TaskType } from "../../types/taskType";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";
import { useState, useEffect, useRef } from "react";

export const Task = ({ task }: { task: TaskType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const padding = 24; // 12px padding * 2
        const newHeight = contentRef.current.scrollHeight + padding;
        setHeight(newHeight);
      }
    };

    updateHeight();
    const timer = setTimeout(updateHeight, 200);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateHeight);
    });
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    if (outerRef.current) {
      resizeObserver.observe(outerRef.current);
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [isEditing]);

  const taskStyle = {
    color: task.isCompleted ? "gray" : "black",
    opacity: task.isCompleted ? 0.5 : 1,
  };

  return (
    <div
  ref={outerRef}
  style={{
    ...taskStyle,
    minHeight: height ? `${height}px` : 'auto',
    maxHeight: height ? `${height}px` : 'none',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden'
  }}
  className="w-full bg-gray-100 dark:bg-[#272727] p-3 rounded-2xl shadow-md transition-all duration-300"
>
      <div
        ref={contentRef}
        className="flex flex-col gap-0 md:flex-row md:justify-between md:items-center transition-all duration-300"
      >
        <div className="flex items-center w-full md:w-auto">
          {!isEditing && (
            <span className="text-gray-700 dark:text-white text-lg font-bold uppercase break-words">
              {task.title}
            </span>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
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
          {isEditing && (
            <div className="flex flex-col gap-2 w-full">
              <EditTask
                task={task}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
          )}
          {!isEditing && (
            <div className="flex items-center gap-5">
              <ChangeTask task={task} />
              <EditTask
                task={task}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <DeleteTask task={task} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};