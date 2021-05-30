<template>
  <header class="navbar" role="navigation" aria-label="main navigation">
    <!-- affichage du logo -->
    <div class="navbar-brand">
      <router-link to="/mainboard">
        <img src="../../public/logos/icon-left-font-monochrome-white.svg" alt="groupomania-logo"/>
        <p>Forum - page principale</p>
      </router-link>
    </div>

    <!-- liens -->
    <nav class="navbar-menu">
        <div class="navbar-end">
            <div class="navbar-item">
                <a
                 href="#/userprofile/"
                v-if="userAdmin == 0"
                >Mon profil
                </a>
            </div>
            <div class="navbar-item">
                <router-link to="/delete_user" 
                v-if="userLogged">Supprimer le compte
                </router-link>
            </div>
            <div class="navbar-item">
                <a
                href="#" @click="logOut()"
                v-if="userLogged">Déconnexion
                </a>
            </div>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    userInfos: {
      type: String
    }
  },
  data() {
    return {
      userLogged: "",
      userAdmin: ""
    };
  },
  mounted() {
    //récupère informations pour personnalisation header
    if (sessionStorage.user) {
      this.userLogged = sessionStorage.user;
    }
    if(localStorage.role) {
      this.userAdmin = localStorage.role;
    }
  },
  methods: {
    //Deconnexion, suppression des données stockées
    logOut() {
      sessionStorage.clear("user");
      sessionStorage.clear("user-token");
      localStorage.clear("admin");
      window.location.href = "/login";
    }
  },
  watch: {
    isUserLogged() {
      this.userLogged = sessionStorage.user;
    },
  }
};
</script>
