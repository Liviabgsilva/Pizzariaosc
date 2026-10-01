import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import rotasPizzaria from './routes/index.js';
import rotasPizzaria from './src/routes/index.js';
import { query } from './src/config/db.js';

query('SELECT NOW()')
  .then(() => console.log('🚀 BANCO DE DADOS CONECTADO COM SUCESSO!'))
  .catch(err => {
    console.error('❌ ERRO CRÍTICO DE CONEXÃO COM O BANCO:', err.message);
  });


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', rotasPizzaria);

app.get('/', (req, res) => {
  res.status(200).json({ sistema: '🍕 API da Pizzaria online' });
});

app.listen(PORT, () => {
  console.log(`🍕 Servidor rodando na porta ${PORT}`);
});
