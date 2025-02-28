<template>
  <ion-page>
    <!-- Cabecera personalizada con botón de back -->
    <ion-header class="custom-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <img src="/chevron_left_thin.png" alt="Volver" class="back-icon" />
          </ion-button>
        </ion-buttons>
        <ion-title class="title">Actividades</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" :scrollY="false" class="custom-content">
      <!-- Línea divisoria superior -->
      <div class="divider top-divider"></div>

      <!-- Contenedor general -->
      <ion-grid class="activity-container">
        <ion-row>
          <ion-col size="12">
            <!-- Encabezado con icono y nombre de la actividad -->
            <div class="activity-header">
              <h2 class="activity-title">Recogida</h2>
              <img src="/Hay.png" alt="Icono Actividad" class="activity-icon" />
            </div>

            <!-- Fecha y hora en la misma línea -->
            <div class="activity-date-time">
              <span class="activity-date">2024/12/17</span>
              <span class="activity-hour">17:08/00:00</span>
            </div>
          </ion-col>
        </ion-row>

        <!-- Línea divisoria intermedia -->
        <div class="divider"></div>

        <!-- Mapa -->
        <ion-row>
          <ion-col size="12">
            <ion-card class="map-card">
              <ion-img src="/mapa3.png" class="map-image"></ion-img>
            </ion-card>
          </ion-col>
        </ion-row>

        <!-- Lista de información -->
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

        <!-- Línea divisoria inferior -->
        <div class="divider bottom-divider"></div>
      </ion-grid>
    </ion-content>

    <!-- Se utiliza el componente de Toolbar importado -->
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
  IonInput,
  IonButtons
} from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'Actividades',
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
    IonButtons,
    Toolbar
  },
  data() {
    return {
      listItems: [
        { title: 'Recinto', value: '08279:0:0:17:21, Recinto 03', editing: false },
        { title: 'Ubicación', value: 'John Doe Explotaciones', editing: false },
        { title: 'Tipo de cultivo', value: '_antara viña blanca (580 Kg)', editing: false },
        { title: 'Trabajadores', value: 'John Doe', editing: false },
        { title: 'Maquinaria', value: 'Tractor Agrícola, Cosechadora', editing: false },
        { title: 'Nº de Albarán', value: 'BCN-2024-12-34879238428-F', editing: false },
        { title: 'Documentos', value: '4 fotos, 1 vídeo, 3 notas', editing: false }
      ]
    };
  },
  methods: {
    toggleEdit(index: number) {
      if (!this.listItems[index].editing) {
        this.listItems.forEach((item, i) => {
          if (i !== index && item.editing) {
            item.editing = false;
          }
        });
      }
      this.listItems[index].editing = !this.listItems[index].editing;
      if (this.listItems[index].editing) {
        nextTick(() => {
          const inputRef = this.$refs['input-' + index];
          if (inputRef && typeof (inputRef as any).setFocus === 'function') {
            (inputRef as any).setFocus();
          }
        });
      }
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
/* 1) CABECERA Y TÍTULO */
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
ion-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
}
ion-buttons[slot="start"] {
  margin-top: 15px;
  margin-left: 10px;
  margin-right: -35px;
}
.back-icon {
  width: 10px;
  height: 20px;
}

/* 2) CONTENEDOR PRINCIPAL */
.custom-content {
  --background: #fff;
  position: relative;
  --padding-bottom: 20px !important;
  padding: 0 !important;
  overflow-y: hidden;
}

/* 3) CONTENEDOR DE ACTIVIDADES */
.activity-container {
  padding: 10px;
  margin-right: 0;
  margin-top: -10px;
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

/* 4) ESTRUCTURA DE LA ACTIVIDAD */
.activity-header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 8px;
}
.activity-icon {
  width: 24px;
  height: 24px;
  margin-left: 8px;
}
.activity-title {
  color: #28a745;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}
.activity-date-time {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #666;
}
.activity-date,
.activity-hour {
  display: inline-block;
}

/* 5) MAPA SCROLLABLE */
.map-card {
  position: relative;
  width: 125vw;
  height: 240px;
  overflow: scroll;
  margin-bottom: 10px;
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

/* 6) LISTA DE INFORMACIÓN */
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
