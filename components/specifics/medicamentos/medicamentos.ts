// medicamentos.ts

export interface Dose {
  type: string; // Ex: "Infusão Contínua (IC)", "Bolus/Procedimento (EV)", "VO"
  value: string; // Ex: "0,5 - 4 mcg/kg/h (ou 1 - 5 µg/kg/hora)."
}

export interface Medication {
  id: string; // Identificador único, ex: "fentanil"
  name: string;
  categories: string[];
  presentation?: string; // Campo opcional
  doses: Dose[];
  dilutionAndPreparation?: string[]; // Campo opcional, array de pontos
  observations?: string[]; // Campo opcional, array de pontos
  antidote?: string; // Campo opcional
  whereToFindInfoLink: string; // Link gerado dinamicamente
}

/**
 * Função auxiliar para gerar o link de busca no Guia Farmacêutico do HSL.
 * Remove termos entre parênteses para uma busca mais limpa.
 */
const generateInfoLink = (medicationName: string): string => {
  // Remove texto entre parênteses e espaços extras (ex: "Precedex (Dexmedetomidina)" -> "Precedex")
  const nameForUrl = medicationName
    .replace(/\s*\([\s\S]*?\)\s*/g, "") // Regex mais robusta para qualquer conteúdo entre parênteses
    .trim();

  const encodedName = encodeURIComponent(nameForUrl);
  return `https://guiafarmaceutico.hsl.org.br/busca?k=${encodedName}`;
};

