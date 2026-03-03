import Image from "next/image";
import { Name } from "./name";
import { Description } from "./bio";
import { Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CardProfileProps{
    user:{
      id: string;
      name: string | null;
      username: string | null;
      bio: string | null;
      image: string | null;
    }
}

export function CardProfile({ user }: CardProfileProps){
    return(
    
        <Card className="w-full max-w-3xl border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white p-0">
            

            <div className="h-40 w-full bg-gradient-to-r from-teal-100 to-teal-50 m-0"></div>

            <CardContent className="px-6 sm:px-10 pb-10 relative">
                

                <div className="flex flex-col items-center -mt-20 mb-8 relative">
                    <div className="relative group cursor-pointer">
                        <Image
                            src={user.image ?? "/images/usericon.png"}
                            alt="foto de perfil"
                            width={160} 
                            height={160}
                            className="rounded-full bg-white object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105 h-[160px] w-[160px]"
                            priority
                            quality={100}
                        />
                         <div className="absolute bottom-2 right-2 bg-teal-600 p-2.5 rounded-full border-2 border-white shadow-sm text-white group-hover:bg-teal-700 transition-colors">
                            <Camera className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-xl mx-auto space-y-8">
                    
                    <div className="space-y-2 text-center">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Nome do Pet
                        </label>
                        <div className="max-w-sm mx-auto">
                            <Name initialName={user.name ?? "Digite o nome..."} />
                        </div>
                    </div>

                    <div className="space-y-2 text-center">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            História
                        </label>
                        <Description initialDescription={user.bio ?? "Conte a história do pet e por que ele precisa de ajuda..."} />
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}