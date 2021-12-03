// var mqtt = require('mqtt')
import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { CronJob } from 'cron';
dotenv.config();

const TOPIC_ILUMINACAO_JARDIM = 'JARDIM/ILUMINACAO/VALOR';
const TOPIC_ILUMINACAO_JARDIM_MAX = 'JARDIM/ILUMINACAO/HORAMAX';
const TOPIC_ILUMINACAO_JARDIM_MIN = 'JARDIM/ILUMINACAO/HORAMIN';
const TOPIC_ILUMINACAO_INTERNO = 'INTERNO/ILUMINACAO/VALOR';
const TOPIC_ILUMINACAO_GARAGEM = 'GARAGEM/ILUMINACAO/VALOR';
const TOPIC_ILUMINACAO_GARAGEM_MAX = 'GARAGEM/ILUMINACAO/HORAMAX';
const TOPIC_ILUMINACAO_GARAGEM_MIN = 'GARAGEM/ILUMINACAO/HORAMIN';
const TOPIC_ARCONDICIONADO = 'AC/VALOR';
const TOPIC_ARCONDICIONADO_TEMPERATURA = 'AC/TEMPERATURA';
const TOPIC_ARCONDICIONADO_MAX = 'AC/TEMPERATURAMAX = ';
const TOPIC_ARCONDICIONADO_MIN = 'AC/TEMPERATURAMIN';
const TOPIC_ARCONDICIONADO_AUSENCIA_PESSOAS = 'AC/TEMPOAUSENCIAPESSOAS';
const TOPIC_ALARME = 'ALARME/VALOR';
const TOPIC_AUTOMATIC_MODE_VALOR = 'AUTOMATICMODE/VALOR';

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

export function isOnline() {
  let now = Date.now();
  let time_milisseconds = time_cron * 60 * 1000;
  return now < time_milisseconds + lastPing;
}

let statusDispositivos = [
  {
    status: '',
    trigger: '"modo automatico"',
  },
  {
    status: '',
    trigger: 'iluminação do jardim',
  },
  {
    status: '',
    trigger: 'hora maxima jardim',
  },
  {
    status: '',
    trigger: 'hora minima jardim',
  },
  {
    status: '',
    trigger: 'luz interna',
  },
  {
    status: '',
    trigger: 'luz da garagem',
  },
  {
    status: '',
    trigger: 'hora maxima luz da garagem',
  },
  {
    status: '',
    trigger: 'hora minima luz da garagem',
  },
  {
    status: '',
    trigger: 'ar condicionado',
  },
  {
    status: '',
    trigger: 'temperatura do ar condicionado',
  },
  {
    status: '',
    trigger: 'temperatura maxima do ar condicionado',
  },
  {
    status: '',
    trigger: 'temperatura minima do ar condicionado',
  },
  {
    status: '',
    trigger: 'tempo do ar condicionado com ausencia de pessoas',
  },
  {
    status: '',
    trigger: 'alarme',
  },
];

export function getState(input) {
  console.log;

  const status =
    statusDispositivos.find((value) => {
      console.log('buscando');
      value.trigger.localeCompare(input, undefined, {
        sensitivity: 'base',
      });
      return value.status;
    }) || 'Não encontrado';

  return status.status ? status.status : status;
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
    client.subscribe(TOPIC_ILUMINACAO_JARDIM);
    client.subscribe(TOPIC_ILUMINACAO_JARDIM_MAX);
    client.subscribe(TOPIC_ILUMINACAO_JARDIM_MIN);
    client.subscribe(TOPIC_ILUMINACAO_INTERNO);
    client.subscribe(TOPIC_ILUMINACAO_GARAGEM);
    client.subscribe(TOPIC_ILUMINACAO_GARAGEM_MAX);
    client.subscribe(TOPIC_ILUMINACAO_GARAGEM_MIN);
    client.subscribe(TOPIC_ARCONDICIONADO);
    client.subscribe(TOPIC_ARCONDICIONADO_TEMPERATURA);
    client.subscribe(TOPIC_ARCONDICIONADO_MAX);
    client.subscribe(TOPIC_ARCONDICIONADO_MIN);
    client.subscribe(TOPIC_ARCONDICIONADO_AUSENCIA_PESSOAS);
    client.subscribe(TOPIC_ALARME);
    client.subscribe(TOPIC_AUTOMATIC_MODE_VALOR);

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

  client.on('message', (topic, message) => {
    const convertedPayload =
      message.toString() === '1' ||
      message.toString() === 'true' ||
      message.toString() === true
        ? 'Ligado'
        : 'Desligado';

    switch (topic) {
      case 'PINGRESPONSE':
        lastPing = Date.now();
        break;
      case TOPIC_AUTOMATIC_MODE_VALOR:
        statusDispositivos[0].status = convertedPayload;
        break;
      case TOPIC_ILUMINACAO_JARDIM:
        statusDispositivos[1].status = convertedPayload;
        break;
      case TOPIC_ILUMINACAO_JARDIM_MAX:
        statusDispositivos[2].status = message.toString();
        break;
      case TOPIC_ILUMINACAO_JARDIM_MIN:
        statusDispositivos[3].status = message.toString();
        break;
      case TOPIC_ILUMINACAO_INTERNO:
        statusDispositivos[4].status = convertedPayload;
        break;
      case TOPIC_ILUMINACAO_GARAGEM:
        statusDispositivos[5].status = convertedPayload;
        break;
      case TOPIC_ILUMINACAO_GARAGEM_MAX:
        statusDispositivos[6].status = cmessage.toString();
        break;
      case TOPIC_ILUMINACAO_GARAGEM_MIN:
        statusDispositivos[7].status = cmessage.toString();
        break;
      case TOPIC_ARCONDICIONADO:
        statusDispositivos[8].status = convertedPayload;
        break;
      case TOPIC_ARCONDICIONADO_TEMPERATURA:
        statusDispositivos[9].status = message.toString();
        break;
      case TOPIC_ARCONDICIONADO_MAX:
        statusDispositivos[10].status = message.toString();
        break;
      case TOPIC_ARCONDICIONADO_MIN:
        statusDispositivos[11].status = message.toString();
        break;
      case TOPIC_ARCONDICIONADO_AUSENCIA_PESSOAS:
        statusDispositivos[12].status = convertedPayload;
        break;
      case TOPIC_ALARME:
        statusDispositivos[13].status = convertedPayload;
        break;
      default:
        break;
    }
  });

  return client;
};

// export default client;
