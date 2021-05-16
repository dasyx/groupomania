<template>
    <div>
     <Header />
         <div v-if="!userLogged">
            <p>Acces non authorisé</p>
        </div>
        <div v-else>
            <span>Vous êtes connecté à groupomania en tant que <b>{{ userLogged.username }}</b></span>
        </div>   
    </div>
</template>

<script>
const axios = require("axios");
import Header from "@/components/Header.vue";

export default {
  name: "Profile",
  components: { Header },
  props: {
    password: {
      type: String
    },
    email: {
      type: String
    }
  },
  data() {
    return {
    userLogged: "",
        };
},
    methods: { 
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
};
</script>
