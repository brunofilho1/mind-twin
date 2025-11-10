import { BrainIcon, Loader2Icon, SearchIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { analyzeWithAI } from "./lib/api/api";

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function App() {
  const [idea, setIdea] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setParticles((prev) => [
          ...prev.slice(-20),
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 0.5,
          },
        ]);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isSearching]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsSearching(false);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
    }
  };

  const checkIdea = async () => {
    if (!idea.trim()) return;

    setIsSearching(true);
    setIsFocused(false);

    setTimeout(() => {
      setIsSearching(false);
      setInputValue("");
    }, 3000);

    setIsThinking(true);
    setResult(null);

    try {
      const analysis = await analyzeWithAI(idea);

      setResult(analysis);
    } catch (error: unknown) {
      setResult("Ops! Algo deu errado. Tente novamente.");
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="h-full min-h-screen overflow-hidden text-gray-700 dark:text-gray-300 bg-white dark:bg-[#121212] w-full min-w-screen flex flex-col">
      {/* Gradient Orbs */}
      <div
        className="fixed w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transform: isFocused ? "scale(1.5)" : "scale(1)",
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

      <Header />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Minha ideia já existe?
            </h1>
            <p className="text-lg">
              Descubra se sua ideia é única ou se já existe algo similar no
              mercado
            </p>
          </div>

          <div className="relative mb-8">
            <div
              className={`relative transition-all duration-300 ${
                isSearching ? "scale-105" : "scale-100"
              }`}
            >
              {isSearching && (
                <div
                  className={`absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl transition-opacity duration-300 opacity-40`}
                />
              )}

              <div className="relative dark:bg-[#242424] bg-gray-50 rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-indigo-200 transition-colors duration-300">
                <div className="flex items-center p-2">
                  <div className="relative w-16 h-16 shrink-0">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div
                        className={`transition-all duration-500 bg-transparent ${
                          isFocused
                            ? "scale-110"
                            : isSearching
                              ? "scale-105"
                              : "scale-100"
                        }`}
                      >
                        {!isFocused && !isSearching && (
                          <SearchIcon
                            className="w-7 h-7 text-zinc-400 transition-all duration-300"
                            style={{
                              animation: "float 3s ease-in-out infinite",
                            }}
                          />
                        )}
                        {isFocused && !isSearching && (
                          <SparklesIcon
                            className="w-7 h-7 text-blue-400"
                            style={{
                              animation: "spin-slow 2s linear infinite",
                            }}
                          />
                        )}
                        {isSearching && (
                          <BrainIcon
                            className="w-7 h-7 text-emerald-400"
                            style={{
                              animation: "pulse-glow 1.5s ease-in-out infinite",
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Particles during search */}
                    {isSearching &&
                      particles.map((particle) => (
                        <div
                          key={particle.id}
                          className="absolute w-1 h-1 bg-emerald-400"
                          style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animation: `particle-fade 1s ease-out forwards`,
                            animationDelay: `${particle.delay}s`,
                          }}
                        />
                      ))}
                  </div>

                  <input
                    type="text"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && idea.trim() && !isThinking) {
                        e.preventDefault();
                        checkIdea();
                      }
                    }}
                    placeholder="Ex: Um app de meditação com IA personalizada..."
                    className="flex-1 px-4 py-4 text-lg outline-none placeholder-gray-400"
                    disabled={isThinking}
                  />

                  {isThinking && (
                    <button
                      onClick={checkIdea}
                      disabled={!idea.trim() || isThinking}
                      className="mr-2 px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                    >
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                    </button>
                  )}
                </div>

                {isFocused && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {isThinking && (
            <div className="dark:bg-[#242424] rounded-2xl shadow-xl p-8 animate-fade-in">
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
              <p className="text-center font-medium">Analisando sua ideia...</p>
            </div>
          )}

          {result && !isThinking && (
            <div className="dark:bg-[#242424] rounded-2xl shadow-xl p-8 animate-fade-in border-l-4 border-indigo-500">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2 text-lg">
                    Resultado da Análise
                  </h3>
                  <p className="leading-relaxed">{result}</p>
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
    </div>
  );
}
