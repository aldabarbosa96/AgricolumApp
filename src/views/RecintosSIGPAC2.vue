<template>
  <ion-page>
    <ion-content
      @click="handleGlobalClick"
      style="position: relative;"
      :fullscreen="true"
      :scroll="false"
      :style="{'--background': 'transparent'}"
    >
      <div class="map-container" @click.stop>
        <img src="/mapaVerde.png" alt="Mapa Recinto Verde" class="map-image" />
      </div>

      <BottomSheetArea />

    </ion-content>
    <ConfirmToolbar
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
  methods: {
    handleCancel() {
      console.log('Cancelar clickeado');
      this.$router.push({ name: 'RecintosSIGPAC' });
    },
    handleSave() {
      console.log('Guardar clickeado');
    },
    handleGlobalClick() {
      console.log('Global click en RecintosSIGPAC2 - Navegando a RecintosSIGPAC');
      this.$router.push({ name: 'RecintosSIGPAC' });
    }
  }
};
</script>

<style scoped>
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