import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bulma/css/bulma.css";
import "./styles/main.scss";

const app = createApp(App);

<<<<<<< HEAD
app.use(router);
app.use(store);
=======
require('./styles/main.scss');
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403

app.config.globalProperties.$http = axios;

// Ajoutez ici les autres plugins et configurations globales nécessaires

<<<<<<< HEAD
app.mount("#app");
=======
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
