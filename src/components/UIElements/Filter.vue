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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { api } from "../../state/api";

export default defineComponent({
    data() {

        return {
            value: false,
        }
    },

    setup() {
        const selecterGenres = ref<string[]>([]);
        const selecterYear = ref<string>("");

        const store = useStore();
        const getParamsForFilter = computed(() => store.getters.getParamsforFilter);

        const selectedGeneral = ref<string[]>([]);

        const selected = async () => {
            const selectedGenres = new Set(selecterGenres.value.map(String));
            selectedGeneral.value = [...selectedGenres];

            api.dispatch("setFilterforSearch", Array.from(selectedGeneral.value).join());
            api.dispatch("setFilterforSearchYear", selecterYear);
            console.log(Array.from(selectedGeneral.value).join());
        };

        const removeItem = (index: number) => {
            selectedGeneral.value.splice(index, 1);
            // После удаления элемента из списка обновляем данные в хранилище Vuex и в консоль
            api.dispatch("setFilterforSearch", `${Array.from(selectedGeneral.value).join()}`);
            console.log(selectedGeneral.value.join());
        };

        return { getParamsForFilter, selecterYear, selecterGenres, selectedGeneral, selected, removeItem };
    },
});
</script>
