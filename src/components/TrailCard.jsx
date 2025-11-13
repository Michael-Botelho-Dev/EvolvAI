import ProgressBar from './ProgressBar'


export default function TrailCard({ trilha }) {
    return (
        <div className="p-4 rounded-2xl border bg-white hover:shadow transition">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">{trilha.titulo}</h3>
                    <p className="text-xs text-gray-500">Nível: {trilha.nivel}</p>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{trilha.atividades} atividades</span>
            </div>
            <div className="mt-3">
                <ProgressBar value={trilha.progresso} />
                <div className="text-xs text-gray-500 mt-1">{Math.round(trilha.progresso * 100)}% concluído</div>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
                {trilha.tags.map((t) => (
                    <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                        {t}
                    </span>
                ))}
            </div>
            <button className="mt-4 text-sm px-3 py-2 rounded-xl bg-indigo-600 text-white">Continuar trilha</button>
        </div>
    )
}