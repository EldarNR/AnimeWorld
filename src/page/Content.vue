<template>
    <v-container>
        <Schedule class="mr-3 ml-3" v-if="getRequestData" />
        <Loading class="mt-5 mx-auto" v-else />
        <Blog />
    </v-container>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

import Schedule from '../components/Layout/Schedule.vue';
import Loading from '../components/UIElements/Loading.vue';
import { api } from '../state/api';
import BlogVue from '../components/Layout/Blog.vue';

export default {
    components: { Schedule, Loading, BlogVue },

    setup() {
        const store = useStore();
        const getRequestData = computed(() => store.getters.showRequestList);

        onMounted(() => {
            api.dispatch('fetchList');
        });


        return { getRequestData };
    }
}
</script>


