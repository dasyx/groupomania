<template>
  <div class="post_container" @scroll="handleScroll">
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

    <!-- Message ou loader si plus de posts sont en cours de chargement -->
    <div v-if="loadingMore">Chargement...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import store from "../modules/store.json";
import axios from "axios";

const posts = ref([]);
const totalPosts = ref(0);
const limit = 10; // Nombre de posts à charger à la fois
let loadingMore = ref(false);

// Options pour les requêtes axios
const axiosOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("user-token"),
  },
};

// Fonction pour récupérer les posts
const fetchPosts = async () => {
  if (totalPosts.value >= 50) return; // Arrêter le chargement si 50 posts sont atteints
  loadingMore.value = true;

  try {
    const response = await axios.get(
      `${store.api_host}/post?limit=${limit}&offset=${totalPosts.value}`,
      axiosOptions
    );
    // Ici, response.data est directement le tableau de posts
    posts.value = [...posts.value, ...response.data];
    totalPosts.value += response.data.length;
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
  } finally {
    loadingMore.value = false;
  }
};

const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;

  if (scrollHeight - scrollTop <= clientHeight + 5) {
    // Chargement de plus de posts quand l'utilisateur arrive vers le bas
    fetchPosts();
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped></style>
