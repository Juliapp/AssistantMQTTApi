// var mqtt = require('mqtt')
import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { CronJob } from 'cron';
dotenv.config();

export var cron;
export var lastPing;
export var time_cron = 1;

export function restartCron(time) {
  time_cron = time;
  cron.stop();

  cron = new CronJob(`*/${time} * * * *`, function () {
    client.publish('PINGREQUEST', 'pingrequest');
  });
  cron.start();
}

export const startClient = async () => {
  let options = {
    host: process.env.HIHOST,
    port: process.env.HIPORT,
    protocol: 'mqtts',
    username: process.env.HIUSERNAME,
    password: process.env.HIPASSWORD,
  };

  var client = await mqtt.connect(process.env.HOST, options);

  client.on('connect', function () {
    console.log('Connected to mqtt broker');

    client.subscribe('PINGRESPONSE');
    client.publish('PINGREQUEST', 'pingrequest');

    cron = new CronJob(`* * * * *`, function () {
      client.publish('PINGREQUEST', 'pingrequest');
    });

    cron.start();
  });

  client.on('packetsend', (event) => {
    console.log(
      `MESSAGE SENT TO BROKER TYPE: ${event.cmd} ${
        event.topic && event.payload
          ? `| TOPIC: ${event.topic} and PAYLOAD: ${event.payload}`
          : ''
      }`
    );
  });

  client.on('disconnect', (e) => {
    console.log('disconnect');
    console.log(e);
  });

  client.on('end', (e) => {
    console.log('end');
    console.log(e);
  });

  client.on('offline', (e) => {
    console.log('offline');
    console.log(e);
  });

  client.on('error', (err) => {
    console.log('error');
    console.log(err);
  });

  client.on('message', (aa) => {
    console.log('pingou');
    lastPing = Date.now();
  });

  return client;
};

// export default client;
