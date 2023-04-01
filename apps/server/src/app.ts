import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { config } from 'dotenv';
import express from 'express';
import { SocketController } from './controllers/socket-controller';
import { Logger } from './logger';

config();

const socketDashboardUsername = process.env.SOCKET_DASHBOARD_USERNAME ?? '';
const socketDashboardPassword = process.env.SOCKET_DASHBOARD_PASSWORD ?? '';

const logger = new Logger();
const app = express();
app.use(express.json());
const server = http.createServer(app);
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
  logger.info(`${socket.id} has connected`);
  socket.on('message', SocketController.message(socket, logger));
  socket.on('join', SocketController.join(socket, logger));
  socket.on('leave', SocketController.leave(socket, logger));
  socket.on('disconnect', SocketController.disconnect(socket, logger));
});

server.listen(3030, () => {
  console.log('Server listening on *:3030');
});

instrument(io, {
  auth: {
    type: 'basic',
    username: socketDashboardUsername,
    password: socketDashboardPassword,
  },
});
