import { Heading } from "@/components/geral/Heading";
import { FileWarningIcon } from "lucide-react";
import EmergenciaCard from "@/app/p/(tools)/emergencias/EmergenciaCard";
import { emergencias } from "@/app/p/(tools)/emergencias/emergencias";

export default function Emergencias() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Heading
        title="Emergencias"
        description="Aprenda a lidar com as principais emergências em pediatria"
        icon={FileWarningIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencias.map((emergencias) => (
            <EmergenciaCard
              key={emergencias.id}
              id={emergencias.id}
              title={emergencias.title}
              icon={emergencias.icon}
              iconColor={emergencias.iconColor}
              bgColor={emergencias.bgColor}
              description={emergencias.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
