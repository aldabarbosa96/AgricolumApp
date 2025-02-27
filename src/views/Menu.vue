<template>
    <ion-page>
      <!-- Cabecera con título -->
      <ion-header class="custom-header">
        <ion-title class="title">Menú</ion-title>
      </ion-header>
  
      <!-- Contenido principal -->
      <ion-content
        class="ion-padding custom-content"
        :style="{'--background': '#fff', '--padding-top': '8px'}"
      >
        <!-- Divider superior -->
        <div class="divider top-divider"></div>
  
        <!-- Lista de opciones -->
        <div class="options-list">
          <div class="option-item" @click="goToCampos">
            <span class="option-label">Campos</span>
            <img src="/Field.png" alt="Campos" class="option-icon-right" />
          </div>
          <div class="divider"></div>
  
          <div class="option-item" @click="goToFertilizacion">
            <span class="option-label">Fertilización</span>
            <img src="/Digestate.png" alt="Fertilización" class="option-icon-right" />
          </div>
          <div class="divider"></div>
  
          <div class="option-item" @click="goToBalas">
            <span class="option-label">Balas</span>
            <img src="/Hay Bale.png" alt="Balas" class="option-icon-right" />
          </div>
          <div class="divider"></div>
  
          <div class="option-item" @click="goToConfiguracion">
            <span class="option-label">Configuración</span>
            <img src="/Settings.png" alt="Configuración" class="option-icon-right" />
          </div>
          <div class="divider"></div>
  
          <div class="option-item" @click="goToVademecum">
            <span class="option-label">Vademécum</span>
            <img src="/Empty Box.png" alt="Vademécum" class="option-icon-right" />
          </div>
          <div class="divider"></div>
  
          <div class="option-item" @click="goToPerfil">
            <span class="option-label">Perfil</span>
            <img src="/Account.png" alt="Perfil" class="option-icon-right" />
          </div>
          <div class="divider"></div>
  
          <div class="option-item" @click="goToAyuda">
            <span class="option-label">Ayuda</span>
            <img src="/Help.png" alt="Ayuda" class="option-icon-right" />
          </div>
          <div class="divider"></div>
  
          <div class="option-item" @click="desconectar">
            <span class="option-label">Desconectar</span>
            <img src="/Shutdown.png" alt="Desconectar" class="option-icon-right" />
          </div>
        </div>
      </ion-content>
  
      <!-- Barra de navegación inferior -->
      <Toolbar />
    </ion-page>
  </template>
  
  <script>
  import Toolbar from '@/components/Toolbar.vue';
  import {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent
  } from '@ionic/vue';
import { push } from 'ionicons/icons';
  
  export default {
    name: 'Menu',
    components: {
      IonPage,
      IonHeader,
      IonTitle,
      IonContent,
      Toolbar
    },
    methods: {
      goToCampos() {
        this.$router.push('/recintos');
      },
      goToFertilizacion() {
        this.$router.push('/fertilizacion');
      },
      goToBalas() {
        this.$router.push('/balas');
      },
      goToConfiguracion() {
        this.$router.push('/configuracion');
      },
      goToVademecum() {
        this.$router.push('/vademecum');
      },
      goToPerfil() {
        this.$router.push('/perfil');
      },
      goToAyuda() {
        this.$router.push('/ayuda');
      },
      desconectar() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  /* CABECERA */
  ion-header.custom-header {
    box-shadow: none;
  }
  
  .title {
    text-align: center;
    color: #28a745;
    font-size: 20px;
    font-weight: bold;
    height: 75px;
    background-color: white;
    padding-top: 10px;
  }
  
  /* LISTA DE OPCIONES */
  .options-list {
    display: flex;
    flex-direction: column;
  }
  
  /* ELEMENTOS DE LA LISTA */
  .option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background-color: #fff;
    cursor: pointer;
  }
  
  /* TEXTO */
  .option-label {
    font-size: 16px;
    color: #28a745;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  /* ICONOS A LA DERECHA */
  .option-icon-right {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  /* DIVISORES AJUSTADOS */
  .divider {
    height: 1px; /* Línea más fina */
    background-color: #ddd;
    width: calc(100% - 40px); /* Se alinea con el texto e iconos */
    margin: 0 auto;
  }
  
  /* DIVISOR SUPERIOR */
  .top-divider {
    height: 1px;
    background-color: #ddd;
    width: calc(100% - 40px);
    margin: -5px auto 15px;
  }
  </style>
  