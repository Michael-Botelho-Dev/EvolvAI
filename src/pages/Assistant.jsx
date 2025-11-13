
import { useEffect } from 'react'
import AssistantChat from '../components/AssistantChat'
import api from '../services/api'

function makeFeedbacks(user, recomendados) {
  const first = recomendados?.[0]
  const short = recomendados.find(c => (c?.duracao || 999) <= 20)
  const nivel = (user?.nivel || 'iniciante')

  const msgs = []
  if (short) msgs.push(`Sugestão rápida: "${short.titulo}" (${short.duracao} min) para manter o ritmo.`)
  if (first) msgs.push(`Como você está em ${nivel}, priorize "${first.titulo}" — alinhado às suas trilhas.`)
  msgs.push(`Dica: conclua 1 conteúdo curto por dia para aumentar seu streak.`)
  return msgs
}

export default function Assistant({ user, setUser, recomendados }) {
  // envia evento quando o usuário abre a tela do Assistant
  useEffect(() => {
    if (!user?.id) return
    api.postEvent({ userId: user.id, type: 'opened_assistant' }).catch(() => {})
  }, [user?.id])

  const feedbacks = makeFeedbacks(user, recomendados)

  return (
    <section className="mt-4 grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <AssistantChat
          userNivel={user.nivel}
          onNivelChange={(nv) => setUser((u) => ({ ...u, nivel: nv }))}
          recomendados={recomendados}
          feedbacks={feedbacks}
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
