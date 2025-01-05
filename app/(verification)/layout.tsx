// app/(verification)/layout.tsx | A layout component for verification pages, which does not require authentication
export default function VerificationLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <>{children}</>;
  }