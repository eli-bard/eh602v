"use client";

import { useState } from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  parseISO,
} from "date-fns";

interface PatientData {
  name: string;
  birthDate: string;
  ageYears: number;
  ageMonths: number;
  weight: number;
}

interface DrugCalculation {
  drug: string;
  route: string;
  formula: string;
  preparation: string;
  calculatedDose: string;
  administration: string;
  maxDose?: string;
}

const EmergencySheet = () => {
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    birthDate: "",
    ageYears: 0,
    ageMonths: 0,
    weight: 0,
  });
  const [useAgeInput, setUseAgeInput] = useState(false);
  const [calculations, setCalculations] = useState<DrugCalculation[]>([]);

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return { years: 0, months: 0, days: 0 };

    const birth = parseISO(birthDate);
    const now = new Date();

    const years = differenceInYears(now, birth);
    const months = differenceInMonths(now, birth) - years * 12;
    const days =
      differenceInDays(now, birth) -
      differenceInDays(
        now,
        new Date(
          now.getFullYear() - years,
          now.getMonth() - months,
          birth.getDate()
        )
      );

    return { years, months, days };
  };

  const evaluateFormula = (
    formula: string,
    weight: number,
    ageInYears: number
  ): number => {
    try {
      // Substituir elementos da fórmula por valores numéricos
      let expr = formula
        .replace(/,/g, ".")
        .replace(/x/gi, "*")
        .replace(/P/gi, weight.toString())
        .replace(/peso/gi, weight.toString())
        .replace(/idade/gi, ageInYears.toString());

      // Avaliar a expressão matemática
      return eval(expr);
    } catch (error) {
      console.error(`Error evaluating formula: ${formula}`, error);
      return 0;
    }
  };

  const calculateDrugs = (
    weight: number,
    ageInYears: number
  ): DrugCalculation[] => {
    return [
      {
        drug: "Adrenalina (1/1000)",
        route: "EV; ET; IO",
        formula: "P x 0,1",
        preparation: "Diluir 1 mL em 9 mL AD",
        calculatedDose: `${(weight * 0.1).toFixed(2)} mL`,
        administration: "a cada 3 a 5 minutos",
        maxDose: "Máximo 10mL",
      },
      {
        drug: "Adrenalina (1/1000)",
        route: "IM",
        formula: "P x 0,01",
        preparation: "",
        calculatedDose: `${(weight * 0.01).toFixed(2)} mL`,
        administration: "a cada 3 a 5 minutos",
        maxDose: "Máximo 1mL",
      },
      {
        drug: "Noradrenalina",
        route: "EV, ET, IO",
        formula: "0.1 mcg/kg/min",
        preparation: "4 amp em 250mL SF 0,9%",
        calculatedDose: `${((0.1 * weight * 60) / 64).toFixed(2)} mL/h`,
        administration: "em BIC (0,1 - 2 mcg/kg/min)",
        maxDose:
          "Usando a solução padrão de 4 ampolas em 250 mL de SF 0,9%, na dose de 0,1 mcg/kg/min",
      },
      {
        drug: "Noradrenalina",
        route: "EV, ET, IO",
        formula: "2.0 mcg/kg/min",
        preparation: "4 amp em 250mL SF 0,9%",
        calculatedDose: `${((2.0 * weight * 60) / 64).toFixed(2)} mL/h`,
        administration: "em BIC (0,1 - 2 mcg/kg/min)",
        maxDose:
          "Usando a solução padrão de 4 ampolas em 250 mL de SF 0,9%, na dose de 2,0 mcg/kg/min",
      },
      {
        drug: "Atropina 0,5 mg/mL",
        route: "EV; ET; IO",
        formula: "P x 0,04",
        preparation: "",
        calculatedDose: `${(weight * 0.04).toFixed(2)} mL`,
        administration: "sem diluir",
        maxDose: "Min 0,2 mL; Max 2 mL",
      },
      {
        drug: "Bicarbonato de sódio 8,4%",
        route: "EV; IO",
        formula: "Peso",
        preparation: `Diluído em ${weight} mL de SG5%`,
        calculatedDose: `${weight.toFixed(2)} mL`,
        administration: "",
      },
      {
        drug: "Glicose 50%",
        route: "EV; IO",
        formula: "P X 2",
        preparation: `Diluir em ${(weight * 2).toFixed(2)} mL de SF`,
        calculatedDose: `${(weight * 2).toFixed(2)} mL`,
        administration: "fazer EV lento",
      },
      {
        drug: "GluCa 10%",
        route: "EV, IO",
        formula: "0,6 mL/kg",
        preparation: "",
        calculatedDose: `${(weight * 0.6).toFixed(2)} mL`,
        administration: "EV lento",
      },
      {
        drug: "Lidocaína",
        route: "EV; ET; IO",
        formula: "P x 0,05",
        preparation: "",
        calculatedDose: `${(weight * 0.1).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 1amp",
      },
      {
        drug: "Fentanil",
        route: "EV, IO, IM",
        formula: "1 mcg/kg",
        preparation: "Diluir 1 mL em 9 mL de AD",
        calculatedDose: `${(weight * 0.2).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 10mL",
      },
      {
        drug: "Morfina",
        route: "EV",
        formula: "Px0,1",
        preparation: "Diluir 1 mL em 9 mL de AD",
        calculatedDose: `${(weight * 0.1).toFixed(2)} mL`,
        administration: "EV lento",
      },
      {
        drug: "Cetamina",
        route: "EV, IO, IM",
        formula: "P x 0,04(puro)",
        preparation: "",
        calculatedDose: `${(weight * 0.04).toFixed(2)} mL`,
        administration: "PURO, EV lento",
        maxDose: "Máximo 1amp",
      },
      {
        drug: "Midazolan (5 mg/mL)",
        route: "EV, IO",
        formula: "P X 0,1",
        preparation: "Diluir 1 mL em 4 mL de AD",
        calculatedDose: `${(weight * 0.1).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 5mL",
      },
      {
        drug: "Diazepam (5mg/mL)",
        route: "EV",
        formula: "P x 0,3 / 5",
        preparation: "",
        calculatedDose: `${((weight * 0.3) / 5).toFixed(2)} mL`,
        administration: "PURO, EV",
        maxDose: "Máximo 2mL (10mg)",
      },
      {
        drug: "Propofol (10 mg/mL)",
        route: "EV, IO",
        formula: "P x 0,2",
        preparation: `Diluir ${(weight * 0.2).toFixed(2)} em ${weight.toFixed(
          2
        )} mL de SG5%`,
        calculatedDose: `${(weight * 0.2).toFixed(2)} mL`,
        administration: "fazer EV lento",
      },
      {
        drug: "Succinilcolina (50 mg/mL)",
        route: "EV",
        formula: "P x 0,2",
        preparation: "Diluir 1 mL em 9 mL AD",
        calculatedDose: `${(weight * 0.2).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 20mL",
      },
      {
        drug: "Pancurônio (2 mg/mL)",
        route: "EV",
        formula: "P X 0,025 ou P x 0,05",
        preparation: "",
        calculatedDose: `${(weight * 0.025).toFixed(2)} mL (0,05 mg/kg) ou ${(
          weight * 0.05
        ).toFixed(2)} mL (0,1 mg/kg)`,
        administration: "EV lento",
        maxDose: "Máximo 1mL",
      },
      {
        drug: "Rocurônio (10mg/mL)",
        route: "EV",
        formula: "P x 0,08",
        preparation: "",
        calculatedDose: `${(weight * 0.08).toFixed(2)} mL`,
        administration: "EV lento",
      },
      {
        drug: "Naloxane",
        route: "EV, IO, ET, IM",
        formula: "P x 0,025",
        preparation: "",
        calculatedDose: `${(weight * 0.025).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 1mL",
      },
      {
        drug: "Etomidato 2mg/mL",
        route: "EV",
        formula: "P x 0,15",
        preparation: "",
        calculatedDose: `${(weight * 0.15).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 1mL",
      },
      {
        drug: "Amiodarona 50mg/mL",
        route: "EV",
        formula: "P x 0,1",
        preparation: "",
        calculatedDose: `${(weight * 0.1).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 1mL",
      },
      {
        drug: "Difenidramina 50mg/mL",
        route: "EV",
        formula: "P x 0,25",
        preparation: "Diluir para 10mL de SF",
        calculatedDose: `${(weight * 0.25).toFixed(2)} mL`,
        administration: "EV lento",
        maxDose: "Máximo 10mL",
      },
      {
        drug: "Difenidramina 50mg/mL",
        route: "IM",
        formula: "P x 0,025",
        preparation: "",
        calculatedDose: `${(weight * 0.025).toFixed(2)} mL`,
        administration: "IM",
        maxDose: "Máximo 1mL",
      },
      {
        drug: "Hidrocortisona 500mg",
        route: "EV",
        formula: "P x 0,2",
        preparation: "Diluir para 10mL de SF",
        calculatedDose: `${(weight * 0.2).toFixed(2)} mL`,
        administration: "lento",
        maxDose: "Máximo 10mL",
      },
      {
        drug: "Dexametasona 4mg/mL",
        route: "EV",
        formula: "P x 0,25",
        preparation: "",
        calculatedDose: `${(weight * 0.25).toFixed(2)} mL`,
        administration: "na bolsa de SF 100mL, em 15min",
      },
      {
        drug: "Fenitoína 50mg/mL",
        route: "EV",
        formula: "P x 15 / 50",
        preparation: "",
        calculatedDose: `${((weight * 15) / 50).toFixed(2)} mL`,
        administration: "",
      },
      {
        drug: "Tamanho do Tubo - SEM balonete",
        route: "ET",
        formula: "Idade/4 + 4",
        preparation: "fórmula de Cole",
        calculatedDose: `${(ageInYears / 4 + 4).toFixed(1)}`,
        administration: "",
      },
      {
        drug: "Tamanho do Tubo - COM balonete",
        route: "ET",
        formula: "Idade/4 + 3,5",
        preparation: "fórmula de Motoyama",
        calculatedDose: `${(ageInYears / 4 + 3.5).toFixed(1)}`,
        administration: "",
      },
      {
        drug: "Ponto de fixação do TOT",
        route: "",
        formula: "Idade/2 + 12",
        preparation: "opção 1",
        calculatedDose: `${(ageInYears / 2 + 12).toFixed(1)} cm`,
        administration: "Marca no lábio",
      },
    ];
  };

  const handleSubmit = () => {
    if (!patientData.name || !patientData.weight) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const ageInYears = patientData.birthDate
      ? calculateAge(patientData.birthDate).years
      : patientData.ageYears + patientData.ageMonths / 12;

    const drugCalculations = calculateDrugs(patientData.weight, ageInYears);

    setCalculations(drugCalculations);
    setStep(2);
  };

  const generatePDF = () => {
    // Implementação futura com jsPDF ou react-pdf
    console.log("Gerando PDF para:", patientData.name);
    alert("Funcionalidade de PDF será implementada em breve!");
  };

  if (step === 1) {
    return (
      <div className="max-w-4xl mx-auto p-6 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 dark:text-blue-400">
            Folha de Emergência Pediátrica
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome do Paciente *
              </label>
              <input
                type="text"
                value={patientData.name}
                onChange={(e) =>
                  setPatientData({ ...patientData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peso (kg) *
              </label>
              <input
                type="number"
                value={patientData.weight || ""}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Digite o peso em kg"
                step="0.1"
                min="0"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="useAge"
                  checked={useAgeInput}
                  onChange={(e) => setUseAgeInput(e.target.checked)}
                  className="mr-2 dark:bg-gray-700"
                />
                <label
                  htmlFor="useAge"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Informar idade diretamente (caso não saiba a data de
                  nascimento)
                </label>
              </div>

              {!useAgeInput ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={patientData.birthDate}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        birthDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  {patientData.birthDate && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Idade calculada:{" "}
                      {(() => {
                        const age = calculateAge(patientData.birthDate);
                        return `${age.years} anos, ${age.months} meses e ${age.days} dias`;
                      })()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Idade (anos)
                    </label>
                    <input
                      type="number"
                      value={patientData.ageYears || ""}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          ageYears: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Anos"
                      min="0"
                      max="18"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Meses adicionais
                    </label>
                    <input
                      type="number"
                      value={patientData.ageMonths || ""}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          ageMonths: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Meses"
                      min="0"
                      max="11"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-semibold transition-colors"
            >
              Gerar Folha de Emergência
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400">
            Folha de Emergência Pediátrica
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={generatePDF}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Baixar PDF
            </button>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Dados do Paciente
          </h2>
          <div className="grid md:grid-cols-3 gap-4 dark:text-gray-300">
            <div>
              <span className="font-medium">Nome:</span> {patientData.name}
            </div>
            <div>
              <span className="font-medium">Peso:</span> {patientData.weight} kg
            </div>
            <div>
              <span className="font-medium">Idade:</span>{" "}
              {patientData.birthDate
                ? (() => {
                    const age = calculateAge(patientData.birthDate);
                    return `${age.years} anos, ${age.months} meses e ${age.days} dias`;
                  })()
                : `${patientData.ageYears} anos e ${patientData.ageMonths} meses`}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left dark:text-white">
                  Medicamento
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left dark:text-white">
                  Via
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left dark:text-white">
                  Fórmula
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left dark:text-white">
                  Preparação
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left dark:text-white">
                  Dose Calculada
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left dark:text-white">
                  Administração
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left dark:text-white">
                  Máximo/Observações
                </th>
              </tr>
            </thead>
            <tbody>
              {calculations.map((drug, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-medium dark:text-white">
                    {drug.drug}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 dark:text-gray-300">
                    {drug.route}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 dark:text-gray-300">
                    {drug.formula}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 dark:text-gray-300">
                    {drug.preparation}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold dark:text-blue-400">
                    {drug.calculatedDose}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 dark:text-gray-300">
                    {drug.administration}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm dark:text-gray-300">
                    {drug.maxDose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-600 rounded-lg">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            ⚠️ Avisos Importantes:
          </h3>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>
              • ATENÇÃO: o propósito da folha de parada é adiantar e facilitar
              cálculos. Não se trata de uma indicação terapêutica, mas de um
              mecanismo auxiliar
            </li>
            <li>
              • Toda decisão deve ser pautada no julgamento individual de cada
              médico
            </li>
            <li>• Sempre confirme os cálculos antes da administração</li>
            <li>• Respeite as doses máximas indicadas</li>
            <li>• Monitore sinais vitais continuamente</li>
            <li>• Tenha sempre disponível material de reanimação</li>
            <li>• Em caso de dúvida, consulte um médico pediatra</li>
            <li>
              • Há outras maneiras de realizar alguns dos cálculos, por exemplo:
              a marcação para fixação do tubo pode ser feita com a fórmula
              (Diâmetro interno do tubo (mm) x 3)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencySheet;
