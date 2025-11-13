export function recomendarConteudo(userNivel, trilhasAtivas, catalogo) {
    const tagsPrioritarias = new Set(
        trilhasAtivas
            .filter((t) => (userNivel === 'iniciante' ? true : t.nivel !== 'iniciante'))
            .flatMap((t) => t.tags)
    )
    return catalogo
        .filter((c) => (userNivel === 'iniciante' ? c.nivel === 'iniciante' : true))
        .map((c) => ({
            ...c,
            score: c.tags.some((tg) => tagsPrioritarias.has(tg)) ? 1 : 0,
        }))
        .sort((a, b) => b.score - a.score || a.duracao - b.duracao)
        .slice(0, 4)
}