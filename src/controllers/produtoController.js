import { query } from '../config/db.js';


export async function listarCardapio(req, res) {
    const queryText = `
        SELECT id, nome, descricao, preco, categoria, tamanho 
        FROM public.produtos 
        WHERE disponivel = TRUE 
        ORDER BY categoria, nome;
    `;

    try {
        const resultado = await query(queryText);
        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar cardápio:', error);
        return res.status(500).json({ erro: 'Erro interno ao carregar o cardápio.' });
    }
}
