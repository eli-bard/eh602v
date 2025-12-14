// app/calculadora-pediatrica/page.tsx
"use client";

import React, { useState, useMemo } from "react";

export default function CalculadoraPediatricaPage() {
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [ageUnit, setAgeUnit] = useState<"years" | "months">("years");

  // Converte a idade para anos, se necessário
  const ageInYears = useMemo(() => {
    const parsedAge = parseFloat(age);
    if (isNaN(parsedAge) || parsedAge < 0) return 0;

    return ageUnit === "months" ? parsedAge / 12 : parsedAge;
  }, [age, ageUnit]);

  // Realiza todos os cálculos com base nos inputs válidos
  const calculations = useMemo(() => {
    const parsedWeight = parseFloat(weight);

    // Validação básica para inputs
    if (
      isNaN(parsedWeight) ||
      parsedWeight <= 0 ||
      isNaN(ageInYears) ||
      ageInYears < 0
    ) {
      return null;
    }

    // Cálculos para o tamanho de tubos e fixação
    const tuboComCuff = ageInYears / 4 + 4;
    const tuboSemCuff = ageInYears / 4 + 3.5;

    // --- Cálculos para Medicações (com doses máximas) ---

    // Midazolam
    const midazolamDosePerKg = 0.1; // mg/kg
    const midazolamApresentacao = 5; // mg/mL
    let midazolamTotalDoseMg = parsedWeight * midazolamDosePerKg;
    let midazolamMl = midazolamTotalDoseMg / midazolamApresentacao;

    // Aplicar dose máxima de Midazolam conforme especificação
    if (ageInYears < 5) {
      // < 5 anos: máximo de 1.2 mL (6 mg)
      midazolamMl = Math.min(midazolamMl, 1.2);
    } else if (ageInYears >= 5 && ageInYears <= 12) {
      // Entre 5 e 12 anos: máximo de 2 mL (10 mg)
      midazolamMl = Math.min(midazolamMl, 2);
    }
    // > 12 anos: sem limite máximo na apresentação

    // Cetamina
    const cetaminaDosePerKg = 1.0; // mg/kg
    const cetaminaApresentacao = 50; // mg/mL
    const cetaminaMl =
      (parsedWeight * cetaminaDosePerKg) / cetaminaApresentacao;

    // Rocurônio
    const rocuronioDosePerKg = 0.6; // mg/kg
    const rocuronioApresentacao = 10; // mg/mL
    const rocuronioMl =
      (parsedWeight * rocuronioDosePerKg) / rocuronioApresentacao;

    // Atropina
    const atropinaDosePerKg = 0.02; // mg/kg
    const atropinaApresentacao = 0.25; // mg/mL
    let atropinaTotalDoseMg = parsedWeight * atropinaDosePerKg;
    let atropinaMl = atropinaTotalDoseMg / atropinaApresentacao;

    // Aplicar dose máxima de Atropina conforme especificação
    if (ageInYears < 12) {
      // < 12 anos: máximo de 2 mL (0.5 mg)
      atropinaMl = Math.min(atropinaMl, 2);
    } else {
      // >= 12 anos: máximo de 4 mL (1.0 mg)
      atropinaMl = Math.min(atropinaMl, 4);
    }

    // Adrenalina 1:10.000 (dose de parada)
    const adrenalinaMl = parsedWeight * 0.1; // Direto 0.1 mL/kg para 1:10.000

    return {
      tuboComCuff: tuboComCuff.toFixed(2),
      tuboSemCuff: tuboSemCuff.toFixed(2),
      midazolamMl: midazolamMl.toFixed(2),
      cetaminaMl: cetaminaMl.toFixed(2),
      rocuronioMl: rocuronioMl.toFixed(2),
      atropinaMl: atropinaMl.toFixed(2),
      adrenalinaMl: adrenalinaMl.toFixed(2),
      // Adicionando flags para mostrar explicações específicas
      midazolamAtingiuLimite:
        midazolamMl.toFixed(2) !==
        (midazolamTotalDoseMg / midazolamApresentacao).toFixed(2),
      atropinaAtingiuLimite:
        atropinaMl.toFixed(2) !==
        (atropinaTotalDoseMg / atropinaApresentacao).toFixed(2),
    };
  }, [weight, ageInYears]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">
            <span className="text-teal-600">EliHelp</span> - Calculadora de
            drogas para IOT pediátrica
          </h1>
          <p className="text-gray-700 text-lg">
            Insira o peso do paciente em kg e a idade para obter as doses e
            medidas. Sempre cheque a apresentação de cada medicação disponível
            no seu serviço
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Input de Peso */}
          <div className="space-y-2">
            <label
              htmlFor="weight"
              className="block text-gray-800 text-lg font-semibold"
            >
              Peso do Paciente (kg):
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 10.5"
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              min="0.1"
              step="0.1"
            />
            <p className="text-sm text-gray-500">
              Digite o peso em quilogramas
            </p>
          </div>

          {/* Input de Idade */}
          <div className="space-y-2">
            <label
              htmlFor="age"
              className="block text-gray-800 text-lg font-semibold"
            >
              Idade do Paciente:
            </label>
            <div className="flex">
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 24"
                className="flex-grow p-4 text-lg border-2 border-gray-300 rounded-l-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                min="0"
                step="1"
              />
              <select
                value={ageUnit}
                onChange={(e) =>
                  setAgeUnit(e.target.value as "years" | "months")
                }
                className="p-4 text-lg border-2 border-l-0 border-gray-300 rounded-r-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="years">Anos</option>
                <option value="months">Meses</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">Selecione anos ou meses</p>
          </div>
        </div>

        {calculations ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 sm:p-8 rounded-2xl border-2 border-blue-200 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 text-center">
                Resultados do Cálculo
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Seção de Instrumentos */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-sm">
                    <h3 className="text-xl font-bold text-blue-700 mb-4 pb-3 border-b-2 border-blue-200">
                      Instrumentos
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-blue-900">
                          Tubo COM cuff:
                        </span>
                        <span className="text-2xl font-bold text-teal-700">
                          {calculations.tuboComCuff}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-blue-900">
                          Tubo SEM cuff:
                        </span>
                        <span className="text-2xl font-bold text-teal-700">
                          {calculations.tuboSemCuff}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção de Medicações */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-sm">
                    <h3 className="text-xl font-bold text-blue-700 mb-4 pb-3 border-b-2 border-blue-200">
                      Medicações (mL)
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-blue-900">
                          Midazolam 5 mg/mL:
                        </span>
                        <span className="text-2xl font-bold text-teal-700">
                          {calculations.midazolamMl} mL
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-blue-900">
                          Cetamina 50 mg/mL:
                        </span>
                        <span className="text-2xl font-bold text-teal-700">
                          {calculations.cetaminaMl} mL
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-blue-900">
                          Rocurônio 10 mg/mL:
                        </span>
                        <span className="text-2xl font-bold text-teal-700">
                          {calculations.rocuronioMl} mL
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-semibold text-blue-900">
                            Atropina 0,25 mg/mL:
                          </span>
                          <span className="text-2xl font-bold text-teal-700">
                            {calculations.atropinaMl} mL
                          </span>
                        </div>
                        <p className="text-sm text-blue-700 italic pl-3">
                          Administrar flush com água destilada ou SF 0,9% após
                          atropina
                        </p>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-blue-900">
                          Adrenalina 1:10.000:
                        </span>
                        <span className="text-2xl font-bold text-teal-700">
                          {calculations.adrenalinaMl} mL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explicação das Medicações (apenas para Midazolam e Atropina quando atingiram limite) */}
            {(calculations.midazolamAtingiuLimite ||
              calculations.atropinaAtingiuLimite) && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">
                  ⚠️ Informações Importantes
                </h3>
                <div className="space-y-4">
                  {calculations.midazolamAtingiuLimite && (
                    <div className="bg-white p-4 rounded-lg border border-yellow-300">
                      <p className="text-lg font-semibold text-yellow-700 mb-2">
                        Midazolam - Dose Máxima Aplicada:
                      </p>
                      <p className="text-gray-800">
                        Para pacientes com {ageInYears.toFixed(1)} anos, a dose
                        de Midazolam foi limitada conforme faixa etária:
                        {ageInYears < 5 &&
                          " máximo de 1.2 mL (6 mg) para menores de 5 anos."}
                        {ageInYears >= 5 &&
                          ageInYears <= 12 &&
                          " máximo de 2 mL (10 mg) para pacientes entre 5 e 12 anos."}
                        {ageInYears > 12 &&
                          " acima de 12 anos não há limite máximo na apresentação."}
                      </p>
                    </div>
                  )}
                  {calculations.atropinaAtingiuLimite && (
                    <div className="bg-white p-4 rounded-lg border border-yellow-300">
                      <p className="text-lg font-semibold text-yellow-700 mb-2">
                        Atropina - Dose Máxima Aplicada:
                      </p>
                      <p className="text-gray-800">
                        Para pacientes com {ageInYears.toFixed(1)} anos, a dose
                        de Atropina foi limitada conforme faixa etária:
                        {ageInYears < 12 &&
                          " máximo de 2 mL (0.5 mg) para menores de 12 anos."}
                        {ageInYears >= 12 &&
                          " máximo de 4 mL (1.0 mg) para pacientes de 12 anos ou mais."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aguardando entrada de dados
            </h3>
            <p className="text-gray-600">
              Por favor, insira valores válidos para peso e idade para ver os
              resultados.
            </p>
          </div>
        )}
        {/* Tabela de Informações dos Medicamentos */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Informações dos Medicamentos
          </h2>
          <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-lg font-semibold text-white uppercase tracking-wider"
                  >
                    Medicamento
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-lg font-semibold text-white uppercase tracking-wider"
                  >
                    Dose
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-lg font-semibold text-white uppercase tracking-wider"
                  >
                    Apresentação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-lg font-medium text-gray-900">
                    Midazolam
                  </td>
                  <td className="py-4 px-6 text-lg text-gray-800">0.1 mg/kg</td>
                  <td className="py-4 px-6 text-lg text-gray-800">
                    <div className="space-y-1">
                      <div>5 mg/mL</div>
                      <div className="text-sm text-blue-600 font-medium">
                        Máx: &lt;5a: 1.2 mL (6 mg) | 5-12a: 2 mL (10 mg) |
                        &gt;12a: sem limite
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-lg font-medium text-gray-900">
                    Cetamina
                  </td>
                  <td className="py-4 px-6 text-lg text-gray-800">1.0 mg/kg</td>
                  <td className="py-4 px-6 text-lg text-gray-800">50 mg/mL</td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-lg font-medium text-gray-900">
                    Rocurônio
                  </td>
                  <td className="py-4 px-6 text-lg text-gray-800">0.6 mg/kg</td>
                  <td className="py-4 px-6 text-lg text-gray-800">10 mg/mL</td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-lg font-medium text-gray-900">
                    Atropina
                  </td>
                  <td className="py-4 px-6 text-lg text-gray-800">
                    0.02 mg/kg
                  </td>
                  <td className="py-4 px-6 text-lg text-gray-800">
                    <div className="space-y-1">
                      <div>0.25 mg/mL</div>
                      <div className="text-sm text-blue-600 font-medium">
                        Máx: &lt;12a: 2 mL (0.5 mg) | ≥12a: 4 mL (1.0 mg)
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 text-lg font-medium text-gray-900">
                    Adrenalina
                  </td>
                  <td className="py-4 px-6 text-lg text-gray-800">
                    0.1 mL/kg (parada)
                  </td>
                  <td className="py-4 px-6 text-lg text-gray-800">
                    1:10.000 (Diluir 1 mL em 9 mL de Água destilada)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            *Lembre-se: Sou uma ferramenta de apoio. As informações fornecidas
            são para fins educacionais e não substituem o julgamento clínico de
            um profissional de saúde. Sempre consulte um médico para decisões
            clínicas.*
          </p>
        </div>
      </div>
    </div>
  );
}
