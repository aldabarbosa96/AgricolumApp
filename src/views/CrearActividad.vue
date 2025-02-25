<template>
  <!-- Se añade la clase de fade-out a la ion-page cuando corresponda -->
  <ion-page :class="{ 'fade-out': fadeOut }">
    <ion-header class="custom-header">
      <ion-title class="title">Nueva Actividad</ion-title>
    </ion-header>

    <ion-content
      class="ion-padding custom-content"
      :style="{'--background': '#fff', '--padding-top': '8px', position: 'relative'}"
    >
      <!-- Contenedor principal que se difumina cuando aparece el popup -->
      <div class="content-wrapper" :class="{ blur: showSuccessPopup }">
        <!-- Divider superior -->
        <div class="divider top-divider"></div>

        <!-- Lista de opciones -->
        <div class="options-list">
          <!-- Opción: Tipo -->
          <div class="option-item">
            <div class="option-left">
              <img src="/List.png" alt="Icono Tipo" class="option-icon" />
              <span class="option-label">Tipo</span>
            </div>
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>

          <!-- Opción: Planificada (checkbox) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Tasklist.png" alt="Icono Planificada" class="option-icon" />
              <span class="option-label">Planificada</span>
            </div>
            <ion-checkbox color="success" class="option-plus"></ion-checkbox>
          </div>

          <!-- Opción: Campo -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Location.png" alt="Icono Campo" class="option-icon" />
              <span class="option-label">Campo</span>
            </div>
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>

          <!-- Opción: Trabajadores -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Worker.png" alt="Icono Trabajadores" class="option-icon" />
              <span class="option-label">Trabajadores</span>
            </div>
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>

          <!-- Opción: Maquinaria -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Tractor.png" alt="Icono Maquinaria" class="option-icon" />
              <span class="option-label">Maquinaria</span>
            </div>
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>

          <!-- Opción: Fecha -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Calendar.png" alt="Icono Fecha" class="option-icon" />
              <span class="option-label">Fecha</span>
            </div>
            <div class="option-date">
              19 / 12 / 2024
            </div>
          </div>
        </div>

        <!-- Divider inferior -->
        <div class="divider bottom-divider"></div>

        <!-- Sección de adjuntos -->
        <div class="attachments">
          <div class="attachment-item">Albarán</div>
          <div class="attachment-item">Notas</div>
          <div class="attachment-item">Fotos</div>
          <div class="attachment-item">Documentos</div>
        </div>
      </div>

      <!-- Popup overlay que cubre todo el contenido -->
      <div v-if="showSuccessPopup" class="popup-overlay">
        <div class="popup-content">
          <h2>¡Recinto creado y guardado con éxito!</h2>
        </div>
      </div>
    </ion-content>

    <!-- ConfirmToolbar se muestra solo cuando no está el popup -->
    <ConfirmToolbar
      v-if="!showSuccessPopup"
      @cancel="handleCancel"
      @save="handleSave"
    />
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonButton,
  IonCheckbox
} from '@ionic/vue';
import ConfirmToolbar from '@/components/ConfirmToolbar.vue';

export default {
  name: "Crear",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonButton,
    IonCheckbox,
    ConfirmToolbar
  },
  data() {
    return {
      showSuccessPopup: false,
      fadeOut: false
    };
  },
  methods: {
    handleCancel() {
      console.log("Has pulsado Cancelar");
      // Lógica para cancelar (puedes agregar navegación u otra acción)
    },
    handleSave() {
      console.log("Has pulsado Guardar");
      // Muestra el popup
      this.showSuccessPopup = true;
      // Espera 1 segundo para mostrar el mensaje y luego inicia fade-out
      setTimeout(() => {
        this.fadeOut = true;
        // Tras 0.5 segundos (duración de la transición), navega a Home
        setTimeout(() => {
          this.$router.push({ name: 'Home' });
        }, 500);
      }, 1000);
    }
  }
};
</script>

<style scoped>
/* Transición de opacidad para la ion-page */
ion-page {
  transition: opacity 0.5s ease;
  opacity: 1;
}
ion-page.fade-out {
  opacity: 0;
}

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

.ion-padding {
  --ion-safe-area-bottom: 0px;
}

/* Contenedor principal de contenido para aplicar blur */
.content-wrapper {
  position: relative;
}

/* Efecto blur al mostrar el popup */
.blur {
  filter: blur(4px);
  -webkit-filter: blur(4px);
}

/* Estilos para divisores, opciones y adjuntos */
.divider {
  height: 1px;
  background-color: #ddd;
  border: none;
}
.top-divider {
  margin: -5px 0 15px 0; 
}
.bottom-divider {
  margin: 25px 0; 
}
.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
}
.option-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.option-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-left: 20px;
}
.option-label {
  font-size: 16px;
  color: #28a745;
  font-weight: 500;
  margin-left: 20px;
}
.option-plus {
  font-size: 25px;
  --padding-start: 0;
  --padding-end: 0;
  margin-right: 20px;
}
option-item ion-checkbox {
  margin-right: 20px;
}
ion-checkbox::part(container) {
  background: white !important;
  border-color: black !important;
}
ion-checkbox {
  --checkmark-color: #28a745;
}
ion-checkbox::part(checkmark) {
  color: #28a745 !important;
}
.option-date {
  font-size: 16px;
  color: #333;
  margin-right: 20px;
}
.attachments {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px;
}
.attachment-item {
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* Estilos para el popup overlay y contenido */
.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
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
