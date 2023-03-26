import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://admin.socket.io',
    ],
    credentials: true,
  },
});

const userIo = io.of('/user');
userIo.on('connection', (socket) => {
  console.log(socket.id + ' connected to user namespace');
});

userIo.on('connect_error', (error) => {
  console.log(error);
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    // do thing
    next();
  } else {
    next(new Error('Please send token'));
  }
});

io.on('connection', (socket) => {
  console.log('Connected: ', socket.id);

  socket.on('message', (message, room) => {
    console.log(message);
    // io.emit('message', args);
    if (!room) {
      socket.broadcast.emit('message', message);
    } else {
      socket.to(room).emit('message', message);
    }
  });

  socket.on('join', (room) => {
    console.log(`${socket.id} joined ${room}`);
    socket.join(room);
  });

  socket.on('leave', (room) => {
    console.log(`${socket.id} left ${room}`);
    socket.leave(room);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected: ', socket.id);
  });
});

server.listen(3030, () => {
  console.log('Server listening on *:3030');
});

instrument(io, { auth: false });
