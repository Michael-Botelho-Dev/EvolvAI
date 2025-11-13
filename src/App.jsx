import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Trilhas from "./pages/Trilhas";
import Missoes from "./pages/Missoes";
import Ranking from "./pages/Ranking";
import Assistant from "./pages/Assistant";

import {
  mockUser,
  mockTrilhas,
  mockMissoes,
  mockRanking,
  catalogoConteudos,
} from "./data/mocks";
import { recomendarConteudo } from "./utils/recommend";
import { getJSON, setJSON } from "./utils/storage";
import api from "./services/api";
import Login from "./pages/login";

export default function App() {
  // se não houver user salvo, App inicia no login
  const [user, setUser] = useState(() => getJSON("evolv:user", null));
  const [tab, setTab] = useState(() => getJSON("evolv:tab", "Dashboard"));

  const [trilhas, setTrilhas] = useState(mockTrilhas);
  const [missoes, setMissoes] = useState(() => getJSON("evolv:missoes", mockMissoes));
  const [ranking, setRanking] = useState(mockRanking);
  const [recomendados, setRecomendados] = useState([]);

  const [loading, setLoading] = useState(!!user); // só carrega da API se houver user
  const [error, setError] = useState(null);

  // Login handler (frontend-only)
  function handleLogin(usuarioDoBackend, { persist = true } = {}) {
    const usuario = { ...(usuarioDoBackend) };   // vem com id, nome, nivel
    setUser(usuario);
    if (persist) setJSON("evolv:user", usuario);
    setTab("Dashboard");
    setJSON("evolv:tab", "Dashboard");
    setLoading(true); // dispara carregamento inicial (trilhas, missoes, ranking, recs)
  }    

  // Logout handler
  function handleLogout() {
    localStorage.removeItem("evolv:user");
    localStorage.removeItem("evolv:missoes");
    localStorage.removeItem("evolv:tab");
    setUser(null);
  }

  // Persistências simples
  useEffect(() => {
    if (user) setJSON("evolv:user", user);
  }, [user]);
  useEffect(() => setJSON("evolv:tab", tab), [tab]);
  useEffect(() => setJSON("evolv:missoes", missoes), [missoes]);

  // Carregar dados iniciais da API quando tiver usuário
  useEffect(() => {
    if (!user) return;
    let alive = true;
    setError(null);

    Promise.all([
      api.getUser(user.id || 1).catch(() => user || mockUser),
      api.getTrilhas().catch(() => mockTrilhas),
      api.getMissoes(user.id || 1).catch(() => mockMissoes),
      api.getRanking().catch(() => mockRanking),
      api.getRecommendations(user.id || 1).catch(() =>
        recomendarConteudo(
          user.nivel || "iniciante",
          mockTrilhas,
          catalogoConteudos
        )
      ),
    ])
      .then(([u, t, m, r, rec]) => {
        if (!alive) return;
        setUser((prev) => ({ ...prev, ...u }));
        setTrilhas(t);
        setMissoes(m);
        setRanking(r);
        setRecomendados(rec);
      })
      .catch((e) => setError(e.message))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!user]);

  // Atualizar recomendações quando nível mudar
  useEffect(() => {
    if (!user) return;
    api
      .getRecommendations(user.id || 1)
      .then(setRecomendados)
      .catch(() => {
        const rec = recomendarConteudo(
          user.nivel || "iniciante",
          trilhas,
          catalogoConteudos
        );
        setRecomendados(rec);
      });
  }, [user?.nivel, trilhas]);

  // Toggle missão + XP
  async function toggleMissao(id) {
    if (!user) return;
    try {
      const alvo = missoes.find((m) => m.id === id);
      if (!alvo) return;
      const novoFeito = !alvo.feito;
      setMissoes((ms) => ms.map((m) => (m.id === id ? { ...m, feito: novoFeito } : m)));

      await api.patchMissao(id, { feito: novoFeito });

      const delta = novoFeito ? alvo.xp || 10 : -(alvo.xp || 10);
      const novoUser = { ...user, xp: Math.max(0, (user.xp || 0) + delta) };
      setUser(novoUser);
      await api.patchUser(user.id || 1, { xp: novoUser.xp });
    } catch (e) {
      setError(`Falha ao atualizar missão: ${e.message}`);
    }
  }

  // Alterar nível via Assistant
  async function handleChangeNivel(novoNivel) {
    if (!user) return;
    try {
      const novo = { ...user, nivel: novoNivel };
      setUser(novo);
      await api.patchUser(user.id || 1, { nivel: novoNivel });
    } catch (e) {
      setError(`Falha ao atualizar nível: ${e.message}`);
    }
  }

  // 🔐 Se não há user logado, mostre a tela de Login
  if (!user) return <Login onLogin={handleLogin} />;

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-sm text-gray-500">Carregando Evolv.AI…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <Header user={user} onLogout={handleLogout} />
        <Nav current={tab} onChange={setTab} />

        {error && (
          <div className="mt-3 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {tab === "Dashboard" && (
          <Dashboard
            user={user}
            missoes={missoes}
            mockTrilhas={trilhas}
            mockRanking={ranking}
            recomendados={recomendados}
            toggleMissao={toggleMissao}
          />
        )}

        {tab === "Trilhas" && <Trilhas mockTrilhas={trilhas} />}

        {tab === "Missões" && <Missoes missoes={missoes} toggleMissao={toggleMissao} />}

        {tab === "Ranking" && <Ranking mockRanking={ranking} />}

        {tab === "Assistant" && (
          <Assistant
            user={user}
            setUser={(fnOrObj) =>
              setUser((prev) => (typeof fnOrObj === "function" ? fnOrObj(prev) : fnOrObj))
            }
            recomendados={recomendados}
          />
        )}
      </div>
    </div>
  );
}
