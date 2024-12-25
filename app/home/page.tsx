import { getServerSession } from "next-auth"; // from next-auth
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import HomeContent from "../../components/HomeContent";
import { prisma } from "../../utils/prisma";
import { PageWrapper } from "../../components/PageWrapper";
import { Session } from "next-auth";

// Extend the Session type to include user id
interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email: string; // Make email non-optional
    image?: string | null;
  };
}

async function getTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  // 1) Server-side session check
  const session = await getServerSession(authOptions) as CustomSession;
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2) Fetch tasks for the logged-in user
  const tasks = await getTasks(session.user.id);

  // 3) Return your UI
  return (
    <ProtectedRoute>
      <PageWrapper>
        <HomeContent tasks={tasks} session={session} />
      </PageWrapper>
    </ProtectedRoute>
  );
}