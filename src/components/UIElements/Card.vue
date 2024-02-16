<template>
    <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
        <v-card :loading="loading" :class="getBackgroundColor" class="mx-auto ma-2" max-width="374" elevation="10">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <div align="center" class="pt-2">
                <v-img :src="`https://anilibria.tv${cardData.posters.original.url}`" alt="poster" cover></v-img>
            </div>
            <v-card-item>
                <v-card-title class="text-justify">{{ cardData.names.ru }}</v-card-title>
                <v-card-subtitle>
                    <span class="me-1">Cерий: {{ cardData.player.episodes.string }}</span>
                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <v-row class="mx-0">
                    <v-chip-group class="my-4 text-subtitle-1 " fluid>
                        <v-chip v-for="item in cardData.genres" :key="item" class="mt-1">{{ item }}</v-chip>
                    </v-chip-group>
                </v-row>
                <div class="custom-truncate text-justify">{{ cardData.description }}</div>
            </v-card-text>

            <v-divider class="mx-4 mb-1"></v-divider>
            <v-card-actions>
                <v-btn color="deep-purple-lighten-2" variant="text" @click="goToInfo(cardData.id)">Смотреть</v-btn>
            </v-card-actions>
        </v-card>
    </v-lazy>
</template>
  
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { ForCard } from '../typification/List';

export default defineComponent({
    props: {
        cardData: {
            type: Object as PropType<ForCard>,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    setup() {
        const store = useStore();
        const getBackgroundColor = computed(() => store.getters.backgroundColor);

        return { getBackgroundColor };
    },
    methods: {
        goToInfo(id: number) {
            this.$router.push({ name: "Serial", params: { id } });
        },
    },
});
</script>
  
<style scoped>
.custom-truncate {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
}
</style>
  