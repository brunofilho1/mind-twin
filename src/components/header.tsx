import { GithubIcon } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <div className="w-full bg-gray-50 dark:bg-[#242424] mx-auto p-4 flex items-center justify-between">
      <div>
        <h4 className="font-bold text-2xl tracking-tight text-text">
          MindTwin
        </h4>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href="https://github.com/brunofilho1/mind-twin"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-2 rounded-lg overflow-hidden text-gray-700 dark:text-gray-300 bg-transparent dark:hover:bg-[#242424] hover:bg-gray-300/50 transition-all duration-300"
          aria-label="GitHub"
        >
          {/* Background com hover */}
          <GithubIcon className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
