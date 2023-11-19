<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2 class="title is-2">Connexion</h2>
    <div class="field">
      <label for="name" class="label">Nom</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          v-model="userForm.username"
          id="name"
          name="name"
          :class="{ 'is-invalid': submitted && $v.userForm.username.$error }"
          placeholder="Veuillez saisir votre nom d'utilisateur"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      <div v-if="submitted && $v.userForm.username.$error">
        <span v-if="!$v.userForm.username.required"
          ><i class="fas fa-exclamation-triangle"
            >Le champ nom est requis</i
          ></span
        >
        <span v-if="!$v.userForm.username.username"
          ><i class="fas fa-exclamation-triangle"
            >Veuillez renseigner un nom d'utilisateur valide !</i
          ></span
        >
      </div>
    </div>
    <div class="field">
      <label for="password" class="label">Mot de passe</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          v-model="userForm.password"
          id="password"
          name="password"
          :class="{ 'is-invalid': submitted && $v.userForm.password.$error }"
          placeholder="Veuillez créer votre mot de passe"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      <div
        v-if="submitted && $v.userForm.password.$error"
        class="create_Password"
      >
        <span v-if="!$v.userForm.password.required"
          ><i class="fas fa-exclamation-triangle"
            >La saisie du mot de passe est obligatoire</i
          ></span
        >
        <span v-if="!$v.userForm.confirmPassword.email"
          ><i class="fas fa-exclamation-triangle"
            >Mot de passe invalide !</i
          ></span
        >
      </div>
    </div>
    <div class="field">
      <label for="email" class="label">Adresse électronique</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="email"
          v-model="userForm.email"
          id="email"
          name="email"
          :class="{ 'is-invalid': submitted && $v.userForm.email.$error }"
          placeholder="Veuillez saisir votre adresse email"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      <div v-if="submitted && $v.userForm.email.$error" class="mail_Warning">
        <span v-if="!$v.userForm.email.required"
          ><i class="fas fa-exclamation-triangle"
            >Le champ email est requis</i
          ></span
        >
        <span v-if="!$v.userForm.email.email"
          ><i class="fas fa-exclamation-triangle"
            >Veuillez renseigner une adresse email valide !</i
          ></span
        >
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
    <div class="forgot-password">
      <p>
        Déjà inscrit ?
        <router-link :to="{ name: 'login' }">Se connecter</router-link>
      </p>
    </div>
  </form>
</template>

<script></script>
