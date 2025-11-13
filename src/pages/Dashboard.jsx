import StatCard from '../components/StatCard'
import TrailCard from '../components/TrailCard'
import MissionItem from '../components/MissionItem'
import RankingTable from '../components/RankingTable'


export default function Dashboard({ user, missoes, mockTrilhas, mockRanking, recomendados, toggleMissao }) {
    return (
        <section className="grid md:grid-cols-3 gap-4 mt-4">
            <StatCard title="XP Total" value={user.xp} subtitle={`Streak: ${user.streakDias} dias`} />
            <StatCard title="Trilhas Ativas" value={mockTrilhas.length} subtitle="Mantenha o foco!" />
            <StatCard title="Missões do Dia" value={missoes.filter((m) => !m.feito).length} subtitle="Você consegue!" />


            <div className="md:col-span-2 space-y-4">
                <div className="rounded-2xl border bg-white p-4">
                    <h3 className="font-semibold mb-3">Trilhas em Andamento</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                        {mockTrilhas.map((t) => (
                            <TrailCard key={t.id} trilha={t} />
                        ))}
                    </div>
                </div>


                <div className="rounded-2xl border bg-white p-4">
                    <h3 className="font-semibold mb-3">Recomendado para você</h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {recomendados.map((c) => (
                            <li key={c.id} className="p-4 rounded-2xl border bg-white hover:shadow">
                                <div className="text-sm font-medium">{c.titulo}</div>
                                <div className="text-xs text-gray-500 mt-1">{c.tipo} · {c.duracao} min · {c.nivel}</div>
                                <button className="mt-3 text-sm px-3 py-2 rounded-xl bg-gray-900 text-white">Começar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className="space-y-4">
                <div className="rounded-2xl border bg-white p-4">
                    <h3 className="font-semibold mb-3">Missões do Dia</h3>
                    <div className="space-y-2">
                        {missoes.map((m) => (
                            <MissionItem key={m.id} m={m} onToggle={toggleMissao} />
                        ))}
                    </div>
                </div>


                <div className="rounded-2xl border bg-white p-4">
                    <h3 className="font-semibold mb-3">Ranking (Top 4)</h3>
                    <RankingTable data={mockRanking} />
                </div>
            </div>
        </section>
    )
}