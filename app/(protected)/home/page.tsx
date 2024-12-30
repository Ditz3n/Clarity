// /home page.tsx | The home page after logging in - A page for showing the user's tasks
import { getServerSession } from "next-auth"; // from next-auth
import { authConfig } from "@/lib/auth.config";
import HomeContent from "@/components/HomeContent";
import { prisma } from "@/lib/database/prisma";
import { PageWrapper } from "@/components/PageWrapper";
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
  const session = await getServerSession(authConfig) as CustomSession;

  // 2) Fetch tasks for the logged-in user
  const tasks = await getTasks(session.user.id);

  // 3) Return your UI
  return (
      <PageWrapper>
        <HomeContent tasks={tasks} session={session} />
      </PageWrapper>
  );
}