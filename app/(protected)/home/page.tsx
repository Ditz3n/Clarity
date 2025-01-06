// app/(protected)/home/page.tsx | The home page after logging in - A page for showing the user's tasks
import { getServerSession } from "next-auth"; // from next-auth
import { authConfig } from "@/lib/auth.config";
import HomeContent from "@/components/general/HomeContent";
import { prisma } from "@/lib/database/prisma";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import { Session } from "next-auth";

// Extend the Session type to include user id
interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
}

// Function to get tasks for the logged-in user
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
        { /* HomeContent component, which displays the home page content */ }
        { /* I had to do it this way because of the async function not letting me use the page directly */ }
        <HomeContent tasks={tasks} session={session} />
      </PageWrapper>
  );
}