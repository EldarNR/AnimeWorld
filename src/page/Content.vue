<template>
    <v-container>
        <Header />
        <v-main>
            <v-divider :thickness="5" class="ma-2"></v-divider>
            <List v-if="showRequestListNewAnimeList" />
            <Loading class="mx-auto my-auto" v-else />
        </v-main>
        <Pagination v-if="showRequestListNewAnimeList" class="mt-3" />
    </v-container>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

import List from '../components/Layout/List.vue';
import Header from '../components/Layout/Header.vue';
import { api } from '../state/api';
import Loading from '../components/UIElements/Loading.vue';
import Pagination from '../components/UIElements/Pagination.vue';

export default {
    components: { Header, List, Loading, Pagination },
    setup() {
        const store = useStore();
        const showListNew = store.getters.getNewAnimeList;
        const showRequestListNewAnimeList = computed(() => store.getters.showRequestNewAnimeList);

        // Не сохраняйте локальную переменную, используйте геттер прямо в шаблоне
        api.dispatch('fetchNewAnime');
        api.dispatch("fetchRandom");

        return { showListNew, showRequestListNewAnimeList };
    }
}
</script>


