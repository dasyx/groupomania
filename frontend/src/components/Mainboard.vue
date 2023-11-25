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
    <!-- <NewPost />
    <AllPosts
      v-for="message in messageContent.value"
      :key="message.id"
      :username="message.User.username"
      :title="message.title"
      :content="message.content"
      :image="message.imgFile"
      :postId="message.id"
      :comments="message.Comments"
    /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import store from "../modules/store.json";
import { useStorage } from "@vueuse/core";
import MainHeader from "@/components/MainHeader.vue";

const registeredUsername = ref("");
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

onMounted(() => {
  displayUserLogged();
});
</script>
