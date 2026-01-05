const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mqtt = require('mqtt');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Configurar Socket.io com CORS para produção
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001", "https://meugps.tech", "http://meugps.tech"],
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['polling', 'websocket']
});

// MQTT - usar IP externo em produção
const mqttBroker = 'mqtt://35.202.46.113:1883';

const mqttClient = mqtt.connect(mqttBroker);

// Middleware para logs
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/prototipo.html'));
});

app.get('/prototipo', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/prototipo.html'));
});

// Rota de saúde para verificar se o servidor está rodando
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        mqtt: mqttClient.connected,
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// MQTT eventos
mqttClient.on('connect', () => {
    console.log('✅ MQTT conectado em:', mqttBroker);
    mqttClient.subscribe('meugps/v1/hardware/status');
});

mqttClient.on('error', (err) => {
    console.error('❌ Erro MQTT:', err);
});

mqttClient.on('message', (topic, message) => {
    console.log(`MQTT recebido: ${message.toString()}`);
    io.emit('update_status', { msg: `Hardware: ${message.toString()}` });
});

// Socket.io eventos
io.on('connection', (socket) => {
    console.log('👤 Cliente conectado:', socket.id);

    socket.on('led_control', (data) => {
        const payload = data.status === 'ON' ? "1" : "0";
        console.log(`LED: ${data.status} (payload: ${payload})`);
        
        if (mqttClient.connected) {
            mqttClient.publish('meugps/v1/hardware/led', payload);
            socket.emit('update_status', { msg: `LED ${data.status} - Enviado` });
        } else {
            socket.emit('update_status', { msg: `Erro: MQTT desconectado` });
        }
    });

    socket.on('disconnect', () => {
        console.log('👤 Cliente desconectado:', socket.id);
    });

    // Enviar status inicial
    socket.emit('update_status', { 
        msg: `Conectado! MQTT: ${mqttClient.connected ? 'OK' : 'Erro'}` 
    });
});

// Tratamento de erros
io.on('error', (err) => {
    console.error('❌ Erro Socket.io:', err);
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando em: http://0.0.0.0:${PORT}`);
    console.log(`🔗 MQTT: ${mqttBroker}`);
    console.log(`📁 Arquivos estáticos: ${path.join(__dirname, '../public')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🔄 Desligando servidor...');
    mqttClient.end();
    server.close(() => {
        console.log('✅ Servidor desligado');
        process.exit(0);
    });
});