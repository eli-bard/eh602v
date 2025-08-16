import { Heading } from "@/components/geral/Heading";
import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/dashboard/ProductCard";
import { MedicalProduct } from "@/components/dashboard/products";

const medicalProducts: MedicalProduct[] = [
  {
    id: 1,
    name: "Estetoscópio Littman Classic 2 Neo",
    description:
      "Precisão acústica superior com design elegante em preto - ideal para diagnósticos precisos",
    image: "/imgs/productimgs/esteto-neo.png",
    affiliateLink: "https://amzn.to/4kUvm8o",
  },
  {
    id: 2,
    name: "Termômetro Digital G-Tech",
    description:
      "Medição rápida e precisa - essencial para pediatria e neonatologia",
    image: "/imgs/productimgs/termometro.png",
    affiliateLink: "https://amzn.to/4n9wZ3O",
  },
  {
    id: 3,
    name: "Estetoscópio Littman Pediátrico Rainbow",
    description:
      "Design colorido e acústica especializada para pacientes pediátricos",
    image: "/imgs/productimgs/esteto-rainbow.png",
    affiliateLink: "https://amzn.to/3TpZyMB",
  },
  {
    id: 4,
    name: "Estetoscópio Littman Pediátrico Preto",
    description: "Elegância e desempenho para o cuidado com pacientes infantis",
    image: "/imgs/productimgs/esteto-preto.png",
    affiliateLink: "https://amzn.to/3HLBOjr",
  },
  {
    id: 5,
    name: "Otoscópio Digital BEBIRD",
    description:
      "Visualização HD com conexão smartphone - capture imagens para análise detalhada",
    image: "/imgs/productimgs/otoscopio-bebird.png",
    affiliateLink: "https://amzn.to/43J78YO",
  },
  {
    id: 6,
    name: "Otoscópio Digital SmartOtoscope",
    description:
      "Tecnologia avançada para exames otológicos com registro de imagens",
    image: "/imgs/productimgs/otoscopio-smart.png",
    affiliateLink: "https://amzn.to/3ZxijkM",
  },
  {
    id: 7,
    name: "Oxímetro de Dedo Adulto",
    description:
      "Monitoramento preciso de saturação de oxigênio e frequência cardíaca",
    image: "/imgs/productimgs/oximetro-adulto.png",
    affiliateLink: "https://amzn.to/3I94D9z",
  },
  {
    id: 8,
    name: "Oxímetro de Dedo Pediátrico",
    description:
      "Design especializado para medições precisas em pacientes infantis",
    image: "/imgs/productimgs/oximetro.png",
    affiliateLink: "https://amzn.to/3HKlwHO",
  },
];

export default function Shopping() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Heading
        title="Equipamentos Médicos Selecionados"
        description="Produtos de qualidade testados e aprovados por residentes e especialistas"
        icon={ShoppingBag}
        iconColor="text-pink-700 dark:text-pink-500"
        bgColor="bg-violet-500/10 dark:bg-violet-500/20"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Kit essencial para sua residência médica
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Equipamentos confiáveis que farão diferença no seu dia a dia como
            médico(a)
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-900 dark:text-blue-200">
              <strong>Dica profissional:</strong> Estes produtos foram
              selecionados por sua qualidade e utilidade na prática clínica
              diária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 text-center">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Pronto para equipar sua jornada médica?
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Clique em qualquer produto para ver as opções disponíveis e
              escolher o melhor para suas necessidades.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
