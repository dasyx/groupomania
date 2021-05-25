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
        <NewPostItems
          v-for="message in messageContent"
          v-bind:key="message.id"
          v-bind:username="message.User.username"
          v-bind:title="message.title"
          v-bind:content="message.content"
          v-bind:image="message.imgFile"
          v-bind:postId="message.id"
        />   
      </div>
</template>

<script>
const axios = require("axios");
import Header from "@/components/Header.vue";
import NewPost from "@/components/NewPost.vue";
import NewPostItems from "@/components/NewPostItems.vue";

export default {
    name: "Mainboard",
    title: "Groupomania - Espace Utilisateur",
    components: {
        Header,
        NewPostItems,
        NewPost
    },
    data() {
      return {
        userLogged: "",
        userInfos: {},
        messageContent: [],
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
          .get("http://localhost:3000/user/" + userLoggedId, headers)
          .then(response => {
            this.userLogged = response.data;
          })
          .catch(error => console.log(error));
      }
}
</script>
