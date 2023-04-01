import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ILogger } from '../logger';

type MessagePayload = {
  content: string;
  sent: string;
  username: string;
  userAvatar: string;
};

export class SocketController {
  constructor(
    private readonly socket: Socket<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      any
    >,
    private readonly logger: ILogger
  ) {
    this.logger.info(`${this.socket.id} has connected`);
  }

  message(message: MessagePayload, room: string) {
    this.logger.info(message, typeof message);

    if (!room) {
      this.socket.broadcast.emit('message', message);
    } else {
      this.socket.to(room).emit('message', message);
    }

    // Handle GPT message
    if (message.content.startsWith('gpt ')) {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          this.socket.nsp.to(room).emit('message', {
            message: 'Message from GPT',
            sent: new Date(),
            username: 'GPT',
            userAvatar: 'https://chat.openai.com/favicon-32x32.png',
          });
          resolve(undefined);
        }, 200);
      });
    }
  }

  join(room: string) {
    this.socket.join(room);
    this.logger.info(`${this.socket.id} joined ${room}`);
  }

  leave(room: string) {
    this.socket.leave(room);
    this.logger.info(`${this.socket.id} left ${room}`);
  }

  disconnect() {
    this.logger.info(`${this.socket.id} has been disconnected`);
  }
}
