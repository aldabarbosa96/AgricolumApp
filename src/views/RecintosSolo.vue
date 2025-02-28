<template>
  <ion-page>
    <!-- Cabecera con botón de back y título -->
    <ion-header class="custom-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <img src="/chevron_left_thin.png" class="back-icon" alt="Volver" />
          </ion-button>
        </ion-buttons>
        <ion-title class="title">Recinto 03.0A</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="custom-content">
      <!-- Línea divisoria superior -->
      <div class="divider top-divider"></div>

      <!-- Contenedor principal -->
      <ion-grid class="recinto-container">
        <!-- Mapa -->
        <ion-row>
          <ion-col size="12">
            <ion-card class="map-card">
              <ion-img src="/mapaRecinto02.png" class="map-image"></ion-img>
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
  IonInput,
  IonButtons
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
    IonButtons,
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
/* ===== CABECERA Y TÍTULO ===== */
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

/* ===== CONTENEDOR PRINCIPAL ===== */
.custom-content {
  --background: #fff;
  position: relative;
  padding: 0 !important;
  --padding-bottom: 20px !important;
  overflow-y: hidden;
}

/* ===== CONTENEDOR DEL RECINTO (similar a activity-container) ===== */
.recinto-container {
  padding: 10px;
  margin-right: 0;
  margin-top: -10px;
}

/* ===== DIVISORES ===== */
.divider {
  height: 1px;
  background-color: #ddd;
  border: none;
  margin: 5px 0;
}
.top-divider {
  margin-top: -5px;
  margin-bottom: 15px;
}
.bottom-divider {
  margin-bottom: 5px;
}

/* ===== MAPA SCROLLABLE ===== */
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

/* ===== LISTA DE INFORMACIÓN ===== */
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
