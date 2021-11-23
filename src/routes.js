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

  let { intent } = req.body.queryResult;
  const publishment = commands[intent.displayName];
  console.log(queryResult);
  // console.log(publishment);
  let { topic, message } = publishment;
  let mqttMessage = messaage ?? queryResult.parameters.params;
  console.log(topic, mqttMessage);
  // mqttClient.publish(topic, message);
  return res.send('ok').status(200);
});

export default routes;
