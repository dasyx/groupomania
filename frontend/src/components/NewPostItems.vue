<script>
export default {
  name: "NewpostItems",
  props: {
     username: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    postId: {
      type: Number,
      required: true
    },
    image: {
      type: String
    },
  },
};
</script>


<template>
  <!-- Post -->
  <div class="dashboard-Items">
    <!-- Lien vers post selectionné -->
    <router-link :to="{ name: 'post', params: { id: postId }} " class="underline-disable">
      <div class="post post_link">
        <!-- nom de l'utilisateur-->
        <div class="post_name">
          <i class="fas fa-user-circle"></i>
          <p>{{ username }}</p>
        </div>

        <!-- Contenu du post, titre, nombre de commentaires -->
        <div class="post_main">
          <p class="post_title">"{{title}}"</p>
          <p class="post_content">{{content}}</p>
          <img v-if="image" class="post_image" :src="image" alt="image-illustration"/>
        </div>
      </div>
    </router-link>
  </div>
</template>