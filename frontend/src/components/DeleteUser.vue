<template>
    <form class="user-profile_form">
        <div class="user-profile_form-field">
          <label for="mail" class="user-profile_label">Mail</label>
          <input
            id="mail"
            class="user-profile_input"
            type="email"
            v-model.lazy="email"
            placeholder="user@groupomania.com"
          />
        </div>
        <div class="user-profile_form-field">
          <label for="password" class="user-profile_label">Pass</label>
          <input
            id="password"
            class="user-profile_input"
            type="password"
            v-model.lazy="password"
            placeholder="password"
          />
        </div>
        <button
          class="user-profile_delete"
          @click="deleteUserProfile"
        >Confirmation de suppression</button>
        <p id="alert">{{msgError}}</p>
      </form>
</template>

<script>
const axios = require("axios");

export default {
    name: "DeleteUser",
    data() {
        return {
            password: "",
            email: "",
            userLogged:"",
            msgError: ""
        };
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
          url: "http://localhost:3000/user/delete/",
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
