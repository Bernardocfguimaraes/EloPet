"use client"
import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Check } from "lucide-react"; 

interface UrlPreviewProps{
  username: string | null;
}

export function UrlPreview({username: slug}: UrlPreviewProps){
  const [error, setError] = useState<null | string>(null);
  const [username, setUsername] = useState(slug);
  const [isCopied, setIsCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const baseUrl = origin || process.env.NEXT_PUBLIC_HOST_URL || "";

  async function submitAction(formData: FormData) {
    const newUsername = formData.get("username") as string;
    
    if(!newUsername) return;

    const response = await createUsername({ username: newUsername });

    if (response.error){
      setError(response.error);
      return;
    }

    if(response.data){
      setUsername(response.data);
      setError(null);
    }
  }

  const handleCopy = () => {
     navigator.clipboard.writeText(`${baseUrl}/creator/${username}`);
     setIsCopied(true);
     setTimeout(() => setIsCopied(false), 2000); 
  }

  // ESTADO 1: O usuário já tem a URL
  if(username){
    return(
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full overflow-hidden">
          {/* Texto principal agora escuro para dar contraste */}
          <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Sua URL:</span>
          
          {/* Caixa da URL com fundo cinza muito clarinho e texto nítido */}
          <div className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 flex items-center overflow-hidden shadow-inner">
             <span className="truncate">{baseUrl}/creator/{username}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Botão de Copiar: Verde sutil (teal-50) com ícone escuro, super moderno */}
          <Button 
            onClick={handleCopy} 
            variant="outline" 
            className="flex-1 sm:flex-none bg-white hover:border-teal-300 hover:text-teal-600 text-zinc-950 h-10 px-4 transition-all shadow-sm"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          
          {/* Botão de Link Externo: Branco, mas fica verde ao passar o mouse */}
          <Link href={`/creator/${username}`} target="_blank" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full bg-white hover:bg-slate-50 hover:text-teal-600 hover:border-teal-300 text-zinc-950 border-slate-200 h-10 px-4 shadow-sm transition-all">
              <ExternalLink className="w-4 h-4"/>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ESTADO 2: O usuário ainda não criou a URL (Ajustei rapidinho caso ele precise criar)
  return (
    <form action={submitAction} className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Criar URL:</span>
      <div className="flex-1 flex items-center w-full">
        <span className="bg-slate-100 border border-r-0 border-slate-200 text-slate-500 px-3 py-2 rounded-l-lg text-sm border-r-transparent">
          {baseUrl}/creator/
        </span>
        <input 
          type="text" 
          name="username"
          placeholder="seu-nome"
          className="flex-1 border border-slate-200 px-3 py-2 rounded-r-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
      </div>
      <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white transition-colors h-10">
        Salvar
      </Button>
      {error && <span className="text-red-500 text-xs absolute -bottom-5">{error}</span>}
    </form>
  )
}