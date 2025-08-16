"use client";

import { useState } from "react";

export default function CetoacidoseDiabeticaPage() {
  // Estados para dados do paciente
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [knownDiabetic, setKnownDiabetic] = useState<boolean>(false);

  // Estados para exames laboratoriais
  const [glucose, setGlucose] = useState<number>(0);
  const [sodium, setSodium] = useState<number>(0);
  const [potassium, setPotassium] = useState<number>(0);
  const [bicarbonate, setBicarbonate] = useState<number>(0);
  const [pH, setPH] = useState<number>(0);
  const [ketonemia, setKetonemia] = useState<number>(0);

  // Estados para avaliação clínica
  const [consciousness, setConsciousness] = useState<string>("alert");
  const [dehydrationSigns, setDehydrationSigns] = useState<number>(0);
  const [shock, setShock] = useState<boolean>(false);

  // Cálculos baseados nos protocolos
  const correctedSodium = sodium + 1.6 * ((glucose - 100) / 100);
  const effectiveOsmolarity = 2 * sodium + glucose / 18;
  const anionGap = sodium - (bicarbonate + 103); // Considerando cloreto médio de 103 mEq/L
  const dkaSeverity =
    pH < 7.1 || bicarbonate < 5
      ? "Grave"
      : pH < 7.2 || bicarbonate < 10
      ? "Moderada"
      : "Leve";

  // Recomendações de tratamento
  const fluidResuscitation = shock
    ? "20 ml/kg de SF 0.9% em bolus (repetir até estabilização)"
    : "10-20 ml/kg de SF 0.9% em 1-2 horas";

  const insulinTherapy = `Infusão contínua de insulina regular: 0.1 UI/kg/h
  (Iniciar 1-2h após início da hidratação)`;

  const potassiumReplacement =
    potassium < 3.5
      ? "Corrigir hipocalemia antes de iniciar insulina"
      : potassium < 4.5
      ? "40 mEq/L na solução de hidratação"
      : potassium < 6
      ? "20 mEq/L na solução"
      : "Não repor até normalização";

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-6">
        Protocolo de Cetoacidose Diabética Pediátrica
      </h1>

      {/* Seção: Dados do Paciente */}
      <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Dados do Paciente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Peso (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Idade (anos)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={knownDiabetic}
              onChange={(e) => setKnownDiabetic(e.target.checked)}
              className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Diabético conhecido
            </label>
          </div>
        </div>
      </section>

      {/* Seção: Exames Laboratoriais */}
      <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Exames Laboratoriais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Glicemia (mg/dL)
            </label>
            <input
              type="number"
              value={glucose}
              onChange={(e) => setGlucose(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sódio (mEq/L)
            </label>
            <input
              type="number"
              value={sodium}
              onChange={(e) => setSodium(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Potássio (mEq/L)
            </label>
            <input
              type="number"
              value={potassium}
              onChange={(e) => setPotassium(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bicarbonato (mEq/L)
            </label>
            <input
              type="number"
              value={bicarbonate}
              onChange={(e) => setBicarbonate(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              pH venoso
            </label>
            <input
              type="number"
              step="0.01"
              value={pH}
              onChange={(e) => setPH(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cetonemia (mmol/L)
            </label>
            <input
              type="number"
              step="0.1"
              value={ketonemia}
              onChange={(e) => setKetonemia(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* Seção: Avaliação Clínica */}
      <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Avaliação Clínica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nível de Consciência
            </label>
            <select
              value={consciousness}
              onChange={(e) => setConsciousness(e.target.value)}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="alert">Alerta</option>
              <option value="confused">Confuso</option>
              <option value="drowsy">Sonolento</option>
              <option value="stupor">Estupor</option>
              <option value="coma">Coma</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sinais de Desidratação
            </label>
            <select
              value={dehydrationSigns}
              onChange={(e) => setDehydrationSigns(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={0}>Sem sinais</option>
              <option value={5}>Leve (5%)</option>
              <option value={7}>Moderada (7-8%)</option>
              <option value={10}>Grave (10%)</option>
            </select>
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              checked={shock}
              onChange={(e) => setShock(e.target.checked)}
              className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Sinais de choque
            </label>
          </div>
        </div>
      </section>

      {/* Seção: Resultados e Recomendações */}
      <section className="mb-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
          Resultados e Recomendações
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cálculos */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              Cálculos Importantes
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="dark:text-gray-300">Sódio Corrigido:</span>
                <span className="font-medium dark:text-white">
                  {correctedSodium.toFixed(1)} mEq/L
                </span>
              </li>
              <li className="flex justify-between">
                <span className="dark:text-gray-300">
                  Osmolaridade Efetiva:
                </span>
                <span className="font-medium dark:text-white">
                  {effectiveOsmolarity.toFixed(1)} mOsm/L
                </span>
              </li>
              <li className="flex justify-between">
                <span className="dark:text-gray-300">Ânion Gap:</span>
                <span className="font-medium dark:text-white">
                  {anionGap.toFixed(1)} mmol/L
                </span>
              </li>
              <li className="flex justify-between">
                <span className="dark:text-gray-300">Gravidade da CAD:</span>
                <span
                  className={`font-medium ${
                    dkaSeverity === "Grave"
                      ? "text-red-600 dark:text-red-400"
                      : dkaSeverity === "Moderada"
                      ? "text-orange-500 dark:text-orange-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {dkaSeverity}
                </span>
              </li>
            </ul>
          </div>

          {/* Tratamento */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              Recomendações de Tratamento
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-400">
                  Expansão Volêmica:
                </h4>
                <p className="dark:text-gray-300">{fluidResuscitation}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-400">
                  Insulinoterapia:
                </h4>
                <p className="dark:text-gray-300">{insulinTherapy}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-400">
                  Reposição de Potássio:
                </h4>
                <p className="dark:text-gray-300">{potassiumReplacement}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-400">
                  Monitorização:
                </h4>
                <p className="dark:text-gray-300">
                  Controle horário de glicemia, eletrólitos e estado neurológico
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas importantes */}
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Precauções Importantes
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>NÃO iniciar insulina antes de corrigir hipocalemia</li>
                  <li>NÃO usar bicarbonato de rotina</li>
                  <li>Monitorar rigorosamente para sinais de edema cerebral</li>
                  <li>
                    Manter glicemia &gt; 200 mg/dL nas primeiras 4-6 horas
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
