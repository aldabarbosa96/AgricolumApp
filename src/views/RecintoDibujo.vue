<template>
  <ion-page :class="{ 'fade-out': fadeOut }">
    <!-- Renderiza la toolbar: si se ha delimitado el área (mínimo 3 puntos) se muestra la ConfirmToolbar -->
    <component 
      :is="isAreaSelected ? 'ConfirmToolbar' : 'Toolbar'" 
      v-if="!showSuccessPopup"
      v-on="isAreaSelected ? { cancel: handleCancel, save: handleSave } : {}"
    />

    <ion-content
      @click="handleGlobalClick"
      style="position: relative;"
      :fullscreen="true"
      :scroll="false"
      :style="{ '--background': 'transparent' }"
    >
      <!-- Mapa de fondo -->
      <div class="map-container" @click.stop="handleMapClick">
        <img src="/mapaRecintos.png" alt="Mapa de Recintos" class="map-image" />
        <!-- SVG overlay para dibujar puntos, líneas y el polígono relleno -->
        <svg class="drawing-overlay">
          <!-- Polígono relleno si hay al menos 3 puntos -->
          <polygon
            v-if="points.length >= 3"
            :points="points.map(p => p.x + ',' + p.y).join(' ')"
            fill="rgba(40, 167, 69, 0.3)"
            stroke="none"
          />
          <!-- Línea que conecta los puntos -->
          <polyline
            :points="points.map(p => p.x + ',' + p.y).join(' ')"
            stroke="#28a745"
            stroke-width="2"
            fill="none"
          />
          <!-- Círculo en cada punto -->
          <circle
            v-for="(point, index) in points"
            :key="index"
            :cx="point.x"
            :cy="point.y"
            r="5"
            fill="#28a745"
          />
        </svg>
      </div>

      <!-- Botones flotantes -->
      <FloatingButtons />

      <!-- Renderiza el bottom sheet solo si no se muestra el popup de éxito -->
      <component 
        v-if="!showSuccessPopup" 
        :is="isAreaSelected ? 'BottomSheetArea' : 'BottomSheetRecintos'" 
      />

      <!-- Popup de instrucciones -->
      <div v-if="showPopup" class="popup">
        <p>Toca en el mapa para añadir puntos y delimitar el área.</p>
        <p>Pulsa <span class="highlight">Guardar</span> al terminar.</p>
      </div>

      <!-- Popup overlay que indica que se guardó el recinto -->
      <div v-if="showSuccessPopup" class="popup-overlay">
        <div class="popup-content">
          <h2>¡Recinto creado y guardado con éxito!</h2>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue';
import ConfirmToolbar from '@/components/ConfirmToolbar.vue';
import FloatingButtons from '@/components/SideIconBar.vue';
import BottomSheetRecintos from '@/components/BottomSheetRecintos.vue';
import BottomSheetArea from '@/components/BottomSheetArea.vue';

export default {
  name: 'CrearRecintoDibujo',
  components: {
    IonPage,
    IonContent,
    Toolbar,
    ConfirmToolbar,
    FloatingButtons,
    BottomSheetRecintos,
    BottomSheetArea
  },
  data() {
    return {
      showPopup: true,         // Muestra el popup de instrucciones al inicio
      points: [],              // Array para almacenar los puntos dibujados
      showSuccessPopup: false, // Controla la visualización del popup de éxito
      fadeOut: false           // Para efecto fade-out al guardar
    };
  },
  computed: {
    // Se considera que se delimitó un área si hay al menos 3 puntos
    isAreaSelected() {
      return this.points.length >= 3;
    }
  },
  methods: {
    handleGlobalClick() {
      console.log('Click global - No cambia de vista');
    },
    handleMapClick(event) {
      // Obtiene las coordenadas relativas al contenedor del mapa
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Añade el nuevo punto al array
      this.points.push({ x, y });
      console.log(`Punto añadido: (${x}, ${y})`);
      // Oculta el popup de instrucciones tras el primer clic
      if (this.showPopup) {
        this.showPopup = false;
      }
    },
    handleCancel() {
      this.$router.push({ name: 'Home' });
    },
    handleSave() {
      // Muestra el popup de éxito
      this.showSuccessPopup = true;
      // Espera 1 segundo y luego inicia el fade-out
      setTimeout(() => {
        this.fadeOut = true;
        // Después de 0.5 segundos (duración de la transición) navega a Home
        setTimeout(() => {
          this.$router.push({ name: 'Home' });
        }, 500);
      }, 1000);
    }
  }
};
</script>

<style scoped>
ion-page {
  transition: opacity 0.5s ease;
  opacity: 1;
}

ion-page.fade-out {
  opacity: 0;
}

ion-content {
  --background: transparent;
  position: relative;
}

.map-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}

.map-image {
  width: 100%;
  height: auto;
  display: block;
}

/* SVG overlay para dibujar puntos, líneas y polígono */
.drawing-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Estilos del Pop-up de instrucciones */
.popup {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 14px;
  color: #333;
}

.highlight {
  font-weight: bold;
  color: #28a745;
}

/* Estilos para el popup overlay de éxito (similares a RecintosSIGPAC) */
.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  color: #28a745;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinea hacia la parte superior */
  padding-top: 350px;       /* Ajusta este valor según necesites */
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.popup-content h2 {
  font-size: 20px;
  margin: 0;
}
</style>
