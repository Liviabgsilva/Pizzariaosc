import { Router } from 'express';
import { listarCardapio } from '../controllers/produtoController.js';

const router = Router();
router.get('/', listarCardapio);

export default router;
