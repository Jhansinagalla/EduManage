import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  color?: "primary" | "success" | "warning" | "blue" | "purple" | "orange";
}

export function StatCard({ title, value, icon, trend, trendUp, className, color = "primary" }: StatCardProps) {
  const colorStyles = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-600",
    warning: "bg-amber-500/10 text-amber-600",
    blue: "bg-blue-500/10 text-blue-600",
    purple: "bg-purple-500/10 text-purple-600",
    orange: "bg-orange-500/10 text-orange-600",
  };

  return (
    <div className={cn("bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-200", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-2 font-display">{value}</h3>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-medium px-2 py-0.5 rounded-full w-fit",
              trendUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            )}>
              <span>{trendUp ? "↑" : "↓"}</span>
              <span>{trend}</span>
            </div>
          )}
        </div>
        
        <div className={cn("p-3 rounded-xl", colorStyles[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
}
