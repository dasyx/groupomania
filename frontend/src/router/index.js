<<<<<<< HEAD
// Importation des composants nécessaires de vue-router et des composants Vue pour les routes
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import UserSignup from "../views/UserSignup.vue";
import UserLogin from "../views/UserLogin.vue";
import OnePost from "../views/OnePost.vue";
import MainBoard from "../components/MainBoard.vue";
import UserProfile from "../components/UserProfile.vue";
import AdminComponent from "../components/AdminComponent.vue";
import DeleteUser from "../components/DeleteUser.vue";
=======
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import OnePost from '../views/OnePost.vue'
import Mainboard from '../components/Mainboard.vue'
import UserProfile from '../components/UserProfile.vue'
import Admin from '../components/Admin.vue'
import DeleteUser from '../components/DeleteUser.vue'

Vue.use(VueRouter)
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403

// Configuration des routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
<<<<<<< HEAD
    path: "/login",
    name: "login",
    component: UserLogin,
  },
  {
    path: "/signup",
    name: "signup",
    component: UserSignup,
  },
  {
    path: "/mainboard",
    name: "mainboard",
    component: MainBoard,
  },
  {
    path: "/userprofile",
    name: "userprofile",
    component: UserProfile,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminComponent,
  },
  {
    path: "/delete_user",
    name: "delete_user",
    component: DeleteUser,
  },
  {
    path: "/post/:id",
    name: "one_post",
    component: OnePost,
  },
];
=======
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/mainboard',
    name: 'mainboard',
    component: Mainboard
  },
  {
    path: '/userprofile',
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/delete_user',
    name: 'delete_user',
    component: DeleteUser
  },
  {
    path: '/post/:id',
    name: 'one_post',
    component: OnePost
  },
]
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403

// Création de l'instance de VueRouter avec l'historique du navigateur
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Exportation de l'instance de router pour utilisation dans l'application Vue
export default router;
