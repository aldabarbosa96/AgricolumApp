<template>
  <ion-page>
    <ion-header class="custom-header">
      <ion-title class="title">Nueva Actividad</ion-title>
    </ion-header>

    <!-- Agregamos @click al ion-content para capturar clics fuera del carrusel -->
    <ion-content
      @click="handleContentClick"
      class="ion-padding custom-content"
      style="position: relative; --background: #fff; --padding-top: 8px;"
    >
      <!-- Divider superior -->
      <div class="divider top-divider"></div>

      <!-- Sección de opciones principales -->
      <div class="options-list">
        <div class="option-item">
          <div class="option-left">
            <img src="/List.png" alt="Icono Tipo" class="option-icon" />
            <span class="option-label">Tipo</span>
          </div>
          <div class="option-right">
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>
        </div>

        <div class="option-item">
          <div class="option-left">
            <img src="/Tasklist.png" alt="Icono Planificada" class="option-icon" />
            <span class="option-label">Planificada</span>
          </div>
          <div class="option-right">
            <ion-checkbox color="success"></ion-checkbox>
          </div>
        </div>

        <div class="option-item">
          <div class="option-left">
            <img src="/Location3.png" alt="Icono Campo" class="option-icon" />
            <span class="option-label">Campo</span>
          </div>
          <div class="option-right">
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>
        </div>

        <div class="option-item">
          <div class="option-left">
            <img src="/Worker.png" alt="Icono Trabajadores" class="option-icon" />
            <span class="option-label">Trabajadores</span>
          </div>
          <div class="option-right">
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>
        </div>

        <div class="option-item">
          <div class="option-left">
            <img src="/Tractor.png" alt="Icono Maquinaria" class="option-icon" />
            <span class="option-label">Maquinaria</span>
          </div>
          <div class="option-right">
            <ion-button fill="clear" color="success" class="option-plus">+</ion-button>
          </div>
        </div>

        <div class="option-item">
          <div class="option-left">
            <img src="/Calendar.png" alt="Icono Fecha" class="option-icon" />
            <span class="option-label">Fecha</span>
          </div>
          <div class="option-right option-date">
            19 / 12 / 2024
          </div>
        </div>
      </div>

      <div class="divider bottom-divider"></div>

      <div class="attachments">
        <div class="attachment-item">Albarán</div>
        <div class="attachment-item">Notas</div>
        <div class="attachment-item">Fotos</div>
        <div class="attachment-item">Documentos</div>
      </div>

      <!-- El carrusel evita la propagación de clics con @click.stop -->
      <CarouselComponent
        class="carousel-bottom"
        @click.stop
        @item-selected="handleItemSelected"
      />
    </ion-content>
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
      // Si se hace clic en "Actividad" dentro del carrusel, no se realiza ninguna acción
      if (item.title === 'Actividad') {
        return;
      }
      if (item.title === 'Recinto') {
        this.$router.push({ path: '/recinto', query: { initialActiveIndex: 1 } });
      } else if (item.title === 'Recinto*') {
        this.$router.push({ path: '/recinto2', query: { initialActiveIndex: 2 } });
      }
    },
    handleContentClick() {
      // Al hacer clic fuera del carrusel se navega a la ventana de CrearActividad
      this.$router.push({ path: '/crear' });
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

.option-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
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
  text-align: right;
  margin-right: 25px;
  white-space: nowrap;
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

.carousel-bottom {
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
}
</style>
