import { GithubIcon } from "lucide-react";

export function Header() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
      <div>
        <h4 className="font-bold text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
          MindTwin
        </h4>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/brunofilho1mind-twin"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-2 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
          aria-label="GitHub"
        >
          {/* Background com hover */}
          <div className="absolute inset-0 bg-linear-to-r from-gray-500/0 via-gray-600/0 to-gray-500/0 group-hover:from-gray-500/10 group-hover:via-gray-600/10 group-hover:to-gray-500/10 transition-all duration-300" />
          <GithubIcon className="relative w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300" />
        </a>
      </div>
    </div>
  );
}
