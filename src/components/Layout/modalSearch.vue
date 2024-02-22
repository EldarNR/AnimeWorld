<template>
    <v-dialog width="90dvw" v-model="isActive">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="text-center">
                <v-icon size="30">mdi-magnify</v-icon>
            </v-btn>
        </template>
        <template v-slot:default>
            <v-card subtitle="Введите название:" max-height="500px" :class="getBackgroundColor">

                <div class="mr-2 ml-2">
                    <v-text-field label="Поиск" v-model="inputValue" :rules="rules" hide-details="auto"
                        class="density-compact"></v-text-field>
                </div>
                <v-card-actions class="mr-3 ml-3">
                    <v-btn text="Search" color="info" @click="search" variant="flat"></v-btn>
                    <v-btn text="Reset" color="error" clearable @click="resetInput" variant="flat"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text="Close Dialog" @click="close"></v-btn>
                </v-card-actions>


                <Filter class="mr-3 ml-3 mt-2 d-none d-sm-flex" />
                <v-divider></v-divider>

                <div v-if="getRequestData">
                    <div v-if="getSearchList && getSearchList.data.list && getSearchList.data.list.length !== 0">
                        <div v-for="(items, i) in getSearchList.data.list" :key="i">
                            <SMCard :post="items" :class="getBackgroundColor" class="ma-1" @click="close" />
                        </div>
                    </div>
                    <div v-else class="text-center mt-5 mb-5">
                        <Empty />
                    </div>
                </div>
                <span v-else-if="inputValue.length < 3" class="text-center ma-2">
                    Введите слово для поиска...
                </span>
                <LoadingVue class="mx-auto my-auto" v-else />

            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import { api } from '../../state/api';
import LoadingVue from '../UIElements/Loading.vue';
import SMCard from '../UIElements/SMCard.vue';
import Empty from '../UIElements/Empty.vue';
import Filter from '../UIElements/Filter.vue';

export default {
    components: { LoadingVue, SMCard, Empty, Filter },
    data() {
        return {
            trip: {
                name: '',
                location: null,
                start: null,
                end: null,
            },
            inputValue: '' as string,
            isActive: false, // Добавляем свойство для отслеживания состояния диалога
            rules: [
                (value: string | number | boolean) => !!value || "Required.",
                (value: string) =>
                    /^[a-zA-Z0-9\s]*$/.test(value) ||
                    "Only letters, numbers, and spaces are allowed",
            ],
        };
    },
    setup() {

        const store = useStore();
        const getRequestData = computed(() => store.getters.showRequestSearch);
        const getSearchList = computed(() => store.getters.getSearchList)
        const getBackgroundColor = computed(() => store.getters.backgroundColor)

        onMounted(() => api.dispatch('fetchForFilter'))
        return { getRequestData, getSearchList, getBackgroundColor };
    },
    watch: {
        inputValue(value: string) {
            if (value && value.trim().length >= 6) {
                console.log("Input value changed:", value);
                api.dispatch('setSearchParams', value);
            }
        },
    },
    methods: {
        search() {
            console.log("Search button clicked");
            if (typeof this.inputValue === 'string' && this.inputValue.trim() !== "") {
                api.dispatch('setSearchParams', this.inputValue.trim());
            }
        },
        close() {
            this.isActive = false;
        },
        resetInput() {
            this.inputValue = '';
            api.dispatch('setSearchParams', this.inputValue);
        },
    },
};
</script>
