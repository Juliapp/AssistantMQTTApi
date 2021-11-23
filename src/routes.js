import { Router } from 'express';
import { startClient } from './mqttclient.js';
import commands from './commands.js';
const mqttClient = await startClient();
const routes = Router();

routes.get('/', (req, res) => {
  return res.send('Application is running');
});

routes.post('/comandovoz', (req, res) => {
  if (req.body.queryResult) {
    // let { intent } = req.body.queryResult;
    let queryResult = req.body.queryResult;
    let { intent } = queryResult;

    const publishment = commands[intent.displayName];
    let { topic, message } = publishment;

    let mqttMessage = message ? message : queryResult.parameters.param;
    mqttClient.publish(topic, `${mqttMessage}`);
    return res.send('ok').status(200);
  }

  return res.send('not ok').status(404);
});

export default routes;
