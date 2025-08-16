"use client";

import { useState } from "react";
import { Calculator, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function CalculadoraGasometria() {
  const [tipoGasometria, setTipoGasometria] = useState<"arterial" | "venosa">(
    "arterial"
  );
  const [pH, setPH] = useState<string>("");
  const [pCO2, setPCO2] = useState<string>("");
  const [pO2, setPO2] = useState<string>("");
  const [HCO3, setHCO3] = useState<string>("");
  const [BE, setBE] = useState<string>("");
  const [lactato, setLactato] = useState<string>("");
  const [Na, setNa] = useState<string>("");
  const [K, setK] = useState<string>("");
  const [Cl, setCl] = useState<string>("");
  const [glicose, setGlicose] = useState<string>("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const calcularResultados = () => {
    if (!validarEntradas()) return null;

    const pHNum = parseFloat(pH.replace(",", "."));
    const pCO2Num = parseFloat(pCO2.replace(",", "."));
    const HCO3Num = parseFloat(HCO3.replace(",", "."));
    const NaNum = parseFloat(Na.replace(",", "."));
    const ClNum = parseFloat(Cl.replace(",", "."));
    const KNum = parseFloat(K.replace(",", "."));
    const glicoseNum = parseFloat(glicose.replace(",", ".")) || 100; // Valor padrão se não informado

    // Determinar distúrbio ácido-base
    let tipoDisturbio: string = "";
    let componenteRespiratorio: string = "";
    let componenteMetabolico: string = "";

    // Valores normais de referência
    const pHNormal = tipoGasometria === "arterial" ? 7.35 : 7.32;
    const pCO2Normal = tipoGasometria === "arterial" ? 40 : 45;
    const HCO3Normal = 24;

    // Determinar distúrbio primário
    if (pHNum < pHNormal) {
      // Acidose
      if (pCO2Num > pCO2Normal) {
        componenteRespiratorio = "respiratório";
      }
      if (HCO3Num < HCO3Normal) {
        componenteMetabolico = "metabólico";
      }

      // Determinar se misto ou simples
      if (componenteRespiratorio && componenteMetabolico) {
        tipoDisturbio = "acidose mista";
      } else if (componenteRespiratorio) {
        tipoDisturbio = "acidose respiratória";
      } else if (componenteMetabolico) {
        tipoDisturbio = "acidose metabólica";
      }
    } else if (pHNum > pHNormal) {
      // Alcalose
      if (pCO2Num < pCO2Normal) {
        componenteRespiratorio = "respiratório";
      }
      if (HCO3Num > HCO3Normal) {
        componenteMetabolico = "metabólico";
      }

      // Determinar se misto ou simples
      if (componenteRespiratorio && componenteMetabolico) {
        tipoDisturbio = "alcalose mista";
      } else if (componenteRespiratorio) {
        tipoDisturbio = "alcalose respiratória";
      } else if (componenteMetabolico) {
        tipoDisturbio = "alcalose metabólica";
      }
    } else {
      tipoDisturbio = "normal";
    }

    // Cálculos baseados no tipo de distúrbio
    let pCO2Esperado = 0;
    let anionGap = 0;
    let NaCorrigido = 0;
    let KCorrigido = 0;
    let compensacao = "";

    // Eletrólitos corrigidos
    NaCorrigido = NaNum + 0.016 * (glicoseNum - 100); // Correção para glicose
    KCorrigido = KNum + 0.6 * (pHNum - 7.4); // Correção para pH

    if (tipoDisturbio.includes("acidose metabólica")) {
      pCO2Esperado = 1.5 * HCO3Num + 8;
      anionGap = NaNum - (ClNum + HCO3Num);
      compensacao =
        Math.abs(pCO2Num - pCO2Esperado) <= 2 ? "compensado" : "não compensado";
    } else if (tipoDisturbio.includes("alcalose metabólica")) {
      pCO2Esperado = HCO3Num + 15;
      compensacao =
        Math.abs(pCO2Num - pCO2Esperado) <= 2 ? "compensado" : "não compensado";
    } else if (tipoDisturbio.includes("acidose respiratória")) {
      const diferencaPCO2 = pCO2Num - pCO2Normal;
      const HCO3Esperado = HCO3Normal + diferencaPCO2 / 10;
      compensacao =
        Math.abs(HCO3Num - HCO3Esperado) <= 1 ? "compensado" : "não compensado";
    } else if (tipoDisturbio.includes("alcalose respiratória")) {
      const diferencaPCO2 = pCO2Normal - pCO2Num;
      const HCO3Esperado = HCO3Normal - diferencaPCO2 / 10;
      compensacao =
        Math.abs(HCO3Num - HCO3Esperado) <= 1 ? "compensado" : "não compensado";
    }

    return {
      tipoDisturbio,
      pCO2Esperado,
      anionGap,
      NaCorrigido,
      KCorrigido,
      compensacao,
      pHNormal,
      pCO2Normal,
      HCO3Normal,
    };
  };

  const validarEntradas = () => {
    // Validação básica dos campos obrigatórios
    if (!pH || isNaN(parseFloat(pH.replace(",", ".")))) return false;
    if (!pCO2 || isNaN(parseFloat(pCO2.replace(",", ".")))) return false;
    if (!HCO3 || isNaN(parseFloat(HCO3.replace(",", ".")))) return false;
    return true;
  };

  const handleCalcular = () => {
    if (!validarEntradas()) return;
    setMostrarResultados(true);
  };

  const resultados = calcularResultados();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Calculator className="text-blue-500" /> Calculadora de Gasometria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>Tipo de Gasometria</Label>
              <Select
                value={tipoGasometria}
                onValueChange={(value: "arterial" | "venosa") =>
                  setTipoGasometria(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arterial">Arterial</SelectItem>
                  <SelectItem value="venosa">Venosa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="pH">pH</Label>
              <Input
                id="pH"
                type="text"
                value={pH}
                onChange={(e) => setPH(e.target.value)}
                placeholder={
                  tipoGasometria === "arterial" ? "7.35-7.45" : "7.32-7.42"
                }
              />
            </div>
            <div>
              <Label htmlFor="pCO2">pCO2 (mmHg)</Label>
              <Input
                id="pCO2"
                type="text"
                value={pCO2}
                onChange={(e) => setPCO2(e.target.value)}
                placeholder={tipoGasometria === "arterial" ? "35-45" : "40-50"}
              />
            </div>
            <div>
              <Label htmlFor="pO2">pO2 (mmHg)</Label>
              <Input
                id="pO2"
                type="text"
                value={pO2}
                onChange={(e) => setPO2(e.target.value)}
                placeholder={tipoGasometria === "arterial" ? "80-100" : "30-50"}
              />
            </div>
            <div>
              <Label htmlFor="HCO3">HCO3 (mEq/L)</Label>
              <Input
                id="HCO3"
                type="text"
                value={HCO3}
                onChange={(e) => setHCO3(e.target.value)}
                placeholder="22-26"
              />
            </div>
            <div>
              <Label htmlFor="BE">BE (mEq/L)</Label>
              <Input
                id="BE"
                type="text"
                value={BE}
                onChange={(e) => setBE(e.target.value)}
                placeholder="-2 a +2"
              />
            </div>
            <div>
              <Label htmlFor="lactato">Lactato (mmol/L)</Label>
              <Input
                id="lactato"
                type="text"
                value={lactato}
                onChange={(e) => setLactato(e.target.value)}
                placeholder="0.5-1.5"
              />
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-semibold mb-4">Eletrólitos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="Na">Sódio (Na+)</Label>
              <Input
                id="Na"
                type="text"
                value={Na}
                onChange={(e) => setNa(e.target.value)}
                placeholder="135-145 mEq/L"
              />
            </div>
            <div>
              <Label htmlFor="K">Potássio (K+)</Label>
              <Input
                id="K"
                type="text"
                value={K}
                onChange={(e) => setK(e.target.value)}
                placeholder="3.5-5.0 mEq/L"
              />
            </div>
            <div>
              <Label htmlFor="Cl">Cloreto (Cl-)</Label>
              <Input
                id="Cl"
                type="text"
                value={Cl}
                onChange={(e) => setCl(e.target.value)}
                placeholder="98-106 mEq/L"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="glicose">Glicose (mg/dL)</Label>
            <Input
              id="glicose"
              type="text"
              value={glicose}
              onChange={(e) => setGlicose(e.target.value)}
              placeholder="70-100 mg/dL"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleCalcular}
            disabled={!validarEntradas()}
            className="px-6 py-3"
          >
            Calcular
          </Button>
        </CardFooter>
      </Card>

      {mostrarResultados && resultados && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Distúrbio Ácido-Base
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-lg">
                      {resultados.tipoDisturbio.toUpperCase()}
                    </Badge>
                    {resultados.compensacao && (
                      <Badge variant="secondary">
                        {resultados.compensacao}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {resultados.tipoDisturbio.includes("metabólic") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {resultados.tipoDisturbio.includes("acidose")
                        ? "Compensação Respiratória Esperada"
                        : "Compensação Respiratória Esperada"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">
                      pCO2 esperado: {resultados.pCO2Esperado.toFixed(1)} mmHg
                    </p>
                    <p className="text-sm text-muted-foreground">
                      pCO2 medido: {parseFloat(pCO2.replace(",", "."))} mmHg
                    </p>
                  </CardContent>
                </Card>
              )}

              {resultados.tipoDisturbio.includes("respiratório") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {resultados.tipoDisturbio.includes("acidose")
                        ? "Compensação Metabólica Esperada"
                        : "Compensação Metabólica Esperada"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">
                      HCO3 esperado:{" "}
                      {resultados.tipoDisturbio.includes("acidose")
                        ? (
                            resultados.HCO3Normal +
                            (parseFloat(pCO2.replace(",", ".")) -
                              resultados.pCO2Normal) /
                              10
                          ).toFixed(1)
                        : (
                            resultados.HCO3Normal -
                            (resultados.pCO2Normal -
                              parseFloat(pCO2.replace(",", "."))) /
                              10
                          ).toFixed(1)}{" "}
                      mEq/L
                    </p>
                    <p className="text-sm text-muted-foreground">
                      HCO3 medido: {parseFloat(HCO3.replace(",", "."))} mEq/L
                    </p>
                  </CardContent>
                </Card>
              )}

              {resultados.tipoDisturbio.includes("acidose metabólica") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ânion Gap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">
                      AG = Na - (Cl + HCO3) = {resultados.anionGap.toFixed(1)}{" "}
                      mEq/L
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Normal: 8-12 mEq/L
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Eletrólitos Corrigidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Sódio corrigido (glicose)</Label>
                      <p className="text-lg font-semibold">
                        {resultados.NaCorrigido.toFixed(1)} mEq/L
                      </p>
                    </div>
                    <div>
                      <Label>Potássio corrigido (pH)</Label>
                      <p className="text-lg font-semibold">
                        {resultados.KCorrigido.toFixed(1)} mEq/L
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      <Accordion type="single" collapsible>
        <AccordionItem value="explicacao">
          <AccordionTrigger className="text-lg">
            <div className="flex items-center gap-2">
              <Info size={18} />
              Explicação dos Cálculos
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Interpretação Básica</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>pH {"<"} 7.35</strong>: Acidose
                  </li>
                  <li>
                    <strong>pH {">"} 7.45</strong>: Alcalose
                  </li>
                  <li>
                    <strong>pCO2 alterado</strong>: Componente respiratório
                  </li>
                  <li>
                    <strong>HCO3 alterado</strong>: Componente metabólico
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Cálculos Específicos</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium">Acidose Metabólica</h5>
                    <p className="text-sm">
                      <strong>pCO2 esperado = 1.5 × HCO3 + 8</strong>
                    </p>
                    <p className="text-sm">
                      <strong>Ânion Gap = Na - (Cl + HCO3)</strong> (Normal:
                      8-12 mEq/L)
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium">Alcalose Metabólica</h5>
                    <p className="text-sm">
                      <strong>pCO2 esperado = HCO3 + 15</strong>
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium">Acidose Respiratória</h5>
                    <p className="text-sm">
                      Para cada <strong>10 mmHg</strong> de pCO2 acima do
                      normal, o HCO3 aumenta <strong>1 mEq/L</strong> (aguda) ou{" "}
                      <strong>3-4 mEq/L</strong> (crônica)
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium">Alcalose Respiratória</h5>
                    <p className="text-sm">
                      Para cada <strong>10 mmHg</strong> de pCO2 abaixo do
                      normal, o HCO3 diminui <strong>1 mEq/L</strong> (aguda) ou{" "}
                      <strong>3-4 mEq/L</strong> (crônica)
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium">Correção de Eletrólitos</h5>
                    <p className="text-sm">
                      <strong>
                        Sódio corrigido = Na + 0.016 × (glicose - 100)
                      </strong>
                    </p>
                    <p className="text-sm">
                      <strong>Potássio corrigido = K + 0.6 × (pH - 7.4)</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
