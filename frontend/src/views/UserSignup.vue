<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h1 class="title is-2">Inscription</h1>
    <div class="field">
      <label for="name" class="label">Nom</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          v-model="userForm.username"
          v-on:input="usernameValidInput"
          id="name"
          name="name"
          placeholder="Veuillez saisir votre nom d'utilisateur"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check" id="validName"></i>
          <i class="fas fa-times" id="wrongName"></i>
        </span>
      </div>
      <div v-if="submitted && $v.userForm.username.$error">
        <span v-if="!$v.userForm.username.required"
          ><i class="fas fa-exclamation-triangle"
            >Le champ nom est requis</i
          ></span
        >
        <span v-if="!$v.userForm.username.username"
          ><i class="fas fa-exclamation-triangle"
            >Veuillez renseigner un nom d'utilisateur valide !</i
          ></span
        >
      </div>
    </div>
    <div class="field">
      <label for="password" class="label">Mot de passe</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          v-model="userForm.password"
          aria-label="password"
          name="password"
          :class="{ 'is-invalid': submitted && $v.userForm.username.$error }"
          placeholder="Veuillez créer votre mot de passe"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
        <span class="icon is-small is-right"> </span>
      </div>
      <div
        v-if="submitted && $v.userForm.password.$error"
        class="create_Password"
      >
        <span v-if="!$v.userForm.password.required"
          ><i class="fas fa-exclamation-triangle"
            >La saisie du mot de passe est obligatoire</i
          ></span
        >
        <span v-if="!$v.userForm.confirmPassword.email"
          ><i class="fas fa-exclamation-triangle"
            >Mot de passe invalide !</i
          ></span
        >
      </div>
    </div>
    <div class="field">
      <label for="password" class="label">Confirmation du mot de passe</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          v-model="userForm.confirmPassword"
          aria-label="password"
          name="password"
          :class="{ 'is-invalid': submitted && $v.userForm.password.$error }"
          placeholder="Veuillez confirmer votre mot de passe"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
        <span class="icon is-small is-right"> </span>
      </div>
      <div
        v-if="submitted && $v.userForm.confirmPassword.$error"
        class="confirm_Password"
      >
        <span v-if="!$v.userForm.confirmPassword.required"
          ><i class="fas fa-exclamation-triangle"
            >Veuillez saisir à nouveau votre mot de passe</i
          ></span
        >
        <span v-if="!$v.userForm.confirmPassword.email"
          ><i class="fas fa-exclamation-triangle"
            >Les mots de passe ne correspondent pas !</i
          ></span
        >
      </div>
    </div>
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
          :class="{
            'is-invalid': submitted && $v.userForm.confirmPassword.$error,
          }"
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
      <div v-if="submitted && $v.userForm.email.$error" class="mail_Warning">
        <span v-if="!$v.userForm.email.required"
          ><i class="fas fa-exclamation-triangle"
            >Le champ email est requis</i
          ></span
        >
        <span v-if="!$v.userForm.email.email"
          ><i class="fas fa-exclamation-triangle"
            >Veuillez renseigner une adresse email valide !</i
          ></span
        >
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="checkbox check_conditions">
          <input
            type="checkbox"
            v-model="userForm.accept"
            @change="$v.userForm.accept.$touch()"
            id="accept"
            class="form-check"
          />
          <span>
            J'accepte <a href="#">les termes et conditions d'utilisation</a>
          </span>
        </label>
      </div>
    </div>
    <div class="field flex is-centered">
      <div class="control">
        <button class="button is-link">Soumettre</button>
      </div>
      <div class="control">
        <button class="button high_contrast">
          <a href="http://localhost:8080/groupomania/"> Annuler</a>
        </button>
      </div>
    </div>
    <div class="already-signed">
      <p>
        Déjà inscrit ?
        <router-link :to="{ name: 'login' }">Se connecter</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  helpers,
  sameAs,
} from "@vuelidate/validators";
import axios from "axios";
import store from "../modules/store.json";

export default {
  setup() {
    // Utilisation de reactive pour créer un état réactif
    const state = reactive({
      userForm: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
    });

    // Définition des règles de validation
    const rules = {
      username: {
        required,
        minLength: minLength(3),
        regexNameRule: helpers.regex(/^[^=*'<>{}0-9]{3,}$/),
      },
      email: {
        required,
        email,
        regexMailRule: helpers.regex(
          /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
        ),
      },
      password: {
        required,
        minLength: minLength(8),
        containsUppercase: helpers.regex(/[A-Z]/),
        containsLowercase: helpers.regex(/[a-z]/),
        containsNumber: helpers.regex(/[0-9]/),
        containsSpecial: helpers.regex(/[^=*<>{}0-9]{8,}/),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(() => state.userForm.password),
      },
    };

    // Initialisation de Vuelidate
    const v$ = useVuelidate(rules, state.userForm);

    // Méthode de soumission du formulaire
    const handleSubmit = () => {
      state.submitted = true;
      v$.value.$touch();

      if (!v$.value.$invalid) {
        axios
          .post(store.api_host + "/user/signup/", state.userForm)
          .then((response) => {
            if (response.status === 201) {
              console.log("Inscription réussie", response);
              // Redirection après inscription réussie
              // À adapter selon votre routeur
              this.$router.push("/login");
            }
          })
          .catch((error) => {
            console.log("Erreur lors de l'inscription", error);
          });
      } else {
        console.log("Des erreurs sont présentes dans le formulaire");
      }
    };

    // Exposition des propriétés et méthodes au template
    return { ...toRefs(state), v$, handleSubmit };
  },
};
</script>
