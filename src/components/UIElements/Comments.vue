<template>
    <article>
        <v-divider :thickness="3"></v-divider>
        <!-- Если есть отфильтрованные комментарии -->
        <v-alert v-if="alert" density="compact" text="Вы не авторизовались! Для оценки необходимо авторизоваться!"
            title="Ошибка!" type="warning"></v-alert>
        <div v-if="comments.length" class="mt-3 mb-2">
            <!-- Выводим каждый комментарий -->
            <v-card variant="outlined" :title="comment.name" v-for="comment in comments" :key="comment.id" class="mb-2">
                <v-list-item class="text-body-2">
                    <div class="text-body-2">{{ comment.text }}</div>
                    <div class="text-caption float-right">{{ comment.date }}</div>
                </v-list-item>
                <span justify="center">
                    <v-btn class="ma-2" variant="text" icon="mdi-heart" color="red" @click="addLike(comment)"></v-btn>
                    {{
            comment.likes.length }}
                </span>
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
    likes: any;
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
        const alert = ref(false)
        // Функция для загрузки комментариев
        const loadComments = async () => {
            const q = collection(database, `pages/${props.id}/comments`);

            const querySnapshot = await getDocs(q);
            comments.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                likes: [] // Инициализируем массив для хранения лайков
            })) as unknown as Comment[];
        };


        // Функция для загрузки лайков для каждого комментария
        const loadLikes = async () => {
            try {
                await Promise.all(comments.value.map(async comment => {
                    const likeCollection = collection(database, `pages/${props.id}/comments/${comment.id}/likes`);
                    const querySnapshot = await getDocs(likeCollection);
                    comment.likes = querySnapshot.docs.map(doc => doc.data());
                }));
            } catch (error) {
                console.error('Error loading likes:', error);
            }
        };

        const addLike = async (clickedComment: Comment) => {
            try {
                const likeCollection = collection(database, `pages/${props.id}/comments/${clickedComment.id}/likes`);

                // Проверяем, есть ли уже лайк от данного пользователя
                const querySnapshot = await getDocs(likeCollection);
                const likes = querySnapshot.docs.map(doc => doc.data().userUid);

                if (!likes.includes(user?.uid)) {
                    // Если нет, то добавляем новый лайк
                    await addDoc(likeCollection, {
                        userUid: user?.uid,
                        like: true
                    });


                    // После добавления лайка обновляем данные только для кликнутого комментария
                    const updatedCommentLikes = likes.concat(user?.uid);
                    clickedComment.likes = updatedCommentLikes;

                }
            } catch (error) {
                alert.value = true;
                setTimeout(() => { alert.value = false }, 3000);
                console.error("Ошибка при добавлении лайка:", error);
            }
        }

        watch(() => props.id, async () => {
            await loadComments();
        }, { immediate: true });

        // Загрузка комментариев и лайков при монтировании компонента
        onMounted(async () => {
            await loadComments();
            await loadLikes();
        });

        return {
            comments,
            addLike,
            user,
            alert
        };
    }
});

</script>
