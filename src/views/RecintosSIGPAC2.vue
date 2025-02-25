<template>
  <ion-page :class="{ 'fade-out': fadeOut }">
    <ion-content
      style="position: relative;"
      :fullscreen="true"
      :scroll="false"
      :style="{'--background': 'transparent'}"
    >
      <div 
        class="map-container" 
        :class="{ blur: showSuccessPopup }"
        @click.stop="handleGlobalClick"
      >
        <img src="/mapaVerde.png" alt="Mapa Recinto Verde" class="map-image" />
        <img src="/location2.png" alt="Location Icon" class="location-icon" />
      </div>

      <BottomSheetArea />

      <!-- Popup overlay que cubre toda la vista -->
      <div v-if="showSuccessPopup" class="popup-overlay">
        <div class="popup-content">
          <h2>¡Recinto creado y guardado con éxito!</h2>
        </div>
      </div>
    </ion-content>

    <!-- El ConfirmToolbar se muestra solo cuando no hay popup -->
    <ConfirmToolbar
      v-if="!showSuccessPopup"
      @cancel="handleCancel"
      @save="handleSave"
    />
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import ConfirmToolbar from '@/components/ConfirmToolbar.vue';
import BottomSheetArea from '@/components/BottomSheetArea.vue';

export default {
  name: 'RecintosSIGPAC2',
  components: {
    IonPage,
    IonContent,
    ConfirmToolbar,
    BottomSheetArea
  },
  data() {
    return {
      showSuccessPopup: false,
      fadeOut: false
    };
  },
  methods: {
    handleCancel() {
      this.$router.push({ name: 'RecintosSIGPAC' });
    },
    handleSave() {
      // Muestra el popup
      this.showSuccessPopup = true;
      // Espera 1 segundo para mostrar el popup y luego inicia el fade-out
      setTimeout(() => {
        this.fadeOut = true;
        // Después de 0.5 segundos (duración de la transición) navega a Home
        setTimeout(() => {
          this.$router.push({ name: 'Home' });
        }, 500);
      }, 1000);
    },
    handleGlobalClick() {
      this.$router.push({ name: 'RecintosSIGPAC' });
    }
  }
};
</script>

<style scoped>
ion-page {
  /* Transición para la opacidad en 0.5 segundos */
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
  min-width: 100%;
  min-height: 100%;
  display: block;
}

.location-icon {
  position: absolute;
  top: 225px;
  left: 50px;
  width: 40px;
  height: 40px;
  z-index: 9999;
}

/* Difumina el mapa cuando aparece el popup */
.blur {
  filter: blur(4px);
  -webkit-filter: blur(4px);
  z-index: 9999;
}

/* Overlay que cubre todo el ion-content */
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
  font-size: 20px; /* Texto algo más pequeño */
  margin: 0;
}

</style>
