// taskActions.tsx | A file for handling task actions such as creating, updating, editing, and deleting tasks
"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

// Create a new task
export async function createTask(input: string, userId: string) {
  if (!input.trim()) return;

  // Sends a query to the database to create a new task with the provided input and userId
  await prisma.task.create({
    data: {
      title: input,
      userId: userId,
    },
  });

  // Revalidate the home page after submission
  revalidatePath("/");
  // Revalidating the home page will ensure that the latest data is fetched from the database
}

// Update a task's status (completed or not)
export async function updateTask(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  // Find the task by its ID
  const task = await prisma.task.findUnique({
    where: {
      id: inputId,
    },
  });

  if (!task) {
    console.error("Task not found");
    return;
  }

  // Toggle
  const updatedTaskStatus = !task.isCompleted;

  // Sends a query to the database to update the task's status
  await prisma.task.update({
    where: {
      id: inputId,
    },
    data: {
      isCompleted: updatedTaskStatus,
    },
  });

  // Revalidate the home page after submission
  revalidatePath("/");

  return updatedTaskStatus;
}

// Edit a task's title
export async function editTask(formData: FormData) {
  const inputTitle = formData.get("newTitle") as string;
  const inputId = formData.get("inputId") as string;

  // Sends a query to the database to update the task's title with the provided new title input and ID
  await prisma.task.update({
    where: {
      id: inputId,
    },
    data: {
      title: inputTitle,
    },
  });

  // Revalidate the home page after submission
  revalidatePath("/");
}

// Delete a task
export async function deleteTask(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  // Sends a query to the database to delete the task with the provided ID
  await prisma.task.delete({
    where: {
      id: inputId,
    },
  });

  // Revalidate the home page after submission
  revalidatePath("/");
}