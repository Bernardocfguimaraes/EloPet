import Link from "next/link";
import { Github, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white">
      
      <div className="flex flex-col sm:flex-row items-center justify-between w-full px-4 py-6 max-w-7xl mx-auto gap-4">
        
        {/* Créditos e Copyright alinhados à esquerda (ou centralizados no mobile) */}
        <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <span>Desenvolvido com</span>
              <Heart className="h-4 w-4 text-teal-500 fill-teal-500/20" />
              <span>por Bernardo Guimarães</span>
            </div>
            
            {/* Novo texto de Direitos Reservados */}
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mt-0.5">
              &copy; 2026 EloPet. Todos os direitos reservados.
            </p>
        </div>

        {/* Links Sociais */}
        <div className="flex items-center gap-5 mt-2 sm:mt-0">
          <Link 
            href="https://github.com/Bernardocfguimaraes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          
          <Link 
            href="https://www.linkedin.com/in/bernardoguimaraes-5047aa35b" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        
      </div>
    </footer>
  )
}