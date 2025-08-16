"use client";

import { useState, useEffect } from "react";
import { Calculator, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// Tipos e interfaces
type MedicationCategory = "sedoanalgesia" | "vasoativa";

interface Medication {
  name: string;
  doseRange: string;
  presentations: Presentation[];
  calculationTime: number;
  doseModel: string;
  pharmacodynamics: string;
  adverseEffects: string;
  observations: string;
}

interface Presentation {
  label: string;
  value: number; // em mcg/mL ou mg/mL
}

// Dados dos medicamentos
const medicationsData: Record<MedicationCategory, Medication[]> = {
  sedoanalgesia: [
    {
      name: "Fentanil",
      doseRange: "0,5 - 5 mcg/kg/h",
      presentations: [
        { label: "Fentanil 50 mcg/mL (ampola 5 mL = 250 mcg)", value: 50 },
        { label: "Fentanil 250 mcg/5 mL (ampola 5 mL = 250 mcg)", value: 50 },
      ],
      calculationTime: 24,
      doseModel: "mcg/kg/h",
      pharmacodynamics:
        "Opioide sintético de alta potência e curta duração de ação.",
      adverseEffects:
        "Depressão respiratória, bradicardia, rigidez muscular, náuseas.",
      observations:
        "Monitorar frequência respiratória e saturação de oxigênio continuamente.",
    },
    {
      name: "Midazolam",
      doseRange: "0,05 - 1 mg/kg/h",
      presentations: [
        { label: "Midazolam 5 mg/mL (ampola 3 mL = 15 mg)", value: 5 },
        { label: "Midazolam 15 mg/3 mL (ampola 3 mL = 15 mg)", value: 5 },
      ],
      calculationTime: 24,
      doseModel: "mg/kg/h",
      pharmacodynamics:
        "Benzodiazepínico de ação rápida com propriedades ansiolíticas, sedativas e amnésicas.",
      adverseEffects:
        "Depressão respiratória, hipotensão, paradoxal excitação.",
      observations:
        "Reduzir dose em idosos e pacientes com disfunção hepática.",
    },
    {
      name: "Cetamina",
      doseRange: "5 - 20 mcg/kg/min",
      presentations: [
        { label: "Cetamina 50 mg/mL (ampola 10 mL = 500 mg)", value: 50000 },
        {
          label: "Cetamina 500 mg/10 mL (ampola 10 mL = 500 mg)",
          value: 50000,
        },
      ],
      calculationTime: 1440,
      doseModel: "mcg/kg/min",
      pharmacodynamics:
        "Anestésico dissociativo com propriedades analgésicas e simpatomiméticas.",
      adverseEffects:
        "Hipertensão, taquicardia, alucinações, aumento de secreções.",
      observations:
        "Evitar em pacientes com hipertensão intracraniana ou glaucoma.",
    },
    {
      name: "Precedex",
      doseRange: "0,2 - 1,5 mcg/kg/h",
      presentations: [
        { label: "Precedex 100 mcg/mL (ampola 2 mL = 200 mcg)", value: 100 },
        { label: "Precedex 200 mcg/2 mL (ampola 2 mL = 200 mcg)", value: 100 },
      ],
      calculationTime: 24,
      doseModel: "mcg/kg/h",
      pharmacodynamics:
        "Agonista alfa-2 adrenérgico com propriedades sedativas e analgésicas.",
      adverseEffects: "Bradicardia, hipotensão, xerostomia.",
      observations: "Não requer ajuste em insuficiência renal ou hepática.",
    },
  ],
  vasoativa: [
    {
      name: "Adrenalina",
      doseRange: "0,01 - 2 mcg/kg/min",
      presentations: [
        { label: "Adrenalina 1 mg/mL (ampola 1 mL = 1 mg)", value: 1000 },
        { label: "Adrenalina 1 mg/1 mL (ampola 1 mL = 1 mg)", value: 1000 },
      ],
      calculationTime: 1440,
      doseModel: "mcg/kg/min",
      pharmacodynamics:
        "Agonista alfa e beta adrenérgico com efeitos vasoconstritores e inotrópicos positivos.",
      adverseEffects:
        "Taquicardia, hipertensão, arritmias, isquemia miocárdica.",
      observations: "Monitorar ECG e pressão arterial continuamente.",
    },
    {
      name: "Noradrenalina",
      doseRange: "0,01 - 2 mcg/kg/min",
      presentations: [
        { label: "Noradrenalina 1 mg/mL (ampola 4 mL = 4 mg)", value: 1000 },
        { label: "Noradrenalina 4 mg/4 mL (ampola 4 mL = 4 mg)", value: 1000 },
      ],
      calculationTime: 1440,
      doseModel: "mcg/kg/min",
      pharmacodynamics:
        "Agonista alfa adrenérgico predominante com potentes efeitos vasoconstritores.",
      adverseEffects: "Hipotensão reflexa, bradicardia, isquemia periférica.",
      observations: "Administrar preferencialmente em acesso central.",
    },
    {
      name: "Dobutamina",
      doseRange: "2 - 20 mcg/kg/min",
      presentations: [
        {
          label: "Dobutamina 12,5 mg/mL (ampola 20 mL = 250 mg)",
          value: 12500,
        },
        { label: "Dobutamina 1 g/20 mL (ampola 20 mL = 1 g)", value: 12500 },
      ],
      calculationTime: 1440,
      doseModel: "mcg/kg/min",
      pharmacodynamics:
        "Agonista beta-1 adrenérgico com efeitos inotrópicos positivos e cronotrópicos moderados.",
      adverseEffects: "Taquicardia, arritmias, hipotensão (em altas doses).",
      observations:
        "Monitorizar pressão arterial e frequência cardíaca continuamente.",
    },
  ],
};

export default function MedicationCalculator() {
  const [category, setCategory] = useState<MedicationCategory | null>(null);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [presentation, setPresentation] = useState<string>("");
  const [dose, setDose] = useState<string>("");
  const [sliderDose, setSliderDose] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<string>("1");
  const [flowRate, setFlowRate] = useState<string>("1");
  const [showResults, setShowResults] = useState<boolean>(false);

  // Reset states when category changes
  useEffect(() => {
    setSelectedMed(null);
    setWeight("");
    setPresentation("");
    setDose("");
    setSliderDose(0);
    setMultiplier("1");
    setFlowRate("1");
    setShowResults(false);
  }, [category]);

  // Reset dose-related states when medication changes
  useEffect(() => {
    setDose("");
    setSliderDose(0);
    setMultiplier("1");
    setFlowRate("1");
    setShowResults(false);
  }, [selectedMed]);

  // Parse dose range for slider
  const getDoseRange = () => {
    if (!selectedMed) return { min: 0, max: 10 };

    const range = selectedMed.doseRange.match(/(\d+[,.]?\d*)/g);
    if (!range || range.length < 2) return { min: 0, max: 10 };

    const min = parseFloat(range[0].replace(",", "."));
    const max = parseFloat(range[1].replace(",", "."));

    return { min, max };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    setShowResults(true);
  };

  const validateInputs = () => {
    if (!weight || isNaN(parseFloat(weight.replace(",", ".")))) return false;
    if (!presentation) return false;
    if (!dose && sliderDose === 0) return false;
    return true;
  };

  const calculateResults = () => {
    if (!validateInputs() || !selectedMed) return null;

    const weightNum = parseFloat(weight.replace(",", "."));
    const doseNum = dose ? parseFloat(dose.replace(",", ".")) : sliderDose;
    const presentationNum = parseFloat(presentation);
    const multiplierNum = parseInt(multiplier);
    const flowRateNum = parseFloat(flowRate.replace(",", "."));

    // Dose para o paciente
    const patientDose = weightNum * doseNum;

    // Volume da droga para 24h
    const volume24h =
      (patientDose * selectedMed.calculationTime) / presentationNum;

    // Volume total desejado
    const totalVolume = 24 * multiplierNum;

    // Dose por mL da solução (cálculo reverso)
    const dosePerMl = (volume24h * presentationNum) / totalVolume;

    // Dose sendo feita no paciente em 1h
    const currentDosePerHour = (dosePerMl * flowRateNum) / weightNum;

    // Dose por minuto (apenas se calculationTime for 1440)
    const dosePerMinute =
      selectedMed.calculationTime === 1440 ? currentDosePerHour / 60 : null;

    return {
      patientDose,
      volume24h,
      totalVolume,
      dosePerMl,
      currentDosePerHour,
      dosePerMinute,
    };
  };

  const results = calculateResults();

  const presentationOptions = selectedMed
    ? selectedMed.presentations.map((pres) => ({
        value: pres.value.toString(),
        label: pres.label,
      }))
    : [];

  const multiplierOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
    value: num.toString(),
    label: num.toString(),
  }));

  const doseRange = getDoseRange();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Calculator className="text-blue-500" /> Cálculo de Drogas
            Vasoativas e Sedoanalgesia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className={`cursor-pointer transition-all ${
                category === "sedoanalgesia"
                  ? "border-2 border-blue-500 bg-blue-50"
                  : ""
              }`}
              onClick={() => setCategory("sedoanalgesia")}
            >
              <CardHeader>
                <CardTitle className="text-xl">Sedoanalgesia</CardTitle>
                <CardDescription>
                  Fentanil, Midazolam, Cetamina, Precedex
                </CardDescription>
              </CardHeader>
            </Card>
            <Card
              className={`cursor-pointer transition-all ${
                category === "vasoativa"
                  ? "border-2 border-blue-500 bg-blue-50"
                  : ""
              }`}
              onClick={() => setCategory("vasoativa")}
            >
              <CardHeader>
                <CardTitle className="text-xl">Drogas Vasoativas</CardTitle>
                <CardDescription>
                  Adrenalina, Noradrenalina, Dobutamina
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>

      {category && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Selecione o medicamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {medicationsData[category].map((med) => (
                <Card
                  key={med.name}
                  className={`cursor-pointer transition-all ${
                    selectedMed?.name === med.name
                      ? "border-2 border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedMed(med)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{med.name}</CardTitle>
                    <CardDescription>{med.doseRange}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMed && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{selectedMed.name}</CardTitle>
            <CardDescription>
              <div className="flex flex-wrap gap-4">
                <span>
                  <span className="font-medium">Dose range:</span>{" "}
                  {selectedMed.doseRange}
                </span>
                <span>
                  <span className="font-medium">Modelo dose:</span>{" "}
                  {selectedMed.doseModel}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight">
                    Peso do paciente (kg){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="weight"
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ex: 70"
                  />
                </div>

                <div>
                  <Label>
                    Apresentação da medicação{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={presentation}
                    onValueChange={setPresentation}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a apresentação" />
                    </SelectTrigger>
                    <SelectContent>
                      {presentationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="dose">
                    Dose desejada ({selectedMed.doseModel.split("/")[0]})
                  </Label>
                  <Input
                    id="dose"
                    type="text"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    placeholder={`Ex: ${selectedMed.doseRange.split(" - ")[0]}`}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Ou use o controle deslizante ({selectedMed.doseRange})
                  </p>
                </div>

                <div>
                  <Label>Selecione a dose</Label>
                  <div className="px-2">
                    <Slider
                      min={doseRange.min}
                      max={doseRange.max}
                      step={0.01}
                      value={[sliderDose]}
                      onValueChange={([value]) => setSliderDose(value)}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{doseRange.min}</span>
                      <span className="font-medium">
                        {sliderDose.toFixed(2)}
                      </span>
                      <span>{doseRange.max}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={handleCalculate}
              disabled={!validateInputs()}
              className="px-6 py-3"
            >
              Calcular
            </Button>
          </CardFooter>
        </Card>
      )}

      {showResults && results && selectedMed && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resultados do Cálculo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cálculo básico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-1">
                    Peso × Dose = Dose para o paciente
                  </p>
                  <p className="text-lg font-semibold">
                    {parseFloat(weight.replace(",", "."))} kg ×{" "}
                    {dose || sliderDose} {selectedMed.doseModel.split("/")[0]} ={" "}
                    {results.patientDose.toFixed(2)}{" "}
                    {selectedMed.doseModel.split("/")[0]}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Volume para 24h</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-1">
                    (Dose para o paciente × Tempo para cálculo) / Dose
                    apresentação
                  </p>
                  <p className="text-lg font-semibold">
                    ({results.patientDose.toFixed(2)} ×{" "}
                    {selectedMed.calculationTime}) / {presentation} ={" "}
                    {results.volume24h.toFixed(2)} mL
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-32">
                  <Label>Multiplicador</Label>
                  <Select
                    value={multiplier}
                    onValueChange={setMultiplier}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      {multiplierOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Volume total desejado</Label>
                  <p className="text-lg font-semibold">
                    24 × {multiplier} = {results.totalVolume} mL
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-8">
              <h3 className="font-semibold mb-4">
                Cálculo reverso - Conferência
              </h3>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Dose por mL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-1">
                    (Volume da droga para 24h × Dose apresentação) / Volume
                    total desejado
                  </p>
                  <p className="text-lg font-semibold">
                    ({results.volume24h.toFixed(2)} × {presentation}) /{" "}
                    {results.totalVolume} = {results.dosePerMl.toFixed(4)}{" "}
                    {selectedMed.doseModel.split("/")[0]}/mL
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="flowRate">Vazão (mL/h)</Label>
                  <Input
                    id="flowRate"
                    type="text"
                    value={flowRate}
                    onChange={(e) => setFlowRate(e.target.value)}
                    placeholder="Ex: 1"
                  />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Dose sendo infundida
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-1">
                      (Dose por mL da solução × Vazão) / Peso
                    </p>
                    <p className="text-lg font-semibold">
                      ({results.dosePerMl.toFixed(4)} × {flowRate}) /{" "}
                      {parseFloat(weight.replace(",", "."))} ={" "}
                      {results.currentDosePerHour.toFixed(4)}{" "}
                      {selectedMed.doseModel}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {selectedMed.calculationTime === 1440 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Conversão para dose por minuto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-1">
                      Dose sendo feita no paciente em 1h / 60
                    </p>
                    <p className="text-lg font-semibold">
                      {results.currentDosePerHour.toFixed(4)} / 60 ={" "}
                      {results.dosePerMinute?.toFixed(6)}{" "}
                      {selectedMed.doseModel.replace("h", "min")}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMed && (
        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="medication-info">
            <AccordionTrigger className="text-lg">
              <div className="flex items-center gap-2">
                <Info size={18} />
                Informações sobre {selectedMed.name}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Farmacodinâmica</h4>
                  <p className="text-sm">{selectedMed.pharmacodynamics}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Efeitos adversos</h4>
                  <p className="text-sm">{selectedMed.adverseEffects}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Observações</h4>
                <p className="text-sm">{selectedMed.observations}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Accordion type="single" collapsible>
        <AccordionItem value="calculations-explanation">
          <AccordionTrigger className="text-lg">
            <div className="flex items-center gap-2">
              <Info size={18} />
              Explicação dos Cálculos
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Dose para o paciente</h4>
                <p className="text-sm">
                  Peso do paciente (kg) multiplicado pela dose desejada
                  (mcg/kg/h ou mg/kg/h).
                </p>
                <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                  Peso × Dose = Dose para o paciente
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">
                  2. Volume da droga para 24h
                </h4>
                <p className="text-sm">
                  Dose para o paciente multiplicada pelo tempo para cálculo (60
                  minutos para sedoanalgesia, 1440 minutos para vasoativas)
                  dividido pela concentração da apresentação selecionada.
                </p>
                <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                  (Dose para o paciente × Tempo para cálculo) / Dose
                  apresentação = Volume da droga para 24h
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">3. Volume total desejado</h4>
                <p className="text-sm">
                  24 horas multiplicadas pelo fator de diluição escolhido (1 a
                  10).
                </p>
                <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                  24 × Multiplicador = Volume total desejado
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">
                  4. Cálculo reverso - Dose por mL
                </h4>
                <p className="text-sm">
                  Volume da droga para 24h multiplicado pela concentração da
                  apresentação, dividido pelo volume total desejado.
                </p>
                <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                  (Volume da droga para 24h × Dose apresentação) / Volume total
                  desejado = Dose por mL
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">5. Dose sendo infundida</h4>
                <p className="text-sm">
                  Dose por mL da solução multiplicada pela vazão (mL/h),
                  dividida pelo peso do paciente.
                </p>
                <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                  (Dose por mL × Vazão) / Peso = Dose sendo infundida
                </p>
              </div>

              {selectedMed?.calculationTime === 1440 && (
                <div>
                  <h4 className="font-medium mb-2">
                    6. Conversão para dose por minuto
                  </h4>
                  <p className="text-sm">
                    Para drogas vasoativas (cálculo em 1440 minutos), a dose por
                    hora é dividida por 60 para obter a dose por minuto.
                  </p>
                  <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                    Dose por hora / 60 = Dose por minuto
                  </p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
