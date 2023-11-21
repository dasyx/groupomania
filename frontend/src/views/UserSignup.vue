<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h1 class="title is-2">Inscription</h1>

    <!-- Champ Nom d'utilisateur -->
    <div class="field">
      <label for="name" class="label">Nom</label>
      <div class="control has-icons-left">
        <input
          class="input"
          type="text"
          v-model="userForm.username"
          id="name"
          name="name"
          placeholder="Veuillez saisir votre nom d'utilisateur"
          @input="() => checkInput('username')"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="valid_input fas fa-check" v-if="usernameInputValid"></i>
          <i class="wrong_input fas fa-times" v-else></i>
        </span>
      </div>
      <!-- gestion de l'affichage d'un message d'erreur lors de la soumussions du formulaire -->
      <div class="error_msg" v-if="submitted && v$.username.$error">
        <span v-if="!userForm.username.required">
          <i class="fas fa-exclamation-triangle"
            ><em>Le champ nom est requis</em></i
          >
        </span>
        <span v-if="v$.username.minLength">
          <i class="fas fa-exclamation-triangle"
            ><em
              >Le nom d'utilisateur doit contenir au moins 3 caractères</em
            ></i
          >
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
          @input="() => checkInput('password')"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="valid_input fas fa-check" v-if="passwordInputValid"></i>
          <i class="wrong_input fas fa-times" v-else></i>
        </span>
      </div>
      <!-- gestion de l'affichage d'un message d'erreur lors de la soumussions du formulaire -->
      <div class="error_msg" v-if="submitted && v$.password.$error">
        <span v-if="!userForm.password.required"
          ><i class="fas fa-exclamation-triangle"
            >La saisie du mot de passe est obligatoire</i
          ></span
        >
        <span v-if="v$.password.minLength">
          <i class="fas fa-exclamation-triangle"
            ><em>Le mot de passe doit contenir au moins 8 caractères</em></i
          >
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
          v-on:input="emailValidInput"
          id="email"
          name="email"
          placeholder="Veuillez saisir votre adresse email"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check" id="validMail"></i>
          <i class="fas fa-times" id="wrongMail"></i>
        </span>
      </div>
      <!-- gestion de l'affichage d'un message d'erreur lors de la soumussions du formulaire -->
      <div v-if="submitted && userForm.email.$error" class="mail_Warning">
        <span v-if="!userForm.email.required"
          ><i class="fas fa-exclamation-triangle"
            >Le champ email est requis</i
          ></span
        >
        <span v-if="!userForm.email.email"
          ><i class="fas fa-exclamation-triangle"
            >Veuillez renseigner une adresse email valide !</i
          ></span
        >
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

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";

export default {
  setup() {
    const userForm = ref({
      username: "",
      email: "",
      password: "",
      //confirmPassword: "",
    });

    const submitted = ref(false);
    const usernameInputValid = ref(false);
    const passwordInputValid = ref(false);

    // Vérification de la saisie du nom d'utilisateur
    const checkUsernameInput = () => {
      usernameInputValid.value = userForm.value.username.length >= 3;
    };

    // Vérification de la saisie du mot de passe
    const checkPasswordInput = () => {
      passwordInputValid.value = userForm.value.password.length >= 8;
    };

    const checkInput = (field) => {
      if (field === "username") {
        checkUsernameInput();
      } else if (field === "password") {
        checkPasswordInput();
      }
    };

    // Vérification de la saisie de l'adresse email
    const rules = {
      username: { required, minLength: minLength(3) },
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
        //containsUppercase: helpers.regex("containsUppercase", /[A-Z]/),
        //containsLowercase: helpers.regex("containsLowercase", /[a-z]/),
        //containsNumber: helpers.regex("containsNumber", /[0-9]/),
        //containsSpecial: helpers.regex("containsSpecial", /[^.=*<>{}]/),
      },
    };

    const v$ = useVuelidate(rules, userForm);

    const handleSubmit = async () => {
      submitted.value = true;
      v$.value.$touch();

      // Afficher l'état de validation de chaque champ
      console.log("Validation State:", {
        usernameValid: !v$.value.username.$invalid,
        emailValid: !v$.value.email.$invalid,
        passwordValid: !v$.value.password.$invalid,
      });

      if (!v$.value.$invalid) {
        try {
          const response = await axios.post(
            store.api_host + "/user/signup/",
            userForm.value
          );
          if (response.status === 201) {
            console.log(response);
            //this.$router.push("/login");
          } else {
            console.log("Erreur d'envoi de formulaire");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Validation failed");
      }
    };

    return {
      userForm,
      submitted,
      handleSubmit,
      v$,
      checkInput,
      usernameInputValid,
      passwordInputValid,
    };
  },
};
</script>

<style>
/* Votre CSS ici */
.error_msg {
  color: red;
  margin-top: 5px;
}
.valid_input {
  color: green;
}
.wrong_input {
  color: red;
}
</style>
