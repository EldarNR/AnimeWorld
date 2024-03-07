<template>
    <section id="list">
        <span class="text-h3 ">Новое аниме</span>

        <v-row dense justify="center">
            <v-col v-for="(item, innerIndex) in getNewAnime.list" :key="innerIndex" xs="12" sm="12" md="6" lg="4" xl="4"
                xxl="4" class="d-flex align-center justify-center">
                <Card :card-data="item" />
            </v-col>
        </v-row>

    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Filter from "../UIElements/Filter.vue";

import Card from "../UIElements/Card.vue";

export default defineComponent({
    components: { Card, Filter },
    setup() {
        const store = useStore();
        const getNewAnime = computed(() => store.getters.getNewAnimeList.data);

        return { getNewAnime };
    }
})
</script>
