<template>
    <v-container>
        <Header />
    </v-container>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import Header from '../components/Layout/Header.vue';
import Empty from '../components/UIElements/Empty.vue';
import Loading from '../components/UIElements/Loading.vue';
import { api } from '../state/api';
export default {
    components: { Header, Empty, Loading },

    setup() {
        const store = useStore();
        const showListNew = store.getters.getNewAnimeList;
        api.dispatch('fetchNewAnime');
        return showListNew;
    }
}
</script>

