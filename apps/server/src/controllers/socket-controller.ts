import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ILogger } from '../logger';

export type MessagePayload = {
  content: string;
  sent: string;
  username: string;
  userAvatar: string;
};

type SocketAlias = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export class SocketController {
  static message(socket: SocketAlias, logger: ILogger) {
    return (message: MessagePayload, room: string) => {
      logger.info(message, typeof message);

      if (!room) {
        socket.broadcast.emit('message', message);
      } else {
        socket.to(room).emit('message', message);
      }

      // Handle GPT message
      if (message.content.startsWith('gpt ')) {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            socket.nsp.to(room).emit('message', {
              message: 'Message from GPT',
              sent: new Date(),
              username: 'GPT',
              userAvatar: 'https://chat.openai.com/favicon-32x32.png',
            });
            resolve(undefined);
          }, 200);
        });
      }
    };
  }

  static join(socket: SocketAlias, logger: ILogger) {
    return (room: string) => {
      socket.join(room);
      logger.info(`${socket.id} joined ${room}`);
    };
  }

  static leave(socket: SocketAlias, logger: ILogger) {
    return (room: string) => {
      socket.leave(room);
      logger.info(`${socket.id} left ${room}`);
    };
  }

  static disconnect(socket: SocketAlias, logger: ILogger) {
    return () => {
      logger.info(`${socket.id} has been disconnected`);
    };
  }
}
