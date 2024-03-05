<template>
    <v-container fluid id="schedule">
        <Header :class="!getThem" />
        <v-main>
            <v-divider :thickness="5" class="ma-2"></v-divider>
            <List v-if="showRequestListNewAnimeList" />
            <Loading class="mx-auto my-auto" v-else />
        </v-main>
        <pagination />
    </v-container>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, onBeforeMount, onMounted } from 'vue';

import List from '../components/Layout/List.vue';
import Header from '../components/Layout/Header.vue';
import { api } from '../state/api';
import Loading from '../components/UIElements/Loading.vue';
import Pagination from '../components/UIElements/Pagination.vue';

export default {
    components: { Header, List, Loading, Pagination },
    setup() {
        const store = useStore();
        const showListNew = computed(() => store.getters.getNewAnimeList);
        const showRequestListNewAnimeList = computed(() => store.getters.showRequestNewAnimeList);
        const getThem = computed(() => store.getters.backgroundColor)
        onBeforeMount(() => {
            api.dispatch("fetchRandom");
            api.dispatch('fetchNewAnime');
        });

        return { showListNew, showRequestListNewAnimeList, getThem };
    }
}
</script>