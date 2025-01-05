// app/(auth)/home/page.tsx | A page for creating a new account
"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import Logo from "@/components/ui/Logo";
import ContentTransition from "@/components/layouts/ContentTransition";
import LanguageToggleTransition from "@/components/themes_and_language/LanguageToggleTransition";
import MetronomeLoader from "@/components/loaders/MetronomeLoader";

const SignupPage = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<React.ReactNode>("");
  const [success, setSuccess] = useState<React.ReactNode>("");  // Add this line
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'MISSING_CREDENTIALS':
        return (
          <LanguageToggleTransition
            en="Email and password are required"
            da="E-mail og adgangskode er påkrævet"
          />
        );
      case 'VERIFICATION_EMAIL_ALREADY_SENT':
        return (
          <LanguageToggleTransition
            en="A verification email has already been sent"
            da="Der er allerede sendt en verifikations-e-mail"
          />
        );
      case 'ACCOUNT_CREATION_ERROR':
        return (
          <LanguageToggleTransition
            en="Error creating account"
            da="Fejl ved oprettelse af konto"
          />
        );
      default:
        return (
          <LanguageToggleTransition
            en="An error occurred"
            da="Der opstod en fejl"
          />
        );
    }
  };
  
  const getSuccessMessage = (messageCode: string) => {
    switch (messageCode) {
      case 'VERIFICATION_EMAIL_SENT':
        return (
          <LanguageToggleTransition
            en="Verification email sent! Please check your inbox."
            da="Verifikations-e-mail sendt! Tjek venligst din indbakke."
          />
        );
      default:
        return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError(
        <LanguageToggleTransition
          en="Passwords do not match"
          da="Adgangskoderne matcher ikke"
        />
      );
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, language }),
      });
    
      const data = await response.json();
      
      if (!response.ok) {
        setError(getErrorMessage(data.errorCode));
        setSuccess(null);
      } else {
        setError(null);
        setSuccess(getSuccessMessage(data.messageCode));
      }
    } catch {
      setError(
        <LanguageToggleTransition
          en="An error occurred"
          da="Der opstod en fejl"
        />
      );
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-[1024px] bg-white dark:bg-[#272727] rounded-lg shadow-lg">
        <div className="p-4 sm:p-6 md:p-8 h-full">
          <div className="flex flex-col md:flex-row md:space-x-8 h-full">
            
            {/* Left side - Image */}
            <div className="w-full md:w-5/12 lg:w-1/2 flex items-center justify-center order-2 md:order-1">
              <div className="w-full max-w-[300px] lg:max-w-md hidden md:block">
                <Image
                  src="/images/undraw_woman.svg"
                  alt="Woman standing among flowers illustration"
                  width={300}
                  height={300}
                  className="w-full h-auto block dark:hidden"
                />
                <Image
                  src="/images/undraw_woman_dark.svg"
                  alt="Woman standing among flowers illustration"
                  width={300}
                  height={300}
                  className="w-full h-auto hidden dark:block"
                />
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col order-1 md:order-2">
                
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
                          <LanguageToggleTransition
                            en="Create Account"
                            da="Opret konto"
                          />
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <LanguageToggleTransition
                            en="Create a new account to get started!"
                            da="Opret en ny konto for at komme i gang!"
                          />
                        </p>
                      </div>

                      <form onSubmit={handleCreateAccount} className="space-y-4 flex-1">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              <LanguageToggleTransition
                                en="Email Address"
                                da="E-mailadresse"
                              />
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
                              placeholder="johndoe@gmail.com"
                              aria-label={language === "en" ? "Email address" : "E-mail adresse"}
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              <LanguageToggleTransition
                                en="Password"
                                da="Adgangskode"
                              />
                            </label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
                              aria-label={language === "en" ? "Password" : "Adgangskode"}
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              <LanguageToggleTransition
                                en="Confirm Password"
                                da="Bekræft adgangskode"
                              />
                            </label>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
                              aria-label={language === "en" ? "Confirm Password" : "Bekræft adgangskode"}
                            />
                          </div>

                          {error && (
                            <div className="text-sm text-red-500 dark:text-red-400">{error}</div>
                          )}
                          {success && (
                            <div className="text-sm text-green-500 dark:text-green-400">{success}</div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] flex justify-center items-center"
                          >
                            {isSubmitting ? (
                              <MetronomeLoader size={24} color="white" speed={1.25} />
                            ) : (
                              <LanguageToggleTransition
                                en="Create Account"
                                da="Opret konto"
                              />
                            )}
                          </button>
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => router.push("/login")}
                            className="w-full sm:flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#333333]"
                          >
                            <LanguageToggleTransition
                              en="Back to Login"
                              da="Tilbage til login"
                            />
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

export default SignupPage;