import { query } from '../config/db.js';


export async function salvarPedido({ cliente_id, forma_pagamento, taxa_entrega, valor_total, observacoes }) {
  const queryText = `
    INSERT INTO public.pedidos (cliente_id, forma_pagamento, taxa_entrega, valor_total, observacoes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
  const result = await query(queryText, [cliente_id, forma_pagamento, taxa_entrega, valor_total, observacoes]);
  return result.rows[0];
}

export async function obterPedidosComClientes() {
  const queryText = `
    SELECT 
      p.id AS numero_pedido,
      c.nome AS nome_cliente,
      c.telefone AS telefone_cliente,
      p.status,
      p.forma_pagamento,
      p.valor_total,
      p.data_hora,
      p.observacoes
    FROM public.pedidos p
    INNER JOIN public.clientes c ON p.cliente_id = c.id
    ORDER BY p.data_hora DESC;
  `;
  const result = await query(queryText);
  return result.rows;
}

export async function mudarStatusPedido(id, status) {
  const queryText = `
    UPDATE public.pedidos 
    SET status = $1 
    WHERE id = $2 
    RETURNING id, status;
  `;
  const result = await query(queryText, [status, id]);
  return result.rows[0];
}
