export default function Nav({ current, onChange }) {
  const tabs = ["Dashboard", "Trilhas", "Missões", "Ranking", "Assistant", "Insights"]; 
  return (
    <nav className="flex gap-2 border-b">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-3 py-2 text-sm ${current === t ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
        >
          {t}
        </button>
      ))}
    </nav>
  )
}
