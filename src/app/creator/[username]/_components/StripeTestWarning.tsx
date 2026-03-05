"use client"
import { CreditCard, Copy, Check, Info } from "lucide-react";
import { useState } from "react";

export function StripeTestWarning() {
  const [copied, setCopied] = useState(false);
  const testCard = "4242 4242 4242 4242";

  const handleCopy = () => {
    navigator.clipboard.writeText(testCard.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-200/80 rounded-[1.25rem] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col gap-3">
      
      <div className="flex items-center gap-2">
        <div className="p-1 bg-teal-100/50 rounded-md">
          <Info className="w-4 h-4 text-teal-600" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Modo Portfólio
        </span>
      </div>
      
      <p className="text-sm text-slate-600 font-medium leading-relaxed">
        Nenhuma cobrança real será feita. Use o cartão de teste abaixo para simular o fluxo de doação:
      </p>

      <div className="flex items-center justify-between bg-white border border-slate-200/60 rounded-xl p-3 shadow-sm group transition-all hover:border-teal-200">
        <div className="flex items-center gap-3 text-sm font-mono text-slate-700 font-semibold">
          <CreditCard className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
          <span className="tracking-widest">{testCard}</span>
        </div>
        
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-teal-50 rounded-lg text-slate-400 hover:text-teal-600 transition-all active:scale-95"
          title="Copiar número do cartão"
        >
          {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex gap-6 text-[13px] text-slate-500 font-mono px-1 mt-1">
        <span>Validade: <strong className="font-semibold text-slate-700">12/28</strong></span>
        <span>CVC: <strong className="font-semibold text-slate-700">123</strong></span>
      </div>
      
    </div>
  )
}