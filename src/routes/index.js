import express from 'express';
import cartRoutes from './cartRoutes.js';
import clienteRoutes from './clienteRoutes.js';
import pedidoRoutes from './pedidoRoutes.js';
import produtoRoutes from './produtoRoutes.js';

const router = express.Router();

router.use('/carrinho', cartRoutes);
router.use('/clientes', clienteRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/produtos', produtoRoutes);

export default router;

