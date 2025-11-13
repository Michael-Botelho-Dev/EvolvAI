const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status} ${res.statusText} – ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

// GETs
export const api = {
  getHealth: () => request('/health'),
  getUser: (id = 1) => request(`/user/${id}`),
  getTrilhas: () => request('/trilhas'),
  getMissoes: (usuarioId = 1) => request(`/missoes?usuarioId=${usuarioId}`),
  getRanking: () => request('/ranking'),
  getRecommendations: (userId = 1) => request(`/recommendations?userId=${userId}`),

  // PATCHs
  patchUser: (id = 1, body = {}) =>
    request(`/user/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  patchMissao: (id, body = {}) =>
    request(`/missoes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),

   // login
  login: ({ nome, nivel }) =>
    request('/login', { method: 'POST', body: JSON.stringify({ nome, nivel }) }),
};

export default api;