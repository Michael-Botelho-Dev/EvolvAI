import RankingTable from '../components/RankingTable'


export default function Ranking({ mockRanking }) {
    return (
        <section className="mt-4">
            <h3 className="font-semibold mb-3">Ranking da Semana</h3>
            <RankingTable data={mockRanking} />
        </section>
    )
}