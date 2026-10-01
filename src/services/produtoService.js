import * as produtoRepo from '../repositories/produtoRepository.js';

export async function obterCardapio() {
  return await produtoRepo.obterCardapioAtivo();
}
