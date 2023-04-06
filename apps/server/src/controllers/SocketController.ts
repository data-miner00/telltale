import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type Sock = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export function onConnection(socket: Sock) {
  socket.on('message', (message: any, room: string) => {
    if (!room) {
      socket.broadcast.emit('message', message);
    } else {
      socket.to(room).emit('message', message);
    }

    // Handle GPT message
    if (message.content.startsWith('gpt ')) {
      setTimeout(() => {
        socket.nsp.to(room).emit('message', {
          content: 'Message from GPT',
          sent: new Date(),
          username: 'GPT',
          userAvatar: 'https://chat.openai.com/favicon-32x32.png',
        });
      }, 200);
    }
  });

  socket.on('join', (room: string) => {
    socket.join(room);
    console.info(`${socket.id} joined ${room}`);
  });

  socket.on('leave', (room: string) => {
    socket.leave(room);
    console.info(`${socket.id} left ${room}`);
  });

  socket.on('disconnect', () => {
    console.info(`${socket.id} has been disconnected`);
  });
}
