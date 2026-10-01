import { query } from '../config/db.js';


export async function obterCardapioAtivo() {
  const queryText = `
    SELECT id, nome, descricao, preco, categoria, tamanho 
    FROM public.produtos 
    WHERE disponivel = TRUE 
    ORDER BY categoria, nome;
  `;
  const result = await query(queryText);
  return result.rows;
}
