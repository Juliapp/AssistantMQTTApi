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

  console.log('conseguiu');
  // let { queryText, queryText } = req.body.queryResult;
  // const publishment = commands[queryText];
  // mqttClient.publish(publishment.topic, 'LIGAR');
  return res.status(200);
});

export default routes;
