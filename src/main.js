import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
// import Toast from 'vue-toastification'; // Importez la bibliothèque vue-toastification
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import 'froala-editor/js/plugins.pkgd.min.js';

import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import VueFroala from 'vue-froala-wysiwyg';
import 'froala-editor/js/languages/fr.js';
import './lang/fr.js';

Vue.use(VueFroala);
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
