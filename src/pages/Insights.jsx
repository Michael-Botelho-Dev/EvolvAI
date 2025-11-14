// src/pages/Insights.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Insights({ user }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    api.getInsights(user.id)
      .then(setData)
      .catch(e => {
      console.error('Insights error:', e);  
      setErr(e.message || 'Erro ao carregar insights');
    });
  }, [user?.id]);

  if (err) {
    return <div className="mt-3 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">{err}</div>
  }

  if (!data) {
    return <div className="text-sm text-gray-500">Carregando insights…</div>
  }

  const { nivelCounts, missoes, catalogo, recsPreview, streak, insights } = data;

  return (
    <section className="mt-4 grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        <div className="rounded-2xl border bg-white p-4">
          <h3 className="font-semibold mb-2">Insights principais</h3>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {insights.map((t,i) => <li key={i}>{t}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <h3 className="font-semibold mb-2">Prévia de recomendações</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {recsPreview.map((r) => (
              <li key={r.id} className="flex items-center justify-between">
                <span>{r.titulo} · {r.tipo} · {r.duracao} min</span>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">score {r.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border bg-white p-4">
          <h4 className="font-semibold mb-2">Resumo</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Missões: {missoes.concluidas}/{missoes.total} ({missoes.taxaConclusao}%)</li>
            <li>Catálogo: {catalogo.curtos}/{catalogo.total} curtos ({catalogo.pctCurtos}%)</li>
            <li>Níveis: Ini {nivelCounts.iniciante} · Int {nivelCounts.intermediario} · Avan {nivelCounts.avancado}</li>
            <li>Streak: média {streak.media} (máx. {streak.max})</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
