<template>
      <div>
        <Header />
        <div class="welcome_msg">
            <div v-if="!userLogged">
                <p>Utilisateur non authorisé</p>
            </div>
            <div v-else>
                <span>Bonjour <b>{{ userLogged.username }}</b> !</span>
            </div>
        </div> 
        <NewPost />
        <!-- Affichage de tous les derniers posts -->
      </div>
</template>

<script>
const axios = require("axios");
import store from '../modules/store.json'
import Header from "@/components/Header.vue";
import NewPost from "@/components/NewPost.vue";


export default {
    name: "Mainboard",
    title: "Groupomania - Espace Utilisateur",
    components: {
        Header,
        NewPost,
    },
    data() {
      return {
        userLogged: "",
      };
    },
    mounted() {
      //Récupere les données de l'utilisateur connecté
        let userLoggedId = sessionStorage.getItem("user");
        const headers = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("user-token")
          }
        };
        axios
          .get(store.api_host + '/user/' + userLoggedId, headers)
          .then(response => {
            this.userLogged = response.data;
          })
          .catch(error => console.log(error));
    }
}
</script>
