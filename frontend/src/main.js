import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'

import 'bulma/css/bulma.css';

require('./assets/main.scss');

Vue.use(Vuelidate);
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
