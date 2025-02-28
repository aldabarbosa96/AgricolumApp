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

        <!-- LISTA DE OPCIONES -->
        <div class="options-list">
          <!-- 1) Tipo (Popover) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/List.png" alt="Icono Tipo" class="option-icon" />
              <span class="option-label">
                Tipo:
                <span v-if="selectedTipo" class="selected-value">{{ selectedTipo }}</span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <!-- Contenedor a la derecha -->
            <div class="option-right">
              <ion-button
                fill="clear"
                color="success"
                class="option-plus"
                @click="openTipoPopover($event)"
              >
                +
              </ion-button>
            </div>
          </div>

          <!-- 2) Planificada (checkbox) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Tasklist.png" alt="Icono Planificada" class="option-icon" />
              <span class="option-label">Planificada</span>
            </div>
            <div class="option-right">
              <ion-checkbox
                color="success"
                class="option-plus"
                v-model="isPlanificada"
              ></ion-checkbox>
            </div>
          </div>

          <!-- 3) Campo (Popover) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Location3.png" alt="Icono Campo" class="option-icon" />
              <span class="option-label">
                Campo:
                <span v-if="selectedCampo" class="selected-value">{{ selectedCampo }}</span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <div class="option-right">
              <ion-button
                fill="clear"
                color="success"
                class="option-plus"
                @click="openCampoPopover($event)"
              >
                +
              </ion-button>
            </div>
          </div>

          <!-- 4) Trabajadores (Modal) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Worker.png" alt="Icono Trabajadores" class="option-icon" />
              <span class="option-label">
                Trabajadores:
                <span v-if="selectedTrabajadores.length" class="selected-value">
                  {{ selectedTrabajadores.join(', ') }}
                </span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <div class="option-right">
              <ion-button
                fill="clear"
                color="success"
                class="option-plus"
                @click="showTrabajadoresModal = true"
              >
                +
              </ion-button>
            </div>
          </div>

          <!-- 5) Maquinaria (Popover) -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Tractor.png" alt="Icono Maquinaria" class="option-icon" />
              <span class="option-label">
                Maquinaria:
                <span v-if="selectedMaquinaria" class="selected-value">{{ selectedMaquinaria }}</span>
                <span v-else>Sin seleccionar</span>
              </span>
            </div>
            <div class="option-right">
              <ion-button
                fill="clear"
                color="success"
                class="option-plus"
                @click="openMaquinariaPopover($event)"
              >
                +
              </ion-button>
            </div>
          </div>

          <!-- 6) Fecha -->
          <div class="option-item">
            <div class="option-left">
              <img src="/Calendar.png" alt="Icono Fecha" class="option-icon" />
              <span class="option-label">Fecha</span>
            </div>
            <div class="option-date">
  {{ currentDate }}
