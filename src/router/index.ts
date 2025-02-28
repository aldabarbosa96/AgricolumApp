import { createRouter, createWebHistory } from '@ionic/vue-router';
import LogInPage from '@/views/LogIn.vue';
import HomePage from '@/views/Home.vue';
import CrearActividadPage from '@/views/CrearActividad.vue';
import CrearCarrousel from '@/views/CrearCarrousel.vue';
import CrearRecinto from '@/views/CrearRecinto.vue'; 
import MenuPage from '@/views/Menu.vue';
import RecintoSIGPAC from '@/views/RecintoSIGPAC.vue';
import RecintosSIGPAC2 from '@/views/RecintosSIGPAC2.vue';
import CrearRecinto2 from '@/views/CrearRecinto2.vue';
import RecintoDibujo from '@/views/RecintoDibujo.vue';
import Recintos from '@/views/Recintos.vue';
import Actividades from '@/views/Actividades.vue';
import ActividadesRecintos from '@/views/ActividadesRecintos.vue';
import Registro from '@/views/Registro.vue';
import RecintosSolo from '@/views/RecintosSolo.vue';
import FiltroColores from '@/views/FiltroColores.vue';

// OJO: Eliminamos las líneas que causan conflicto
// import path from 'path';
// import { Component } from 'ionicons/dist/types/stencil-public-runtime';

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
  },
  {
    path: '/recintos',
    name: 'Recinto',
    component: Recintos
  },
  {
    path: '/actividades',
    name: 'Actividades',
    component: Actividades
  },
  {
    path: '/actividades-recintos',
    name: 'ActividadesRecintos',
    component: ActividadesRecintos
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/recinto-solo',
    name: 'RecintosSolo',
    component: RecintosSolo
  },
  {
    path: '/filtro-colores',
    name: 'FiltroColores',
    component: FiltroColores
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
