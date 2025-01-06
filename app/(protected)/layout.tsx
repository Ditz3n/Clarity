// app/(protected)/layout.tsx | A layout component for protected pages, which guides the user to the login page if they are not authenticated
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth.config";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  // if the user is not authenticated, redirect them to the login page, else render the children (the protected page(s))
  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}