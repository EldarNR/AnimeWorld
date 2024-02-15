<template>
    <section id="comment_input">
        <span>Comment</span>
        <v-text-field v-model="post.name" label="Your name"></v-text-field>
        <v-textarea counter v-model="post.text" :rules="rules" append-icon="mdi-send" variant="filled"
            clear-icon="mdi-close-circle" clearable label="Message" type="text" @click:append="sendMessage"
            @click:clear="clearMessage"></v-textarea>
    </section>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { store } from '../../state';



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

    methods: {
        sendMessage() {
            store.dispatch("addComment", { id: this.id, user: this.post.name, text: this.post.text });
        },
        clearMessage() {
            this.post.text = '';
        },

    }
});
</script>
  