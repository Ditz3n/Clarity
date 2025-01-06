// components/shared/Task.tsx | A component for displaying a task (The task card on the /home page)
import { useState, useRef } from "react";
import { TaskType } from "../../types";
import ShowTaskModal from "../modals/ShowTaskModal";
import LanguageToggleTransition from "@/components/themes_and_language/LanguageToggleTransition";
import { icons } from "@/constants/Icons";

export const Task = ({ task }: { task: TaskType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Task card styling
  const taskStyle = {
    opacity: task.isCompleted ? 0.6 : 1,
    transition: 'all 0.3s ease-in-out',
  };

  // Localized placeholder
  const placeholderTitle = <LanguageToggleTransition en="No title provided" da="Ingen titel tilføjet" />;

  // Ensure task properties are safe to use
  const safeTask = {
    ...task,
    title: task.title || "", // Set to empty string if title is empty
    description: task.description || "", // Set to empty string if description is empty
    icon: task.icon || undefined,
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        style={taskStyle}
        className={`w-full bg-gray-100 dark:bg-[#272727] p-4 rounded-2xl shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-[#323232] ${
          task.isCompleted ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-white'
        }`}
      >
        <div
          ref={contentRef}
          className="flex items-center justify-between w-full"
        >
          <div className="flex-1">
            <span className={`text-lg font-bold break-words ${
              task.isCompleted ? 'line-through' : ''
            }`}>
              {task.title ? task.title : placeholderTitle}
            </span>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              <LanguageToggleTransition 
                en={(task.createdAt ?? new Date()).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                da={(task.createdAt ?? new Date()).toLocaleString('da-DK', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              />
            </div>
          </div>
          {safeTask.icon && (
            <>
              {icons.map((iconObj) => {
                if (Object.values(iconObj.name.props).includes(safeTask.icon!)) {
                  return (
                    <iconObj.icon
                      key={iconObj.name.props.en}
                      className={`h-6 w-6 ml-4 ${task.isCompleted ? 'opacity-60' : ''} ${iconObj.color}`}
                    />
                  );
                }
                return null;
              })}
            </>
          )}
        </div>
      </div>

      <ShowTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={safeTask}
      />
    </>
  );
};