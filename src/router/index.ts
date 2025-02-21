import { createRouter, createWebHistory } from '@ionic/vue-router';
import LogInPage from '../views/LogIn.vue';
import HomePage from '../views/Home.vue';
import CrearActividadPage from '../views/CrearActividad.vue';
import CrearCarrousel from '../views/CrearCarrousel.vue';
import CrearRecinto from '../views/CrearRecinto.vue'; 
import MenuPage from '../views/Menu.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogInPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/crear',
    name: 'CrearActividad',
    component: CrearActividadPage
  },
  {
    path: '/carrousel',
    name: 'CrearCarrousel',
    component: CrearCarrousel
  },
  {
    path: '/recinto',
    name: 'CrearRecinto',
    component: CrearRecinto // Se añade la nueva ruta
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
