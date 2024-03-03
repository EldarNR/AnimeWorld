<template>
    <v-btn color="orange-lighten-2" @click="getId(post)">
        В избранное <v-icon>mdi-bookmark-outline</v-icon>
    </v-btn>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { store } from '../../state';
import { PropType, computed } from 'vue';
import { getDatabase } from 'firebase/database';
import { addDoc, Firestore, collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { base } from '../../main';
import { getDocs } from 'firebase/firestore';

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
            type: Object as PropType<CardData>,
            required: true
        }
    },
    async setup() {
        const store = useStore();
        const showBtn = computed(() => store.getters.isLoggedIn);
        console.log(showBtn)
        return { showBtn }
    },
    methods: {
        async getId(post: CardData) {
            const auth = getAuth(base);
            const firestore = getFirestore();
            const userCollection = collection(firestore, `users/${auth.currentUser?.uid}/likes`);
            const { id, names, description, posters } = post;
            const title = names.ru;
            const img = posters.original.url;
            await addDoc(userCollection, { id, title, description, img });
            console.log({ id, title, description, img });
        },
    }
}
</script>
