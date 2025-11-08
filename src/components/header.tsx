import { GithubIcon } from "lucide-react";

export function Header() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
      <div>
        <h4 className="font-bold text-2xl text-gray-900 tracking-tight">
          MinTwin
        </h4>
      </div>

      <a
        href="https://github.com/brunofilho1"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
        aria-label="GitHub"
      >
        <GithubIcon className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors" />
      </a>
    </div>
  );
}
