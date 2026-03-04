import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto">
        {children}
      </main>
      <Footer/>
    </>
  )
}