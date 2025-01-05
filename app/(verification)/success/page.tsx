// app/(verification)/success/page.tsx | A success page for after verifying a user's email
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { PageWrapper } from "@/components/layouts/PageWrapper";
import Image from "next/image";
import Logo from "@/components/ui/Logo";
import ContentTransition from "@/components/layouts/ContentTransition";
import LanguageToggleTransition from "@/components/themes_and_language/LanguageToggleTransition";
import { useLanguage } from "@/context/LanguageContext";

const VerificationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedVerification, setHasAttemptedVerification] = useState(false);  // Add this
  const { language } = useLanguage();
  const token = searchParams ? searchParams.get('token') : null;

  useEffect(() => {
    const verifyToken = async () => {
      // Prevent multiple verification attempts
      if (hasAttemptedVerification) return;
      setHasAttemptedVerification(true);

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          setStatus('error');
          setError(data.error);
          setTimeout(() => router.push('/login'), 2000);
          return;
        }
        
        setStatus('success');
      } catch {
        setStatus('error');
        setError(language === 'en' ? 'An error occurred' : 'Der opstod en fejl');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, router, language, hasAttemptedVerification]); // Add hasAttemptedVerification to deps

  if (status === 'verifying') {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="text-gray-500 dark:text-gray-400">
          <LanguageToggleTransition
            en="Verifying your email..."
            da="Bekræfter din e-mail..."
          />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 items-center justify-center p-4 text-xl font-bold">
        <div className="text-red-500 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-[1024px] bg-white dark:bg-[#272727] rounded-lg shadow-lg">
        <div className="p-4 sm:p-6 md:p-8 h-full">
          <div className="flex flex-col md:flex-row md:space-x-8 h-full">
            {/* Left side - Image */}
            <div className="w-full md:w-5/12 lg:w-1/2 flex items-center justify-center order-2 md:order-1">
              <div className="w-full max-w-[300px] lg:max-w-md">
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

            {/* Right side - Content */}
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
                          en="Email Verified"
                          da="E-mail bekræftet"
                        />
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <LanguageToggleTransition
                          en="Your email has been successfully verified. You can now log in to your account."
                          da="Din e-mail er blevet bekræftet. Du kan nu logge ind på din konto."
                        />
                      </p>
                    </div>

                    <button
                      onClick={() => router.push("/login")}
                      className="w-32 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                    >
                      <LanguageToggleTransition
                        en="Log In"
                        da="Log ind"
                      />
                    </button>
                  </div>
                </ContentTransition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading component for Suspense fallback
const Loading = () => (
  <div className="flex flex-1 items-center justify-center p-4">
    <div className="text-gray-500 dark:text-gray-400">Loading...</div>
  </div>
);

// Main page component
const SuccessPage = () => {
  return (
    <PageWrapper>
      <Suspense fallback={<Loading />}>
        <VerificationContent />
      </Suspense>
      {/* Bottom spacer to help with centering */}
      <div className="flex-none h-16"></div>
    </PageWrapper>
  );
};

export default SuccessPage;