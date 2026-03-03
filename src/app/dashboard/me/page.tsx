import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { UrlPreview } from "./_components/url";
import { CardProfile } from "./_components/card-profile";

export default async function Me() {
  const session = await auth();

  if(!session?.user){
    redirect("/")
  }

  const userData = {
    id: session.user.id,
    name: session.user.name || null,
    username: session.user?.username || null,
    bio: session.user?.bio || null,
    image: session.user?.image || null,
  }

  return (
    // Fundo da página levemente acinzentado para destacar os cards brancos
    <main className="w-full min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 gap-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* Cabeçalho da Página */}
      <div className="w-full max-w-3xl text-left">
        <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Meu Perfil</h1>
        <p className="text-slate-500 mt-1">Personalize a página pública para receber apoio.</p>
      </div>

      {/* URL Preview - Agora com visual "Premium" da marca */}
      <section className="w-full max-w-3xl bg-teal-600 text-white rounded-2xl p-1 shadow-lg shadow-teal-600/20">
        <div className="border border-teal-500/50 rounded-xl bg-teal-600 p-4">
          <UrlPreview username={userData.username}/>
        </div>
      </section>

      {/* O Componente do Perfil */}
      <CardProfile user={userData}/>

    </main>
  )
}