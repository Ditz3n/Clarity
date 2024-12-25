"use client";

import { AddTask } from "./shared/AddTask";
import { Task } from "./shared/Task";
import { Footer } from "./ui/Footer";
import { Logout } from "./ui/Logout";
import { useLanguage } from "../context/LanguageContext";
import { TaskType } from "../types/taskType";
import { PageWrapper } from "./PageWrapper";

interface SessionType {
  user: {
    email: string;
  };
}

interface HomeContentProps {
  session: SessionType;
  tasks: TaskType[];
}

export default function HomeContent({ session, tasks }: HomeContentProps) {
  const { language } = useLanguage();
  const username = session.user.email.split('@')[0];

  return (
    <div className="flex flex-1 flex-col items-center justify-between">
      {/* Main content container with adjusted height */}
      <div className="w-full max-w-[1024px] h-[calc(100vh-120px)] mx-auto p-4 sm:p-6">
        <div className="bg-white dark:bg-[#272727] rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
          {/* Flex container with dynamic height */}
          <div className="flex flex-col md:flex-row md:space-x-6 lg:space-x-8 flex-1 min-h-0">
            {/* Left side content */}
            <div className="w-full md:w-5/12 lg:w-1/2 flex flex-col mb-6 md:mb-0">
              {/* Welcome section */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  {language === "en" ? "Welcome back, " : "Velkommen tilbage, "}
                  <span className="text-[#6C63FF] dark:text-[#fb923c]">{username}</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {language === "en"
                    ? "Manage your tasks and stay organized"
                    : "Administrer dine opgaver og forbliv organiseret"}
                </p>
              </div>

              {/* Illustration */}
              <div className="hidden md:flex flex-grow items-center justify-center">
                <img
                  src="/images/undraw_blooming.svg"
                  alt="Task management illustration"
                  className="w-full h-auto max-w-[250px] md:max-w-[300px] lg:max-w-md block dark:hidden"
                />
                <img
                  src="/images/undraw_blooming_dark.svg"
                  alt="Task management illustration"
                  className="w-full h-auto max-w-[250px] md:max-w-[250px] lg:max-w-md hidden dark:block"
                />
              </div>
            </div>

            {/* Right side / Main content area */}
            <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col min-h-0">
              {/* Add Task Component */}
              <div className="mb-6">
                <AddTask />
              </div>

              {/* Tasks List with adjusted height and scrolling */}
              <div className="flex-1 min-h-0">
                <div className="h-full overflow-y-auto pr-2">
                  <div className="space-y-3">
                    {tasks.map((task: TaskType) => (
                      <Task key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Task Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#4d4d4d]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? `${tasks.filter(t => t.isCompleted).length} of ${tasks.length} tasks completed`
                    : `${tasks.filter(t => t.isCompleted).length} af ${tasks.length} opgaver fuldført`}
                </p>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <div className="flex justify-center mt-6 pt-4 border-t border-gray-200 dark:border-[#4d4d4d]">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}