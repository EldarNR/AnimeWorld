<template>
    <article>
        <div v-if="getComment">
            <v-card text="..." variant="outlined">
                {{ getComment }}
                <v-card-actions>
                    <v-btn>Click me</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div v-else>
            Комментарий не найден
        </div>
    </article>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
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
        const getComment = computed(() => store.getters.getComments.find(comment => comment.id === idPage));

        console.log(idPage)
        return { getComment };
    }
})
</script>
