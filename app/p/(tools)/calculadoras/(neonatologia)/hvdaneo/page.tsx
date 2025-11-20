"use client";
import { useState } from "react";

export default function HidratacaoVenosa() {
  // Estados para os inputs
  const [peso, setPeso] = useState<number>(0);
  const [oh, setOh] = useState<number>(0);
  const [vig, setVig] = useState<number>(0);
  const [ca, setCa] = useState<number>(0);
  const [na, setNa] = useState<number>(0);
  const [k, setK] = useState<number>(0);

  // Estados para as apresentações
  const [apresentacaoCa, setApresentacaoCa] = useState<string>("glucal10");
  const [apresentacaoNa, setApresentacaoNa] = useState<string>("nacl20");
  const [apresentacaoK, setApresentacaoK] = useState<string>("kcl10");

  // Estados para os resultados
  const [resultados, setResultados] = useState({
    volumeGlicosado5: 0,
    volumeGlicose50: 0,
    volumeCalcio: 0,
    volumeSodio: 0,
    volumePotassio: 0,
    vazao: 0,
    concentracaoGlicose: 0,
    alertaGlicose: "",
    mostrarResultados: false,
  });

  // Objeto de concentrações
  const concentracoes = {
    glucal10: { mEq: 0.5 },
    nacl20: { mEq: 3.4 },
    nacl10: { mEq: 1.7 },
    kcl10: { mEq: 1.34 },
    kcl191: { mEq: 2.56 },
  };

  // Função de cálculo
  const calcularHVNeo = () => {
    const volumeTotal = peso * oh;
    const gramasGlicose = vig * peso * 1.44;

    const volumeCalcio =
      (peso * ca) /
      concentracoes[apresentacaoCa as keyof typeof concentracoes].mEq;
    const volumeSodio =
      (peso * na) /
      concentracoes[apresentacaoNa as keyof typeof concentracoes].mEq;
    const volumePotassio =
      (peso * k) /
      concentracoes[apresentacaoK as keyof typeof concentracoes].mEq;

    const volumeParaGlicose =
      volumeTotal - (volumeCalcio + volumeSodio + volumePotassio);

    const aaa = gramasGlicose * 100;
    const bbb = volumeParaGlicose * 5;
    const ccc = (aaa - bbb) / 45;
    const volumeGlicose50 = Math.abs(ccc);
    const volumeGlicosado5 = volumeParaGlicose - volumeGlicose50;

    const concentracaoGlicose = (gramasGlicose / volumeTotal) * 100;
    const vazao = volumeTotal / 24;

    let alertaGlicose = "";
    if (concentracaoGlicose > 12.5) {
      alertaGlicose = "Atenção: Concentração de glicose acima de 12.5%!";
    }

    setResultados({
      volumeGlicosado5,
      volumeGlicose50,
      volumeCalcio,
      volumeSodio,
      volumePotassio,
      vazao,
      concentracaoGlicose,
      alertaGlicose,
      mostrarResultados: true,
    });
  };

  // Obter texto da apresentação
  const getApresentacaoText = (tipo: string, valor: string) => {
    switch (tipo) {
      case "ca":
        return valor === "glucal10" ? "Gluconato de cálcio 10%" : "";
      case "na":
        return valor === "nacl20"
          ? "NaCl 20%"
          : valor === "nacl10"
          ? "NaCl 10%"
          : "";
      case "k":
        return valor === "kcl10"
          ? "KCl 10%"
          : valor === "kcl191"
          ? "KCl 19,1%"
          : "";
      default:
        return "";
    }
  };

  // Gerar texto da prescrição copiável
  const gerarPrescricaoCopiavel = () => {
    const volumeTotal = peso * oh;
    return `SG 5% -------------------------- ${resultados.volumeGlicosado5.toFixed(
      2
    )} mL
GH 50% ------------------------ ${resultados.volumeGlicose50.toFixed(2)} mL
${getApresentacaoText(
  "ca",
  apresentacaoCa
)} -------------- ${resultados.volumeCalcio.toFixed(2)} mL
${getApresentacaoText(
  "na",
  apresentacaoNa
)} -------------- ${resultados.volumeSodio.toFixed(2)} mL
${getApresentacaoText(
  "k",
  apresentacaoK
)} ------------ ${resultados.volumePotassio.toFixed(2)} mL
Administrar EV em BIC a ${resultados.vazao.toFixed(2)} mL/hora
Uso médico: ${volumeTotal.toFixed(
      0
    )} / ${oh} / ${vig} / ${ca} / ${na} / ${k} / ${resultados.concentracaoGlicose.toFixed(
      2
    )}%`;
  };

  // Copiar prescrição para área de transferência
  const copiarPrescricao = async () => {
    try {
      await navigator.clipboard.writeText(gerarPrescricaoCopiavel());
      alert("Prescrição copiada para a área de transferência!");
    } catch (err) {
      console.error("Falha ao copiar: ", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-700">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Calculadora de Hidratação Venosa em Neonatologia
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Coluna 1 - Inputs */}
        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="peso"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Peso (kg)
            </label>
            <input
              id="peso"
              type="number"
              step="0.01"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={peso}
              onChange={(e) => setPeso(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="oh"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              OH/HV (mL/kg/dia)
            </label>
            <input
              id="oh"
              type="number"
              step="0.1"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={oh}
              onChange={(e) => setOh(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="vig"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              VIG (mg/kg/min)
            </label>
            <input
              id="vig"
              type="number"
              step="0.1"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={vig}
              onChange={(e) => setVig(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Coluna 2 - Eletrólitos */}
        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="ca"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Cálcio (mEq/kg/dia)
            </label>
            <div className="flex gap-2">
              <input
                id="ca"
                type="number"
                step="0.1"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={ca}
                onChange={(e) => setCa(parseFloat(e.target.value) || 0)}
              />
              <select
                className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={apresentacaoCa}
                onChange={(e) => setApresentacaoCa(e.target.value)}
              >
                <option value="glucal10">Gluconato 10%</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="na"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Sódio (mEq/kg/dia)
            </label>
            <div className="flex gap-2">
              <input
                id="na"
                type="number"
                step="0.1"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={na}
                onChange={(e) => setNa(parseFloat(e.target.value) || 0)}
              />
              <select
                className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={apresentacaoNa}
                onChange={(e) => setApresentacaoNa(e.target.value)}
              >
                <option value="nacl20">NaCl 20%</option>
                <option value="nacl10">NaCl 10%</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="k"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Potássio (mEq/kg/dia)
            </label>
            <div className="flex gap-2">
              <input
                id="k"
                type="number"
                step="0.1"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={k}
                onChange={(e) => setK(parseFloat(e.target.value) || 0)}
              />
              <select
                className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={apresentacaoK}
                onChange={(e) => setApresentacaoK(e.target.value)}
              >
                <option value="kcl10">KCl 10%</option>
                <option value="kcl191">KCl 19,1%</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={calcularHVNeo}
          className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          Calcular
        </button>
      </div>

      {/* Resultados */}
      {resultados.mostrarResultados && (
        <div className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Resultados
          </h2>

          {resultados.alertaGlicose && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md border border-red-300 dark:border-red-700">
              {resultados.alertaGlicose}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Glicosado 5%
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.volumeGlicosado5.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Glicose 50%
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.volumeGlicose50.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cálcio ({getApresentacaoText("ca", apresentacaoCa)})
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.volumeCalcio.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sódio ({getApresentacaoText("na", apresentacaoNa)})
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.volumeSodio.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Potássio ({getApresentacaoText("k", apresentacaoK)})
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.volumePotassio.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">Vazão</p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.vazao.toFixed(2)} mL/h
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm dark:shadow-gray-900 md:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Concentração de Glicose Final
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.concentracaoGlicose.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Detalhes dos Cálculos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Concentração de Glicose Final
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {resultados.concentracaoGlicose.toFixed(2)}%
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm dark:shadow-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Volume Total
              </p>
              <p className="text-lg font-semibold dark:text-gray-100">
                {(peso * oh).toFixed(2)} mL
              </p>
            </div>
          </div>

          {/* Prescrição Copiável */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Prescrição Médica
                </h3>
                <button
                  onClick={copiarPrescricao}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Copiar Prescrição
                </button>
              </div>
            </div>

            <div className="p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-600">
                {`SG 5% -------------------------- ${resultados.volumeGlicosado5.toFixed(
                  2
                )} mL
GH 50% ------------------------ ${resultados.volumeGlicose50.toFixed(2)} mL
${getApresentacaoText(
  "ca",
  apresentacaoCa
)} -------------- ${resultados.volumeCalcio.toFixed(2)} mL
${getApresentacaoText(
  "na",
  apresentacaoNa
)} -------------- ${resultados.volumeSodio.toFixed(2)} mL
${getApresentacaoText(
  "k",
  apresentacaoK
)} ------------ ${resultados.volumePotassio.toFixed(2)} mL
Administrar EV em BIC a ${resultados.vazao.toFixed(2)} mL/hora
Uso médico: VT: ${(peso * oh).toFixed(
                  2
                )} / OH ${oh} / VIG ${vig} / Ca ${ca} / Na ${na} / K ${k} / [glic] ${resultados.concentracaoGlicose.toFixed(
                  2
                )}%`}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        <p>
          Esta ferramenta não substitui o julgamento clínico. Consulte sempre as
          diretrizes mais recentes.
        </p>
      </div>
    </div>
  );
}
