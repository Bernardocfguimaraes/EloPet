import Image from "next/image";
import { getInfoUser } from "./_data-access/get-info-user";
import { notFound } from "next/navigation";
import { FormDonate } from "./_components/form";

export default async function Apoia({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params;

  const user = await getInfoUser({username});

  if (!user) {
    notFound()
  }

  return (
    /* Fundo Slate-50 com o padrão de pontilhados (Dot Grid) para dar textura */
    <main className="min-h-screen bg-slate-50 pb-16 font-sans relative bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]">
      
      {/* NOVO CABEÇALHO: Dark Premium com Textura Grid (Estilo Vercel/Linear) */}
      <div className="w-full h-32 md:h-40 relative overflow-hidden bg-zinc-950 border-b border-zinc-900 flex justify-center items-end">
        
        {/* 1. Textura de Grid: Linhas brancas com 4% de opacidade criando um padrão arquitetônico */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* 2. Ponto de Luz: Um brilho verde esmeralda no centro, vindo de baixo, para iluminar as costas do avatar */}
        <div className="absolute -bottom-24 w-[400px] h-[250px] bg-teal-500/15 blur-[60px] rounded-full pointer-events-none"></div>
        
        {/* 3. Gradiente escuro no rodapé para suavizar o encontro com a página clara */}
        <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        
      </div>

      {/* CABEÇALHO: Avatar MAIOR sobrepondo o fundo suave (efeito 3D) */}
      {/* Ajustamos a margem negativa mobile de -mt-16 para -mt-18 para alinhar a foto maior */}
      <section className="max-w-5xl mx-auto px-4 relative z-10 flex flex-col items-center -mt-18 md:-mt-20 mb-8">
        
        <div className="relative mb-3">
          <Image
            src={user.image ?? "/images/usericon.png"}
            /* ring-slate-50 faz a borda ter a mesma cor do fundo da página, mesclando perfeitamente */
            /* AUMENTAMOS o tamanho mobile para w-36 h-36 e desktop para w-40 h-40 */
            className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover ring-[6px] ring-slate-50 shadow-md bg-white select-none"
            alt="Foto do Pet"
            width={160} // Atualizado para refletir o maior tamanho desktop (md:w-40 = 160px)
            height={160} // Atualizado para refletir o maior tamanho desktop
            quality={100}
            priority
          />
        </div>

        <h1 className="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight text-center">
          {user.name ?? "Sem nome ainda"}
        </h1>
        
        {/* Badge moderna */}
        <div className="mt-3 bg-white border border-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          Apoie esta causa
        </div>

      </section>

      {/* CONTEÚDO: Grid assimétrico (3 colunas pro texto, 2 pro form) */}
      <div className="grid grid-cols-1 md:grid-cols-5 max-w-5xl mx-auto gap-6 px-4 mt-4">
        
        {/* CARD SOBRE O PET */}
        <section className="md:col-span-3 bg-white border border-slate-200/60 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] h-fit">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-6 bg-teal-500 rounded-full block"></span>
            <h2 className="font-bold text-lg text-slate-900 tracking-tight">A história</h2>
          </div>
          <div className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
            {user.bio ?? "Nenhuma biografia disponível no momento. Volte em breve para conhecer mais sobre este pet!"}
          </div>
        </section>

        {/* ÁREA DO FORMULÁRIO */}
        <section className="md:col-span-2 h-fit">
          <FormDonate slug={user.username!} creatorId={user.connectedStripeAccountId ?? ""}/>
        </section>

      </div>
    </main>
  )
}