<template>
    <div>
        <Header />
        <!-- Affichage du message d'acceuil personnalisé -->
        <div class="welcome_msg">
            <div v-if="!userLogged">
                <p>Utilisateur non authorisé</p>
            </div>
            <div v-else>
                <span
                    >Bonjour <b>{{ userLogged.username }}</b> !</span
                >
            </div>
        </div>
        <!-- Affichage du formulaire pour la création d'une publication -->
        <NewPost />
        <!-- Affichage de toutes les dernières publications -->
        <AllPosts
            v-for="message in messageContent"
            v-bind:key="message.id"
            v-bind:username="message.User.username"
            v-bind:title="message.title"
            v-bind:content="message.content"
            v-bind:image="message.imgFile"
            v-bind:postId="message.id"
            v-bind:comments="message.Comments"
        />
    </div>
</template>

<script>
const axios = require("axios");
import store from "../modules/store.json";
import { mapState } from "vuex";
import Header from "@/components/Header.vue";
import NewPost from "@/components/NewPost.vue";
import AllPosts from "@/components/AllPosts";
export default {
    name: "Mainboard",
    title: "Groupomania - Espace Utilisateur",
    components: {
        Header,
        NewPost,
        AllPosts,
    },
    data() {
        return {
            userLogged: "",
            messageContent: [],
            comments: [],
            imgFile: "",
        };
    },
    methods: {
        //Récupere les données de l'utilisateur connecté
        async displayUserLogged() {
            let userLoggedId = sessionStorage.getItem("user");
            const headers = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                },
            };
            axios
                .get(store.api_host + "/user/" + userLoggedId, headers)
                .then((response) => {
                    this.userLogged = response.data;
                })
                .catch((error) => console.log(error));
        },
    },
    computed: {
        ...mapState(["dashboardLoading"]),
    },
    mounted() {
        this.dashboardLoading();
        this.displayUserLogged();
    },
};
</script>