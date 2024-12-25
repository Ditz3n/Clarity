"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

const SuccessPage = () => {
  const router = useRouter();
  const { language } = useLanguage();

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

        {/* Right Side - Success Message */}
        <div className="w-1/2 flex flex-col justify-center">
          <div className="h-[450px] flex flex-col">
            {/* Header */}
            <div className="h-[100px]">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {language === "en" ? "Email Verified Successfully" : "E-mail bekræftet"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "en"
                  ? "Your email has been successfully verified. You can now log in."
                  : "Din e-mail er blevet bekræftet. Du kan nu logge ind."}
              </p>
            </div>

            {/* Success Message & Login Button */}
            <div className="space-y-4 mt-6">
              <button
                onClick={() => router.push("/login")}
                className="w-full h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {language === "en" ? "Go to Login" : "Gå til login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
