<template>
    <v-container fluid id="schedule">

        <Schedule class="mr-3 ml-3" v-if="getRequestData" />
        <Loading class="mt-5 mx-auto" v-else />
    </v-container>
</template>
    
<script lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

import Schedule from '../components/Layout/Schedule.vue';
import Loading from '../components/UIElements/Loading.vue';
import { api } from '../state/api';

export default {
    components: { Schedule, Loading },

    setup() {
        const store = useStore();
        const getRequestData = computed(() => store.getters.showRequestList);
        api.dispatch('fetchList');

        return { getRequestData };
    }
}
</script>
  