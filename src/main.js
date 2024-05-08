import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
// import Toast from 'vue-toastification'; // Importez la bibliothèque vue-toastification
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
