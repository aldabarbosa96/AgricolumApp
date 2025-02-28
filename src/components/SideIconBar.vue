<template>
  <div class="floating-buttons">
    <!-- Botón de "pintura" -->
    <div
      class="floating-button"
      :class="{ active: isPaintActive }"
      @click="onPaintClick"
    >
      <img src="/paint.png" alt="Paint" class="paint-icon" />
    </div>

    <!-- Botón de "ubicación" -->
    <div
      class="floating-button"
      :class="{ active: isLocationActive }"
      @click="toggleLocation"
    >
      <img src="/location.png" alt="Location" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FloatingButtons",
  data() {
    return {
      isLocationActive: false,
      isPaintActive: false
    };
  },
  methods: {
    toggleLocation() {
      this.isLocationActive = !this.isLocationActive;
    },
    onPaintClick() {
      // Resalta en verde al hacer clic
      this.isPaintActive = !this.isPaintActive;

      // Navega a la vista FiltroColores
      this.$router.push({ name: "FiltroColores" });
    }
  }
};
</script>

<style scoped>
.floating-buttons {
  position: fixed;
  right: 20px;
  bottom: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 900;
}

.floating-button {
  width: 40px;
  height: 40px;
  background-color: rgba(190, 190, 190, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

/* Cambia a verde cuando está activo */
.floating-button.active {
  background-color: #5ab06c;
}

/* Icono por defecto */
.floating-button img {
  width: 28px;
  height: 28px;
}

/* Icono "paint" ligeramente más pequeño */
.floating-button img.paint-icon {
  width: 24px;
  height: 24px;
}
</style>
