import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import MainVue from '../views/Main.vue';
import RoomVue from '../views/Room.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => MainVue,
  },
  {
    path: '/room/:id',
    component: () => RoomVue,
  },
];

export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
