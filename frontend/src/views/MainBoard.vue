<template>
  <div>
    <MainHeader />
    <div class="welcome_msg">
      <div v-if="!userLogged">
        <p>Utilisateur non autorisé</p>
      </div>
      <div v-else>
        <span
          >Bonjour <b>{{ registeredUsername }}</b> !</span
        >
      </div>
    </div>
    <NewPost />

    <!-- Affichage des posts -->
    <template v-if="messageContent || messageContent.value">
      <h2 class="dashboard-title">Derniers posts</h2>
      <div v-for="post in messageContent" :key="post.id">
        <AllPosts
          :title="post.title"
          :content="post.content"
          :imgFile="post.imgFile"
          :postId="post.id"
        />
      </div>
    </template>

    <!-- Message d'erreur si aucun post à afficher -->
    <template>
      <p class="no_post">Aucun post à afficher</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import store from "../modules/store.json";
import { useStorage } from "@vueuse/core";
import MainHeader from "@/components/MainHeader.vue";
import NewPost from "@/components/NewPost.vue";
import AllPosts from "@/components/AllPosts.vue";

const registeredUsername = ref("");
const messageContent = ref([]);
const userLogged = ref(false);
const userToken = useStorage("user-token", null, sessionStorage);
const userId = useStorage("user-id", null, sessionStorage);

const displayUserLogged = async () => {
  console.log("user-id:", userId.value);
  if (!userId.value) {
    console.error("ID utilisateur non disponible");
    userLogged.value = false; // Mise à jour de l'état de connexion
    return;
  }

  try {
    const response = await axios.get(`${store.api_host}/user/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`,
      },
    });

    if (response.status === 200) {
      registeredUsername.value = response.data.username;
      userLogged.value = true; // Mise à jour de l'état de connexion
      console.log("Nom d'utilisateur enregistré:", registeredUsername.value);
    } else {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur"
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error
    );
    userLogged.value = false; // Mise à jour de l'état de connexion
  }
};

onMounted(async () => {
  await displayUserLogged();
  fetchPosts();
});

const fetchPosts = async () => {
  try {
    const response = await axios.get(`${store.api_host}/post/`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`,
      },
    });
    messageContent.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
  }
};
</script>
