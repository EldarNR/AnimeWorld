<template>
    <section id="schedule">
        <span class="text-title">Anime World Presents</span>
        <div class="d-flex align-center" align="center">
            <v-chip-group>
                <v-chip v-for="day in days" :key="day.id" v-on:click="getDays(day.id)">{{ day.day }}</v-chip>
            </v-chip-group>
        </div>

        <v-carousel dense v-for="(anime, index) in listAnime" :key="index" class="rounded-xl" hide-delimiters>
            <v-carousel-item v-for="(item, innerIndex) in anime.list" :key="innerIndex">
                <router-link :to="{ name: 'Serial', params: { id: item.id } }">
                    <InfoBlock :posts="item" :cardDay="anime.day" :key="innerIndex" style=" cursor: pointer" />
                </router-link>
            </v-carousel-item>
        </v-carousel>
        <v-divider :thickness="3" class="mt-4"></v-divider>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { api } from '../../state/api';
import Card from '../UIElements/Card.vue';
import InfoBlock from '../UIElements/InfoBlock.vue';

export default defineComponent({
    components: { Card, InfoBlock },

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