"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Biohazard,
  Calculator,
  Paperclip,
  ShoppingBag,
  FileWarning,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Doses",
    icon: Biohazard,
    href: "/p/doses",
    bgColor: "bg-violet-100 dark:bg-violet-900/40",
    color: "text-violet-600 dark:text-violet-400",
    hoverColor: "hover:bg-violet-50 dark:hover:bg-violet-900/30",
  },
  {
    label: "Emergências",
    icon: FileWarning,
    href: "/p/emergencias",
    bgColor: "bg-red-100 dark:bg-red-900/40",
    color: "text-red-600 dark:text-red-400",
    hoverColor: "hover:bg-red-50 dark:hover:bg-red-900/30",
  },
  {
    label: "Calculadoras",
    icon: Calculator,
    href: "/p/calculadoras",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    color: "text-amber-600 dark:text-amber-400",
    hoverColor: "hover:bg-amber-50 dark:hover:bg-amber-900/30",
  },
  {
    label: "Materiais e resumos",
    icon: Paperclip,
    href: "/p/materiais",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
    color: "text-emerald-600 dark:text-emerald-400",
    hoverColor: "hover:bg-emerald-50 dark:hover:bg-emerald-900/30",
  },
  {
    label: "Indicações de produtos",
    icon: ShoppingBag,
    href: "/p/shopping",
    bgColor: "bg-pink-100 dark:bg-pink-900/40",
    color: "text-pink-600 dark:text-pink-400",
    hoverColor: "hover:bg-pink-50 dark:hover:bg-pink-900/30",
  },
];

const DashboardHome = () => {
  const router = useRouter();

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Seja muito bem-vindo!!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-base text-center">
          Aprenda mais rápido - Aproveite os benefícios de uma IA dedicada e um
          preceptor disponível 24/7
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className={cn(
              "p-4 flex flex-col items-center justify-between",
              "h-40 transition-all transform hover:scale-[1.02]",
              "cursor-pointer border dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-700/50",
              tool.hoverColor
            )}
          >
            <div className={cn("p-3 rounded-full mb-3", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{tool.label}</h3>
            </div>
            <ArrowRight className={cn("w-5 h-5 mt-2", tool.color)} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
