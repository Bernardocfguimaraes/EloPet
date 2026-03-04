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
    <main className="w-full min-h-screen bg-zinc-50 flex flex-col items-center p-4 md:p-8 gap-8 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* Título com mais peso (text-zinc-900) para não ficar apagado */}
      <div className="w-full max-w-2xl text-left mt-2 bg-white p-6 md:p-8 rounded-[1.25rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-start gap-3">
        {/* Detalhe minimalista em verde */}
        <span className="w-1.5 h-8 bg-teal-500 rounded-full block mt-1"></span>
        
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Meu Perfil</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1 font-medium">Personalize a página pública para receber apoio.</p>
        </div>
      </div>

      {/* URL Preview - Sombra esverdeada sutil e um "pilar" verde mais gordinho ao lado */}
      <section className="w-full max-w-2xl bg-white border border-teal-100 rounded-2xl p-2 shadow-[0_8px_30px_-12px_rgba(20,184,166,0.2)] flex items-center group transition-all hover:border-teal-300">
        <div className="w-1.5 h-10 bg-teal-500 rounded-full ml-2 mr-4"></div>
        <div className="flex-1">
          <UrlPreview username={userData.username}/>
        </div>
      </section>

      <div className="w-full max-w-2xl">
        <CardProfile user={userData}/>
      </div>

    </main>
  )
}