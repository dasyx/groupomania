<template>
<div class="home">
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          <img src="../../public/logos/logo-only.svg" alt="logo groupomania" class="resize_logo">
          {{ societyName }}     
        </h1>
        <h2 class="subtitle">
          Entre nous, c'est entre vous...
        </h2>
        <div class="button-block">
          <button v-on:click="displayLogin()" class="button is-xl is-dark" id="val_btn">Inscrivez-vous
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="container" id="val_frm">
  </section>
</div>
</template>

<script>
import { mapState } from "vuex"
//import LoginButton from '../components/LoginButton.vue'

export default {
  name: 'home',
  components: {
  },
  computed: {
    ...mapState({
        societyName: "societyName"
    })
  },
  methods: {
      displayLogin: function () {
      //alert('Hello');
      let valButton = document.getElementById("val_btn");
      let valForm = document.getElementById("val_frm");

      let displayForm = document.createElement("div");
      displayForm.setAttribute("class", "form");

      valForm.appendChild(displayForm);

      //valButton.addEventListener("click", function () {
      valButton.style.visibility = "hidden";
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_mixins.scss';

  .hero {    
    text-align: center;
    background-image: url('../../public/img/earth_spaceview.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .hero-body .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px; 
    @include for-tablet-portrait-up;
  }
  .form {
    width: 300px;
    height: 200px;
    background-color: red;
  }
 .resize_logo {
    width: .9em;
  }
  .container h2 {
    font-size: 1.2em;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
    .button {
      padding-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>