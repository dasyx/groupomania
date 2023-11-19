<<<<<<< HEAD
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    societyName: "Groupomania",
    messageContent: null, // Ajouté pour stocker les messages récupérés
  },
  mutations: {
    // Mutation pour mettre à jour messageContent
    SET_MESSAGE_CONTENT(state, messages) {
      state.messageContent = messages;
    },
    // Autres mutations au besoin
  },
  actions: {
    // Actions pour la validation d'email
    emailValidInput(context, email) {
      const mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
      return mailRegex.test(email);
    },
    // Actions pour la validation de nom d'utilisateur
    usernameValidInput(context, name) {
      const nameRegex = /^[^=*'<>{}0-9]{3,}$/;
      return nameRegex.test(name);
    },
    // Action pour charger le tableau de bord
    async dashboardLoading({ commit }) {
      try {
        const response = await axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("user-token"),
          },
          method: "get",
          url: "http://localhost:3000/api/post/",
        });
        console.log("Bienvenue sur le forum !");
        commit("SET_MESSAGE_CONTENT", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    // Autres actions au besoin
  },
  modules: {
    // Modules si nécessaire
  },
});
=======
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        societyName: "Groupomania",
        emailValidInput() {
            const mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
            var email = document.getElementById('email').value;
            var emailResult = mailRegex.test(email);
            if (emailResult == true) {
                document.getElementById("validMail").style.visibility = "visible";
                document.getElementById("wrongMail").style.visibility = "hidden";
                document.getElementById("validMail").style.color = "green";
                return true;
            } else {
                document.getElementById("validMail").style.visibility = "hidden";
                document.getElementById("wrongMail").style.visibility = "visible";
                document.getElementById("wrongMail").style.color = "red";
                return false;
            }
        },
        usernameValidInput() {
            const nameRegex = /^[^=*'<>{}0-9]{3,}$/;
            var name = document.getElementById("name").value;
            var nameResult = nameRegex.test(name);
            if (nameResult == true) {
                document.getElementById("validName").style.visibility = "visible";
                document.getElementById("wrongName").style.visibility = "hidden";
                document.getElementById("validName").style.color = "green";
                return true;
            } else {
                document.getElementById("validName").style.visibility = "hidden";
                document.getElementById("wrongName").style.visibility = "visible";
                document.getElementById("wrongName").style.color = "red";
                return false;
            }
        },
        //Récupération des posts
        async dashboardLoading() {
            const axios = require("axios");
            axios({
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                },
                method: "get",
                url: "http://localhost:3000/api/post/",
            })
                .then((response) => {
                    console.log("Bienvenue sur le forum !");
                    this.messageContent = response.data;
                })
                .catch((error) => console.log(error));
        },
    },
    mutations: {},
    actions: {},
    modules: {},
});
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
