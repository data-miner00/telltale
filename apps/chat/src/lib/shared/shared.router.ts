import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import MainVue from '@/views/Main.vue';
import RoomVue from '@/views/Room.vue';
import LoginVue from '@/views/auth/Login.vue';
import PageContainerVue from '../modules/page-container/PageContainer.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => LoginVue,
  },
  {
    path: '/room',
    component: () => PageContainerVue,
    children: [
      {
        path: ':id',
        component: () => RoomVue,
      },
    ],
  },
  {
    path: '/profile',
    component: async () =>
      await import('../modules/page-container/PageContainer.vue'),
    children: [
      {
        path: '',
        component: async () => await import('../../views/User.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: async () => await import('../../views/NotFound.vue'),
  },
];

export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
