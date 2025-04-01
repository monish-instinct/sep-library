
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AnalyticsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon,
  onClick,
  className,
  iconClassName
}: AnalyticsCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 overflow-hidden border", 
        onClick && "cursor-pointer hover:shadow-md hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="z-10">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <div className="flex items-center mt-1">
                <span 
                  className={cn(
                    "text-xs font-medium",
                    changeType === "positive" && "text-green-600",
                    changeType === "negative" && "text-red-600",
                    changeType === "neutral" && "text-gray-600"
                  )}
                >
                  {change}
                </span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className={cn(
              "p-3 rounded-full z-10",
              "bg-primary/10 text-primary",
              iconClassName
            )}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
