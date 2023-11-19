<template>
<<<<<<< HEAD
  <div>
    <MainHeader />
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
      <button class="delete-btn" @click="deleteUserProfile">
        Confirmation de suppression
      </button>
      <p id="delete_alert">{{ msgError }}</p>
      <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
    </form>
    <!-- Retour vers mainboard  -->
    <button class="button is-link">
      <a href="http://localhost:8080/groupomania/#/mainboard">
        <i class="far fa-arrow-alt-circle-left backlink_icon"
          >Page précédente</i
        >
      </a>
    </button>
  </div>
=======
    <div>
        <Header />
        <div v-if="!userLogged">
            <p>Acces non authorisé</p>
        </div>
        <form v-else class="form form_display">
            <h2 class="title is-2">Supprimer mon compte</h2>
            <div class="field">
                <label for="mail" class="label">Adresse email</label>
                <input id="mail" class="input" type="email" v-model="email" placeholder="Entrez l'adresse email de votre compte" />
            </div>
            <div class="field">
                <label for="password" class="label">Mot de passe</label>
                <input id="password" class="input" type="password" v-model="password" placeholder="Mot de passe actuel" />
            </div>
            <button class="delete-btn" @click="deleteUserProfile">Confirmation de suppression</button>
            <p id="delete_alert">{{ msgError }}</p>
            <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
        </form>
          <!-- Retour vers mainboard  -->
        <button class="button is-link">
            <a href="http://localhost:8080/groupomania/#/mainboard">
                <i class="far fa-arrow-alt-circle-left backlink_icon">Page précédente</i>
            </a>
        </button>
    </div>
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
</template>

<script>
import store from "../modules/store.json";
import ConfirmDialogue from "./Modal_Button/ConfirmDialogue.vue";
<<<<<<< HEAD
import MainHeader from "./MainHeader.vue";
const axios = require("axios");

export default {
  components: {
    MainHeader,
    ConfirmDialogue,
  },
  name: "DeleteUser",
  data() {
    return {
      password: "",
      email: "",
      userLogged: "",
      msgError: "",
    };
  },
  mounted() {
    //récupère informations pour personnalisation header
    if (sessionStorage.user) {
      this.userLogged = sessionStorage.user;
    }
    if (localStorage.role) {
      this.userAdmin = localStorage.role;
    }
  },
  watch: {
    isUserLogged() {
      this.userLogged = sessionStorage.user;
    },
  },
  methods: {
    //Fonction de suppression du compte utilisateur
    async deleteUserProfile() {
      let mailRegex = /.+@.+\..+/;
      this.msgError = "";
      let error;

      //Vérification des inputs utilisateur
      if (!this.password) {
        error = "Mot de passe requis !";
      }
      if (!mailRegex.test(this.email)) {
        error = "Adresse email invalide ou requise !";
      }
      if (error) {
        this.msgError = error;
      } else {
        //si validation ok, requete
        //Fonction pour supprimer un post
        const ok = await this.$refs.confirmDialogue.show({
          title: "Suppression de votre compte",
          message:
            "Voulez-vous vraiment supprimer votre compte utilisateur ?  Vous ne pourrez pas revenir en arrière !",
          okButton: "Supprimer définitivement",
        });
        if (ok) {
          axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("user-token"),
            },
            method: "delete",
            url: store.api_host + "/user/delete/",
            data: {
              email: this.email,
              password: this.password,
            },
          })
            .then((response) => {
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
              this.$router.push("/");
            })
            .catch((error) => {
              this.msgError = error.response.data.error;
            });
        }
      }
    },
  },
=======
import Header from "./Header.vue";
const axios = require("axios");

export default {
    components: {
        Header,
        ConfirmDialogue,
    },
    name: "DeleteUser",
    data() {
        return {
            password: "",
            email: "",
            userLogged: "",
            msgError: "",
        };
    },
    mounted() {
        //récupère informations pour personnalisation header
        if (sessionStorage.user) {
            this.userLogged = sessionStorage.user;
        }
        if (localStorage.role) {
            this.userAdmin = localStorage.role;
        }
    },
    watch: {
        isUserLogged() {
            this.userLogged = sessionStorage.user;
        },
    },
    methods: {
        //Fonction de suppression du compte utilisateur
        async deleteUserProfile() {
            let mailRegex = /.+@.+\..+/;
            this.msgError = "";
            let error;

            //Vérification des inputs utilisateur
            if (!this.password) {
                error = "Mot de passe requis !";
            }
            if (!mailRegex.test(this.email)) {
                error = "Adresse email invalide ou requise !";
            }
            if (error) {
                this.msgError = error;
            } else {
                //si validation ok, requete
                //Fonction pour supprimer un post
                const ok = await this.$refs.confirmDialogue.show({
                    title: "Suppression de votre compte",
                    message: "Voulez-vous vraiment supprimer votre compte utilisateur ?  Vous ne pourrez pas revenir en arrière !",
                    okButton: "Supprimer définitivement",
                });
                if (ok) {
                    axios({
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                        },
                        method: "delete",
                        url: store.api_host + "/user/delete/",
                        data: {
                            email: this.email,
                            password: this.password,
                        },
                    })
                        .then((response) => {
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
                            this.$router.push("/");
                        })
                        .catch((error) => {
                            this.msgError = error.response.data.error;
                        });
                }
            }
        },
    },
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
};
</script>
