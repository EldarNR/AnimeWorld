<template>
    <v-container class="mt-1">
        <v-alert type="info" title="Советуем начинать смотреть по порядку" closable variant="tonal"
            v-if="franchises.length !== 0">
            <div v-for="(items, i) in franchises" :key="i">
                <div v-for="(item, j) in items.releases" :key="j">
                    №{{ j + 1 }} <router-link :to="{ name: 'Serial', params: { id: item.id } }">{{
                        item.names.ru }}</router-link>
                </div>
            </div>
        </v-alert>

        <div class="video-container mt-4" align="center">
            <iframe :src="`https://www.anilibria.tv/public/iframe.php?id=${id}`" type="text/html" frameborder="0"
                allowfullscreen></iframe>
        </div>
    </v-container>
</template>

  
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Franchise } from "../typification/List";
export default defineComponent({
    props: {
        id: {
            type: Number,
            required: true,
        },
        franchises: {
            type: Array as PropType<Franchise[]>, // Изменение типа на массив Franchise[]
            required: true,
        }
    },
});
</script>
<style scoped>
.video-container {
    position: relative;
    width: 100%;

    /* 16:9 aspect ratio */
}

@media (min-width: 600px) {

    /* xs */
    .video-container iframe {
        width: 100%;
        height: 50dvh;
    }
}

/* Дополнительные стили для различных разрешений */
@media (min-width: 960px) {

    /* sm */
    .video-container iframe {
        width: 100%;
        height: 40dvh;
    }
}

@media (min-width: 1280px) {

    /* md */
    .video-container iframe {
        width: 90%;
        height: 40dvh;
    }
}

@media (min-width: 1920px) {

    /* lg */
    .video-container iframe {
        width: 80%;
        height: 50dvh;
    }
}

@media (min-width: 2560) {

    /* xl */
    .video-container iframe {
        width: 10%;
        height: 50dvh;
    }
}

@media (min-width: 2561) {

    /* xll */
    .video-container iframe {
        width: 50%;
        height: 40dvh;
    }
}
</style>
