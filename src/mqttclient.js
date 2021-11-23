// var mqtt = require('mqtt')
import mqtt from 'mqtt';
import dotenv from 'dotenv';
dotenv.config();

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

  return client;
};

// export default client;
