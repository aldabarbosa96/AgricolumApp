<template>
  <ion-footer class="custom-footer">
    <img src="/Rectangle 1.png" alt="Toolbar Background" class="toolbar-bg" />
    <div class="toolbar-buttons">
      <div
        class="toolbar-item"
        :class="{ active: selectedItem === 'home' }"
        @click="selectItem('home')"
      >
        <img src="/Component 1.png" alt="Inicio" class="toolbar-icon" />
      </div>
      <div
        class="toolbar-item"
        :class="{ active: selectedItem === 'carrousel' }"
        @click="selectItem('carrousel')"
      >
        <img src="/Component 2.png" alt="Crear" class="toolbar-icon" />
      </div>
      <div
        class="toolbar-item"
        :class="{ active: selectedItem === 'menu' }"
        @click="selectItem('menu')"
      >
        <img src="/Group 15.png" alt="Menú" class="toolbar-icon" />
      </div>
    </div>
  </ion-footer>
</template>

<script>
import { IonFooter } from '@ionic/vue';

export default {
  components: {
    IonFooter
  },
  computed: {
    // Se extrae el item activo a partir de la ruta actual
    selectedItem() {
      // Si la ruta es, por ejemplo, '/home', se extrae 'home'
      return this.$route.path.replace('/', '') || 'home';
    }
  },
  methods: {
    selectItem(item) {
      this.$router.push(`/${item}`);
    }
  }
};
</script>

<style scoped>
.custom-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.toolbar-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 85px;
  z-index: -1;
}

.toolbar-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
}

.toolbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.2s ease-in-out;
  width: 60px;
  height: 60px;
  justify-content: center;
}

.toolbar-item.active {
  background-color: #b8e6c1;
}

.toolbar-icon {
  width: 40px;
  height: auto;
}

.toolbar-item.active img {
  opacity: 1;
}
</style>
