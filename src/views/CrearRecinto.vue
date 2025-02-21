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
      <!-- Mapa de fondo -->
      <div class="map-container">
        <img src="/mapaRecintos.png" alt="Mapa de Recintos" class="map-image" />
      </div>

      <!-- Botones flotantes -->
      <FloatingButtons />

      <!-- Carousel posicionado abajo, se muestra solo si showCarousel es true -->
      <CarouselComponent 
        v-if="showCarousel"
        :initialActiveIndex="initialActiveIndex"
        @item-selected="handleSelection" 
        class="carousel-bottom" 
      />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue';
import FloatingButtons from '@/components/SideIconBar.vue';
import CarouselComponent from '@/components/Carrousel.vue';

export default {
  name: 'CrearRecinto',
  components: {
    IonPage,
    IonContent,
    Toolbar,
    FloatingButtons,
    CarouselComponent
  },
  data() {
    return {
      showCarousel: true
    };
  },
  computed: {
    initialActiveIndex() {
      // Lee el parámetro de la ruta y lo convierte a número, por defecto 0
      return this.$route.query.initialActiveIndex
        ? parseInt(this.$route.query.initialActiveIndex, 10)
        : 0;
    }
  },
  methods: {
    handleSelection(item) {
      if (item.title === 'Actividad') {
        this.$router.push({ path: '/carrousel', query: { initialActiveIndex: 0 } });
      } else if (item.title === 'Parcela') {
        this.$router.push({ path: '/parcela', query: { initialActiveIndex: 2 } });
      }
    },
    handleGlobalClick() {
      // Al hacer click fuera del carousel, se oculta el carousel
      this.showCarousel = false;
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

/* Posiciona el carrusel en la parte inferior */
.carousel-bottom {
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
}
</style>
