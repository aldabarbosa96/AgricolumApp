<template>
  <!-- El click en el contenedor se detiene para evitar propagación -->
  <div class="carousel-container" @click.stop>
    <div class="carousel-wrapper" ref="carouselWrapper">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
        :class="{ active: index === activeIndex }"
        @click="goToSlide(index)"
      >
        <span>{{ item.title }}</span>
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
      items: [
        { title: 'Actividad' },
        { title: 'Recinto' },
        { title: 'Parcela' }
      ]
    };
  },
  mounted() {
    nextTick(() => {
      setTimeout(() => {
        this.updatePosition();
      }, 100);
    });
  },
  methods: {
    updatePosition() {
      const carousel = this.$refs.carouselWrapper;
      if (!carousel) return;

      const container = carousel.parentElement;
      const containerWidth = container.clientWidth;
      const wrapperWidth = carousel.clientWidth;
      const wrapperLeft = (containerWidth - wrapperWidth) / 2;

      const activeItem = carousel.children[this.activeIndex];
      if (!activeItem) return;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;

      const offset = containerWidth / 2 - (wrapperLeft + itemLeft + itemWidth / 2);
      carousel.style.transform = `translateX(${offset}px)`;
    },
    goToSlide(index) {
  if (this.activeIndex === index) {
    // Si ya está seleccionado, emitir evento de navegación
    this.$emit('item-selected', this.items[index]);
  } else {
    this.activeIndex = index;
    this.$nextTick(() => {
      this.updatePosition();
    });
    setTimeout(() => {
      this.$emit('item-selected', this.items[index]);
    }, 300);
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
  transition: transform 0.3s ease-out;
  will-change: transform;
  background: #ffffff;
  border-radius: 50px;
  padding: 10px 25px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  justify-content: center;
}

.carousel-item {
  min-width: 120px;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #4d7c3d;
  cursor: pointer;
  white-space: nowrap;
  opacity: 0.5;
  transition: opacity 0.3s, color 0.3s;
}

.carousel-item.active {
  opacity: 1;
  color: #2d5c2d;
}
</style>
