"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

interface CreateTaskData {
  title: string;
  description: string;
  icon: string;
}

interface UpdateData {
  title?: string;
  description?: string | null;
  icon?: string | null;
}

export async function createTask(data: CreateTaskData, userId: string) {
  const title = data.title?.trim();
  const description = data.description?.trim();
  const icon = data.icon;

  if (!title) return;

  try {
    await prisma.task.create({
      data: {
        title,
        description: description || null,
        icon: icon || null,
        userId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
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

// Edit a task
export async function editTask(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const inputTitle = formData.get("newTitle") as string;
  const inputIcon = formData.get("newIcon") as string;

  const updateData: UpdateData = {};
  
  // Only include fields that are present in the formData
  if (inputTitle) updateData.title = inputTitle;
  if (inputIcon) updateData.icon = inputIcon;

  // Sends a query to the database to update the task
  await prisma.task.update({
    where: {
      id: inputId,
    },
    data: updateData,
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

// Update a task's description
export async function updateTaskDescription(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const description = formData.get("description") as string;

  await prisma.task.update({
    where: {
      id: inputId,
    },
    data: {
      description: description || null,
    },
  });

  revalidatePath("/");
}

// Update a task's icon
export async function updateTaskIcon(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const icon = formData.get("icon") as string;

  await prisma.task.update({
    where: {
      id: inputId,
    },
    data: {
      icon: icon || null,
    },
  });

  revalidatePath("/");
}