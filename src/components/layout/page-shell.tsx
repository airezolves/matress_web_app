import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
