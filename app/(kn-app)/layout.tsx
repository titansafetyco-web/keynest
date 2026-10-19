import "../kn-app.css";
import AppShell from "@/components/kn-app/app-shell";
import { SocialProvider } from "@/components/kn-app/social-context";

export default function KnAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocialProvider>
      <AppShell>{children}</AppShell>
    </SocialProvider>
  );
}
