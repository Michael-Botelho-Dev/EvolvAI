import MissionItem from '../components/MissionItem'


export default function Missoes({ missoes, toggleMissao }) {
    return (
        <section className="mt-4 space-y-3">
            <h3 className="font-semibold">Missões do Dia</h3>
            <div className="grid md:grid-cols-2 gap-3">
                {missoes.map((m) => (
                    <MissionItem key={m.id} m={m} onToggle={toggleMissao} />
                ))}
            </div>
        </section>
    )
}