</div>

          </div>
        </div>

        <div class="divider bottom-divider"></div>

        <!-- SECCIÓN DE ADJUNTOS -->
        <div class="attachments">
          <!-- Albarán -->
          <div class="attachment-item">
            <div class="attachment-title" @click="toggleAttachment('albaran')">
              Albarán
            </div>
            <div v-if="showAlbaranInput" class="attachment-input">
              <ion-input
                mode="md"
                v-model="albaranText"
                placeholder="Nº Albarán"
              ></ion-input>
            </div>
          </div>

          <!-- Notas -->
          <div class="attachment-item">
            <div class="attachment-title" @click="toggleAttachment('notas')">
              Notas
            </div>
            <div v-if="showNotasInput" class="attachment-input">
              <ion-input
                mode="md"
                v-model="notasText"
                placeholder="Escribe aquí tus notas..."
              ></ion-input>
            </div>
          </div>

          <!-- Fotos -->
          <div class="attachment-item">
            <div class="attachment-title" @click="toggleAttachment('fotos')">
              Fotos
            </div>
            <div v-if="showFotosInput" class="attachment-input">
              <ion-input
                mode="md"
                v-model="fotosText"
                placeholder="Notas sobre las fotos"
              ></ion-input>

              <!-- Botón "Galería" con clase custom-success -->
              <ion-button
                class="custom-success"
                color="success"
                @click="takePhoto"
                style="margin-top: 10px;"
              >
                Galería
              </ion-button>

              <!-- Previsualización de foto -->
              <img
                v-if="fotosPreview"
                :src="fotosPreview"
                alt="Vista previa"
                style="width: 100%; max-width: 300px; margin-top: 10px;"
              />
            </div>
          </div>

          <!-- Documentos -->
          <div class="attachment-item">
            <div class="attachment-title" @click="toggleAttachment('documentos')">
              Documentos
            </div>
            <div v-if="showDocumentosInput" class="attachment-input">
              <ion-input
                mode="md"
                v-model="documentosText"
                placeholder="Notas sobre los documentos..."
              ></ion-input>
            </div>
          </div>
        </div>
      </div>

      <!-- Popup de éxito -->
      <div v-if="showSuccessPopup" class="popup-overlay">
        <div class="popup-content">
          <h2>Actividad creada y guardada con éxito!</h2>
        </div>
      </div>
    </ion-content>

    <!-- ConfirmToolbar (Guardado/Cancelado) -->
    <ConfirmToolbar
      v-if="!showSuccessPopup"
      @cancel="handleCancel"
      @save="handleSave"
    />
    
    <!-- =========== POPOVERS =========== -->
    <!-- Tipo -->
    <ion-popover
      :is-open="showTipoPopover"
      :event="tipoPopoverEvent"
      @didDismiss="showTipoPopover = false"
    >
      <ion-content class="custom-popover">
        <ion-list>
          <ion-item
            v-for="(tipo, index) in tipos"
            :key="index"
            @click="selectTipo(tipo)"
            class="custom-popover-item"
          >
            {{ tipo }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>

    <!-- Campo -->
    <ion-popover
      :is-open="showCampoPopover"
      :event="campoPopoverEvent"
      @didDismiss="showCampoPopover = false"
    >
      <ion-content class="custom-popover">
        <ion-list>
          <ion-item
            v-for="(campo, index) in campos"
            :key="index"
            @click="selectCampo(campo)"
            class="custom-popover-item"
          >
            {{ campo }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>

    <!-- Maquinaria -->
    <ion-popover
      :is-open="showMaquinariaPopover"
      :event="maquinariaPopoverEvent"
      @didDismiss="showMaquinariaPopover = false"
    >
      <ion-content class="custom-popover">
        <ion-list>
          <ion-item
            v-for="(maq, index) in maquinarias"
            :key="index"
            @click="selectMaquinaria(maq)"
            class="custom-popover-item"
          >
            {{ maq }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>

    <!-- =========== MODAL TRABAJADORES =========== -->
    <ion-modal
      :is-open="showTrabajadoresModal"
      @didDismiss="showTrabajadoresModal = false"
    >
      <ion-content class="trabajadores-content">
        <div class="trabajadores-list">
          <ion-list>
            <ion-item
              button
              v-for="(trabajador, index) in trabajadores"
              :key="index"
              @click="toggleTrabajador(trabajador)"
              class="trabajador-item"
            >
              <ion-label>{{ trabajador }}</ion-label>
              <ion-checkbox
                slot="end"
                v-model="selectedTrabajadoresMap[trabajador]"
                @click.stop
              ></ion-checkbox>
            </ion-item>
          </ion-list>
        </div>
        <div class="modal-buttons">
          <ion-button
            class="custom-success"
            color="success"
            expand="block"
            @click="confirmTrabajadores"
          >
            Aceptar
          </ion-button>
          <ion-button
            color="medium"
            expand="block"
            @click="showTrabajadoresModal = false"
          >
            Cerrar
          </ion-button>
        </div>
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
  IonTextarea,
  IonInput
} from '@ionic/vue';
import dayjs from 'dayjs';
import ConfirmToolbar from '@/components/ConfirmToolbar.vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
    IonInput,
    ConfirmToolbar
  },

  computed: {
    currentDate() {
      return dayjs().format('DD / MM / YYYY');
    }
  },
  data() {
    return {
      showSuccessPopup: false,
      fadeOut: false,
      isPlanificada: false,

      showTipoPopover: false,
      tipoPopoverEvent: null,
      showCampoPopover: false,
      campoPopoverEvent: null,
      showMaquinariaPopover: false,
      maquinariaPopoverEvent: null,

      showTrabajadoresModal: false,

      /* Toggling adjuntos */
      showAlbaranInput: false,
      showNotasInput: false,
      showFotosInput: false,
      showDocumentosInput: false,

      /* Archivos / texto */
      fotosText: '',
      fotosPreview: null,

      /* Listas de ejemplo */
      tipos: [
        "Siembra",
        "Cosecha",
        "Riego",
        "Fertilización",
        "Poda",
        "Control de Plagas",
        "Preparación de Suelo",
        "Rotación de Cultivos",
        "Mantenimiento de Equipos",
        "Gestión de Abonos"
      ],
      campos: [
        "Recinto 01",
        "Recinto 02",
        "Recinto 03"
      ],
      trabajadores: [
        "T001 - Juan Pérez",
        "T002 - María López",
        "T003 - Pedro Rodríguez",
        "T004 - Luis Hernández",
        "T005 - Ana Martínez",
        "T006 - Sara González",
        "T007 - Carlos Sánchez",
        "T008 - José García",
        "T009 - Laura Fernández",
        "T010 - Manuel Torres"
      ],
      maquinarias: [
        "Tractor John Deere 5075E",
        "Cosechadora New Holland CR10.90",
        "Camión Fendt 900",
        "Arado Kuhn 150",
        "Empacadora Claas Lexion 750",
        "Pulverizadora Case IH Patriot",
        "Segadora Valtra 6120",
        "Compactador John Deere 850",
        "Tractor Massey Ferguson 4707",
        "Remolque New Holland RT780"
      ],

      /* Seleccionados */
      selectedTipo: '',
      selectedCampo: '',
      selectedTrabajadores: [],
      selectedTrabajadoresMap: {},
      selectedMaquinaria: '',

      /* Textos */
      albaranText: '',
      notasText: '',
      fotosText: '',
      documentosText: ''
    };
  },
  methods: {
    async takePhoto() {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt
        });
        this.fotosPreview = image.dataUrl;
      } catch (error) {
        console.error('Error al tomar/elegir la foto:', error);
      }
    },
    handleCancel() {
      this.$router.push({ name: 'Home' });
    },
    handleSave() {
      this.showSuccessPopup = true;
      setTimeout(() => {
        this.fadeOut = true;
        setTimeout(() => {
          this.$router.push({ name: 'Home' });
        }, 500);
      }, 1000);
    },

    openTipoPopover(ev) {
      this.tipoPopoverEvent = ev;
      this.showTipoPopover = true;
    },
    selectTipo(tipo) {
      this.selectedTipo = tipo;
      this.showTipoPopover = false;
    },

    openCampoPopover(ev) {
      this.campoPopoverEvent = ev;
      this.showCampoPopover = true;
    },
    selectCampo(campo) {
      this.selectedCampo = campo;
      this.showCampoPopover = false;
    },

    openMaquinariaPopover(ev) {
      this.maquinariaPopoverEvent = ev;
      this.showMaquinariaPopover = true;
    },
    selectMaquinaria(maq) {
      this.selectedMaquinaria = maq;
      this.showMaquinariaPopover = false;
    },

    toggleTrabajador(trabajador) {
      this.selectedTrabajadoresMap[trabajador] = !this.selectedTrabajadoresMap[trabajador];
    },
    confirmTrabajadores() {
      this.selectedTrabajadores = Object.keys(this.selectedTrabajadoresMap).filter(
        key => this.selectedTrabajadoresMap[key]
      );
      this.showTrabajadoresModal = false;
    },

    toggleAttachment(type) {
      if (type === 'albaran') {
        this.showAlbaranInput = !this.showAlbaranInput;
      } else if (type === 'notas') {
        this.showNotasInput = !this.showNotasInput;
      } else if (type === 'fotos') {
        this.showFotosInput = !this.showFotosInput;
      } else if (type === 'documentos') {
        this.showDocumentosInput = !this.showDocumentosInput;
      }
    }
  }
};
</script>

