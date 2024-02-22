<template>
  <v-app>
    <Navbar />
    <v-main :class="backgroundColor" class="d-flex justify-space-around">
      <router-view />
    </v-main>

    <Footer :class="backgroundColor" />

  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

import Navbar from './components/Layout/Navbar.vue';
import Footer from './components/Layout/Footer.vue';
export default defineComponent({
  setup() {
    const store = useStore();

    const backgroundColor = computed(() => {
      return store.getters.backgroundColor;
    });


    return {
      backgroundColor,

      Navbar,
      Footer

    };
  },
});
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>

