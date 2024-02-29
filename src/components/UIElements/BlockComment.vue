<template>
  <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <section id="comment_input">
      <span>Comment</span>
      <v-text-field v-model="post.name" label="Your name" required></v-text-field>
      <v-textarea counter v-model="post.text" :rules="rules" append-icon="mdi-send" variant="filled"
        clear-icon="mdi-close-circle" clearable label="Message" type="text" @click:append="sendMessage"></v-textarea>
    </section>
  </v-lazy>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../state';
import { getFirestore, collection, addDoc, CollectionReference, DocumentData } from 'firebase/firestore';

export default defineComponent({
  data() {
    return {
      post: {
        name: "",
        text: "",
      },
      rules: [
        (value: string) => !!value || 'Обязательное поле.',
        (value: string | any[]) => (value && value.length >= 3) || 'Минимум 3 символа',
      ],
    };
  },

  props: {
    id: Number, // Предполагается, что это идентификатор страницы
  },

  methods: {
    async sendMessage() {
      if (!this.post.name || !this.post.text) {
        console.error('Имя и текст обязательны к заполнению');
        return;
      }

      try {
        const database = getFirestore();
        const pageCommentsRef = collection(database, `pages/${this.id}/comments`);
        await addDoc(pageCommentsRef, {
          name: this.post.name,
          text: this.post.text,
          like: 0,
          dislike: 0,
          timestamp: new Date(1995, 11, 17),
        });

        console.log('Комментарий успешно добавлен');
        // Очистка формы после успешной отправки
        this.post.name = '';
        this.post.text = '';
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
      }
    },
    clearMessage() {
      this.post.text = '';
    },
  },
});
</script>