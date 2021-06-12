<template>
  <div>
    <!-- form nouveau commentaire-->
    <form class="newComment">
      <div class="newComment_part">
        <i class="far fa-comment-alt"></i>
        <label for="newcomment">Ecrire un commentaire</label>
      </div>
      <div class="newComment_part">
        <input type="text" id="newcomment" v-model="comment" class="newComment_input" placeholder="Cliquez sur votre commentaire pour le supprimer" />
        <button v-on:click="sendNewComment" class="newComment_button">Envoyer</button>
      </div>
    </form>

    <p id="alert">{{msgError}}</p>
  </div>
</template>

<script>
const axios = require("axios");
import store from '../modules/store.json'
export default {
  name: "NewCommentItem",
  data(){
    return{
      msgError: "",
      comment: "",
    }
  },
   props: {
    postId: {
      type: Number,
    },
  }, 
  methods: {
    //Envoi nouveau commantaire
    sendNewComment: function(e) {
      e.preventDefault();

      let textRegex = /^[^=*<>{}]+$/;
      this.msgError = "";
      let error;

      //test input comment
      if (this.comment === "" || this.comment == null) {
        error = "Vous devez écrire quelque chose !";
      } else if (!textRegex.test(this.comment)) {
        error = "Les caractères suivants sont interdits: = * < > { }";
      }

      //si validation ok, requete
      if (error) {
        this.msgError = error;
      } else {
         let comment = {
          UserId: sessionStorage.getItem("user"),
          content: this.comment,
          PostId: this.postId
        };
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("user-token")
          },
          method: "post",
          url: store.api_host + '/comment/new/',
          data: comment
        })
          .then(response => {
             this.$router.go();
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .catch(error => {
            this.msgError = error.response.data.error;
          }); 
      }
    }
  }
};
</script>