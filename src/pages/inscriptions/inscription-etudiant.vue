<template>
  <section class="register container-scroller">
    <div class="row">
      <Header />

      <div class="container-fluid page-body-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="w-100 flex-grow">
            <div class="col-xl-8 col-lg-12 mx-auto col-md-12">
              <div class="auth-form-light text-left p-5 card-custom">
                <h4 class="text-center font-weight-bold text-info">
                  CRÉATION DE COMPTE
                </h4>

                <form class="forms-sample card-body" @submit.prevent="store">
                  <div class="row">
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Civilité<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <select
                        :class="{ 'is-invalid': formErrors.civilite }"
                        @change="clearError('civilite')"
                        v-model="user.civilite"
                        class="form-control text-dark"
                        id="civilite"
                      >
                        <option value="" disabled>Civilité</option>
                        <option value="Mr" class="text-dark">Mr</option>
                        <option value="Mme" class="text-dark">Mme</option>
                      </select>
                      <div class="invalid-feedback" v-if="formErrors.civilite">
                        {{ formErrors.civilite[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Nom<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <input
                        type="text"
                        :class="{ 'is-invalid': formErrors.nom }"
                        class="form-control form-control-lg"
                        v-model="user.nom"
                        id="nom"
                        placeholder="Nom"
                      />
                      <div class="invalid-feedback" v-if="formErrors.nom">
                        {{ formErrors.nom[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Prénom<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <input
                        :class="{ 'is-invalid': formErrors.prenom }"
                        @input="clearError('prenom')"
                        type="text"
                        class="form-control form-control-lg"
                        v-model="user.prenom"
                        id="prenom"
                        placeholder="Prénom"
                      />
                      <div class="invalid-feedback" v-if="formErrors.prenom">
                        {{ formErrors.prenom[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Téléphone<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >

                      <div class="iti-wrapper">
                        <input
                          :class="{ 'is-invalid': formErrors.telephone }"
                          type="tel"
                          id="phone"
                          ref="phoneInput"
                          class="form-control form-control-lg iti-input"
                          v-model="user.telephone"
                          @input="onPhoneInputChange"
                          placeholder="Téléphone"
                        />
                        <div
                          class=""
                          style="font-size: 14px; color: rgb(232, 74, 69)"
                          v-if="formErrors.telephone"
                        >
                          {{ formErrors.telephone[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Situation familiale
                        <span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <select
                        :class="{
                          'is-invalid': formErrors.situation_familiale_id,
                        }"
                        @change="clearError('situation_familiale_id')"
                        v-model="user.situation_familiale_id"
                        class="form-control text-dark form-control-lg"
                        id="situation_familiale_id"
                      >
                        <option value="" disabled>
                          situation matrimoniale
                        </option>
                        <option
                          v-for="situation in situationsFamiliales"
                          :key="situation.id"
                          :value="situation.id"
                        >
                          {{ situation.name }}
                        </option>
                      </select>
                      <div
                        class="invalid-feedback"
                        v-if="formErrors.situation_familiale_id"
                      >
                        {{ formErrors.situation_familiale_id[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Email<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >

                      <input
                        type="email"
                        class="form-control form-control-lg"
                        v-model="user.email"
                        id="email"
                        placeholder="email"
                        :class="{ 'is-invalid': formErrors.email }"
                        @input="clearError('email')"
                      />
                      <div class="invalid-feedback" v-if="formErrors.email">
                        {{ formErrors.email[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="row"></div>
                  <div class="row">
                    <div class="form-group controls col-md-6 col-lg-6">
                      <label for="exampleFormControlSelect1"
                        >Adresse<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <input
                        type="adresse"
                        class="form-control form-control-lg"
                        v-model="user.adresse"
                        id="adresse"
                        placeholder="adresse"
                        :class="{ 'is-invalid': formErrors.adresse }"
                        @input="clearError('adresse')"
                      />
                      <div class="invalid-feedback" v-if="formErrors.adresse">
                        {{ formErrors.adresse[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-6 col-lg-6">
                      <label for="exampleFormControlSelect1"
                        >Page LinkedIn</label
                      >
                      <input
                        type="linkedin"
                        class="form-control form-control-lg"
                        v-model="user.linkedin"
                        id="linkedin"
                        placeholder="Page LinkedIn"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-6 col-lg-6">
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
                            @click.prevent="
                              togglePasswordVisibility('password')
                            "
                          >
                            <i
                              id="toggle-password-visibility"
                              class="fas fa-eye-slash text-dark"
                            ></i>
                          </button>
                        </div>
                        <div
                          class="invalid-feedback"
                          v-if="formErrors.password"
                        >
                          {{ formErrors.password[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group controls col-md-6 col-lg-6">
                      <label for="exampleFormControlSelect1"
                        >Confirmer Password<span
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
                          v-model="user.password_confirmation"
                          id="confirmPassword"
                          placeholder="Confirmer Password"
                          :class="{
                            'is-invalid': formErrors.password_confirmation,
                          }"
                          @input="clearError('password_confirmation')"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-custom"
                            type="button"
                            @click.prevent="
                              togglePasswordVisibility('confirmPassword')
                            "
                          >
                            <i
                              id="toggle-confirmPassword-visibility"
                              class="fas fa-eye-slash text-dark"
                            ></i>
                          </button>
                        </div>
                        <div
                          class="invalid-feedback"
                          v-if="formErrors.password_confirmation"
                        >
                          {{ formErrors.password_confirmation[0] }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-2 col-md-12 col-lg-12 row">
                    <button type="submit" class="btn btn-info mx-auto">
                      CREER VOTRE COMPTE
                    </button>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    Aviez vous déjà un compte?
                    <router-link to="/auth-pages/login" class="text-info">
                      Se connecter
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
import Header from "../../layout/partials/Header-home";
import Footer from "../../layout/partials/Footer";
// import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { useToast, POSITION } from "vue-toastification";
import { LoginService } from "@/_services";

import "intl-tel-input/build/css/intlTelInput.min.css";
import fr from "intl-tel-input/build/js/i18n/fr";

// import VueTelInput from 'vue-tel-input';
// import 'vue-tel-input/vue-tel-input.css';

export default {
  name: "register-student",
  components: {
    Header,
    Footer,
    // VueInputPhone,
  },
  data() {
    return {
      user: {
        telephone: "",
        nom: "",
        prenom: "",
        civilite: "",
        adresse: "",
        linkedin: "",
        country_code: "229", // Ajout du champ pour le code du pays
        email: "",
        situation_familiale_id: "",
        linkdin: "",
        password: "",
        password_confirmation: "",
      },

      situationsFamiliales: [],
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

    clearError(field) {
      this.formErrors[field] = false;
    },

    store() {
      const isValidPhoneNumber = this.iti.isValidNumberPrecise();
      if (!isValidPhoneNumber && this.user.telephone !== "") {
        this.formErrors.telephone = ["N° Téléphone invalide."];
        return; // Arrête l'exécution de la fonction
      }
      LoginService.addUserTalent(this.user)
        .then((res) => {
          // Traitement en cas de succès de la requête
          this.$toast.success("Utilisateur ajoutée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          localStorage.setItem("email", this.user.email); // Stockez l'e-mail dans le localStorage
          this.$router.push("/register/verifycode");
          // Réinitialiser le formulaire ou rediriger vers une autre page, etc.
        })
        .catch((error) => {
          // Traitement en cas d'erreur de la requête
          console.error(error); // Afficher l'erreur dans la console
          if (error.response && error.response.data) {
            // S'il y a des erreurs de validation, les afficher
            this.formErrors = error.response.data.errors;
            console.log(this.formErrors);
          } else {
            // Sinon, afficher un message d'erreur générique
            this.$toast.error(
              "Une erreur s'est produite. Veuillez réessayer!",
              {
                position: "top-right",
                timeout: 3000,
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

    getSituationsFamiliales() {
      LoginService.getSituationsFamiliales()
        .then((response) => {
          this.situationsFamiliales = response.data;
          // console.log(this.situationsFamiliales);
        })
        .catch((error) => {
          console.error("Error fetching situations familiales:", error);
        });
    },

    updateValue() {
      this.user.telephone = this.iti.getNumber();
      const selectedCountryData = this.iti.getSelectedCountryData();
      this.user.country_code = selectedCountryData.dialCode;
      console.log(this.user.country_code);
      console.log(this.user.telephone);
    },
    onPhoneInputChange() {
      console.log(this.user.country_code);
      console.log(this.user.telephone);

      const isValidPhoneNumber = this.iti.isValidNumberPrecise();

      // console.log("Is valid phone number:", isValidPhoneNumber);

      if (!isValidPhoneNumber) {
        this.formErrors.telephone = ["N° Téléphone invalide."];
        console.log("Ne numéro de téléphone:", this.formErrors.telephone);
      } else {
        this.formErrors.telephone = "";
        this.clearError("telephone");
      }
    },

    clearError(field) {
      if (field in this.formErrors) {
        this.formErrors[field] = "";
        // delete this.formErrors[field];
      }
    },
    beforeDestroy() {
      if (this.iti) {
        this.iti.destroy();
      }
    },
  },

  mounted() {
    this.getSituationsFamiliales();

    const input = this.$refs.phoneInput;
    this.iti = intlTelInput(input, {
      // utilsScript: "../../assets/js/utils.js",
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.7/build/js/utils.js",
      i18n: fr,
      separateDialCode: true,
      initialCountry: "bj",
    });

    input.addEventListener("countrychange", () => {
      this.updateValue();
    });
  },
};
</script>

<style scoped>
/* @import "../../../node_modules/@diogoccoutinho/vue-international-phone/dist/VueInputPhone.css"; */
.iti-input {
  width: 100% !important;
  margin-top: 0px !important; /* Ajoutez la marge supérieure ici */
}
.iti-flag {
  background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/10.0.2/img/flags.png");
}
body .intl-tel-input .flag-container {
  position: static;
}

body .intl-tel-input .selected-flag {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
}

body .intl-tel-input .country-list {
  width: 100%;
  top: 100%;
}

.iti {
  --iti-path-flags-1x: url("../../assets/images/intl-tel-input/flags.png");
  --iti-path-flags-2x: url("../../assets/images/intl-tel-input/flags@2x.png");
  --iti-path-globe-1x: url("../../assets/images/intl-tel-input/globe.png");
  --iti-path-globe-2x: url("../../assets/images/intl-tel-input/globe@2x.png");
}
.btn-custom {
  color: #6c757d; /* Couleur du texte par défaut */
  border-color: #ababad; /* Couleur de la bordure par défaut */
}

.card-custom {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
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
