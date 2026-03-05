"use client"
import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState, useEffect, useRef } from "react"; 
import Link from "next/link";
import { Copy, ExternalLink, Check, Loader2 } from "lucide-react"; 

interface UrlPreviewProps{
  username: string | null;
}

export function UrlPreview({username: slug}: UrlPreviewProps){
  const [error, setError] = useState<null | string>(null);
  const [username, setUsername] = useState(slug);
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, setIsPending] = useState(false); 
  const [origin, setOrigin] = useState("");
  const formRef = useRef<HTMLFormElement>(null); 

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const baseUrl = origin || "";

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsPending(true);

    const newUsername = formData.get("username") as string;
    
    if(!newUsername) {
      setError("O nome não pode estar vazio");
      setIsPending(false);
      return;
    }

    try {
      const response = await createUsername({ username: newUsername });

      if (response.error){
        setError(response.error);
      } else if(response.data){
        setUsername(response.data);
        formRef.current?.reset(); 
      }
    } catch (e) {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setIsPending(false);
    }
  }

  const handleCopy = () => {
      navigator.clipboard.writeText(`${baseUrl}/creator/${username}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
  }

  if(username){
    return(
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full overflow-hidden">
          <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Sua URL:</span>
          <div className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 flex items-center overflow-hidden shadow-inner font-mono">
             <span className="truncate">{baseUrl}/creator/{username}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            onClick={handleCopy} 
            variant="outline" 
            className="flex-1 sm:flex-none bg-white hover:border-teal-300 hover:text-teal-600 text-zinc-950 h-10 px-4 transition-all shadow-sm"
          >
            {isCopied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Link href={`/creator/${username}`} target="_blank" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full bg-white hover:bg-slate-50 hover:text-teal-600 hover:border-teal-300 text-zinc-950 border-slate-200 h-10 px-4 shadow-sm transition-all">
              <ExternalLink className="w-4 h-4"/>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <form 
        ref={formRef}
        action={handleSubmit} 
        className="flex flex-col sm:flex-row items-center gap-3 w-full"
      >
        <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Criar URL:</span>
        <div className="flex-1 flex items-center w-full group">
          <span className="bg-slate-100 border border-r-0 border-slate-200 text-slate-400 px-3 py-2 rounded-l-xl text-sm transition-colors group-focus-within:border-teal-500/50">
            {baseUrl.replace("https://", "").replace("http://", "")}/creator/
          </span>
          <input 
            type="text" 
            name="username"
            placeholder="seu-nome"
            disabled={isPending}
            className="flex-1 border border-slate-200 px-3 py-2 rounded-r-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all disabled:opacity-50"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-teal-600 hover:bg-teal-700 text-white transition-all h-10 px-6 rounded-xl disabled:opacity-70"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
        </Button>
      </form>
      {error && (
        <p className="text-red-500 text-xs font-medium mt-2 absolute left-0">
          {error}
        </p>
      )}
    </div>
  )
}