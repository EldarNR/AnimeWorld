<template>
    <v-btn v-if="showBtn" color="orange-lighten-2"
        @click="getId({ id: post.id, title: post.names.ru, description: post.description, img: post.posters.original.url })">
        В избранное <v-icon>mdi-bookmark-outline</v-icon>
    </v-btn>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { store } from '../../state';
import { computed } from 'vue';

interface CardData {
    id: number;
    names: {
        ru: string;
    };
    description: string;
    posters: {
        original: {
            url: string;
        };
    };
}

export default {
    props: {
        post: {
            type: Object as () => CardData,
            required: true
        }
    },
    setup() {
        const store = useStore();
        const showBtn = computed(() => store.getters.getAccount);

        return { showBtn }
    },
    methods: {
        getId({ id, title, description, img }: { id: number; title: string; description: string; img: string }) {
            store.dispatch("getIdAnime", { id, title, description, img });
            console.log({ id, title, description, img });
        },
    }
}
</script>
