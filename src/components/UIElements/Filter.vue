<template>
    <v-row>
        <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5" xxl="5">
            <v-combobox v-model="selecterGenres" :items="getParamsForFilter.Genres" label="Выберите Жанр"
                multiple></v-combobox>
        </v-col>

        <v-col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
            <v-combobox v-model="selecterYear" :items="getParamsForFilter.Year" label="Выберите Год"></v-combobox>
        </v-col>

        <v-col cols="1" class="my-auto mx-auto mt-3">
            <v-btn color="info" @click="selected">Filter</v-btn>
        </v-col>

        <v-col cols="12">
            <v-chip-group>
                <v-chip v-for="(item, i) in selectedGeneral" :key="i" closable @click:close="removeItem(i)">{{ item
                    }}</v-chip>
            </v-chip-group>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { api } from "../../state/api";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const selecterGenres = ref<string[]>([]);
        const selecterYear = ref<string>("");
        const store = useStore();

        const getParamsForFilter = computed(() => store.getters.getParamsforFilter);

        const setFilterforSearch = (genres: string[]) => {
            const filteredGenres = genres.join();
            api.dispatch('setFilterforSearch', filteredGenres);
        };

        const setFilterforSearchYear = (year: string) => {
            api.dispatch('setFilterforSearchYear', year);
        };

        const selectedGeneral: string[] = [];

        const selected = () => {
            const selectedGenres = new Set(selecterGenres.value.map(String));
            selectedGeneral.splice(0, selectedGeneral.length, ...selectedGenres);
            setFilterforSearchYear(selecterYear.value);
        };

        const removeItem = (index: number) => {
            selectedGeneral.splice(index, 1);
            setFilterforSearch(selectedGeneral);
        };

        watch(selecterGenres, selected);
        watch(selecterYear, setFilterforSearchYear);

        return { getParamsForFilter, selecterYear, selecterGenres, selectedGeneral, removeItem, selected };
    },
});
</script>
