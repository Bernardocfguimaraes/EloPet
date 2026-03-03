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

  // Pega a URL do site automaticamente (localhost ou domínio real em produção)
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

  if(username){
    return(
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full overflow-hidden">
          <span className="font-semibold text-teal-100 whitespace-nowrap">Sua URL:</span>
          

          <div className="flex-1 w-full bg-teal-700/50 border border-teal-500/50 rounded-lg px-3 py-2 text-sm text-teal-50 flex items-center overflow-hidden">
             <span className="truncate">{baseUrl}/creator/{username}</span>
          </div>
        </div>


        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            onClick={handleCopy} 
            variant="secondary" 
            className="flex-1 sm:flex-none bg-teal-500 hover:bg-teal-400 text-white border-none h-10 px-4 transition-colors"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          
          <Link href={`/creator/${username}`} target="_blank" className="flex-1 sm:flex-none">
            <Button variant="secondary" className="w-full bg-white hover:bg-teal-50 text-teal-700 h-10 px-4 shadow-sm">
              <ExternalLink className="w-4 h-4"/>
            </Button>
          </Link>
        </div>
      </div>
    )
  }


  return(
    <div className="w-full">
      <form action={submitAction} className="flex flex-col sm:flex-row gap-3 w-full">
        
        <div className="flex flex-1 items-center bg-white rounded-lg overflow-hidden h-11 focus-within:ring-2 focus-within:ring-teal-300 transition-all shadow-inner">
          <span className="bg-slate-100 text-slate-500 font-medium px-3 flex items-center border-r border-slate-200 h-full text-sm select-none">

            {baseUrl.replace(/^https?:\/\//, '')}/creator/
          </span>
          <input 
            type="text" 
            name="username"
            className="flex-1 h-full outline-none text-slate-900 px-3 text-sm bg-transparent" 
            placeholder="nome-do-pet" 
            autoComplete="off"
          />
        </div>

        <Button type="submit" className="bg-teal-800 hover:bg-teal-900 text-white h-11 px-6 shadow-md transition-all whitespace-nowrap font-bold">
          Criar URL
        </Button>
      </form>
      
      {error && <p className="text-red-200 text-sm mt-3 flex items-center gap-1 font-medium">{error}</p>}
    </div>
  )
}