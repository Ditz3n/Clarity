"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { PageWrapper } from "../../components/PageWrapper";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated") {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, [status, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      remember: rememberMe,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/home");
    }
  };

  if (loading) return null;

  return (
    <PageWrapper>
    <div className="flex items-center justify-center p-4 flex-1">
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
              {/* Header Section */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  {language === "en" ? "Welcome Back" : "Velkommen tilbage"}!
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "To start using our platform, please login with your account information."
                    : "For at begynde at bruge vores platform, skal du logge ind med dine kontoinformationer."}
                </p>
              </div>

              {/* Form Section with flexible spacing */}
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
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
                      placeholder="johndoe@gmail.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === "en" ? "Password" : "Adgangskode"}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {language === "en" ? "Remember me" : "Husk mig"}
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push("/forgotpassword")}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  >
                    {language === "en" ? "Forgot password?" : "Glemt adgangskode?"}
                  </button>
                </div>

                {error && (
                  <div className="text-red-500 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-auto pt-4">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                  >
                    {language === "en" ? "Login" : "Log ind"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="w-full sm:flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121]"
                  >
                    {language === "en" ? "Create Account" : "Opret konto"}
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

export default LoginPage;