<template>
  <ion-page>
    <Toolbar />

    <ion-content :style="{ '--background': 'transparent' }">
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

      <!-- Contenedor a pantalla completa con scroll -->
      <div class="map-card">
        <!-- 
          Aquí tenemos DOS <img>:
            1) El "current" (si existe)
            2) El "next" (si existe), en posición absoluta superpuesta
          Hacemos crossfade en CSS.
        -->
        <!-- Imagen actual -->
        <img
          v-if="currentMap"
          :src="currentMap"
          class="map-image current-image"
          alt="Mapa actual"
        />
        <!-- Imagen próxima (superpuesta) -->
        <img
          v-if="nextMap"
          :src="nextMap"
          class="map-image next-image"
          alt="Mapa siguiente"
        />
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
  name: 'CrossfadeMap',
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
      showActividades: true,  // Activado por defecto
      showRecintos: false,
      showParcelas: false,

      // Manejo de imágenes
      currentMap: '', // La imagen que se ve actualmente
      nextMap: ''     // La imagen que se va a superponer (en fade-in)
    };
  },

  computed: {
    // Imagen objetivo según capas
    targetMap() {
      const act = this.showActividades;
      const rec = this.showRecintos;
      const par = this.showParcelas;

      // Tres capas
      if (act && rec && par) return 'mapa7.png';
      // Dos capas
      if (act && rec) return 'mapa5.png';
      if (rec && par) return 'mapa6.png';
      if (act && par) return 'mapa.png';
      // Una capa
      if (act) return 'mapa.png';
      if (rec) return 'mapa4.png';
      if (par) return 'mapa8.png';
      // Ninguna
      return 'mapa6.png';
    }
  },

  watch: {
    /**
     * Cuando cambia la imagen “objetivo”:
     * 1) Pre-cargamos la nueva
     * 2) La asignamos a nextMap => dispara crossfade
     * 3) Tras la animación, nextMap pasa a ser currentMap,
     *    y vaciamos nextMap.
     */
    targetMap: {
      immediate: true,
      handler(newSrc) {
        if (!newSrc) {
          // Sin imagen
          this.currentMap = '';
          this.nextMap = '';
          return;
        }

        // 1) Pre-carga
        const img = new Image();
        img.src = newSrc;
        img.onload = () => {
          // 2) Asignamos a nextMap para iniciar el crossfade
          this.nextMap = newSrc;

          // Esperamos un lapso similar al de la animación CSS, 
          // para terminar el crossfade (ej. 400 ms)
          setTimeout(() => {
            // 3) La next pasa a ser la actual
            this.currentMap = newSrc;
            // y vaciamos la next
            this.nextMap = '';
          }, 400); 
        };
      }
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
/* Botones superiores */
.top-buttons-container {
  position: absolute;
  top: 60px; /* Ajusta según la altura del Toolbar */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 999;
}

/* Botón "pill" */
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
.map-button.active {
  background-color: #5ab06c;
  color: #fff;
}

/* Contenedor scroll */
.map-card {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  margin: 0;
  padding: 0;
  background: #f0f0f0; 
}

/* Ambas imágenes comparten estilo base */
.map-image {
  display: block;
  max-width: none;
  height: auto;
  margin: 0 auto;
  transform: scale(1) translateX(-35%);
  transform-origin: center center;
}

/* La imagen "current" (la que ya se ve) */
.current-image {
  /* No animamos su opacidad aquí, se mantiene a 1 */
  position: relative; /* se queda en el flujo normal */
  z-index: 1;
}

/* La imagen "next" (superpuesta) */
.next-image {
  /* Posicionamos absoluta encima de la actual */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  /* Empieza con opacidad 0 => fadeIn */
  animation: crossfade-in 0.4s ease forwards;
}

/* ANIMACIÓN de crossfade para la nueva imagen */
@keyframes crossfade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
