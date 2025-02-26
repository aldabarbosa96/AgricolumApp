<template>
  <div class="carousel-container" ref="carouselContainer" @click.stop>
    <div class="carousel-wrapper" ref="carouselWrapper">
      <div
  v-for="(item, index) in items"
  :key="index"
  class="carousel-item"
  :class="{ active: index === activeIndex }"
  @click="goToSlide(index)"
>
  <div class="text-with-icon">
    <span>{{ item.title }}</span>
    <img 
      v-if="item.pencil"
      src="/pencil.png"
      alt="Pencil icon"
      class="pencil-icon"
    />
  </div>
</div>
</div>
    <Toolbar />
  </div>
</template>

<script>
import { nextTick } from 'vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'CarouselComponent',
  components: { Toolbar },
  props: {
    initialActiveIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeIndex: this.initialActiveIndex,
      // Se ha modificado el tercer item para incluir la propiedad 'pencil'
      items: [
        { title: 'Actividad' },
        { title: 'Recinto' },
        { title: 'Recinto', pencil: true }
      ],
      transitioning: false,
      // Mantenemos skipTransition activo al montar para posicionar sin animación
      skipTransition: true
    };
  },
  mounted() {
    // Esperamos a que se estabilice el layout y posicionamos sin animación
    this.$nextTick(() => {
      requestAnimationFrame(() => {
        this.updatePosition();
      });
    });
    window.addEventListener('resize', this.updatePosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updatePosition);
  },
  methods: {
    updatePosition() {
      const carousel = this.$refs.carouselWrapper;
      const container = this.$refs.carouselContainer;
      if (!carousel || !container) return;
      
      // Usamos clientWidth y offsetLeft para calcular el offset correcto
      const containerWidth = container.clientWidth;
      const wrapperWidth = carousel.clientWidth;
      const wrapperLeft = (containerWidth - wrapperWidth) / 2;
      
      const activeItem = carousel.children[this.activeIndex];
      if (!activeItem) return;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;
      
      const offset = containerWidth / 2 - (wrapperLeft + itemLeft + itemWidth / 2);
      
      // Si skipTransition está activo (al montar o en redimensionamientos), no se anima
      if (this.skipTransition) {
        carousel.style.transition = 'none';
      } else {
        carousel.style.transition = 'transform 0.3s ease-out';
      }
      carousel.style.transform = `translateX(${offset}px)`;
    },
    goToSlide(index) {
      if (this.transitioning) return;
      
      if (this.activeIndex === index) {
        // Si se pulsa el mismo slide, se emite el evento sin reposicionar
        this.$emit('item-selected', this.items[index]);
      } else {
        this.transitioning = true;
        // Al interactuar, desactivamos skipTransition para que la animación se vea
        this.skipTransition = false;
        this.activeIndex = index;
        this.$nextTick(() => {
          this.updatePosition();
          setTimeout(() => {
            this.$emit('item-selected', this.items[index]);
            this.transitioning = false;
          }, 300); // Duración que coincide con la transición CSS
        });
      }
    }
  }
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 90px;
}

.carousel-wrapper {
  display: flex;
  gap: 15px;
  will-change: transform;
  background: #ffffff;
  border-radius: 50px;
  padding: 10px 25px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  justify-content: center;
  box-sizing: border-box;
}

.carousel-item {
  flex: 1 1 auto;
  padding: 8px;
  text-align: center; /* Centra el contenido horizontalmente */
  font-size: 14px;
  font-weight: bold;
  color: #4d7c3d;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.5;
  transition: opacity 0.3s, color 0.3s;
}

.carousel-item.active {
  opacity: 1;
  color: #2d5c2d;
}

.pencil-icon {
  width: 16px;
  height: 16px;
}
.text-with-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center; /* Opcional, si quieres forzar que el texto y el icono se centren entre sí */
  gap: 5px; /* Espacio horizontal entre texto e icono */
}

@media (max-width: 600px) {
  .carousel-wrapper {
    width: 95%;
    padding: 10px 15px;
  }
  .carousel-item {
    font-size: 12px;
    padding: 6px;
  }
}
</style>
