import { reactive } from 'vue';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '@/lib/shared/shared.constants';

type State = {
  connected: boolean;
  fooEvents: any[];
  barEvents: any[];
};

export const state = reactive<State>({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

export const socket = io(SOCKET_URL);

socket.on('connect', () => {
  state.connected = true;
});

socket.on('disconnect', () => {
  state.connected = false;
});

socket.on('foo', (...args) => {
  state.fooEvents.push(args);
});

socket.on('bar', (...args) => {
  state.barEvents.push(args);
});
