import Express from 'express';
import routes from './src/routes.js';
import cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(routes);

const PORT = 3030;
app.listen(PORT, () => {
  console.log('The server is running');
});
