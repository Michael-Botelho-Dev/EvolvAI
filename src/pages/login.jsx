import { useState } from "react";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("iniciante");
  const [lembrar, setLembrar] = useState(true);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!nome.trim()) {
      setErro("Digite seu nome.");
      return;
    }
    try {
      setLoading(true);
      // chama backend: cria/retorna usuário
      const user = await api.login({ nome: nome.trim(), nivel });
      onLogin(user, { persist: lembrar }); // entrega usuário real (com id)
    } catch (err) {
      setErro("Falha ao entrar. Verifique a API. " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 px-4">
      <div className="w-full max-w-sm p-6 rounded-2xl border bg-white">
        <h1 className="text-xl font-semibold">Evolv.AI</h1>
        <p className="text-sm text-gray-500 mb-6">
          Entre para começar sua jornada de aprendizado.
        </p>

        {erro && (
          <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-2">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full border rounded-xl px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Nível</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm"
            >
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={lembrar}
              onChange={(e) => setLembrar(e.target.checked)}
            />
            Lembrar de mim neste dispositivo
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 text-sm px-3 py-2 rounded-xl bg-gray-900 text-white disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
