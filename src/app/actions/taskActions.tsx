"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../utils/prisma";

export async function createFormData(formData: FormData) {
  const input = formData.get("input") as string;
  
  if (!input.trim()) return;

  await prisma.tasks.create({
    data: {
      title: input,
    },
  });

  revalidatePath("/"); // Revalidate the home page after submission
}

export async function updateTask(formData: FormData) {
  const inputId = formData.get("inputId") as string
  const task = await prisma.tasks.findUnique({
    where: {
      id: inputId
    }
  })

  if (!task) {
    console.error("Task not found");
    return;
  }
    

  const updatedTaskStatus = !task?.isCompleted;
  
  
  await prisma.tasks.update({
    where: {
      id: inputId
    },
    data: {
      isCompleted: updatedTaskStatus
    }
  })

  revalidatePath("/"); // Revalidate the home page after submission

  return updatedTaskStatus;
}