import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mainboard from '../components/Mainboard'
import UserProfile from '../components/UserProfile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../components/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import ('../components/Signup.vue')
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
]

const router = new VueRouter({
  routes
});

export default router
