import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mainboard from '../components/Mainboard'

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
]

const router = new VueRouter({
  routes
});

export default router
