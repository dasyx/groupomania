<template>
    <form @submit.prevent="logValid" class="form">
        <h2 class="title is-2">Inscription</h2>
        <div class="field_login">
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
        <div class="field">
            <label for="password" class="label">Mot de passe</label>
            <div class="control has-icons-left has-icons-right">
                <input 
                class="input" 
                type="password"
                v-model="userForm.password"
                id="password_signup" 
                name="password"
                :class="{ 'is-invalid': submitted && $v.userForm.password.$error }"
                placeholder="Veuillez créer votre mot de passe" 
                value="" 
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                </span>
                <span class="icon is-small is-right">
                </span>
            </div>
            <div v-if="submitted && $v.userForm.password.$error" class="create_Password">
                <span v-if="!$v.userForm.password.required"><i class="fas fa-exclamation-triangle">La saisie du mot de passe est obligatoire</i></span>
                <span v-if="!$v.userForm.confirmPassword.password"><i class="fas fa-exclamation-triangle">Mot de passe invalide !</i></span>
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
</template>

<script>
const axios = require('axios');
const mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

import { mapState } from 'vuex'
import { required, minLength} from 'vuelidate/lib/validators';



export default {
    data() {
        return {
            userForm: {
                email: "",
                password: "",
            },
            submitted: false
        };
    },
    validations:        {
        userForm: {
            email: {
                required,
                //email,
                regexNameRule: function(value) {
                return mailRegex.test(value)
                }
            },
            password: {
                required,
                minLength: minLength(8),
                containsUppercase: function(value) {
                return /[A-Z]/.test(value)
                },
                containsLowercase: function(value) {
                return /[a-z]/.test(value)
                },
                containsNumber: function(value) {
                return /[0-9]/.test(value)
                },
                containsSpecial: function(value) {
                return /^[^=*<>{}]{8,}$/.test(value)
                }
            },
            /*accept: {
                required (val) {
                return val
                }
            }*/
        }
    },
    computed: {
        ...mapState(['emailValidInput'])
    },
    methods: {
        logValid() {
                this.submitted = true;

                if (this.$v.$invalid) {
                   console.log("Une erreur est survenue, veuillez recommencer la saisie du formulaire")
                }
                else {
                    //console.log("formulaire valide");
                    axios
                        .post("http://localhost:3000/user/login/", {
                            email: this.userForm.email,
                            password: this.userForm.password,
                            //chkvalid: this.userForm.accept,
                        })
                        .then(response => {
                            if (response.status === 200) {
                            return response;
                        }   else {
                            console.log("Erreur d'envoi de formulaire");
                            }
                        })
                        .then(response => {
                            // enregistrement des données utilisateur dans le stockage local
                            console.log(response);
                            sessionStorage.setItem("user-token", response.data.token);
                            sessionStorage.setItem("user", response.data.userId);
                            localStorage.setItem("admin", response.data.userAdmin);
                            this.$router.push('/mainboard');
                        })
                        .catch(function(error) {
                            console.log(error);
                    });
                }
            },
    },
}
</script>