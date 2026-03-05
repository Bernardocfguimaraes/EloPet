"use client"

import Image from "next/image";
import { Name } from "./name";
import { Description } from "./bio";
import { Camera, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing"; 
import { updateProfileImage } from "@/_actions/update-profile-image"; 

interface CardProfileProps {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
  }
}

export function CardProfile({ user }: CardProfileProps) {

  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      if (res && res[0]) {

        await updateProfileImage(res[0].url);
      }
      setIsPending(false);
    },
    onUploadError: (error) => {
      console.error(error);
      alert("Erro ao enviar a imagem. Tente novamente.");
      setIsPending(false);
    }
  });


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsPending(true);
    startUpload([file]);
  };

  const isLoading = isUploading || isPending;

  return (
    <Card className="w-full border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden bg-white relative">
      <div className="h-32 w-full bg-gradient-to-b from-teal-50/60 to-transparent absolute top-0 left-0 z-0"></div>

      <CardContent className="px-6 sm:px-10 pb-12 relative z-10 pt-16">
        
        <div className="flex flex-col items-center mb-10 relative">
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          <div 
            className={`relative group ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
            onClick={() => !isLoading && fileInputRef.current?.click()}
          >
            <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Image
              src={user.image ?? "/images/usericon.png"}
              alt="foto de perfil"
              width={130} 
              height={130}
              className={`rounded-full bg-white object-cover ring-4 ring-white shadow-xl transition-all duration-500 h-[130px] w-[130px] relative z-10 ${
                isLoading ? 'opacity-50 scale-95' : 'group-hover:scale-105'
              }`}
              priority
              quality={100}
            />
            
            <div className="absolute bottom-0 right-0 z-20 bg-teal-500 p-2.5 rounded-full ring-4 ring-white shadow-lg text-white transition-all hover:bg-teal-600">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto space-y-8">
          
          <div className="space-y-2 text-center">
            <label className="text-xs font-bold text-teal-700/70 uppercase tracking-[0.2em]">
              Nome do Pet
            </label>
            <div className="max-w-xs mx-auto">
              <Name initialName={user.name ?? "Digite o nome..."} />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <label className="text-xs font-bold text-teal-700/70 uppercase tracking-[0.2em]">
              História
            </label>
            <Description initialDescription={user.bio ?? "Conte a história do pet e por que ele precisa de ajuda..."} />
          </div>

        </div>
      </CardContent>
    </Card>
  )
}