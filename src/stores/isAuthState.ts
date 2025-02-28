import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { isAuth } from '@/services/isAuth'; // Adjust the path as necessary

export const useAuthStore = defineStore('auth', () => {
  const authState = ref(isAuth.get());

  const isAuthenticated = computed(() => authState.value);

  const setAuthState = (state: boolean) => {
    authState.value = state;
    isAuth.set(state);
  };

  const login = () => {
    setAuthState(true);
  };

  const logout = () => {
    setAuthState(false);
  };

  return { authState, isAuthenticated, setAuthState, login, logout };
});