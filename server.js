import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import rotasPizzaria from './src/routes/index.js';

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
