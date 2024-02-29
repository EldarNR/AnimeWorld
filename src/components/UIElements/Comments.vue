<template>
    <article>
        <v-divider :thickness="3"></v-divider>
        <!-- Если есть отфильтрованные комментарии -->
        <div v-if="comments.length" class="mt-3 mb-2">
            <!-- Выводим каждый комментарий -->
            <v-card variant="outlined" :title="comment.name" v-for="comment in comments" :key="comment.id" class="mb-2">
                <v-list-item class="text-body-2">
                    <div class="text-body-2">{{ comment.text }}</div>
                    <div class="text-caption float-right">{{ comment.date }}</div>
                </v-list-item>

                <v-btn class="ma-2" variant="text" icon="mdi-thumb-up" color="blue-lighten-2"
                    @click="addLikeDislike(comment.id, true)"></v-btn>{{
                        comment.like }}

                <v-btn class="ma-2" variant="text" icon="mdi-thumb-down" color="red-lighten-2"
                    @click="addLikeDislike(comment.id, false)"></v-btn>{{ comment.dislike }}


            </v-card>
        </div>
        <!-- Если комментарии не найдены -->
        <div v-else class="text-center mt-3 mb-3">
            Комментарий нет
        </div>
    </article>
</template>
  
<script lang="ts">
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";
import { defineComponent, onMounted, ref, watch } from "vue";

interface Comment {
    id: string;
    name: string;
    text: string;
    date: string;
    like: boolean;
    dislike: boolean;
}

export default defineComponent({
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const database = getFirestore();
        const comments = ref<Comment[]>([]);
        const auth = getAuth();
        const user = auth.currentUser;

        const loadComments = async () => {
            const q = query(collection(database, `pages/${props.id}/comments`));
            const querySnapshot = await getDocs(q);
            comments.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Comment[];
        };

        const addLikeDislike = async (commentId: string, isLike: boolean) => {
            const commentRef = doc(database, `pages/${props.id}/comments/${commentId}`);
            await updateDoc(commentRef, {
                like: isLike,
                dislike: !isLike
            });
        };

        watch(() => props.id, async () => {
            await loadComments();
        }, { immediate: true });

        onMounted(() => {
            loadComments();
        });

        return {
            comments,
            addLikeDislike,
            user
        };
    }
});

</script>
