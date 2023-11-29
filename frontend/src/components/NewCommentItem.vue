<template>
  <form @submit.prevent="sendNewComment">
    <textarea
      v-model="comment"
      placeholder="Ajoutez un commentaire..."
    ></textarea>
    <button type="submit">Commenter</button>
    <p v-if="msgError">{{ msgError }}</p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import store from "../modules/store.json";

const props = defineProps({
  postId: {
    type: Number,
  },
});

const emit = defineEmits(["comment-added"]); // Définir les événements que vous souhaitez émettre

const comment = ref("");
const msgError = ref("");

const sendNewComment = async () => {
  let textRegex = /^[^=*<>{}]+$/;
  msgError.value = "";
  let error;

  // Validation du commentaire
  if (comment.value === "" || comment.value == null) {
    error = "Vous devez écrire quelque chose !";
  } else if (!textRegex.test(comment.value)) {
    error = "Les caractères suivants sont interdits: = * < > { }";
  }

  // Envoi du commentaire si la validation est réussie
  if (!error) {
    try {
      const response = await axios.post(
        store.api_host + "/comment/new/",
        {
          UserId: sessionStorage.getItem("user-id"),
          content: comment.value,
          PostId: props.postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("user-token"),
          },
        }
      );

      if (response.status === 201) {
        comment.value = ""; // Réinitialiser le champ de commentaire
        emit("comment-added", response.data); // Utiliser emit pour envoyer l'événement
      } else {
        throw new Error("Erreur lors de l’envoi du commentaire");
      }
    } catch (error) {
      msgError.value = error.response?.data?.error || error.message;
    }
  } else {
    msgError.value = error;
  }
};
</script>

<style scoped>
/* Vos styles ici */
</style>
