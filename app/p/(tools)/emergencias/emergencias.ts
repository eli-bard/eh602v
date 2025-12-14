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
    id: "iot",
    title: "Sequência de intubação",
    icon: "Baby",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
    description: "Cálculo rápido para doses de intubação",
  },
  {
    id: "pcr",
    title: "PCR",
    icon: "Baby",
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
    description: "Auxílio durante PCR",
  },
];
