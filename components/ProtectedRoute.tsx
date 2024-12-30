// components/ProtectedRoute.tsx | A component for protecting routes from unauthenticated users
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status } = useSession(); // Omit 'session' since it isn't used
  const router = useRouter();

  useEffect(() => {
    // User != logged in -> always redirect to /login
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
