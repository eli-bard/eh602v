import Image from "next/image";
import Link from "next/link";

export default function TutorialPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white dark:bg-gray-900">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-500 mb-4">
          Tutorial Completo: Uso da Ferramenta INTERGROWTH-21<sup>ª</sup>
        </h1>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <Link
            href="https://intergrowth21.ndog.ox.ac.uk/pt/ManualEntry"
            target="_blank"
            className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Acesse a Ferramenta Aqui:
            https://intergrowth21.ndog.ox.ac.uk/pt/ManualEntry
          </Link>
        </div>
      </header>

      <section className="mb-6">
        <div className="text-gray-700 dark:text-gray-300">
          Não somos donos da ferramenta, apenas recomendamos seu uso pois
          trata-se de uma ferramenta auxiliar e gratuita e com embasamento
          científico que inclui um público brasileiro.
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
          Introdução à Ferramenta
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border dark:border-gray-700">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            O INTERGROWTH-21<sup>ª</sup> é uma ferramenta científica utilizada
            para avaliar o crescimento fetal e neonatal de acordo com padrões
            internacionais.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src="/intergrowth/intergrowth-1.png"
                alt="Página inicial da ferramenta INTERGROWTH-21ª mostrando o logo e menu de navegação"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              Figura 1: Página inicial da ferramenta
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
          Passo a Passo - Entrada Manual
        </h2>

        {/* Passo 1 */}
        <div className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center">
            <span className="flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full w-8 h-8 mr-2">
              1
            </span>
            Acesso à Seção de Entrada Manual
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Na página inicial, clique em{" "}
            <strong className="text-gray-900 dark:text-gray-100">
              &quot;Digitação Manual&quot;
            </strong>{" "}
            no menu superior.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src="/intergrowth/intergrowth-2.png"
                alt="Menu destacando a opção 'Digitação Manual'"
                fill
                className="object-contain"
                quality={100}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              Figura 2: Navegação para a seção de entrada manual
            </p>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center">
            <span className="flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full w-8 h-8 mr-2">
              2
            </span>
            Preenchimento dos Dados do Bebê
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Preencha os campos obrigatórios:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Sexo do bebê</li>
            <li>Idade gestacional</li>
            <li>
              Medidas antropométricas desejadas (peso, comprimento, perímetro
              cefálico)
            </li>
          </ul>
        </div>

        {/* Passo 3 */}
        <div className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center">
            <span className="flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full w-8 h-8 mr-2">
              3
            </span>
            Geração de Resultados
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Após preencher todos os campos, clique em{" "}
            <strong className="text-gray-900 dark:text-gray-100">
              &#34;Comparar com os padrões&#34;
            </strong>{" "}
            para gerar os resultados.
          </p>
        </div>

        {/* Passo 4 */}
        <div className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center">
            <span className="flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full w-8 h-8 mr-2">
              4
            </span>
            Interpretação dos Resultados
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Os resultados serão exibidos em formato de gráfico e tabela,
            mostrando:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Percentis de crescimento</li>
            <li>Curvas de referência</li>
            <li>Classificação do crescimento</li>
            <li>Z-scores</li>
          </ul>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src="/intergrowth/intergrowth-3.png"
                alt="Formulário com campos para preenchimento dos dados do bebê"
                fill
                className="object-contain"
                quality={100}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              Figura 3: Formulário preenchido
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">
          Este tutorial foi desenvolvido para auxiliar no uso da plataforma
          INTERGROWTH-21<sup>ª</sup>
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
          As imagens são meramente ilustrativas. A ferramenta real pode sofrer
          atualizações.
        </p>
      </footer>
    </div>
  );
}
