export default function Nav({ current, onChange }) {
    const tabs = ['Dashboard', 'Trilhas', 'Missões', 'Ranking', 'Assistant']
    return (
        <nav className="flex gap-2 mt-2">
            {tabs.map((t) => (
                <button
                    key={t}
                    onClick={() => onChange(t)}
                    className={`px-3 py-2 rounded-xl text-sm border ${current === t ? 'bg-gray-900 text-white' : 'bg-white'}`}
                >
                    {t}
                </button>
            ))}
        </nav>
    )
}