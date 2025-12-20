import { useState, useEffect, useCallback } from "react";

export const useIdadeNeonatal = () => {
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [horaNascimento, setHoraNascimento] = useState<string>("");
  const [semanasGestacao, setSemanasGestacao] = useState<number>(0);
  const [diasGestacao, setDiasGestacao] = useState<number>(0);
  const [idade, setIdade] = useState<string>("Preencha os dados de nascimento");
  const [idadeCorrigida, setIdadeCorrigida] = useState<string | null>(null);

  const calcularIdadeCorrigida = useCallback(
    (dataNasc: string) => {
      if (!dataNasc) return null;

      const hoje = new Date();
      const nascimento = new Date(dataNasc);

      hoje.setHours(0, 0, 0, 0);
      nascimento.setHours(0, 0, 0, 0);

      const diffTempo = hoje.getTime() - nascimento.getTime();
      const diasVida = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

      if (semanasGestacao > 0 && semanasGestacao < 37) {
        const diasGestacaoTotal = semanasGestacao * 7 + diasGestacao;
        const diasCorrigidosTotal = diasGestacaoTotal + diasVida - 1;

        if (diasCorrigidosTotal >= 40 * 7) {
          const diasApos40Semanas = diasCorrigidosTotal - 40 * 7;
          return `40 semanas já alcançadas, hoje com ${diasApos40Semanas} dias de vida pós-termo`;
        } else {
          const semanasCorrigidas = Math.floor(diasCorrigidosTotal / 7);
          const diasCorrigidos = diasCorrigidosTotal % 7;
          return `${semanasCorrigidas} semanas e ${diasCorrigidos} dias (corrigida)`;
        }
      }
      return null;
    },
    [semanasGestacao, diasGestacao]
  );

  const calcularIdade = useCallback(() => {
    if (!dataNascimento) {
      setIdade("Preencha a data de nascimento");
      setIdadeCorrigida(null);
      return;
    }

    try {
      const dataHoraNascimento = horaNascimento
        ? `${dataNascimento}T${horaNascimento}`
        : `${dataNascimento}T00:00`;

      const nascimento = new Date(dataHoraNascimento);
      const hoje = new Date();

      const diffTempo = hoje.getTime() - nascimento.getTime();
      const horasVida = Math.floor(diffTempo / (1000 * 60 * 60));

      if (horasVida < 96) {
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

      setIdadeCorrigida(calcularIdadeCorrigida(dataNascimento));
    } catch {
      setIdade("Erro ao calcular idade");
      setIdadeCorrigida(null);
    }
  }, [dataNascimento, horaNascimento, calcularIdadeCorrigida]);

  useEffect(() => {
    calcularIdade();
  }, [calcularIdade]);

  return {
    // Estados
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

    // Funções
    calcularIdade,
    calcularIdadeCorrigida,
  };
};
