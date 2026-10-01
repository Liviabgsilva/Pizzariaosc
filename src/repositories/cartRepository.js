
import { query } from '../config/db.js';


export const criarItemCarrinho = async (dados) => {
    const queryText = `
        INSERT INTO carrinho (usuario_id, session_id, produto_id, quantidade, preco_unitario, sabores, borda, observacoes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const valores = [dados.usuario_id, dados.session_id, dados.produto_id, dados.quantidade || 1, dados.preco_unitario, dados.sabores, dados.borda, dados.observacoes];
    const resultado = await query(queryText, valores);
    return resultado.rows;
};

export const buscarItemIgual = async (dados) => {
    const queryText = `
        SELECT * FROM carrinho 
        WHERE (usuario_id = $1 OR session_id = $2)
          AND produto_id = $3 
          AND COALESCE(sabores, '') = COALESCE($4, '') 
          AND COALESCE(borda, '') = COALESCE($5, '')
    `;
    const valores = [dados.usuario_id, dados.session_id, dados.produto_id, dados.sabores, dados.borda];
    const resultado = await query(queryText, valores);
    return resultado.rows;
};

export const atualizarQuantidade = async (id, novaQuantidade) => {
    const queryText = `UPDATE carrinho SET quantidade = $1, atualizado_em = NOW() WHERE id = $2 RETURNING *;`;
    const resultado = await query(queryText, [novaQuantidade, id]);
    return resultado.rows;
};
