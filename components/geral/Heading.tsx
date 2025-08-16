import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  className?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  className,
}: HeadingProps) => {
  return (
    <div
      className={cn("px-4 lg:px-8 flex items-center gap-x-3 mb-8", className)}
    >
      <div
        className={cn(
          "p-2 w-fit rounded-md transition-colors",
          bgColor,
          !bgColor && "bg-gray-100 dark:bg-gray-800"
        )}
      >
        <Icon
          className={cn(
            "w-10 h-10",
            iconColor,
            !iconColor && "text-gray-700 dark:text-gray-300"
          )}
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
