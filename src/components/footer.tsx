export function Footer() {
  return (
    <div className="w-full bg-gray-50 dark:bg-[#242424] mx-auto p-4 mt-16">
      <div className="text-center">
        <p className="text-sm">
          Feito com <span title="café">☕</span> por{" "}
          <span className="font-semibold text-indigo-600">Bruno Filho</span>
        </p>
        <p className="text-gray-400 text-xs mt-2">
          © {new Date().getFullYear()} MindTwin. Validando ideias com
          inteligência.
        </p>
      </div>
    </div>
  );
}
