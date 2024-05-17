<!-- <template>
  <div>
    <section class="login">
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth">
            <div class="row w-100 flex-grow">
              <div class="col-xl-4 col-lg-6 mx-auto">
                <div class="auth-form-light text-left">
                  <center>
                    <div
                      class="logo text-center"
                      style="padding-top: 20px; padding-bottom: 20px"
                    >
                      <img
                        src="@/assets/images/logopay.jpeg"
                        style="max-width: 40%"
                      />
                    </div>
                  </center>
                  <br />
                  <marquee behavior="alternate">
                    <h4 class="">
                      <span class="texte-bold">Bienvenue sur </span>
                      <span class="text-success bold">MEDPAY</span>
                    </h4>
                  </marquee>

                  <form class="pt-3" @submit.prevent="login">
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><i
                            class="mdi mdi-email icon-sm text-dark align-middle"
                          ></i
                        ></span>
                      </div>
                      <br />
                      <div
                        id="error"
                        @click="dismissError()"
                        hidden="true"
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        <strong class="font-bold">Erreur:</strong><br />
                        <span class="block sm:inline" id="info"></span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                          <svg
                            class="fill-current h-6 w-6 text-red-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <title>Close</title>
                            <path
                              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                            />
                          </svg>
                        </span>
                      </div>
                      <div
                        hidden="true"
                        id="process"
                        style="border-top-color: transparent"
                        class="w-20 h-20 border-lg bg-gradient-to-r from-green-500 via-blue-500 to-red-500 mx-auto border-solid rounded-full animate-spin"
                      ></div>
                      <br />

                      <input
                        type="email"
                        v-model="user.email"
                        class="form-control form-control-lg"
                        placeholder="Email"
                        aria-label="email"
                        id="exampleInputEmail1"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="input-group mb-0 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><i
                            class="mdi mdi-lock icon-sm text-dark align-middle"
                          ></i
                        ></span>
                      </div>

                      <input
                        type="password"
                        v-model="user.password"
                        class="form-control form-control-lg"
                        placeholder="Password"
                        aria-label="password"
                        id="exampleInputPassword1"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="recaptcha-container">
                      <VueRecaptcha
                        :sitekey="siteKey"
                        :load-recaptcha-script="true"
                        @verify="handleSuccess"
                        @error="handleError"
                      ></VueRecaptcha>
                    </div>
                    <div v-if="isChecked" class="mt-n2 p-2" style="color: red">
                      Veuillez cocher le recaptcha
                    </div>
                    <div
                      v-if="isIncorrectPassword && !isInvalidPassword"
                      class="mt-n2 p-2"
                      style="color: red"
                    >
                      Mot de passe ou email incorrect
                    </div>
                    <div
                      v-if="isInvalidPassword && !isIncorrectPassword"
                      class="mt-n2 p-2"
                      style="color: red"
                    >
                      Le mot de passe doit avoir au moins 8 caractères, au moins
                      une lettre majuscule, au moins une lettre minuscule et un
                      caractère spécial.
                    </div>
                    <div class="mt-n2 p-2">
                      <button
                        type="submit"
                        class="connect text-center btn btn-block legend-dots bg-gradient-success"
                      >
                        <i class="mdi"></i>Se connecter
                      </button>
                    </div>
                    <div class="text-right font-weight-light p-4">
                      <router-link
                        to="/auth-pages/forget-password"
                        class="text-info"
                      >
                        <span
                          class="font-weight-bold"
                          style="font-family: Times New Roman"
                          >Mot de passe oublié ?</span
                        >
                      </router-link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { VueRecaptcha } from "vue-recaptcha";
import { LoginService, setLoggedIn } from "@/_services";

