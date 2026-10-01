import { Router } from 'express';
import { criarPedido, listarPedidosComClientes, atualizarStatusPedido } from '../controllers/pedidoController.js';

const router = Router();
router.post('/', criarPedido);
router.get('/painel', listarPedidosComClientes);
router.patch('/:id/status', atualizarStatusPedido);

export default router;
