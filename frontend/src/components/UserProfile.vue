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

      <!-- Formulaire de mise à jour du nom d'utilisateur -->
      <form @submit.prevent="updateUsername">
        <div class="field">
          <label for="newUsername" class="label"
            >Nouveau nom d'utilisateur</label
          >
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="newUsername"
              id="newUsername"
              placeholder="Entrez votre nouveau nom d'utilisateur"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-primary">Mettre à jour</button>
          </div>
        </div>
      </form>
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
    const newUsername = ref(""); // Nouveau nom d'utilisateur

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

    const updateUsername = async () => {
      if (!newUsername.value) {
        console.error("Le nouveau nom d'utilisateur ne peut être vide.");
        return;
      }

      try {
        const response = await axios.put(
          `${store.api_host}/user/update/${userId.value}`,
          {
            username: newUsername.value,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken.value}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Nom d'utilisateur mis à jour avec succès");
          userLogged.value.username = newUsername.value;
        } else {
          console.error("Erreur lors de la mise à jour du nom d'utilisateur");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du nom d'utilisateur:",
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
      newUsername,
      updateUsername, // Ajouter ici la méthode updateUsername
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
