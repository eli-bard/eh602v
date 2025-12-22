// app/drogas-infusao-continua/page.tsx
"use client";

import React, { useState, useMemo } from "react";

type Medicamento =
  | "fentanil"
  | "adrenalina"
  | "midazolam"
  | "cetamina"
  | "dexmedetomidina"
  | "noradrenalina"
  | "milrinona"
  | "dobutamina"
  | "alprostadil";
type Diluicao = 12 | 24 | 48 | 72 | 96;

interface ParametrosMedicamento {
  nome: string;
  apresentacao: number; // mcg/mL
  doseMin: number;
  doseMax: number;
  unidadeDose: string;
  tempo: number; // horas (convertido para minutos se necessário)
  dosePadrao: number;
}

interface CalculoResultado {
  vMed: number;
  vMedAr: number;
  vsoro09: number;
  velocidade: number;
  concDil: number;
  doseHora: number;
  doseHoraUnidade: string;
}

export default function DrogasInfusaoContinuaPage() {
  // Parâmetros dos medicamentos atualizados
  const medicamentos: Record<Medicamento, ParametrosMedicamento> = {
    fentanil: {
      nome: "Fentanil",
      apresentacao: 50, // mcg/mL
      doseMin: 0.5,
      doseMax: 2.0,
      unidadeDose: "mcg/kg/hora",
      tempo: 24, // horas
      dosePadrao: 1.0,
    },
    adrenalina: {
      nome: "Adrenalina",
      apresentacao: 1000, // mcg/mL
      doseMin: 0.05,
      doseMax: 2.0,
      unidadeDose: "mcg/kg/min",
      tempo: 1440, // minutos (24 horas)
      dosePadrao: 0.1,
    },
    midazolam: {
      nome: "Midazolam",
      apresentacao: 5000, // mcg/mL
      doseMin: 0.1,
      doseMax: 0.4,
      unidadeDose: "mcg/kg/hora",
      tempo: 24, // horas
      dosePadrao: 0.2,
    },
    cetamina: {
      nome: "Cetamina",
      apresentacao: 50000, // mcg/mL
      doseMin: 5,
      doseMax: 20,
      unidadeDose: "mcg/kg/min",
      tempo: 1440, // minutos (24 horas)
      dosePadrao: 10,
    },
    dexmedetomidina: {
      nome: "Dexmedetomidina (Precedex)",
      apresentacao: 100, // mcg/mL
      doseMin: 0.2,
      doseMax: 0.7,
      unidadeDose: "mcg/kg/hora",
      tempo: 24, // horas
      dosePadrao: 0.5,
    },
    noradrenalina: {
      nome: "NORAdrenalina",
      apresentacao: 1000, // mcg/mL
      doseMin: 0.05,
      doseMax: 2.0,
      unidadeDose: "mcg/kg/min",
      tempo: 1440, // minutos (24 horas)
      dosePadrao: 0.1,
    },
    milrinona: {
      nome: "Milrinona",
      apresentacao: 1000, // mcg/mL
      doseMin: 0.25,
      doseMax: 1.0,
      unidadeDose: "mcg/kg/min",
      tempo: 1440, // minutos (24 horas)
      dosePadrao: 0.5,
    },
    dobutamina: {
      nome: "Dobutamina",
      apresentacao: 12500, // mcg/mL
      doseMin: 2.0,
      doseMax: 20.0,
      unidadeDose: "mcg/kg/min",
      tempo: 1440, // minutos (24 horas)
      dosePadrao: 5.0,
    },
    alprostadil: {
      nome: "Alprostadil (Prostin)",
      apresentacao: 20, // mcg/mL
      doseMin: 0.01,
      doseMax: 0.4,
      unidadeDose: "mcg/kg/min",
      tempo: 1440, // minutos (24 horas)
      dosePadrao: 0.05,
    },
  };

  // Estados
  const [peso, setPeso] = useState<string>("");
  const [medicamentoSelecionado, setMedicamentoSelecionado] =
    useState<Medicamento>("fentanil");
  const [doseFentanil, setDoseFentanil] = useState<number>(1.0);
  const [doseAdrenalina, setDoseAdrenalina] = useState<number>(0.1);
  const [doseMidazolam, setDoseMidazolam] = useState<number>(0.2);
  const [doseCetamina, setDoseCetamina] = useState<number>(10.0);
  const [doseDexmedetomidina, setDoseDexmedetomidina] = useState<number>(0.5);
  const [doseNoradrenalina, setDoseNoradrenalina] = useState<number>(0.1);
  const [doseMilrinona, setDoseMilrinona] = useState<number>(0.5);
  const [doseDobutamina, setDoseDobutamina] = useState<number>(5.0);
  const [doseAlprostadil, setDoseAlprostadil] = useState<number>(0.05);
  const [diluicao, setDiluicao] = useState<Diluicao>(24);

  // Obter parâmetros do medicamento selecionado
  const parametros = medicamentos[medicamentoSelecionado];

  // Obter dose atual baseada no medicamento selecionado
  const getDoseAtual = (): number => {
    switch (medicamentoSelecionado) {
      case "fentanil":
        return doseFentanil;
      case "adrenalina":
        return doseAdrenalina;
      case "midazolam":
        return doseMidazolam;
      case "cetamina":
        return doseCetamina;
      case "dexmedetomidina":
        return doseDexmedetomidina;
      case "noradrenalina":
        return doseNoradrenalina;
      case "milrinona":
        return doseMilrinona;
      case "dobutamina":
        return doseDobutamina;
      case "alprostadil":
        return doseAlprostadil;
      default:
        return 0;
    }
  };

  // Setter de dose baseado no medicamento selecionado
  const setDoseAtual = (valor: number) => {
    switch (medicamentoSelecionado) {
      case "fentanil":
        setDoseFentanil(valor);
        break;
      case "adrenalina":
        setDoseAdrenalina(valor);
        break;
      case "midazolam":
        setDoseMidazolam(valor);
        break;
      case "cetamina":
        setDoseCetamina(valor);
        break;
      case "dexmedetomidina":
        setDoseDexmedetomidina(valor);
        break;
      case "noradrenalina":
        setDoseNoradrenalina(valor);
        break;
      case "milrinona":
        setDoseMilrinona(valor);
        break;
      case "dobutamina":
        setDoseDobutamina(valor);
        break;
      case "alprostadil":
        setDoseAlprostadil(valor);
        break;
    }
  };

  const doseAtual = getDoseAtual();

  // Mapeamento de diluição para velocidade (incluindo 12 mL)
  const velocidadePorDiluicao: Record<Diluicao, number> = {
    12: 0.5,
    24: 1,
    48: 2,
    72: 3,
    96: 4,
  };

  // Função para arredondar para cima na primeira casa decimal
  const arredondarParaCima = (valor: number): number => {
    return Math.ceil(valor * 10) / 10;
  };

  // Calcular doseHoraUnidade (FEATURE 1)
  const calcularDoseHoraUnidade = (
    doseHora: number,
    unidadeDose: string
  ): string => {
    if (unidadeDose.includes("min")) {
      const dosePorMinuto = doseHora / 60;
      return `${dosePorMinuto.toFixed(2)} ${unidadeDose.replace(
        "hora",
        "min"
      )}`;
    }
    return `${doseHora.toFixed(2)} ${unidadeDose}`;
  };

  // Cálculos principais
  const calculoResultado = useMemo((): CalculoResultado | null => {
    const pesoNum = parseFloat(peso);
    if (isNaN(pesoNum) || pesoNum <= 0) return null;

    const doseAtual = getDoseAtual();
    let vMed: number;

    // Verificar se unidade contém "min" para conversão
    const unidadeTemMinuto = parametros.unidadeDose.includes("min");

    if (unidadeTemMinuto) {
      // Medicamentos com dose em mcg/kg/min
      // Converter dose para mcg/kg/hora: × 60
      const dosePorHora = doseAtual * 60;
      vMed = (pesoNum * dosePorHora * 24) / parametros.apresentacao;
    } else {
      // Medicamentos com dose em mcg/kg/hora
      vMed = (pesoNum * doseAtual * 24) / parametros.apresentacao;
    }

    // Arredondar para cima
    const vMedAr = arredondarParaCima(vMed);

    // Calcular volume de SF 0,9%
    const vsoro09 = diluicao - vMedAr;

    // Calcular concentração na diluição
    const concDil = (vMedAr * parametros.apresentacao) / diluicao;

    // Obter velocidade
    const velocidade = velocidadePorDiluicao[diluicao];

    // Calcular doseHora (cálculo reverso - FEATURE 1)
    const doseHora = (concDil * velocidade) / pesoNum;

    // Calcular doseHoraUnidade
    const doseHoraUnidade = calcularDoseHoraUnidade(
      doseHora,
      parametros.unidadeDose
    );

    return {
      vMed,
      vMedAr,
      vsoro09,
      velocidade,
      concDil,
      doseHora,
      doseHoraUnidade,
    };
  }, [
    peso,
    medicamentoSelecionado,
    doseFentanil,
    doseAdrenalina,
    doseMidazolam,
    doseCetamina,
    doseDexmedetomidina,
    doseNoradrenalina,
    doseMilrinona,
    doseDobutamina,
    doseAlprostadil,
    diluicao,
    parametros,
  ]);

  // Gerar prescrição (atualizada com cálculo reverso - FEATURE 1)
  const prescricao = useMemo(() => {
    if (!calculoResultado) return null;

    const { vMedAr, vsoro09, velocidade, concDil, doseHoraUnidade } =
      calculoResultado;
    const { nome } = parametros;

    return `${nome} -------------- ${vMedAr.toFixed(1)} mL
Soro Fisiológico 0,9% ---------------- ${vsoro09.toFixed(1)} mL
Administrar EV em BIC a ${velocidade} mL/hora

${velocidade} mL/hora corresponde a ${doseHoraUnidade}

Concentração na diluição: ${concDil.toFixed(2)} mcg/mL`;
  }, [calculoResultado, parametros]);

  // Copiar prescrição para área de transferência
  const copiarPrescricao = () => {
    if (prescricao) {
      navigator.clipboard
        .writeText(prescricao)
        .then(() => alert("Prescrição copiada para a área de transferência!"))
        .catch((err) => console.error("Erro ao copiar:", err));
    }
  };

  // Formatar explicação do cálculo (atualizada com cálculo reverso)
  const explicacaoCalculo = useMemo(() => {
    if (!calculoResultado || !peso) return null;

    const pesoNum = parseFloat(peso);
    const { vMed, vMedAr, vsoro09, concDil, doseHora, doseHoraUnidade } =
      calculoResultado;
    const { nome, apresentacao, unidadeDose } = parametros;

    let explicacao = `Cálculo para ${nome}:\n\n`;

    // Cálculo do volume de medicação
    explicacao += `1. Cálculo do volume de medicação:\n`;

    const unidadeTemMinuto = unidadeDose.includes("min");
    if (unidadeTemMinuto) {
      const dosePorHora = doseAtual * 60;
      explicacao += `   Dose convertida para mcg/kg/hora: ${doseAtual} ${unidadeDose} × 60 = ${dosePorHora.toFixed(
        2
      )} mcg/kg/hora\n`;
      explicacao += `   Vmed = (P × D × T) / A\n`;
      explicacao += `   Vmed = (${pesoNum} kg × ${dosePorHora.toFixed(
        2
      )} mcg/kg/h × 24 h) / ${apresentacao.toLocaleString("pt-BR")} mcg/mL\n`;
    } else {
      explicacao += `   Vmed = (P × D × T) / A\n`;
      explicacao += `   Vmed = (${pesoNum} kg × ${doseAtual} ${unidadeDose} × 24 h) / ${apresentacao.toLocaleString(
        "pt-BR"
      )} mcg/mL\n`;
    }
    explicacao += `   Vmed = ${vMed.toFixed(4)} mL\n\n`;

    explicacao += `2. Arredondamento para cima:\n`;
    explicacao += `   ${vMed.toFixed(4)} mL → ${vMedAr.toFixed(1)} mL\n\n`;

    explicacao += `3. Cálculo do volume de SF 0,9%:\n`;
    explicacao += `   Vsoro09 = Diluição - VmedAr\n`;
    explicacao += `   Vsoro09 = ${diluicao} mL - ${vMedAr.toFixed(
      1
    )} mL = ${vsoro09.toFixed(1)} mL\n\n`;

    explicacao += `4. Cálculo da concentração na diluição:\n`;
    explicacao += `   ConcDil = (VmedAr × A) / Diluição\n`;
    explicacao += `   ConcDil = (${vMedAr.toFixed(
      1
    )} mL × ${apresentacao.toLocaleString("pt-BR")} mcg/mL) / ${diluicao} mL\n`;
    explicacao += `   ConcDil = ${concDil.toFixed(2)} mcg/mL\n\n`;

    // Cálculo reverso (FEATURE 1)
    explicacao += `5. Cálculo reverso (verificação):\n`;
    explicacao += `   DoseHora = (ConcDil × Velocidade) / Peso\n`;
    explicacao += `   DoseHora = (${concDil.toFixed(2)} mcg/mL × ${
      velocidadePorDiluicao[diluicao]
    } mL/h) / ${pesoNum} kg\n`;
    explicacao += `   DoseHora = ${doseHora.toFixed(4)} mcg/kg/hora\n`;

    if (unidadeTemMinuto) {
      explicacao += `   Convertendo para ${unidadeDose}: ${doseHora.toFixed(
        4
      )} / 60 = ${(doseHora / 60).toFixed(4)} ${unidadeDose}\n`;
    }

    explicacao += `   Resultado: ${doseHoraUnidade}`;

    return explicacao;
  }, [
    calculoResultado,
    peso,
    medicamentoSelecionado,
    doseAtual,
    diluicao,
    parametros,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">
            Calculadora de Drogas em Infusão Contínua
          </h1>
          <p className="text-gray-700 text-lg">
            Calcule volumes e prescrições para infusões contínuas em pediatria
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Entrada de Dados */}
          <div className="lg:col-span-1 space-y-8">
            {/* Card: Dados do Paciente */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Dados do Paciente
              </h2>

              <div className="space-y-6">
                {/* Peso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Peso do Paciente (kg) *
                  </label>
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ex: 15.5"
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Digite o peso em quilogramas
                  </p>
                </div>

                {/* Seleção de Diluição (FEATURE 2) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Diluição (Syringe Pump)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {([12, 24, 48, 72, 96] as Diluicao[]).map((dil) => (
                      <button
                        key={dil}
                        onClick={() => setDiluicao(dil)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          diluicao === dil
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="text-lg font-bold text-gray-800">
                          {dil} mL
                        </div>
                        <div className="text-xs text-gray-600">
                          Vel: {velocidadePorDiluicao[dil]} mL/h
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Velocidade padrão: {diluicao} mL →{" "}
                    {velocidadePorDiluicao[diluicao]} mL/hora
                  </p>
                </div>
              </div>
            </div>

            {/* Card: Seleção de Medicamento (atualizado com novos medicamentos) */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Seleção do Medicamento
              </h2>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {Object.entries(medicamentos).map(([key, med]) => (
                  <button
                    key={key}
                    onClick={() =>
                      setMedicamentoSelecionado(key as Medicamento)
                    }
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      medicamentoSelecionado === key
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">
                      {med.nome}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {med.doseMin} - {med.doseMax} {med.unidadeDose}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Apres: {med.apresentacao.toLocaleString("pt-BR")} mcg/mL
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 2: Ajuste de Dose e Parâmetros */}
          <div className="lg:col-span-1 space-y-8">
            {/* Card: Ajuste de Dose */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ajuste de Dose - {parametros.nome}
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold text-gray-800">
                      Dose Atual
                    </label>
                    <span className="text-3xl font-bold text-blue-700">
                      {doseAtual.toFixed(
                        parametros.unidadeDose.includes("min") ? 2 : 2
                      )}
                      <span className="text-sm font-normal ml-1">
                        {parametros.unidadeDose}
                      </span>
                    </span>
                  </div>

                  <input
                    type="range"
                    min={parametros.doseMin}
                    max={parametros.doseMax}
                    step={parametros.unidadeDose.includes("min") ? 0.01 : 0.1}
                    value={doseAtual}
                    onChange={(e) => setDoseAtual(parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />

                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>
                      {parametros.doseMin}{" "}
                      {parametros.unidadeDose.split("/")[0]}
                    </span>
                    <span>
                      {parametros.doseMax}{" "}
                      {parametros.unidadeDose.split("/")[0]}
                    </span>
                  </div>
                </div>

                {/* Botões de dose rápida */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Doses Comuns:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(() => {
                      const dosesComuns = [];
                      if (
                        parametros.doseMin === 0.5 &&
                        parametros.doseMax === 2.0
                      ) {
                        // Fentanil
                        dosesComuns.push(0.5, 1.0, 1.5, 2.0);
                      } else if (
                        parametros.doseMin === 0.05 &&
                        parametros.doseMax === 2.0
                      ) {
                        // Adrenalina/NORAdrenalina
                        dosesComuns.push(0.05, 0.1, 0.5, 1.0);
                      } else if (
                        parametros.doseMin === 0.1 &&
                        parametros.doseMax === 0.4
                      ) {
                        // Midazolam
                        dosesComuns.push(0.1, 0.2, 0.3, 0.4);
                      } else if (
                        parametros.doseMin === 5 &&
                        parametros.doseMax === 20
                      ) {
                        // Cetamina
                        dosesComuns.push(5, 10, 15, 20);
                      } else if (
                        parametros.doseMin === 0.2 &&
                        parametros.doseMax === 0.7
                      ) {
                        // Dexmedetomidina
                        dosesComuns.push(0.2, 0.35, 0.5, 0.7);
                      } else if (
                        parametros.doseMin === 0.25 &&
                        parametros.doseMax === 1.0
                      ) {
                        // Milrinona
                        dosesComuns.push(0.25, 0.5, 0.75, 1.0);
                      } else if (
                        parametros.doseMin === 2.0 &&
                        parametros.doseMax === 20.0
                      ) {
                        // Dobutamina
                        dosesComuns.push(2.0, 5.0, 10.0, 15.0);
                      } else if (
                        parametros.doseMin === 0.01 &&
                        parametros.doseMax === 0.4
                      ) {
                        // Alprostadil
                        dosesComuns.push(0.01, 0.05, 0.1, 0.2);
                      }

                      return dosesComuns.map((dose, index) => (
                        <button
                          key={index}
                          onClick={() => setDoseAtual(dose)}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm"
                        >
                          {dose} {parametros.unidadeDose.split("/")[0]}
                        </button>
                      ));
                    })()}
                  </div>
                </div>

                {/* Informações do Medicamento */}
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Apresentação</span>
                    <span className="font-semibold">
                      {parametros.apresentacao.toLocaleString("pt-BR")} mcg/mL
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Faixa Terapêutica</span>
                    <span className="font-semibold">
                      {parametros.doseMin} - {parametros.doseMax}{" "}
                      {parametros.unidadeDose}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Tempo de Infusão</span>
                    <span className="font-semibold">
                      {parametros.unidadeDose.includes("min")
                        ? "24 horas (1440 minutos)"
                        : "24 horas"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 3: Resultados */}
          <div className="lg:col-span-1 space-y-8">
            {/* Card: Prescrição */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                  Prescrição
                  {prescricao && (
                    <button
                      onClick={copiarPrescricao}
                      className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold text-sm flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copiar
                    </button>
                  )}
                </h2>
              </div>

              <div className="p-6">
                {prescricao ? (
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-300 font-mono whitespace-pre-wrap text-gray-800 min-h-[250px] text-sm">
                      {prescricao}
                    </div>

                    {/* Detalhes rápidos */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="text-sm text-gray-600">
                          Volume Medicamento
                        </div>
                        <div className="text-2xl font-bold text-blue-700">
                          {calculoResultado!.vMedAr.toFixed(1)} mL
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl">
                        <div className="text-sm text-gray-600">
                          Volume SF 0,9%
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                          {calculoResultado!.vsoro09.toFixed(1)} mL
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl">
                        <div className="text-sm text-gray-600">Velocidade</div>
                        <div className="text-2xl font-bold text-purple-700">
                          {calculoResultado!.velocidade} mL/h
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <div className="text-sm text-gray-600">
                          Conc. Diluição
                        </div>
                        <div className="text-2xl font-bold text-orange-700">
                          {calculoResultado!.concDil.toFixed(2)} mcg/mL
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg">
                      Insira o peso para ver a prescrição
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Card: Cálculos Detalhados */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4">
                <h2 className="text-2xl font-bold text-white">
                  Cálculos Detalhados
                </h2>
              </div>

              <div className="p-6">
                {explicacaoCalculo ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 font-mono whitespace-pre-wrap text-gray-800 text-xs min-h-[350px] max-h-[350px] overflow-y-auto">
                      {explicacaoCalculo}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-lg">Os cálculos serão exibidos aqui</p>
                    <p className="text-sm mt-2">
                      Insira o peso e ajuste os parâmetros
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-300">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Calculadora de Drogas em Infusão Contínua</strong> - Para
              uso exclusivo de profissionais de saúde
            </p>
            <p className="text-sm">
              Esta ferramenta é de apoio clínico. Todas as prescrições devem ser
              validadas por médico responsável.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              <p>
                Total de medicamentos disponíveis:{" "}
                {Object.keys(medicamentos).length}
              </p>
              <p>
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
