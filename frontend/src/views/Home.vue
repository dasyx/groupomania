<template>
    <div class="home">
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        <img src="../../public/logos/logo-only.svg" alt="logo groupomania" class="resize_logo" />
                        {{ societyName }}
                    </h1>
                    <h2 class="subtitle">
                        Entre nous, c'est entre vous...
                    </h2>
                    <div class="flex is-centered home_display">
                        <div class="button-block">
                            <button v-on:click="goToSignup()" class="button is-xl is-dark" >
                                Inscrivez-vous
                            </button>
                        </div>
                        <div class="button-block">
                            <button v-on:click="goToLogin()" class="button is-xl is-dark" >
                                Se connecter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "home",
    components: {},
    computed: {
        ...mapState({
            societyName: "societyName",
        }),
    },
    methods: {
        goToSignup() {
            this.$router.push("/signup");
        },
        goToLogin() {
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="scss" scoped></style>
