<template>
    <ion-page>
      <!-- Cabecera personalizada -->
      <ion-header class="custom-header">
        <ion-toolbar>
          <ion-title class="title">Recinto 03.0A</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="custom-content">
        <!-- Línea divisoria superior -->
        <div class="divider top-divider"></div>
  
        <!-- Contenedor principal -->
        <ion-grid class="recinto-container">
          <!-- Mapa en la parte superior -->
          <ion-row>
            <ion-col size="12">
              <ion-card class="map-card">
                <!-- Ajusta la ruta de la imagen del mapa según tu proyecto -->
                <ion-img src="/mapa3.png" class="map-image"></ion-img>
              </ion-card>
            </ion-col>
          </ion-row>
  
          <!-- Lista de información en la parte inferior -->
          <ion-row>
            <ion-col size="12">
              <ion-list class="info-list">
                <ion-item
                  v-for="(item, index) in listItems"
                  :key="index"
                  lines="none"
                  :class="{ editing: item.editing }"
                >
                  <ion-label>
                    <h3 class="green-title">{{ item.title }}</h3>
                    <template v-if="!item.editing">
                      <p class="gray-text">{{ item.value }}</p>
                    </template>
                    <template v-else>
                      <ion-input
                        :ref="'input-' + index"
                        v-model="item.value"
                        class="edit-input"
                        placeholder="Editar..."
                        autofocus
                      ></ion-input>
                    </template>
                  </ion-label>
  
                  <!-- Botón para alternar modo edición -->
                  <ion-button fill="clear" slot="end" @click="toggleEdit(index)">
                    <template v-if="!item.editing">
                      <img src="/pencil.png" alt="Editar" class="edit-icon" />
                    </template>
                    <template v-else>
                      <span class="accept-button">Aceptar</span>
                    </template>
                  </ion-button>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
  
          <!-- Línea divisoria inferior (opcional) -->
          <div class="divider bottom-divider"></div>
        </ion-grid>
      </ion-content>
  
      <!-- Componente de Toolbar (importado) -->
      <Toolbar />
    </ion-page>
  </template>
  
  <script lang="ts">
  import { nextTick } from 'vue';
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonInput
  } from '@ionic/vue';
  import Toolbar from '@/components/Toolbar.vue';
  
  export default {
    name: 'RecintosSolos',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonCard,
      IonImg,
      IonList,
      IonItem,
      IonLabel,
      IonButton,
      IonInput,
      Toolbar
    },
    data() {
      return {
        listItems: [
          { title: 'Nombre del recinto', value: 'Recinto 03.0A', editing: false },
          { title: 'Referencia', value: '08279:0:0:17:21', editing: false },
          { title: 'Área Sigpac', value: '4.1538 ha', editing: false },
          { title: 'Área trabajada', value: '4.1538', editing: false },
          { title: 'Uso', value: 'Pastos arbustivos', editing: false },
          { title: 'Tipo de agricultura', value: 'Secano', editing: false },
          { title: 'Zona vulnerable', value: 'No', editing: false },
          { title: 'Zona ZEPA', value: 'Desconocido', editing: false }
        ]
      };
    },
    methods: {
      toggleEdit(index: number) {
        // Cierra cualquier otro item en edición
        if (!this.listItems[index].editing) {
          this.listItems.forEach((item, i) => {
            if (i !== index && item.editing) {
              item.editing = false;
            }
          });
        }
        // Alterna el estado de edición del item actual
        this.listItems[index].editing = !this.listItems[index].editing;
  
        // Si se abre en edición, enfocar el input
        if (this.listItems[index].editing) {
          nextTick(() => {
            const inputRef = this.$refs['input-' + index];
            if (inputRef && typeof (inputRef as any).setFocus === 'function') {
              (inputRef as any).setFocus();
            }
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* ===== 1) CABECERA Y TÍTULO ===== */
  ion-header.custom-header {
    box-shadow: none;
  }
  .title {
    text-align: center;
    color: #28a745;
    font-size: 18px;
    font-weight: bold;
    height: 60px;
    background-color: white;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  
  /* ===== 2) CONTENEDOR PRINCIPAL ===== */
  .custom-content {
    --background: #fff;
    position: relative;
    --padding-bottom: 80px;
  }
  
  /* Divisores */
  .divider {
    height: 1px;
    background-color: #ddd;
    border: none;
    margin: 5px 0;
  }
  .top-divider {
    margin-top: 0;
  }
  .bottom-divider {
    margin-bottom: 5px;
  }
  
  /* ===== 3) CONTENEDOR DEL RECINTO ===== */
  .recinto-container {
    padding: 10px;
    margin-right: 0;
  }
  
  /* ===== 4) MAPA SCROLLABLE ===== */
  .map-card {
    position: relative;
    width: 125vw; /* Aumenta la anchura para poder scrollear */
    height: 240px;
    overflow: scroll;
    margin-bottom: 10px;
    /* Ajusta el margen para centrar el "zoom" en dispositivos móviles */
    margin-left: calc((110vw - 100%) / -2);
  }
  .map-image {
    display: block;
    margin: 0 auto;
    transform: scale(2.5);
    transform-origin: center center;
    max-width: none;
    height: auto;
  }
  
  /* ===== 5) LISTA DE INFORMACIÓN ===== */
  .info-list {
    --ion-item-background: transparent;
    --ion-item-ios-background: transparent;
    --ion-item-md-background: transparent;
    margin-bottom: 5px;
  }
  ion-item {
    --border-color: transparent;
    align-items: center;
  }
  ion-item.editing {
    background-color: rgba(0, 0, 0, 0.025);
    border: none;
    border-radius: 4px;
  }
  .green-title {
    font-size: 0.9rem;
    color: #28a745;
    margin: 0;
    font-weight: 600;
  }
  .gray-text {
    font-size: 0.85rem;
    color: #333;
    margin: 0;
    font-weight: normal;
  }
  .edit-input {
    font-size: 0.85rem;
  }
  /* Fuerza el color del caret en verde */
  .edit-input::part(native) {
    caret-color: #28a745;
  }
  .edit-input:focus {
    border: 2px solid #28a745;
  }
  .edit-icon {
    width: 13px;
    height: auto;
  }
  .accept-button {
    color: #28a745;
    font-weight: bold;
  }
  </style>
  