import AssistantChat from '../components/AssistantChat'

export default function Assistant({ user, setUser, recomendados }) {
    return (
        <section className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
                <AssistantChat
                    userNivel={user.nivel}
                    onNivelChange={(nv) => setUser((u) => ({ ...u, nivel: nv }))}
                    recomendados={recomendados}
                />
            </div>
            <div className="space-y-3">
                <div className="rounded-2xl border bg-white p-4">
                    <h3 className="font-semibold mb-2">Dicas rápidas</h3>
                    <ul className="text-sm list-disc ml-5 text-gray-600">
                        <li>Estude 20–30 min por sessão.</li>
                        <li>Alterne teoria e prática.</li>
                        <li>Revise erros de quizzes.</li>
                    </ul>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                    <h3 className="font-semibold mb-2">Metas semanais</h3>
                    <ul className="text-sm text-gray-600">
                        <li>Concluir 3 conteúdos</li>
                        <li>1 projeto prático</li>
                        <li>2 quizzes com ≥ 80%</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
