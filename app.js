import Express from 'express';
import routes from './src/routes.js';
import cors from 'cors';
import timeout from 'connect-timeout';

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(timeout('300s'));
app.use(routes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log('The server is running');
});
