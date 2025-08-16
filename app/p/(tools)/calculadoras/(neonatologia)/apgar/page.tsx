"use client";

import { useState } from "react";
import ApgarForm from "@/components/specifics/apgar/ApgarForm";
import ApgarResult from "@/components/specifics/apgar/ApgarResults";
import { ApgarScore } from "@/components/specifics/apgar/apgar";

const initialScores: ApgarScore = {
  appearance: 0,
  pulse: 0,
  grimace: 0,
  activity: 0,
  respiration: 0,
};

export default function ApgarCalculator() {
  const [scores, setScores] = useState<ApgarScore>(initialScores);

  const handleScoreChange = (parameter: keyof ApgarScore, value: number) => {
    setScores((prev) => ({ ...prev, [parameter]: value }));
  };

  const totalScore = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0
  );

  return (
    <main className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Calculadora do Escore de Apgar
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/50 p-6 border dark:border-gray-700">
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          O escore de Apgar é uma avaliação rápida do estado geral do
          recém-nascido, realizada no 1º e 5º minuto de vida. Avalie cada
          critério e selecione a pontuação correspondente.
        </p>

        <ApgarForm scores={scores} onScoreChange={handleScoreChange} />
        <ApgarResult totalScore={totalScore} />
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border dark:border-blue-800/50">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Sobre o Escore de Apgar
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Criado pela Dra. Virginia Apgar em 1952, o escore avalia cinco
          critérios importantes para a saúde do recém-nascido. Cada critério
          recebe de 0 a 2 pontos, totalizando no máximo 10 pontos. A avaliação é
          feita no 1º e 5º minuto após o nascimento.
        </p>
      </div>
    </main>
  );
}
