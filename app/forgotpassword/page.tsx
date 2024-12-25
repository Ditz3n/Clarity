"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { PageWrapper } from "../../components/PageWrapper";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { language } = useLanguage();
  const DEBUG = process.env.NODE_ENV === 'development';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          language 
        }),
      });
  
      const data = await res.json();
      
      if (res.status === 429) {
        setMessage(
          language === "en" 
            ? "Too many attempts. Please try again later." 
            : "For mange forsøg. Prøv igen senere."
        );
      } else if (res.status === 404) {
        setMessage(
          language === "en"
            ? "No account found with this email address."
            : "Ingen konto fundet med denne e-mailadresse."
        );
      } else if (res.ok) {
        setMessage(
          language === "en"
            ? "Password reset link has been sent to your email!"
            : "Link til nulstilling af adgangskode er sendt til din e-mail!"
        );
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage(language === "en" ? "An error occurred" : "Der opstod en fejl");
    }
  };

  return (
    <PageWrapper>
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-[1024px] bg-white dark:bg-[#272727] rounded-lg shadow-lg">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Left side - Illustration with vertical centering */}
            <div className="w-full md:w-5/12 lg:w-1/2 flex items-center justify-center py-8 md:py-12">
              <div className="w-full max-w-[300px] lg:max-w-md">
                <img
                  src="/images/undraw_woman_nxse.svg"
                  alt="Woman using computer illustration"
                  className="w-full h-auto block dark:hidden"
                />
                <img
                  src="/images/undraw_woman_nxse_light.svg"
                  alt="Woman using computer illustration"
                  className="w-full h-auto hidden dark:block"
                />
              </div>
            </div>

            {/* Right side - Form Container with flexible spacing */}
            <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center py-8 md:py-12">
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  {language === "en" ? "Reset Password" : "Nulstil adgangskode"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "en" 
                    ? "Enter your email address and we'll send you a link to reset your password."
                    : "Indtast din e-mailadresse, og vi sender dig et link til at nulstille din adgangskode."}
                </p>
              </div>

              {DEBUG && (
                <div className="text-xs text-gray-500 mb-4">
                  Current Language: {language}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
                    />
                  </div>

                  {message && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-auto pt-4">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                  >
                    {language === "en" ? "Send Reset Link" : "Send nulstillingslink"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="w-full sm:flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
                  >
                    {language === "en" ? "Back to Login" : "Tilbage til login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default ForgotPasswordPage;