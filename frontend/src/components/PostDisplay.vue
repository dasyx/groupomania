<template>
  <div class="post_container">
    <!-- Section pour afficher tous les posts -->
    <div class="dashboard-Items" v-for="post in posts" :key="post.id">
      <router-link
        :to="{ name: 'postdisplay', params: { id: post.id } }"
        class="underline-disable"
      >
        <div class="post post_link">
          <div class="post_name">
            <i class="fas fa-user-circle"></i>
            <p>{{ post.User.username }}</p>
          </div>
          <div class="post_main">
            <p>{{ post.title }}</p>
            <img :src="post.imgFile" alt="Image du post" v-if="post.imgFile" />
          </div>
          <!-- Bouton de suppression du post -->
          <button
            v-if="userLoggedId == post.UserId"
            @click="confirmPostDelete(post.id)"
            class="delete-btn"
          >
            Supprimer
          </button>
        </div>
      </router-link>
    </div>

    <!-- Section pour afficher un post en détail -->
    <div class="post_container" v-if="selectedPost">
      <div class="dashboard-Items">
        <div id="post" class="post">
          <div class="post_name">
            <i class="fas fa-user-circle"></i>
            <p>{{ selectedPost.User.username }}</p>
          </div>
          <div class="post_main">
            <p id="post_title" class="post_title">{{ selectedPost.title }}</p>
            <p id="post_content" class="post_content">
              {{ selectedPost.content }}
            </p>
            <img
              :src="selectedPost.imgFile"
              alt="Image du post"
              v-if="selectedPost.imgFile"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de confirmation pour la suppression -->
    <ConfirmDialogue ref="confirmDialogue" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../modules/store.json";

import axios from "axios";
import ConfirmDialogue from "./Modal_Button/ConfirmDialogue.vue";

const router = useRouter();

const posts = ref([]);
const selectedPost = ref(null);
const confirmDialogue = ref(null);
const userLoggedId = sessionStorage.getItem("user-id"); // Récupère l'ID de l'utilisateur connecté

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

// Obtenir un post par son ID
const getPostById = async (id) => {
  try {
    const response = await axios.get(
      store.api_host + `/post/${id}`,
      axiosOptions
    );
    selectedPost.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du post:", error);
  }
};

// Fonction pour confirmer et supprimer un post
const confirmPostDelete = async (postId) => {
  const ok = await confirmDialogue.value.show({
    title: "Suppression du post",
    message:
      "Voulez-vous vraiment supprimer cette publication ? Vous ne pourrez pas revenir en arrière !",
    okButton: "Supprimer définitivement",
  });

  if (ok) {
    try {
      await axios.delete(`${store.api_host}/post/${postId}`, axiosOptions);
      router.push("/mainboard"); // Rediriger vers MainBoard après suppression
      // Supprimer le post de la liste des posts
      if (posts.value.length > 0) {
        posts.value = posts.value.filter((post) => post.id !== postId);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du post:", error);
    }
  }
};

onMounted(async () => {
  // Récupérer les posts
  await fetchPosts();
  const route = useRoute();

  // Ajout d'une vérification pour s'assurer que route et route.params sont définis
  if (route && route.params && route.params.id) {
    await getPostById(route.params.id);
  }
});
</script>

<style scoped>
/* Vos styles CSS ici */
</style>
