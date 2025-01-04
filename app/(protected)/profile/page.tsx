"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PageWrapper } from "@/components/PageWrapper";
import Logo from "@/components/ui/Logo";
import ContentTransition from "@/components/ContentTransition";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "@/components/ui/modals/PasswordModal";
import SuccessModal from "@/components/ui/modals/SuccessModal";
import MetronomeLoader from "@/components/ui/MetronomeLoader";
import LanguageToggleTransition from "@/components/LanguageToggleTransition";
import { resetCompletionModalPreference } from "@/lib/database/taskActions";

interface UserProfile {
  id: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  hideCompletionModal: boolean;
  completionPreference: string;
}

export default function ProfilePage() {
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
  const [successMessage, setSuccessMessage] = useState<React.ReactNode>("");
  const [error, setError] = useState<React.ReactNode>("");
  const [success, setSuccess] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [canResetWarnings, setCanResetWarnings] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/profile");
      const data = await response.json();
      setProfile(data);
      setCanResetWarnings(data.hideCompletionModal || data.completionPreference !== 'ask');
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
      setError(
        <LanguageToggleTransition
          en="Passwords do not match"
          da="Adgangskoderne matcher ikke"
        />
      );
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch("/api/auth/update-password", {
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

      setSuccessMessage(
        <LanguageToggleTransition
          en="Password updated successfully!"
          da="Adgangskode opdateret!"
        />
      );
      setIsDialogOpen(false);
      resetForm();
      setShowSuccessModal(true);
    } catch {
      setError(
        <LanguageToggleTransition
          en="An error occurred"
          da="Der opstod en fejl"
        />
      );
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

  const handleResetWarnings = async () => {
    if (!profile?.id) return;

    try {
      setCanResetWarnings(false);
      
      const formData = new FormData();
      formData.append('userId', profile.id);
      await resetCompletionModalPreference(formData);
      
      setSuccessMessage(
        <LanguageToggleTransition
          en="Task completion warnings have been re-enabled!"
          da="Advarsler om opgavefuldførelse er blevet genaktiveret!"
        />
      );
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error resetting warnings:', error);
      setCanResetWarnings(true);
      setError(
        <LanguageToggleTransition
          en="An error occurred while resetting warnings"
          da="Der opstod en fejl under nulstilling af advarsler"
        />
      );
    }
  };

  if (loading) return null;

  return (
    <PageWrapper>
      <div className="w-full max-w-[1024px] mx-auto p-4 sm:p-6 flex flex-col flex-1">
        <div className="bg-white dark:bg-[#272727] rounded-lg shadow-lg relative">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Back button */}
            <button
              onClick={() => router.push('/home')}
              type="button"
              className="mb-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              <LanguageToggleTransition
                en="Back"
                da="Tilbage"
              />
            </button>

            {/* Main content */}
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Left side - Image (only shown on desktop) */}
              <div className="hidden md:flex md:w-5/12 lg:w-1/2 flex-col items-center justify-center">
                <div className="w-full max-w-[250px] lg:max-w-[350px]">
                  <Image
                    src="/images/undraw_profile.svg"
                    alt="Woman looking at the sun illustration"
                    width={200}
                    height={200}
                    className="w-full h-auto block dark:hidden"
                  />
                  <Image
                    src="/images/undraw_profile_dark.svg"
                    alt="Woman looking at the sun illustration"
                    width={200}
                    height={200}
                    className="w-full h-auto hidden dark:block"
                  />
                </div>
              </div>

              {/* Right side - Profile Content */}
              <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col">
                <ContentTransition>
                  <div className="flex flex-col items-center md:items-start">
                    {/* Logo centered on mobile, left-aligned on desktop */}
                    <div className="w-full flex justify-center md:justify-start mb-6">
                      <Logo />
                    </div>

                    {/* Title and subtitle centered on mobile */}
                    <div className="w-full text-center md:text-left mb-6">
                      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        <LanguageToggleTransition
                          en="Profile Settings"
                          da="Profilindstillinger"
                        />
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <LanguageToggleTransition
                          en="Manage your profile settings"
                          da="Administrer dine profilindstillinger"
                        />
                      </p>
                    </div>

                    {/* Profile fields centered on mobile */}
                    <div className="w-full space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          <LanguageToggleTransition
                            en="Email Address"
                            da="E-mailadresse"
                          />
                        </label>
                        <input
                          type="email"
                          value={profile?.email || ""}
                          disabled
                          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          <LanguageToggleTransition
                            en="User ID"
                            da="Bruger-ID"
                          />
                        </label>
                        <input
                          type="text"
                          value={profile?.id || ""}
                          disabled
                          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          <LanguageToggleTransition
                            en="Verification Status"
                            da="Verifikationsstatus"
                          />
                        </label>
                        <div className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400 flex items-center">
                          <LanguageToggleTransition
                            en={profile?.isVerified ? "Verified" : "Not Verified"}
                            da={profile?.isVerified ? "Verificeret" : "Ikke verificeret"}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          <LanguageToggleTransition
                            en="Account Created"
                            da="Konto oprettet"
                          />
                        </label>
                        <input
                          type="text"
                          value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ""}
                          disabled
                          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#323232] dark:border-[#4d4d4d] dark:text-gray-400"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsDialogOpen(true)}
                          className="flex-1 h-10 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] text-sm"
                        >
                          <LanguageToggleTransition
                            en="Change Password"
                            da="Skift kode"
                          />
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleResetWarnings}
                          disabled={!canResetWarnings}
                          className={`flex-1 h-10 border border-[#6C63FF] dark:border-[#fb923c] rounded-lg transition-colors text-sm
                            ${canResetWarnings 
                              ? 'text-[#6C63FF] dark:text-[#fb923c] hover:bg-gray-50 dark:hover:bg-[#323232]' 
                              : 'text-gray-400 border-gray-400 cursor-not-allowed'}`}
                        >
                          <LanguageToggleTransition
                            en="Reset Warnings"
                            da="Nulstil advarsler"
                          />
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

      {/* Modals */}
      <Modal
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          resetForm();
        }}
        title={
          <LanguageToggleTransition
            en="Change Password"
            da="Skift adgangskode"
          />
        }
      >
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              <LanguageToggleTransition
                en="Current Password"
                da="Nuværende adgangskode"
              />
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
              <LanguageToggleTransition
                en="New Password"
                da="Ny adgangskode"
              />
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
              <LanguageToggleTransition
                en="Confirm Password"
                da="Bekræft adgangskode"
              />
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
              <LanguageToggleTransition
                en="Cancel"
                da="Annuller"
              />
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="h-9 px-4 min-w-[120px] whitespace-nowrap bg-[#6C63FF] text-white rounded-lg hover:bg-[#5953e1] transition-colors dark:bg-[#fb923c] dark:hover:bg-[#f59f0b] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUpdating ? (
                <MetronomeLoader size={24} color="white" speed={1} />
              ) : (
                <LanguageToggleTransition
                  en="Update Password"
                  da="Opdater adgangskode"
                />
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