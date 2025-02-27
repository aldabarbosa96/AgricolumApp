<template>
    <div class="iphone16Pro1">
      <!-- Barra de estado (componente compartido) -->
      <StatusBar :key="$route.fullPath" rightIcon="rightSide1"/> 
  
      <!-- Icono de usuario -->
      <img class="userIcon" alt="User Icon" src="/unnamed.png">
  
      <!-- Contenedor del registro -->
      <div class="registerContainer">
        <h1 class="registerTitle">Registro</h1>
  
        <!-- Campos de entrada -->
        <input type="text" class="inputField" placeholder="Nombre">
        <input type="text" class="inputField" placeholder="Apellidos">
        <input type="text" class="inputField" placeholder="Usuario">
        <input type="email" class="inputField" placeholder="Correo">
        <input type="password" class="inputField" placeholder="Contraseña">
        <input type="password" class="inputField" placeholder="Confirmar contraseña">
  
        <!-- Botón de registro -->
        <button class="signUpButton">Registrarme</button>
  
        <!-- Enlace para iniciar sesión si ya tiene cuenta -->
        <p class="loginText">
          ¿Ya tienes cuenta?
          <a href="#" class="loginLink">Inicia sesión</a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import StatusBar from '@/components/StatusBar.vue';
  
  export default {
    name: 'Registro',
    components: {
      StatusBar
    }
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  
  .iphone16Pro1 {
    width: 100%;
    height: 100vh;
    /* Agregamos algo de padding para separar el contenido de los bordes */
    padding: 40px 20px;
    background-color: rgba(255, 255, 255, 0.95);
  
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Si deseas que los elementos queden en la parte superior con espacio, 
       puedes usar "justify-content: flex-start;" */
    justify-content: flex-start; 
    text-align: center;
  }
  
  /* Barra de estado */
  .statusBar {
    position: absolute;
    top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
  
  .rightSideIcon {
    height: 20px;
  }
  .leftSideIcon {
    height: 14px;
  }
  
  /* Icono de usuario */
  .userIcon {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    /* Ajustamos los márgenes para más espacio */
    margin: 20px 0;
  }
  
  /* Contenedor del registro */
  .registerContainer {
    width: 90%;
    max-width: 350px;
    /* Eliminamos el fondo y el borde redondeado */
    /* background: #f9f9f9; */
    /* border-radius: 10px; */
  
    /* Añadimos un poco de margen superior para separar del ícono */
    margin-top: 20px;
  }
  
  /* Título de registro */
  .registerTitle {
    font-size: 30px;
    margin-bottom: 30px;
    color: black;
    font-weight: bold;
  }
  
  /* Campos de entrada */
  .inputField {
    width: 100%;
    padding: 12px;
    margin: 15px 0; /* Aumentamos el espacio vertical entre campos */
    border: 1px solid white;
    border-radius: 25px;
    background-color: white;
    color: #000;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Botón de registro */
  .signUpButton {
    width: 100%;
    padding: 12px;
    background-color: #4E4E4E; /* Gris oscuro */
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    height: 50px;
    font-weight: bold;
    margin-top: 20px; /* Espacio extra antes del botón */
    transition: background-color 0.5s ease-in-out; /* Efecto de transición suave */
  }
  
  .signUpButton:hover {
    background-color: #28a745 !important; /* Verde al pasar el cursor */
  }
  
  /* Texto para iniciar sesión */
  .loginText {
    color: gray;
    margin-top: 25px; /* Espacio extra antes del texto */
    font-size: 14px;
    text-align: center; 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px; 
    width: 100%;
  }
  
  .loginLink {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
  </style>
  