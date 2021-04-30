<template>
    <form @submit.prevent="handleSubmit" class="form">
        <h2 class="title is-2">Inscription</h2>
        <div class="field">
            <label for="name" class="label">Nom</label>
            <div class="control has-icons-left has-icons-right">
                <input 
                class="input"
                type="text"
                v-model="userForm.username"
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
                    <i class="fas fa-check"></i>
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
                id="password"
                name="password"
                :class="{ 'is-invalid': submitted && $v.userForm.password.$error }"
                placeholder="Veuillez créer votre mot de passe" 
                value="" 
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
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
                id="confirmPassword"
                name="confirmPassword"
                :class="{ 'is-invalid': submitted && $v.userForm.confirmPassword.$error }"
                placeholder="Veuillez confirmer votre mot de passe" 
                value="" 
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
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
                    <i class="fas fa-check"></i>
                </span>
            </div>
            <div v-if="submitted && $v.userForm.email.$error" class="mail_Warning">
                <span v-if="!$v.userForm.email.required"><i class="fas fa-exclamation-triangle">Le champ email est requis</i></span>
                <span v-if="!$v.userForm.email.email"><i class="fas fa-exclamation-triangle">Veuillez renseigner une adresse email valide !</i></span>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" />
                    J'accepte <a href="#">les termes et conditions d'utilisation</a>
                </label>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="radio">
                    <input type="radio" name="question" />
                    Oui
                </label>
                <label class="radio">
                    <input type="radio" name="question" />
                    Non
                </label>
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
import {
        required,
        email,
        minLength,
        sameAs
    } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                userForm: {
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    accept: ""
                },
                submitted: false
            };
        },
        validations: {
            userForm: {
                username: {
                    required,
                    regexNameRule: function(value) {
                        return /^[a-zA-Z]+[a-zA-Z éè-]+[a-zA-Z]$/.test(value)
                    }
                },
                email: {
                    required,
                    email
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
                        return /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                    }
                },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs('password')
                },
                accept: {
                    required (val) {
                      return val
                    }
                }
            }
        },
        methods: {
            handleSubmit() {
                this.submitted = true;

                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                alert("SUCCESS!" + JSON.stringify(this.userForm));
            }
        }
    };
</script>

<style lang="scss" scoped>
    
</style>