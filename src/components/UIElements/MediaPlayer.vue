<template>
    <v-container class="mt-1">
        <v-menu open-on-hover v-if="franchises.length > 0">
            <template v-slot:activator="{ props }">

                <v-btn v-bind="props" :class="getThem"
                    class="text-caption text-sm-subtitle-2 text-md-subtitle-2 text-lg-body-1 text-xl-body-1 text-justify overflow-auto ml-1 mr-2">
                    <v-icon color="info" icon="mdi-information" class="mr-2"></v-icon>

                    Советуем начинать смотреть по порядку
                </v-btn>
            </template>

            <v-list :class="getThem">

                <v-list-item v-for="(items, i) in franchises" :key="i">
                    <v-list-item v-for="(item, j) in items.releases" :key="j">
                        №{{ j + 1 }} <router-link :to="{ name: 'Serial', params: { id: item.id } }">{{
                            item.names.ru }}</router-link>
                    </v-list-item>
                </v-list-item>
            </v-list>
        </v-menu>


        <div class="video-container mt-4" align="center" :key="id">

            <iframe :src="`https://www.anilibria.tv/public/iframe.php?id=${id}`" type="text/html" width="auto" height="auto"
                frameborder="0" allowfullscreen></iframe>
        </div>
    </v-container>
</template>

  
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
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
    setup(props) {
        const store = useStore();
        const getThem = computed(() => store.getters.backgroundColor);
        const route = useRoute();
        const forceUpdateTrigger = ref(false);

        watch(() => props.id, async () => {
            // Измените значение переменной, чтобы вызвать перерендеринг
            forceUpdateTrigger.value = !forceUpdateTrigger.value;
        }, { immediate: true });


        return { getThem, forceUpdateTrigger }
    }
});
</script>
<style scoped>
.video-container {
    position: relative;
    margin: 0px;
    padding: 0px;
    width: 100%;

    /* 16:9 aspect ratio */
}

@media only screen and (min-width: 400px) {

    /* xs */
    .video-container iframe {
        width: 400px;
        height: 500px;
    }
}


@media only screen and (min-width: 600px) {

    /* xs */
    .video-container iframe {
        width: 100%;
        height: 600px;
    }
}

/* Дополнительные стили для различных разрешений */
@media only screen and (min-width: 960px) {

    /* sm */
    .video-container iframe {
        width: 100%;
        height: 600px;
    }
}

@media only screen and (min-width: 1280px) {

    /* md */
    .video-container iframe {
        width: 100%;
        height: 600px;
    }
}
</style>
