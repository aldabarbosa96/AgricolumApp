<template>
    <div class="crossfade-container">
      <!-- Imagen anterior: se muestra mientras la nueva se carga -->
      <img v-if="oldSrc" :src="oldSrc" class="image old" alt="Mapa anterior" />
      <!-- Imagen actual: comienza opaca y se desvanece -->
      <img v-if="currentSrc" :src="currentSrc" class="image new" alt="Nuevo mapa" />
    </div>
  </template>
  
  <script>
  export default {
    name: "CrossFadeImage",
    props: {
      src: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        default: 300  // duración de la transición en ms
      }
    },
    data() {
      return {
        currentSrc: this.src,
        oldSrc: null
      };
    },
    watch: {
      src(newSrc) {
        // Si la imagen cambia, asignamos la imagen actual a oldSrc y precargamos la nueva
        if (newSrc !== this.currentSrc) {
          this.oldSrc = this.currentSrc;
          const img = new Image();
          img.onload = () => {
            this.currentSrc = newSrc;
            // Después de la transición, limpiamos oldSrc
            setTimeout(() => {
              this.oldSrc = null;
            }, this.duration);
          };
          img.src = newSrc;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .crossfade-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  /* Las imágenes se posicionan de forma absoluta para solaparse */
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    object-fit: contain;
    transition: opacity 0.3s ease;
  }
  
  /* La imagen antigua permanece opaca hasta que se desvanece */
  .old {
    opacity: 1;
    z-index: 1;
  }
  
  /* La nueva imagen comienza invisible y se desvanece a 1 */
  .new {
    opacity: 0;
    z-index: 2;
    animation: fadeIn 0.3s forwards;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  </style>
  