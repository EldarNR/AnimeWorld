<template>
    <v-container class="my-auto conten d-flex align-center" align="center">
        <v-card class="mx-auto px-6 py-8" max-width="344">

            <v-alert v-if="getAlert" density="compact" type="warning" title="Ошибка!" :text="getAlertMessage"></v-alert>
            <div class="tab-container">
                <button class="tab tab--1 " @click="switchs = true">Войти</button>
                <button class="tab tab--2" @click="switchs = false">Регистрация</button>
                <div class="indicator" :style="{ left: switchs ? '2px' : 'calc(50% - 2px)' }"></div>
            </div>

            <login v-if="switchs" />
            <register v-else />
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Login from '../components/UIElements/Login.vue';
import Register from "../components/UIElements/Register.vue"
export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            switchs: true,
        };
    },
    components: { Login, Register },
    setup() {
        const s = useStore();
        const getAlert = computed(() => s.getters.getLoginAlert);
        const getAlertMessage = computed(() => s.getters.getMessageAlert);

        return { getAlert, getAlertMessage }

    }
});
</script>

<style>
.conten {
    height: 87dvh;
}

.tab-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    padding: 2px;
    background-color: #ebebec;
    border-radius: 9px;
    margin: 10px 20px 0px 20px;
}

.indicator {
    content: "";
    width: 50%;
    height: 28px;
    background: #FFFFFF;
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 9;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    border-radius: 7px;
    transition: all 0.2s ease-out;
}


.tab {
    width: 50%;
    height: 28px;
    position: relative;
    z-index: 99;
    background-color: transparent;
    border: 0;
    outline: none;
    flex: none;
    align-self: stretch;
    flex-grow: 1;
    cursor: pointer;
    font-weight: 500;
}

.tab--1:hover~.indicator {
    left: 2px;
}

.tab--2:hover~.indicator {
    left: calc(50% - 2px);
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form button {
    align-self: flex-end;
}

.flex-column>label {
    color: #151717;
    font-weight: 600;
}

.inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
}

.input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
}

.input:focus {
    outline: none;
}

.inputForm:focus-within {
    border: 1.5px solid #2d79f3;
}

.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
}

.flex-row>div>label {
    font-size: 14px;
    color: black;
    font-weight: 400;
}

.span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
}

.button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
}

.p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
}

.btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
}

.btn:hover {
    border: 1px solid #2d79f3;
    ;
}
</style>