## Apresentação do problema

Neste problema, foi proposto a implementação do protótipo de um equipamento que colete as informações do circuito controlador de um sistema inteligente, disponibilizando em uma página Web, além de uma Assistente de voz, na qual foi escolhida a Google Assistente, utilizando o Dialogflow. O circuito controlador é o mesmo do problema anterior, contendo: iluminação da garagem e do jardim, iluminação de ambientes internos, central de alarme e climatização na sala de TV. Para a solução deste protótipo, foi determinado o protocolo de comunicação MQTT para as trocas de mensagens entre a página web e o sistema inteligente (circuito controlador), além da troca de mensagem da Assistente com o circuito controlador.

# API de rotinas MQTT

Esse repositório contém a API que implementa uma estrutura MQTT para a comunicação entre o broker clientes por meio de alguns endpoints HTTPs.

<img src="./images/api MQTT.png" />
<em>Representação desta API ems relação ao sistema em amarelo</em>

## Hospedagem

A aplicação está hospedada na núvem do Heroku [Neste link](https://assistantmqttapi.herokuapp.com)

## Assistente virtual

A assistente implementada pelo Dialogflow recebe essa API como um webhook para processar os comandos de voz. Ele acessa o endpoint `/comandovoz`, e trata todos os comandos disponíveis.

## Frontend

O frontend da aplicação se comunica com essa API para checar se o sistema da <em>Raspberry</em> está online. O sistema se encarrega de fazer um ping via MQTT em um tempo em minutos configurável (default: 1 minuto), e ele considera que está online se obter uma resposta nesse meio tempo. Se não, a rasp passa a se mostrar indisponível pela própria aplicação, onde há um indicador no <em>header</em>.

A aplicação pode bater em 3 endpoints da API de rotinas MQTT diferentes.

- `[GET] /ping` : Essa rota retorna se a <em>Raspberry</em> está online no momento, baseado nos pings MQTT que a API faz continuamente
- `[GET] /timecron` : Essa rota pega o tempo em que a API está pingando a <em>Raspberry</em>
- `[POST] /reset-ping` : Dado o parâmetro <em>time_cron</em> (em minuto), ele reseta o tempo de ping que a API da na <em>Raspberry</em>

O código fonte desta aplicação está disponível [Nesse repositório](https://github.com/Juliapp/automacaoresidencialMQTT) e está online [Neste link](https://automacaoresidencial-mqtt.vercel.app/)
