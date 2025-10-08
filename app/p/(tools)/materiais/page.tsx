import { Heading } from "@/components/geral/Heading";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Gift,
  DollarSign,
  Download,
  Star,
  ArrowRight,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ebooksGratuitos } from "@/app/p/(tools)/materiais/ebooks-grauitos";
import { ebooksPagos } from "@/app/p/(tools)/materiais/ebooks-pagos";
import Link from "next/link";

export default function PaisEPacientes() {
  return (
    <div>
      <Heading
        title="Materiais"
        description="Disponíveis os materiais gratuitos e premium"
        icon={Paperclip}
        iconColor="text-pink-700 dark:text-pink-500"
        bgColor="bg-violet-500/10 dark:bg-violet-500/20"
      />
      <main>
        {/* Seção de Ebooks Gratuitos */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-6 py-3 rounded-full mb-4">
                <Gift className="h-5 w-5 mr-2" />
                <h2 className="text-2xl font-bold">
                  Materiais{" "}
                  <span className="text-green-600 dark:text-green-400">
                    Gratuitos
                  </span>
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Baixe agora mesmo sem custo algum
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooksGratuitos.map((ebook) => (
                <div
                  key={ebook.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-4 mx-auto">
                      <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                      {ebook.titulo}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
                      {ebook.descricao}
                    </p>
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        className="bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Gratuitamente
                      </Button>
                    </div>
                  </div>
                  {ebook.tags && (
                    <div className="px-6 pb-4 flex flex-wrap justify-center gap-2">
                      {ebook.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Ebooks Pagos */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <div className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-6 py-3 rounded-full mb-4">
                <DollarSign className="h-5 w-5 mr-2" />
                <h2 className="text-2xl font-bold">
                  Materiais{" "}
                  <span className="text-yellow-600 dark:text-yellow-400">
                    Premium
                  </span>
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Materiais completos disponíveis para compra
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooksPagos.map((ebook) => (
                <div
                  key={ebook.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="relative">
                    {ebook.destaque && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </div>
                    )}
                    <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {ebook.titulo}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {ebook.descricao}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {ebook.preco}
                      </span>

                      <Link href={"https://fundamentumelisio.com.br"}>
                        <Button>
                          A publicação está em processo
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  {ebook.tags && (
                    <div className="px-6 pb-4 flex flex-wrap gap-2">
                      {ebook.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Aviso */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                <span className="border-b-2 border-red-600 dark:border-red-500 pb-2">
                  Aviso Importante
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Os materiais disponíveis nesta página têm caráter exclusivamente
                informativo e educativo. Eles não substituem a consulta médica
                ou o acompanhamento profissional.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Em caso de dúvidas sobre a saúde da criança ou necessidade de
                orientação específica, procure um profissional de saúde.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
