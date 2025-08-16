import Link from "next/link";
import { LucideIcon } from "lucide-react";
import * as icons from "lucide-react";

interface EmergenciaCardProps {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof icons;
  iconColor: string;
  bgColor: string;
}

export default function EmergenciaCard({
  id,
  title,
  description,
  icon,
  iconColor,
  bgColor,
}: EmergenciaCardProps) {
  const IconComponent = icons[icon] as LucideIcon;

  return (
    <Link href={`/p/emergencias/${id}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <div className={`p-3 rounded-full ${bgColor} mr-3`}>
            <IconComponent className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 flex-grow">
          {description}
        </p>
      </div>
    </Link>
  );
}
