import { Loader2Icon, SearchIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export default function App() {
  const [idea, setIdea] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const simulateAIThinking = async () => {
    if (!idea.trim()) return;

    setIsThinking(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const responses = [
      `A ideia "${idea}" tem potencial! Existem conceitos similares no mercado, mas há espaço para diferenciação.`,
      `Interessante! "${idea}" já foi explorado, mas com uma abordagem única você pode se destacar.`,
      `"${idea}" é inovador! Não encontrei algo exatamente assim. Vale a pena explorar mais.`,
      `A ideia "${idea}" tem algumas variações existentes. Recomendo pesquisar mais sobre a concorrência antes de seguir.`,
    ];

    setResult(responses[Math.floor(Math.random() * responses.length)]);
    setIsThinking(false);
  };

  return (
    <div className="h-full min-h-screen w-screen flex flex-col bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Sua ideia já existe?
            </h1>
            <p className="text-gray-600 text-lg">
              Descubra se sua ideia é única ou se já existe algo similar no
              mercado
            </p>
          </div>

          <div className="relative mb-8">
            <div
              className={`relative transition-all duration-300 ${
                isFocused ? "scale-105" : "scale-100"
              }`}
            >
              <div
                className={`absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 transition-opacity duration-300 ${
                  isFocused ? "opacity-40" : "opacity-20"
                }`}
              />

              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-indigo-200 transition-colors duration-300">
                <div className="flex items-center p-2">
                  <div className="pl-4 pr-2">
                    <SearchIcon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isFocused ? "text-indigo-500" : "text-gray-400"
                      }`}
                    />
                  </div>

                  <input
                    type="text"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && idea.trim() && !isThinking) {
                        e.preventDefault();
                        simulateAIThinking();
                      }
                    }}
                    placeholder="Ex: Um app de meditação com IA personalizada..."
                    className="flex-1 px-4 py-4 text-lg outline-none text-gray-800 placeholder-gray-400"
                    disabled={isThinking}
                  />

                  <button
                    onClick={simulateAIThinking}
                    disabled={!idea.trim() || isThinking}
                    className="mr-2 px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {isThinking ? (
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                    ) : (
                      "Validar"
                    )}
                  </button>
                </div>

                {isFocused && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {isThinking && (
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div
                  className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <p className="text-center text-gray-600 font-medium">
                Analisando sua ideia...
              </p>
            </div>
          )}

          {result && !isThinking && (
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in border-l-4 border-indigo-500">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    Resultado da Análise
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{result}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
