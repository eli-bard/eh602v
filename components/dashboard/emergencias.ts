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
    id: "cad",
    title: "Cetoacidose Diabética",
    icon: "Baby",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
    description:
      "Ajuda para a condução de casos de CAD em pediatria. Cálculos auxiliares",
  },
  {
    id: "folha-de-parada",
    title: "Folha de parada",
    icon: "Baby",
    iconColor: "text-pink-500",
    bgColor: "bg-pink-100",
    description:
      "Insira nome, peso e idade e obtenha uma folha rápida de condução de PCR em pediatria",
  },
];
