import { AddTask } from "../../components/shared/AddTask";
import { prisma } from "../../utils/prisma";
import { Task } from "../../components/shared/Task";

// This function is used to get the tasks from the database and order them by the date they were created descending.
async function getTasks() {
  const tasks = await prisma.tasks.findMany({
    select: {
      id: true,
      title: true,
      isCompleted: true,
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
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <span className="text-3xl font-extrabold uppercase text-gray-800">
        Clarity
      </span>
      <h1 className="text-2xl font-bold uppercase mb-5">
        Next.js 15.1.2 + TypeScript 4.5.4 + Tailwind CSS 3.0.10
      </h1>
      <div className="flex flex-col justify-center items-center w-[100%] max-w-[80%]">
        <AddTask />
      </div>
      <div className="flex flex-col gap-5 mt-10 w-[80%] max-w-xl">
        {tasks.map((task) => (
          <div key={task.id} className="flex justify-between items-center w-1/2">
            <Task task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
