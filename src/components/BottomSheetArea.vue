<template>
  <div :class="['bottom-sheet', { 'expanded': isOpen }]">
    <div class="tab-trigger" @click="toggleSheet" @click.stop>  
      <div class="handle"></div>
      <div class="tab-label">Área seleccionada</div>
    </div>

    <div class="bottom-sheet-content">
      <div class="area-info">
        <span class="area-value">Area 8.3066 ha.</span> <br>
        <span class="area-text">Lubida bis American 40</span> <br>
        <span class="area-text">Brasemala Hipica Restaurant</span> <br>
        <span class="area-text">TOOL MARKET</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "BottomSheetArea",
  setup() {
    const isOpen = ref(false);

    function toggleSheet() {
      isOpen.value = !isOpen.value;
    }

    return {
      isOpen,
      toggleSheet
    };
  }
};
</script>

<style scoped>
/* ----------------------------------
   Bottom Sheet contenedor
------------------------------------- */
.bottom-sheet {
  position: fixed;
  bottom: 80px;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 50px 50px 0 0;
  transition: transform 0.5s ease-in-out;
  transform: translateY(0%);
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

/* Pestaña */
.tab-trigger {
  width: 100%;
  height: 70px;
  background: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50px 50px 0 0;
}

/* Tirador (línea redondeada) */
.handle {
  width: 55px;
  height: 5px;
  background-color: #898989;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: -15px;
}

/* Texto "Área seleccionada" */
.tab-label {
  font-weight: bold;
  font-size: 14px;
  color: #8E8E8E;
}

/* ----------------------------------
   Contenido interno con transición
------------------------------------- */
.bottom-sheet-content {
  overflow: hidden;
  height: 0;
  opacity: 0;
  transition: height 0.8s ease, opacity 0.8s ease;
  padding: 0; /* Sin padding en estado cerrado */
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}


.bottom-sheet.expanded .bottom-sheet-content {
  opacity: 1;
  height: 30vh; /* Altura más pequeña */
  overflow-y: auto;
}


/* ----------------------------------
   Información del Área
------------------------------------- */
.area-info {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar elementos horizontalmente */
}


.area-value {
  font-size: 20px;
  font-weight: bold;
  color: #28a745; /* Verde */
  margin-bottom: 10px; /* Espacio debajo del valor del área */
}

.area-text {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 5px; /* Espacio entre líneas de texto */
}
</style>