<template>
  <ion-page>
    <ion-content class="page-container">
      <!-- Vista de Login (base) exactamente igual a la original -->
      <div class="iphone16Pro1">
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
            <router-link to="/registro" class="registerLink">Regístrate</router-link>
          </p>
        </div>
      </div>

      <!-- Capa de Splash (animación) superpuesta sobre el login -->
      <transition name="fade">
        <div class="intro-container" v-if="showSplash">
          <img src="/unnamed2.png" alt="Logo" class="animated-logo" />
        </div>
      </transition>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StatusBar from '@/components/StatusBar.vue';

const showSplash = ref(true);

onMounted(() => {
  // Después de 2.2 segundos (final de la animación) se quita la capa de splash
  setTimeout(() => {
    showSplash.value = false;
  }, 2200);
});
</script>

<style scoped>
/* Contenedor principal: posición relativa para superponer capas */
.page-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
}

/* Vista de Login exactamente como la original */
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

.userIcon {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin-bottom: 100px;
  margin-top: -100px;
}

/* Eliminar el recuadro envolvente: fondo, padding y border-radius removidos */
.loginContainer {
  width: 90%;
  max-width: 350px;
  /* Sin fondo ni border-radius para que se vea sin recuadro */
  background: transparent;
  padding: 0;
  border-radius: 0;
}

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

.options {
  display: flex;
  margin-top: 15px;
  margin-bottom: 30px;
  justify-content: space-between;
  font-size: 14px;
}

.rememberMe {
  display: flex;
  gap: 5px;
  font-size: 14px;
  color: gray;
}

.forgotPassword {
  text-decoration: none;
  color: black;
}

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
}

.signInButton:hover {
  background-color: #28a745 !important;
}

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

/* Capa de Splash: ocupa toda la pantalla, superpuesta sobre el login */
.intro-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Logo animado: inicia muy grande y semi-transparente, y se anima hasta coincidir con el userIcon */
.animated-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Inicia centrado, con escala 8 y opacidad baja */
  transform: translate(-50%, -50%) scale(8);
  opacity: 0.1;
  width: 75px;
  height: 75px;
  animation: moveAndShrink 2s forwards ease-in-out;
}

@keyframes moveAndShrink {
  0% {
    transform: translate(-50%, -50%) scale(15);
    opacity: 0.1;
  }
  100% {
    /* El valor "calc(-50% - 305px)" se ajusta para que el logo coincida con la posición del userIcon */
    transform: translate(-50%, calc(-50% - 285px)) scale(1);
    opacity: 1;
  }
}

/* Transición fade para la desaparición del splash */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
