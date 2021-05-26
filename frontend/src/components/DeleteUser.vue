<template>
  <div>
    <Header />
    <div v-if="!userLogged">
            <p>Acces non authorisé</p>
    </div>
    <form v-else class="form form_display">
      <h2 class="title is-2">Supprimer mon compte</h2>
        <div class="field">
          <label for="mail" class="label">Adresse email</label>
          <input
            id="mail"
            class="input"
            type="email"
            v-model="email"
            placeholder="Entrez l'adresse email de votre compte"
          />
        </div>
        <div class="field">
          <label for="password" class="label">Mot de passe</label>
          <input
            id="password"
            class="input"
            type="password"
            v-model="password"
            placeholder="Mot de passe actuel"
          />
        </div>
        <button
          class="user-profile_delete"
          @click="deleteUserProfile"
        >Confirmation de suppression</button>
        <p id="delete_alert">{{msgError}}</p>
    </form>
  </div>
</template>

<script>
import store from '../modules/store.json'
import Header from './Header.vue';
const axios = require("axios");

export default {
  components: { Header },
    name: "DeleteUser",
    data() {
        return {
            password: "",
            email: "",
            userLogged:"",
            msgError: ""
        };
    },
    mounted() {
    //récupère informations pour personnalisation header
    if (sessionStorage.user) {
      this.userLogged = sessionStorage.user;
    }
    if(localStorage.role) {
      this.userAdmin = localStorage.role;
    }
  },
  watch: {
    isUserLogged() {
      this.userLogged = sessionStorage.user;
    }
  },
    methods: {
    //suppression du compte utilisateur
    deleteUserProfile() {
      let mailRegex = /.+@.+\..+/;
      this.msgError = "";
      let error;

      //vérification des champs
      if (!this.email) {
        error = "Mail requis";
      }
      if (!this.password) {
        error = "Mot de passe requis";
      }
      if (!mailRegex.test(this.email)) {
        error = "Mail invalide";
      }
      if (error) {
        this.msgError = error;
      } else {
        //si validation ok, requete
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("user-token")
          },
          method: "delete",
          url: store.api_host + '/user/delete/',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(response => {
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .then(() => {
            //suppression des données stockées
            sessionStorage.clear("user");
            sessionStorage.clear("user-token");
            this.userLogged = "";
            this.$router.push('/');
          })
          .catch(error => {
            this.msgError = error.response.data.error;
          });
      }
    }
  },
}
</script>
