<template>
  <ion-page :class="{ 'fade-out': fadeOut }">
    <!-- Cabecera con botón de Back y título adaptado -->
    <ion-header class="custom-header">
      <ion-toolbar>
        <!-- BOTÓN BACK -->
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <img src="/chevron_left_thin.png" class="back-icon" alt="Volver" />
          </ion-button>
        </ion-buttons>
        
        <ion-title class="title">Gestión de Campos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="custom-content">
      <!-- Divider superior, igual que en la vista del Menú -->
      <div class="divider top-divider"></div>
      
      <!-- Sección de información del Recinto -->
      <div class="recinto-info">
        <h3 class="recinto-name">Recinto 03</h3>
        <p class="recinto-details">
          08279:0:1:17:21 &nbsp;&nbsp;
          Área <span class="area-value">4.1538 ha.</span>
        </p>
      </div>

      <!-- Lista de actividades -->
      <div class="activity-list">
        <!-- Actividad 1: Recogida -->
        <div class="activity-item" @click="goToActividades">
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

        <!-- Actividad 2: Riego -->
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

        <!-- Actividad 3: Poda -->
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-date">lunes, 16 de diciembre de 2024</span>
            <img src="/Cut.png" alt="Icono Poda" class="activity-icon" />
          </div>
          <div class="activity-main">
            <h3 class="activity-title">Poda</h3>
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
      </div>
    </ion-content>

    <!-- Toolbar inferior reutilizada -->
    <Toolbar />
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'GestionCampos',
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    Toolbar
  },
  data() {
    return {
      fadeOut: false
    };
  },
  methods: {
    goBack() {
      // Regresa a la vista anterior
      this.$router.back();
    },
    goToActividades() {
      // Navega a la ruta con name "Actividades"
      this.$router.push({ name: 'Actividades' });
    }
  }
};
</script>

<style scoped>
/* CABECERA */
ion-header.custom-header {
  box-shadow: none;
}

/* Ajuste para la barra de herramientas y el botón "back" */
ion-toolbar {
  --ion-title-text-align: center;
  display: flex;
  align-items: center;
}
ion-buttons[slot="start"] {
  margin-top: 15px;
  margin-left: 10px;
  margin-right: -35px;
}

.back-icon {
  width: 10px;
  height: 20px;
}

.title {
  text-align: center;
  color: #28a745;
  font-size: 20px;
  font-weight: bold;
  height: 75px;
  background-color: white;
  padding-top: 10px;
}

/* CONTENIDO PRINCIPAL */
.custom-content {
  --background: #fff;
  padding: 1%;
  /* Padding inferior para evitar que el contenido se oculte detrás de la toolbar */
  padding-bottom: 100px;
}

/* Información del recinto */
.recinto-info {
  text-align: center;
  margin-bottom: 15px;
}
.recinto-name {
  font-size: 18px;
  color: #8E8E8E;
  margin: 5px 0;
  font-weight: 600;
}
.recinto-details {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
.area-value {
  color: #28a745;
  font-weight: 550;
}

/* Lista de actividades */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  background-color: #fff;
  border: 1px solid #eee;
  padding: 30px 30px;
  box-shadow: 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

/* Elimina el borde superior de los elementos que no sean el primero */
.activity-item:not(:first-child) {
  border-top: none;
}

/* Cabecera: fecha + icono */
.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.activity-date {
  font-size: 14px;
  color: #9b9b9b;
}
.activity-icon {
  width: 25px;
  height: 25px;
}

/* Contenido principal */
.activity-main {
  margin-left: 5px;
}
.activity-title {
  font-size: 16px;
  color: #8E8E8E;
  margin: 5px 0;
  font-weight: 600;
}
.activity-hectares {
  display: block;
  color: #28a745;
  font-size: 14px;
  font-weight: lighter;
  margin-bottom: 2px;
}
.activity-farm {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

/* Pie de la actividad */
.activity-footer {
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

/* DIVISORES IGUALES A LA VIEW DEL MENÚ */
.divider {
  height: 1px; /* Línea más fina */
  background-color: #ddd;
  width: calc(100% - 40px);
  margin: 0 auto;
}

.top-divider {
  height: 1px;
  background-color: #ddd;
  width: calc(100% - 40px);
  margin: -5px auto 15px;
}
</style>
