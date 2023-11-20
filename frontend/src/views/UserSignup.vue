<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h1 class="title is-2">Inscription</h1>

    <!-- Champ Nom d'utilisateur -->
    <div class="field">
      <label for="name" class="label">Nom</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          v-model="userForm.username"
          id="name"
          name="name"
          placeholder="Veuillez saisir votre nom d'utilisateur"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <!-- Champ Mot de passe -->
    <div class="field">
      <label for="password" class="label">Mot de passe</label>
      <div class="control has-icons-left">
        <input
          class="input"
          type="password"
          v-model="userForm.password"
          id="password"
          name="password"
          placeholder="Veuillez créer votre mot de passe"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <!-- Champ Email -->
    <div class="field">
      <label for="email" class="label">Adresse électronique</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="email"
          v-model="userForm.email"
          id="email"
          name="email"
          placeholder="Veuillez saisir votre adresse email"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>

    <!-- Boutons Soumettre et Annuler -->
    <div class="field flex is-centered">
      <div class="control">
        <button class="button is-link">Soumettre</button>
      </div>
      <div class="control">
        <button class="button high_contrast">
          <a href="http://localhost:8080/groupomania/">Annuler</a>
        </button>
      </div>
    </div>

    <!-- Lien vers la connexion -->
    <div class="already-signed">
      <p>
        Déjà inscrit ?
        <router-link :to="{ name: 'login' }">Se connecter</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import store from "../modules/store.json";

export default {
  setup() {
    const userForm = ref({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const submitted = ref(false);

    const handleSubmit = async () => {
      submitted.value = true;

      // Validation basique
      if (
        !userForm.value.username ||
        !userForm.value.email ||
        !userForm.value.password
      ) {
        console.log(
          "Une erreur est survenue, veuillez recommencer la saisie du formulaire"
        );
        return;
      }

      try {
        const response = await axios.post(store.api_host + "/user/signup/", {
          username: userForm.value.username,
          email: userForm.value.email,
          password: userForm.value.password,
        });

        if (response.status === 201) {
          console.log(response);
          this.$router.push("/login");
        } else {
          console.log("Erreur d'envoi de formulaire");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      userForm,
      submitted,
      handleSubmit,
    };
  },
};
</script>

<style>
/* Votre CSS ici */
</style>
