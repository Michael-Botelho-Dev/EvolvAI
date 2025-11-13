export const mockUser = {
  id: 1,
  nome: 'Michael',
  nivel: 'iniciante', // iniciante | intermediario | avancado
  xp: 420,
  streakDias: 4,
}

export const mockTrilhas = [
  { id: 1, titulo: 'Lógica de Programação', nivel: 'iniciante', progresso: 0.4, atividades: 8, tags: ['condicionais', 'loops', 'variáveis'] },
  { id: 2, titulo: 'Python Básico', nivel: 'iniciante', progresso: 0.1, atividades: 10, tags: ['tipos', 'listas', 'funções'] },
  { id: 3, titulo: 'Git e Versionamento', nivel: 'intermediario', progresso: 0.0, atividades: 6, tags: ['git', 'github', 'branch'] },
]

export const mockMissoes = [
  { id: 1, titulo: 'Concluir 1 quiz hoje', xp: 50, feito: false },
  { id: 2, titulo: 'Estudar 20 minutos', xp: 30, feito: true },
  { id: 3, titulo: 'Praticar lógica (condicionais)', xp: 70, feito: false },
]

export const mockRanking = [
  { pos: 1, nome: 'Aline', xp: 980 },
  { pos: 2, nome: 'Rafa', xp: 770 },
  { pos: 3, nome: 'Kaique', xp: 690 },
  { pos: 4, nome: 'Michael', xp: 420 },
]

export const catalogoConteudos = [
  { id: 'c1', titulo: 'Introdução a Variáveis', nivel: 'iniciante', duracao: 15, tags: ['variáveis', 'tipos'], tipo: 'video' },
  { id: 'c2', titulo: 'Condicionais na Prática', nivel: 'iniciante', duracao: 20, tags: ['if', 'else'], tipo: 'quiz' },
  { id: 'c3', titulo: 'Loops com For', nivel: 'iniciante', duracao: 25, tags: ['for', 'while'], tipo: 'video' },
  { id: 'c4', titulo: 'Git: Iniciando um Repositório', nivel: 'intermediario', duracao: 18, tags: ['git', 'repo'], tipo: 'artigo' },
  { id: 'c5', titulo: 'Python Funções', nivel: 'iniciante', duracao: 22, tags: ['funções', 'def'], tipo: 'video' },
]
