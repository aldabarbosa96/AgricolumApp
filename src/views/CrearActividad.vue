<template>
  <ion-page :class="{ 'fade-out': fadeOut }">
    <ion-header class="custom-header">
      <ion-title class="title">Nueva Actividad</ion-title>
    </ion-header>

    <ion-content
      class="ion-padding custom-content"
      :style="{'--background': '#fff', '--padding-top': '8px', position: 'relative'}"
    >
      <div class="content-wrapper" :class="{ blur: showSuccessPopup }">
        <div class="divider top-divider"></div>

        <!-- Lista de opciones -->
        <div class="options-list">
          <!-- Opción: Tipo (con IonPopover) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/List.png" alt="Icono Tipo" class="option-icon" />
              <span class="option-label">
                Tipo:
                <span v-if="selectedTipo">{{ selectedTipo }}</span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <ion-button
              fill="clear"
              color="success"
              class="option-plus"
              @click="openTipoPopover($event)"
            >
              +
            </ion-button>
          </div>

          <!-- Opción: Planificada (checkbox) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Tasklist.png" alt="Icono Planificada" class="option-icon" />
              <span class="option-label">Planificada</span>
            </div>
            <ion-checkbox
              color="success"
              class="option-plus"
              v-model="isPlanificada"
            ></ion-checkbox>
          </div>

          <!-- Opción: Campo (con IonPopover) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Location3.png" alt="Icono Campo" class="option-icon" />
              <span class="option-label">
                Campo:
                <span v-if="selectedCampo">{{ selectedCampo }}</span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <ion-button
              fill="clear"
              color="success"
              class="option-plus"
              @click="openCampoPopover($event)"
            >
              +
            </ion-button>
          </div>

          <!-- Opción: Trabajadores (modal) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Worker.png" alt="Icono Trabajadores" class="option-icon" />
              <span class="option-label">
                Trabajadores:
                <span v-if="selectedTrabajadores.length">
                  {{ selectedTrabajadores.join(', ') }}
                </span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <ion-button
              fill="clear"
              color="success"
              class="option-plus"
              @click="showTrabajadoresModal = true"
            >
              +
            </ion-button>
          </div>

          <!-- Opción: Maquinaria (con IonPopover) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Tractor.png" alt="Icono Maquinaria" class="option-icon" />
              <span class="option-label">
                Maquinaria:
                <span v-if="selectedMaquinaria">{{ selectedMaquinaria }}</span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <ion-button
              fill="clear"
              color="success"
              class="option-plus"
              @click="openMaquinariaPopover($event)"
            >
              +
            </ion-button>
          </div>

          <!-- Opción: Fecha -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Calendar.png" alt="Icono Fecha" class="option-icon" />
              <span class="option-label">Fecha</span>
            </div>
            <div class="option-date">
              19 / 12 / 2024
            </div>
          </div>
        </div>

        <div class="divider bottom-divider"></div>

        <!-- Sección de adjuntos -->
        <div class="attachments">
          <div class="attachment-item" @click="showAlbaranModal = true">Albarán</div>
          <div class="attachment-item" @click="showNotasModal = true">Notas</div>
          <div class="attachment-item" @click="showFotosModal = true">Fotos</div>
          <div class="attachment-item" @click="showDocumentosModal = true">Documentos</div>
        </div>
      </div>

      <!-- Popup de éxito -->
      <div v-if="showSuccessPopup" class="popup-overlay">
        <div class="popup-content">
          <h2>Actividad creada y guardada con éxito!</h2>
        </div>
      </div>
    </ion-content>

    <!-- ConfirmToolbar se muestra solo cuando no está el popup -->
    <ConfirmToolbar
      v-if="!showSuccessPopup"
      @cancel="handleCancel"
      @save="handleSave"
    />

    <!-- ==================== POPOVERS ==================== -->

    <!-- Popover para TIPO -->
    <ion-popover
      :is-open="showTipoPopover"
      :event="tipoPopoverEvent"
      @didDismiss="showTipoPopover = false"
    >
      <ion-content>
        <ion-list>
          <ion-item
            v-for="(tipo, index) in tipos"
            :key="index"
            @click="selectTipo(tipo)"
          >
            {{ tipo }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>

    <!-- Popover para CAMPO -->
    <ion-popover
      :is-open="showCampoPopover"
      :event="campoPopoverEvent"
      @didDismiss="showCampoPopover = false"
    >
      <ion-content>
        <ion-list>
          <ion-item
            v-for="(campo, index) in campos"
            :key="index"
            @click="selectCampo(campo)"
          >
            {{ campo }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>

    <!-- Popover para MAQUINARIA -->
    <ion-popover
      :is-open="showMaquinariaPopover"
      :event="maquinariaPopoverEvent"
      @didDismiss="showMaquinariaPopover = false"
    >
      <ion-content>
        <ion-list>
          <ion-item
            v-for="(maq, index) in maquinarias"
            :key="index"
            @click="selectMaquinaria(maq)"
          >
            {{ maq }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>

    <!-- ==================== MODALES PARA OTROS ==================== -->

    <!-- Modal para seleccionar Trabajadores -->
    <ion-modal 
      :is-open="showTrabajadoresModal"
      @didDismiss="showTrabajadoresModal = false"
    >
      <ion-content>
        <ion-list>
          <ion-item
            v-for="(trabajador, index) in trabajadores"
            :key="index"
            @click="toggleTrabajador(trabajador)"
          >
            <ion-label>{{ trabajador }}</ion-label>
            <ion-checkbox
              slot="end"
              v-model="selectedTrabajadoresMap[trabajador]"
            ></ion-checkbox>
          </ion-item>
        </ion-list>
        <ion-button @click="confirmTrabajadores" color="success">Aceptar</ion-button>
        <ion-button @click="showTrabajadoresModal = false" color="medium">Cerrar</ion-button>
      </ion-content>
    </ion-modal>

    <!-- Modal para Albarán -->
    <ion-modal 
      :is-open="showAlbaranModal" 
      @didDismiss="showAlbaranModal = false"
    >
      <ion-content>
        <ion-textarea placeholder="Nº Albarán" v-model="albaranText"></ion-textarea>
        <ion-button @click="showAlbaranModal = false" color="success">Guardar</ion-button>
        <ion-button @click="showAlbaranModal = false" color="medium">Cerrar</ion-button>
      </ion-content>
    </ion-modal>

    <!-- Modal para Notas -->
    <ion-modal 
      :is-open="showNotasModal" 
      @didDismiss="showNotasModal = false"
    >
      <ion-content>
        <ion-textarea placeholder="Escribe aquí tus notas..." v-model="notasText"></ion-textarea>
        <ion-button @click="showNotasModal = false" color="success">Guardar</ion-button>
        <ion-button @click="showNotasModal = false" color="medium">Cerrar</ion-button>
      </ion-content>
    </ion-modal>

    <!-- Modal para Fotos -->
    <ion-modal 
      :is-open="showFotosModal" 
      @didDismiss="showFotosModal = false"
    >
      <ion-content>
        <ion-textarea placeholder="Notas sobre las fotos" v-model="fotosText"></ion-textarea>
        <ion-button @click="showFotosModal = false" color="success">Guardar</ion-button>
        <ion-button @click="showFotosModal = false" color="medium">Cerrar</ion-button>
      </ion-content>
    </ion-modal>

    <!-- Modal para Documentos -->
    <ion-modal 
      :is-open="showDocumentosModal" 
      @didDismiss="showDocumentosModal = false"
    >
      <ion-content>
        <ion-textarea placeholder="Notas sobre los documentos..." v-model="documentosText"></ion-textarea>
        <ion-button @click="showDocumentosModal = false" color="success">Guardar</ion-button>
        <ion-button @click="showDocumentosModal = false" color="medium">Cerrar</ion-button>
      </ion-content>
    </ion-modal>

  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonButton,
  IonCheckbox,
  IonPopover,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea
} from '@ionic/vue';

import ConfirmToolbar from '@/components/ConfirmToolbar.vue';
import router from '@/router';

export default {
  name: "Crear",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonButton,
    IonCheckbox,
    IonPopover,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonTextarea,
    ConfirmToolbar
  },
  data() {
    return {
      // Control de popup de éxito y fade-out
      showSuccessPopup: false,
      fadeOut: false,

      // Checkbox "Planificada"
      isPlanificada: false,

      // ======== POPOVERS PARA TIPO, CAMPO Y MAQUINARIA ========
      showTipoPopover: false,
      tipoPopoverEvent: null,
      showCampoPopover: false,
      campoPopoverEvent: null,
      showMaquinariaPopover: false,
      maquinariaPopoverEvent: null,

      // ======== MODALES PARA OTROS ========
      showTrabajadoresModal: false,
      showAlbaranModal: false,
      showNotasModal: false,
      showFotosModal: false,
      showDocumentosModal: false,

      // Datos de ejemplo para seleccionar
      tipos: ['Tipo A', 'Tipo B', 'Tipo C'],
      campos: ['Campo 1', 'Campo 2', 'Campo 3'],
      trabajadores: ['Juan', 'María', 'Pedro', 'Luis'],
      maquinarias: ['Tractor', 'Cosechadora', 'Camión'],

      // Valores seleccionados
      selectedTipo: '',
      selectedCampo: '',
      selectedTrabajadores: [],
      selectedTrabajadoresMap: {},
      selectedMaquinaria: '',

      // Textos para adjuntos
      albaranText: '',
      notasText: '',
      fotosText: '',
      documentosText: '',
    };
  },
  methods: {
    // Botones Cancelar / Guardar del ConfirmToolbar
    handleCancel() {
      console.log("Has pulsado Cancelar");
      this.$router.push({ name: 'Home' });
    },
    handleSave() {
      console.log("Has pulsado Guardar");
      this.showSuccessPopup = true;
      setTimeout(() => {
        this.fadeOut = true;
        setTimeout(() => {
          this.$router.push({ name: 'Home' });
        }, 500);
      }, 1000);
    },

    // ======== Popover para TIPO ========
    openTipoPopover(ev) {
      this.tipoPopoverEvent = ev;
      this.showTipoPopover = true;
    },
    selectTipo(tipo) {
      this.selectedTipo = tipo;
      this.showTipoPopover = false;
    },

    // ======== Popover para CAMPO ========
    openCampoPopover(ev) {
      this.campoPopoverEvent = ev;
      this.showCampoPopover = true;
    },
    selectCampo(campo) {
      this.selectedCampo = campo;
      this.showCampoPopover = false;
    },

    // ======== Popover para MAQUINARIA ========
    openMaquinariaPopover(ev) {
      this.maquinariaPopoverEvent = ev;
      this.showMaquinariaPopover = true;
    },
    selectMaquinaria(maq) {
      this.selectedMaquinaria = maq;
      this.showMaquinariaPopover = false;
    },

    // ======== Modal para TRABAJADORES ========
    toggleTrabajador(trabajador) {
      this.selectedTrabajadoresMap[trabajador] = !this.selectedTrabajadoresMap[trabajador];
    },
    confirmTrabajadores() {
      this.selectedTrabajadores = Object.keys(this.selectedTrabajadoresMap).filter(
        (key) => this.selectedTrabajadoresMap[key]
      );
      this.showTrabajadoresModal = false;
    },
  }
};
</script>

<style scoped>
/* Transición de opacidad para la ion-page */
ion-page {
  transition: opacity 0.5s ease;
  opacity: 1;
}
ion-page.fade-out {
  opacity: 0;
}

ion-header.custom-header {
  box-shadow: none;
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

.ion-padding {
  --ion-safe-area-bottom: 0px;
}

/* Contenedor principal de contenido para aplicar blur */
.content-wrapper {
  position: relative;
}

/* Efecto blur al mostrar el popup de éxito */
.blur {
  filter: blur(4px);
  -webkit-filter: blur(4px);
}

/* Estilos para divisores, opciones y adjuntos */
.divider {
  height: 1px;
  background-color: #ddd;
  border: none;
}
.top-divider {
  margin: -5px 0 15px 0; 
}
.bottom-divider {
  margin: 25px 0; 
}
.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
}
.option-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.option-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-left: 20px;
}
.option-label {
  font-size: 16px;
  color: #28a745;
  font-weight: 500;
  margin-left: 20px;
}
.option-plus {
  font-size: 25px;
  --padding-start: 0;
  --padding-end: 0;
  margin-right: 20px;
}
option-item ion-checkbox {
  margin-right: 20px;
}
ion-checkbox::part(container) {
  background: white !important;
  border-color: black !important;
}
ion-checkbox {
  --checkmark-color: #28a745;
}
ion-checkbox::part(checkmark) {
  color: #28a745 !important;
}
.option-date {
  font-size: 16px;
  color: #333;
  margin-right: 20px;
}
.attachments {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px;
}
.attachment-item {
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* Estilos para el popup overlay y contenido */
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
.popup-content {
  background: #fff;
  color: #28a745;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.popup-content h2 {
  font-size: 20px;
  margin: 0;
}
</style>
