<template>
  <v-app :class="backgroundColor">
    <Navbar :class="backgroundColor" />
    <v-main :class="backgroundColor" class="d-flex justify-space-around">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { api } from './state/api';
import Navbar from './components/Layout/Navbar.vue';
export default defineComponent({
  setup() {
    const store = useStore();

    const backgroundColor = computed(() => {
      return store.getters.backgroundColor;
    });

    const list = computed(() => {
      return store.state.list;
    });



    return {
      backgroundColor,
      list,
      Navbar
    };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>
