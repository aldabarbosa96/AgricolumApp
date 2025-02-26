<template>
    <ion-footer class="confirm-footer">
      <ion-toolbar class="confirm-toolbar">
        <div class="footer-content">
          <div class="cancelar" @click="onCancel">Cancelar</div>
          <div class="divider"></div>
          <div class="guardar" @click="onSave">Guardar</div>
        </div>
      </ion-toolbar>
    </ion-footer>
  </template>
  
  <script>
  import { IonFooter, IonToolbar } from '@ionic/vue';
  
  export default {
    name: 'ConfirmToolbar',
    components: {
      IonFooter,
      IonToolbar
    },
    emits: ['cancel', 'save'],
    methods: {
      onCancel() {
        this.$emit('cancel');
      },
      onSave() {
        this.$emit('save');
      }
    }
  };
  </script>
  
  <style scoped>

  .confirm-footer {
    --background: #f2f2f2;
    height: 90px;
  }
  
  .confirm-toolbar {
    --background: #f2f2f2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  

  .footer-content {
    width: 100%;
    margin: 0 auto;
    display: flex;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 0 0px; 
    justify-content: space-evenly;
  }

  .cancelar {
    color: #a01111;
    cursor: pointer;
    justify-self: start;
  }
  

  .guardar {
    color: #4f9c3d;
    font-weight: bold;
    cursor: pointer;
    justify-self: end;
  }
  

  .divider {
    width: 1px;
    height: 70px;
    background-color: #ccc;
    justify-self: center;
  }
  </style>
  