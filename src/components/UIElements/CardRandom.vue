<template>
    <v-card class="mx-auto text-center rounded-xl" max-width="300">
        <div align="center">
            <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition"><v-img class="mt-2"
                    :src="`https://anilibria.tv${anim.posters.small.url}`" max-width="200px" alt="poster" cover></v-img>
            </v-lazy>
        </div>


        <v-card-title>
            {{ anim.names.ru }}
        </v-card-title>
        <v-divider class="mx-4 mb-1"></v-divider>
        <v-row class="mx-0">
            <v-chip-group class="my-4 text-subtitle-1 " fluid>
                <v-chip v-for="item in anim.genres" :key="item" class="ml-1"> {{ item }}</v-chip>
            </v-chip-group>
        </v-row>

        <v-card-actions>
            <v-btn color="orange-lighten-2" variant="text" @click="goToInfo(anim.id)">
                Смотреть
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
export default {

    props: {
        anim: {
            type: Object,
            required: true
        }
    },
    methods: {
        goToInfo(id: number) {
            this.$router.push({ name: "Serial", params: { id } }); // Переходим на маршрут "Serial" с передачей параметра id
        }
    }
}
</script>