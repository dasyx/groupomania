<template>
    <div class="post_container">
        <div class="dashboard-Items">
            <!-- Post -->
            <div id="post" class="post">
                <!-- Auteur du post -->
                <div class="post_name">
                    <i class="fas fa-user-circle"></i>
                    <p id="post_user_id">{{ user.username }}</p>
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
                        <li v-for="comment in comments" v-bind:key="comment.UserId">
                            <span class="bold"> {{ comment.User.username }}:</span> {{ comment.content }}
                        </li>
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
        <!-- Retour vers dashboard  -->
        <div>
            <a href="http://localhost:8080/?#/mainboard" class="backlink">
                <i class="far fa-arrow-alt-circle-left backlink_icon"></i>
            </a>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
import store from "../modules/store.json";
import NewCommentItem from "../components/NewCommentItem.vue";
import ConfirmDialogue from "../components/ConfirmDialogue.vue";

export default {
    name: "Post",
    data() {
        return {
            //User: "",
            //username: "",
            user: {},
            userLoggedId: "",
            postId: "",
            comment: {},
            comments: {},
        };
    },
    components: { 
        NewCommentItem, ConfirmDialogue 
    },
    mounted() {
        this.getPostElements();
    },
    methods: {
        //Fonction pour afficher un post
        getPostElements() {
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
                    url: store.api_host + "/post/" + this.$route.params.id,
                })
                    .then((response) => {
                        this.$router.push("/mainboard");
                        console.log(response.data);
                    })
                    .catch((error) => console.log(error));
            }
        },
    },
};
</script>
