import * as cartService from '../services/cartService.js';

export const adicionarItem = async (req, res) => {
    try {
        const { usuario_id, session_id, produto_id, quantidade, preco_unitario, sabores, borda, observacoes } = req.body;

        if (!produto_id || !preco_unitario) {
            return res.status(400).json({ error: 'Produto e preço são obrigatórios.' });
        }

        const novoItem = await cartService.processarAdicaoItem({
            usuario_id, session_id, produto_id, quantity: quantidade, preco_unitario, sabores, borda, observacoes
        });

        return res.status(201).json({ message: 'Item adicionado com sucesso!', item: novoItem });
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao adicionar item ao carrinho.' });
    }
};

export const listarItens = async (req, res) => {
    try {
        const { usuario_id, session_id } = req.query;

        if (!usuario_id && !session_id) {
            return res.status(400).json({ error: 'Identificador do usuário ou da sessão é obrigatório.' });
        }

        const itens = await cartService.buscarItensCarrinho({ usuario_id, session_id });
        return res.status(200).json(itens);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao buscar itens do carrinho.' });
    }
};
