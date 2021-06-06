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

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
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

const router = new VueRouter({
  routes
});

export default router
