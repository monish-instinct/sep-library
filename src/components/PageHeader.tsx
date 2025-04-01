
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  };
  className?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, action, className, children }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6", className)}>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {action && (
          <Button onClick={action.onClick} variant={action.variant || "default"} className="flex items-center gap-2">
            {action.icon}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
