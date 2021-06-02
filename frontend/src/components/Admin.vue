<template>
    <div>
        <Header />
        <!-- Message d'acces non authorisé -->
        <div v-if="usersList.length < 1" class="unauthorizedMessage">
            <p>Acces non authorisé</p>
        </div>

        <!-- page admin -->
        <div class="adminPage" v-if="usersList.length > 1">
            <section class="users-list">
                <!-- Utilisateurs -->
                <h1 class="users-list_heading">Liste des utilisateurs</h1>
                <ul>
                    <!-- liste des utilisateurs-->
                    <li v-for="users in usersList" :key="users.id" class="users-list_items">
                        <p class="users-list_name">{{ users.username }}</p>
                        <!-- Lien derniers posts utilisateurs-->
                        <a href="#/admin" @click="getUserPosts(users.id)"> <i class="fas fa-sticky-note"></i>Posts </a>
                        <!-- Lien suppression utilisateur-->
                        <button href="#/admin" @click="userDelete(users.id)" class="users-list_delete-link">Supprimer l'utilisateur
                        </button>
                    </li>
                    <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
import store from "../modules/store.json";
import ConfirmDialogue from "../components/ConfirmDialogue.vue";
import Header from "../components/Header.vue";

export default {
    name: "Admin",
    components: {
        Header,
        ConfirmDialogue,
    },
    data() {
        return {
            usersList: [],
            userContent: [],
        };
    },
    methods: {
        //récupere la liste des utilisateurs
        getUsersList() {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                },
            };
            axios
                .get(store.api_host + "/user/", options)
                .then((response) => {
                    this.usersList = response.data;
                })
                .catch((error) => console.log(error));
        },
        //Fonction pour supprimer un post
        async userDelete(element) {
            const ok = await this.$refs.confirmDialogue.show({
                title: "Suppression d'un utilisateur",
                message: "Voulez-vous vraiment supprimer cet utilisateur ?  Vous ne pourrez pas revenir en arrière !",
                okButton: "Supprimer définitivement",
            });
            if (ok) {
                axios({
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                    },
                    method: "delete",
                    url: store.api_host + "/user/delete/" + element
                })
                    .then(() => {
                        this.$router.go();
                    })
                    .catch((error) => console.log(error));
            }
        },
    },
    mounted() {
        this.getUsersList();
    },
};
</script>
