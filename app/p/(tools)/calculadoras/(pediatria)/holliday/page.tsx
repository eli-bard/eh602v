"use client";

import { useState } from "react";

export default function HollidayPage() {
  const [peso, setPeso] = useState("");
  const [porcentagem, setPorcentagem] = useState("");

  const pesoNum = Number(peso);
  const porcentagemNum = Number(porcentagem);

  const calcularVolume = (peso: number) => {
    if (peso <= 0) return 0;

    if (peso <= 10) {
      return peso * 100;
    } else if (peso <= 20) {
      return 1000 + (peso - 10) * 50;
    } else {
      return 1500 + (peso - 20) * 20;
    }
  };

  const volumeTotal = calcularVolume(pesoNum); // HV 100%
  const mlPorHora = volumeTotal / 24;

  const volumePercentual = (volumeTotal * porcentagemNum) / 100;
  const mlPorHoraPercentual = volumePercentual / 24;

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-700">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Calculadora de Holliday-Segar
      </h1>

      <div className="space-y-4">
        <Input
          label="Peso do paciente (kg)"
          type="number"
          value={peso}
          onChange={setPeso}
        />
        <Input
          label="Porcentagem desejada (%)"
          type="number"
          value={porcentagem}
          onChange={setPorcentagem}
        />
      </div>

      {peso && porcentagem && (
        <div className="mt-6 space-y-4 text-center border-t pt-6 border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
            Resultado
          </h2>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <strong className="dark:text-gray-100">HV 100%</strong> ={" "}
              {volumeTotal.toFixed(2)} mL em 24h
            </p>
            <p>
              Administrar a{" "}
              <strong className="dark:text-gray-100">
                {mlPorHora.toFixed(2)} mL/h
              </strong>
            </p>
          </div>

          <div className="space-y-2 pt-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong className="dark:text-gray-100">
                HV {porcentagemNum}%
              </strong>{" "}
              = {volumePercentual.toFixed(2)} mL em 24h
            </p>
            <p>
              Administrar a{" "}
              <strong className="dark:text-gray-100">
                {mlPorHoraPercentual.toFixed(2)} mL/h
              </strong>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
};

function Input({ label, type, value, onChange }: InputProps) {
  return (
    <div>
      <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
}
