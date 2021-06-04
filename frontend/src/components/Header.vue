<template>
  <header class="navbar" role="navigation" aria-label="main navigation">
    <!-- affichage du logo -->
    <nav class="navbar-brand">
      <router-link to="/mainboard">
        <img src="../../public/logos/icon-left-font-monochrome-white.svg" alt="groupomania-logo"/>
        <p>Forum - page principale</p>
      </router-link>
    </nav>

    <!-- Affichage des liens du Header si utilisateur admin-->
    <Sidebar class="navbar-menu" v-if="userAdmin == 1">
        <ul class="navbar-end">
            <li class="navbar-item">
                <a
                 href="#/userprofile/"
                >Mon profil
                </a>
            </li>
            <li class="navbar-item">
                <router-link to="/admin"
                >Espace administrateur
                </router-link>
            </li>
            <li class="navbar-item">
                <router-link to="/delete_user" 
                v-if="userLogged">Supprimer le compte
                </router-link>
            </li>
            <li class="navbar-item">
                <a
                href="#" @click="logOut()"
                v-if="userLogged"><i class="fas fa-sign-out-alt"></i>Déconnexion
                </a>
            </li>
        </ul>
    </Sidebar>
    
     <!-- Affichage des liens du Header si utilisateur non admin-->
    <Sidebar class="navbar-menu" v-if="userAdmin == 0">
        <ul class="navbar-end">
            <li class="navbar-item">
                <a
                 href="#/userprofile/"
                >Mon profil
                </a>
            </li>
            <li class="navbar-item">
                <router-link to="/delete_user" 
                v-if="userLogged">Supprimer le compte
                </router-link>
            </li>
            <li class="navbar-item">
                <a
                href="#" @click="logOut()"
                v-if="userLogged"><i class="fas fa-sign-out-alt"></i>Déconnexion
                </a>
            </li>
        </ul>
    </Sidebar>
    <Burger></Burger>
  </header>
</template>

<script>
import Burger from "../components/Menu/Burger.vue";
import Sidebar from "../components/Menu/Sidebar.vue";

export default {
  name: "Header",
  components : {
    Burger,
    Sidebar
  },
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
