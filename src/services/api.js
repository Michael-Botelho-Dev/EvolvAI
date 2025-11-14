// src/services/api.js

function resolveBase() {
  // Preferir .env local (Vite)
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  // Fallback: usar o mesmo host do front, porta 4000
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:4000/api`;
}

const API_BASE = resolveBase();

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    mode: 'cors',
    ...options,
  });

  if (!res.ok) {
    let text = '';
    try { text = await res.text(); } catch {}
    console.error(`[API] ${res.status} ${res.statusText} @ ${path} — ${text}`);
    throw new Error(`API ${res.status} ${res.statusText} – ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  // Health
  getHealth: () => request('/health'),

  // Usuário
  getUser: (id = 1) => request(`/user/${id}`),
  patchUser: (id = 1, body = {}) =>
    request(`/user/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),

  // Trilhas / Missões / Ranking
  getTrilhas: () => request('/trilhas'),
  getMissoes: (usuarioId = 1) => request(`/missoes?usuarioId=${usuarioId}`),
  patchMissao: (id, body = {}) =>
    request(`/missoes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  getRanking: () => request('/ranking'),

  // Recomendações
  getRecommendations: (userId = 1) => request(`/recommendations?userId=${userId}`),

  // Eventos (telemetria)
  postEvent: (body) => request('/events', { method: 'POST', body: JSON.stringify(body) }),

  // Login
  login: ({ nome, nivel }) =>
    request('/login', { method: 'POST', body: JSON.stringify({ nome, nivel }) }),

  // Insights
  getInsights: (userId = 1) => request(`/insights?userId=${userId}`),
  
};

export default api;
