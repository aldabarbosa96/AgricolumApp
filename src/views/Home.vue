<template>
  <ion-page>
    <Toolbar />

    <ion-content>
      <!-- Botones superiores para seleccionar capas -->
      <div class="top-buttons-container">
        <button
          class="map-button"
          :class="{ active: showActividades }"
          @click="toggleActividades"
        >
          Actividades
        </button>
        <button
          class="map-button"
          :class="{ active: showRecintos }"
          @click="toggleRecintos"
        >
          Recintos
        </button>
        <button
          class="map-button"
          :class="{ active: showParcelas }"
          @click="toggleParcelas"
        >
          Parcelas
        </button>
      </div>

      <!-- Contenedor a pantalla completa con scroll en ambas direcciones -->
      <div class="map-card">
        <!-- Transición suave al cambiar de imagen sin flash blanco -->
        <transition name="fade" mode="in-out">
          <img
            :key="currentMap"
            :src="currentMap"
            alt="Mapa"
            class="map-image"
          />
        </transition>
      </div>
    </ion-content>

    <!-- Desplegable inferior -->
    <Dropdown />

    <!-- Botones flotantes -->
    <FloatingButtons />
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue';
import Dropdown from '@/components/BottomSheet.vue';
import FloatingButtons from '@/components/SideIconBar.vue';

export default {
  components: {
    IonPage,
    IonContent,
    Toolbar,
    Dropdown,
    FloatingButtons
  },
  data() {
    return {
      // Estado de cada capa
      showActividades: true,  // activado por defecto
      showRecintos: false,
      showParcelas: false
    };
  },
  computed: {
    currentMap() {
      // Lógica para decidir qué imagen mostrar según las capas activas
      const act = this.showActividades;
      const rec = this.showRecintos;
      const par = this.showParcelas;

      // Las tres capas activas
      if (act && rec && par) return 'mapa5.png';

      // Dos capas activas
      if (act && rec) return 'mapa5.png';
      if (rec && par) return 'mapa4.png';
      if (act && par) return 'mapa.png';

      // Una capa activa
      if (act) return 'mapa.png';
      if (rec) return 'mapa4.png';
      if (par) return 'mapa6.png';

      // Si todas están desmarcadas
      return 'mapa6.png';
    }
  },
  methods: {
    toggleActividades() {
      this.showActividades = !this.showActividades;
    },
    toggleRecintos() {
      this.showRecintos = !this.showRecintos;
    },
    toggleParcelas() {
      this.showParcelas = !this.showParcelas;
    }
  }
};
</script>

<style scoped>
/* Contenedor para los botones superiores */
.top-buttons-container {
  position: absolute;
  top: 60px; /* Ajustar según la altura de tu Toolbar */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 999; /* Asegúrate de que quede por encima del mapa */
}

/* Botones tipo "pill" estilo Google Maps */
.map-button {
  background-color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Botón activo resaltado en verde */
.map-button.active {
  background-color: #5ab06c;
  color: #fff;
}

/* Contenedor a pantalla completa */
.map-card {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll; /* Permite desplazar en ambas direcciones */
  margin: 0;
  padding: 0;
}

/* Imagen con zoom y conservando proporciones */
.map-image {
  display: block;
  margin: 0 auto;
  transform: scale(1) translateX(-35%);
  transform-origin: center center;
  max-width: none;
  height: auto;
}

/* Transiciones para el cambio de imagen (fade) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
