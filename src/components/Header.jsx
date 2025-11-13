export default function Header({ user }) {
    return (
        <header className="flex items-center justify-between py-4">
            <div>
                <h1 className="text-xl font-semibold">Evolv.AI</h1>
                <p className="text-xs text-gray-500">Bem-vindo, {user.nome} 👋</p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">{user.nivel}</span>
                <button className="text-sm px-3 py-2 rounded-xl border">Sair</button>
            </div>
        </header>
    )
}