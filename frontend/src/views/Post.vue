<template>
  <div class="post_container">
    <div class="dashboard-Items">

      <!-- Post -->
      <div id="post" class="post">
        <!-- Auteur du post -->
        <div class="post-header">
          <div class="post_name">
            <i class="fas fa-user-circle"></i>
            <p id="post_user_id">{{user.username}}</p>
          </div>
          <a
            v-if="user.UserId == userLoggedId"
            href="#"
            @click="deletePost(postId)"
            class="post_delete-link"
          >Supprimer ce post</a>
        </div>

        <!-- Contenu du post -->
        <div class="post_main">
          <p id="post_title" class="post_title">"{{user.title}}"</p>
          <p id="post_content" class="post_content">{{user.content}}</p>
          <img v-if="user.imgFile" class="post_image" :src="user.imgFile" alt="image" />

        </div>
      </div>
    </div>
    <!-- Retour vers dashboard  -->
    <div>
      <a href="http://localhost:8080/?#/mainboard" class="backlink">
      
        <i class="far fa-arrow-alt-circle-left backlink_icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import store from '../modules/store.json'

export default {
  name: "Post",
  data() {
    return {
      User: "",
      username: "",
      user: {},
      userLoggedId: "",
      postId: "",
    };
  },
  mounted() {
    this.getPostElements();
    
  },
  methods: {
    getPostElements(){
      this.userLoggedId = sessionStorage.getItem("user");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("user-token")
      }
    };
    axios
      .get(store.api_host + '/post/' + this.$route.params.id, options)
      .then(response => {
        console.log(response)
        this.user = response.data;
        this.postId = response.data.id;
      })
      .catch(error => console.log(error));
    },
     deletePost() {
      if (confirm("Supprimer cette publication ?")) {
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("user-token")
          },
          method: "delete",
          url: store.api_host + '/post/' + this.$route.params.id
        })
          .then(response => {
            this.$router.push('/mainboard');
            console.log(response.data);
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>