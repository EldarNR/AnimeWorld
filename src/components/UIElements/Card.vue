<template>
    <v-card :loading="loading" class="mx-auto " max-width="374" elevation="16" variant="outlined">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <div align="center" class="pt-2">
            <img loading="lazy" cover class="d-flex justify-center"
                :src="`https://anilibria.tv${cardData.posters.original.url}`" alt="poster">
        </div>
        <v-card-item>
            <v-card-title class="text-justify">{{ cardData.names.ru }}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">Local Favorite</span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <v-row class="mx-0">
                <v-chip-group v-model="selection" class="my-4 text-subtitle-1 " fluid>
                    <v-chip v-for="item in cardData.genres" :key="item" class="mt-1"> {{ item }}</v-chip>
                </v-chip-group>
            </v-row>
            <div class="custom-truncate text-justify">{{ cardData.description }}</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>
        <v-card-actions>
            <v-btn color="deep-purple-lighten-2" variant="text">
                <router-link :to="{ name: 'Serial', params: { id: cardData.id } }">{{ cardData.id }}</router-link>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
            selection: 1,
        };
    },
    methods: {
        reserve() {
            this.loading = true;
            setTimeout(() => (this.loading = false), 2000);
        },
        goToInfo(id: number) {
            this.$router.push({ name: "Serial", params: { id } }); // Переходим на маршрут "Serial" с передачей параметра id
            console.log("id's: ", id)
        }
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

