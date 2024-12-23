"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required className="border" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required className="border" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <button type="button" onClick={() => router.push("/signup")}>Sign Up</button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}