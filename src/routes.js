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

  console.log(req.body);

  if (req.body.queryResult) {
    // let { intent } = req.body.queryResult;
    let queryResult = req.body.queryResult;
    let { intent } = queryResult;

    const publishment = commands[intent.displayName];
    // console.log(publishment);
    let { topic, message } = publishment;
    let mqttMessage = messaage ? message : queryResult.parameters.params;
    console.log(topic, mqttMessage);
    // mqttClient.publish(topic, message);
    console.log('return 200');
    return res.send('ok').status(200);
  }

  console.log('return 400');
  return res.send('not ok').status(404);
});

export default routes;
