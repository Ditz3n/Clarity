import { AddTask } from "../../components/shared/AddTask";
import { prisma } from "../../utils/prisma";
import { Task } from "../../components/shared/Task";
import { TaskType } from '../../types/taskType';
import { Footer } from "../../components/ui/Footer"; // Import Footer component

// This function is used to get the tasks from the database and order them by the date they were created descending.
async function getTasks() {
  const tasks = await prisma.tasks.findMany({
    select: {
      id: true,
      title: true,
      isCompleted: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks;
}

const Home = async () => {
  const tasks = await getTasks();

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center bg-white dark:bg-[#212121] transition-colors duration-300">
      <div className="flex flex-col items-center w-full">
        <span className="text-3xl font-extrabold uppercase text-gray-800 dark:text-gray-200 text-center w-full">
          Clarity
        </span>
        <h1 className="text-2xl font-bold uppercase mb-5 text-gray-800 dark:text-gray-200 text-center w-full">
          Next.js 15.1.2 + TypeScript 4.5.4 + Tailwind CSS 3.0.10
        </h1>
        <div className="flex flex-col justify-center items-center w-[100%] max-w-[80%]">
          <AddTask />
        </div>
        <div className="flex flex-col items-center gap-5 mt-10 w-[80%] max-w-xl h-96 overflow-y-auto px-4 pb-2 pt-2">
          {tasks.map((task: TaskType) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
      <Footer /> {/* Add Footer component */}
    </div>
  );
};

export default Home;