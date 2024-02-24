<template>
    <v-container>
        <span class="text-h5 ">Blog / Youtube</span><br />
        <span class="text-subtitle mb-1 ">Каждый день новые видео</span>
        <v-sheet v-if="getLoading" class="mx-auto" elevation="8" :class="getThem">

            <v-slide-group v-model="model" class="pa-4 mt-3" selected-class="bg-error" show-arrows>
                <v-slide-group-item v-for="item in getBlog.list" :key="item.id"
                    v-slot="{ isSelected, toggle, selectedClass }">
                    <v-card color="grey-darken-1" :class="['ma-4', selectedClass]" height="250" width="300"
                        @click="handleClick(item, isSelected, toggle)">
                        <v-scale-transition>
                            <v-card-title>
                                {{ item.title }}
                            </v-card-title>
                        </v-scale-transition>

                        <v-img :width="300" :src="`https://anilibria.tv/${item.preview.thumbnail}`">
                            <div class="d-flex fill-height align-center justify-center">
                                <v-scale-transition>
                                    <v-icon v-if="isSelected" size="48" icon="mdi-play-circle-outline"></v-icon>
                                </v-scale-transition>
                            </div>
                        </v-img>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
        <v-pagination v-if="getLoading" class="mt-5" v-model="page" :total-visible="5" :length="getBlog.pagination.pages"
            density="comfortable"></v-pagination>
    </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex'
import { api } from '../../state/api';

import Loading from '../UIElements/Loading.vue';

export default defineComponent({
    data: () => ({
        model: null,
        page: 1
    }),
    components: { Loading },
    setup() {
        const store = useStore();
        const getBlog = computed(() => store.getters.getBlog);
        const getLoading = computed(() => store.getters.showRequestBlog);
        const getThem = computed(() => store.getters.backgroundColor)

        onMounted(() => api.dispatch("fetchBlog"))

        const page = computed({
            get: () => getBlog.value.pagination.page,
            set: (newValue) => api.commit("changePage", newValue)
        });

        const handleClick = (item: { youtube_id: any; }, isSelected: any, toggle: () => void) => {
            toggle(); // Изменить значение isSelected
            if (!isSelected) {
                window.open(`https://www.youtube.com/watch?v=${item.youtube_id}`, '_blank'); // Открыть ссылку в новой вкладке
            }
        };

        return { getBlog, getLoading, getThem, page, handleClick };
    }
})
</script>
