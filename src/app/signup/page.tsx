"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function SignUpPage() {
  const router = useRouter();
    const { language } = useLanguage();

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
    
    const response = await fetch("/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Account created successfully → redirect to login
      router.push("/login");
    } else {
      // Handle errors (e.g., user already exists)
      const data = await response.json();
      alert(data.error || {language} === "en" ? "An error occurred" : "Der skete en fejl");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleCreateAccount} className="space-y-4">
        <div>
          <label htmlFor="email">{language === "en" ? "Email" : "Email"}</label>
          <input type="email" name="email" required className="border" />
        </div>
        <div>
          <label htmlFor="password">{language === "en" ? "Password" : "Adgangskode"}</label>
          <input type="password" name="password" required className="border" />
        </div>
        <button type="submit">{language === "en" ? "Create Account" : "Opret konto"}</button>
      </form>
    </div>
  );
}