<template>
  <div>
    <MainHeader />
    <div class="welcome_msg">
      <div v-if="!userLogged">
        <p>Utilisateur non autorisé</p>
      </div>
      <div v-else>
        <span
          >Bonjour <b>{{ userLogged.value.username }}</b> !</span
        >
      </div>
    </div>
    <NewPost />
    <AllPosts
      v-for="message in messageContent.value"
      :key="message.id"
      :username="message.User.username"
      :title="message.title"
      :content="message.content"
      :image="message.imgFile"
      :postId="message.id"
      :comments="message.Comments"
    />
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

const userLogged = ref(null);
const messageContent = ref([]);

// Utilisation de useStorage pour stocker les informations de l'utilisateur
const userToken = useStorage("user-token", "", sessionStorage);
const userId = useStorage("user-id", "", sessionStorage);

const displayUserLogged = async () => {
  if (!userId.value) {
    console.error("ID utilisateur non disponible");
    return;
  }
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken.value,
    },
  };

  try {
    const response = await axios.get(
      `${store.api_host}/user/${userId.value}`,
      headers
    );
    userLogged.value = response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error
    );
  }
};

// Vous pouvez ajouter d'autres méthodes ici si nécessaire

onMounted(() => {
  displayUserLogged();
  // Autres appels de fonctions au montage...
});
</script>
