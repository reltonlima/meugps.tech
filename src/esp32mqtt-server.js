const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mqtt = require('mqtt');
const path = require('path');

// Configuração do Socket.io (Comunicação com o Navegador)
const io = new Server(server, {
  cors: { origin: "*" }
});

// Configuração do MQTT (Comunicação com o ESP32)
// Note que conectamos em localhost, pois o Node está no mesmo servidor do Mosquitto
const mqttClient = mqtt.connect('mqtt://localhost:1883' || 'mqtt://35.202.46.113:1883'); 

// Servir os arquivos estáticos (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Quando o MQTT conecta
mqttClient.on('connect', () => {
  console.log('✅ Node.js conectado ao MQTT Local');
  mqttClient.subscribe('meugps/v1/hardware/status');
});

// Quando chega mensagem do MQTT (ESP32 -> Node -> Navegador)
mqttClient.on('message', (topic, message) => {
  console.log(`Recebido do Hardware: ${message.toString()}`);
  io.emit('device-status', message.toString());
});

// Quando o Navegador conecta (Navegador -> Node -> ESP32)
io.on('connection', (socket) => {
  console.log('👤 Novo cliente Web conectado: ' + socket.id);

  socket.on('toggle-led', (state) => {
    const payload = state ? "1" : "0";
    console.log(`Enviando comando para ESP32: ${payload}`);
    mqttClient.publish('meugps/v1/hardware/led', payload);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});