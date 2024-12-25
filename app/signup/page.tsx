"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { PageWrapper } from "../../components/PageWrapper";

const SignupPage = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError(language === "en" ? "Passwords do not match" : "Adgangskoderne matcher ikke");
      return;
    }

    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || (language === "en" ? "An error occurred" : "Der skete en fejl"));
      } else {
        setError(language === "en" ? "Please check your email to confirm your account" : "Tjek din e-mail for at bekræfte din konto");
      }
    } catch {
      setError(language === "en" ? "Network error, please try again" : "Netværksfejl, prøv igen");
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
                  <Image
                    src="/images/undraw_woman_nxse.svg"
                    alt="Woman using computer illustration"
                    className="w-full h-auto block dark:hidden"
                    width={300}
                    height={300}
                  />
                  <Image
                    src="/images/undraw_woman_nxse_light.svg"
                    alt="Woman using computer illustration"
                    className="w-full h-auto hidden dark:block"
                    width={300}
                    height={300}
                  />
                </div>
              </div>

              {/* Right side - Form Container with flexible spacing */}
              <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center py-8 md:py-12">
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    {language === "en" ? "Create Account" : "Opret konto"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === "en"
                      ? "Join our platform by creating your account. Fill in your details below."
                      : "Tilmeld dig vores platform ved at oprette din konto. Udfyld dine oplysninger nedenfor."}
                  </p>
                </div>

                <form onSubmit={handleCreateAccount} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
                        placeholder="johndoe@gmail.com"
                        aria-label={language === "en" ? "Email address" : "E-mail adresse"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === "en" ? "Password" : "Adgangskode"}
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
                        aria-label={language === "en" ? "Password" : "Adgangskode"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === "en" ? "Confirm Password" : "Bekræft adgangskode"}
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
                        aria-label={language === "en" ? "Confirm Password" : "Bekræft adgangskode"}
                      />
                    </div>

                    {error && (
                      <div className="text-sm text-red-500 dark:text-red-400">{error}</div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-auto pt-4">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                    >
                      {language === "en" ? "Create Account" : "Opret konto"}
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

export default SignupPage;
