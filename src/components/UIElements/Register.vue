<template>
    <form class="form mt-3">
        <span class="text-h3 ">Register</span>
        <div class="flex-column">
            <label>Your Name</label>
        </div>
        <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
                <title>account</title>
                <path
                    d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
            <input placeholder="Create your Name" autocomplete="name" v-model="name" class="input" type="text">
        </div>
        <div class="flex-column">
            <label>Email </label>
        </div>
        <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                <g data-name="Layer 3" id="Layer_3">
                    <path
                        d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z">
                    </path>
                </g>
            </svg>
            <input placeholder="Create your Email" autocomplete="email" v-model="email" class="input" type="text">
        </div>

        <div class="flex-column">
            <label>Password </label>
        </div>
        <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                <path
                    d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0">
                </path>
                <path
                    d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
                </path>
            </svg>
            <input current-password autocomplete="password" v-model="password" placeholder="Create your Password"
                class="input" type="password">
        </div>
        <v-alert v-if="error.alert" density="compact" type="warning" title="Ошибка!" :text="error.message"></v-alert>
        <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                <path
                    d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0">
                </path>
                <path
                    d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
                </path>
            </svg>
            <input current-password autocomplete="password" v-model="repeatPassword" placeholder="Repeat your password"
                class="input" type="password">
        </div>


        <span class="text-caption text-left">
            - Пароль должен быть не менее 5 - букв, <br>
            - Пароль должен быть не должно быть символов
        </span>


        <v-btn class="button-submit" @click="register">Sign In</v-btn>

    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { base } from "../../main";
import { store } from "../../state";
import { FirebaseError } from "firebase/app";
// Завтра:Сделать профиль  
export default defineComponent({
    data() {
        return {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            error: {
                alert: false,
                message: "",
            },
        };
    },
    methods: {
        async register() {
            const auth = getAuth(base);

            if (this.email === '' || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(this.email)) {
                store.commit('showAlert', { boolean: true, message: "Email is not correct!" });
                return;
            }

            if (this.password !== this.repeatPassword) {
                store.commit('showAlert', { boolean: true, message: "Passwords don't match!" });
                return;
            }

            if (this.password.length < 5) {
                store.commit('showAlert', { boolean: true, message: "Password must be at least 5 characters long" });
                return;
            }

            if (!/^[a-zA-Z0-9]+$/.test(this.password)) {
                store.commit('showAlert', { boolean: true, message: "Password must not contain special characters" });
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, this.email.toLowerCase(), this.password.toLowerCase())
                    .then((userCredential) => {
                        const user = userCredential.user;
                        this.$router.push({ name: "Home" });
                    });
            } catch (error: any) {
                const errorCode = (error as FirebaseError).code;
                let errorMessage = "";
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        errorMessage = "Email is already in use";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email format";
                        break;
                    case "auth/weak-password":
                        errorMessage = "Password is too weak";
                        break;
                    default:
                        errorMessage = "Registration failed. Please try again later";
                }
                store.commit('showAlert', { boolean: true, message: errorMessage });
                console.error("Error:", error.message);
            }
        },
        goToSignUp() {
            this.$router.push({ name: 'SignUp' });
        }
    }
})
</script>