export default defineComponent({
  name: "LoginForm",
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        recaptcha: null,
      },
      isChecked: false,
      isIncorrectPassword: false,
      isInvalidPassword: false,
      errorMessage: "",
    };
  },
  mounted() {
    localStorage.setItem("recaptcha", "");

    // Vérifiez si l'utilisateur est déjà connecté
    if (localStorage.getItem("loggedIn") === "true") {
      // Redirigez l'utilisateur vers la page d'accueil
      this.$router.push("/");
    }
  },
  computed: {
    siteKey() {
      return "6LclcwQnAAAAAMl9RmJHufi43T8zSnNg89Iu2iay";
    },
  },
  methods: {
    handleError() {
      localStorage.setItem("recaptcha", "");
      document.getElementById("info").innerHTML =
        "Erreur de vérification reCAPTCHA";
    },
    handleSuccess(response) {
      localStorage.setItem("recaptcha", response);
    },
    login() {
      if (localStorage.getItem("recaptcha") === "") {
        this.isChecked = true;
      } else {
        this.isChecked = false;
        LoginService.login(this.user)
          .then((response) => {
            // Mettez à jour l'état de connexion
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem(
              "permission",
              JSON.stringify(response.data.permissions)
            );
            localStorage.setItem("token", response.data.token);
            // Redirigez l'utilisateur vers la page d'accueil
            this.$router.push("/");
          })
          .catch((err) => {
            // Affichez le message d'erreur approprié
            if (!this.validatePassword(this.user.password)) {
              this.isInvalidPassword = true;
              this.isIncorrectPassword = false;
              this.errorMessage =
                "Le mot de passe doit avoir au moins 8 caractères, au moins une lettre majuscule, au moins une lettre minuscule et un caractère spécial.";
            } else {
              this.isInvalidPassword = false;
              this.isIncorrectPassword = true;
              this.errorMessage = "";
            }
            console.log(err);
          });
      }
    },
    dismissError() {
      document.getElementById("error").hidden = true;
    },
    validatePassword(password) {
      // Valider les contraintes du mot de passe
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    },
  },
});
</script> -->
<template>
  <div>
    <section class="login">
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth">
            <div class="row w-100 flex-grow">
              <div class="col-xl-4 col-lg-6 mx-auto">
                <div class="auth-form-light text-left">
                  <center>
                    <div
                      class="logo text-center"
                      style="padding-top: 20px; padding-bottom: 20px"
                    >
                      <img
                        src="@/assets/images/logohire.png"
                        style="max-width: 40%"
                      />
                    </div>
                  </center>
                  <br />
                  <marquee behavior="alternate">
                    <h4 class="">
                      <span class="texte-bold">Bienvenue sur </span>
                      <span class="text-success bold">MEDPAY</span>
                    </h4>
                  </marquee>

                  <form class="pt-3" @submit.prevent="login">
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><i
                            class="mdi mdi-email icon-sm text-dark align-middle"
                          ></i
                        ></span>
                      </div>
                      <br />
                      <div
                        id="error"
                        @click="dismissError()"
                        hidden="true"
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        <strong class="font-bold">Erreur:</strong><br />
                        <span class="block sm:inline" id="info"></span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                          <svg
                            class="fill-current h-6 w-6 text-red-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <title>Close</title>
                            <path
                              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                            />
                          </svg>
                        </span>
                      </div>
                      <div
                        hidden="true"
                        id="process"
                        style="border-top-color: transparent"
                        class="w-20 h-20 border-lg bg-gradient-to-r from-green-500 via-blue-500 to-red-500 mx-auto border-solid rounded-full animate-spin"
                      ></div>
                      <br />

                      <input
                        type="email"
                        v-model="user.email"
                        class="form-control form-control-lg"
                        placeholder="Email"
                        aria-label="email"
                        id="exampleInputEmail1"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="input-group mb-0 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><i
                            class="mdi mdi-lock icon-sm text-dark align-middle"
                          ></i
                        ></span>
                      </div>

                      <input
                        type="password"
                        v-model="user.password"
                        class="form-control form-control-lg"
                        placeholder="Password"
                        aria-label="password"
                        id="exampleInputPassword1"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="recaptcha-container" v-if="isOnline">
                      <VueRecaptcha
                        :sitekey="siteKey"
                        :load-recaptcha-script="true"
                        @verify="handleSuccess"
                        @error="handleError"
                      ></VueRecaptcha>
                    </div>
                    <div v-if="isChecked" class="mt-n2 p-2" style="color: red">
                      Veuillez cocher le recaptcha
                    </div>
                    <div
                      v-if="isIncorrectPassword && !isInvalidPassword"
                      class="mt-n2 p-2"
                      style="color: red"
                    >
                      Mot de passe ou email incorrect
                    </div>
                    <div
                      v-if="isInvalidPassword && !isIncorrectPassword"
                      class="mt-n2 p-2"
                      style="color: red"
                    >
                      Le mot de passe doit avoir au moins 8 caractères, au moins
                      une lettre majuscule, au moins une lettre minuscule et un
                      caractère spécial.
                    </div>
                    <div class="mt-n2 p-2">
                      <button
                        type="submit"
                        class="connect text-center btn btn-block legend-dots bg-gradient-success"
                      >
                        <i class="mdi"></i>Se connecter
                      </button>
                    </div>
                    <div class="text-right font-weight-light p-4">
                      <router-link
                        to="/auth-pages/forget-password"
                        class="text-info"
                      >
                        <span
                          class="font-weight-bold"
                          style="font-family: Times New Roman"
                          >Mot de passe oublié ?</span
                        >
                      </router-link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { VueRecaptcha } from "vue-recaptcha";
