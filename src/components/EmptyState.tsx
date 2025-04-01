
import { Button } from "@/components/ui/button";
import { CircleSlash, FilePlus, RefreshCw } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
}

export function EmptyState({
  icon = <CircleSlash className="h-12 w-12 text-muted-foreground/50" />,
  title,
  description,
  actionLabel,
  actionIcon = <FilePlus className="mr-2 h-4 w-4" />,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex h-[450px] w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-6" size="sm">
            {actionIcon}
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex h-[450px] w-full flex-col items-center justify-center p-8 text-center">
      <RefreshCw className="h-12 w-12 text-primary/50 animate-spin" />
      <h3 className="mt-4 text-lg font-semibold">Loading...</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Please wait while we fetch the data.
      </p>
    </div>
  );
}
