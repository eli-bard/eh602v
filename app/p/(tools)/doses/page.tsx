import { Heading } from "@/components/geral/Heading";
import { Biohazard } from "lucide-react";
import DosesCard from "@/components/dashboard/DosesCard";
import { dosesways } from "@/components/dashboard/dosesways";

export default function Doses() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Heading
        title="Doses"
        description="Confira as doses das principais medicações com sua IA favorita (acesso pelo WhatsApp)"
        icon={Biohazard}
        iconColor="text-violet-500 dark:text-violet-400"
        bgColor="bg-violet-500/10 dark:bg-violet-900/20"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dosesways.map((waysdoses) => (
            <DosesCard
              key={waysdoses.id}
              id={waysdoses.id}
              title={waysdoses.title}
              description={waysdoses.description}
              category={waysdoses.category}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
