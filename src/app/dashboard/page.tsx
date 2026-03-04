import { DonationTable } from "./_components/donates";
import { Stats } from "./_components/analytics";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLoginOnboardAccount } from "./_data-access/create-onboard-account";
import { CreateAccountButton } from "./_components/create-account-button";
import { getAllDonates } from "./_data-access/get-donates";
import { getStripeDashboard } from "./_data-access/get-stripe-dashboard";

export default async function Dashboard() {
  const session = await auth();

  if(!session?.user){
    redirect("/")
  }

  const loginLink = await getStripeDashboard(session.user?.connectedStripeAccountId)

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Visão Geral</h1>
            <p className="text-sm text-slate-500 mt-1">Acompanhe suas métricas e doações recebidas.</p>
          </div>

          { loginLink && (
            <a 
              href={loginLink}
              className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-teal-600 hover:border-teal-200 transition-all"
            >
              Ajustar Conta no Stripe
            </a>
          )}
        </header>

        {!session.user.connectedStripeAccountId && (
          <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-6 shadow-sm">
            <CreateAccountButton/>
          </div>
        )}

        <section>
          <Stats userId={session.user.id} stripeAccountId={session.user.connectedStripeAccountId ?? ""}/>
        </section>

        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-6 bg-teal-500 rounded-full block"></span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Últimas doações</h2>
          </div>
          
          {session.user.connectedStripeAccountId && (
            <DonationTable />
          )}
        </section>

      </div>
    </main>
  );
}