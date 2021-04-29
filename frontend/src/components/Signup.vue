<template>
    <form @submit.prevent="handleSubmit" class="form">
        <h2 class="title is-2">Inscription</h2>

        <div class="field">
            <label class="label">Nom</label>
            <div class="control has-icons-left has-icons-right">
                <input 
                class="input"
                type="text"
                v-model="userForm.name"
                id="name"
                name="name"
                :class="{ 'is-invalid': isSubmitted && $v.userForm.name.$error }"
                placeholder="Veuillez saisir votre nom d'utilisateur" 
                value=""
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                </span>
            </div>
            <div v-if="isSubmitted && $v.userForm.name.$error">
                <span v-if="!$v.userForm.name.required"><i class="fas fa-exclamation-triangle">Le champ nom est requis</i></span>
                <span v-if="!$v.userForm.name.name"><i class="fas fa-exclamation-triangle">Veuillez renseigner un nom d'utilisateur valide !</i></span>
            </div>
        </div>

        <div class="field">
            <label class="label">Adresse électronique</label>
            <div class="control has-icons-left has-icons-right">
                <input 
                class="input" 
                type="email" 
                v-model="userForm.email"
                id="email"
                name="email"
                :class="{ 'is-invalid': isSubmitted && $v.userForm.email.$error }"
                placeholder="Veuillez saisir votre adresse email" 
                value="" 
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                </span>
            </div>
            <div v-if="isSubmitted && $v.userForm.email.$error" class="mail_Warning">
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
                    name: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    password: "",
                    confirmPassword: "",
                    accept: ""
                },
                isSubmitted: false
            };
        },
        validations: {
            userForm: {
                name: {
                    required
                },
                email: {
                    required,
                    email
                },
                mobile: {
                    required
                },
                gender: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(5)
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
                this.isSubmitted = true;

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