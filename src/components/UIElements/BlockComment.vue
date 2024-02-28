<template>
    <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">

        <section id="comment_input">
            <span>Comment</span>
            <v-text-field v-model="post.name" label="Your name"></v-text-field>
            <v-textarea counter v-model="post.text" :rules="rules" append-icon="mdi-send" variant="filled"
                clear-icon="mdi-close-circle" clearable label="Message" type="text" @click:append="getData"
                @click:clear="clearMessage"></v-textarea>
        </section>
    </v-lazy>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { store } from '../../state';
import { getDatabase, ref as dbRef, onChildAdded, set } from "firebase/database";
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

export default defineComponent({
    data() {
        return {
            message: 'Hey!',
            post: {
                name: "",
                text: "",
            },
            rules: [
                (value: string) => !!value || 'Required.',
                (value: string | any[]) => (value && value.length >= 3) || 'Min 3 characters',
            ],
        };
    },

    props: {
        id: Number
    },

    setup() {
        const database = getFirestore();
        const commentsCollectionRef = collection(database, 'comment');
        function getData() {
            onSnapshot(commentsCollectionRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    const commentData = doc.data().comment;
                    console.log(commentData);
                    // Здесь вы можете выполнить любую другую логику с данными комментария
                });
            });
        }

        return { getData }
    },

    methods: {
        sendMessage() {
            store.dispatch("addComment", { id: this.id, comment: { user: this.post.name, text: this.post.text } });
        },
        clearMessage() {
            this.post.text = '';
        },
    }
});
</script>