import { LoginService, setLoggedIn } from "@/_services";

export default defineComponent({
  name: "LoginForm",
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        recaptcha: null,
      },
      isChecked: false,
      isIncorrectPassword: false,
      isInvalidPassword: false,
      errorMessage: "",
      isOnline: navigator.onLine,
    };
  },
  mounted() {
    localStorage.setItem("recaptcha", "");

    // Vérifiez si l'utilisateur est déjà connecté
    if (localStorage.getItem("loggedIn") === "true") {
      // Redirigez l'utilisateur vers la page d'accueil
      this.$router.push("/");
    }
  },
  computed: {
    siteKey() {
      return "6LclcwQnAAAAAMl9RmJHufi43T8zSnNg89Iu2iay";
    },
  },
  methods: {
    handleError() {
      localStorage.setItem("recaptcha", "");
      document.getElementById("info").innerHTML =
        "Erreur de vérification reCAPTCHA";
    },
    handleSuccess(response) {
      localStorage.setItem("recaptcha", response);
    },
    login() {
      if (!this.isOnline) {
        // Absence de connexion Internet, s'en passer du reCAPTCHA
        this.doLogin();
      } else {
        if (localStorage.getItem("recaptcha") === "") {
          this.isChecked = true;
        } else {
          this.isChecked = false;
          this.doLogin();
        }
      }
    },
    doLogin() {
      LoginService.login(this.user)
        .then((response) => {
          // Mettez à jour l'état de connexion
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "permission",
            JSON.stringify(response.data.permissions)
          );
          localStorage.setItem("token", response.data.token);
          // Redirigez l'utilisateur vers la page d'accueil
          this.$router.push("/");
        })
        .catch((err) => {
          // Affichez le message d'erreur approprié
          if (!this.validatePassword(this.user.password)) {
            this.isInvalidPassword = true;
            this.isIncorrectPassword = false;
            this.errorMessage =
              "Le mot de passe doit avoir au moins 8 caractères, au moins une lettre majuscule, au moins une lettre minuscule et un caractère spécial.";
          } else {
            this.isInvalidPassword = false;
            this.isIncorrectPassword = true;
            this.errorMessage = "";
          }
          console.log(err);
        });
      // }
    },
    dismissError() {
      document.getElementById("error").hidden = true;
    },
    validatePassword(password) {
      // Valider les contraintes du mot de passe
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    },
  },
});
</script>

<style scoped>
.login {
  position: relative;
  min-height: 100vh;
  background-color: #dcdbe0;
}
</style>

<style>
.logo-brand {
  display: flex;
  justify-content: space-between;
}

.logo-brand img {
  margin-left: 0;
  margin-right: 10px;
}

.connect {
  font-size: 1.2rem;
  color: #fff;
}

.underline-none:hover {
  text-decoration: none !important;
}

@media screen and (max-height: 767px) {
  #rc-imageselect,
  /* .g-recaptcha {
    transform: scale(0.6);
    -webkit-transform: scale(0.7);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  } */
  .recaptcha-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    /* margin-right: 26%; */
  }
}
</style>
