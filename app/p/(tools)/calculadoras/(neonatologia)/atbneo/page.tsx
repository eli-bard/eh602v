// app/calculadora-antibioticos-neonatais/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useIdadeNeonatal } from "@/components/hooks/useIdadeNeonatal";

interface CalculationResult {
  penicilina: {
    intervalo: string;
    doseUI: number;
    prescricao: string;
  };
  ampicilina: {
    doseMg: number;
    intervalo: string;
    duracao: string;
    prescricao: string;
  };
  gentamicina: {
    doseMg: number;
    intervalo: string;
    prescricao: string;
  };
  cefepime: {
    doseMg: number;
    intervalo: string;
    prescricao: string;
  };
  vancomicina: {
    doseMg: number;
    intervalo: string;
    concentracao: string;
    prescricao: string;
  };
}

// Indicação de Ampicilina
type AmpicilinaIndicacao = "septicemia" | "meningite";

export default function CalculadoraAntibioticosNeonatais() {
  const [weight, setWeight] = useState<string>("");
  const [ampicilinaIndicacao, setAmpicilinaIndicacao] =
    useState<AmpicilinaIndicacao>("septicemia");

  // Usando o hook personalizado para idade neonatal
  const {
    dataNascimento,
    setDataNascimento,
    horaNascimento,
    setHoraNascimento,
    semanasGestacao,
    setSemanasGestacao,
    diasGestacao,
    setDiasGestacao,
    idade,
    idadeCorrigida,
    calcularIdade,
  } = useIdadeNeonatal();

  // Calcular dias de vida a partir da data de nascimento
  const daysOfLife = useMemo(() => {
    if (!dataNascimento) return 0;
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    
    hoje.setHours(0, 0, 0, 0);
    nascimento.setHours(0, 0, 0, 0);
    
    const diffTempo = hoje.getTime() - nascimento.getTime();
    return Math.floor(diffTempo / (1000 * 60 * 60 * 24));
  }, [dataNascimento]);

  // Calcular idade gestacional corrigida em semanas e dias
  const getCorrectedAgeWeeksAndDays = useMemo(() => {
    if (!dataNascimento || semanasGestacao === 0) return { semanas: 0, dias: 0 };
    
    const diasVida = daysOfLife;
    const diasGestacaoTotal = semanasGestacao * 7 + diasGestacao;
    const diasCorrigidosTotal = diasGestacaoTotal + diasVida - 1;
    
    return {
      semanas: Math.floor(diasCorrigidosTotal / 7),
      dias: diasCorrigidosTotal % 7
    };
  }, [dataNascimento, semanasGestacao, diasGestacao, daysOfLife]);

  // Função principal de cálculos
  const calculations = useMemo<CalculationResult | null>(() => {
    const parsedWeight = parseFloat(weight);
    
    if (
      isNaN(parsedWeight) ||
      parsedWeight <= 0 ||
      !dataNascimento ||
      semanasGestacao === 0
    ) {
      return null;
    }

    const gestAge = semanasGestacao;
    const correctedAgeWeeks = getCorrectedAgeWeeksAndDays.semanas;
    const isPreterm = gestAge < 37;
    const correctedAge = isPreterm ? correctedAgeWeeks || gestAge : gestAge;

    // ===== PENICILINA =====
    const penicilinaIntervalo = daysOfLife < 7 ? "12/12 horas" : "8/8 horas";
    const penicilinaDoseUI = 50000; // 50.000 UI/kg/dose
    const penicilinaCalculo = (parsedWeight * 6) / 50;
    const soropenicilinaCalculo = (parsedWeight * 6) / 50 + 20;
    const penicilinaPrescricao = `Penicilina Cristalina 5.000.000 UI + Água Destilada 10 mL. Aspirar ${penicilinaCalculo.toFixed(
      1
    )} da solução + ${soropenicilinaCalculo.toFixed(
      1
    )} mL de SF 0,9%. Administrar ${penicilinaDoseUI.toLocaleString(
      "pt-BR"
    )} UI/kg/dose EV lento de ${penicilinaIntervalo}.`;

    // ===== AMPICILINA =====
    let ampicilinaDose = 50; // mg/kg/dose padrão para septicemia
    let ampicilinaDuracao = "10 dias ou mais";

    // Ajustar dose baseado na indicação selecionada
    if (ampicilinaIndicacao === "septicemia") {
      // Bacteremia/septicemia conforme tabela
      if (gestAge <= 34 && daysOfLife > 7 && daysOfLife <= 28) {
        ampicilinaDose = 75; // 75 mg/kg/dose para ≤34 semanas, 8-28 dias
      } else {
        ampicilinaDose = 50; // 50 mg/kg/dose para outras situações
      }
      ampicilinaDuracao = "10 dias ou mais";
    } else if (ampicilinaIndicacao === "meningite") {
      // Meningite GBS
      if (daysOfLife <= 7) {
        ampicilinaDose = 100;
      } else {
        ampicilinaDose = 75;
      }
      ampicilinaDuracao = "14 dias ou mais";
    }

    let ampicilinaIntervalo = "8/8 horas";
    if (correctedAge <= 29 && daysOfLife <= 28)
      ampicilinaIntervalo = "12/12 horas";
    else if (correctedAge <= 29 && daysOfLife > 28)
      ampicilinaIntervalo = "8/8 horas";
    else if (correctedAge >= 30 && correctedAge <= 36 && daysOfLife <= 14)
      ampicilinaIntervalo = "12/12 horas";
    else if (correctedAge >= 30 && correctedAge <= 36 && daysOfLife > 14)
      ampicilinaIntervalo = "8/8 horas";
    else if (correctedAge >= 37 && correctedAge <= 44 && daysOfLife <= 7)
      ampicilinaIntervalo = "12/12 horas";
    else if (correctedAge >= 37 && correctedAge <= 44 && daysOfLife > 7)
      ampicilinaIntervalo = "8/8 horas";
    else if (correctedAge >= 45) ampicilinaIntervalo = "6/6 horas";

    const ampicilinaCalculo = (parsedWeight * ampicilinaDose) / 100;
    const ampicilinaPrescricao = `Ampicilina 500 mg + Água destilada 5 mL. Administrar ${ampicilinaCalculo.toFixed(
      1
    )} mL (${ampicilinaDose} mg/kg/dose) EV lento de ${ampicilinaIntervalo}. Duração: ${ampicilinaDuracao}. Indicação: ${
      ampicilinaIndicacao === "septicemia"
        ? "Bacteremia/Septicemia"
        : "Meningite GBS"
    }.`;

    // ===== GENTAMICINA =====
    let gentamicinaDose = 4; // mg/kg
    let gentamicinaIntervalo = "24/24 horas";

    if ((correctedAge <= 29 || daysOfLife <= 7) && daysOfLife <= 7) {
      gentamicinaDose = 5;
      gentamicinaIntervalo = "48/48 horas";
    } else if (
      (correctedAge <= 29 || daysOfLife <= 7) &&
      daysOfLife >= 8 &&
      daysOfLife <= 28
    ) {
      gentamicinaDose = 4;
      gentamicinaIntervalo = "36/36 horas";
    } else if ((correctedAge <= 29 || daysOfLife <= 7) && daysOfLife >= 29) {
      gentamicinaDose = 4;
      gentamicinaIntervalo = "24/24 horas";
    } else if (correctedAge >= 30 && correctedAge <= 34 && daysOfLife <= 7) {
      gentamicinaDose = 4.5;
      gentamicinaIntervalo = "36/36 horas";
    } else if (
      correctedAge >= 30 &&
      correctedAge <= 34 &&
      daysOfLife >= 8 &&
      daysOfLife <= 28
    ) {
      gentamicinaDose = 4;
      gentamicinaIntervalo = "24/24 horas";
    } else if (correctedAge >= 35) {
      gentamicinaDose = 4;
      gentamicinaIntervalo = "24/24 horas";
    }

    const gentamicinaCalculo = (parsedWeight * gentamicinaDose) / 4;
    const gentamicinaPrescricao = `Gentamicina 40 mg/mL 1 mL + Água destilada 9 mL. Aspirar ${gentamicinaCalculo.toFixed(
      1
    )} mL + ${gentamicinaCalculo.toFixed(
      1
    )} mL de SF 0,9% EV em BIC 30 minutos de ${gentamicinaIntervalo}.`;

    // ===== CEFEPIME =====
    let cefepimeDose = daysOfLife < 28 ? 30 : 50; // mg/kg/dose
    const cefepimeIntervalo = "12/12 horas";
    const cefepimeCalculo = (parsedWeight * cefepimeDose) / 100;
    const cefepimePrescricao = `Cefepime 1000 mg + Água destilada 10 mL. Aspirar ${cefepimeCalculo.toFixed(
      1
    )} mL + ${((parsedWeight * cefepimeDose) / 40).toFixed(
      1
    )} mL de SF 0,9% EV de ${cefepimeIntervalo}. Concentração máxima 40 mg/mL`;

    // ===== VANCOMICINA =====
    const vancomicinaDose = 15; // mg/kg/dose (inicial 10-15)
    let vancomicinaIntervalo = "8/8 horas";

    if (correctedAge <= 29 && daysOfLife <= 14)
      vancomicinaIntervalo = "18/18 horas";
    else if (correctedAge <= 29 && daysOfLife > 14)
      vancomicinaIntervalo = "12/12 horas";
    else if (correctedAge >= 30 && correctedAge <= 36 && daysOfLife <= 14)
      vancomicinaIntervalo = "12/12 horas";
    else if (correctedAge >= 30 && correctedAge <= 36 && daysOfLife > 14)
      vancomicinaIntervalo = "8/8 horas";
    else if (correctedAge >= 37 && correctedAge <= 44 && daysOfLife <= 14)
      vancomicinaIntervalo = "12/12 horas";
    else if (correctedAge >= 37 && correctedAge <= 44 && daysOfLife > 14)
      vancomicinaIntervalo = "8/8 horas";
    else if (correctedAge >= 45) vancomicinaIntervalo = "6/6 horas";

    const vancomicinaCalculo = (parsedWeight * vancomicinaDose) / 50;
    const vancomicinaPrescricao = `Vancomicina 500 mg + Água destilada 10 mL. Aspirar ${vancomicinaCalculo.toFixed(
      1
    )} mL + ${((parsedWeight * vancomicinaDose) / 40).toFixed(
      1
    )} mL de SG 5% EV em BIC em 1 hora de ${vancomicinaIntervalo}. Concentração máxima: 5 mg/mL.`;

    return {
      penicilina: {
        intervalo: penicilinaIntervalo,
        doseUI: penicilinaDoseUI,
        prescricao: penicilinaPrescricao,
      },
      ampicilina: {
        doseMg: ampicilinaDose,
        intervalo: ampicilinaIntervalo,
        duracao: ampicilinaDuracao,
        prescricao: ampicilinaPrescricao,
      },
      gentamicina: {
        doseMg: gentamicinaDose,
        intervalo: gentamicinaIntervalo,
        prescricao: gentamicinaPrescricao,
      },
      cefepime: {
        doseMg: cefepimeDose,
        intervalo: cefepimeIntervalo,
        prescricao: cefepimePrescricao,
      },
      vancomicina: {
        doseMg: vancomicinaDose,
        intervalo: vancomicinaIntervalo,
        concentracao: "5 mg/mL",
        prescricao: vancomicinaPrescricao,
      },
    };
  }, [weight, dataNascimento, semanasGestacao, diasGestacao, daysOfLife, ampicilinaIndicacao, getCorrectedAgeWeeksAndDays]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Prescrição copiada para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
            <span className="text-teal-600">EliHelp</span> Calculadora de Antibióticos Neonatais
          </h1>
          <p className="text-gray-700 text-lg">
            Calcule doses e prescrições de antibióticos para neonatologia baseado no peso, idade gestacional e dias de vida
          </p>
          <p className="text-teal-700 text-3xl font-bold">
            Confira cada cálculo - PÁGINA AINDA EM CONSTRUÇÃO
          </p>
        </div>

        {/* Formulário de entrada */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Dados do Paciente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Peso */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold">
                Peso (kg):
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 2.5"
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                min="0.1"
                step="0.1"
              />
              <p className="text-sm text-gray-500">Peso em quilogramas</p>
            </div>

            {/* Data de Nascimento */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold">
                Data de Nascimento:
              </label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
              <p className="text-sm text-gray-500">Data do nascimento</p>
            </div>

            {/* Idade Gestacional (Semanas) */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold">
                Idade Gestacional (semanas):
              </label>
              <input
                type="number"
                value={semanasGestacao}
                onChange={(e) => setSemanasGestacao(parseInt(e.target.value) || 0)}
                placeholder="Ex: 34"
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                min="22"
                max="42"
                step="1"
              />
              <p className="text-sm text-gray-500">Semanas completas</p>
            </div>

            {/* Dias Gestacionais */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold">
                Dias Gestacionais:
              </label>
              <input
                type="number"
                value={diasGestacao}
                onChange={(e) => setDiasGestacao(parseInt(e.target.value) || 0)}
                placeholder="Ex: 3"
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                min="0"
                max="6"
                step="1"
              />
              <p className="text-sm text-gray-500">Dias adicionais (0-6)</p>
            </div>
          </div>

          {/* Hora de Nascimento */}
          <div className="mt-4">
            <label className="block text-gray-800 font-semibold">
              Hora de Nascimento (opcional):
            </label>
            <input
              type="time"
              value={horaNascimento}
              onChange={(e) => setHoraNascimento(e.target.value)}
              className="w-full md:w-48 p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
            <p className="text-sm text-gray-500 mt-1">Para cálculo mais preciso da idade</p>
          </div>

          {/* Informações calculadas */}
          {(dataNascimento || semanasGestacao > 0) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Informações Calculadas:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">Dias de Vida</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {daysOfLife}
                  </p>
                </div>
                {semanasGestacao < 37 && (
                  <>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">
                        Idade Gestacional Corrigida
                      </p>
                      <p className="text-2xl font-bold text-blue-700">
                        {getCorrectedAgeWeeksAndDays.semanas}s {getCorrectedAgeWeeksAndDays.dias}d
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">Idade Corrigida</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {idadeCorrigida?.split('(')[0] || 'N/A'}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 text-sm text-blue-700">
                <p><strong>Idade Cronológica:</strong> {idade}</p>
                {idadeCorrigida && (
                  <p><strong>Idade Corrigida:</strong> {idadeCorrigida}</p>
                )}
              </div>
            </div>
          )}

          {/* Seleção de indicação para Ampicilina */}
          <div className="mt-6">
            <label className="block text-gray-800 font-semibold mb-3">
              Indicação para Ampicilina:
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setAmpicilinaIndicacao("septicemia")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  ampicilinaIndicacao === "septicemia"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Bacteremia/Septicemia
              </button>
              <button
                onClick={() => setAmpicilinaIndicacao("meningite")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  ampicilinaIndicacao === "meningite"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Meningite GBS
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Selecionado: <span className="font-semibold text-green-700">
                {ampicilinaIndicacao === "septicemia" ? "Bacteremia/Septicemia" : "Meningite GBS"}
              </span>
            </p>
          </div>
        </div>

        {/* Resultados */}
        {calculations ? (
          <div className="space-y-6">
            {/* Penicilina */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-blue-600 p-4">
                <h3 className="text-xl font-bold text-white">
                  Penicilina Cristalina
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-600">Dose</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {calculations.penicilina.doseUI.toLocaleString("pt-BR")} UI/kg/dose
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-600">Intervalo</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {calculations.penicilina.intervalo}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-600">Peso do Paciente</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {parseFloat(weight).toFixed(1)} kg
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-800 font-semibold mb-2">
                    Prescrição:
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 font-mono text-gray-800 whitespace-pre-wrap">
                    {calculations.penicilina.prescricao}
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(calculations.penicilina.prescricao)
                    }
                    className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    📋 Copiar Prescrição
                  </button>
                </div>
              </div>
            </div>

            {/* Ampicilina */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-green-600 p-4">
                <h3 className="text-xl font-bold text-white">Ampicilina</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-gray-600">Dose</p>
                    <p className="text-2xl font-bold text-green-700">
                      {calculations.ampicilina.doseMg} mg/kg/dose
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-gray-600">Intervalo</p>
                    <p className="text-2xl font-bold text-green-700">
                      {calculations.ampicilina.intervalo}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-gray-600">Duração</p>
                    <p className="text-2xl font-bold text-green-700">
                      {calculations.ampicilina.duracao}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="text-2xl font-bold text-green-700">
                      {parseFloat(weight).toFixed(1)} kg
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-800 font-semibold mb-2">
                    Prescrição:
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 font-mono text-gray-800 whitespace-pre-wrap">
                    {calculations.ampicilina.prescricao}
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(calculations.ampicilina.prescricao)
                    }
                    className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    📋 Copiar Prescrição
                  </button>
                </div>
              </div>
            </div>

            {/* Gentamicina */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-purple-600 p-4">
                <h3 className="text-xl font-bold text-white">Gentamicina</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600">Dose</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {calculations.gentamicina.doseMg} mg/kg/dose
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600">Intervalo</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {calculations.gentamicina.intervalo}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {parseFloat(weight).toFixed(1)} kg
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-800 font-semibold mb-2">
                    Prescrição:
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 font-mono text-gray-800 whitespace-pre-wrap">
                    {calculations.gentamicina.prescricao}
                  </div>
                  <div className="mt-2 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                    ⚠️ <strong>Nefrotóxico:</strong> Considerar trocar por Cefepime para melhorar a transição. Monitorar função renal.
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(calculations.gentamicina.prescricao)
                    }
                    className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    📋 Copiar Prescrição
                  </button>
                </div>
              </div>
            </div>

            {/* Cefepime */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-teal-600 p-4">
                <h3 className="text-xl font-bold text-white">Cefepime</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="text-center p-4 bg-teal-50 rounded-xl">
                    <p className="text-sm text-gray-600">Dose</p>
                    <p className="text-2xl font-bold text-teal-700">
                      {calculations.cefepime.doseMg} mg/kg/dose
                    </p>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-xl">
                    <p className="text-sm text-gray-600">Intervalo</p>
                    <p className="text-2xl font-bold text-teal-700">
                      {calculations.cefepime.intervalo}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-xl">
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="text-2xl font-bold text-teal-700">
                      {parseFloat(weight).toFixed(1)} kg
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-800 font-semibold mb-2">
                    Prescrição:
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 font-mono text-gray-800 whitespace-pre-wrap">
                    {calculations.cefepime.prescricao}
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(calculations.cefepime.prescricao)
                    }
                    className="mt-3 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold"
                  >
                    📋 Copiar Prescrição
                  </button>
                </div>
              </div>
            </div>

            {/* Vancomicina */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-orange-600 p-4">
                <h3 className="text-xl font-bold text-white">Vancomicina</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600">Dose Inicial</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {calculations.vancomicina.doseMg} mg/kg/dose
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600">Intervalo</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {calculations.vancomicina.intervalo}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600">Concentração Máx</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {calculations.vancomicina.concentracao}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {parseFloat(weight).toFixed(1)} kg
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-800 font-semibold mb-2">
                    Prescrição:
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 font-mono text-gray-800 whitespace-pre-wrap">
                    {calculations.vancomicina.prescricao}
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(calculations.vancomicina.prescricao)
                    }
                    className="mt-3 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
                  >
                    📋 Copiar Prescrição
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              Aguardando entrada de dados
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Por favor, insira o peso, data de nascimento e idade gestacional para calcular as doses dos antibióticos.
            </p>
          </div>
        )}

        {/* Aviso legal */}
        <div className="mt-12 pt-6 border-t border-gray-300">
          <p className="text-sm text-gray-600 text-center">
            *Esta calculadora é uma ferramenta de apoio clínico. As informações fornecidas são baseadas em diretrizes pediátricas e devem ser validadas por profissional médico qualificado. Sempre consulte as referências atualizadas e utilize o julgamento clínico para decisões terapêuticas.*
          </p>
          <p className="text-xs text-gray-500 text-center mt-4">
            Fonte: Protocolos de antibióticos em neonatologia - Baseado em diretrizes atualizadas
          </p>
        </div>
      </div>
    </div>
  );
}
