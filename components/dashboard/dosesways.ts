interface JeitosdeDoses {
  id: string;
  title: string;
  description: string;
  category: string;
}

export const dosesways: JeitosdeDoses[] = [
  {
    id: "calcdoses",
    title: "Aprenda a calcular doses de medicamentos",
    description:
      "Aprenda a calcular a dose das medicações através da fórmula da Pri que resume as regras de 3.",
    category: "Online",
  },
  {
    id: "consultameds",
    title: "Consultar doses de medicamentos comuns",
    description:
      "Consulte a dose das principais medicações, além de algumas orientações sobre o uso em pediatria",
    category: "Online",
  },
  {
    id: "antibioticos",
    title: "Consultar sobre o uso de antibióticos",
    description:
      "Consulte a dose dos antibióticos mais comuns, além de algumas informações e orientações específicas sobre o uso em pediatria e particularidades",
    category: "Online",
  },
];
