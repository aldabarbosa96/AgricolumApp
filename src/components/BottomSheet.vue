<template>
  <!-- Contenedor del panel deslizante -->
  <div :class="['bottom-sheet', { 'expanded': isOpen }]">
    <!-- Pestaña visible para arrastrar o click -->
    <div class="tab-trigger" @click="toggleSheet">
      <div class="handle"></div>
      <div class="tab-label">Mis actividades</div>
    </div>

    <!-- Contenido del panel -->
    <div class="bottom-sheet-content">
      <!-- Pestañas superiores (Historial | Actual | Planificadas) -->
      <div class="tabs">
        <span class="tab">Historial</span>
        <span class="tab active">Actual</span>
        <span class="tab">Planificadas</span>
      </div>

      <!-- Lista de actividades -->
      <div class="activity-list">
        <!-- Item 1: Recogida -->
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-date">martes, 17 de diciembre de 2024</span>
            <img src="/Hay.png" alt="Icono Recogida" class="activity-icon" />
          </div>
          <div class="activity-main">
            <h3 class="activity-title">Recogida</h3>
            <span class="activity-hectares">19.5094 ha</span>
            <p class="activity-farm">
              Explotación: John Doe<br />
              _antara viña blanca
            </p>
          </div>
          <div class="activity-footer">
            17054:0:0:1:9000:16
          </div>
        </div>

        <!-- Item 2: Riego -->
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-date">martes, 17 de diciembre de 2024</span>
            <img src="/Water.png" alt="Icono Riego" class="activity-icon" />
          </div>
          <div class="activity-main">
            <h3 class="activity-title">Riego</h3>
            <span class="activity-hectares">19.5094 ha</span>
            <p class="activity-farm">
              Explotación: John Doe<br />
              _antara viña blanca
            </p>
          </div>
          <div class="activity-footer">
            17054:0:0:1:9000:16
          </div>
        </div>

        <!-- Item 3: Fertilizado -->
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-date">lunes, 16 de diciembre de 2024</span>
            <img src="/Test Tube.png" alt="Icono Fertilizado" class="activity-icon" />
          </div>
          <div class="activity-main">
            <h3 class="activity-title">Fertilizado</h3>
            <span class="activity-hectares">25.8506 ha</span>
            <p class="activity-farm">
              Explotación: John Doe<br />
              _antara viña blanca<br />
              01 marca_genérica 50.0 50.0 (Estiércol porcino)
            </p>
          </div>
          <div class="activity-footer">
            17054:0:0:1:9000:16, 17094:0:0:2
          </div>
        </div>

        <!-- Item 4: Poda -->
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-date">jueves, 12 de diciembre de 2024</span>
            <img src="/Cut.png" alt="Icono Poda" class="activity-icon" />
          </div>
          <div class="activity-main">
            <h3 class="activity-title">Poda</h3>
            <span class="activity-hectares">10.3000 ha</span>
            <p class="activity-farm">
              Explotación: John Doe<br />
              _antara viña blanca
            </p>
          </div>
          <div class="activity-footer">
            17054:0:0:1:9000:16
          </div>
        </div>

        <!-- Item 5: Siembra -->
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-date">sábado, 14 de diciembre de 2024</span>
            <img src="/Sprout.png" alt="Icono Siembra" class="activity-icon" />
          </div>
          <div class="activity-main">
            <h3 class="activity-title">Siembra</h3>
            <span class="activity-hectares">30.0000 ha</span>
            <p class="activity-farm">
              Explotación: Jane Doe<br />
              _Finca Trigo
            </p>
          </div>
          <div class="activity-footer">
            17054:0:0:1:9000:16, 17094:0:0:2
          </div>
        </div>

        <!-- Item 6: Fumigación -->
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-date">miércoles, 11 de diciembre de 2024</span>
            <img src="/Fumigation.png" alt="Icono Fumigación" class="activity-icon" />
          </div>
          <div class="activity-main">
            <h3 class="activity-title">Fumigación</h3>
            <span class="activity-hectares">12.0000 ha</span>
            <p class="activity-farm">
              Explotación: John Doe<br />
              _antara viña blanca
            </p>
          </div>
          <div class="activity-footer">
            17054:0:0:1:9000:16
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "BottomSheet",
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

/* Texto "Mis actividades" */
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

/* Tabs: centradas */
.tabs {
  display: flex;
  margin-bottom: 30px;
}

.tab {
  flex: 1;
  text-align: center;
  font-size: 15px;
  color: #9b9b9b;
  padding-bottom: 5px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab.active {
  color: #000;
  border-bottom-color: #000;
  font-weight: 600;
}

/* ----------------------------------
   Lista de actividades
------------------------------------- */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espacio entre cada item */
}

/* Cada ítem de actividad */
.activity-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

/* Cabecera con fecha e icono */
.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Fecha */
.activity-date {
  font-size: 14px;
  color: #9b9b9b;
  margin-left: 10px;
}

/* Icono a la derecha */
.activity-icon {
  width: 25px;
  height: 25px;
  margin-right: 25px;
  margin-top: 7.5px;
}

/* Cuerpo principal */
.activity-main {
  margin-top: 10px;
  margin-left: 10px;
}

/* Título de la actividad (Recogida, Riego, etc.) */
.activity-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #8E8E8E;
}

/* Hectáreas en color verde, por ejemplo */
.activity-hectares {
  display: inline-block;
  color: #28a745;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

/* Explotación / detalles */
.activity-farm {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

/* Pie con el código (alineado a la derecha) */
.activity-footer {
  font-size: 12px;
  color: #666;
  text-align: right;
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
