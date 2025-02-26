<template>
    <ion-page>
      <Toolbar />
  
      <ion-content
        @click="handleGlobalClick"
        style="position: relative; --background: transparent;"
        :fullscreen="true"
        :scroll="false"
      >
        <!-- Mapa de fondo -->
        <div class="map-container">
          <img src="/mapaRecintos.png" alt="Mapa de Recintos" class="map-image" />
        </div>
  
        <!-- Botones flotantes -->
        <FloatingButtons />
  
        <!-- Carrusel -->
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
    name: 'CrearRecintos2',
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
        return this.$route.query.initialActiveIndex
          ? parseInt(this.$route.query.initialActiveIndex, 10)
          : 0;
      }
    },
    methods: {
      handleSelection(item) {
        // Por ejemplo, aquí puedes mantener la misma lógica o modificarla.
        // En este ejemplo, solo se navega a otra vista si se pulsa "Actividad".
        if (item.title === 'Actividad') {
          this.$router.push({ path: '/carrousel', query: { initialActiveIndex: 0 } });
        }
        // Si se pulsa el item "Recinto" con lápiz, puedes hacer otra cosa o dejarlo así.
        else if (item.title === 'Recinto' && item.pencil) {
          this.$router.push({ path: '/recintos-dibujo', query: { initialActiveIndex: 1 } });
        }
      },
      handleGlobalClick() {
        this.$router.push('/recintos-dibujo');
      }
    }
  };
  </script>
  
  <style scoped>
  ion-content {
    position: relative;
    --background: transparent;
  }
  
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
  
  /* Posición común del carrusel */
  .carousel-bottom {
    position: absolute;
    bottom: 35px;
    left: 0;
    right: 0;
  }
  </style>
  