<template>
  <div class="iphone16Pro1">
    <img class="userIcon" alt="User Icon" src="/unnamed.png">
    <div class="loginContainer">
      <h1 class="loginTitle">Registro</h1>
      <input type="text" class="inputField" placeholder="Nombre">
      <input type="text" class="inputField" placeholder="Apellidos">
      <input type="text" class="inputField" placeholder="Usuario">
      <input type="email" class="inputField" placeholder="Correo">
      <input type="password" class="inputField" placeholder="Contraseña">
      <input type="password" class="inputField" placeholder="Confirmar contraseña">
      <router-link to="/home">
        <button class="signInButton">Sign Up</button>
      </router-link>
      <p class="registerText">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="registerLink">Inicia sesión</router-link>
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
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

/* Icono de usuario (igual que en login) */
.userIcon {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin-bottom: 100px;
  margin-top: -100px;
}

/* Contenedor de la vista (sin recuadro) */
.loginContainer {
  width: 90%;
  max-width: 350px;
  background: transparent;
  padding: 0;
  border-radius: 0;
}

/* Título (igual que en login) */
.loginTitle {
  font-size: 30px;
  margin-bottom: 50px;
  color: black;
  font-weight: bold;
}

/* Input fields (igual que en login) */
.inputField {
  width: 100%;
  padding: 12px;
  margin: 5px 0;
  border: 1px solid white;
  border-radius: 25px;
  background-color: white;
  color: #000;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
}

/* Botón (igual que en login) */
.signInButton {
  width: 100%;
  padding: 12px;
  background-color: #4E4E4E;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  height: 50px;
  font-weight: bold;
  transition: background-color 0.5s ease-in-out;
  margin-top: 30px;
}

.signInButton:hover {
  background-color: #28a745 !important;
}

/* Texto para redirigir al login */
.registerText {
  color: gray;
  margin-top: 15px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.registerLink {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
