import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
