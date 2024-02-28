<template>
    <article>
        <v-divider :thickness="3"></v-divider>
        <!-- Если есть отфильтрованные комментарии -->
        <div v-if="getComment" class="mt-3 mb-2">
            <!-- Выводим каждый комментарий -->
            <v-card :text="item.comment.user" variant="outlined" v-for="item in getComment" :key="item.id" class="mb-2">
                <v-list-item class="text-body-2">{{ item.comment.text }}</v-list-item>
            </v-card>
        </div>
        <!-- Если комментарии не найдены -->
        <div v-else class="text-center mt-3 mb-3">
            Комментарий не найден
        </div>
    </article>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({

    props: {
        id: {
            type: Number,
            required: true,
        },
    },

    setup(props) {
        const idPage = props.id;
        const store = useStore();

        const getComment = computed(() => store.getters.getComments);
        

        return { getComment };
    }
})

</script>
