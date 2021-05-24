<template>
    <div class="container">
        <img 
            src="../assets/icon.svg" 
            alt="groupomania-logo-small" 
            class="new-post_logo" />
        <button 
            v-on:click="isHidden = false" 
            class="button is-info">
            Créer un nouveau post
        </button>

        <!-- Form nouveau post -->
      <transition name="fade">
        <form v-if="!isHidden" class="new-post_form">
          <a href="#" class="new-post_close-button" v-on:click.prevent="isHidden = true">×</a>
          <label for="title" class="new-post_form-label">Titre</label>
          <input
            id="title"
            class="new-post_form-input"
            type="text"
            v-model="title"
            placeholder="Votre titre ..."
          />
          <label for="message" class="new-post_form-label">Message</label>
          <input
            id="message"
            class="new-post_form-input"
            type="text"
            v-model="text"
            placeholder="Votre message ..."
          />
          <!--<label for="image" class="new-post_form-label">Image</label>
          <input
            id="Image"
            class="new-post_form-file"
            type="file"
            @change="onFileSelected"
            placeholder="upload image"
          />-->
          <!-- form submit -->
          <button class="new-post_form-button" v-on:click="sendNewContent">Envoyer</button>
          <p id="alert">{{msgError}}</p>
        </form>
      </transition>
    </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "NewPost",
  components: {
  },
  data() {
    return {
      isUserLogged: "",
      isHidden: true,
      title: "",
      text: "",
      msgError: "",
    };
  },
  methods: {
    // Empeche l'affichage du formulaire de nouveau post si utilisateur non connecté
    userLogged() {
      if (sessionStorage.getItem("user")) {
        this.isUserLogged = true;
      }
    },
    //Selection image
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    //Envoi du formulaire
    sendNewContent(e) {
      let textRegex = /^[^=*<>{}]+$/;
      this.msgError = "";
      let error;
      e.preventDefault();

      //test input title
      if (this.title === "" || this.title == null) {
        error = "Titre requis";
      } else if (this.title.length < 3) {
        error = "Un minimum de 3 caractères est requis";
      } else if (!textRegex.test(this.title)) {
        error = "Les caractères suivants sont interdits: = * < > { }";
      }

      //test input content
      if (this.text === "" || this.text == null) {
        error = "Contenu requis";
      } else if (this.text.length < 3) {
        error = "Un minimum de 3 caractères est requis";
      } else if (!textRegex.test(this.text)) {
        error = "Les caractères suivants sont interdits: = * < > { }";
      }

      //si pas d'erreur, envoi du formulaire
      if (error) {
        this.msgError = error;
      } else {
        //test si image upload, si image, l'ajoute à postData
        let postData = new FormData();
        
        /*if (this.selectedFile !== undefined) {
          postData.append("image", this.selectedFile);
        }*/

        postData.append("title", this.title);
        postData.append("text", this.text);
        postData.append("userId", sessionStorage.getItem("user"));
        console.log(...postData);
        //requete
        axios({
          headers: {
           "Content-Type" : "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("user-token")
          },
          method: "post",
          url: "http://localhost:3000/post/newpost",
          body: postData
        })
          .then(response => {
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .catch(error => {
            console.log(error)
            //this.msgError = error.response.data.error;
          });
      }
    },
  },
  //Récupération des posts
   /*allPostsDisplay() {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("user-token")
        }
      };
      axios
        .get("http://localhost:3000/post/", options)
        .then(response => {
          this.messageContent = response.data;
        })
        .catch(error => console.log(error));
    },*/
  mounted() {
    //this.allPostsDisplay();
    this.userLogged();
  }
};
</script>