const TABS = [
  "Global settings",
  "Features",
  "Activity log",
  "Security",
  "SafetyCulture AI",
  "Login",
]

export function PageHeader() {
  return (
    <div>
      <h1 className="text-[28px] font-bold leading-9 tracking-[-0.75px] text-text-default">
        Organization settings
      </h1>
      <nav className="mt-6 flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium -mb-px transition-colors ${
              tab === "Login"
                ? "border-b-2 border-accent text-text-default"
                : "text-text-weak hover:text-text-default"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  )
}
