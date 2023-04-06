import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import * as c from './settings';
import { onConnection } from './controllers/SocketController';

const app = express();
const port = c.PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: c.ALLOWED_ORIGIN,
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on('connection', onConnection);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
