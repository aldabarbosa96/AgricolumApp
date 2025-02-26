<template>
    <ion-page>
      <!-- Cabecera con título principal y subtítulo -->
      <ion-header class="custom-header">
        <!-- Toolbar principal -->
        <ion-toolbar>
          <ion-title class="title">Gestión de Campos</ion-title>
        </ion-toolbar>
  
        <!-- Toolbar secundario para el subtítulo dinámico -->
        <ion-toolbar class="subheader-toolbar">
          <ion-title class="subtitle">{{ selectedView }}</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="recintos-content">
        <!-- Segmento (toggle) entre Recintos y Parcelas -->
        <ion-segment v-model="selectedView" class="bottom-segment">
          <ion-segment-button value="Recintos">
            Recintos
          </ion-segment-button>
          <ion-segment-button value="Parcelas">
            Parcelas
          </ion-segment-button>
        </ion-segment>
  
        <!-- Contenedor principal de la lista -->
        <div class="list-wrapper">
          <!-- Vista Recintos -->
          <div v-if="selectedView === 'Recintos'">
            <ion-list>
              <ion-item
                v-for="(recinto, index) in recintos"
                :key="index"
                class="ion-item-custom"
              >
                <ion-label>
                  <h2 class="recinto-name">{{ recinto.name }}</h2>
                  <p class="recinto-id">{{ recinto.id }}</p>
                  <p class="recinto-area">Área: {{ recinto.area }} ha.</p>
                </ion-label>
                <div slot="end" class="right-content">
                  <span v-if="recinto.actividades > 0" class="ver-actividades">
                    Ver Actividades
                  </span>
                  <span v-else class="sin-actividades">
                    Sin Actividades
                  </span>
                  <ion-icon
                    name="chevron-forward-outline"
                    class="forward-icon"
                  ></ion-icon>
                </div>
              </ion-item>
            </ion-list>
          </div>
  
          <!-- Vista Parcelas -->
          <div v-else>
            <ion-list>
              <ion-item
                v-for="(parcela, index) in parcelas"
                :key="index"
                class="ion-item-custom"
              >
                <ion-label>
                  <h2 class="parcela-name">{{ parcela.name }}</h2>
                  <p class="parcela-id">{{ parcela.id }}</p>
                  <p class="parcela-area">Área: {{ parcela.area }} ha.</p>
                </ion-label>
                <ion-icon
                  slot="end"
                  name="chevron-forward-outline"
                  class="forward-icon"
                ></ion-icon>
              </ion-item>
            </ion-list>
          </div>
        </div>
  
        <!-- FAB para crear nuevo recinto -->
        <ion-fab vertical="bottom" horizontal="center" slot="fixed" class="fab-position">
          <ion-fab-button class="custom-fab" @click="goToCrearRecinto">
            <span style="font-size: 24px;">+</span>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
  
      <!-- Toolbar inferior (si la tienes en un componente aparte) -->
      <Toolbar />
    </ion-page>
  </template>
  
  <script>
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonFab,
    IonFabButton
  } from '@ionic/vue';
  
  import Toolbar from '@/components/Toolbar.vue'; // Ajusta la ruta según tu proyecto
  
  export default {
    name: 'Recintos',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonSegment,
      IonSegmentButton,
      IonList,
      IonItem,
      IonLabel,
      IonIcon,
      IonFab,
      IonFabButton,
      Toolbar
    },
    data() {
      return {
        selectedView: 'Recintos', // Valor inicial del segment
  
        // Ejemplo de recintos
        recintos: [
          {
            name: 'Recinto 03',
            id: '08279:0:0:1:72:1',
            area: 4.1538,
            actividades: 1
          },
          {
            name: 'Recinto 02',
            id: '07381:1:0:2:63:1',
            area: 8.3066,
            actividades: 2
          },
          {
            name: 'Recinto 01',
            id: '05668:2:1:93:4',
            area: 4.8418,
            actividades: 0
          }
        ],
  
        // Ejemplo de parcelas
        parcelas: [
          {
            name: 'Parcela 01',
            id: 'A-0001',
            area: 10.52
          },
          {
            name: 'Parcela 02',
            id: 'B-0002',
            area: 6.3
          }
        ]
      };
    },
    methods: {
      goToCrearRecinto() {
        // Navega a la vista CrearRecinto.vue
        // Ajusta la ruta según tu configuración de rutas
        this.$router.push({ name: 'CrearRecinto' });
      }
    }
  };
  </script>
  
  <style scoped>
  /* ==== CABECERA ==== */
  ion-header.custom-header {
    box-shadow: none;
    border-bottom: 1px solid #ddd;
  }
  
  /* Toolbar principal */
  .title {
    text-align: center;
    color: #28a745;
    font-size: 20px;
    font-weight: bold;
    background-color: white;
    padding-top: 10px;
    height: 55px;
  }
  
  /* Toolbar secundario (subtítulo) */
  .subheader-toolbar {
    --background: #fff;
    border-bottom: 1px solid #ddd;
    height: 40px;
  }
  
  .subtitle {
    text-align: center;
    color: #28a745;
    font-size: 16px;
    font-weight: normal;
  }
  
  /* ==== CONTENEDOR PRINCIPAL ==== */
  .recintos-content {
    --background: #fff;
    position: relative;
    padding-top: 20px;
    padding-bottom: 150px;
  }
  
  /* ==== SEGMENT/TAB EN LA PARTE INFERIOR ==== */
  .bottom-segment {
    position: absolute;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    --indicator-color: #28a745;
    --background: #f2f2f2;
    --color-checked: #28a745;
    --color: #666;
    z-index: 10;
  }
  
  ion-segment-button {
    --color-checked: #28a745;
    --color: #666;
    font-size: 16px;
    font-weight: 600;
  }
  
  /* ==== LISTA DE RECINTOS/PARCELAS ==== */
  .list-wrapper {
    margin-top: 20px;
    padding: 20px;
    padding-bottom: 150px;
  }
  
  .ion-item-custom {
    margin: 0 15px;
    border-radius: 8px;
    --background: #fff;
    --inner-padding-end: 12px;
    --inner-padding-start: 12px;
    border-bottom: 1px solid #eee;
  }
  
  /* Encabezados e info */
  .recinto-name,
  .parcela-name {
    font-size: 16px;
    font-weight: bold;
    color: #444;
    margin-bottom: 4px;
  }
  
  .recinto-id,
  .parcela-id {
    font-size: 14px;
    color: #888;
  }
  
  .recinto-area,
  .parcela-area {
    font-size: 14px;
    color: #28a745;
    font-weight: 600;
  }
  
  /* Texto "Ver Actividades" / "Sin Actividades" */
  .ver-actividades {
    color: #28a745;
    font-size: 14px;
    font-weight: bold;
    margin-right: 8px;
  }
  
  .sin-actividades {
    color: #999;
    font-size: 14px;
    font-weight: bold;
    margin-right: 8px;
  }
  
  /* Flecha forward */
  .forward-icon {
    font-size: 18px;
    color: #ccc;
  }
  
  /* Alinear "Ver Actividades" y flecha en la misma fila */
  .right-content {
    display: flex;
    align-items: center;
  }
  
  /* ==== FAB (botón circular) ==== */
  .fab-position {
    bottom: 350px 
  }
  
  /* Estilos para el FAB personalizado */
/* Estilos para el FAB personalizado */
.custom-fab {
  --background: #f2f2f2; /* Grisáceo, igual que el toggle */
  --border: 2px solid #f2f2f2;
  --color: #666; /* Color inicial del símbolo, gris oscuro */
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  box-shadow: none;
}

/* Cambiar color cuando se hace hover */
.custom-fab:hover {
  --background: #28a745;
  --border: 2px solid #28a745;
  --color: white;
}

  </style>
  