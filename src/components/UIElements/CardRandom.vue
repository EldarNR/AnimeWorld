<template>
    <v-card class="mx-auto text-center rounded-xl" max-width="350">
        <div align="center">
            <v-img :src="`https://anilibria.tv${anim.posters.medium.url}`" max-width="350px" alt="poster" cover
                :lazy-src="`https://anilibria.tv${anim.posters.small.url}`"></v-img>
        </div>

        <v-card-title>
            {{ anim.names.ru }}
        </v-card-title>
        <v-divider class="mx-4 mb-1"></v-divider>
        <v-row class="mx-0">
            <v-chip-group class="my-4 text-subtitle-1" fluid>
                <v-chip v-for="item in anim.genres" :key="item" class="ml-1">{{ item }}</v-chip>
            </v-chip-group>
        </v-row>

        <v-card-actions class="text-subtitle mx-auto d-flex justify-center">
            <v-btn color="info" @click="goToInfo(anim.id)">
                Смотреть <v-icon>mdi-play-circle-outline</v-icon>
            </v-btn>
            <BtnFavorite :post="anim" />
        </v-card-actions>
        <v-divider class="mx-4 mb-1"></v-divider>
        <v-btn color="success" class="mb-2 mt-1" @click="forceUpdateComponent()"><v-icon
                size="25">mdi-clover</v-icon></v-btn>
    </v-card>
</template>

<script lang="ts">
import { store } from '../../state';
import { api } from '../../state/api';
import BtnFavorite from './Btn-Favorite.vue';

interface CardData {
    genres: [];

    id: number;
    names: {
        ru: string;
    };
    description: string;
    posters: {
        original: {
            url: string;
        },
        medium: {
            url: string;
        },
        small: {
            url: string,
        }
    },


}

export default {
    data() {
        return {
            imageLoaded: false
        };
    },
    components: { BtnFavorite },
    props: {
        anim: {
            type: Object as () => CardData,
            required: true
        }
    },
    methods: {
        goToInfo(id: number) {
            this.$router.push({ name: "Serial", params: { id } });
        },
        getId({ id, title, description, img }: { id: number; title: string; description: string; img: string }) {
            store.dispatch("getIdAnime", { id, title, description, img });
        },
        getImg() {
            this.imageLoaded = true;
        },
        forceUpdateComponent() {
            api.dispatch("fetchRandom");
        }
    }
}
</script>
