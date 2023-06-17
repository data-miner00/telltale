import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { PORT, ALLOWED_ORIGIN } from './settings';
import { onConnection } from './controllers/socket';
import authRouter from './routes/auth';
import roomRouter from './routes/room';

const app = express();
const port = PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGIN,
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRouter);
app.use('/api/room', roomRouter);

io.on('connection', onConnection);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
