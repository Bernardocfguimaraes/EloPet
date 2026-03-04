import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  description: string;
  value: string | number;
  icon: React.ReactNode;
  iconClassName?: string;
};

export function StatCard({
  title,
  description,
  value,
  icon,
}: StatCardProps) {
  return (
    <Card className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] border-slate-200/60 rounded-2xl overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between pb-2 px-6 pt-6">
        <div className="space-y-1.5">
          <CardTitle className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-slate-400 font-medium">
            {description}
          </CardDescription>
        </div>
        <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm border border-teal-100/50">
          {icon}
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <p className="text-3xl font-bold select-none tracking-tight text-slate-900">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}