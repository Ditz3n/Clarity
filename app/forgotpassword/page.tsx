"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { PageWrapper } from "../../components/PageWrapper";
import Image from "next/image";
import Logo from "../../components/ui/Logo";
import ContentTransition from "../../components/ContentTransition";
import MetronomeLoader from "../../components/ui/MetronomeLoader";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();
  const DEBUG = process.env.NODE_ENV === "development";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          language,
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
    } catch {
      setMessage(language === "en" ? "An error occurred" : "Der opstod en fejl");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-1 items-center justify-center p-4 py-8 min-h-[600px]">
        <div className="w-full max-w-[1024px] bg-white dark:bg-[#272727] rounded-lg shadow-lg min-h-[600px]">
          <div className="p-4 sm:p-6 md:p-8 h-full">
            <div className="flex flex-col md:flex-row md:space-x-8 h-full">
              
              {/* Left side - Image */}
              <div className="w-full md:w-5/12 lg:w-1/2 flex items-center justify-center order-2 md:order-1">
                <div className="w-full max-w-[300px] lg:max-w-md hidden md:block">
                  <Image
                    src="/images/undraw_woman_nxse.svg"
                    alt="Woman using computer illustration"
                    width={300}
                    height={300}
                    className="w-full h-auto block dark:hidden"
                  />
                  <Image
                    src="/images/undraw_woman_nxse_light.svg"
                    alt="Woman using computer illustration"
                    width={300}
                    height={300}
                    className="w-full h-auto hidden dark:block"
                  />
                </div>
              </div>
  
              {/* Right side - Form */}
              <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col min-h-[600px] order-1 md:order-2">
                
                {/* Top Section - Logo */}
                <div className="flex-none h-16 py-4">
                  <Logo />
                </div>

                {/* Center Section - Takes up all remaining space */}
                <div className="flex-grow flex flex-col justify-center">
                  <ContentTransition>
                    <div className="w-full max-w-md mx-auto space-y-6 px-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                          {language === "en" ? "Reset Password" : "Nulstil adgangskode"}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {language === "en"
                            ? "Enter your email."
                            : "Indtast din e-mailadresse."}
                        </p>
                      </div>

                      {/* Debugging - Can only be seen in Development Mode */}
                      {DEBUG && (
                        <div className="text-xs text-gray-500">
                          Current Language: {language}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
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
                              className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
                            />
                          </div>

                          {message && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                              {message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                          >
                            {isSubmitting ? (
                              <MetronomeLoader size={24} color="white" speed={1.25} />
                            ) : (
                              language === "en" ? "Send Reset Link" : "Send nulstillingslink"
                            )}
                          </button>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => router.push("/login")}
                            className="w-full sm:flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#333333]"
                          >
                            {language === "en" ? "Back to Login" : "Tilbage til login"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </ContentTransition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer to help with centering */}
      <div className="flex-none h-16"></div>
    </PageWrapper>
  );
};

export default ForgotPasswordPage;