<style scoped>
/* ====== Fade-out transition ====== */
ion-page {
  transition: opacity 0.5s ease;
  opacity: 1;
}
ion-page.fade-out {
  opacity: 0;
}

/* Encabezado */
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

/* Contenedor principal y blur */
.content-wrapper {
  position: relative;
}
.blur {
  filter: blur(4px);
}

/* Divisores */
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

/* ====== LISTA DE OPCIONES ====== */
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
  margin-left: 20px;
  object-fit: contain;
}
/* Títulos de cada campo en color #8E8E8E */
.option-label {
  font-size: 16px;
  color: #8E8E8E;
  font-weight: 500;
  margin-left: 20px;
}
/* Al seleccionar un valor, se muestra en verde */
.selected-value {
  color: #28a745;
}

/* Contenedor derecho con ancho fijo */
.option-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; 
}

.option-plus {
  font-size: 25px;
}

.option-date {
  font-size: 16px;
  color: #333;
  margin-right: 20px;
}

/* ====== ADJUNTOS ====== */
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
.attachment-title {
  font-weight: 500;
  cursor: pointer;
}
.attachment-input {
  margin-top: 8px;
}
:deep(.attachment-input ion-input) {
  --highlight-color-focused: #28a745;
  --color-focused: #28a745;
}
:deep(.attachment-input ion-input input) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* ====== POPUP EXITO ====== */
.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
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
  width: 300px;
  height: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.popup-content h2 {
  margin: 0;
  font-size: 20px;
}

/* ====== BOTONES "success" ====== */
ion-button[color="success"] {
  --background: #21893a !important;  
  --background-activated: #21893a !important;
  --background-focused: #21893a !important;
  --color: #fff !important;
}
.modal-buttons ion-button[color="success"],
.attachments ion-button[color="success"] {
  --background: #1e7e34 !important;
  --background-activated: #21893a !important;
  --background-focused: #21893a !important;
  --color: #fff !important;
}
.custom-success::part(native) {
  background: #1e7e34 !important;
  color: #fff !important;
}
.custom-success::part(native):active,
.custom-success::part(native):focus {
  background: #1c7430 !important;
}

/* ====== POPOVERS (IonPopover) ====== */
.custom-popover {
  --background: #fff;
  --border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  padding: 8px;
}
.custom-popover ion-item {
  --min-height: 48px;
  font-size: 16px;
  color: #1e7e34;
  --inner-padding-end: 16px;
  --inner-padding-start: 16px;
}
.custom-popover-item {
  --background: transparent;
  --ripple-color: #1e7e34;
}
.custom-popover-item:hover {
  background-color: rgba(30,126,52,0.1);
  cursor: pointer;
}

/* ====== MODAL TRABAJADORES ====== */
.trabajadores-content {
  --padding-top: 16px;
  --padding-bottom: 16px;
  --padding-start: 16px;
  --padding-end: 16px;
}
.trabajadores-list {
  margin: 16px;
}
.trabajador-item {
  margin: 8px;
}
.modal-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
