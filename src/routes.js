import { Router } from 'express';
import { startClient } from './mqttclient.js';
import commands from './commands.js';
const mqttClient = await startClient();
const routes = Router();

routes.get('/', (req, res) => {
  mqttClient.publish('hello', 'mandeiii');
  return res.send('Application is running');
});

routes.post('/comandovoz', (req, res) => {
  // console.log(req.body?.queryResult.queryText);
  // console.log(req.body?.queryResult.parameters);

  let { queryText, intent } = req.body.queryResult;
  const publishment = commands[intent.displayName];
  console.log(publishment);
  // mqttClient.publish(publishment.topic, 'LIGAR');
  return res.send('ok').status(200);
});

export default routes;
