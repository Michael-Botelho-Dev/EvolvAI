export default function MissionItem({ m, onToggle }) {
    return (
        <label className="flex items-center gap-3 p-3 rounded-xl border bg-white hover:shadow-sm">
            <input type="checkbox" checked={m.feito} onChange={() => onToggle(m.id)} />
            <div className="flex-1">
                <div className={`text-sm ${m.feito ? 'line-through text-gray-400' : ''}`}>{m.titulo}</div>
                <div className="text-xs text-gray-400">{m.xp} XP</div>
            </div>
        </label>
    )
}