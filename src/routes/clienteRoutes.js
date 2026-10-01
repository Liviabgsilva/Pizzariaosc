import { Router } from 'express';
import { criarCliente, buscarClientePorTelefone } from '../controllers/clienteController.js';

const router = Router();
router.post('/', criarCliente);
router.get('/buscar/:telefone', buscarClientePorTelefone);

export default router;
