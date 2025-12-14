"use client";

import { useState } from "react";

type DoseUnit = "mg/kg/dia" | "mcg/kg/dia" | "mg/kg/dose" | "mcg/kg/dose";
type ConcentrationUnit = "mg/mL" | "mcg/mL";

export default function CalculadoraMedicamentos() {
  const [peso, setPeso] = useState<string>("");
  const [dose, setDose] = useState<string>("");
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg/kg/dia");
  const [diluicao, setDiluicao] = useState<string>("");
  const [doseApresentacao, setDoseApresentacao] = useState<string>("");
  const [apresentacaoUnit, setApresentacaoUnit] = useState<"mg" | "mcg">("mg");
  const [vezesAdministrar, setVezesAdministrar] = useState<string>("1");
  const [concentracaoMinima, setConcentracaoMinima] = useState<string>("");
  const [concentracaoMinimaUnit, setConcentracaoMinimaUnit] =
    useState<ConcentrationUnit>("mg/mL");
  const [concentracaoUsual, setConcentracaoUsual] = useState<string>("");
  const [concentracaoUsualUnit, setConcentracaoUsualUnit] =
    useState<ConcentrationUnit>("mg/mL");
  const [activeTab, setActiveTab] = useState<"resultados" | "explicacao">(
    "resultados"
  );

  const calcularResultados = () => {
    const pesoNum = parseFloat(peso) || 0;
    const doseNum = parseFloat(dose) || 0;
    const diluicaoNum = parseFloat(diluicao) || 0;
    const doseApresentacaoNum = parseFloat(doseApresentacao) || 0;
    const vezesNum = parseFloat(vezesAdministrar) || 1;
    const concMinimaNum = parseFloat(concentracaoMinima) || 0;
    const concUsualNum = parseFloat(concentracaoUsual) || 0;

    // Converter unidades para mg para cálculos consistentes
    let doseConvertida = doseNum;
    if (doseUnit.includes("mcg")) {
      doseConvertida = doseNum / 1000; // converte mcg para mg
    }

    let doseApresentacaoConvertida = doseApresentacaoNum;
    if (apresentacaoUnit === "mcg") {
      doseApresentacaoConvertida = doseApresentacaoNum / 1000;
    }

    let concMinimaConvertida = concMinimaNum;
    if (concentracaoMinimaUnit === "mcg/mL") {
      concMinimaConvertida = concMinimaNum / 1000;
    }

    let concUsualConvertida = concUsualNum;
    if (concentracaoUsualUnit === "mcg/mL") {
      concUsualConvertida = concUsualNum / 1000;
    }

    // Cálculos passo a passo
    const dosePaciente = pesoNum * doseConvertida;
    const volumeTotal =
      (dosePaciente * diluicaoNum) / doseApresentacaoConvertida;
    const volumePorDose = volumeTotal / vezesNum;
    const dosePorAdministracao = dosePaciente / vezesNum;
    const volumeConcentracaoMaxima =
      concMinimaConvertida > 0
        ? dosePorAdministracao / concMinimaConvertida
        : 0;
    const volumeConcentracaoUsual =
      concUsualConvertida > 0 ? dosePorAdministracao / concUsualConvertida : 0;

    return {
      dosePaciente,
      volumeTotal,
      volumePorDose,
      dosePorAdministracao,
      volumeConcentracaoMaxima,
      volumeConcentracaoUsual,
    };
  };

  const {
    dosePaciente,
    volumeTotal,
    volumePorDose,
    dosePorAdministracao,
    volumeConcentracaoMaxima,
    volumeConcentracaoUsual,
  } = calcularResultados();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Calculadora de Medicamentos
        </h1>

        {/* Abas de Resultados e Explicação */}
        <div className="mt-4">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "resultados"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("resultados")}
            >
              Resultados
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "explicacao"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("explicacao")}
            >
              Explicação
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div className="pt-4">
            {activeTab === "resultados" ? (
              <div>
                {/* Passo 1 com inputs */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 70"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dose
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={dose}
                          onChange={(e) => setDose(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 5"
                          step="0.01"
                        />
                        <select
                          value={doseUnit}
                          onChange={(e) =>
                            setDoseUnit(e.target.value as DoseUnit)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="mg/kg/dia">mg/kg/dia</option>
                          <option value="mcg/kg/dia">mcg/kg/dia</option>
                          <option value="mg/kg/dose">mg/kg/dose</option>
                          <option value="mcg/kg/dose">mcg/kg/dose</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Passo 1: Cálculo da Dose para o Paciente
                  </h3>
                  <p className="mb-2">
                    Fórmula: peso (kg) × dose (mg/kg) = dose para o paciente
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    {peso || 0} kg × {dose || 0} {doseUnit} ={" "}
                    {dosePaciente.toFixed(2)} mg
                  </p>
                </div>

                {/* Passo 2 com input */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diluição (mL)
                    </label>
                    <input
                      type="number"
                      value={diluicao}
                      onChange={(e) => setDiluicao(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 10"
                      step="0.1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dose da Apresentação
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={doseApresentacao}
                          onChange={(e) => setDoseApresentacao(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 500"
                          step="0.1"
                        />
                        <select
                          value={apresentacaoUnit}
                          onChange={(e) =>
                            setApresentacaoUnit(e.target.value as "mg" | "mcg")
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="mg">mg</option>
                          <option value="mcg">mcg</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Passo 2: Cálculo do Volume Total a Administrar
                  </h3>
                  <p className="mb-2">
                    Fórmula: (dose para o paciente × volume de diluição) / dose
                    da apresentação
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    ({dosePaciente.toFixed(2)} mg × {diluicao || 0} mL) /{" "}
                    {doseApresentacao || 0} {apresentacaoUnit} ={" "}
                    {volumeTotal.toFixed(2)} mL
                  </p>
                </div>

                {/* Passo 3 com input */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nº de vezes a administrar por dia
                    </label>
                    <input
                      type="number"
                      value={vezesAdministrar}
                      onChange={(e) => setVezesAdministrar(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: 3 (8/8h)"
                      min="1"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Passo 3: Cálculo do Volume por Dose
                  </h3>
                  <p className="mb-2">
                    Fórmula: volume total a ser administrado / número de vezes a
                    administrar
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    {volumeTotal.toFixed(2)} mL / {vezesAdministrar} ={" "}
                    {volumePorDose.toFixed(2)} mL
                  </p>
                </div>

                {/* Passo 4 com inputs */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Concentração Máxima
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={concentracaoMinima}
                          onChange={(e) =>
                            setConcentracaoMinima(e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 1"
                          step="0.01"
                        />
                        <select
                          value={concentracaoMinimaUnit}
                          onChange={(e) =>
                            setConcentracaoMinimaUnit(
                              e.target.value as ConcentrationUnit
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="mg/mL">mg/mL</option>
                          <option value="mcg/mL">mcg/mL</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Passo 4: Cálculo para Concentração Máxima
                  </h3>
                  <p className="mb-2">
                    Fórmula: dose por administração / concentração máxima
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    {dosePorAdministracao.toFixed(2)} mg /{" "}
                    {concentracaoMinima || 0} {concentracaoMinimaUnit} ={" "}
                    {volumeConcentracaoMaxima.toFixed(2)} mL
                  </p>
                </div>

                {/* Passo 5 com inputs */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Concentração Usual
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={concentracaoUsual}
                          onChange={(e) => setConcentracaoUsual(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 5"
                          step="0.01"
                        />
                        <select
                          value={concentracaoUsualUnit}
                          onChange={(e) =>
                            setConcentracaoUsualUnit(
                              e.target.value as ConcentrationUnit
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="mg/mL">mg/mL</option>
                          <option value="mcg/mL">mcg/mL</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Passo 5: Cálculo para Concentração Usual
                  </h3>
                  <p className="mb-2">
                    Fórmula: dose por administração / concentração usual
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    {dosePorAdministracao.toFixed(2)} mg /{" "}
                    {concentracaoUsual || 0} {concentracaoUsualUnit} ={" "}
                    {volumeConcentracaoUsual.toFixed(2)} mL
                  </p>
                </div>
              </div>
            ) : (
              <section>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    Como os cálculos são realizados:
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>
                      Lembre-se, esse cálculo não funciona muito bem para DVAs.
                      Falaremos do cálculo de DVAs e medicações que correm por
                      minuto na área específica.
                    </li>
                    <li>
                      <span className="font-medium">
                        Passo 1: Dose para o paciente = peso × dose:
                      </span>{" "}
                      Calcula a dose total diária ou por dose, dependendo da
                      unidade selecionada. Esse é sempre o primeiro cálculo e
                      determina para nós a dose que será administrada para o
                      paciente ao todo.
                    </li>
                    <li>
                      <span className="font-medium">
                        Passo 2: Volume total a administrar = (dose para o
                        paciente × volume de diluição) / dose da apresentação:
                      </span>{" "}
                      Calcula o volume total de medicação diluída que deve ser
                      administrado.
                    </li>
                    <li>
                      Veja que a DILUIÇÃO é escolhida de maneira arbitrária,
                      então nós que escolhemos. Há algumas medicações que já vêm
                      diluídas, como é o caso do metronidazol, mas para as
                      medicações que não são, nós podemos escolher em quanto
                      vamos diluir.{" "}
                    </li>
                    <li>
                      <span className="font-medium">
                        Passo 3: Volume por dose = volume total / número de
                        vezes a administrar:
                      </span>{" "}
                      Divide o volume total pelo número de administrações para
                      obter o volume por dose.
                    </li>
                    <li>
                      Sempre fique atento neste valor, porque se estivermos
                      calculando uma dose em mg/kg/DIA, então esse volume que
                      obtemos, não será o valor a ser aspirado por dose, e sim o
                      valor total do dia.
                    </li>
                    <li>
                      <span className="font-medium">
                        Passo 4: Volume para concentração máxima = dose por
                        administração / concentração máxima:
                      </span>{" "}
                      Calcula o volume mínimo necessário para a dose, usando a
                      concentração mais forte (mg/mL ou mcg/mL). O resultado
                      obtido é em volume de soro para REDILUIÇÃO.
                    </li>
                    <li>
                      <span className="font-medium">
                        Passo 5: Volume para concentração usual = dose por
                        administração / concentração usual:
                      </span>{" "}
                      Calcula o volume usual necessário para a dose, usando a
                      concentração padrão (mg/mL ou mcg/mL). O resultado obtido
                      é em volume de soro para REDILUIÇÃO.
                    </li>
                    <li className="mt-4 italic">
                      Observação para lembrar: Todas as unidades são convertidas
                      para mg antes dos cálculos para garantir consistência. 1
                      mg = 1000 mcg.
                    </li>
                  </ul>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
