<template>
    <div>
        <Header />
        <div v-if="!userLogged">
            <p>Acces non authorisé</p>
        </div>
        <div v-else>
            <span>Vous êtes connecté en tant que <b>{{ userLogged.username }}</b></span>
            <form @submit.prevent="handleSubmit" class="form form_display">
                <h2 class="title is-2">Modifier mes informations</h2>
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
                            :class="{ 'is-invalid': submitted && $v.userForm.username.$error }"
                            placeholder="Veuillez saisir votre nom d'utilisateur"
                            value=""
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
                        <span v-if="!$v.userForm.username.required"><i class="fas fa-exclamation-triangle">Le champ nom est requis</i></span>
                        <span v-if="!$v.userForm.username.username"><i class="fas fa-exclamation-triangle">Veuillez renseigner un nom d'utilisateur valide !</i></span>
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
                            :class="{ 'is-invalid': submitted && $v.userForm.password.$error }"
                            placeholder="Veuillez créer votre mot de passe"
                            value=""
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-key"></i>
                        </span>
                        <span class="icon is-small is-right"> </span>
                    </div>
                    <div v-if="submitted && $v.userForm.password.$error" class="create_Password">
                        <span v-if="!$v.userForm.password.required"><i class="fas fa-exclamation-triangle">La saisie du mot de passe est obligatoire</i></span>
                        <span v-if="!$v.userForm.confirmPassword.email"><i class="fas fa-exclamation-triangle">Mot de passe invalide !</i></span>
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
                            :class="{ 'is-invalid': submitted && $v.userForm.confirmPassword.$error }"
                            placeholder="Veuillez confirmer votre mot de passe"
                            value=""
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-key"></i>
                        </span>
                        <span class="icon is-small is-right"> </span>
                    </div>
                    <div v-if="submitted && $v.userForm.confirmPassword.$error" class="confirm_Password">
                        <span v-if="!$v.userForm.confirmPassword.required"><i class="fas fa-exclamation-triangle">Veuillez saisir à nouveau votre mot de passe</i></span>
                        <span v-if="!$v.userForm.confirmPassword.email"><i class="fas fa-exclamation-triangle">Les mots de passe ne correspondent pas !</i></span>
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
                            :class="{ 'is-invalid': submitted && $v.userForm.email.$error }"
                            placeholder="Veuillez saisir votre adresse email"
                            value=""
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
                        <span v-if="!$v.userForm.email.required"><i class="fas fa-exclamation-triangle">Le champ email est requis</i></span>
                        <span v-if="!$v.userForm.email.email"><i class="fas fa-exclamation-triangle">Veuillez renseigner une adresse email valide !</i></span>
                    </div>
                </div>
                <div class="field flex is-centered">
                    <div class="control">
                        <button class="button is-link">Soumettre</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light">Annuler</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
const nameRegex = /^[^=*'<>{}0-9]{3,}$/;
const mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
import { mapState } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import Header from "@/components/Header.vue";
import store from '../modules/store.json'

export default {
    name: "UserProfile",
    components: { Header},
    props: {
        password: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    data() {
        return {
            userLogged: "",
            userForm: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                //accept:"",
            },
            submitted: false,
        };
    },
    mounted() {
            //Récupere les données de l'utilisateur connecté
            let userLoggedId = sessionStorage.getItem("user");
            const headers = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                },
            };
            axios
                .get(store.api_host + '/user/' + userLoggedId, headers)
                .then((response) => {
                    this.userLogged = response.data;
                })
                .catch((error) => console.log(error));
      },
    validations: {
        userForm: {
            username: {
                required,
                regexNameRule: function(value) {
                    return nameRegex.test(value);
                },
            },
            email: {
                required,
                regexNameRule: function(value) {
                    return mailRegex.test(value);
                },
            },
            password: {
                required,
                minLength: minLength(8),
                containsUppercase: function(value) {
                    return /[A-Z]/.test(value);
                },
                containsLowercase: function(value) {
                    return /[a-z]/.test(value);
                },
                containsNumber: function(value) {
                    return /[0-9]/.test(value);
                },
                containsSpecial: function(value) {
                    return /^[^=*<>{}]{8,}$/.test(value);
                },
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs("password"),
            },
            accept: {
                required(val) {
                    return val;
                },
            },
        },
    },
    computed: {
        ...mapState(["emailValidInput", "usernameValidInput"]),
    },
    methods: {
        handleSubmit() {
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                console.log("Une erreur est survenue, veuillez recommencer la saisie du formulaire");
            } else {
                console.log("formulaire valide");
                axios
                    .post("http://localhost:3000/user/signup/", {
                        username: this.userForm.username,
                        email: this.userForm.email,
                        password: this.userForm.password,
                        //chkvalid: this.userForm.accept,
                    })
                    .then((response) => {
                        if (response.status === 201) {
                            return response;
                        } else {
                            console.log("Erreur d'envoi de formulaire");
                        }
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
    },
};
</script>
