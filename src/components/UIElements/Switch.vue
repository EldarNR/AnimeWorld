<template>
    <v-switch v-model="switchBoolean" hide-details inset class="mt-1"></v-switch>
</template>
  
<script lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    setup() {
        const store = useStore();
        const switchBoolean = computed({
            get() {
                return store.getters.backgroundColorBollen;

            },
            set(value) {
                store.commit('changeBackgroundColor', value);
            }
        });
        return { switchBoolean };
    },
}
</script>
