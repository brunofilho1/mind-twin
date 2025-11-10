import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg z-10 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-300 dark:hover:bg-[#242424] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </button>
  );
}
