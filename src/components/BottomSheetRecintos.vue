<template>
  <div :class="['bottom-sheet', { 'expanded': isOpen }]">
    <div class="tab-trigger" @click="toggleSheet" @click.stop>  
      <div class="handle"></div>
      <div class="tab-label">Mis recintos</div>
    </div>

    <div class="bottom-sheet-content">
      <div class="recinto-list">
        <div v-for="(recinto, index) in recintos" :key="index" class="recinto-item">
          <div class="recinto-header">
            <span class="recinto-name">{{ recinto.name }}</span>
          </div>
          <div class="recinto-details">
            <span class="recinto-id">{{ recinto.id }}</span>
            <span class="recinto-area">Area {{ recinto.area }} ha.</span>
          </div>
          <div class="recinto-footer">
             <ion-button fill="clear" color="success" class="recinto-button">
              <ion-icon :icon="chevronForwardOutline"></ion-icon>
            </ion-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue'; // Importa IonButton e IonIcon
import { chevronForwardOutline } from 'ionicons/icons'; // Importa el icono chevron

export default {
  name: "BottomSheetRecintos",
  components: {
    IonButton, // Registra IonButton
    IonIcon   // Registra IonIcon
  },
  setup() {
    const isOpen = ref(false);

    function toggleSheet() {
      isOpen.value = !isOpen.value;
    }

    // Datos de ejemplo para los recintos (reemplaza con tus datos reales)
    const recintos = ref([
      { name: 'Recinto 03', id: '08279:0:0:1:72:1', area: '4.1538' },
      { name: 'Recinto 02', id: '07381:1:0:2:63:1', area: '8.3066' },
      { name: 'Recinto 01', id: '05668:2:2:1:93:4', area: '4.8418' }
    ]);

    return {
      isOpen,
      toggleSheet,
      recintos, // Exponemos los datos de recintos
      chevronForwardOutline // Exponemos el icono
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

/* Texto "Mis recintos" */
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
  padding: 0 20px;
  color: #333;
}

.bottom-sheet.expanded .bottom-sheet-content {
  opacity: 1;
  height: 65vh; /* Ajusta si necesitas más o menos alto */
  overflow-y: auto;
}

/* ----------------------------------
   Lista de recintos
------------------------------------- */
.recinto-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Cada ítem de recinto */
.recinto-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex; /* Añadimos flex para alinear el botón a la derecha */
  justify-content: space-between; /* Espacio entre info y botón */
  align-items: center; /* Centrar verticalmente */
}

/* Cabecera con nombre  */
.recinto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recinto-name {
  font-size: 16px;
  font-weight: 600;
  color: #8E8E8E;
  margin-left: 10px;
}

/* Detalles (ID y Area) */
.recinto-details {
  display: flex;
  justify-content: flex-start; /* Alinea los elementos a la izquierda */
  font-size: 14px;
  color: #666;
  margin-left: 10px;
  margin-right: 10px;
  gap: 10px; /* Espacio entre ID y Area */
}

.recinto-area {
  color: #28a745;
  font-weight: 600;
}

.recinto-id {
  /* Estilos para el ID si los necesitas */
}

/* Botón al final de cada item */
.recinto-button {
  margin-right: 0px; /* Ajusta el margen derecho si es necesario */
  --padding-start: 0.5em; /* Ajusta el padding interno si es necesario */
  --padding-end: 0.5em;
  --opacity: 0.8; /* Reduce un poco la opacidad para suavizar el botón */
}

</style>
