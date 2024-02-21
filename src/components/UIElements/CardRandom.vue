<template>
    <v-card class="mx-auto text-center rounded-xl" max-width="300">
        <div align="center">

            <v-img class="mt-2" :src="`https://anilibria.tv${anim.posters.small.url}`" max-width="200px" alt="poster"
                cover></v-img>
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
                Смотреть
            </v-btn>
            <v-btn color="orange-lighten-2"
                @click="getId({ id: anim.id, title: anim.names.ru, description: anim.description, img: anim.posters.original.url })">
                В избранное
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">
import { store } from '../../state';
export default {
    data() {
        return {
            imageLoaded: false
        };
    },
    props: {
        anim: {
            type: Object,
            required: true
        }
    },
    methods: {
        goToInfo(id: number) {
            this.$router.push({ name: "Serial", params: { id } });
        },
        getId({ id, title, description, img }: { id: number; title: string; description: string; img: string }) {
            store.dispatch("getIdAnime", { id, title, description, img });
            console.log({ id, title, description, img });
        },
        getImg() {
            this.imageLoaded = true;
        }
    }
}
</script>
