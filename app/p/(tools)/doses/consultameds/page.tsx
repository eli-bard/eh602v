"use client";

import React, { useState, useMemo } from "react";
import { Search, Pill, AlertCircle, Info, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Medicamentos } from "@/components/specifics/medicamentos/medicamentos";

// Tipo para medicamento
interface Medication {
  id: string;
  nome: string;
  categoria: string;
  doseneo: string;
  doseped: string;
  apresentacoes: string;
  contraindicacoes: string;
  orientacoes: string;
  observacao: string;
  links: {
    consultaRemedios: string;
    anvisa: string;
    guiaFarmaceutico: string;
  };
}

// Base de dados estática de medicamentos
const medications: Medication[] = Medicamentos;

// Componente principal
export default function MedicationLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);

  // Obter categorias únicas
  const categories = useMemo(() => {
    const cats = Array.from(new Set(medications.map((med) => med.categoria)));
    return ["Todos", ...cats];
  }, []);

  // Filtrar medicamentos
  const filteredMedications = useMemo(() => {
    return medications.filter((med) => {
      const matchesSearch =
        med.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || med.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-blue-600 dark:bg-blue-800 p-3 rounded-full">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Consulta de Medicamentos
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Sistema de consulta rápida para informações sobre medicamentos
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Search className="w-5 h-5" />
              Buscar Medicamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Pesquisar por nome
                </label>
                <Input
                  placeholder="Digite o nome do medicamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Categoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de medicamentos */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Medicamentos Encontrados ({filteredMedications.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {filteredMedications.map((med) => (
                    <Button
                      key={med.id}
                      variant={
                        selectedMedication?.id === med.id
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-start text-left p-3 h-auto dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      onClick={() => setSelectedMedication(med)}
                    >
                      <div>
                        <div className="font-semibold">{med.nome}</div>
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs dark:bg-gray-600"
                        >
                          {med.categoria}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detalhes do medicamento */}
          <div className="lg:col-span-2">
            {selectedMedication ? (
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Pill className="w-5 h-5" />
                    {selectedMedication.nome}
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    {selectedMedication.categoria}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="geral" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 dark:bg-gray-700">
                      <TabsTrigger
                        value="geral"
                        className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                      >
                        Informações Gerais
                      </TabsTrigger>
                      <TabsTrigger
                        value="dosagem"
                        className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                      >
                        Dosagem
                      </TabsTrigger>
                      <TabsTrigger
                        value="links"
                        className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                      >
                        Links de Apoio
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="geral" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 dark:text-white">
                            Apresentações
                          </h4>
                          <p className="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded dark:text-gray-300">
                            {selectedMedication.apresentacoes}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 dark:text-white">
                            Orientações
                          </h4>
                          <p className="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded dark:text-gray-300">
                            {selectedMedication.orientacoes}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 dark:text-white">
                          <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
                          Contraindicações
                        </h4>
                        <Alert className="dark:bg-red-900/30 dark:border-red-800">
                          <AlertDescription className="dark:text-red-200">
                            {selectedMedication.contraindicacoes}
                          </AlertDescription>
                        </Alert>
                      </div>

                      {selectedMedication.observacao && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2 dark:text-white">
                            <Info className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            Observação
                          </h4>
                          <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800/50 dark:text-blue-200">
                            {selectedMedication.observacao}
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="dosagem" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 dark:text-white">
                            Dose Neonatal
                          </h4>
                          <p className="text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800/50 dark:text-green-200">
                            {selectedMedication.doseneo}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 dark:text-white">
                            Dose Pediátrica
                          </h4>
                          <p className="text-sm bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800/50 dark:text-orange-200">
                            {selectedMedication.doseped}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="links" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <Card className="dark:bg-gray-700">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg dark:text-white">
                              Links de Referência
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <a
                              href={selectedMedication.links.consultaRemedios}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 dark:text-blue-400" />
                              <div>
                                <div className="font-semibold dark:text-blue-300">
                                  Consulta Remédios
                                </div>
                                <div className="text-sm text-gray-600 dark:text-blue-200">
                                  Informações comerciais e preços
                                </div>
                              </div>
                            </a>

                            <a
                              href={selectedMedication.links.anvisa}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/50 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 dark:text-green-400" />
                              <div>
                                <div className="font-semibold dark:text-green-300">
                                  ANVISA - Bulário
                                </div>
                                <div className="text-sm text-gray-600 dark:text-green-200">
                                  Bula oficial registrada
                                </div>
                              </div>
                            </a>

                            <a
                              href={selectedMedication.links.guiaFarmaceutico}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/50 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 dark:text-purple-400" />
                              <div>
                                <div className="font-semibold dark:text-purple-300">
                                  Guia Farmacêutico HSL
                                </div>
                                <div className="text-sm text-gray-600 dark:text-purple-200">
                                  Guia técnico hospitalar
                                </div>
                              </div>
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="dark:bg-gray-800">
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Pill className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Selecione um medicamento
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Escolha um medicamento da lista para ver os detalhes
                      completos
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}