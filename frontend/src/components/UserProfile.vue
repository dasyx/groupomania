<template>
  <div>
    <MainHeader />
    <div v-if="!userLogged">
      <p>Accès non autorisé</p>
    </div>
    <div class="userlogged-msg" v-else>
      <span
        >Vous êtes connecté en tant que <b>{{ userLogged.username }}</b></span
      >
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import MainHeader from "@/components/MainHeader.vue";
import store from "../modules/store.json";
import { useStorage } from "@vueuse/core";

export default {
  components: {
    MainHeader,
  },
  setup() {
    const userLogged = ref({ username: "" });
    const userToken = useStorage("user-token", null, sessionStorage);
    const userId = useStorage("user-id", null, sessionStorage);

    const displayUserLogged = async () => {
      console.log("user-id:", userId.value);
      if (!userId.value) {
        console.error("ID utilisateur non disponible");
        return;
      }

      try {
        const response = await axios.get(
          `${store.api_host}/user/${userId.value}`,
          {
            headers: {
              Authorization: `Bearer ${userToken.value}`,
            },
          }
        );

        if (response.status === 200) {
          userLogged.value.username = response.data.username;
          console.log(
            "Nom d'utilisateur enregistré:",
            userLogged.value.username
          );
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

    onMounted(async () => {
      await displayUserLogged();
    });

    return {
      userLogged,
      displayUserLogged,
    };
  },
};
</script>

<style scoped>
.userlogged-msg {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  color: #ccc;
}
</style>
