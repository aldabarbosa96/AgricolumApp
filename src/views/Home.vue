<template>
  <ion-page>
    <Toolbar />

    <ion-content>
      <!-- Mapa con scroll en ambos ejes -->
      <div class="map-container">
        <img src="/mapa.png" alt="Mapa" class="map-image" />
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
import StatusBar from '@/components/StatusBar.vue';
import Dropdown from '@/components/BottomSheet.vue';
import FloatingButtons from '@/components/SideIconBar.vue';

export default {
  components: {
    IonPage,
    IonContent,
    Toolbar,
    StatusBar,
    Dropdown,
    FloatingButtons
  }
}
</script>

<style scoped>
/* Contenedor del mapa: se activa scroll en ambos ejes */
.map-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

/* Mapa: se usa el tamaño natural o mayor para permitir scroll */
.map-image {
  /* Se establece un tamaño mínimo para asegurar scroll si la imagen es mayor que el contenedor */
  min-width: 100%;
  min-height: 100%;
  /* Se remueve object-fit: cover para que la imagen no se ajuste automáticamente */
  display: block;
}
</style>
