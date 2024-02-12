<template>
    <div>
        <span class="text-title">Anime World Presents</span>
        <div class="d-flex align-center" align="center">
            <v-chip-group>
                <v-chip v-for="day in days" :key="day.id" v-on:click="getDays(day.id)">{{ day.day }}</v-chip>
            </v-chip-group>
        </div>
        <v-row dense v-for="(anime, index) in listAnime" :key="index">
            <v-col v-for="(item, innerIndex) in anime.list" :key="innerIndex" xs="12" sm="12" md="6" lg="4" xl="2"
                class="d-flex align-center justify-center">

                <Card :cardData="item" :cardDay="anime.day" :key="innerIndex" />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { api } from '../../state/api';
import Card from '../UIElements/Card.vue';

export default defineComponent({
    components: { Card },

    setup() {
        const store = useStore();
        const listAnime = computed(() => store.getters.getListAnime.data);

        return { listAnime };

    },

    data() {
        return {
            days: [
                { id: 0, day: "Monday" },
                { id: 1, day: "Tuesday" },
                { id: 2, day: "Wednesday" },
                { id: 3, day: "Thursday" },
                { id: 4, day: "Friday" },
                { id: 5, day: "Saturday" },
                { id: 6, day: "Sunday" }
            ],
        };
    },
    methods: {
        getDays(id: number) {
            api.dispatch('setApiParams', `days=${id}`);
        }
    }
});
</script>