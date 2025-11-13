import TrailCard from '../components/TrailCard'


export default function Trilhas({ mockTrilhas }) {
    return (
        <section className="mt-4 space-y-3">
            <h3 className="font-semibold">Suas Trilhas</h3>
            <div className="grid md:grid-cols-3 gap-3">
                {mockTrilhas.map((t) => (
                    <TrailCard key={t.id} trilha={t} />
                ))}
            </div>
        </section>
    )
}