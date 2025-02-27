<template>
  <div class="iphone16Pro1">
    <StatusBar :key="$route.fullPath" rightIcon="rightSide1"/> 

    <img class="userIcon" alt="User Icon" src="/unnamed.png">

    <div class="loginContainer">
      <h1 class="loginTitle">Login</h1>

      <input type="email" class="inputField" placeholder="Correo">
      <input type="password" class="inputField" placeholder="Contraseña">

      <div class="options">
        <label class="rememberMe">
          <input type="checkbox"> Recuérdame
        </label>
        <a href="#" class="forgotPassword">Recuperar contraseña</a>
      </div>

      <button class="signInButton" @click="$router.push('/home')">Sign In</button>

      <p class="registerText">
        ¿No tienes cuenta?
        <!-- Usamos router-link en lugar de <a> para navegación interna -->
        <router-link to="/registro" class="registerLink">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import StatusBar from '@/components/StatusBar.vue';

export default {
  name: 'Login',
  components: {
    StatusBar
  }
}
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
  margin-bottom: 100px;
  margin-top: -100px;
}

/* Contenedor del login */
.loginContainer {
  width: 90%;
  max-width: 350px;
  padding: 20px;
  background: f9f9f9;
  border-radius: 10px;
}

/* Título */
.loginTitle {
  font-size: 30px;
  margin-bottom: 50px;
  color: black;
  font-weight: bold;
}

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

/* Opciones de recordar contraseña */
.options {
  display: flex;
  margin-top: 15px;
  margin-bottom: 30px;
  align-content: center;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 15px;
}

.rememberMe {
  display: flex;
  margin-top: 1px;
  margin-bottom: 30px;
  gap: 5px; 
  font-size: 14px;
  color: gray; 
}

.rememberMe input {
  margin-right: 5px;
}

.forgotPassword {
  text-decoration: none;
  color: black;
}

/* Botón Sign In */
.signInButton {
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
  transition: background-color 0.5s ease-in-out; /* Efecto de transición suave */
}

.signInButton:hover {
  background-color: #28a745 !important; /* Verde al pasar el cursor */
}

/* Texto de registro */
.registerText {
  color: gray;
  margin-top: 15px;
  font-size: 14px;
  text-align: center; 
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px; 
  width: 100%;
}

.registerLink {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
