<template>
  <div class="mainboard">
    <MainHeader />
    <!-- Message de bienvenue -->
    <div class="welcome_msg">
      <div v-if="!userLogged">
        <p>Utilisateur non autorisé</p>
      </div>
      <div v-else>
        <span
          >Bonjour <b>{{ registeredUsername }}</b> !</span
        >
        <hr class="welcome_msg-separate" />
        <NewPost />
      </div>
    </div>

    <!-- Affichage des posts -->
    <template v-if="messageContent || messageContent.value">
      <h2 class="dashboard-title">
        <Icon
          icon="fluent:news-20-regular"
          color="white"
          width="30"
          height="30"
        />Consultez les publications récentes
      </h2>
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
import { Icon } from "@iconify/vue";

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
    const response = await axios.get(
      `${store.api_host}/mainboard/api/user/${userId.value}`,
      {
        headers: {
          Authorization: `Bearer ${userToken.value}`,
        },
      }
    );

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
});
</script>

<style scoped>
.mainboard {
  background-color: #e5e5e5;
  height: 100%;
}
.welcome_msg {
  margin: 0 auto;
  width: 100%;
  text-align: left;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  margin-bottom: 100px;
}
hr.welcome_msg-separate {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #e5e5e5;
}
.dashboard-title {
  display: flex;
  align-items: center;
  text-align: left;
  background: linear-gradient(to right, #485fc7, #ffffff);
  padding: 10px 20px;
  color: white;
  font-size: 24px;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.dashboard-title .iconify {
  margin-right: 10px;
}

.no_post {
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
  color: #a5a5a5;
}

@media (max-width: 768px) {
  .dashboard-title {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .dashboard-title {
    font-size: 16px;
  }
}
</style>
