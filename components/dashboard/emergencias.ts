import { icons } from "lucide-react";

interface Emergencias {
  id: string;
  title: string;
  icon: keyof typeof icons;
  iconColor: string;
  bgColor: string;
  description: string;
}

export const emergencias: Emergencias[] = [
  {
    id: "tce",
    title: "TCE",
    icon: "Baby",
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
    description: "Avalie o risco e grau do TCE do seu paciente",
  },
];
