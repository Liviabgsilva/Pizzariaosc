import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

router.post('/adicionar', cartController.adicionarItem);
router.get('/', cartController.listarItens);

export default router;
