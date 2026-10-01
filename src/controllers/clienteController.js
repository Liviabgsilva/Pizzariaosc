import { query } from '../config/db.js';


export async function criarCliente(req, res) {
    const { nome, telefone, endereco, bairro, referencia } = req.body;

    const queryText = `
        INSERT INTO public.clientes (nome, telefone, endereco, bairro, referencia)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, nome;
    `;
    const valores = [nome, telefone, endereco, bairro, referencia];

    try {
        const resultado = await query(queryText, valores);
        return res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso! 👤',
            cliente: resultado.rows[0]
        });
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        if (error.code === '23505') {
            return res.status(400).json({ erro: 'Este telefone já está cadastrado.' });
        }
        return res.status(500).json({ erro: 'Erro interno ao cadastrar cliente.' });
    }
}

export async function buscarClientePorTelefone(req, res) {
    const { telefone } = req.params;
    const queryText = 'SELECT * FROM public.clientes WHERE telefone = \$1';

    try {
        const resultado = await query(queryText, [telefone]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }
        return res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        return res.status(500).json({ erro: 'Erro interno ao buscar cliente.' });
    }
}
