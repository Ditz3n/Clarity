"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { language } = useLanguage();

  // Use a loading state to control rendering of the page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      // While loading, don't render the login form
      setLoading(true);
    } else if (status === "authenticated") {
      // If authenticated, immediately redirect to /home
      router.push("/home");
    } else {
      // Otherwise, display the login page
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

  // If still loading, return null to avoid showing anything
  if (loading) {
    return null; // Don't show anything while the session is loading
  }

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
            {/* Header Section */}
            <div className="h-[100px]">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {language === "en" ? "Welcome Back" : "Velkommen tilbage"}!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "en"
                  ? "To start using our platform, please login with your account information."
                  : "For at begynde at bruge vores platform, skal du logge ind med dine kontoinformationer."}
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                    />
                    <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {language === "en" ? "Remember me" : "Husk mig"}
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {language === "en" ? "Forgot password?" : "Glemt adgangskode?"}
                  </button>
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
                    {language === "en" ? "Login" : "Log ind"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="flex-1 h-10 border border-gray-200 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#1e1e1e] dark:hover:border-[#4d4d4d]"
                  >
                    {language === "en" ? "Create Account" : "Opret konto"}
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

export default LoginPage;
