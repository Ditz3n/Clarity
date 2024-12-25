"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { PageWrapper } from "../../components/PageWrapper";
import Image from "next/image";

const SuccessPage = () => {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <PageWrapper>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-[1024px] bg-white dark:bg-[#272727] rounded-lg shadow-lg">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Left Side - Illustration with vertical centering */}
              <div className="w-full md:w-5/12 lg:w-1/2 flex items-center justify-center py-8 md:py-12">
                <div className="w-full max-w-[300px] lg:max-w-md">
                  <Image
                    src="/images/undraw_woman_nxse.svg"
                    alt="Woman using computer illustration"
                    width={300}
                    height={300}
                    className="block dark:hidden"
                  />
                  <Image
                    src="/images/undraw_woman_nxse_light.svg"
                    alt="Woman using computer illustration"
                    width={300}
                    height={300}
                    className="hidden dark:block"
                  />
                </div>
              </div>

              {/* Right Side - Success Message with vertical centering */}
              <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center py-8 md:py-12">
                <div className="space-y-8">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SuccessPage;
