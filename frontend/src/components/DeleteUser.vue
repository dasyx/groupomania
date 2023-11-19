<template>
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
</template>

<script>
import ConfirmDialogue from "./Modal_Button/ConfirmDialogue.vue";
import MainHeader from "./MainHeader.vue";

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
    async deleteUserProfile() {
      // ... (Le contenu de votre méthode ici)
    },
  },
};
</script>
