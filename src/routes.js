import { Router } from 'express';
import { startClient } from './mqttclient.js';

const mqttClient = await startClient();
const routes = Router();

routes.get('/', (req, res) => {
  mqttClient.publish('hello', 'mandeiii');
  return res.send('Application is running');
});

routes.get('/comandovoz/arcondicionado', (req, res) => {
  mqttClient.publish('ARCONDICIONADO/LIGAR', 'LIGAR');
  return res.send('OK');
});

export default routes;
