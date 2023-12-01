<template>
  <div class="post_container">
    <!-- Section pour afficher tous les posts -->
    <div class="dashboard-Items" v-for="post in posts" :key="post.id">
      <router-link
        :to="{ name: 'onepost', params: { id: post.id } }"
        class="underline-disable"
      >
        <div class="post post_link">
          <div class="post_name">
            <i class="fas fa-user-circle"></i>
            <p>{{ post.User.username }}</p>
          </div>
          <div class="post_main">
            <p>{{ post.title }}</p>
            <p>{{ post.content }}</p>
            <img :src="post.imgFile" alt="Image du post" v-if="post.imgFile" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import store from "../modules/store.json";
import axios from "axios";

const posts = ref([]);

// Options pour les requêtes axios
const axiosOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("user-token"),
  },
};

// Fonction pour récupérer les posts
const fetchPosts = async () => {
  try {
    const response = await axios.get(store.api_host + "/post", axiosOptions);
    posts.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
  }
};

onMounted(async () => {
  // Récupérer les posts
  await fetchPosts();
  //const route = useRoute();

  // Ajout d'une vérification pour s'assurer que route et route.params sont définis
  /* if (route && route.params && route.params.id) {
    await getPostById(route.params.id);
  } */
});
</script>

<style scoped></style>
