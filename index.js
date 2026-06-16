import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import authorRoutes from './src/routes/authorRoutes.js';
import bookRoutes from './src/routes/bookRoutes.js';
import readerRoutes from './src/routes/readerRoutes.js';
import loanRoutes from './src/routes/loanRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/readers', readerRoutes);
app.use('/api/loans', loanRoutes);
app.get('/test', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});