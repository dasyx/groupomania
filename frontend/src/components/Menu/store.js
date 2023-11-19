<<<<<<< HEAD
import { reactive } from "vue";

export const store = reactive({
  isNavOpen: false,
=======
import Vue from "vue";

export const store = Vue.observable({
  isNavOpen: false
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
});

export const mutations = {
  setIsNavOpen(yesno) {
    store.isNavOpen = yesno;
  },
  toggleNav() {
    store.isNavOpen = !store.isNavOpen;
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 0269b2f0f2e568d8fd99fa61d659e544f76ce403
};
