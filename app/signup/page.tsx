// /signup/page.tsx is a page where users can create an account.
"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const SignupPage = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const { email, password, confirmPassword } = formData;

  // Check if the passwords match
  if (password !== confirmPassword) {
    setError(language === "en" ? "Passwords do not match" : "Adgangskoderne matcher ikke");
    return;
  }

  try {
    const response = await fetch("/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Pass email and password
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || (language === "en" ? "An error occurred" : "Der skete en fejl"));
    } else {
      setError(language === "en" ? "Please check your email to confirm your account" : "Tjek din e-mail for at bekræfte din konto");
    }
  } catch (err) {
    setError(language === "en" ? "Network error, please try again" : "Netværksfejl, prøv igen");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#212121]">
      <div className="w-[1024px] h-[600px] p-8 flex bg-white dark:bg-[#272727] rounded-lg shadow-lg">
        {/* Left Side - Illustration */}
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

        {/* Right Side - Form */}
        <div className="w-1/2 flex flex-col justify-center">
          <div className="h-[450px] flex flex-col">
            {/* Header */}
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

            {/* Form */}
            <form onSubmit={handleCreateAccount} className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-1">
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

                {/* Password Input */}
                <div className="space-y-1">
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

                {/* Confirm Password Input */}
                <div className="space-y-1">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
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

                {/* Error Message */}
                {error && <div className="text-red-500 dark:text-red-400 text-sm">{error}</div>}
              </div>

              {/* Buttons */}
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
                    className="flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
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
