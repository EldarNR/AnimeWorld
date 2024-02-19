<template>
    <v-container fluid>
        <v-row class="box d-flex align-center justify-space-evenly">

            <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="12" xll="12" variant="outlined" class="mb-5 pa-4 text-center"
                color="deep-purple-lighten-3" elevation="18">
                <h2 class="text-h6 text-sm-h3 text-md-h4 text-lg-h2 text-xl-h1 ">Anime
                    World</h2>
                <div class="ml-3 text-sm-caption text-md-body-1 text-lg-h5 text-xl-h3 mr-3 mb-3">Your
                    favorite anime
                    is
                    here!</div>
            </v-col>

            <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="12" xll="12" class="mt-1 mb-1 text-center">
                Ищешь что посмотреть?

                <CardRandom :anim="anim" :class="getBackgroundColor" v-if="request" />

                <v-skeleton-loader :class="getBackgroundColor" :elevation="8" class="mx-auto border" max-width="300"
                    type="image, article" v-else></v-skeleton-loader>
            </v-col>

        </v-row>
    </v-container>
</template>
  
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import CardRandom from '../UIElements/CardRandom.vue';
export default {

    components: { CardRandom },
    setup() {
        const store = useStore();
        const anim = computed(() => store.getters.getRandomAnime);
        const request = computed(() => store.getters.getRequestRandom);
        const getBackgroundColor = computed(() => store.getters.backgroundColor)

        return { anim, request, getBackgroundColor };
    },

}
</script>
  
<style scoped>
.box {
    height: 100%;
    background-color: rgba(33, 33, 33, 0.7);
    /* Используйте rgba для установки прозрачного цвета */
}

.custom-truncate {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
}
</style>
