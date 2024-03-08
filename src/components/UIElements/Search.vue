<template>
    <!-- Не получилось сделать вывод карточек с данными при получение данных из API -->
    <v-card class="mx-auto" align="start" max-width="400">
        <v-card-text style="position: relative;">
            <v-text-field v-model="inputValue" :loading="loading" density="comfortable" variant="solo"
                append-icon="mdi-magnify" single-line hide-details @click:append="search">




                <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>


            </v-text-field>

        </v-card-text>
    </v-card>
</template>

  
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { api } from '../../state/api';
import modalSearch from '../Layout/modalSearch.vue';
import SMCard from './SMCard.vue';

export default defineComponent({
    components: { modalSearch, SMCard },
    data: () => ({
        items: [
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me 2' },
        ],
    }),
    setup() {
        const store = useStore();
        const inputValue = ref("");
        const loading = ref(false);
        const datas = ref(false);
        const searchAnime = computed(() => store.getters.getSearchList);
        const getRequestSearch = computed(() => store.getters.showRequestSearch);


        if (getRequestSearch) {

        }

        const search = async () => {
            try {
                loading.value = true;
                console.log(inputValue.value);
                if (typeof inputValue.value === 'string' && inputValue.value.trim() !== "") {
                    await api.dispatch('setSearchParams', inputValue.value.trim());
                }
            } catch (error) {
                console.error("Error occurred while fetching data:", error);
            } finally {
                loading.value = false;
            }
        };

        return { inputValue, loading, searchAnime, search, getRequestSearch, datas };
    },
});
</script>
  