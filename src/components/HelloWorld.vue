<script setup lang="ts">
import { VCard, VCardTitle, VCardText, VBtn } from 'vuetify/components';
defineProps<{
  msg: string
}>()
</script>

<template>
  <v-card class="greetings">
    <v-card-title class="green">{{ msg }}</v-card-title>
    <v-card-text>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </v-card-text>
    <v-btn color="primary">Get Started</v-btn>
  </v-card>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
