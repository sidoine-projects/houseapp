<template>
  <section class="register container-scroller">
    <div class="row">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div
          class="content-wrapper d-flex align-items-center auth container-fluid page-body-wrapper full-page-wrapper"
        >
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto col-md-6">
              <div
                class="auth-form-light text-left p-5 rounded-lg shadow"
                style="margin-top: -120px"
              >
                <div class="brand-logo text-center">
                  <img
                    src="@/assets/images/logohire.png"
                    style="width: 200px"
                  />
                </div>
                <h6 class="text-center font-weight-bold text-info">
                  Aidez nous à protéger votre compte.
                </h6>
                <hr class="w-100 row" />

                <h6 class="text-center font-weight-bold text-dark">
                  Pour des raisons de sécurité, vous devriez vérifier votre
                  identité. Un code de vérification vous a été envoyé par email.
                </h6>
                <form
                  class="forms-sample card-body mb-0"
                  @submit.prevent="store"
                >
                  <div class="row">
                    <div class="form-group controls col-md-12 col-lg-12">
                      <label for="exampleFormControlSelect1"
                        >Vérification code<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <input
                        type="text"
                        :class="{ 'is-invalid': formErrors.verification_code }"
                        @input="clearError('verification_code')"
                        class="form-control form-control-lg"
                        v-model="user.verification_code"
                        id="verification_code"
                        placeholder="Code"
                        autocomplete="off"
                      />
                      <div
                        class="invalid-feedback"
                        v-if="formErrors.verification_code"
                      >
                        {{ formErrors.verification_code[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="mt-2 col-md-12 col-lg-12">
                    <div class="row">
                      <button type="submit" class="btn btn-info mx-auto">
                        VERIFIER CODE
                      </button>
                    </div>

                    <!-- <button @click="cancel" class="btn btn-danger">Annuler</button> -->
                  </div>
                </form>
                <div class="mt-2 col-md-12 col-lg-12">
                  <div class="row">
                    <!-- Bouton pour renvoyer le code -->
                    <button
                      type="button"
                      class="btn mx-auto text-info"
                      @click="resendVerificationCode"
                    >
                      Renvoyer Code
                    </button>
                  </div>
                </div>
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
        email: localStorage.getItem("email"),
        verification_code: "",
      },

      formErrors: {},
    };
  },
  methods: {
    store() {
      // Validation des données du formulaire ici si nécessaire
      console.log(this.user);
      // Appel de la fonction addUserTalent du service LoginService
      LoginService.verifyCode(this.user)
        .then((res) => {
          // Traitement en cas de succès de la requête
          this.$toast.success("Vérification éffectuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          localStorage.removeItem("email");
          this.$router.push("/login");
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
              if (error.response.data.message == "Utilisateur non trouvé.") {
                // Redirection vers la page de connexion
                this.$router.push("/login");
              } 
                // Affichage du toast d'erreur pour les autres messages
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

    resendVerificationCode() {
      this.user.verification_code = "";
      LoginService.resendVerificationCode(this.user)
        .then((response) => {
          // Traitement en cas de succès de la requête
          localStorage.setItem("role", response.data.role);
          this.$toast.info("Entrer le nouveau code reçu par mail !", {
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
          if (error.response.data.message) {
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

.background-text {
  background-color: #f0f0f0; /* Couleur de fond */
  padding: 20px; /* Ajout de marge intérieure pour le texte */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre */
  position: relative; /* Position relative pour le positionnement du texte */
}

.background-text h4 {
  position: absolute; /* Position absolue pour centrer le texte */
  top: 50%; /* Aligner le haut du texte à 50% de la hauteur du conteneur */
  left: 50%; /* Aligner le gauche du texte à 50% de la largeur du conteneur */
  transform: translate(
    -50%,
    -50%
  ); /* Utiliser transform pour centrer le texte */
  margin: 0; /* Supprimer les marges par défaut */
}

select {
  cursor: pointer;
  height: 43px !important;
}
/* Vos styles CSS ici */
</style>
