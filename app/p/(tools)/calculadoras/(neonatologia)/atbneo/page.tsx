"use client";
import { useState, useEffect, useCallback } from "react";

interface MedicamentoCalculado {
  nome: string;
  dose: string;
  intervalo: string;
  prescricao: string;
  observacoes?: string;
}

export default function IdadeGestacionalCorrigida() {
  // Estados para os inputs
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [semanasGestacao, setSemanasGestacao] = useState<number>(0);
  const [diasGestacao, setDiasGestacao] = useState<number>(0);
  const [peso, setPeso] = useState<string>("");

  // Estados para os resultados
  const [idade, setIdade] = useState<string>("Preencha os dados de nascimento");
  const [idadeCorrigida, setIdadeCorrigida] = useState<string | null>(null);
  const [idadeCorrigidaSemanas, setIdadeCorrigidaSemanas] = useState<number>(0);
  const [idadeCorrigidaDias, setIdadeCorrigidaDias] = useState<number>(0);
  const [diasDeVida, setDiasDeVida] = useState<number>(0);
  const [medicamentos, setMedicamentos] = useState<MedicamentoCalculado[]>([]);

  // Função para calcular idade gestacional corrigida em semanas e dias
  const calcularIdadeCorrigida = useCallback(
    (diasVida: number) => {
      if (semanasGestacao === 0) return null;

      // Calcular idade gestacional total ao nascer em semanas (com decimais)
      const semanasGestacaoTotal = semanasGestacao + (diasGestacao / 7);
      
      // Calcular idade corrigida: IG ao nascer + idade cronológica
      const idadeCorrigidaTotal = semanasGestacaoTotal + (diasVida / 7);
      
      // Separar em semanas completas e dias
      const semanasCompletas = Math.floor(idadeCorrigidaTotal);
      const diasRestantes = Math.round((idadeCorrigidaTotal - semanasCompletas) * 7);
      
      return {
        semanas: semanasCompletas,
        dias: diasRestantes,
        totalSemanas: idadeCorrigidaTotal
      };
    },
    [semanasGestacao, diasGestacao]
  );

  // Função para calcular doses dos medicamentos
  const calcularMedicamentos = useCallback(
    (idadeCorrSemanas: number, diasVida: number, pesoKg: number) => {
      const medicamentosCalculados: MedicamentoCalculado[] = [];
      const idadeCorrTotal = idadeCorrSemanas + (idadeCorrigidaDias / 7);

      // 1. PENICILINA
      const intervaloPenicilina = diasVida < 7 ? "12/12 horas" : "8/8 horas";
      const dosePenicilina = 50000; // 50.000 UI/kg/dose
      const calculoPenicilina = (pesoKg * 6 / 50);
      const soroPenicilina = calculoPenicilina + 20;
      medicamentosCalculados.push({
        nome: "Penicilina Cristalina",
        dose: `${dosePenicilina.toLocaleString('pt-BR')} UI/kg/dose`,
        intervalo: intervaloPenicilina,
        prescricao: `Penicilina Cristalina 5.000.000 UI + Água Destilada 10 mL. Aspirar ${calculoPenicilina.toFixed(1)} mL da solução + ${soroPenicilina.toFixed(1)} mL de SF 0,9%. Administrar EV lento de ${intervaloPenicilina}.`,
        observacoes: diasVida < 7 ? "Menos de 7 dias de vida" : "7 dias ou mais de vida"
      });

      // 2. AMPICILINA (supondo septicemia para exemplo)
      let doseAmpicilina = 50; // mg/kg/dose
      if (semanasGestacao <= 34 && diasVida > 7 && diasVida <= 28) {
        doseAmpicilina = 75;
      }
      let intervaloAmpicilina = "8/8 horas";
      if (idadeCorrTotal <= 29 && diasVida <= 28) intervaloAmpicilina = "12/12 horas";
      else if (idadeCorrTotal >= 30 && idadeCorrTotal <= 36 && diasVida <= 14) intervaloAmpicilina = "12/12 horas";
      else if (idadeCorrTotal >= 37 && idadeCorrTotal <= 44 && diasVida <= 7) intervaloAmpicilina = "12/12 horas";
      else if (idadeCorrTotal >= 45) intervaloAmpicilina = "6/6 horas";
      
      const calculoAmpicilina = (pesoKg * doseAmpicilina) / 100;
      medicamentosCalculados.push({
        nome: "Ampicilina",
        dose: `${doseAmpicilina} mg/kg/dose`,
        intervalo: intervaloAmpicilina,
        prescricao: `Ampicilina 500 mg + Água destilada 5 mL. Administrar ${calculoAmpicilina.toFixed(1)} mL EV lento de ${intervaloAmpicilina}. Duração: 10 dias ou mais.`,
        observacoes: `IG: ${semanasGestacao}s, Dias: ${diasVida}`
      });

      // 3. GENTAMICINA
      let doseGentamicina = 4;
      let intervaloGentamicina = "24/24 horas";
      
      if ((idadeCorrTotal <= 29 || diasVida <= 7) && diasVida <= 7) {
        doseGentamicina = 5;
        intervaloGentamicina = "48/48 horas";
      } else if ((idadeCorrTotal <= 29 || diasVida <= 7) && diasVida >= 8 && diasVida <= 28) {
        doseGentamicina = 4;
        intervaloGentamicina = "36/36 horas";
      } else if ((idadeCorrTotal <= 29 || diasVida <= 7) && diasVida >= 29) {
        doseGentamicina = 4;
        intervaloGentamicina = "24/24 horas";
      } else if (idadeCorrTotal >= 30 && idadeCorrTotal <= 34 && diasVida <= 7) {
        doseGentamicina = 4.5;
        intervaloGentamicina = "36/36 horas";
      } else if (idadeCorrTotal >= 30 && idadeCorrTotal <= 34 && diasVida >= 8 && diasVida <= 28) {
        doseGentamicina = 4;
        intervaloGentamicina = "24/24 horas";
      } else if (idadeCorrTotal >= 35) {
        doseGentamicina = 4;
        intervaloGentamicina = "24/24 horas";
      }
      
      const calculoGentamicina = (pesoKg * doseGentamicina) / 4;
      medicamentosCalculados.push({
        nome: "Gentamicina",
        dose: `${doseGentamicina} mg/kg/dose`,
        intervalo: intervaloGentamicina,
        prescricao: `Gentamicina 40 mg/mL 1 mL + Água destilada 9 mL. Aspirar ${calculoGentamicina.toFixed(1)} mL + ${calculoGentamicina.toFixed(1)} mL de SF 0,9% EV em BIC 30 minutos de ${intervaloGentamicina}.`,
        observacoes: "Nefrotóxico - monitorar função renal"
      });

      // 4. CEFEPIME
      const doseCefepime = diasVida < 28 ? 30 : 50;
      const intervaloCefepime = "12/12 horas";
      const calculoCefepime = (pesoKg * doseCefepime) / 100;
      medicamentosCalculados.push({
        nome: "Cefepime",
        dose: `${doseCefepime} mg/kg/dose`,
        intervalo: intervaloCefepime,
        prescricao: `Cefepime 1000 mg + Água destilada 10 mL. Aspirar ${calculoCefepime.toFixed(1)} mL + ${(pesoKg * doseCefepime / 40).toFixed(1)} mL de SF 0,9% EV de ${intervaloCefepime}.`,
        observacoes: diasVida < 28 ? "< 28 dias de vida" : "≥ 28 dias de vida"
      });

      // 5. VANCOMICINA
      const doseVancomicina = 15;
      let intervaloVancomicina = "8/8 horas";
      
      if (idadeCorrTotal <= 29 && diasVida <= 14) intervaloVancomicina = "18/18 horas";
      else if (idadeCorrTotal <= 29 && diasVida > 14) intervaloVancomicina = "12/12 horas";
      else if (idadeCorrTotal >= 30 && idadeCorrTotal <= 36 && diasVida <= 14) intervaloVancomicina = "12/12 horas";
      else if (idadeCorrTotal >= 30 && idadeCorrTotal <= 36 && diasVida > 14) intervaloVancomicina = "8/8 horas";
      else if (idadeCorrTotal >= 37 && idadeCorrTotal <= 44 && diasVida <= 14) intervaloVancomicina = "12/12 horas";
      else if (idadeCorrTotal >= 37 && idadeCorrTotal <= 44 && diasVida > 14) intervaloVancomicina = "8/8 horas";
      else if (idadeCorrTotal >= 45) intervaloVancomicina = "6/6 horas";
      
      const calculoVancomicina = (pesoKg * doseVancomicina) / 50;
      medicamentosCalculados.push({
        nome: "Vancomicina",
        dose: `${doseVancomicina} mg/kg/dose (10-15 mg/kg)`,
        intervalo: intervaloVancomicina,
        prescricao: `Vancomicina 500 mg + Água destilada 10 mL. Aspirar ${calculoVancomicina.toFixed(1)} mL + ${(pesoKg * doseVancomicina / 40).toFixed(1)} mL de SG 5% EV em BIC em 1 hora de ${intervaloVancomicina}. Concentração máxima: 5 mg/mL.`,
        observacoes: "Dose inicial: 10-15 mg/kg"
      });

      return medicamentosCalculados;
    },
    [semanasGestacao, idadeCorrigidaDias]
  );

  // Função principal de cálculo
  const calcularIdade = useCallback(() => {
    if (!dataNascimento || !peso) {
      setIdade("Preencha todos os dados obrigatórios");
      setIdadeCorrigida(null);
      setMedicamentos([]);
      return;
    }

    try {
      const nascimento = new Date(dataNascimento);
      const hoje = new Date();

      // Calcular dias de vida
      const diffTempo = hoje.getTime() - nascimento.getTime();
      const diasVida = Math.floor(diffTempo / (1000 * 60 * 60 * 24));
      setDiasDeVida(diasVida);

      // Calcular idade cronológica
      if (diasVida < 4) {
        const horasVida = Math.floor(diffTempo / (1000 * 60 * 60));
        setIdade(`${horasVida} horas de vida`);
      } else {
        let anos = hoje.getFullYear() - nascimento.getFullYear();
        let meses = hoje.getMonth() - nascimento.getMonth();
        let dias = hoje.getDate() - nascimento.getDate();

        if (dias < 0) {
          const ultimoDiaMesAnterior = new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            0
          ).getDate();
          meses--;
          dias += ultimoDiaMesAnterior;
        }
        if (meses < 0) {
          anos--;
          meses += 12;
        }

        let textoIdade = "";
        if (anos > 0) textoIdade += `${anos} ano${anos !== 1 ? "s" : ""}`;
        if (meses > 0)
          textoIdade += `${textoIdade ? ", " : ""}${meses} mês${
            meses !== 1 ? "es" : ""
          }`;
        if (dias > 0 || (!anos && !meses))
          textoIdade += `${textoIdade ? " e " : ""}${dias} dia${
            dias !== 1 ? "s" : ""
          }`;

        setIdade(textoIdade);
      }

      // Calcular idade corrigida
      const pesoKg = parseFloat(peso);
      const resultadoCorrigido = calcularIdadeCorrigida(diasVida);
      
      if (resultadoCorrigido && semanasGestacao < 37) {
        setIdadeCorrigida(`${resultadoCorrigido.semanas} semanas e ${resultadoCorrigido.dias} dias`);
        setIdadeCorrigidaSemanas(resultadoCorrigido.semanas);
        setIdadeCorrigidaDias(resultadoCorrigido.dias);
        
        // Calcular medicamentos
        const medicamentosCalculados = calcularMedicamentos(
          resultadoCorrigido.semanas,
          diasVida,
          pesoKg
        );
        setMedicamentos(medicamentosCalculados);
      } else {
        setIdadeCorrigida(semanasGestacao >= 37 ? "Recém-nascido de termo" : null);
        setMedicamentos([]);
      }
    } catch {
      setIdade("Erro ao calcular idade");
      setIdadeCorrigida(null);
      setMedicamentos([]);
    }
  }, [dataNascimento, peso, semanasGestacao, calcularIdadeCorrigida, calcularMedicamentos]);

  // Efeito para calcular automaticamente
  useEffect(() => {
    calcularIdade();
  }, [calcularIdade]);

  // Formatar data atual para max attribute
  const getDataAtualFormatada = () => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  };

  // Função para copiar prescrição
  const copiarPrescricao = (prescricao: string) => {
    navigator.clipboard.writeText(prescricao)
      .then(() => alert("Prescrição copiada!"))
      .catch(() => alert("Erro ao copiar"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">
            Calculadora de Antibióticos Neonatais
          </h1>
          <p className="text-gray-600">
            Calcule idade gestacional corrigida e doses de antibióticos para recém-nascidos
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Painel de entrada de dados */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
              Dados do Recém-Nascido
            </h2>

            <div className="space-y-6">
              {/* Peso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Ex: 2.5"
                  required
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  max={getDataAtualFormatada()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Idade Gestacional ao Nascer */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">
                  Idade Gestacional ao Nascer
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Semanas (20-42)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="20"
                        max="42"
                        value={semanasGestacao}
                        onChange={(e) => setSemanasGestacao(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 text-lg font-bold text-blue-800 min-w-[3rem]">
                        {semanasGestacao}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Dias (0-6)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="6"
                        value={diasGestacao}
                        onChange={(e) => setDiasGestacao(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 text-lg font-bold text-blue-800 min-w-[3rem]">
                        {diasGestacao}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-blue-700 font-medium">
                    {semanasGestacao} semanas e {diasGestacao} dias
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {semanasGestacao < 37 ? "Prematuro" : "Recém-nascido de termo"}
                  </p>
                </div>
              </div>

              <button
                onClick={calcularIdade}
                disabled={!dataNascimento || !peso}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  dataNascimento && peso
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Calcular
              </button>
            </div>
          </div>

          {/* Painel de resultados e medicamentos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                Resultados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Idade Cronológica */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Idade Cronológica
                  </h3>
                  <div className="text-3xl font-bold text-gray-900">
                    {idade}
                  </div>
                  {diasDeVida > 0 && (
                    <p className="text-gray-600 text-sm mt-2">
                      {diasDeVida} dias de vida
                    </p>
                  )}
                </div>

                {/* Idade Gestacional Corrigida */}
                <div className={`p-6 rounded-xl border ${
                  semanasGestacao < 37 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <h3 className="text-lg font-semibold mb-3">
                    {semanasGestacao < 37 ? (
                      <span className="text-green-800">Idade Gestacional Corrigida</span>
                    ) : (
                      <span className="text-blue-800">Status</span>
                    )}
                  </h3>
                  <div className="text-3xl font-bold mb-2">
                    {semanasGestacao < 37 ? (
                      <span className="text-green-900">{idadeCorrigida || "---"}</span>
                    ) : (
                      <span className="text-blue-900">Recém-nascido de termo</span>
                    )}
                  </div>
                  {semanasGestacao < 37 && idadeCorrigida && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="text-center bg-white p-3 rounded-lg border border-green-200">
                        <div className="text-xl font-bold text-green-700">
                          {idadeCorrigidaSemanas}
                        </div>
                        <div className="text-sm text-green-600">semanas</div>
                      </div>
                      <div className="text-center bg-white p-3 rounded-lg border border-green-200">
                        <div className="text-xl font-bold text-green-700">
                          {idadeCorrigidaDias}
                        </div>
                        <div className="text-sm text-green-600">dias</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status do Prematuro */}
              <div className={`p-6 rounded-xl border mb-8 ${
                semanasGestacao < 37 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-emerald-50 border-emerald-200'
              }`}>
                <h3 className="text-lg font-semibold mb-2">
                  {semanasGestacao < 37 ? (
                    <span className="text-amber-800">Classificação</span>
                  ) : (
                    <span className="text-emerald-800">Classificação</span>
                  )}
                </h3>
                <p className={
                  semanasGestacao < 37 
                    ? 'text-amber-700 font-medium' 
                    : 'text-emerald-700 font-medium'
                }>
                  {semanasGestacao < 28 ? 'Prematuro extremo (<28 semanas)' :
                   semanasGestacao < 32 ? 'Prematuro grave (28-31 semanas)' :
                   semanasGestacao < 34 ? 'Prematuro moderado (32-33 semanas)' :
                   semanasGestacao < 37 ? 'Prematuro tardio (34-36 semanas)' :
                   'Recém-nascido de termo (≥37 semanas)'}
                </p>
              </div>
            </div>

            {/* Medicamentos */}
            {medicamentos.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                  Antibióticos Calculados
                </h2>
                
                <div className="space-y-6">
                  {medicamentos.map((med, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{med.nome}</h3>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                              {med.dose}
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                              {med.intervalo}
                            </span>
                            {med.observacoes && (
                              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                                {med.observacoes}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => copiarPrescricao(med.prescricao)}
                          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
                        >
                          Copiar
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">Prescrição:</h4>
                        <p className="text-gray-800 font-mono text-sm whitespace-pre-wrap">
                          {med.prescricao}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Informações */}
            {medicamentos.length === 0 && dataNascimento && peso && (
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">
                  Informações
                </h3>
                <p className="text-indigo-700">
                  {semanasGestacao >= 37 
                    ? "Para recém-nascidos de termo (≥37 semanas), não se calcula idade corrigida. As doses são baseadas apenas na idade cronológica."
                    : "Preencha os dados acima para calcular as doses dos antibióticos."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-300 text-center text-gray-600 text-sm">
          <p>
            Esta calculadora segue as diretrizes de neonatologia para cálculo de idade gestacional corrigida 
            e doses de antibióticos. Sempre consulte um profissional de saúde para prescrição.
          </p>
          <p className="mt-2">
            Baseado em protocolos atualizados • Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </footer>
      </div>
    </div>
  );
}
