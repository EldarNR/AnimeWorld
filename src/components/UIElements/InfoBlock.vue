<template>
    <div>
        <v-row>
            <v-col xs="12" md="5" lg="4" xl="3" xxl="3" class="d-flex align-center justify-center">
                <img cover class="d-flex justify-center ma-2" :src="`https://anilibria.tv${posts.posters.original.url}`"
                    alt="poster" />

            </v-col>

            <v-col xs="12" md="7" lg="8" xl="9" xxl="9" class="float-right">
                <v-divider :thickness="1" class="ml-2 mt-2 mb-2" vertical></v-divider>

                <v-item-group>
                    <v-list-item class="text-xs-body-1 text-sm-h6 text-md-h5 text-lg-h5 text-xl-h4">{{
                        posts.names.ru
                    }}</v-list-item>

                    <v-divider :thickness="1" class="mr-2"></v-divider>

                    <v-expansion-panels variant="accordion" class="mt-2">
                        <v-expansion-panel title="Описание" :class="getThem"
                            class="text-caption text-sm-subtitle-2 text-md-subtitle-2 text-lg-body-1 text-xl-body-1 text-justify overflow-auto ml-1 mr-2"
                            :text="posts.description">
                        </v-expansion-panel>
                    </v-expansion-panels>

                    <v-list-item>Год выхода: <v-chip>{{ posts.season.year }}</v-chip></v-list-item>
                    <v-list-item>Серия: <v-chip>{{ posts.player.episodes.string }} </v-chip></v-list-item>
                    <v-list-item>Тип <v-chip>{{ posts.type.full_string }}</v-chip></v-list-item>
                    <v-list-item>
                        Жанры:
                        <v-chip v-for="item in posts.genres" :key="item" class="mr-1">{{ item }}</v-chip>
                    </v-list-item>
                    <v-list-item>Доступные озвучки:
                        <v-chip v-for="item in posts.team.voice" :key="item" class="mr-1">{{ item }}</v-chip>
                    </v-list-item>
                    <v-list-item>
                        Субтитры:
                        <v-chip v-for="item in posts.team.translator" :key="item">
                            <span v-if="posts.team.translator.length !== 0">{{ item }}</span>
                        </v-chip>
                        <v-chip v-if="!posts.team.translator || posts.team.translator.length === 0"> - </v-chip>
                    </v-list-item>

                </v-item-group>




            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { ForCard } from '../typification/List';

export default defineComponent({
    props: {
        posts: {
            type: Object as PropType<ForCard>,
            required: true,
        },
    },
    setup() {
        const store = useStore();
        const getThem = computed(() => store.getters.backgroundColor);

        return { getThem }
    }
});
</script>
