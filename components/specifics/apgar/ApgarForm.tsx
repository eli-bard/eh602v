"use client";

import {
  ApgarParameter,
  ApgarScore,
  apgarCriteria,
} from "@/components/specifics/apgar/apgar";
import { cn } from "@/lib/utils";

interface ApgarFormProps {
  scores: ApgarScore;
  onScoreChange: (parameter: ApgarParameter, value: number) => void;
  className?: string;
}

export default function ApgarForm({
  scores,
  onScoreChange,
  className,
}: ApgarFormProps) {
  const parameters: ApgarParameter[] = [
    "appearance",
    "pulse",
    "grimace",
    "activity",
    "respiration",
  ];

  const parameterLabels = {
    appearance: "Aparência (Coloração)",
    pulse: "Frequência Cardíaca",
    grimace: "Reflexos/Resposta a Estímulos",
    activity: "Tônus Muscular",
    respiration: "Respiração",
  };

  return (
    <div className={cn("space-y-6", className)}>
      {parameters.map((param) => (
        <div
          key={param}
          className="border rounded-lg p-4 dark:border-gray-700 dark:bg-gray-700/30"
        >
          <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
            {parameterLabels[param]}
          </h3>
          <div className="space-y-2">
            {apgarCriteria[param].map((criterion) => (
              <div
                key={`${param}-${criterion.score}`}
                className="flex items-center"
              >
                <input
                  type="radio"
                  id={`${param}-${criterion.score}`}
                  name={param}
                  value={criterion.score}
                  checked={scores[param] === criterion.score}
                  onChange={() => onScoreChange(param, criterion.score)}
                  className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                  dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800 
                  focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor={`${param}-${criterion.score}`}
                  className="text-gray-800 dark:text-gray-200"
                >
                  {criterion.score} ponto(s): {criterion.description}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
