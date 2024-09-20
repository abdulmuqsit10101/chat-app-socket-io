const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // console.log('user connected', message);
    const userId = socket.id; 
    io.emit('user joined', userId);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (message) => {
        console.log('message: ', message);
        io.emit('chat message', message, userId);
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});