// Array contendo todos os dados das medicações
export const medications: Medication[] = [
  // I. Sedativos e Analgésicos
  {
    id: "fentanil",
    name: "Fentanil",
    categories: ["Analgésico opioide", "Sedativo"],
    presentation: "50 mcg/mL (0,05 mg/mL) - Ampolas de 2, 5 ou 10 mL.",
    doses: [
      {
        type: "Infusão Contínua (IC)",
        value: "0,5 - 4 mcg/kg/h (ou 1 - 5 µg/kg/hora).",
      },
      { type: "Bolus/Procedimento (EV)", value: "2 - 4 mcg/kg." },
    ],
    dilutionAndPreparation: [
      '"Bizu" para 1 mcg/kg/h = 1 mL/h (mais comum em pediatria): Pegue o `peso` do paciente (em kg) em mL de Fentanil (50 mcg/mL). Complete o volume total da solução para 50 mL com SF 0,9%.',
      "Exemplo: Para um paciente de 7 kg, utilize 7 mL de Fentanil 50 mcg/mL e complete para 50 mL com SF 0,9%. A concentração final será de (7 mL * 50 mcg/mL) / 50 mL = 7 mcg/mL. Correndo a 1 mL/h, a dose será de 7 mcg/h, o que para um paciente de 7 kg corresponde a 1 mcg/kg/h.",
      "Cálculo do volume diário de Fentanil puro (mL): `(Peso (kg) x Dose (mcg/kg/h) x 24 (h)) / 50 (mcg/mL da ampola)` = Volume total de Fentanil puro em mL por dia.",
      "Outra diluição (10 mcg/mL): 10 mL de Fentanil + 40 mL de SF 0,9% = 50 mL de solução com 10 mcg/mL. Correr 1 mL/h se a dose desejada for 10 mcg/h (equivalente a 0,1 mg/kg/h para um paciente de 10 kg).",
    ],
    observations: [
      "Pode causar rigidez torácica em bolus rápido, especialmente em neonatos.",
      '"Fentanove" (diluir para nove) refere-se a uma diluição específica.',
      "Pode ser administrado puro em alguns contextos.",
    ],
    antidote: "Naloxona.",
    whereToFindInfoLink: generateInfoLink("Fentanil"),
  },
  {
    id: "midazolam",
    name: "Midazolam",
    categories: [
      "Benzodiazepínico",
      "Sedativo",
      "Ansiolítico",
      "Amnésico",
      "Anticonvulsivante",
    ],
    presentation: "5 mg/mL - Ampolas de 3 ou 10 mL.",
    doses: [
      {
        type: "Infusão Contínua (IC)",
        value:
          "0,1 - 0,4 mg/kg/h (ou 3 - 10 µg/kg/min após dose de ataque de 0,2 mg/kg).",
      },
      { type: "Bolus/Procedimento (EV/IM)", value: "0,05 - 0,4 mg/kg." },
      { type: "Bolus/Procedimento (VN - Via Nasal)", value: "0,2 mg/kg." },
      {
        type: "Bolus/Procedimento (VR - Via Retal)",
        value: "0,3 - 1,0 mg/kg.",
      },
      {
        type: "Bolus/Procedimento (VO - Via Oral)",
        value: "0,5 - 1,0 mg/kg (dose máxima de 20 mg).",
      },
    ],
    dilutionAndPreparation: [
      '"Bizu" para 0,1 mg/kg/h = 1 mL/h ("Mida4"): Pegue o `peso` do paciente (em kg) em mL de Midazolam (5 mg/mL). Complete o volume total da solução para 50 mL com SF 0,9% (ou AD). O resultado será que cada 1 mL/h infundido equivalerá a 0,1 mg/kg/h.',
      "Cálculo do volume diário de Midazolam puro (mL): `(Peso (kg) x Dose (mg/kg/h) x 24 (h)) / 5 (mg/mL da ampola)` = Volume total de Midazolam puro em mL por dia.",
      "Outra diluição (1 mg/mL): 10 mL de Midazolam + 40 mL de AD = 50 mL de solução com 1 mg/mL. Correr 1 mL/h se a dose desejada for 1 mg/h (equivalente a 0,1 mg/kg/h para um paciente de 10 kg).",
    ],
    observations: [
      "Rápido início de ação, causa amnésia, ação anticonvulsivante.",
      "Pode reduzir a pressão arterial, devendo ser evitado em casos de choque.",
      "Sintomas de abstinência (similares aos do álcool) podem ocorrer se a dose cumulativa exceder 60 mg/kg; podem ser aliviados com Clonidina 3-5 µg/kg VO.",
      "A retirada deve ser lenta e gradual.",
      "Pode ser administrado puro em alguns contextos.",
    ],
    antidote: "Flumazenil.",
    whereToFindInfoLink: generateInfoLink("Midazolam"),
  },
  {
    id: "morfina",
    name: "Morfina",
    categories: ["Analgésico opioide"],
    presentation: "10 mg/mL.",
    doses: [{ type: "Infusão Contínua (IC)", value: "20 - 60 mcg/kg/h." }],
    antidote: "Naloxona.",
    whereToFindInfoLink: generateInfoLink("Morfina"),
  },
  {
    id: "cetamina",
    name: "Cetamina",
    categories: ["Anestésico dissociativo"],
    presentation: "50 mg/mL - Ampolas de 2 e 10 mL.",
    doses: [
      { type: "Infusão Contínua (IC)", value: "5 - 20 mcg/kg/min." },
      {
        type: "Bolus/Procedimento (EV)",
        value:
          "0,5 - 4 mg/kg (eventualmente até 6 mg/kg), administrada lentamente em 1 a 2 minutos, podendo ser repetida a cada 10 minutos. Em geral, 4 mg/kg é suficiente para indução anestésica.",
      },
      {
        type: "Bolus/Procedimento (IM)",
        value:
          "3 - 4 mg/kg, podendo ser repetida a cada 10 minutos (associar com atropina e midazolam).",
      },
      {
        type: "Bolus/Procedimento (VO)",
        value: "5 mg/kg (associar com atropina e midazolam).",
      },
    ],
    dilutionAndPreparation: [
      "Macete para volume (bolus EV): `Peso (kg) x 0,04 mL` (para dose de 2 mg/kg).",
      "Infusão Contínua:",
      "Diluição sugerida: Cetamina 6 mL + SF 0,9% 54 mL = 60 mL de solução com 5000 mcg/mL.",
      "Cálculo do volume diário (mL): `(Peso (kg) x Dose (mcg/kg/min) x 1440 (min/dia)) / 5000 (mcg/mL da solução diluída)` = Volume total da solução em mL por dia. (Note: A sua fórmula original usava 50000, mas com 6ml em 60ml de solução, a concentração é 5000 mcg/ml).",
    ],
    observations: [
      "Vantagens: Broncodilatador (útil em asma), aumenta frequência cardíaca e pressão arterial.",
      "Desvantagens/Contraindicações: Pode causar alucinações (associar com benzodiazepínico para reduzir chance), contraindicado em menores de 3 meses, pacientes com alterações psiquiátricas e em situações de aumento de PIC (Pressão Intracraniana).",
    ],
    whereToFindInfoLink: generateInfoLink("Cetamina"),
  },
  {
    id: "precedex",
    name: "Precedex (Dexmedetomidina)",
    categories: ["Sedativo alfa-2 agonista"],
    presentation: "100 mcg/mL - Ampola de 2 mL.",
    doses: [
      {
        type: "Infusão Contínua (IC)",
        value:
          "0,1 - 1,0 mcg/kg/h (usualmente inicia-se com 0,3 mcg/kg/h). Manutenção: 0,2 mcg/kg/h.",
      },
      { type: "Ataque (Push)", value: "0,5 mcg/kg em 20 minutos." },
      {
        type: "Bolus (para procedimentos)",
        value: "2 mcg/kg, diluído em 30 mL de SF 0,9%, infundir em 10 minutos.",
      },
    ],
    dilutionAndPreparation: [
      "Diluição Padrão (4 mcg/mL): 2 mL de Precedex (200 mcg) + 48 mL de SF 0,9% = 50 mL de solução com concentração final de 4 mcg/mL. Correr EV em BIC a 0,5 mL/h para dose de 0,5 mcg/kg/h (para um paciente de 4 kg).",
      "Cálculo do volume diário de Precedex puro (mL): `(Peso (kg) x Dose (mcg/kg/h) x 24 (h)) / 100 (mcg/mL da ampola)` = Volume total de Precedex puro em mL por dia.",
    ],
    observations: [
      "Para desmame (>5 dias de uso), reduzir 20%/dia e considerar associar Clonidina 5 mcg/kg/dia.",
    ],
    whereToFindInfoLink: generateInfoLink("Precedex"),
  },
  {
    id: "propofol",
    name: "Propofol",
    categories: ["Anestésico geral intravenoso", "Sedativo"],
    presentation: "10 mg/mL - Ampola de 20 mL.",
    doses: [
      {
        type: "Bolus/Procedimento (EV)",
        value:
          "1 - 2,5 mg/kg/dose (pode ser seguida de 0,5 mg/kg se necessário).",
      },
      { type: "Infusão Contínua (IC)", value: "5 - 10 mg/kg/hora." },
    ],
    dilutionAndPreparation: [
      'Bolus: Administrar puro (sem diluir). "P/10 mL EV agora" indica Peso/10 mL.',
      "Macete para volume (bolus EV): `Peso (kg) x 0,1 mL` (para dose de 1 mg/kg).",
    ],
    observations: [
      "Vantagens: Menor depressão cardíaca.",
      "Trocar equipo a cada 6 horas.",
    ],
    whereToFindInfoLink: generateInfoLink("Propofol"),
  },
  {
    id: "etomidato",
    name: "Etomidato",
    categories: ["Hipnótico"],
    doses: [
      {
        type: "Bolus/Procedimento (EV)",
        value: "0,1 - 0,3 mg/kg, repetir se necessário.",
      },
    ],
    whereToFindInfoLink: generateInfoLink("Etomidato"),
  },
  {
    id: "metadona",
    name: "Metadona",
    categories: ["Analgésico opioide"],
    doses: [
      {
        type: "Para crianças < 50 kg",
        value: "0,1 mg/kg, a cada 4 a 8 horas.",
      },
      {
        type: "Para pacientes > 50 kg",
        value: "5 a 10 mg, a cada 4 a 8 horas.",
      },
    ],
    whereToFindInfoLink: generateInfoLink("Metadona"),
  },
  {
    id: "diazepam",
    name: "Diazepam",
    categories: ["Benzodiazepínico", "Ansiolítico", "Anticonvulsivante"],
    doses: [
      {
        type: "EV",
        value:
          "0,05 a 0,1 mg/kg (rapidamente alivia ansiedade/apreensão, anticonvulsivante).",
      },
      {
        type: "VO",
        value:
          "2 a 3 vezes a dose EV (leva 30-90 minutos para efeito hipnótico).",
      },
    ],
    whereToFindInfoLink: generateInfoLink("Diazepam"),
  },
  {
    id: "lorazepam",
    name: "Lorazepam",
    categories: ["Benzodiazepínico"],
    doses: [
      { type: "EV", value: "0,05 a 0,1 mg/kg (dose máxima de 2 mg)." },
      { type: "VO", value: "2 vezes a dose EV." },
    ],
    whereToFindInfoLink: generateInfoLink("Lorazepam"),
  },

  // II. Aminas Vasoativas e Inotrópicos
  {
    id: "adrenalina",
    name: "Adrenalina (Epinefrina)",
    categories: ["Amina vasoativa", "Inotrópico", "Vasopressor"],
    presentation: "1 mg/mL (= 1000 mcg/mL) - Ampola de 1 mL.",
    doses: [
      {
        type: "Infusão Contínua (IC) - Dose Beta",
        value: "0,05 - 0,3 mcg/kg/min.",
      },
      {
        type: "Infusão Contínua (IC) - Dose Alfa",
        value: "Acima de 0,3 mcg/kg/min (até 1,0 mcg/kg/min).",
      },
    ],
    dilutionAndPreparation: [
      "Diluição sugerida (100 mcg/mL): 5 mL de Adrenalina + 45 mL de SF 0,9% = 50 mL de solução com 100 mcg/mL. Correr EV em BIC a 2-10 mL/h.",
      "Cálculo do volume diário de Adrenalina puro (mL): `(Peso (kg) x Dose (mcg/kg/min) x 1,44)` = Volume total de Adrenalina puro em mL por dia (onde 1,44 é um fator de conversão para mcg/min para mL/dia, considerando uma concentração de 1 mg/mL).",
    ],
    observations: ["Corre em equipo fotossensível."],
    whereToFindInfoLink: generateInfoLink("Adrenalina"),
  },
  {
    id: "noradrenalina",
    name: "Noradrenalina (Norepinefrina)",
    categories: ["Amina vasoativa", "Vasopressor potente"],
    presentation: "1 mg/mL (= 1000 mcg/mL) - Ampola de 4 mL.",
    doses: [
      {
        type: "Infusão Contínua (IC)",
        value:
          "0,05 - 2 mcg/kg/min (alguns protocolos focam em 0,1 - 0,4 mcg/kg/min, podendo estender até 1 mcg/kg/min).",
      },
    ],
    dilutionAndPreparation: [
      "Diluição sugerida (20 mcg/mL): 2 mL de Noradrenalina + 98 mL de SG 5% = 100 mL de solução com 20 mcg/mL. Correr EV a 10 mL/h em BIC.",
      "Cálculo do volume diário de Noradrenalina puro (mL): `(Peso (kg) x Dose (mcg/kg/min) x 1,44)` = Volume total de Noradrenalina puro em mL por dia.",
    ],
    observations: [
      "A concentração máxima para infusão periférica é de 16 mcg/mL.",
    ],
    whereToFindInfoLink: generateInfoLink("Noradrenalina"),
  },
  {
    id: "dobutamina",
    name: "Dobutamina",
    categories: ["Inotrópico"],
    presentation: "12,5 mg/mL (= 12500 mcg/mL) - Ampola de 20 mL.",
    doses: [
      {
        type: "Infusão Contínua (IC)",
        value: "5 - 20 mcg/kg/min (Dose Beta).",
      },
    ],
    dilutionAndPreparation: [
      "Diluição sugerida (2500 mcg/mL): 20 mL de Dobutamina + 80 mL de SF 0,9% = 100 mL de solução com 2500 mcg/mL. Correr EV a 5 mL/h em BIC.",
      "Cálculo do volume diário de Dobutamina puro (mL): `(Peso (kg) x Dose (mcg/kg/min) x 1,44) / 12,5 (mg/mL da ampola)` = Volume total de Dobutamina puro em mL por dia.",
    ],
    whereToFindInfoLink: generateInfoLink("Dobutamina"),
  },
  {
    id: "milrinona",
    name: "Milrinona",
    categories: ["Inotrópico", "Vasodilatador"],
    presentation: "1 mg/mL (= 1000 mcg/mL) - Ampola de 10 mL.",
    doses: [{ type: "Infusão Contínua (IC)", value: "0,3 - 1 mcg/kg/min." }],
    dilutionAndPreparation: [
      "Diluição sugerida (100 mcg/mL): 20 mL de Milrinona + 180 mL de SF 0,9% = 200 mL de solução com 100 mcg/mL. Correr EV em BIC a 0,2 mL/h (para dose de 0,5 mcg/kg/min para um paciente de 20 kg).",
      "Cálculo do volume diário de Milrinona puro (mL): `(Peso (kg) x Dose (mcg/kg/min) x 1440 (min/dia)) / 1000 (mcg/mL da ampola)` = Volume total de Milrinona puro em mL por dia.",
    ],
    whereToFindInfoLink: generateInfoLink("Milrinona"),
  },
  {
    id: "vasopressina",
    name: "Vasopressina",
    categories: ["Vasopressor", "Hormônio antidiurético"],
    presentation: "20 U/mL - Ampola de 1 mL.",
    doses: [
      {
        type: "Infusão Contínua (IC)",
        value: "0,01 - 0,48 U/kg/h (ou 0,02 - 0,06 UI/kg/h).",
      },
    ],
    dilutionAndPreparation: [
      "Diluição sugerida (0,71 UI/mL): 2 mL de Vasopressina + 54 mL de SF 0,9% = 56 mL de solução com 0,71 UI/mL. Correr EV em BIC a X mL/h (Dose: 0,04 UI/kg/h = 1 mL/h para um paciente de 17.75 kg, usando a concentração diluída).",
      "Diluição Padrão para UTI: 1 mL de Vasopressina + 100 mL ou 200 mL de SF 0,9%.",
      "Cálculo do volume diário de Vasopressina puro (mL): `(Peso (kg) x Dose (UI/kg/h) x 24 (h)) / 20 (UI/mL da ampola)` = Volume total de Vasopressina puro em mL por dia.",
    ],
    whereToFindInfoLink: generateInfoLink("Vasopressina"),
  },
  {
    id: "salbutamol",
    name: "Salbutamol",
    categories: ["Broncodilatador beta-2 agonista"],
    presentation: "0,5 mg/mL.",
    doses: [{ type: "Infusão Contínua (IC)", value: "0,1 - 1 mcg/kg/min." }],
    dilutionAndPreparation: [
      '"Bizu" para 0,1 mcg/kg/min = 1 mL/h: `Peso (kg)` x 1,2 = volume de Salbutamol em mL (Apresentação: 0,5 mg/mL). Complete o volume total da solução para 100 mL de SF 0,9%. O resultado será que cada 1 mL/h infundido equivalerá a 0,1 mcg/kg/min.',
    ],
    whereToFindInfoLink: generateInfoLink("Salbutamol"),
  },

  // III. Bloqueadores Neuromusculares (BNM)
  {
    id: "rocuronio",
    name: "Rocurônio",
    categories: ["Bloqueador neuromuscular não despolarizante"],
    presentation: "10 mg/mL.",
    doses: [
      { type: "Bolus/Procedimento (EV)", value: "0,6 - 1,2 mg/kg/dose." },
      { type: "Infusão Contínua (IC)", value: "6 - 10 mcg/kg/min." },
    ],
    dilutionAndPreparation: [
      "Macete para volume (bolus EV): `Peso (kg) x 0,05 mL`.",
      "Macete Neonatologia: `Peso (kg) / 10 mL` (arredondar para baixo o volume).",
      "Infusão Contínua (diluição sugerida para IC): Rocurônio 20 mL + SF 0,9% 65 mL = Volume Total (VT): 85 mL. Correr IV a 1 mL/h (para 4 mcg/kg/min, se a concentração da solução for 10000 mcg/85 mL, aproximadamente 117.6 mcg/mL).",
      "Cálculo do volume diário de Rocurônio puro (mL): `(Peso (kg) x Dose (mcg/kg/min) x 1440 (min/dia)) / 10000 (mcg/mL da ampola)` = Volume total de Rocurônio puro em mL por dia.",
    ],
    antidote: "Sugamadex.",
    whereToFindInfoLink: generateInfoLink("Rocurônio"),
  },
  {
    id: "succinilcolina",
    name: "Succinilcolina",
    categories: ["Bloqueador neuromuscular despolarizante"],
    doses: [
      { type: "Bolus/Procedimento (EV)", value: "1 - 1,5 mg/kg." },
      { type: "Bolus/Procedimento (IM)", value: "2 - 3 mg/kg." },
    ],
    whereToFindInfoLink: generateInfoLink("Succinilcolina"),
  },

  // IV. Outros Medicamentos para Procedimentos e Emergências
  {
    id: "atropina",
    name: "Atropina",
    categories: ["Anticolinérgico"],
    presentation: "0,25 mg/mL ou 0,5 mg/mL.",
    doses: [
      {
        type: "Bolus/Procedimento (EV)",
        value: "0,02 mg/kg (dose máxima 1 mg).",
      },
    ],
    observations: ["Não precisa diluir."],
    whereToFindInfoLink: generateInfoLink("Atropina"),
  },
  {
    id: "lidocaina",
    name: "Lidocaína",
    categories: ["Anestésico local", "Antiarrítmico"],
    presentation: "2% SEM VASO (20 mg/mL) ou 10 mg/mL.",
    doses: [
      {
        type: "Bolus/Procedimento (EV)",
        value: "1 - 2 mg/kg/dose (dose máxima 200 mg).",
      },
    ],
    dilutionAndPreparation: [
      "Macete para volume: `Peso (kg) x 0,1 mL` (para dose de 1 mg/kg, se a apresentação for 10 mg/mL).",
    ],
    observations: [
      "Não precisa diluir.",
      "Pode ser repetida 3 vezes após 3-5 minutos.",
      "Administrar 1 mg/kg EV antes das aspirações de tubo.",
      "Lavar acesso com 4 mL de AD após.",
      "Vantagens: Ação broncodilatadora, contribui para redução da PIC (Pressão Intracraniana).",
    ],
    whereToFindInfoLink: generateInfoLink("Lidocaína"),
  },
  {
    id: "alteplase",
    name: "Alteplase (r-TPA)",
    categories: ["Fibrinolítico"],
    presentation: "50 mg/mL - 1 frasco (em pó).",
    doses: [
      {
        type: "Intrapleural (para derrame parapneumônico complicado/empiema)",
        value: "0,1 mg/kg/dia 24/24h.",
      },
    ],
    dilutionAndPreparation: [
      "1 frasco de Alteplase (50 mg/mL) + Diluente próprio 50 mL.",
    ],
    observations: [
      "Administrar 1 mL via INTRAPLEURAL. Manter dreno fechado por 1 hora e reabrir após.",
      "D1/3 significa 1ª dose de 3.",
    ],
    whereToFindInfoLink: generateInfoLink("Alteplase"),
  },
  {
    id: "push-ketodex",
    name: "Push KETODEX",
    categories: ["Protocolo", "Sedativo", "Anestésico"],
    doses: [
      { type: "Administração", value: "Fazer 0,1 mL x Peso (kg) EV lento." },
    ],
    dilutionAndPreparation: [
      "Composição (exemplo de preparo):",
      "Cetamina 50 mg/mL: 2 mL",
      "Precedex 100 mcg/mL: 1 mL",
      "Água Destilada (AD): 7 mL",
      "Total: 10 mL de solução.",
    ],
    observations: [
      "Equivalência: Esta mistura fornece aproximadamente 1 mg/kg de Cetamina e 1 mcg/kg de Precedex (por 0,1 mL x Peso (kg)).",
    ],
    whereToFindInfoLink: generateInfoLink("KETODEX"),
  },
  {
    id: "naloxona",
    name: "Naloxona",
    categories: ["Antagonista opioide"],
    doses: [{ type: "Bolus (EV)", value: "0,1 mg/kg." }],
    observations: [
      "Usada para reverter depressão respiratória ou rigidez torácica induzida por opioides (ex: Fentanil).",
    ],
    whereToFindInfoLink: generateInfoLink("Naloxona"),
  },
  {
    id: "flumazenil",
    name: "Flumazenil",
    categories: ["Antagonista benzodiazepínico"],
    doses: [
      {
        type: "EV",
        value:
          "0,1 - 0,2 mL/kg (repetir a cada 2 minutos até o efeito desejado).",
      },
    ],
    observations: [
      "Usado para reverter efeitos sedativos e depressores respiratórios de benzodiazepínicos (ex: Midazolam).",
    ],
    whereToFindInfoLink: generateInfoLink("Flumazenil"),
  },
  {
    id: "sugamadex",
    name: "Sugamadex",
    categories: ["Reversor de bloqueadores neuromusculares"],
    doses: [],
    observations: ["Antagonista específico para Rocurônio."],
    whereToFindInfoLink: generateInfoLink("Sugamadex"),
  },
  {
    id: "clonidina",
    name: "Clonidina",
    categories: ["Alfa-2 agonista", "Sedação", "Desmame"],
    doses: [{ type: "VO", value: "4-6 mcg/kg/dose VO 6/6h." }],
    whereToFindInfoLink: generateInfoLink("Clonidina"),
  },

  // Suas entradas de Ampicilina e Gentamicina ajustadas
  {
    id: "ampicilina-neonatal",
    name: "Ampicilina (Neonatologia)",
    categories: ["Antibiótico", "Neonatologia"],
    presentation:
      "Pó para injeção em frascos de 125, 250, 500 mg, 1, 2 e 10 g.",
    doses: [
      {
        type: "Dose Geral",
        value:
          "25 a 50 mg/kg/dose IV/IM. Intervalo conforme IGCor (ver 'Intervalos de Dosagem').",
      },
      {
        type: "Antraz (IG 32-34 semanas)",
        value:
          "0-1 semana IPN: 50 mg/kg/dose IV a cada 12h; 1-4 semanas IPN: 50 mg/kg/dose IV a cada 8h.",
      },
      {
        type: "Antraz (IG ≥34 semanas)",
        value:
          "0-1 semana IPN: 50 mg/kg/dose IV a cada 8h; 1-4 semanas IPN: 50 mg/kg/dose IV a cada 6h.",
      },
      {
        type: "Bacteremia GBS (IG ≤34 semanas)",
        value:
          "≤7 dias IPN: 75 mg/kg/dose IV a cada 12h; >7 dias IPN: 50 mg/kg/dose IV a cada 12h.",
      },
      {
        type: "Bacteremia GBS (IG >34 semanas)",
        value:
          "≤7 dias IPN: 50 mg/kg/dose IV a cada 8h; >7 dias IPN: 50 mg/kg/dose IV a cada 8h.",
      },
      {
        type: "Meningite GBS (IPN ≤7 dias)",
        value: "100 mg/kg/dose IV a cada 8h.",
      },
      {
        type: "Meningite GBS (IPN >7 dias)",
        value: "75 mg/kg/dose IV a cada 6h.",
      },
      {
        type: "Sepse de Início Precoce (EOS)",
        value:
          "Ampicilina + Gentamicina (doses da Ampicilina conforme 'Dose Geral').",
      },
    ],
    dilutionAndPreparation: [
      "Reconstituir com água estéril para injeção.",
      "Concentração máxima para IV: 100 mg/mL.",
      "IM: Reconstituir para 250 mg/mL.",
      "Solução reconstituída deve ser usada em 1 hora devido à perda de potência.",
    ],
    observations: [
      "Uso: Amplo espectro (Group B Strep, Listeria monocytogenes, E. coli suscetíveis).",
      "Eliminação: Via renal. Clearance inversamente relacionado à idade pós-natal.",
      "**Intervalos de Dosagem (IGCor = Idade Gestacional + Idade Pós-natal):**",
      "-   **IGCor 0 a 28 semanas:**",
      "    -   Idade Pós-natal ≤29 dias: Intervalo de 12 horas.",
      "    -   Idade Pós-natal >28 dias: Intervalo de 8 horas.",
      "-   **IGCor 30 a 36 semanas:**",
      "    -   Idade Pós-natal 0 a 14 dias: Intervalo de 12 horas.",
      "    -   Idade Pós-natal >14 dias: Intervalo de 8 horas.",
      "-   **IGCor 37 a 44 semanas:**",
      "    -   Idade Pós-natal 0 a 7 dias: Intervalo de 12 horas.",
      "    -   Idade Pós-natal >7 dias: Intervalo de 8 horas.",
      "-   **IGCor ≥ 45 semanas:**",
      "    -   Para TODAS as Idades Pós-natais: Intervalo de 6 horas.",
      "Efeitos Adversos: SNC (excitação/convulsão em altas doses), prolongamento de tempo de sangramento, reações de hipersensibilidade (raras em neonatos).",
      "Administração IV: Doses ≤500 mg em 3-5 min; ≥1 g em ≥10-15 min.",
      "Incompatibilidade (Local de Injeção Terminal): Amicacina, Amiodarona, Dopamina, Epinefrina, Gentamicina, entre outros. (IMPORTANTE: Não administrar no mesmo acesso que Gentamicina).",
    ],
    whereToFindInfoLink: generateInfoLink("Ampicilina"),
  },
  {
    id: "gentamicina-neonatal",
    name: "Gentamicina (Neonatologia)",
    categories: ["Aminoglicosídeo", "Antibiótico", "Neonatologia"],
    presentation: "Solução injetável pediátrica 10 mg/mL.",
    doses: [
      {
        type: "Dose Intervalo Estendido",
        value: "5 mg/kg/dose IV a cada 36 horas (Prematuros e a termo).",
      },
      {
        type: "Dose Padrão (IGCor ≤29 semanas)",
        value:
          "0-7 dias IPN: 5 mg/kg a cada 48h; 8-28 dias IPN: 4 mg/kg a cada 24h. (*IGCor inclui casos de asfixia significativa, PCA, ou tratamento com indometacina*)",
      },
      {
        type: "Dose Padrão (IGCor 30-34 semanas)",
        value:
          "0-7 dias IPN: 4.5 mg/kg a cada 36h; ≥8 dias IPN: 4 mg/kg a cada 24h.",
      },
      {
        type: "Dose Padrão (IGCor ≥35 semanas)",
        value: "TODOS IPN: 4 mg/kg a cada 24h.",
      },
    ],
    dilutionAndPreparation: [
      "Infusão: 30 a 120 minutos.",
      "Concentração de infusão: 2 mg/mL ou 10 mg/mL.",
      "IMPORTANTE: Administrar SEPARADAMENTE de compostos com penicilina (como Ampicilina).",
    ],
    observations: [
      "Uso: Infecções por bacilos Gram-negativos aeróbios (Pseudomonas, Klebsiella, E. coli), geralmente em combinação com β-lactâmico.",
      "KIDs List: Evitar pomada oftálmica em neonatos (risco de reações oculares graves).",
      "Ajuste de Dosagem: Hipotermia pode reduzir clearance (necessita intervalos maiores, monitoramento rigoroso).",
      "**Dosagem Padrão (IGCor = Idade Gestacional + Idade Pós-natal):**",
      "-   **IGCor ≤ 29 semanas:** (*inclui casos de asfixia significativa, persistência do canal arterial (PCA), ou tratamento com indometacina*)",
      "    -   Idade Pós-natal 0 a 7 dias: Dose de 5 mg/kg com Intervalo de 48 horas.",
      "    -   Idade Pós-natal 8 a 28 dias: Dose de 4 mg/kg com Intervalo de 24 horas.",
      "-   **IGCor 30 a 34 semanas:**",
      "    -   Idade Pós-natal 0 a 7 dias: Dose de 4.5 mg/kg com Intervalo de 36 horas.",
      "    -   Idade Pós-natal ≥ 8 dias: Dose de 4 mg/kg com Intervalo de 24 horas.",
      "-   **IGCor ≥ 35 semanas:**",
      "    -   Para TODAS as Idades Pós-natais: Dose de 4 mg/kg com Intervalo de 24 horas.",
      "Efeitos Adversos: Disfunção tubular renal reversível, Ototoxicidade (vestibular/auditiva, geralmente irreversível), aumento do bloqueio neuromuscular. Evitar uso com outros nefrotóxicos/ototóxicos.",
      "Black Box Warning: Risco de neurotoxicidade, ototoxicidade e nefrotoxicidade. Risco maior em disfunção renal, desidratação, altas doses/terapia prolongada. Monitorar e ajustar dose/descontinuar se houver sinais.",
      "Incompatibilidade (Local de Injeção Terminal): Anfotericina B, Ampicilina, Azitromicina, Furosemida, Heparina (>1 U/mL), Indometacina, entre outros. (IMPORTANTE: Não administrar no mesmo acesso que Ampicilina).",
      "Monitoramento: Medir níveis séricos (Pico: 30 min após fim infusão; Vale: imediatamente antes da próxima dose) se tratamento >48h.",
      "Valores Terapêuticos: Pico ≥5 mg/L (8-13 mg/L para intervalo estendido); Vale ≤2 mg/L (sugere-se <1 mg/L).",
      "**Ajuste de Intervalo Pós-Dose (5 mg/kg) - Concentração às 22h:**",
      "-   ≤1.2 mg/L: Sugere-se Intervalo de 24 horas.",
      "-   1.3-2.6 mg/L: Sugere-se Intervalo de 36 horas.",
      "-   2.7-3.5 mg/L: Sugere-se Intervalo de 48 horas.",
      "-   ≥3.6 mg/L: Suspender dose, medir concentração novamente em 24 horas.",
      "**Ajuste de Intervalo Pós-Dose - Concentração às 24h:**",
      "-   ≤1 mg/L: Sugere-se Intervalo de 24 horas.",
      "-   1.1-2.3 mg/L: Sugere-se Intervalo de 36 horas.",
      "-   2.4-3.2 mg/L: Sugere-se Intervalo de 48 horas.",
      "-   ≥3.3 mg/L: Medir nível em 24 horas.",
    ],
    whereToFindInfoLink: generateInfoLink("Gentamicina"),
  },
];
