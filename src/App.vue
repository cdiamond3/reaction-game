<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/isAuthState';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated, logout } = authStore;

const handleLogout = () => {
  console.log('User logged out successfully');
  sessionStorage.removeItem('authState')
  logout();
  router.push('/');
};
console.log(isAuthenticated)
</script>

<template>
  <div class="appContainer">
    <div>
      <header class="header">
        REACTION TIMER TEST
        <div v-if="isAuthenticated === true" class="navContainer"> 
          <nav class="navContainer">
            <div class="left">
              <RouterLink to="/reaction-timer">Play</RouterLink>
            </div>
            <div class="right">
              <RouterLink to="/my-stats">My Stats</RouterLink>
              <button @click="handleLogout">Logout</button>
            </div>
          </nav>
        </div>
        <div v-else>
          <nav>
            <RouterLink to="/">Login</RouterLink>
          </nav>
        </div>
      </header>
    </div>
    <div class="componentContainer">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.appContainer {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.componentContainer {
  display: flex;
  flex: 1;
  justify-content: center;
  width: 1300px;
  align-items: center;
  padding-top: 60px; /* Adjust this value to match the height of your header */
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure the header is on top of other elements */
  background-color: rgba(72, 88, 226, 0.171); /* Add a background color to the header */
  padding: 10px 20px; /* Add some padding to the header */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for better visibility */
}

.navContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left {
  display: flex;
}

.right {
  display: flex;
}
</style>