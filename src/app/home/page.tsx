import { getServerSession } from "next-auth"; // from next-auth
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";
import HomeContent from "../../../components/HomeContent";
import { prisma } from "../../../utils/prisma";

async function getTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  // 1) Server-side session check
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  // 2) Fetch tasks for the logged-in user
  const tasks = await getTasks(session.user.id as string);

  // 3) Return your UI
  return (
    <ProtectedRoute>
      <HomeContent tasks={tasks} session={session} />
    </ProtectedRoute>
  );
}