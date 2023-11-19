<template>
<<<<<<< HEAD
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <img
              src="../../public/logos/logo-only.svg"
              alt="logo groupomania"
              class="resize_logo"
            />
            {{ societyName }}
          </h1>
          <h2 class="subtitle">Entre nous, c'est entre vous...</h2>
          <div class="flex is-centered home_display">
            <div class="button-block">
              <button v-on:click="goToSignup()" class="button is-xl is-dark">
                Inscrivez-vous
              </button>
            </div>
            <div class="button-block">
              <button v-on:click="goToLogin()" class="button is-xl is-dark">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
=======
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
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
</template>

<script>
import { mapState } from "vuex";

export default {
<<<<<<< HEAD
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
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
=======
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
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
};
</script>

<style lang="scss" scoped></style>
