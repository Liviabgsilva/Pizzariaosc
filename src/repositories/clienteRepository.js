
import { query } from '../config/db.js';


export async function salvarCliente({ nome, telefone, endereco, bairro, referencia }) {
  const queryText = `
    INSERT INTO public.clientes (nome, telefone, endereco, bairro, referencia)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nome, telefone, endereco, bairro, referencia;
  `;
  const result = await query(queryText, [nome, telefone, endereco, bairro, referencia]);
  return result.rows[0]; 
}

export async function obtenerClientePorTelefone(telefone) {
  const queryText = 'SELECT * FROM public.clientes WHERE telefone = \$1;';
  const result = await query(queryText, [telefone]);
  return result.rows[0] || null; 
}

export async function obterClientePorId(id) {
  const queryText = 'SELECT * FROM public.clientes WHERE id = \$1;';
  const result = await query(queryText, [id]);
  return result.rows[0] || null; 
}
