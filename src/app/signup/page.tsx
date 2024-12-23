"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SignupPage = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(language === "en" ? "Passwords do not match" : "Adgangskoderne matcher ikke");
      return;
    }

    const response = await fetch("/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      setError(data.error || (language === "en" ? "An error occurred" : "Der skete en fejl"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#212121]">
      <div className="w-[1024px] h-[600px] p-8 flex bg-white dark:bg-[#272727] rounded-lg shadow-lg">
        {/* Left side - Illustration */}
        <div className="w-1/2 pr-8 flex items-center justify-center">
          <img 
            src="/images/undraw_woman_nxse.svg"
            alt="Woman using computer illustration"
            className="w-full h-auto max-w-md block dark:hidden"
          />
          <img 
            src="/images/undraw_woman_nxse_light.svg"
            alt="Woman using computer illustration"
            className="w-full h-auto max-w-md hidden dark:block"
          />
        </div>

        {/* Right side - Form Container */}
        <div className="w-1/2 flex flex-col justify-center">
          <div className="h-[450px] flex flex-col">
            {/* Header Section - Fixed Height */}
            <div className="h-[100px]">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {language === "en" ? "Create Account" : "Opret konto"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "en" 
                  ? "Join our platform by creating your account. Fill in your details below."
                  : "Tilmeld dig vores platform ved at oprette din konto. Udfyld dine oplysninger nedenfor."}
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleCreateAccount} className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#1e1e1e] dark:hover:border-[#4d4d4d]"
                    placeholder="johndoe@gmail.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {language === "en" ? "Password" : "Adgangskode"}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#1e1e1e] dark:hover:border-[#4d4d4d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {language === "en" ? "Confirm Password" : "Bekræft adgangskode"}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#1e1e1e] dark:hover:border-[#4d4d4d]"
                  />
                </div>

                {error && (
                  <div className="text-red-500 dark:text-red-400 text-sm">{error}</div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                  >
                    {language === "en" ? "Create Account" : "Opret konto"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#1e1e1e] dark:hover:border-[#4d4d4d]"
                  >
                    {language === "en" ? "Back to Login" : "Tilbage til login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;