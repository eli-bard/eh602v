"use client"; // Necessário para usar hooks de React como useState

import React, { useState, useEffect } from "react";

// --- Componente: GCSInput ---
interface GCSInputProps {
  label: string;
  options: { score: number; text: string }[];
  selectedValue: number | null;
  onChange: (score: number) => void;
}

const GCSInput: React.FC<GCSInputProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {label}
      </h3>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <label
            key={option.score}
            className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <input
              type="radio"
              name={label}
              value={option.score}
              checked={selectedValue === option.score}
              onChange={() => onChange(option.score)}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            />
            <span className="ml-2">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// --- Componente: GCSCalculator ---
const GCSCalculator: React.FC = () => {
  const [eyeScore, setEyeScore] = useState<number | null>(null);
  const [verbalScore, setVerbalScore] = useState<number | null>(null);
  const [motorScore, setMotorScore] = useState<number | null>(null);
  const [gcsTotal, setGcsTotal] = useState<number | null>(null);
  const [tbiClassification, setTbiClassification] = useState<string>("");

  useEffect(() => {
    if (eyeScore !== null && verbalScore !== null && motorScore !== null) {
      const total = eyeScore + verbalScore + motorScore;
      setGcsTotal(total);

      if (total >= 13 && total <= 15) {
        setTbiClassification("TCE Leve");
      } else if (total >= 9 && total <= 12) {
        setTbiClassification("TCE Moderado");
      } else if (total >= 3 && total <= 8) {
        setTbiClassification("TCE Grave");
      } else {
        setTbiClassification("Classificação Indefinida");
      }
    } else {
      setGcsTotal(null);
      setTbiClassification("");
    }
  }, [eyeScore, verbalScore, motorScore]);

  const eyeOptions = [
    { score: 4, text: "Espontânea" },
    { score: 3, text: "Ao chamado" },
    { score: 2, text: "À dor" },
    { score: 1, text: "Ausente" },
  ];

  const verbalOptionsChild = [
    { score: 5, text: "Balbucio" },
    { score: 4, text: "Choro irritado" },
    { score: 3, text: "Choro à dor" },
    { score: 2, text: "Gemido à dor" },
    { score: 1, text: "Ausente" },
  ];

  const motorOptions = [
    { score: 6, text: "Obedece a comandos" },
    { score: 5, text: "Retira ao toque" },
    { score: 4, text: "Retirada à dor" },
    { score: 3, text: "Flexão anormal (decorticação)" },
    { score: 2, text: "Extensão anormal (descerebração)" },
    { score: 1, text: "Ausente" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">
        Escala de Coma de Glasgow (Modificada para Crianças)
      </h2>

      <GCSInput
        label="Abertura Ocular"
        options={eyeOptions}
        selectedValue={eyeScore}
        onChange={setEyeScore}
      />
      <GCSInput
        label="Resposta Verbal"
        options={verbalOptionsChild}
        selectedValue={verbalScore}
        onChange={setVerbalScore}
      />
      <GCSInput
        label="Resposta Motora"
        options={motorOptions}
        selectedValue={motorScore}
        onChange={setMotorScore}
      />

      {gcsTotal !== null && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
          <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
            Pontuação Total da ECG:{" "}
            <span className="text-blue-600 dark:text-blue-300">{gcsTotal}</span>
          </p>
          <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
            Classificação do TCE:{" "}
            <span className="text-blue-600 dark:text-blue-300">
              {tbiClassification}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

// --- Componente: TBICriteriaEvaluator ---
const TBICriteriaEvaluator: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState<"under2" | "over2" | null>(null);
  const [criteria, setCriteria] = useState<{ [key: string]: boolean }>({});
  const [recommendation, setRecommendation] = useState<string>("");
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  const handleAgeGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeGroup(event.target.value as "under2" | "over2");
    setCriteria({}); // Reset criteria when age group changes
    setRecommendation("");
    setShowDisclaimer(false);
  };

  const handleCriteriaChange = (key: string, value: boolean) => {
    setCriteria((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!ageGroup) {
      setRecommendation("");
      setShowDisclaimer(false);
      return;
    }

    let tcRecommended = false;
    let tcConsiderObservation = false;

    if (ageGroup === "under2") {
      // Critérios para < 2 anos
      const ecg14OrAlterationOrFracture =
        criteria["ecg14OrAlterationOrFracture_under2"];
      const occipitalHematomaOrLOC5sOrSevereMechOrAbnormalBehavior =
        criteria[
          "occipitalHematomaOrLOC5sOrSevereMechOrAbnormalBehavior_under2"
        ];

      if (ecg14OrAlterationOrFracture) {
        tcRecommended = true;
      } else if (occipitalHematomaOrLOC5sOrSevereMechOrAbnormalBehavior) {
        tcConsiderObservation = true;
        setShowDisclaimer(true);
      }
    } else {
      // ageGroup === 'over2'
      // Critérios para > 2 anos
      const ecg14OrAlterationOrSkullBaseFracture =
        criteria["ecg14OrAlterationOrSkullBaseFracture_over2"];
      const historyLOCOrVomitingOrSevereMechOrHeadache =
        criteria["historyLOCOrVomitingOrSevereMechOrHeadache_over2"];

      if (ecg14OrAlterationOrSkullBaseFracture) {
        tcRecommended = true;
      } else if (historyLOCOrVomitingOrSevereMechOrHeadache) {
        tcConsiderObservation = true;
        setShowDisclaimer(true);
      }
    }

    if (tcRecommended) {
      setRecommendation("TC RECOMENDADA");
    } else if (tcConsiderObservation) {
      setRecommendation(
        "TC versus observação. Considerar: Experiência clínica, Achados múltiplos ou isolados, Piora durante observação, Preferência dos pais."
      );
    } else if (ageGroup) {
      // Only set 'não recomendada' if an age group is selected and no other criteria met
      setRecommendation("TC NÃO RECOMENDADA");
    }
  }, [ageGroup, criteria]);

  const renderCriteriaCheckboxes = () => {
    if (ageGroup === "under2") {
      return (
        <div className="space-y-3 mt-4">
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
              checked={criteria["ecg14OrAlterationOrFracture_under2"] || false}
              onChange={(e) =>
                handleCriteriaChange(
                  "ecg14OrAlterationOrFracture_under2",
                  e.target.checked
                )
              }
            />
            <span className="ml-2">
              ECG ≤ 14 ou alteração do estado mental ou fratura de crânio
              palpável
            </span>
          </label>
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
              checked={
                criteria[
                  "occipitalHematomaOrLOC5sOrSevereMechOrAbnormalBehavior_under2"
                ] || false
              }
              onChange={(e) =>
                handleCriteriaChange(
                  "occipitalHematomaOrLOC5sOrSevereMechOrAbnormalBehavior_under2",
                  e.target.checked
                )
              }
            />
            <span className="ml-2">
              Hematoma occipital ou parietal, história de perda de consciência
              &gt; 5 seg, mecanismo grave de trauma* ou comportamento anormal
              segundo os pais
            </span>
          </label>
          {showDisclaimer && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
              *Mecanismo grave de trauma (&#60; 2 a): Trauma automobilístico com
              ejeção OU morte de outro passageiro, Atropelamento, Queda &#62;
              0,9m (ou &#62; 0,7m ou dobro da altura da criança em &#60; 3
              meses), Objeto de alto impacto.
            </p>
          )}
        </div>
      );
    } else if (ageGroup === "over2") {
      return (
        <div className="space-y-3 mt-4">
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
              checked={
                criteria["ecg14OrAlterationOrSkullBaseFracture_over2"] || false
              }
              onChange={(e) =>
                handleCriteriaChange(
                  "ecg14OrAlterationOrSkullBaseFracture_over2",
                  e.target.checked
                )
              }
            />
            <span className="ml-2">
              ECG ≤ 14 ou alteração do estado mental ou sinais de fratura de
              base de crânio
            </span>
          </label>
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
              checked={
                criteria["historyLOCOrVomitingOrSevereMechOrHeadache_over2"] ||
                false
              }
              onChange={(e) =>
                handleCriteriaChange(
                  "historyLOCOrVomitingOrSevereMechOrHeadache_over2",
                  e.target.checked
                )
              }
            />
            <span className="ml-2">
              História de perda de consciência, vômitos, mecanismo grave de
              trauma* ou cefaleia intensa
            </span>
          </label>
          {showDisclaimer && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
              *Mecanismo grave de trauma (&#62; 2 a): Trauma automobilístico com
              ejeção OU morte de outro passageiro, Atropelamento, Queda &#62;
              1,5m, Objeto de alto impacto.
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">
        Avaliação de Critérios para TC de Crânio em TCE Leve
      </h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Faixa Etária do Paciente:
        </h3>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="radio"
              name="ageGroup"
              value="under2"
              checked={ageGroup === "under2"}
              onChange={handleAgeGroupChange}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            />
            <span className="ml-2">Crianças menores de 2 anos</span>
          </label>
          <label className="inline-flex items-center text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="radio"
              name="ageGroup"
              value="over2"
              checked={ageGroup === "over2"}
              onChange={handleAgeGroupChange}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            />
            <span className="ml-2">Crianças maiores de 2 anos</span>
          </label>
        </div>
      </div>

      {ageGroup && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Selecione os critérios presentes no paciente (
            {ageGroup === "under2" ? "menor de 2 anos" : "maior de 2 anos"}):
          </h3>
          {renderCriteriaCheckboxes()}
        </div>
      )}

      {recommendation && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-md">
          <p className="text-xl font-bold text-green-800 dark:text-green-200">
            Recomendação para TC de Crânio:{" "}
            <span className="text-green-600 dark:text-green-300">
              {recommendation}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

// --- Componente: TBIInfoSection ---
const TBIInfoSection: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md prose prose-blue dark:prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 border-b pb-2">
        Manejo do Traumatismo Cranioencefálico (TCE) em Crianças e Adolescentes
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        O traumatismo cranioencefálico (TCE) em pediatria é um motivo frequente
        de busca por atendimentos médicos, sendo a maior parte dos casos (cerca
        de 80%) classificados como TCE leve. É crucial direcionar atenção
        especial ao atendimento nesta população devido às suas peculiaridades
        anatômicas, como a maior proporção do segmento cefálico em relação ao
        corpo, e à dificuldade na avaliação objetiva de sinais e sintomas de
        gravidade. A impressão dos pais e/ou responsáveis acerca da criança pode
        ser uma fonte valiosa de informação.
      </p>

      {/* Classificação */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Classificação do TCE com base na Escala de Coma de Glasgow (ECG)
      </h3>
      <table className="min-w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
              Pontuação ECG
            </th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
              Classificação do TCE
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
              13 a 15
            </td>
            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
              TCE leve
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
              9 a 12
            </td>
            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
              TCE moderado
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">
              3 a 8
            </td>
            <td className="py-2 px-4 text-gray-800 dark:text-gray-200">
              TCE grave
            </td>
          </tr>
        </tbody>
      </table>

      {/* Tabela GCS Modificada */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Escala de Coma de Glasgow Modificada para Crianças
      </h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                Abertura Ocular
              </th>
              <th className="py-2 px-3 border-b text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                Resposta Verbal (Crianças)
              </th>
              <th className="py-2 px-3 border-b text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                Resposta Motora
              </th>
              <th className="py-2 px-3 border-b text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                Escore
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Espontânea
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Balbucio
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Obedece a comandos
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                4, 5, 6
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Ao chamado
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Choro irritado
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Retira ao toque
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                3, 4, 5
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                À dor
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Choro à dor
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Retirada à dor
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                2, 3, 4
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Ausente
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Gemido à dor
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Flexão anormal
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                1, 2, 3
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3"></td>
              <td className="py-2 px-3">Ausente</td>
              <td className="py-2 px-3">Extensão anormal</td>
              <td className="py-2 px-3">1, 2</td>
            </tr>
            <tr>
              <td className="py-2 px-3"></td>
              <td className="py-2 px-3"></td>
              <td className="py-2 px-3">Ausente</td>
              <td className="py-2 px-3">1</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Manejo Inicial */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Manejo Inicial do TCE Pediátrico
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Todo paciente vítima de TCE deve ter seu manejo sistematizado de acordo
        com as diretrizes do{" "}
        <span className="font-semibold">
          Advanced Trauma Life Support (ATLS)
        </span>{" "}
        e do{" "}
        <span className="font-semibold">
          Pediatric Advanced Life Support (PALS)
        </span>
        . Uma atenção especial deve ser dada à proteção da coluna cervical se
        houver suspeita de trauma raquimedular concomitante.
      </p>

      {/* Fluxograma TCE Leve */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Manejo do TCE Leve
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        O principal ponto de decisão no atendimento ao TCE leve é a
        identificação clínica de pacientes com potencial risco de lesões
        intracranianas para a realização de Tomografia Computadorizada (TC) de
        crânio. Em crianças, a decisão deve ser minuciosa, baseada na avaliação
        da Escala de Coma de Glasgow (ECG), mecanismo do trauma e exame físico
        neurológico. O racional da conduta de observação clínica versus
        realização de TC de crânio deve equilibrar a identificação de lesões
        intracranianas e a ponderação de uma exposição desnecessária à radiação.
      </p>

      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
        Indicação de TC de Crânio em Crianças Menores de 2 Anos com TCE Leve:
      </h4>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          <span className="font-semibold">TC RECOMENDADA</span> se: ECG ≤ 14 ou
          alteração do estado mental ou fratura de crânio palpável.
        </li>
        <li>
          <span className="font-semibold">
            TC versus observação (considerar experiência clínica, achados
            múltiplos ou isolados, piora durante observação, preferência dos
            pais, idade &#60; 3 meses)
          </span>{" "}
          se: Hematoma occipital ou parietal, história de perda de consciência
          &#62; 5 seg, mecanismo grave de trauma* ou comportamento anormal
          segundo os pais.
          <ul className="list-disc list-inside ml-4 text-sm italic">
            <li>
              *Mecanismo grave de trauma (&#60; 2 a): Trauma automobilístico com
              ejeção OU morte de outro passageiro, Atropelamento, Queda &#62;
              0,9m (em &#60; 3 meses, algumas diretrizes consideram &#62; 0,7m
              ou o dobro da altura da criança), Objeto de alto impacto.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">TC NÃO RECOMENDADA</span> se nenhum
          dos critérios acima for atendido.
        </li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
        Indicação de TC de Crânio em Crianças Maiores de 2 Anos com TCE Leve:
      </h4>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          <span className="font-semibold">TC RECOMENDADA</span> se: ECG ≤ 14 ou
          alteração do estado mental ou sinais de fratura de base de crânio.
        </li>
        <li>
          <span className="font-semibold">
            TC versus observação (considerar experiência clínica, achados
            múltiplos ou isolados, piora durante observação, preferência dos
            pais)
          </span>{" "}
          se: História de perda de consciência, vômitos, mecanismo grave de
          trauma* ou cefaleia intensa.
          <ul className="list-disc list-inside ml-4 text-sm italic">
            <li>
              *Mecanismo grave de trauma (&#62; 2 a): Trauma automobilístico com
              ejeção OU morte de outro passageiro, Atropelamento, Queda &#62;
              1,5m, Objeto de alto impacto.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">TC NÃO RECOMENDADA</span> se nenhum
          dos critérios acima for atendido.
        </li>
      </ul>

      {/* Fluxograma TCE Moderado e Grave */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Manejo do TCE Moderado e Grave
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>Realizar TC de crânio o mais rapidamente possível.</li>
        <li>Acionar a retaguarda de Neurocirurgia.</li>
        <li>Coleta de exames, incluindo Hb/Ht, função renal e eletrólitos.</li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
        Medidas Gerais de Neuroproteção:
      </h4>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>Manter a cabeça em posição neutra e decúbito elevado a 30º.</li>
        <li>
          Manter analgesia e sedação adequadas (preferência por cetamina ou
          etomidato para sequência rápida de intubação, evitar succinilcolina).
        </li>
        <li>
          Para pacientes em ventilação mecânica, manter controle de PaO2 de 90 a
          100 mmHg e PaCO2 de 35 a 40 mmHg.
          <ul className="list-disc list-inside ml-4 text-sm">
            <li>
              A hiperventilação terapêutica temporária (PaCO2 30 a 35 mmHg) pode
              ser iniciada sob orientação de um neurocirurgião para pacientes
              com sinais de herniação iminente.
            </li>
            <li>
              A hiperventilação agressiva (PaCO2 &#60; 30 mmHg) é indicada
              apenas se houver sinais clínicos de herniação aguda.
            </li>
          </ul>
        </li>
        <li>
          Evitar a hipotensão arterial (em crianças &#60; 10 anos, calcular a
          pressão sistólica mínima como 70 + (2 x idade em anos) mmHg).
        </li>
        <li>
          Manter normotermia (36 - 37,5ºC) e evitar agressivamente a hipertermia
          (&#62; 38ºC).
        </li>
        <li>
          Em caso de crises convulsivas relacionadas ao trauma, tratar como
          estado de mal convulsivo e administrar fenitoína. O uso profilático de
          fenitoína pode ser considerado em caso de TCE GRAVE (Glasgow ≤ 8) ou
          no TCE MODERADO em menores de 2 anos ou independentemente da idade na
          presença de sangramento / lesões cerebrais confirmadas por imagem,
          hipertensão intracraniana, alteração significativa do nível de
          consciência.
        </li>
        <li>Evitar soluções hipotônicas para aporte hídrico.</li>
        <li>
          Iniciar aporte nutricional precocemente, preferencialmente por via
          enteral.
        </li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
        Alvos Terapêuticos:
      </h4>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>Manter o sódio sérico entre 135 e 150 mEq/L.</li>
        <li>SatO2 &#62; 92%.</li>
        <li>
          Manter diurese &#62; 1,0 mL/kg/h até 30 kg e &#62; 30mL/h para &#62;
          30 kg.
        </li>
        <li>
          Hb mínima de 7,0 g/dL. Se instabilidade hemodinâmica ou neurológica, o
          alvo deve ser de 10 g/dL.
        </li>
        <li>
          Pressão intracraniana (PIC) &#60; 20 mmHg e pressão de perfusão
          cerebral (PPC = PAM - PIC) 40 a 65 mmHg.
        </li>
        <li>Manter controle glicêmico até 180 mg/dL.</li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
        Intervenções Farmacológicas Específicas para Hipertensão Intracraniana
        (TCE Grave):
      </h4>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          A monitorização da PIC pode ser utilizada para auxílio no manejo
          clínico.
        </li>
        <li>
          <span className="font-semibold">Para Redução da PIC:</span>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li>Se paciente com ventriculostomia, drenar LCR.</li>
            <li>
              Otimizar a PPC, garantir volume intravascular adequado, utilizar
              drogas vasoativas (se necessário, para manter a PAM).
            </li>
            <li>
              Otimizar analgesia e sedação, considerar Bloqueador Neuromuscular
              (BNM).
            </li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">
            Para Aumento Persistente de PIC:
          </span>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li>
              Bôlus de solução salina hipertônica 3% (2 a 5 mL/kg em 10 a 20
              minutos). Se não disponível: 15 mL de NaCl 20% + 85 mL de água
              destilada.
            </li>
            <li>
              Bôlus de manitol 0,25-1g/kg em 20 - 30 minutos (evitar em
              pacientes hipovolêmicos).
            </li>
          </ul>
        </li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
        Suspeita de Herniação:
      </h4>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        Devemos suspeitar de herniação se houver dilatação pupilar ou
        anisocoria, além da Tríade de Cushing (hipertensão, bradicardia,
        bradipneia) e/ou postura em extensão. Sintomas de herniação podem
        ocorrer a qualquer momento durante o manejo do TCE grave, ou até mesmo
        na apresentação inicial.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        <span className="font-semibold">
          Intervenções para Suspeita de Herniação:
        </span>
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>Hiperventilação com FiO2 100%.</li>
        <li>Bôlus de manitol 0,5-1g/kg OU salina hipertônica 3% 1-3 mL/kg.</li>
        <li>Drenagem de LCR (se ventriculostomia presente).</li>
        <li>TC de urgência e avaliação neurocirúrgica.</li>
      </ul>

      {/* Indicadores de Qualidade */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Indicadores de Qualidade
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>Indicação adequada de exames de imagem.</li>
      </ul>

      {/* Alocação */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Alocação de Pacientes
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          Alocar pacientes com TCE MODERADO / GRAVE em leito de emergência.
        </li>
        <li>Internação em LEITO DE UTI (Unidade de Terapia Intensiva).</li>
      </ul>

      {/* Glossário */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Glossário
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>ECG - Escala de Coma de Glasgow</li>
        <li>PPC - Pressão de Perfusão Cerebral</li>
        <li>PIC - Pressão Intracraniana</li>
        <li>BNM - Bloqueador Neuromuscular</li>
        <li>TCE - Traumatismo Crânio Encefálico</li>
        <li>UTI - Unidade de Terapia Intensiva</li>
      </ul>

      {/* Tabela de Altura Padrão de Móveis */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
        Tabela de Altura Padrão de Móveis (Referência para avaliação de quedas)
      </h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                Móvel
              </th>
              <th className="py-2 px-3 border-b text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                Altura (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Mesa de Jantar
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                75
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Cadeira de Jantar
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                45 (Assento), 85 (Total / Encosto)
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Sofá
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                40-45 (Assento), 80-90 (Total / Encosto)
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Cama
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                50-60 (Colchão), 100-120 (Total / Cabeceira)
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Mesa de Centro
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                40-50
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Mesa Lateral
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                60-70
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Aparador
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                80-90
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Estante
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                30-35 (Cada Prateleira), 180-200 (Total)
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Bancada de Cozinha
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                90
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Armário de Cozinha
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Inferior: 80-90; Superior: +60-90 cm da bancada
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Pia do Banheiro
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                80-85
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Vaso Sanitário
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                40-45
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Escrivaninha/Mesa de Trabalho
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                75
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                Cadeira de Escrivaninha
              </td>
              <td className="py-2 px-3 border-b border-gray-200 dark:border-gray-700">
                45 (Assento), 85-95 (Total / Encosto)
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3">Berço</td>
              <td className="py-2 px-3">
                30-40 (Colchão), 80-100 (Total / Grades)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const TCEPage: React.FC = () => {
  const [showInteractive, setShowInteractive] = useState(true);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 dark:text-blue-300 mb-10">
        Avaliação e Manejo de TCE Pediátrico
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setShowInteractive(true)}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300
            ${
              showInteractive
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          Avaliação Interativa
        </button>
        <button
          onClick={() => setShowInteractive(false)}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300
            ${
              !showInteractive
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          Informações Detalhadas
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {showInteractive ? (
          <>
            <GCSCalculator />
            <TBICriteriaEvaluator />
          </>
        ) : (
          <TBIInfoSection />
        )}
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

export default TCEPage;
