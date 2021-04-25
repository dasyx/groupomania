<template>
    <div class="form">
        <div class="field">
            <label class="label">Nom</label>
            <div class="control">
                <input class="input" type="text" placeholder="Veuillez saisir votre nom" />
            </div>
        </div>

        <div class="field">
            <label class="label">Nom d'utilisateur</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Veuillez saisir le nom tel que vous apparaitrez aux yeux des autres utilisateurs du réseau" value="" />
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Adresse électronique</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Veuillez saisir votre adresse email" value="" />
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                </span>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" />
                    J'accepte <a href="#">les termes et conditions d'utilisation</a>
                </label>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label class="radio">
                    <input type="radio" name="question" />
                    Oui
                </label>
                <label class="radio">
                    <input type="radio" name="question" />
                    Non
                </label>
            </div>
        </div>

        <div class="field flex is-centered">
            <div class="control">
                <button class="button is-link">Soumettre</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
    .flex {
        display: flex;
        justify-content: center;
    }
</style>