<template>
  <div class="floating-buttons">
    <div class="floating-button">
      <img src="/paint.png" alt="Paint" class="paint-icon" />
    </div>
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
      isLocationActive: false
    };
  },
  methods: {
    toggleLocation() {
      this.isLocationActive = !this.isLocationActive;
    }
  }
};
</script>

<style scoped>
.floating-buttons {
  position: fixed;
  right: 20px;
  bottom: 200px; /* Ajusta este valor para que quede justo por encima del desplegable inferior */
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaciado entre cada botón */
  z-index: 900; /* Mayor que el bottom sheet para que siempre se vea */
}

.floating-button {
  width: 40px;
  height: 40px;
  background-color: rgba(190, 190, 190, 0.8); /* Fondo más opaco */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

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
