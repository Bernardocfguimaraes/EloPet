import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1 text-center h-full">
      <div className="flex items-center justify-center bg-teal-50 text-teal-600 rounded-2xl mx-auto w-14 h-14 mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
      
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </Card>
  );
}
