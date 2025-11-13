import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import Dashboard from './pages/Dashboard'
import Trilhas from './pages/Trilhas'
import Missoes from './pages/Missoes'
import Ranking from './pages/Ranking'
import Assistant from './pages/Assistant'
import { mockUser, mockTrilhas, mockMissoes, mockRanking, catalogoConteudos } from './data/mocks'
import { recomendarConteudo } from './utils/recommend'
import { getJSON, setJSON } from './utils/storage'

export default function App() {
  // 1) Estado inicial vindo do localStorage (fallback nos mocks)
  const [user, setUser] = useState(() => getJSON('evolv:user', mockUser))
  const [missoes, setMissoes] = useState(() => getJSON('evolv:missoes', mockMissoes))
  const [tab, setTab] = useState(() => getJSON('evolv:tab', 'Dashboard'))

  const recomendados = useMemo(
    () => recomendarConteudo(user.nivel, mockTrilhas, catalogoConteudos),
    [user.nivel]
  )

  // 2) Sempre que user/missoes/tab mudarem, salvar no localStorage
  useEffect(() => setJSON('evolv:user', user), [user])
  useEffect(() => setJSON('evolv:missoes', missoes), [missoes])
  useEffect(() => setJSON('evolv:tab', tab), [tab])

  // 3) Alternar missão (e opcional: ajustar XP ao concluir)
  function toggleMissao(id) {
    setMissoes((ms) =>
      ms.map((m) => (m.id === id ? { ...m, feito: !m.feito } : m))
    )
    // exemplo opcional de XP: +10 ao concluir, -10 ao desfazer
    setUser((u) => {
      const alvo = missoes.find((m) => m.id === id)
      if (!alvo) return u
      const delta = alvo.feito ? -10 : +10
      return { ...u, xp: Math.max(0, (u.xp || 0) + delta) }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <Header user={user} />
        <Nav current={tab} onChange={setTab} />

        {tab === 'Dashboard' && (
          <Dashboard
            user={user}
            missoes={missoes}
            mockTrilhas={mockTrilhas}
            mockRanking={mockRanking}
            recomendados={recomendados}
            toggleMissao={toggleMissao}
          />
        )}

        {tab === 'Trilhas' && <Trilhas mockTrilhas={mockTrilhas} />}

        {tab === 'Missões' && (
          <Missoes missoes={missoes} toggleMissao={toggleMissao} />
        )}

        {tab === 'Ranking' && <Ranking mockRanking={mockRanking} />}

        {tab === 'Assistant' && (
          <Assistant
            user={user}
            setUser={setUser} // o Assistant já altera nível; isso agora persiste
            recomendados={recomendados}
          />
        )}

        <footer className="text-xs text-gray-400 py-10 text-center">
          Evolv.AI — MVP Frontend (React + Tailwind)
        </footer>
      </div>
    </div>
  )
}
