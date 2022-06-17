const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const cloudinary = require('cloudinary').v2;

const { PORT } = process.env;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  },
  maxHttpBufferSize: 1e8, pingTimeout: 60000
});

server.listen(PORT || 3002);

app.get('/', (req, res) => {
  console.log('homepage');
  res.sendFile(__dirname + '/index.html');
});

app.use('/static', express.static('node_modules'));

io.on('connection', (socket) => {
  console.log('Connection to socket server successfully');

  socket.emit('direction', 'loading');

  setTimeout(() => socket.emit('direction', 'loaded'), 1000);

  socket.on('change-direction', (data) => {
    console.log('data', data)
    io.emit('direction', data);
  });


  socket.on('upload', (image) => {
    console.log('image', image)
    //io.emit('direction', data);
  });
});