import { AuthButton } from "@/components/auth/auth-button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Head>
        <title>EliHelp | Plataforma Médica Inteligente</title>
        <meta
          name="description"
          content="Ferramentas clínicas e recursos educativos para profissionais de saúde"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/imgs/logos/elihelp-logo1.png"
                alt="EliHelp Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300 font-medium">
              Suporte inteligente para decisões clínicas
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16 sm:py-24 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 max-w-3xl leading-tight">
            Medicina baseada em{" "}
            <span className="text-blue-600 dark:text-blue-400">evidências</span>
            , prática focada no{" "}
            <span className="text-green-600 dark:text-green-400">paciente</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Protocolos atualizados, ferramentas clínicas e recursos educacionais
            em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/p/dashboard" passHref>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-6 text-lg shadow-lg transition-all"
              >
                Acessar Plataforma
              </Button>
            </Link>
            <Link href="#features" passHref>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Conhecer Recursos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Recursos Essenciais
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Protocolos Clínicos",
                description:
                  "Diretrizes atualizadas para diversas especialidades",
              },
              {
                icon: "📚",
                title: "Materiais Educativos",
                description: "Guias e artigos comentados por especialistas",
              },
              {
                icon: "🧮",
                title: "Calculadoras Médicas",
                description: "Ferramentas práticas para o dia a dia",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Pronto para otimizar sua prática clínica?
          </h2>
          <div className="flex justify-center">
            <Link href="/p/dashboard" passHref>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-lg transition-all"
              >
                Comece Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative w-10 h-10">
                <Image
                  src="/imgs/logos/elihelp-logo1.png"
                  alt="EliHelp Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                EliHelp © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Privacidade
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Termos
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
