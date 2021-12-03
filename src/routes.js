import { Router } from 'express';
import {
  startClient,
  restartCron,
  time_cron,
  isOnline,
  getState,
} from './mqttclient.js';
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
    let { displayName } = intent;

    if (displayName === 'Estado') {
      if (!isOnline()) {
        return res.json({
          fulfillmentText: 'Sem comunicação com a raspberry',
        });
      }

      let device = queryResult.parameters.device;
      const status = getState(device);
      console.log(status);
      if (status) {
        return res.json({
          fulfillmentText: status,
        });
      }
      //////  RESPONDER
    } else {
      const publishment = commands[displayName];
      let { topic, message, fulfillmentText } = publishment;

      let mqttMessage = message ? message : queryResult.parameters.param;
      mqttClient.publish(topic, `${mqttMessage}`);

      if (fulfillmentText) {
        return res.json({
          fulfillmentText,
        });
      }
    }

    return res.send('not ok').status(404);
  }
});

routes.get('/ping', (req, res) => {
  res.json({ isOnline: isOnline() });
});

routes.get('/timecron', (req, res) => {
  res.json({ time_cron });
});

routes.post('/reset-ping', (req, res) => {
  const { time_cron } = req.body;
  restartCron(time_cron);
  res.json({ ping: 'status changed' });
});

export default routes;
