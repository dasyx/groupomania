import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bulma/css/bulma.css";
import "./styles/main.scss";

const app = createApp(App);

app.use(router);
app.use(store);

app.config.globalProperties.$http = axios;

// Ajoutez ici les autres plugins et configurations globales nécessaires

app.mount("#app");
