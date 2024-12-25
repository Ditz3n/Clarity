// components/PageWrapper.tsx
import { Footer } from "./ui/Footer";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // The outer div ensures the background color spans the full height
    <div className="min-h-screen bg-gray-50 dark:bg-[#212121] flex flex-col">
      {/* The main content area will grow to fill available space */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {/* Footer now inherits the background color context */}
      <Footer />
    </div>
  );
};