import * as clienteRepo from '../repositories/clienteRepository.js';

export async function registrarCliente(dadoCliente) {
  if (!dadoCliente) {
    throw new Error('Os dados do cliente não foram enviados.');
  }

  const { nome, telefone, endereco, bairro, referencia } = dadoCliente;

  if (!nome || !telefone || !endereco || !bairro) {
    throw new Error('Campos obrigatórios estão faltando: nome, telefone, endereço e bairro são necessários.');
  }

  const clienteFormatado = {
    nome,
    telefone,
    endereco,
    bairro,
    referencia: referencia || null
  };

  const linhasRetornadas = await clienteRepo.salvarCliente(clienteFormatado);
  
  if (!linhasRetornadas || linhasRetornadas.length === 0) {
    throw new Error('Erro ao salvar o cliente no banco de dados.');
  }

  return linhasRetornadas;
}

export async function obterDadosCliente(telefone) {
  if (!telefone) {
    throw new Error('O telefone é obrigatório para realizar a busca.');
  }

  const resultado = await clienteRepo.obterClientePorTelefone(telefone);
  
  if (!resultado || resultado.length === 0) {
    return null;
  }

  return resultado;
}
