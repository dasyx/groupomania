<template>
  <header class="navbar" role="navigation" aria-label="main navigation">
    <!-- affichage du logo -->
    <div class="navbar-brand">
      <router-link to="/mainboard">
        <img src="../../public/logos/icon-left-font-monochrome-white.svg" alt="groupomania-logo"/>
        <p>Forum - page principale</p>
      </router-link>
    </div>

    <!-- Affichage des liens du Header si utilisateur admin-->
    <nav class="navbar-menu" v-if="userAdmin == 1">
        <div class="navbar-end">
            <div class="navbar-item">
                <a
                 href="#/userprofile/"
                >Mon profil
                </a>
            </div>
            <div class="navbar-item">
                <router-link to="/admin"
                >Espace administrateur
                </router-link>
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
     <!-- Affichage des liens du Header si utilisateur non admin-->
    <nav class="navbar-menu" v-if="userAdmin == 0">
        <div class="navbar-end">
            <div class="navbar-item">
                <a
                 href="#/userprofile/"
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
    },
  },
  data() {
    return {
      userLogged: "",
      userAdmin: ""
    };
  },
  mounted() {
    //Récupération des informations pour l'affichage des données du Header
    if (sessionStorage.user) {
      this.userLogged = sessionStorage.user;
    }
     if(localStorage.admin) {
      this.userAdmin = localStorage.admin;
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
