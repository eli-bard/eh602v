// page.tsx
"use client"; // Marca como um Client Component para permitir interatividade (hooks como useState)

import React, { useState } from "react";
import {
  Medication,
  medications,
} from "@/components/specifics/medicamentos/medicamentos"; // Ajuste o caminho de importação conforme sua estrutura de pastas

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>(
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    if (query.trim() === "") {
      setFilteredMedications([]); // Limpa os resultados se o termo de busca estiver vazio
      return;
    }

    // Filtra as medicações pelo nome ou por qualquer uma de suas categorias
    const results = medications.filter(
      (med) =>
        med.name.toLowerCase().includes(query) ||
        med.categories.some((category) =>
          category.toLowerCase().includes(query)
        )
    );
    setFilteredMedications(results);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 text-center">
        Guia de Medicamentos Pediátricos e Neonatais 🧑‍⚕️
      </h1>

      <p className="text-gray-700 text-lg mb-8 text-center max-w-2xl mx-auto">
        Bem-vindo! Esta página foi desenvolvida para facilitar a consulta de
        informações sobre medicações e condutas em pediatria, com foco no
        cuidado de recém-nascidos e cálculos de dosagens. Utilize a barra de
        pesquisa abaixo para encontrar rapidamente o que você precisa. Não temos
        todas as medicações, e apenas visamos facilitar a consulta. As melhores
        informações sempre são provenientes de fontes oficiais.
      </p>

      {/* Seção de Pesquisa */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg shadow-md">
        <label
          htmlFor="search"
          className="block text-lg font-semibold text-blue-700 mb-2"
        >
          Pesquisar Medicamentos (por nome ou categoria) 🔎
        </label>
        <input
          type="text"
          id="search"
          placeholder="Ex: Fentanil, Sedativo, Amina vasoativa..."
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Seção de Resultados da Pesquisa */}
      {searchTerm.trim() !== "" && filteredMedications.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 border-b-2 border-blue-200 pb-2">
            Resultados da Pesquisa para &quot;{searchTerm}&quot;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedications.map((med) => (
              <div
                key={med.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {med.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Categorias:</span>{" "}
                  {med.categories.join(", ")}
                </p>
                {med.presentation && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Apresentação:</span>{" "}
                    {med.presentation}
                  </p>
                )}
                {med.doses.length > 0 && (
                  <div className="mb-2">
                    <p className="font-semibold text-gray-700">Doses:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-4 space-y-1">
                      {med.doses.map((dose, index) => (
                        <li key={index}>
                          <strong>{dose.type}:</strong> {dose.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {med.dilutionAndPreparation &&
                  med.dilutionAndPreparation.length > 0 && (
                    <div className="mb-2">
                      <p className="font-semibold text-gray-700">
                        Diluição e Preparo / Macetes / Cálculos:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4 space-y-1">
                        {/* Usando dangerouslySetInnerHTML para renderizar `código` como <code> */}
                        {med.dilutionAndPreparation.map((item, index) => (
                          <li
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: item.replace(
                                /`(.*?)`/g,
                                '<code class="bg-gray-100 text-purple-700 px-1 py-0.5 rounded text-xs">$&</code>'
                              ),
                            }}
                          ></li>
                        ))}
                      </ul>
                    </div>
                  )}
                {med.observations && med.observations.length > 0 && (
                  <div className="mb-2">
                    <p className="font-semibold text-gray-700">Observações:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-4 space-y-1">
                      {med.observations.map((obs, index) => (
                        <li key={index}>{obs}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {med.antidote && (
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Antídoto:</span>{" "}
                    {med.antidote}
                  </p>
                )}
                <p className="text-sm text-blue-600 font-semibold mt-4">
                  <a
                    href={med.whereToFindInfoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    Onde encontrar as melhores informações{" "}
                    <span className="ml-1 text-base">🔗</span>
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem de "Não encontrado" */}
      {searchTerm.trim() !== "" && filteredMedications.length === 0 && (
        <div className="mb-12 p-6 bg-yellow-50 rounded-lg shadow-md text-center">
          <p className="text-xl text-yellow-800">
            Nenhuma medicação encontrada para &quot;{searchTerm}&quot;. Por
            favor, tente um termo diferente. 🤷‍♀️
          </p>
        </div>
      )}

      {/* Seções de Informações Gerais / Protocolos (Exibição Estática) */}
      {(searchTerm.trim() === "" || filteredMedications.length === 0) && (
        <>
          <div className="mb-12 p-6 bg-green-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b-2 border-green-200 pb-2">
              Princípios Gerais: Aminas Vasoativas e Inotrópicos ✨
            </h2>
            <p className="text-gray-700 mb-2">
              Ao lidar com aminas vasoativas e inotrópicos, é crucial entender a
              distinção entre doses alfa e beta:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li>
                <span className="font-bold">Dose Alfa (α):</span>{" "}
                Predominantemente vasoconstrição.
              </li>
              <li>
                <span className="font-bold">Dose Beta (β):</span> β1: efeito
                inotrópico (aumento da contratilidade cardíaca); β2:
                vasodilatação, broncodilatação.
              </li>
            </ul>
          </div>

          <div className="mb-12 p-6 bg-purple-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4 border-b-2 border-purple-200 pb-2">
              Protocolos Específicos para Intubação Orotraqueal (IOT) 💡
            </h2>
            <p className="text-gray-700 mb-4">
              A IOT em pediatria exige uma sequência rápida e bem planejada para
              garantir a segurança do paciente.
            </p>

            <h3 className="text-xl font-semibold text-purple-600 mb-3">
              1. Sequência Rápida de IOT Pediátrica (SRIOT)
            </h3>
            <div className="ml-4 mb-6">
              <h4 className="font-semibold text-purple-500 mb-2">
                1. Pré-medicação:
              </h4>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>
                  <span className="font-bold">Lidocaína:</span> 1-2 mg/kg
                  (Ampola 10 mg/mL).
                  <ul className="list-circle list-inside ml-4 space-y-0.5">
                    <li>
                      <span className="font-medium">Macete:</span> Peso (kg) x
                      0,1 mL.
                    </li>
                    <li>
                      <span className="font-medium">Vantagens:</span> Ação
                      broncodilatadora e redução da PIC.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Atropina:</span> 0,02 mg/kg
                  (Ampola 0,25 mg/mL).
                  <ul className="list-circle list-inside ml-4 space-y-0.5">
                    <li>
                      <span className="font-medium">Macete:</span> Peso (kg) x
                      0,08 mL.
                    </li>
                    <li>
                      <span className="font-medium">Vantagem:</span> Diminui
                      resposta vagal em crianças pequenas.
                    </li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold text-purple-500 mb-2 mt-4">
                2. Sedação e Analgesia para Procedimento:
              </h4>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>
                  <span className="font-bold">Propofol:</span> 1-2 mg/kg/dose
                  (Ampola 10 mg/mL).
                  <ul className="list-circle list-inside ml-4 space-y-0.5">
                    <li>
                      <span className="font-medium">Macete:</span> Peso (kg) x
                      0,1 mL.
                    </li>
                    <li>
                      <span className="font-medium">Vantagem:</span> Menor
                      depressão cardíaca.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Cetamina:</span> 1-2 mg/kg/dose
                  (Ampola 50 mg/mL).
                  <ul className="list-circle list-inside ml-4 space-y-0.5">
                    <li>
                      <span className="font-medium">Macete:</span> Peso (kg) x
                      0,04 mL.
                    </li>
                    <li>
                      <span className="font-medium">Vantagens:</span>{" "}
                      Broncodilatador, aumenta FC e PA.
                    </li>
                    <li>
                      <span className="font-medium">Observação:</span> Ideal
                      associar com um Benzodiazepínico para reduzir chance de
                      alucinação.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Midazolam:</span> 0,1-0,2
                  mg/kg/dose.
                  <ul className="list-circle list-inside ml-4 space-y-0.5">
                    <li>
                      <span className="font-medium">Macete:</span> Peso (kg) x
                      0,04 mL.
                    </li>
                    <li>
                      <span className="font-medium">Vantagens:</span> Rápido
                      início de ação, causa amnésia e tem ação
                      anticonvulsivante.
                    </li>
                    <li>
                      <span className="font-medium">Desvantagens:</span> Evitado
                      em caso de choque, pode reduzir PA.
                    </li>
                    <li>
                      <span className="font-medium">Antídoto:</span> Flumazenil.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Fentanil:</span> 2-4 mcg/kg (EV).
                </li>
              </ul>

              <h4 className="font-semibold text-purple-500 mb-2 mt-4">
                3. Bloqueador Neuromuscular:
              </h4>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>
                  <span className="font-bold">Rocurônio:</span> 0,6-1,2
                  mg/kg/dose (Ampola 10 mg/mL).
                  <ul className="list-circle list-inside ml-4 space-y-0.5">
                    <li>
                      <span className="font-medium">Macete:</span> Peso (kg) x
                      0,05 mL.
                    </li>
                    <li>
                      <span className="font-medium">Antagonista:</span>{" "}
                      Sugamadex.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Succinilcolina:</span> 1-1,5 mg/kg
                  (EV) ou 2-3 mg/kg (IM).
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-purple-600 mb-3 mt-8">
              2. Sequência Rápida de IOT em Neonatologia
            </h3>
            <p className="text-gray-700 mb-2">
              Algumas particularidades importantes para neonatos:
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li>
                <span className="font-bold">Atropina:</span> 0,25 mg/mL - Fazer
                0,08 mL/kg.
              </li>
              <li>
                <span className="font-bold">Fentanil:</span> 50 mcg/mL. Fazer
                diluído para diminuir rigidez torácica.
                <ul className="list-circle list-inside ml-4 space-y-0.5">
                  <li>
                    <span className="font-medium">Diluição:</span> 1 mL de
                    Fentanil em 9 mL de SF 0,9% (solução de 5 mcg/mL).
                  </li>
                  <li>
                    <span className="font-medium">Dose:</span> Dessa solução,
                    fazer 0,1 a 0,2 mL/kg (que dará a dose de 0,5 a 1 mcg/kg).
                  </li>
                  <li>
                    <span className="font-medium">Observação:</span> Se houver
                    rigidez torácica, considerar Naloxona (0,1 mL/kg em bolus).
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Rocurônio:</span> 0,05 a 0,1 mL/kg.
                <ul className="list-circle list-inside ml-4 space-y-0.5">
                  <li>
                    <span className="font-medium">Macete:</span> Peso (kg) / 10
                    (arredondar para baixo).
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-bold">
                  OBSERVAÇÕES IMPORTANTES EM NEONATOLOGIA:
                </span>
                <ul className="list-circle list-inside ml-4 space-y-0.5">
                  <li>
                    Evitar benzodiazepínicos e cetamina em neonatos devido aos
                    potenciais efeitos adversos (principalmente hipotensão e
                    efeitos no SNC imaturo).
                  </li>
                  <li>Antagonista do Rocurônio: Sugamadex.</li>
                </ul>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
