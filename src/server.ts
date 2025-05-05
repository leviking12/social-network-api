import express from 'express';
import routes from './routes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}/api`);
});
