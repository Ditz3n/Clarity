"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { PageWrapper } from "../../components/PageWrapper";
import Image from "next/image";
import Logo from "../../components/ui/Logo";
import ContentTransition from "../../components/ContentTransition";
import MetronomeLoader from "../../components/ui/MetronomeLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setIsSubmitting(true);
    
    try {
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
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return null;

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
                    src="/images/undraw_woman.svg"
                    alt="Woman using computer illustration"
                    width={300}
                    height={300}
                    className="w-full h-auto block dark:hidden"
                  />
                  <Image
                    src="/images/undraw_woman_dark.svg"
                    alt="Woman using computer illustration"
                    width={300}
                    height={300}
                    className="w-full h-auto hidden dark:block"
                  />
                </div>
              </div>

              {/* Right side - Form */}
              <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col min-h-[600px] order-1 md:order-2">
                <div className="flex-none h-16 py-4">
                  <Logo />
                </div>

                <div className="flex-grow flex flex-col justify-center">
                  <ContentTransition>
                    <div className="w-full max-w-md mx-auto space-y-6 px-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                          {language === "en" ? "Welcome Back" : "Velkommen tilbage"}!
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {language === "en"
                            ? "To start using our platform, please login with your account information."
                            : "For at begynde at bruge vores platform, skal du logge ind med dine kontoinformationer."}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
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
                              className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
                              placeholder="e.g. clarity@gmail.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {language === "en" ? "Password" : "Adgangskode"}
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full h-10 px-4 border border-gray-200 rounded-lg 
                                          focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent 
                                          dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] 
                                          dark:focus:ring-[#fb923c]"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                              >
                                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className={`h-4 w-4 appearance-none bg-gray-200 dark:bg-[#4d4d4d] 
                                border border-gray-300 dark:border-gray-600 
                                rounded transition-colors focus:ring-[#6C63FF] dark:focus:ring-[#fb923c]
                                ${rememberMe ? "checked:bg-[#5953e1] dark:checked:bg-[#fb923c]" : ""}`}
                              style={{
                                backgroundImage: rememberMe
                                  ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='16px' height='16px'%3E%3Cpath d='M20.292 5.292a1 1 0 0 0-1.414 0L9 15.17l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0 0-1.414z'/%3E%3C/svg%3E")`
                                  : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='gray' width='16px' height='16px'%3E%3Cpath d='M20.292 5.292a1 1 0 0 0-1.414 0L9 15.17l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0 0-1.414z'/%3E%3C/svg%3E")`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            />
                            <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                              {language === "en" ? "Remember me" : "Husk mig"}
                            </label>
                          </div>
                            <button
                            type="button"
                            onClick={() => router.push("/forgotpassword")}
                            className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#5953e1] dark:hover:text-[#f59f0b] transition-colors"
                          >
                            {language === "en" ? "Forgot password?" : "Glemt adgangskode?"}
                          </button>
                        </div>

                        {error && (
                          <div className="text-red-500 dark:text-red-400 text-sm">
                            {error}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isSubmitting ? (
                              <MetronomeLoader size={24} color="white" speed={1.25} />
                            ) : (
                              language === "en" ? "Login" : "Log ind"
                            )}
                          </button>
                          <button
                          type="button"
                          onClick={() => router.push("/signup")}
                          disabled={isSubmitting}
                          className="w-full sm:flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:hover:bg-[#333333] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {language === "en" ? "Create Account" : "Opret konto"}
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
      <div className="flex-none h-16"></div>
    </PageWrapper>
  );
};

export default LoginPage;