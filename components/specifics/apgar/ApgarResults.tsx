import { interpretApgarScore } from "@/components/specifics/apgar/apgar";
import { cn } from "@/lib/utils";

interface ApgarResultProps {
  totalScore: number;
  className?: string;
}

export default function ApgarResult({
  totalScore,
  className,
}: ApgarResultProps) {
  const interpretation = interpretApgarScore(totalScore);

  const scoreColor = cn(
    "text-4xl font-semibold px-4 py-2 rounded-full",
    totalScore >= 7
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : totalScore >= 4
      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  );

  return (
    <div
      className={cn(
        "mt-8 p-6 border rounded-lg dark:border-gray-700 dark:bg-gray-800",
        className
      )}
    >
      <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
        Resultado do Escore de Apgar
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-300">Pontuação Total:</p>
          <br />
          <span className={scoreColor}>{totalScore}</span>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-300">Interpretação:</p>
          <p className="text-lg font-semibold dark:text-gray-100">
            {interpretation}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>0-3: Gravemente deprimido</p>
        <p>4-6: Moderadamente deprimido</p>
        <p>7-10: Normal</p>
      </div>
    </div>
  );
}
