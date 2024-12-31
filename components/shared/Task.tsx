import { useState, useRef } from "react";
import { TaskType } from "../../types/taskType";
import ShowTaskModal from "../ui/modals/ShowTaskModal";
import LanguageToggleTransition from "@/components/LanguageToggleTransition";
import { icons } from "@/components/shared/Icons";

export const Task = ({ task }: { task: TaskType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const taskStyle = {
    color: task.isCompleted ? "gray" : "black",
    opacity: task.isCompleted ? 0.5 : 1,
  };

  // Ensure task properties match ShowTaskModalProps
  const safeTask = {
    ...task,
    title: task.title ?? "", // Default to empty string if null or undefined
    description: task.description ?? undefined, // Convert null to undefined
    icon: task.icon ?? undefined, // Convert null to undefined
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        style={{
          ...taskStyle,
          transition: 'all 0.3s ease-in-out',
        }}
        className="w-full bg-gray-100 dark:bg-[#272727] p-4 rounded-2xl shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-[#323232]"
      >
        <div
          ref={contentRef}
          className="flex items-center justify-between w-full"
        >
          <div className="flex-1">
            <span className="text-gray-700 dark:text-white text-lg font-bold break-words">
              {safeTask.title}
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
                      className={`h-6 w-6 ml-4 ${iconObj.color}`}
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