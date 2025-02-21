<template>
  <div class="statusBar">
    <!-- Icono izquierdo -->
    <img class="leftSideIcon" alt="Left Side Icon" src="/leftSide.svg">

    <!-- Contenedor de los iconos de la derecha -->
    <div class="right-icons">
      <img v-if="rightIcon === 'rightSide1'" class="rightSideIcon" alt="Right Side Icon 1" src="/rightSide1.svg">
      <img v-if="rightIcon === 'rightSide2'" class="rightSideIcon" alt="Right Side Icon 2" src="/rightSide2.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',
  props: {
    rightIcon: {
      type: String,
      default: 'rightSide1' // Icono por defecto
    }
  }
}
</script>

<style scoped>
/* Barra de estado */
.statusBar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background: transparent;
  z-index: 1000;
}

/* Contenedor de iconos de la derecha */
.right-icons {
  display: flex;
  gap: 8px; /* Espaciado entre iconos */
}

/* Iconos */
.rightSideIcon {
  height: 18px;
}

.leftSideIcon {
  height: 25px;
}
</style>
