import { reactive } from 'vue';
import { io } from 'socket.io-client';

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

const URL = 'http://localhost:3030';

export const socket = io(URL);

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
