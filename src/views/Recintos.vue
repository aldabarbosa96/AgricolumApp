<template>
  <ion-page>
    <!-- Cabecera con título principal y subtítulo -->
    <ion-header class="custom-header">
      <!-- Toolbar principal -->
      <ion-toolbar>
        <!-- BOTÓN BACK -->
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <img src="/chevron_left_thin.png" class="back-icon" alt="Volver" />
          </ion-button>
        </ion-buttons>

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

      <!-- Contenedor principal de la lista con transición -->
      <div class="list-wrapper">
        <!-- Contenedor que enmascara la animación -->
        <div class="slide-container">
          <transition :name="transitionName" mode="out-in">
            <!-- LISTADO DE RECINTOS -->
            <div v-if="selectedView === 'Recintos'" key="recintos">
              <ion-list>
                <ion-item
                  v-for="(recinto, index) in recintos"
                  :key="index"
                  class="ion-item-custom"
                  @click="onRecintoClick(recinto)"
                >
                  <ion-label>
                    <!-- Separamos cada dato con <p> para mayor claridad -->
                    <h2 class="recinto-name">{{ recinto.name }}</h2>
                    <p class="recinto-id">{{ recinto.id }}</p>
                    <p class="recinto-area">Área: {{ recinto.area }} ha.</p>
                  </ion-label>

                  <!-- Botón "Ver Actividades" o "Sin Actividades" en la parte derecha -->
                  <div
                    slot="end"
                    class="right-content"
                    @click.stop="goToGestionCampos(recinto)"
                  >
                    <!-- Ícono “forward” invertido -->
                    <img
                      src="/chevron_left_thin.png"
                      class="forward-icon"
                      alt="Forward"
                    />
                    <span
                      v-if="recinto.actividades > 0"
                      class="ver-actividades"
                    >
                      Ver Actividades
                    </span>
                    <span
                      v-else
                      class="sin-actividades"
                    >
                      Sin Actividades
                    </span>
                  </div>
                </ion-item>
              </ion-list>
            </div>

            <!-- LISTADO DE PARCELAS -->
            <div v-else key="parcelas">
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

                  <!-- Ícono “forward” invertido -->
                  <img
                    src="/chevron_left_thin.png"
                    class="forward-icon"
                    alt="Forward"
                    slot="end"
                  />
                </ion-item>
              </ion-list>
            </div>
          </transition>
        </div>
      </div>

      <!-- FAB para crear nuevo recinto -->
      <ion-fab
        vertical="bottom"
        horizontal="center"
        slot="fixed"
        class="fab-position"
      >
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
  IonFabButton,
  IonButtons,
  IonButton
} from '@ionic/vue';

import { useRouter } from 'vue-router';
import Toolbar from '@/components/Toolbar.vue';

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
    IonButtons,
    IonButton,
    Toolbar
  },
  data() {
    return {
      selectedView: 'Recintos', // Valor inicial
      previousView: 'Recintos',
      transitionName: 'slide-left', // Valor por defecto
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
  watch: {
    selectedView(newVal, oldVal) {
      if (newVal === 'Parcelas' && oldVal === 'Recintos') {
        this.transitionName = 'slide-left';
      } else if (newVal === 'Recintos' && oldVal === 'Parcelas') {
        this.transitionName = 'slide-right';
      }
      this.previousView = oldVal;
    }
  },
  setup() {
    const router = useRouter();

    /**
     * FAB para crear recinto
     */
    function goToCrearRecinto() {
      router.push({
        name: 'CrearRecinto',
        query: { initialActiveIndex: 1 }
      });
    }

    /**
     * Si el recinto tiene actividades, mostramos la vista de ActividadesRecintos.
     * (Se hace clic en la parte derecha)
     */
    function goToGestionCampos(recinto) {
      if (recinto.actividades > 0) {
        router.push({ name: 'ActividadesRecintos' });
      }
    }

    /**
     * Click en el ion-item completo:
     * Si es "Recinto 03", vamos a la vista RecintosSolos.
     */
    function onRecintoClick(recinto) {
      if (recinto.name === 'Recinto 03') {
        router.push({ name: 'RecintosSolo', params: { id: recinto.id } });
      }
    }

    /**
     * Botón de Back
     */
    function goBack() {
      router.back();
    }

    return {
      goToCrearRecinto,
      goToGestionCampos,
      onRecintoClick,
      goBack
    };
  }
};
</script>

<style scoped>
/* ====== CABECERA y subheader ====== */
ion-header.custom-header {
  box-shadow: none;
  border-bottom: 1px solid #ddd;
}
.title {
  text-align: center;
  color: #28a745;
  font-size: 20px;
  font-weight: bold;
  background-color: white;
  padding-top: 10px;
  height: 55px;
}
.subheader-toolbar {
  --background: #fff;
  border-bottom: 0.1 solid #ddd;
  height: 40px;
}
.subtitle {
  text-align: center;
  color: #28a745;
  font-size: 16px;
  font-weight: normal;
  padding-bottom: 10px;
}

/* Ícono de back */
.back-icon {
  width: 10px;
  height: 20px;
}

/* ====== CONTENEDOR PRINCIPAL ====== */
.recintos-content {
  --background: #fff;
  position: relative;
  padding-top: 20px;
  padding-bottom: 150px;
}
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

/* ====== LISTA DE RECINTOS/PARCELAS ====== */
.list-wrapper {
  margin-top: 20px;
  padding: 20px;
  padding-bottom: 150px;
}
.ion-item-custom {
  margin: 10px 15px; /* mayor separación vertical */
  padding: 15px 12px; /* mayor espacio interno */
  border-radius: 8px;
  --background: #fff;
  border-bottom: 1px solid #eee;
}

/* Separación de líneas en los datos del recinto/parcela */
.recinto-name,
.parcela-name {
  font-size: 16px;
  font-weight: bold;
  color: #777;
  margin-bottom: 8px; /* mayor separación debajo del título */
}
.recinto-id,
.parcela-id,
.recinto-area,
.parcela-area {
  font-size: 14px;
  margin: 4px 0; /* mayor espacio entre cada línea */
}
.recinto-area,
.parcela-area {
  color: #28a745;
  font-weight: 600;
}

/* Botones "Ver Actividades" / "Sin Actividades" */
.ver-actividades {
  color: #28a745;
  font-size: 14px;
  font-weight: bold;
  margin-left: 70px;  /* espacio entre icono e texto */
}
.sin-actividades {
  color: #999;
  font-size: 14px;
  font-weight: bold;
  margin-left: 70px;  /* espacio entre icono e texto */
}

/* Ícono “forward” invertido */
.forward-icon {
  width: 7px;
  height: 15px;
  transform: scaleX(-1); /* espeja la flecha para que apunte a la derecha */
  cursor: pointer;
}

/* Right content (icon + texto Actividades) */
.right-content {
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* ====== FAB ====== */
.fab-position {
  bottom: 275px;
}
.custom-fab {
  --background: #f2f2f2;
  --color: #28a745;
  --box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, 0.15);
}
.custom-fab:hover {
  --background: #28a745;
  --border: 2px solid #28a745;
  --color: white;
}

/* ====== TRANSICIONES ====== */
.slide-container {
  position: relative;
  overflow: hidden;
}
.slide-container > * {
  width: 100%;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease;
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
ion-toolbar {
  --ion-title-text-align: center;
  display: flex;
  align-items: center;
}

/* Baja un poco el botón/imágen de “back” */
ion-buttons[slot="start"] {
  margin-top: 15px;
  margin-left: 10px;
  margin-right: -35px;
}
</style>
