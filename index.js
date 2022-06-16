const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');

const { PORT } = process.env;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

server.listen(PORT || 3000);

app.get('/', (req, res) => {
  console.log('homepage');
  res.sendFile(__dirname + '/index.html');
});

app.use('/static', express.static('node_modules'));

io.on('connection', (socket) => {
  console.log('Connection to socket server successfully');

  socket.emit('direction', 'loading');

  socket.on('change-direction', (data) => {
    socket.emit('direction', data);
  });
});