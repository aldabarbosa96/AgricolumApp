<template>
  <ion-page>
    <Toolbar />

    <ion-content
      @click="handleGlobalClick"
      style="position: relative;"
      :fullscreen="true"
      :scroll="false"
      :style="{'--background': 'transparent'}"
    >
      <div class="map-container" @click.stop="handleMapClick">
        <img src="/mapaRecintos.png" alt="Mapa de Recintos" class="map-image" />
      </div>

      <FloatingButtons />

      <BottomSheetRecintos />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue';
import FloatingButtons from '@/components/SideIconBar.vue';
import BottomSheetRecintos from '@/components/BottomSheetRecintos.vue';

export default {
  name: 'RecintosSIGPAC',
  components: {
    IonPage,
    IonContent,
    Toolbar,
    FloatingButtons,
    BottomSheetRecintos
  },
  methods: {
    handleGlobalClick() {
      console.log('Global click en RecintosSIGPAC - Navegando a RecintosSIGPAC2');
      this.$router.push({ name: 'RecintosSIGPAC2' });
    },
    handleMapClick() {
      console.log('Mapa clickeado en RecintosSIGPAC - Navegando a RecintosSIGPAC2');
      this.$router.push({ name: 'RecintosSIGPAC2' });

    }
  }
};
</script>

<style scoped>
/* Estilos RecintosSIGPAC - sin cambios */
ion-content {
  --background: transparent;
  position: relative;
}

/* Contenedor del mapa */
.map-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.map-image {
  min-width: 100%;
  min-height: 100%;
  display: block;
}
</style>