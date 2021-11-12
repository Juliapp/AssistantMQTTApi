import { Router } from 'express';
// import { states, alarm_logs } from './database/index.js';
// import { initDB, states, alarm_logs } from './database/mongo.js';
const routes = Router();

// initDB().then(console.log).catch(console.error);

// routes.get('/', (req, res) => {
//   return res.send('Application is running');
// });

// routes.get('/states', async (req, res) => {
//   const currentStates = await states();
//   return res.json(currentStates);
// });

// routes.get('/alarmlogs', async (req, res) => {
//   const alarmLogs = await alarm_logs();
//   return res.json(alarmLogs);
// });

export default routes;
