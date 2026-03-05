import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Heart, Shield, Zap } from "lucide-react";
import { signIn } from "@/lib/auth";
import { Squirrel } from "lucide-react";

export default function Home() {


  
  async function handleRegister() {
    "use server"

    await signIn("github", {redirectTo: "/dashboard" })
  }



  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-white to-gray-50 ">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <div className="flex items-center text-teal-600 font-bold text-xl">
            <Squirrel className="h-6 w-6 mr-2" />
            <span>EloPet</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center min-h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-linear-to-b from-teal-50/50 to-white">
        <div className="container mx-auto px-4 py-12 md:py-24 ">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-block bg-rose-50 text-teal-950 px-4 py-1.5 rounded-full text-sm font-bold mb-2">
                O Elo entre quem AMA e quem PRECISA
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-teal-950 to-teal-900">
                Doações e Presentes de forma <span className="text-teal-600">confiável</span> para seu bichinho
              </h1>

              <p className="text-lg text-slate-500 max-w-3xl mx-auto text-balance">
                Receba doações e presentes para cuidar de seus Pets através de uma página personalizada e funcional, sem
                complicações.
              </p>

              <div className="pt-4">
                <form action={handleRegister}>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-800 hover:scale-110 duration-300 transition-all text-white font-medium px-8 h-12"
                  >
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>

          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Crie em segundos"
            description="Menos tempo configurando tecnologia, mais tempo brincando com seu pet."
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8" />}
            title="Mural de Carinho"
            description="Cada doação vem com uma mensagem de apoio para alegrar o dia do seu bichinho."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Saque Garantido"
            description="Segurança bancária total para garantir que o valor chegue para a ração ou tratamento."
          />
        </div>
        </div>
      </main>
    </div>
  );
}
