export default function RankingTable({ data }) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white">
            <table className="w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left p-3">Pos</th>
                        <th className="text-left p-3">Nome</th>
                        <th className="text-right p-3">XP</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((r) => (
                        <tr key={r.pos} className="border-t">
                            <td className="p-3">{r.pos}</td>
                            <td className="p-3">{r.nome}</td>
                            <td className="p-3 text-right">{r.xp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}