"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { PageWrapper } from "../../components/PageWrapper";
import Image from "next/image";
import Logo from "../../components/ui/Logo";
import ContentTransition from "../../components/ContentTransition";

const SuccessPage = () => {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <PageWrapper>
      <div className="flex flex-1 items-center justify-center p-4 py-8 min-h-[600px]">
        <div className="w-full max-w-[1024px] bg-white dark:bg-[#272727] rounded-lg shadow-lg min-h-[600px]">
          <div className="p-4 sm:p-6 md:p-8 h-full">
            <div className="flex flex-col md:flex-row md:space-x-8 h-full">
              
              {/* Left side - Image */}
              <div className="w-full md:w-5/12 lg:w-1/2 flex items-center justify-center order-2 md:order-1">
                <div className="w-full max-w-[300px] lg:max-w-md">
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
                          {language === "en" ? "Email Verified Successfully" : "E-mail bekræftet"}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {language === "en"
                            ? "Your email has been successfully verified. You can now log in."
                            : "Din e-mail er blevet bekræftet. Du kan nu logge ind."}
                        </p>
                      </div>

                      <button
                        onClick={() => router.push("/login")}
                        className="w-full sm:w-auto px-8 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                      >
                        {language === "en" ? "Go to Login" : "Gå til login"}
                      </button>
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

export default SuccessPage;