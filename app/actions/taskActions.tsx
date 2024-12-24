"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../utils/prisma";

export async function createTask(input: string, userId: string) {
  if (!input.trim()) return;

  await prisma.task.create({
    data: {
      title: input,
      userId: userId,
    },
  });

  revalidatePath("/"); // Revalidate the home page after submission
}

export async function updateTask(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const task = await prisma.task.findUnique({
    where: {
      id: inputId,
    },
  });

  if (!task) {
    console.error("Task not found");
    return;
  }

  const updatedTaskStatus = !task.isCompleted;

  await prisma.task.update({
    where: {
      id: inputId,
    },
    data: {
      isCompleted: updatedTaskStatus,
    },
  });

  revalidatePath("/"); // Revalidate the home page after submission

  return updatedTaskStatus;
}

export async function editTask(formData: FormData) {
  const input = formData.get("newTitle") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.task.update({
    where: {
      id: inputId,
    },
    data: {
      title: input,
    },
  });

  revalidatePath("/"); // Revalidate the home page after submission
}

export async function deleteTask(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  await prisma.task.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/"); // Revalidate the home page after submission
}