<template>
    <v-container>
        <v-row>
            <v-col cols="5">
                <v-combobox v-model="selecterGenres" :items="getParamsForFilter.Genres" label="Выберите Жанр"
                    multiple></v-combobox>
            </v-col>

            <v-col cols="6">
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
    </v-container>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { api } from "../../state/api";

export default defineComponent({
    setup() {
        const selecterGenres = ref<string[]>([]);
        const selecterYear = ref<number[]>([]);

        const store = useStore();
        const getParamsForFilter = computed(() => store.getters.getParamsforFilter);

        const selectedGeneral = ref<string[]>([]);

        const selected = () => {
            const selectedGenres = selecterGenres.value.map(String);
            const selectedYears = selecterYear.value.map(String);
            selectedGeneral.value = [...selectedGeneral.value, ...selectedGenres, ...selectedYears];
            console.log(selectedGeneral.value.join());


            api.dispatch("setNewListAnimeMethod", `genres=${selectedGeneral.value.join()}`);
        };

        const removeItem = (index: number) => {
            selectedGeneral.value.splice(index, 1);
            // После удаления элемента из списка обновляем данные в хранилище Vuex и в консоль
            api.dispatch("setNewListAnimeMethod", `genres=${selectedGeneral.value.join()}`);
            console.log(selectedGeneral.value);
        };

        return { getParamsForFilter, selecterYear, selecterGenres, selectedGeneral, selected, removeItem };
    },
});
</script>
  