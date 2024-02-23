<template>
    <section id="pagination" class="mt-3">
        <v-lazy v-if="getPages" :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
            <v-pagination v-model="model" :length="getPages.pagination.pages - 10" :total-visible="6" density="comfortable"
                variant="text"></v-pagination>
        </v-lazy>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
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

        const getPages = computed(() => store.getters.getNewAnimeList.data);
        return { getPages };
    },
    watch: {
        model(New_value) {
            api.dispatch("setNewListAnimeParams", New_value);
        }
    }
})
</script>