<template>
  <v-app>
    <Navbar />
    <v-main :class="backgroundColor">
      <router-view class="content" />
    </v-main>

    <Footer :class="backgroundColor" elevation="16" class="footer mx-auto " />

  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import Navbar from './components/Layout/Navbar.vue';
import Footer from './components/Layout/Footer.vue';
import { store } from './state';
import { api } from './state/api';
export default defineComponent({
  setup() {
    const store = useStore();

    const backgroundColor = computed(() => {
      return store.getters.backgroundColor;
    });
    
    onMounted(() => {
      api.dispatch("userCollection");
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


.content {
  max-width: 1280px;

}
</style>
