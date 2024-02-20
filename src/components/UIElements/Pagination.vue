<template>
    <section id="pagination">
        <v-pagination v-model="model" :length="getPages - 10" density="comfortable" variant="text"></v-pagination>
    </section>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { api } from '../../state/api';

export default defineComponent({

    data() {
        return {
            model: 1
        }
    },
    setup() {
        const store = useStore();


        const getPages = store.getters.getNewAnimeList.data.pagination.pages;
        return { getPages };
    },
    watch: {
        model(New_value) {
            api.dispatch("setNewListAnimeParams", New_value);
        }
    }
})
</script>