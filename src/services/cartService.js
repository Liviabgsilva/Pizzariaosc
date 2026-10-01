import * as cartRepository from '../repositories/cartRepository.js';

export const processarAdicaoItem = async (dadosItem) => {
    const itensEncontrados = await cartRepository.buscarItemIgual(dadosItem);

    if (itensEncontrados && itensEncontrados.length > 0) {
        const itemExistente = itensEncontrados[0];
        const novaQuantidade = itemExistente.quantidade + (dadosItem.quantidade || 1);
        return await cartRepository.atualizarQuantidade(itemExistente.id, novaQuantidade);
    }

    return await cartRepository.criarItemCarrinho(dadosItem);
};

export const buscarItensCarrinho = async ({ usuario_id, session_id }) => {
    const dados = { usuario_id, session_id, produto_id: null, sabores: null, borda: null };
    return await cartRepository.buscarItemIgual(dados);
};
