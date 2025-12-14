import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      icon: "🚨",
      title: "Auxílio em Emergências",
      description: "Protocolos rápidos e diretos para situações críticas",
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: "🌟",
      title: "Resumos Premium",
      description: "Conteúdo exclusivo e condensado para revisão rápida",
      color:
        "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: "🧮",
      title: "Calculadoras Pediátricas",
      description: "Ferramentas especializadas para pacientes infantis",
      color:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: "📖",
      title: "Dicas de Estudo",
      description: "Estratégias eficientes para aprendizado médico",
      color:
        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

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
                src="/imgs/logos/logo-black.png"
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
            <Link href="/p/dashboard" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm shadow-sm transition-all">
                Acesso Direto
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-12 sm:py-20 flex flex-col items-center text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Acesso direto às ferramentas essenciais
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 max-w-3xl leading-tight">
            Medicina baseada em{" "}
            <span className="text-blue-600 dark:text-blue-400">evidências</span>
            , prática focada no{" "}
            <span className="text-green-600 dark:text-green-400">paciente</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
            Protocolos atualizados, ferramentas clínicas e recursos educacionais
            em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/p/dashboard" passHref>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-6 text-lg shadow-lg transition-all hover:scale-105"
              >
                🔓 Acesso Direto à Plataforma
              </Button>
            </Link>
            <Link href="#features" passHref>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                ✨ Ver Recursos
              </Button>
            </Link>
          </div>

          {/* Quick Access Cards */}
          <div className="w-full max-w-5xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-8">
              Acesso Rápido às Principais Ferramentas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <Link
                  href="/p/dashboard"
                  key={index}
                  className="group cursor-pointer"
                >
                  <div
                    className={`${feature.color} p-4 rounded-xl border hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col items-center text-center h-full`}
                  >
                    <div
                      className={`text-2xl ${feature.iconColor} mb-2 group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {feature.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Recursos Exclusivos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ferramentas especializadas desenvolvidas para otimizar sua prática
              clínica e estudos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                <div className={`text-3xl ${feature.iconColor} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {feature.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/p/dashboard" passHref>
                    <Button
                      variant="ghost"
                      className="w-full text-sm text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
                    >
                      Acessar Agora →
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Quick Access */}
          <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                ⚡ Acesso Instantâneo
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Todas as ferramentas disponíveis em um único painel. Não perca
                tempo procurando.
              </p>
              <Link href="/p/dashboard" passHref>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-6 text-lg shadow-lg transition-all hover:scale-105"
                >
                  🚀 Acessar Todas as Ferramentas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              ✨ Comece a usar agora mesmo
            </h2>
            <p className="text-blue-100 mb-8">
              Acesso imediato a todas as ferramentas: emergências, calculadoras
              pediátricas, resumos premium e dicas de estudo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/p/dashboard" passHref>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-lg transition-all hover:scale-105"
                >
                  📋 Acessar Dashboard Completo
                </Button>
              </Link>
              <Link href="#features" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-all"
                >
                  🔍 Ver Detalhes
                </Button>
              </Link>
            </div>
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
