import { createRouter, createWebHistory } from '@ionic/vue-router';
import LogInPage from '../views/LogIn.vue';
import HomePage from '../views/Home.vue';
import CrearActividadPage from '../views/CrearActividad.vue';
import CrearCarrousel from '../views/CrearCarrousel.vue';
import CrearRecinto from '../views/CrearRecinto.vue'; 
import MenuPage from '../views/Menu.vue';
import RecintoSIGPAC from '@/views/RecintoSIGPAC.vue';
import RecintosSIGPAC2 from '@/views/RecintosSIGPAC2.vue';
import CrearRecinto2 from '@/views/CrearRecinto2.vue';
import RecintoDibujo from '@/views/RecintoDibujo.vue';

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
    component: CrearRecinto 
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuPage
  },
  {
    path: '/recintos-sigpac',
    name: 'RecintosSIGPAC',
    component: RecintoSIGPAC 
  },
  {
  path: '/recintos-sigpac2',
  name: 'RecintosSIGPAC2',
  component: RecintosSIGPAC2 
},
{
path: '/recinto2',
name: 'CrearRecinto2',
component: CrearRecinto2
},
{
  path: '/recintos-dibujo',
  name: 'RecintoDibujo',
  component: RecintoDibujo
}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
