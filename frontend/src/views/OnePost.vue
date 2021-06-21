<template>
    <div class="post_container">
        <div class="dashboard-Items">
            <!-- Post -->
            <div id="post" class="post">
                <!-- Auteur du post -->
                <div class="post_name">
                    <i class="fas fa-user-circle"></i>
                </div>
                <!-- Contenu du post -->
                <div class="post_main">
                    <p id="post_title" class="post_title">"{{ user.title }}"</p>
                    <p id="post_content" class="post_content">{{ user.content }}</p>
                    <img v-if="user.imgFile" class="post_image" :src="user.imgFile" alt="image" />
                </div>

                <!-- Commentaires -->
                <div class="post_comments">
                    <ul v-if="comments.length">
                        <!-- La fonction mouseover fera apparaître/disparaître la suppression du commentaire au survol -->
                        <li
                        @mouseover="hover = true"
                        @mouseleave="hover = false"
                        :class="{ active: hover }"
                        v-for="comment in comments" v-bind:key="comment.UserId">
                            <!-- suppression commentaire -->
                            <span 
                            class="post_comments-display"> {{ comment.User.username }}&ensp;</span> :&ensp;{{ comment.content }}
                            <a v-if="comment.UserId == userLoggedId" class="post_delete-btn" @click="commentDelete(comment.id)">
                                <i class="far fa-minus-square display_hover"></i>
                            </a>
                        </li>
                        <p id="error_msg"></p>
                        <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
                    </ul>
                    <p v-else>Pas de commentaires</p>

                    <!-- Formulaire nouveau commentaire  -->
                    <NewCommentItem :postId="user.id" />
                </div>
                <!-- Bouton de suppression du post -->
                <div class="post-header">
                    <button v-if="user.UserId == userLoggedId" href="#" @click="postDelete(postId)" class="delete-btn">Supprimer ce post</button>
                    <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
                </div>
            </div>
        </div>
        <!-- Retour vers mainboard  -->
        <button class="button is-link">
            <a href="http://localhost:8080/groupomania/#/mainboard">
                <i class="far fa-arrow-alt-circle-left backlink_icon">Page précédente</i>
            </a>
        </button>
    </div>
</template>

<script>
const axios = require("axios");
import store from "../modules/store.json";
import NewCommentItem from "../components/NewCommentItem.vue";
import ConfirmDialogue from "../components/Modal_Button/ConfirmDialogue.vue";

export default {
    name: "OnePost",
    components: {
        NewCommentItem,
        ConfirmDialogue,
    },
     props: {
        username: {
            type: String,
        }
    },
    data() {
        return {
           // username: "",
            User:"",
            user: {},
            comments: {},
            comment: {},
            userLoggedId: "",
            hover: false,
        };
    },
    methods: {
        //Fonction pour afficher un post
        async getPostElements() {
            this.userLoggedId = sessionStorage.getItem("user");
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                },
            };
            axios
                .get(store.api_host + "/post/" + this.$route.params.id, options)
                .then((response) => {
                    console.log(response);
                    this.user = response.data;
                    this.comments = response.data.Comments;
                    this.postId = response.data.id;
                })
                .catch((error) => console.log(error));
        },
        //Fonction pour supprimer le commentaire
        async commentDelete(id) {
            /* if (this.comment.UserId !== this.userLoggedId) {
                document.getElementById("error_msg").innerHTML =
                    "La suppression de ce commentaire n'est permise qu'à son auteur ! Veuillez contacter un administrateur pour signaler un contenu inapproprié";
                console.log("accès refusé");
                //this.$router.push("/mainboard");
            } */
            const ok = await this.$refs.confirmDialogue.show({
                title: "Suppression du post",
                message: "Voulez-vous vraiment supprimer cette publication ?  Vous ne pourrez pas revenir en arrière !",
                okButton: "Supprimer définitivement",
            });
            if (ok) {
                axios({
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                    },
                    method: "delete",
                    url: store.api_host + "/comment/" + id,
                })
                    .then((response) => {
                        this.$router.push("/mainboard");
                        console.log(response.data);
                    })
                    .catch((error) => console.log(error));
            }
        },
        //Fonction pour supprimer un post
        async postDelete() {
            const ok = await this.$refs.confirmDialogue.show({
                title: "Suppression du post",
                message: "Voulez-vous vraiment supprimer cette publication ?  Vous ne pourrez pas revenir en arrière !",
                okButton: "Supprimer définitivement",
            });
            if (ok) {
                axios({
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("user-token"),
                    },
                    method: "delete",
                    url: `${store.api_host}/post/${this.$route.params.id}`,
                })
                    .then((response) => {
                        this.$router.push("/mainboard");
                        console.log(response.data);
                    })
                    .catch((error) => console.log(error));
            }
        },
    },
    mounted() {
        this.getPostElements();
    },
};
</script>
