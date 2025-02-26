<template>
  <ion-page>
    <ion-header class="custom-header">
      <ion-title class="title">Nueva Actividad</ion-title>
    </ion-header>

    <ion-content
      class="ion-padding custom-content"
      style="position: relative; --background: #fff; --padding-top: 8px;"
    >
      <!-- Divider superior -->
      <div class="divider top-divider"></div>

      <!-- Sección de opciones principales -->
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
            <img src="/Location3.png" alt="Icono Campo" class="option-icon" />
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
          <div class="option-date">19 / 12 / 2024</div>
        </div>
      </div>

      <!-- Divider inferior -->
      <div class="divider bottom-divider"></div>

      <!-- Sección de Albarán, Notas, Fotos, Documentos -->
      <div class="attachments">
        <div class="attachment-item">Albarán</div>
        <div class="attachment-item">Notas</div>
        <div class="attachment-item">Fotos</div>
        <div class="attachment-item">Documentos</div>
      </div>

      <!-- Componente del carrusel posicionado igual en ambas views -->
      <CarouselComponent class="carousel-bottom" @item-selected="handleItemSelected" />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonButton, IonCheckbox } from '@ionic/vue';
import CarouselComponent from '@/components/Carrousel.vue';

export default {
  name: 'CrearConCarousel',
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonButton,
    IonCheckbox,
    CarouselComponent
  },
  methods: {
    handleItemSelected(item) {
      if (item.title === 'Recinto') {
        this.$router.push({ path: '/recinto', query: { initialActiveIndex: 1 } });
      } else if (item.title === 'Actividad') {
        this.$router.push({ path: '/crear', query: { initialActiveIndex: 0 } });
      } else if (item.title === 'Recinto*') {
        this.$router.push({ path: '/recinto2', query: { initialActiveIndex: 2 } });
      }
    }
  }
};
</script>

<style scoped>
.ion-padding {
  --ion-safe-area-bottom: 0px;
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

/* Posición común del carrusel */
.carousel-bottom {
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
}
</style>
