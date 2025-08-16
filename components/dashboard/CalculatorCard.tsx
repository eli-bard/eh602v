import Link from "next/link";
import { LucideIcon } from "lucide-react";
import * as icons from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: keyof typeof icons;
  iconColor: string;
  bgColor: string;
  className?: string;
}

export default function CalculatorCard({
  id,
  title,
  description,
  category,
  icon,
  iconColor,
  bgColor,
  className,
}: CalculatorCardProps) {
  const IconComponent = icons[icon] as LucideIcon;

  return (
    <Link href={`/p/calculadoras/${id}`}>
      <div
        className={cn(
          "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg",
          "dark:hover:shadow-gray-700/50 transition-shadow cursor-pointer h-full flex flex-col",
          "border border-gray-200 dark:border-gray-700",
          className
        )}
      >
        <div className="flex items-center mb-3">
          <div className={`p-3 rounded-full ${bgColor} mr-3`}>
            <IconComponent className={`w-5 h-5 ${iconColor}`} />
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 flex-grow">
          {description}
        </p>
      </div>
    </Link>
  );
}
