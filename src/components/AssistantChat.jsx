import { useState } from 'react'

export default function AssistantChat({ userNivel, onNivelChange, recomendados, feedbacks = [] }) {
  const [msg, setMsg] = useState('')
  const [history, setHistory] = useState([
    { role: 'assistant', text: 'Olá! Sou o Evolv Assistant. Posso sugerir conteúdos e organizar sua próxima missão.' },
  ])

  function send() {
    if (!msg.trim()) return
    const lower = msg.toLowerCase()
    let reply = 'Entendi. Continue estudando e concluindo as atividades!'
    if (lower.includes('recomenda') || lower.includes('conteúdo') || lower.includes('conteudo')) {
      reply = `Aqui vão 2 sugestões rápidas: 1) ${recomendados[0]?.titulo} · ${recomendados[0]?.tipo} (${recomendados[0]?.duracao} min); 2) ${recomendados[1]?.titulo} · ${recomendados[1]?.tipo} (${recomendados[1]?.duracao} min).`
    }
    if (lower.includes('nível') || lower.includes('nivel')) {
      reply = `Seu nível atual é: ${userNivel}. Se quiser, altere abaixo para ajustarmos as recomendações.`
    }
    setHistory((h) => [...h, { role: 'user', text: msg }, { role: 'assistant', text: reply }])
    setMsg('')
  }

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Evolv Assistant</h3>
        <select value={userNivel} onChange={(e) => onNivelChange(e.target.value)} className="text-sm border rounded-lg px-2 py-1">
          <option value="iniciante">Iniciante</option>
          <option value="intermediario">Intermediário</option>
          <option value="avancado">Avançado</option>
        </select>
      </div>

      {/* ✅ Feedbacks da IA (heurísticos) */}
      {feedbacks.length > 0 && (
        <div className="mb-3 p-3 rounded-xl bg-indigo-50 border border-indigo-200">
          <div className="text-xs font-medium text-indigo-900 mb-1">Insights para você</div>
          <ul className="text-sm text-indigo-900 list-disc ml-5 space-y-1">
            {feedbacks.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      <div className="h-40 overflow-y-auto space-y-2 mb-3">
        {history.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === 'assistant' ? 'text-gray-700' : 'text-indigo-700'}`}>
            <span className="font-medium mr-1">{m.role === 'assistant' ? 'Assistant:' : 'Você:'}</span>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Pergunte por recomendações…" className="flex-1 border rounded-xl px-3 py-2 text-sm" />
        <button onClick={send} className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm">Enviar</button>
      </div>
    </div>
  )
}
