<template>
  <div>
    <MainHeader />
    <!-- <div class="welcome_msg">
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
    /> -->
    <div v-if="registeredUsername">
      Nom d'utilisateur enregistré : {{ registeredUsername }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import store from "../modules/store.json";
import { useStorage } from "@vueuse/core";
import MainHeader from "@/components/MainHeader.vue";

const registeredUsername = ref("");
const userToken = useStorage("user-token", null, sessionStorage);
const userId = useStorage("user-id", null, sessionStorage);

const displayUserLogged = async () => {
  console.log("user-id:", userId.value);
  if (!userId.value) {
    console.error("ID utilisateur non disponible");
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
  }
};

onMounted(() => {
  displayUserLogged();
});
</script>
