import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      societyName: "Groupomania",
      emailValidInput(){
        const mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        var email = document.getElementById("email").value
        var emailResult = mailRegex.test(email);
        if( emailResult == true){
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
      usernameValidInput(){
        const nameRegex = /^[^=*'<>{}0-9]{3,}$/;
        var name = document.getElementById("name_signup").value
        var nameResult = nameRegex.test(name);
        if( nameResult == true){
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
  dashboardLoading() {
    const axios = require("axios");
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization : "Bearer " + sessionStorage.getItem("user-token")
      },
      method: "get",
      url: "http://localhost:3000/api/post/",
    })
    .then(response => {
      console.log("test")
      this.messageContent = response.data;
    })
    .catch(error => console.log(error));
}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
