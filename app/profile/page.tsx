"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PageWrapper } from "../../components/PageWrapper";
import Logo from "../../components/ui/Logo";
import ContentTransition from "../../components/ContentTransition";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "../../components/ui/PasswordModal";
import SuccessModal from "../../components/ui/SuccessModal";
import MetronomeLoader from "../../components/ui/MetronomeLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

interface UserProfile {
  id: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.email) {
      fetchProfile();
    }
  }, [status, session, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setIsUpdating(false);
        return;
      }

      setSuccessMessage(language === "en" ? "The Password was successfully updated!" : "Adgangskoden blev opdateret!");
      setIsDialogOpen(false);
      resetForm();
      setShowSuccessModal(true);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  if (loading) return null;

  return (
    <PageWrapper>
      <div className="flex flex-1 items-center justify-center p-4 py-8 min-h-[600px]">
        <div className="w-full max-w-[1024px] bg-white dark:bg-[#272727] rounded-lg shadow-lg min-h-[600px]">
          <div className="p-4 sm:p-6 md:p-8 h-full relative">
            {/* Back button */}
            <button
              onClick={() => router.push('/home')}
              type="button"
              className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              {language === "en" ? "Back" : "Tilbage"}
            </button>

            <div className="flex flex-col md:flex-row md:space-x-8 h-full">
              {/* Left side - Image */}
              <div className="w-full md:w-5/12 lg:w-1/2 flex items-center justify-center order-2 md:order-1">
                <div className="w-full max-w-[300px] lg:max-w-sm hidden md:block">
                  <Image
                    src="/images/undraw_profile.svg"
                    alt="Profile settings illustration"
                    width={250}
                    height={250}
                    className="w-full h-auto block dark:hidden"
                  />
                  <Image
                    src="/images/undraw_profile_dark.svg"
                    alt="Profile settings illustration"
                    width={250}
                    height={250}
                    className="w-full h-auto hidden dark:block"
                  />
                </div>
              </div>

              {/* Right side - Profile Content */}
              <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col min-h-[600px] order-1 md:order-2">
                <div className="flex-none h-16 py-4">
                  <Logo />
                </div>

                <div className="flex-grow flex flex-col justify-center">
                  <ContentTransition>
                    <div className="w-full max-w-md mx-auto space-y-6 px-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          {language === "en" ? "Profile Settings" : "Profilindstillinger"}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {language === "en" ? "Manage your account settings" : "Administrer dine kontoinstillinger"}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Profile fields */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {language === "en" ? "Email Address" : "Email-adresse"}
                          </label>
                          <input
                            type="email"
                            value={profile?.email || ""}
                            disabled
                            className="w-full h-10 px-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {language === "en" ? "User ID" : "Bruger-ID"}
                          </label>
                          <input
                            type="text"
                            value={profile?.id || ""}
                            disabled
                            className="w-full h-10 px-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {language === "en" ? "Verification Status" : "Verifikationsstatus"}
                          </label>
                          <input
                            type="text"
                            value={
                              profile?.isVerified
                                ? language === "en"
                                  ? "Verified"
                                  : "Verificeret"
                                : language === "en"
                                ? "Not Verified"
                                : "Ikke verificeret"
                            }
                            disabled
                            className="w-full h-10 px-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {language === "en" ? "Account Created" : "Konto oprettet"}
                          </label>
                          <input
                            type="text"
                            value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ""}
                            disabled
                            className="w-full h-10 px-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setIsDialogOpen(true)}
                            className="w-full h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b]"
                          >
                            {language === "en" ? "Change Password" : "Skift adgangskode"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </ContentTransition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          resetForm();
        }}
        title={language === "en" ? "Change Password" : "Skift adgangskode"}
      >
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {language === "en" ? "Current Password" : "Nuværende adgangskode"}
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full h-9 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
              >
                {showCurrentPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {language === "en" ? "New Password" : "Ny adgangskode"}
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full h-9 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
              >
                {showNewPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {language === "en" ? "Confirm Password" : "Bekræft adgangskode"}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-9 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:border-[#4d4d4d] dark:bg-[#212121] dark:focus:ring-[#fb923c]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
              >
                {showConfirmPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 dark:text-green-400 text-sm">
              {success}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="h-9 px-4 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors dark:text-gray-300 dark:border-[#4d4d4d] dark:hover:bg-[#323232]"
            >
              {language === "en" ? "Cancel" : "Annuller"}
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="h-9 w-48 px-4 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUpdating ? (
                <MetronomeLoader size={24} color="white" speed={1} />
              ) : (
                language === "en" ? "Update Password" : "Opdater adgangskode"
              )}
            </button>
          </div>
        </form>
      </Modal>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </PageWrapper>
  );
}