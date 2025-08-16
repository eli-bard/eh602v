// app/profile/page.tsx
"use client";

import { useState } from "react";

type Attribute = {
  name: string;
  value: number;
  description: string;
};

type Mission = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  xpReward: number;
};

export default function ProfilePage() {
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      name: "Conhecimento Teórico",
      value: 5,
      description: "Domínio de conceitos médicos",
    },
    {
      name: "Habilidade Prática",
      value: 4,
      description: "Capacidade em procedimentos clínicos e cirúrgicos",
    },
    {
      name: "Diagnóstico",
      value: 3,
      description: "Precisão na identificação de condições médicas",
    },
    {
      name: "Comunicação",
      value: 4,
      description: "Habilidade de se comunicar com pacientes e colegas",
    },
    {
      name: "Resiliência",
      value: 5,
      description: "Capacidade de lidar com situações estressantes",
    },
    {
      name: "Empatia",
      value: 4,
      description: "Habilidade de se conectar emocionalmente com pacientes",
    },
  ]);

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: "Sessão de estudos",
      description: "Complete 10 sessões de estudo",
      completed: false,
      xpReward: 100,
    },
    {
      id: 2,
      title: "Anatomia Prática",
      description: "Identifique uma lesão através do exame físico",
      completed: true,
      xpReward: 150,
    },
    {
      id: 3,
      title: "Caso Clínico",
      description: "Analise e resolva 5 casos clínicos complexos",
      completed: false,
      xpReward: 200,
    },
    {
      id: 4,
      title: "Atendimento Simulado",
      description: "Participe de 3 simulações de atendimento",
      completed: false,
      xpReward: 120,
    },
  ]);

  const [level] = useState(1);
  const [xp] = useState(99);
  const xpNeeded = level * 100;

  const increaseAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes[index].value += 1;
    setAttributes(newAttributes);
  };

  const decreaseAttribute = (index: number) => {
    const newAttributes = [...attributes];
    if (newAttributes[index].value > 0) {
      newAttributes[index].value -= 1;
      setAttributes(newAttributes);
    }
  };

  const toggleMission = (id: number) => {
    const newMissions = missions.map((mission) =>
      mission.id === id
        ? { ...mission, completed: !mission.completed }
        : mission
    );
    setMissions(newMissions);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">
            Perfil do Médico
          </h1>
          <p className="text-xl text-gray-300">
            Olá, Estudante! Ainda estou desenvolvendo os recursos de nosso
            aplicativo, agradeço sua paciência.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seção de Status */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-yellow-600">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Status</h2>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Nível {level}</span>
                <span>
                  {xp}/{xpNeeded} XP
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-yellow-500 h-4 rounded-full"
                  style={{ width: `${Math.min(100, (xp / xpNeeded) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              {attributes.map((attr, index) => (
                <div key={attr.name} className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">{attr.name}</h3>
                    <span className="text-yellow-400 font-bold">
                      {attr.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    {attr.description}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => decreaseAttribute(index)}
                      className="px-2 py-1 bg-red-600 rounded hover:bg-red-700 transition"
                    >
                      -
                    </button>
                    <button
                      onClick={() => increaseAttribute(index)}
                      className="px-2 py-1 bg-green-600 rounded hover:bg-green-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Seção de Missões */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-blue-500">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Missões</h2>

              <div className="space-y-4">
                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    className={`p-4 rounded-lg border ${
                      mission.completed
                        ? "bg-gray-700 border-green-500"
                        : "bg-gray-800 border-blue-400"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`font-bold ${
                            mission.completed
                              ? "text-green-400 line-through"
                              : "text-white"
                          }`}
                        >
                          {mission.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {mission.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-yellow-400 font-bold">
                          {mission.xpReward} XP
                        </span>
                        <button
                          onClick={() => toggleMission(mission.id)}
                          className={`px-3 py-1 rounded ${
                            mission.completed
                              ? "bg-gray-600 text-gray-300"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {mission.completed ? "Concluído" : "Incompleto"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção de Conquistas */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-purple-500">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                Conquistas
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="font-bold">Estudante Dedicado</h3>
                  <p className="text-sm text-gray-300">10 sessões de estudo</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">💉</span>
                  </div>
                  <h3 className="font-bold">Prático</h3>
                  <p className="text-sm text-gray-300">5 procedimentos</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h3 className="font-bold">Empático</h3>
                  <p className="text-sm text-gray-300">Alto nível de empatia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
