<template>
    <ion-page>
      <ion-content
        style="position: relative;"
        :fullscreen="true"
        :scroll="false"
        :style="{'--background': 'transparent'}"
      >
        <!-- Contenedor del mapa (se difumina cuando se muestra el pop-up) -->
        <div class="map-container" :class="{ blur: showPopup }">
          <img src="/mapa.png" alt="Mapa" class="map-image" />
        </div>
  
        <!-- Overlay del pop-up; al pulsar fuera (click.self) se navega a Home -->
        <div v-if="showPopup" class="popup-overlay" @click.self="goHome">
          <div class="popup-content">
            <!-- Encabezado fijo: título y dropdown con flecha -->
            <div class="popup-title-row" @click="toggleListView">
              <span class="popup-label">Colorear por:</span>
              <div class="dropdown">
                <span class="dropdown-value">
                  {{ selectedMainOption ? selectedMainOption : 'Selecciona' }}
                </span>
                <span class="caret" :class="{ rotated: !isMainList }">▾</span>
              </div>
            </div>
  
            <!-- Contenido del desplegable -->
            <transition name="slide-fade">
              <div v-if="isMainList" key="main">
                <ul class="popup-list">
                  <li
                    v-for="(option, index) in mainOptions"
                    :key="index"
                    @click.stop="selectMainOption(option)"
                  >
                    {{ option }}
                  </li>
                </ul>
              </div>
              <div v-else key="sub">
                <ul class="popup-list">
                  <li
                    v-for="(item, idx) in subOptions[selectedMainOption]"
                    :key="idx"
                    @click.stop="selectSubOption(item)"
                  >
                    <span class="sub-text">{{ item.label }}</span>
                    <span
                      class="color-swatch"
                      :style="{ backgroundColor: item.color }"
                    ></span>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </ion-content>
  
      <!-- Toolbar inferior -->
      <Toolbar />
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonContent } from '@ionic/vue';
  import Toolbar from '@/components/Toolbar.vue';
  
  export default {
    name: 'FiltroColores',
    components: {
      IonPage,
      IonContent,
      Toolbar
    },
    data() {
      return {
        showPopup: true,          // Se muestra el pop-up al entrar
        isMainList: true,         // true: lista principal; false: sublista
        selectedMainOption: null, // Almacena la opción principal seleccionada
        mainOptions: ['Cultivos', 'Explotaciones', 'Trabajos', 'Variedades', 'Sin colores'],
        // Subopciones para cada opción principal; el recuadro de color irá a la derecha
        subOptions: {
          'Cultivos': [
            { label: 'Maíz', color: '#FFD700' },
            { label: 'Trigo', color: '#F5DEB3' },
            { label: 'Girasol', color: '#FFD700' }
          ],
          'Explotaciones': [
            { label: 'Explotación 1', color: '#87CEEB' },
            { label: 'Explotación 2', color: '#6495ED' }
          ],
          'Trabajos': [
            { label: 'Siembra', color: '#90EE90' },
            { label: 'Cosecha', color: '#FA8072' }
          ],
          'Variedades': [
            { label: 'Variedad A', color: '#FFB6C1' },
            { label: 'Variedad B', color: '#DB7093' }
          ],
          'Sin colores': [] // Al pulsar "Sin colores" se vuelve a Home
        }
      };
    },
    methods: {
      // Al pulsar en la flecha o encabezado, alterna entre la lista principal y la sublista (si ya se seleccionó una opción)
      toggleListView() {
        if (this.selectedMainOption) {
          this.isMainList = !this.isMainList;
        }
      },
      // Selección en la lista principal
      selectMainOption(option) {
        if (option === 'Sin colores') {
          this.goHome();
        } else {
          this.selectedMainOption = option;
          this.isMainList = false;
        }
      },
      // Selección en la sublista: se puede guardar la selección y luego se navega a Home
      selectSubOption(item) {
        this.goHome();
      },
      // Navega a Home
      goHome() {
        this.$router.push({ name: 'Home' });
      }
    }
  };
  </script>
  
  <style scoped>
  /* ion-content con fondo transparente */
  ion-content {
    --background: transparent;
    position: relative;
  }
  
  /* Contenedor del mapa */
  .map-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .map-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .blur {
    filter: blur(4px);
    -webkit-filter: blur(4px);
    z-index: 9999;
  }
  
  /* Overlay del pop-up */
  .popup-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Contenedor del pop-up */
  .popup-content {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    width: 300px;
    padding: 16px;
    position: relative;
  }
  
  /* Encabezado del pop-up */
  .popup-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 8px;
  }
  .popup-label {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  .dropdown {
    display: flex;
    align-items: center;
    color: #666;
  }
  .dropdown-value {
    margin-right: 4px;
    font-size: 16px;
  }
  .caret {
    transition: transform 0.3s ease;
    font-size: 14px;
  }
  .caret.rotated {
    transform: rotate(180deg);
  }
  
  /* Listas desplegables centradas */
  .popup-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid #f0f0f0;
    text-align: center;
  }
  .popup-list li {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #333;
    gap: 8px;
  }
  .popup-list li:first-child {
    border-top: none;
  }
  .popup-list li:hover {
    background-color: #f9f9f9;
  }
  
  /* El recuadro de color en la sublista va a la derecha */
  .color-swatch {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  
  /* Transición suave para el cambio entre listas */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-5px);
  }
  .slide-fade-enter-to,
  .slide-fade-leave-from {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
  </style>
  