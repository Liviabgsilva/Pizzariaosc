import { query } from '../config/db.js';


export async function criarPedido(req, res) {
    const { cliente_id, forma_pagamento, taxa_entrega, valor_total, observacoes, session_id } = req.body;

    const queryText = `
        INSERT INTO public.pedidos (cliente_id, forma_pagamento, taxa_entrega, valor_total, observacoes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `;
    const valores = [cliente_id, forma_pagamento, taxa_entrega, valor_total, observacoes];

    try {
        const resultado = await query(queryText, valores);
        const pedidoId = resultado.rows[0].id;

        if (cliente_id) {
            await query('DELETE FROM carrinho WHERE usuario_id = \$1', [cliente_id]);
        } else if (session_id) {
            await query('DELETE FROM carrinho WHERE session_id = \$1', [session_id]);
        }

        return res.status(201).json({
            mensagem: 'Pedido enviado para a cozinha! 🍕',
            pedido_id: pedidoId
        });
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return res.status(500).json({ erro: 'Erro interno ao processar o pedido.' });
    }
}

export async function listarPedidosComClientes(req, res) {
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

    try {
        const resultado = await query(queryText);
        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao listar pedidos com clientes:', error);
        return res.status(500).json({ erro: 'Erro interno ao gerar painel de pedidos.' });
    }
}

export async function atualizarStatusPedido(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const queryText = 'UPDATE public.pedidos SET status = \$1 WHERE id = \$2 RETURNING id, status';

    try {
        const resultado = await query(queryText, [status, id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }
        return res.status(200).json({
            mensagem: 'Status atualizado!',
            pedido: resultado.rows[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        return res.status(500).json({ erro: 'Erro interno ao atualizar status.' });
    }
}
