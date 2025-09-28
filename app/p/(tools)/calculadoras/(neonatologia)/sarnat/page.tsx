"use client"; // Necessário para usar hooks de React como useState

import React, { useState, useEffect } from "react";

// --- Componente Auxiliar para Entradas da Escala ---
interface SarnatInputProps {
  categoryKey: string;
  label: string;
  options: { score: number; text: string }[];
  selectedValue: number | null;
  onChange: (categoryKey: string, score: number) => void;
}

const SarnatInput: React.FC<SarnatInputProps> = ({
  categoryKey,
  label,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b pb-1">
        {label}
      </h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.score + option.text}
            className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <input
              type="radio"
              name={categoryKey}
              value={option.score}
              checked={selectedValue === option.score}
              onChange={() => onChange(categoryKey, option.score)}
              className="form-radio h-4 w-4 text-purple-600 border-gray-300 dark:border-gray-600 focus:ring-purple-500"
            />
            <span className="ml-2">
              {option.text}
              <span
                className={`ml-1 font-medium ${
                  option.score === 0
                    ? "text-green-600"
                    : option.score === 1
                    ? "text-yellow-600"
                    : option.score === 2
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                ({option.score})
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// --- Componente: SarnatScaleEvaluator ---
const SarnatScaleEvaluator: React.FC = () => {
  const [selectedScores, setSelectedScores] = useState<{
    [key: string]: number | null;
  }>({
    consciousness: null,
    spontaneousActivity: null,
    posture: null,
    tone: null,
    suckingReflex: null,
    moroReflex: null,
    pupils: null,
    heartRate: null,
    respiration: null,
  });
  const [hasConvulsed, setHasConvulsed] = useState<boolean>(false);
  const [overallSarnatStage, setOverallSarnatStage] = useState<string>("");

  const sarnatCategories = [
    {
      id: "consciousness",
      label: "1. Nível de Consciência",
      options: [
        { score: 0, text: "ALERTA E RESPONSIVO" },
        { score: 1, text: "LETÁRGICO" },
        { score: 2, text: "ESTUPOR / COMA" },
        { score: 3, text: "HIPERALERTA, RESPONDE A MÍNIMOS ESTÍMULOS" },
      ],
    },
    {
      id: "spontaneousActivity",
      label: "2. Atividade Espontânea",
      options: [
        { score: 0, text: "ESPONTÂNEA" },
        { score: 1, text: "REDUZIDA" },
        { score: 2, text: "SEM ATIVIDADE" },
        { score: 3, text: "ESPONTÂNEA/ REDUZIDA" }, // Document has this duplicated. Assuming this indicates a severe reduction.
      ],
    },
    {
      id: "posture",
      label: "3. Postura",
      options: [
        { score: 0, text: "EM FLEXÃO" },
        { score: 1, text: "LEVE FLEXÃO DISTAL (PUNHOS E DEDOS)" },
        { score: 2, text: "FLEXÃO DISTAL E EXTENSÃO COMPLETA" },
        { score: 3, text: "DESCEREBRAÇÃO" },
      ],
    },
    {
      id: "tone",
      label: "4. Tônus",
      options: [
        { score: 0, text: "NORMAL" },
        { score: 1, text: "HIPOTONIA (FOCAL OU GERAL) OU HIPERTONIA" },
        { score: 2, text: "FLÁCIDO OU RÍGIDO (Moderado)" }, // Distinguishing due to document's duplication
        { score: 3, text: "FLÁCIDO OU RÍGIDO (Grave)" }, // Distinguishing due to document's duplication
      ],
    },
    {
      id: "suckingReflex",
      label: "5. Reflexos Primitivos: Sucção",
      options: [
        { score: 0, text: "FORTE" },
        { score: 1, text: "FRACA" },
        { score: 2, text: "FRACA /MORDIDA" },
        { score: 3, text: "AUSENTE" },
      ],
    },
    {
      id: "moroReflex",
      label: "6. Reflexos Primitivos: Moro",
      options: [
        { score: 0, text: "COMPLETO" },
        { score: 1, text: "NORMAL /INCOMPLETO" },
        { score: 2, text: "INCOMPLETO" },
        { score: 3, text: "AUSENTE" },
      ],
    },
    {
      id: "pupils",
      label: "7. Sistema Autonômico: Pupilas",
      options: [
        { score: 0, text: "FOTORREAGENTE" },
        { score: 1, text: "MIDRÍASE LEVE" },
        { score: 2, text: "MIOSE" },
        { score: 3, text: "ARREATIVA" },
      ],
    },
    {
      id: "heartRate",
      label: "8. Sistema Autonômico: FC",
      options: [
        { score: 0, text: "100 – 160BPM" },
        { score: 1, text: "TAQUICARDIA" },
        { score: 2, text: "BRADICARDIA" },
        { score: 3, text: "VARIÁVEL" },
      ],
    },
    {
      id: "respiration",
      label: "9. Sistema Autonômico: Respiração",
      options: [
        { score: 0, text: "REGULAR" },
        { score: 1, text: "TAQUIPNEIA" },
        { score: 2, text: "PERIÓDICA" },
        { score: 3, text: "APNEIA/VM" },
      ],
    },
  ];

  const scoreMapToStage = (score: number) => {
    switch (score) {
      case 0:
        return "NORMAL";
      case 1:
        return "EHI LEVE";
      case 2:
        return "EHI MODERADA";
      case 3:
        return "EHI GRAVE";
      default:
        return "INCOMPLETO";
    }
  };

  useEffect(() => {
    if (hasConvulsed) {
      setOverallSarnatStage("EHI MODERADA (Devido a Convulsão)");
      return;
    }

    const allScores = Object.values(selectedScores).filter(
      (score): score is number => score !== null
    );

    if (allScores.length < sarnatCategories.length) {
      setOverallSarnatStage("Selecione todos os critérios para avaliar.");
      return;
    }

    const stageCounts: { [key: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0 };
    allScores.forEach((score) => {
      stageCounts[score]++;
    });

    let maxCount = -1;
    let stagesWithMaxCount: number[] = [];

    for (let i = 0; i <= 3; i++) {
      if (stageCounts[i] > maxCount) {
        maxCount = stageCounts[i];
        stagesWithMaxCount = [i];
      } else if (stageCounts[i] === maxCount) {
        stagesWithMaxCount.push(i);
      }
    }

    let finalScore: number;

    if (stagesWithMaxCount.length === 1) {
      finalScore = stagesWithMaxCount[0];
    } else if (
      stagesWithMaxCount.length === 2 &&
      stagesWithMaxCount[1] === stagesWithMaxCount[0] + 1
    ) {
      // Tie between two adjacent categories (e.g., Leve and Moderada)
      const consciousnessScore = selectedScores.consciousness;
      if (consciousnessScore === stagesWithMaxCount[0]) {
        finalScore = stagesWithMaxCount[0];
      } else if (consciousnessScore === stagesWithMaxCount[1]) {
        finalScore = stagesWithMaxCount[1];
      } else {
        // If consciousness score is not one of the tied stages, default to the higher.
        finalScore = stagesWithMaxCount[1];
      }
    } else {
      // More complex ties or non-adjacent ties, default to the most severe selected score
      finalScore = Math.max(...allScores);
    }

    setOverallSarnatStage(scoreMapToStage(finalScore));
  }, [selectedScores, hasConvulsed]);

  const handleChange = (categoryKey: string, score: number) => {
    setSelectedScores((prev) => ({
      ...prev,
      [categoryKey]: score,
    }));
    // If a score is selected, automatically uncheck convulsion, unless convulsion is the reason for score.
    // However, the rule is "if the patient convulsed, automatically MODERADA". So convulsion overrides.
    // If convulsion is checked, scores don't matter for the final output.
    // But for completeness, allow interaction.
    if (hasConvulsed) {
      setHasConvulsed(false); // If user starts selecting criteria, assume they want a detailed assessment.
    }
  };

  const handleConvulsionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasConvulsed(event.target.checked);
    // If convulsion is checked, reset other selections for clarity
    if (event.target.checked) {
      setSelectedScores(
        Object.fromEntries(
          Object.keys(selectedScores).map((key) => [key, null])
        )
      );
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6 border-b pb-2">
        Escala de Sarnat e Sarnat (Modificada)
      </h2>

      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-800 dark:text-red-200 rounded-md shadow-inner">
        <label className="flex items-center text-xl font-bold cursor-pointer">
          <input
            type="checkbox"
            checked={hasConvulsed}
            onChange={handleConvulsionChange}
            className="form-checkbox h-6 w-6 text-red-600 dark:text-red-400 border-red-400 dark:border-red-600 focus:ring-red-500"
          />
          <span className="ml-3">Marque aqui se o paciente CONVULSIONOU.</span>
        </label>
        <p className="text-sm mt-2">
          <span className="font-bold">Regra Importante:</span> Se o paciente
          convulsionar, classifica automaticamente como EHI Moderada.
        </p>
      </div>

      {!hasConvulsed && (
        <div className="space-y-6">
          {sarnatCategories.map((category) => (
            <SarnatInput
              key={category.id}
              categoryKey={category.id}
              label={category.label}
              options={category.options}
              selectedValue={selectedScores[category.id]}
              onChange={handleChange}
            />
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900 rounded-md">
        <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
          Classificação Final da EHI:{" "}
          <span className="text-purple-600 dark:text-purple-300">
            {overallSarnatStage}
          </span>
        </p>
      </div>
    </div>
  );
};

// --- Componente: SarnatInfoSection ---
const SarnatInfoSection: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md prose prose-purple dark:prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6 border-b pb-2">
        Escala de Sarnat e Sarnat – Modificada por Levene e Volpe: Avaliação e
        Diretrizes
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        A Escala de Sarnat e Sarnat, em sua versão modificada por Levene e
        Volpe, é uma ferramenta essencial para a avaliação e classificação da
        Encefalopatia Hipóxico-Isquêmica (EHI) em recém-nascidos. Esta escala
        auxilia na determinação da gravidade do comprometimento neurológico,
        guiando as condutas clínicas, incluindo a indicação de hipotermia
        terapêutica.
      </p>

      {/* Nova Seção: Critérios de Inclusão */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Critérios de Inclusão para Hipotermia Terapêutica
        </h3>
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <h4 className="font-bold text-lg mb-3 text-blue-800 dark:text-blue-200">
            TODOS os critérios abaixo devem estar presentes:
          </h4>
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
            <li>Idade gestacional ≥ 36 semanas</li>
            <li>Peso de nascimento ≥ 1800g</li>
            <li>RN com até 6h de vida</li>
            <li>
              Evento isquêmico perinatal (pelo menos 2 dos seguintes):
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                <li>Apgar ≤ 5 no 5º minuto de vida</li>
                <li>
                  Necessidade de ventilação mecânica ou reanimação prolongada
                  (≥10 minutos)
                </li>
                <li>
                  Acidose grave (pH ≤ 7.0 ou BD ≥ 16 mmol/L no cordão ou na 1ª
                  hora de vida)
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Nova Seção: Critérios de Exclusão */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Critérios de Exclusão para Hipotermia Terapêutica
        </h3>
        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700">
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
            <li>Idade gestacional &lt; 36 semanas</li>
            <li>Peso de nascimento &lt; 1800g</li>
            <li>Malformações congênitas maiores</li>
            <li>Sangramento ativo ou distúrbio de coagulação significativo</li>
            <li>RN com mais de 6 horas de vida</li>
          </ul>
        </div>
      </div>

      {/* Nova Seção: Orientações para Avaliação */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Orientações para Avaliação - Dúvidas Comuns
        </h3>
        <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
          <ul className="list-disc list-inside space-y-3 pl-4 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-bold">Nível de consciência:</span> Item de
              desempate em caso de empate entre dois estágios
            </li>
            <li>
              <span className="font-bold">Avaliação do tônus:</span> Avaliar
              membros, tronco e pescoço. Em caso de diferença, considerar MMII
              ou o escore predominante
            </li>
            <li>
              <span className="font-bold">Reflexo de Moro:</span>
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                <li>
                  Em fratura de clavícula ou lesão de plexo braquial, avaliar o
                  lado contralateral
                </li>
                <li>
                  Em RN intubado: testar levantando e abaixando gentilmente a
                  cabeça
                </li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Pupilas assimétricas:</span>{" "}
              Classificar como estágio 3 (grave)
            </li>
            <li>
              <span className="font-bold">Frequência cardíaca:</span> Considerar
              valores documentados recentemente
            </li>
            <li>
              <span className="font-bold">Respiração:</span> RN em VM com dúvida
              sobre capacidade de respirar espontaneamente → estágio 3
            </li>
          </ul>
        </div>
      </div>

      {/* Tabela da Escala de Sarnat e Sarnat */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Tabela da Escala de Sarnat e Sarnat Modificada
      </h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b border-gray-300 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                CATEGORIA
              </th>
              <th className="py-2 px-3 border-b border-gray-300 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                NORMAL (0)
              </th>
              <th className="py-2 px-3 border-b border-gray-300 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                EHI LEVE (1)
              </th>
              <th className="py-2 px-3 border-b border-gray-300 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                EHI MODERADA (2)
              </th>
              <th className="py-2 px-3 border-b border-gray-300 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                EHI GRAVE (3)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                1.NÍVEL DE CONSCIÊNCIA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                ALERTA E RESPONSIVO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                LETÁRGICO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                ESTUPOR / COMA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                HIPERALERTA, RESPONDE A MÍNIMOS ESTÍMULOS
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                2.ATIVIDADE ESPONTÂNEA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                ESPONTÂNEA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                REDUZIDA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                SEM ATIVIDADE
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                ESPONTÂNEA/ REDUZIDA
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                3.POSTURA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                EM FLEXÃO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                LEVE FLEXÃO DISTAL (PUNHOS E DEDOS)
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                FLEXÃO DISTAL E EXTENSÃO COMPLETA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                DESCEREBRAÇÃO
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                4.TÔNUS
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                NORMAL
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                HIPOTONIA (FOCAL OU GERAL) OU HIPERTONIA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                FLÁCIDO OU RÍGIDO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                FLÁCIDO OU RÍGIDO
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                5.REFLEXOS PRIMITIVOS SUCÇÃO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                FORTE
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                FRACA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                FRACA /MORDIDA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                AUSENTE
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                6.REFLEXOS PRIMITIVOS MORO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                COMPLETO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                NORMAL /INCOMPLETO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                INCOMPLETO
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                AUSENTE
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                7.SISTEMA AUTONÔMICO PUPILAS
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                FOTORREAGENTE
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                MIDRÍASE LEVE
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                MIOSE
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                ARREATIVA
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                8.SISTEMA AUTONÔMICO FC
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                100 – 160BPM
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                TAQUICARDIA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                BRADICARDIA
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                VARIÁVEL
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium">
                9.SISTEMA AUTONÔMICO RESPIRAÇÃO
              </td>
              <td className="py-2 px-3">REGULAR</td>
              <td className="py-2 px-3">TAQUIPNEIA</td>
              <td className="py-2 px-3">PERIÓDICA</td>
              <td className="py-2 px-3">APNEIA/VM</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Diretrizes para a Avaliação da Escala de Sarnat e Sarnat
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li>
          Após admissão na UTI, aguardar 10 minutos, estabilização e término da
          manipulação inicial para realizar a primeira avaliação.
        </li>
        <li>
          Dividir o exame em duas etapas: Observação (primeira) e Manipulação
          Ativa (segunda).
        </li>
        <li>
          Na fase de Manipulação Ativa, seguir a seguinte ordem: TÔNUS, SUCÇÃO,
          MORO, PUPILA.
        </li>
        <li>
          <span className="font-bold text-red-600 dark:text-red-400">
            Se o paciente convulsionar, classifica automaticamente como
            MODERADO.
          </span>
        </li>
        <li>Indica-se Hipotermia Terapêutica se EHI Moderada ou Grave.</li>
        <li>
          Após indicar Hipotermia, não deverá ser suspensa se a escala de
          Sarnat-Sarnat melhorar.
        </li>
        <li>
          Realizar avaliação de hora em hora até 6 horas ou atingir critério de
          hipotermia e avaliação diária até término da hipotermia.
        </li>
        <li>
          <span className="font-bold text-purple-600 dark:text-purple-400">
            O NÍVEL DE CONSCIÊNCIA É O ITEM DE DESEMPATE, CASO OCORRA EMPATE EM
            DUAS CATEGORIAS.
          </span>
        </li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Notas Adicionais para Avaliação
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li>
          Avaliar tônus em membros, tronco e pescoço. Se for desigual,
          considerar a avaliação de MMII.
        </li>
        <li>
          Reflexo de Moro: considerar o lado contralateral em caso de fratura de
          clavícula ou paralisia braquial.
        </li>
        <li>Pupilas Assimétricas: Estágio 3 (Grave).</li>
        <li>FC: avaliar antes do início do resfriamento.</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Tempos de Avaliação Sugeridos
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        O documento sugere pontos de avaliação no tempo de vida (em horas):
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>1 hora</li>
        <li>2 horas</li>
        <li>3 horas</li>
        <li>4 horas</li>
        <li>5 horas</li>
        <li>6 horas</li>
        <li>24 horas</li>
        <li>48 horas</li>
      </ul>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Estas avaliações são cruciais para monitorar a evolução do quadro e a
        resposta às intervenções.
      </p>
    </div>
  );
};

// --- Main Page Component ---
const Sarnat: React.FC = () => {
  const [showInteractive, setShowInteractive] = useState(true);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 dark:text-purple-300 mb-10">
        Avaliação de EHI: Escala de Sarnat e Sarnat
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setShowInteractive(true)}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300
            ${
              showInteractive
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
        >
          Avaliação Interativa
        </button>
        <button
          onClick={() => setShowInteractive(false)}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300
            ${
              !showInteractive
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
        >
          Informações Detalhadas
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {showInteractive ? <SarnatScaleEvaluator /> : <SarnatInfoSection />}
      </div>

      {/* Disclaimer de saúde */}
      <div className="mt-12 p-4 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-md shadow-inner">
        <p className="font-bold">Aviso Legal:</p>
        <p>
          Este aplicativo é uma ferramenta educacional e de apoio. As
          informações aqui apresentadas não substituem a avaliação clínica de um
          profissional de saúde qualificado. Em caso de emergência médica,
          procure atendimento imediatamente.
        </p>
      </div>
    </main>
  );
};

export default Sarnat;
