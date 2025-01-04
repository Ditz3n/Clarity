"use client";
import { AddTask } from "./shared/AddTask";
import { Task } from "./shared/Task";
import { TaskType } from "@/types/taskType";
import Image from "next/image";
import Logo from "@/components/ui/Logo";
import { Button } from "./ui/Button";
import LanguageToggleTransition from "./LanguageToggleTransition";

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
  const username = session.user.email.split('@')[0];
  
    return (
      <div className="flex flex-1 flex-col items-center justify-between">
      <div className="w-full max-w-[1024px] mx-auto p-4 sm:p-6">
        <div className="bg-white dark:bg-[#272727] rounded-lg shadow-lg relative">
          <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
            {/* Main content wrapper */}
            <div className="flex flex-col md:flex-row md:space-x-6 lg:space-x-8 flex-1">
              {/* Left column - Logo, welcome message, and illustration */}
              <div className="w-full md:w-5/12 lg:w-1/2 flex flex-col mb-6 md:mb-0">
                <div className="mb-6">
                  <Logo />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-2">
                  <LanguageToggleTransition
                    transitionKey="home-welcome-back"
                    en="Welcome back, "
                    da="Velkommen tilbage, "
                  />
                    <span className="text-[#6C63FF] dark:text-[#fb923c]">{username}</span>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <LanguageToggleTransition
                      transitionKey="home-manage-tasks"
                      en="Manage your tasks and stay organized"
                      da="Administrer dine opgaver og forbliv organiseret"
                    />
                  </p>
                </div>
  
                {/* Image - Only show on md and larger screens */}
                <div className="hidden md:flex items-center justify-center flex-1 min-h-0">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/undraw_blooming.svg"
                      alt="Woman sitting among flowers illustration"
                      width={800}
                      height={600}
                      className="w-auto h-auto max-h-[calc(100vh-400px)] block dark:hidden transition-all duration-300 object-contain"
                      priority
                    />
                    <Image
                      src="/images/undraw_blooming_dark.svg"
                      alt="Woman sitting among flowers illustration"
                      width={800}
                      height={600}
                      className="w-auto h-auto max-h-[calc(100vh-400px)] hidden dark:block transition-all duration-300 object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
  
              {/* Right column - Tasks section */}
              <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col">
                {/* Add Task Component */}
                <div className="pb-4 border-b border-gray-200 dark:border-[#4d4d4d]">
                  <AddTask />
                </div>
  
                {/* Tasks List with adjusted height */}
                <div className="flex-1 min-h-0 mb-4 md:mb-0">
                  <div className="h-full overflow-y-auto pr-2 pb-2 pt-2">
                    <div className="space-y-3">
                      {tasks.map((task: TaskType) => (
                        <Task key={task.id} task={task} />
                      ))}
                    </div>
                  </div>
                </div>
  
                {/* Task Summary */}
                <div className="mt-auto pt-4 border-t mb-1 border-gray-200 dark:border-[#4d4d4d]">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <LanguageToggleTransition 
                      transitionKey="home-task-summary"
                      en={`${tasks.filter(t => t.isCompleted).length} of ${tasks.length} tasks completed`}
                      da={`${tasks.filter(t => t.isCompleted).length} af ${tasks.length} opgaver fuldført`}
                    />
                  </p>
                </div>
              </div>
            </div>
  
            {/* Buttons - Now outside the main content wrapper */}
            <div className="flex justify-end items-center space-x-4 border-t border-gray-200 dark:border-[#4d4d4d] pt-4">
              <Button variant="profile" />
              <Button variant="logout" />
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }