import { Router } from 'express';
import { startClient, restartCron, lastPing, time_cron } from './mqttclient.js';
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
    return res.json({
      speech:
        'Cant find any previous game played between Kings and ' +
        parameters.team,
      displayText:
        'Cant find any previous game played between Kings and ' +
        parameters.team,
      source: 'game schedule',
    });
  }

  return res.send('not ok').status(404);
});

routes.get('/ping', (req, res) => {
  let now = Date.now();
  let time_milisseconds = time_cron * 60 * 1000;
  let ping = now < time_milisseconds + lastPing;
  res.json({ isOnline: ping });
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
