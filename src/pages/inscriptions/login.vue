<template>
  <section class="register container-scroller">
    <div class="row">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div
          class="content-wrapper d-flex align-items-center auth container-fluid page-body-wrapper"
        >
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto col-md-6">
              <div
                class="auth-form-light text-left p-5 rounded-lg shadow"
                style="margin-top: -120px"
              >
                <!-- <div class="brand-logo text-center"> 
                  <img src="@/assets/images/logohire.png">
                </div> -->
                <h4 class="text-center font-weight-bold text-info py-2">
                  CONNEXION
                </h4>

                <div class="brand-logo text-center">
                  <img
                    src="@/assets/images/logohire.png"
                    style="width: 200px"
                  />
                </div>
                <form
                  class="forms-sample card-body mb-0 mt-0 pt-0"
                  @submit.prevent="store"
                >
                  <div class="form-group controls">
                    <label for="exampleFormControlSelect1"
                      >Email<span class="font-weight-bold" style="color: red">
                        *</span
                      ></label
                    >
                    <input
                      type="email"
                      :class="{ 'is-invalid': formErrors.email }"
                      @input="clearError('email')"
                      class="form-control form-control-lg"
                      v-model="user.email"
                      id="email"
                      placeholder="Email"
                    />
                    <div class="invalid-feedback" v-if="formErrors.email">
                      {{ formErrors.email[0] }}
                    </div>
                  </div>
                  <div class="form-group controls">
                    <label for="exampleFormControlSelect1"
                      >Password<span
                        class="font-weight-bold"
                        style="color: red"
                      >
                        *</span
                      ></label
                    >
                    <div class="input-group">
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        v-model="user.password"
                        id="password"
                        placeholder="Password"
                        :class="{ 'is-invalid': formErrors.password }"
                        @input="clearError('password')"
                      />

                      <div class="input-group-append">
                        <button
                          class="btn btn-custom"
                          type="button"
                          @click.prevent="togglePasswordVisibility('password')"
                        >
                          <i
                            id="toggle-password-visibility"
                            class="fas fa-eye-slash text-dark"
                          ></i>
                        </button>
                      </div>
                      <div class="invalid-feedback" v-if="formErrors.password">
                        {{ formErrors.password[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 col-md-12 col-lg-12">
                    <div class="row">
                      <button type="submit" class="btn btn-info mx-auto">
                        CONNEXION
                      </button>
                    </div>

                    <!-- <button @click="cancel" class="btn btn-danger">Annuler</button> -->
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    <router-link to="/register" class="text-info">
                      Vous n'avez pas encore de compte ?
                    </router-link>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    <router-link to="/auth-pages/login" class="text-info">
                      mot de passe oublié ?
                    </router-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- content-wrapper ends -->
      </div>

      <!-- page-body-wrapper ends -->
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from "../../layout/partials/Header";
import Footer from "../../layout/partials/Footer-auth";
import { useToast, POSITION } from "vue-toastification";
import { LoginService } from "@/_services";

export default {
  name: "verifycoderegister",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      formErrors: {},
    };
  },
  methods: {
    togglePasswordVisibility(field) {
      const inputField = document.getElementById(field);
      const icon = document.getElementById(`toggle-${field}-visibility`);
      if (inputField.type === "password") {
        inputField.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      } else {
        inputField.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
    },
    store() {
      LoginService.login(this.user)
        .then((res) => {
          // console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          const roleNames = res.data.user.roles.map((role) => role.name);
          localStorage.setItem("roles", JSON.stringify(roleNames));
          localStorage.setItem(
            "permissions",
            JSON.stringify(res.data.user.permissions)
          );
          // console.log(localStorage.getItem("roles"));
          // Rediriger l'utilisateur en fonction de son rôle
          if (roleNames.includes("roletalent")) {
            this.$router.push("/dashboard/talent");
          } else if (roleNames.includes("roleentreprise")) {
            this.$router.push("/dashboard/society");
          } else {
            
            this.$router.push("/register"); // Remplacez "/default" par le chemin de la page souhaitée
          }
          // this.$router.push("/dashboard/talent");
          // Traitement en cas de succès de la requête
          this.$toast.success("Utilisateur connecté avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });

          // Réinitialiser le formulaire ou rediriger vers une autre page, etc.
        })
        .catch((error) => {
          // Traitement en cas d'erreur de la requête
          console.error(error); // Afficher l'erreur dans la console
          if (error.response && error.response.data) {
            // S'il y a des erreurs de validation, les afficher
            if (error.response.data.errors) {
              this.formErrors = error.response.data.errors;
            } else {
              this.formErrors = []; // Réinitialise this.formErrors à un tableau vide
            }

            if (error.response.data.message && this.formErrors.length == 0) {
              if (error.response.status == 403) {
                this.$router.push("/register/verifycode"); // Rediriger vers la route de vérification de code
              }
              this.$toast.error(error.response.data.message, {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000", // Couleur de fond rouge pour l'erreur
                  color: "#fff", // Couleur du texte
                  fontWeight: "bold",
                  // Autres styles si nécessaire
                },
              });
            }
          } else {
            // Sinon, afficher un message d'erreur générique
            this.$toast.error(
              "Une erreur s'est produite. Veuillez réessayer!",
              {
                position: "top-right",
                timeout: 2000,
                style: {
                  background: "#ff0000", // Couleur de fond rouge pour l'erreur
                  color: "#fff", // Couleur du texte
                  fontWeight: "bold",
                  // Autres styles si nécessaire
                },
              }
            );
          }
        });
    },

    clearError(field) {
      if (field in this.formErrors) {
        this.formErrors[field] = "";
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.fixed-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: transparent; /* Couleur de fond du footer */
  padding: 20px; /* Espacement interne du footer */
  border-top: 1px solid #ccc; /* Bordure supérieure du footer */
}

.btn-custom {
  color: #6c757d; /* Couleur du texte par défaut */
  border-color: #ababad; /* Couleur de la bordure par défaut */
}

.btn-custom:hover,
.btn-custom:focus {
  color: #6c757d; /* Couleur du texte au survol ou au focus */
  background-color: transparent; /* Fond transparent au survol ou au focus */
  border-color: #ababad; /* Couleur de la bordure au survol ou au focus */
}

select {
  cursor: pointer;
  height: 43px !important;
}
/* Vos styles CSS ici */
</style>
