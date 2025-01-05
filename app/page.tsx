// app/page.tsx | A page for redirecting to the /login page when opening the application
import { redirect } from "next/navigation";

export default async function RootPage() {
  redirect("/login");
}