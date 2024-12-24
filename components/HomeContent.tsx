"use client";

import { AddTask } from "./shared/AddTask";
import { Task } from "./shared/Task";
import { Footer } from "./ui/Footer";
import { Logout } from "./ui/Logout";
import { useLanguage } from "../context/LanguageContext";
import { TaskType } from "../types/taskType";

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
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center">
      {/* Protected content */}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl font-bold uppercase mb-5 mt-5 text-gray-700 dark:text-white">{language === "en" ? "Welcome back, " : "Velkommen tilbage, "}{username}!</h1>
        <AddTask />
        <div className="flex flex-col items-center gap-5 mt-10 w-[80%] max-w-xl h-96 overflow-y-auto px-4 pb-2 pt-2">
          {tasks.map((task: TaskType) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        <Logout />
      </div>
      <Footer />
    </div>
  );
}