<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="">
            <div
              class="d-flex justify-content-between align-items-center col-md-12 mt-3 mb-3"
            >
              <!-- Flexbox pour aligner les éléments -->
              <h6 class="mb-0 text-info">
                AJOUTER UNE EXPÉRIENCE PROFESSIONNELLE
              </h6>

              <!-- Texte du h4 -->
              <button class="btn btn-secondary">
                <router-link to="/experiences/list"> RETOUR </router-link>
              </button>
              <!-- Bouton Retour -->
            </div>
            <hr class="row" />

            <form class="forms-sample card-body mt-n2" @submit.prevent="store">
              <div class="col-md-12">
                <div class="row">
                  <div class="form-group controls col-md-6">
                    <label for="exampleFormControlSelect1"
                      >Structure
                      <span class="font-weight-bold" style="color: red">
                        *</span
                      ></label
                    >
                    <input
                      :class="{ 'is-invalid': formErrors.errorNom }"
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                    />
                    <div class="invalid-feedback" v-if="formErrors.errorPays">
                      Ce champs est requis
                    </div>
                  </div>
                  <div class="form-group controls col-md-6">
                    <label for="exampleFormControlSelect1"
                      >institulé poste<span
                        class="font-weight-bold"
                        style="color: red"
                      >
                        *</span
                      ></label
                    >
                    <input
                      :class="{ 'is-invalid': formErrors.errorNom }"
                      type="text"
                      class="form-control"
                      id="exampleInputUsername1"
                    />
                    <div class="invalid-feedback" v-if="formErrors.errorPays">
                      Ce champs est requis
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="dateDebut"
                      >Date de début
                      <span class="font-weight-bold" style="color: red"
                        >*</span
                      ></label
                    >
                    <input
                      type="date"
                      v-model="formation.dateDebut"
                      @input="clearError('dateDebut')"
                      class="form-control"
                      id="dateDebut"
                      :class="{
                        'form-control': true,
                        'is-invalid': formErrors.dateDebut,
                      }"
                    />
                    <div
                      v-if="formErrors.dateDebut"
                      class="error-message text-danger"
                    >
                      {{ formErrors.dateDebut }}
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="dateFin"
                      >Date de fin
                      <span class="font-weight-bold" style="color: red"
                        >*</span
                      ></label
                    >
                    <input
                      type="date"
                      v-model="dateFin"
                      @input="clearError('dateFin')"
                      class="form-control"
                      id="dateFin"
                      :class="{
                        'form-control': true,
                        'is-invalid': formErrors.dateFin,
                      }"
                    />
                    <div
                      v-if="formErrors.dateFin"
                      class="error-message text-danger"
                    >
                      {{ formErrors.dateFin }}
                    </div>
                    <div v-if="errorMessage" class="error-message text-danger">
                      {{ errorMessage }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="description"
                      >Description des tâches 
                      <span class="font-weight-bold" style="color: red">
                        *</span
                      ></label
                    >
                    <textarea class="form-control custom-textarea" rows="7" type="text"></textarea>
                    <div class="invalid-feedback" v-if="formErrors.errorPays">
                      Ce champs est requis
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-2 col-md-12">
                <button type="submit" class="btn btn-info">AJOUTER</button>
                <!-- <button @click="cancel" class="btn btn-danger">Annuler</button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { patientService } from "@/_services";
import { paysService } from "@/_services";
import { departementService } from "@/_services";
import { communeService } from "@/_services";
import { arrondissementService } from "@/_services";
import { quartierService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-patient",
  data() {
    return {
      selected: "",
      pays: [],
      departements: [],
      communes: [],
      arrondissements: [],
      quartiers: [],
      isSexeSelected: true,
      formation: {
        typeFormation: "",
        ecole: "",
        niveauEtude: "",
        intituleDiplome: "",
        domaineFormation: "",
        anneeDebut: "",
        anneeFin: "",
      },
      formErrors: {
        errorNom: "",
        errorPrenom: "",
        errorAge: "",
        errorAdresse: "",
        errorTelephone: "",
        errorEmail: "",
        errorWhatsapp: "",
        errorProfession: "",
        errorSexe: "",
        errorUrgenceContact: "",
        errorautre: "",
        errorPays: "",
        errorDepartement: "",
        errorCommune: "",
        errorArrondissement: "",
        errorSituationMatrimoniale: "",
        errorQuartier: "",
      },
      wrong: "",
    };
  },

  mounted() {
    paysService
      .getAllpays()
      .then((res) => {
        this.pays = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    departementService
      .getAlldepartements()
      .then((res) => {
        this.departements = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  filters: {
    capitalizeFirstLetter(value) {
      if (value.length > 0) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      return value;
    },
  },
  methods: {
    cancel() {
      this.$toast.error("Échec de l'enregistrement !", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/patients/list");
    },

    store() {
      let isValid = true;

      this.formErrors = {};
      this.formErrors.errorNom = false;
      this.formErrors.errorPrenom = false;
      this.formErrors.errorAge = false;
      this.formErrors.errorNom = false;
      this.formErrors.errorEmail = false;
      this.formErrors.errorAdresse = false;
      this.formErrors.errorTelephone = false;
      this.formErrors.errorWhatsapp = false;
      this.formErrors.errorProfession = false;
      this.formErrors.errorSituationMatrimoniale = false;
      this.formErrors.errorUrgenceContact = false;
      this.formErrors.errorQuartier = false;
      this.formErrors.errorCommune = false;
      this.formErrors.errorArrondissement = false;
      this.formErrors.errorDepartement = false;
      this.formErrors.errorPays = false;
      this.formErrors.errorNom = false;
      this.formErrors.errorSexe = false;
      this.isSexeSelected = true;

      if (!this.patient.nom) {
        this.formErrors.errorNom = true;

        isValid = false;
      }

      if (!this.patient.sexe) {
        this.formErrors.errorSexe = true;
        this.isSexeSelected = false;
        isValid = false;
      }

      if (!this.patient.prenom) {
        this.formErrors.errorPrenom = true;
        isValid = false;
      }

      if (!this.patient.age) {
        this.formErrors.errorAge = true;
        isValid = false;
      }

      if (!this.patient.email) {
        this.formErrors.errorEmail = true;
        isValid = false;
      }

      if (!this.patient.adresse) {
        this.formErrors.errorAdresse = true;
        this.isValid = false;
      }

      if (!this.patient.telephone) {
        this.formErrors.errorTelephone = true;
        this.isValid = false;
      }

      if (!this.patient.whatsapp) {
        this.formErrors.errorWhatsapp = true;
        this.isValid = false;
      }

      if (
        !this.patient.profession ||
        !/^[a-zA-Z]{2,}$/.test(this.patient.profession)
      ) {
        this.formErrors.errorProfession = true;
        this.isValid = false;
      }

      if (!this.patient.situationmatrimoniale) {
        this.formErrors.errorSituationMatrimoniale = true;
        this.isValid = false;
      }

      if (!this.patient.urgencecontact) {
        this.formErrors.errorUrgenceContact = true;
        this.isValid = false;
      }

      if (
        this.patient.quartier_id === null ||
        this.patient.quartier_id === "null"
      ) {
        this.formErrors.errorQuartier = true;
        this.isValid = false;
      }

      if (
        this.patient.commune_id === null ||
        this.patient.commune_id === "null"
      ) {
        this.formErrors.errorCommune = true;
        this.isValid = false;
      }

      if (
        this.patient.arrondissement_id === null ||
        this.patient.arrondissement_id === "null"
      ) {
        this.formErrors.errorArrondissement = true;
        this.isValid = false;
      }

      if (
        this.patient.departement_id === null ||
        this.patient.departement_id === "null"
      ) {
        this.formErrors.errorDepartement = true;
        this.isValid = false;
      }

      if (!this.patient.pays_id) {
        this.formErrors.errorPays = true;
        this.isValid = false;
      }

      if (!isValid) {
        return;
      }

      if (!/^\d{8,}$/.test(this.patient.telephone)) {
        this.$toast.error(
          "Le Numéro de téléphone est invalide ! Veuillez entrer au moins 8 chiffre",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorTelephone = true;
        return;
      }

      if (!/^\d{8,}$/.test(this.patient.whatsapp)) {
        this.$toast.error(
          "Le Numéro de whatsapp est invalide ! Veuillez entrer au moins 8 chiffre",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorWhatsapp = true;
        return;
      }

      if (!/^\d{8,}$/.test(this.patient.urgencecontact)) {
        this.$toast.error(
          "Le Numéro de Contact Urgent  est invalide ! Veuillez entrer au moins 8 chiffre",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorUrgenceContact = true;
        return;
      }

      if (
        this.patient.nom.length > 100 ||
        !/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.patient.nom)
      ) {
        this.$toast.error(
          "Le nom est invalide ! Veuillez entrer au moins deux et au plus 50 caractères alphanumérique .",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorNom = true;
        return;
      }

      // if (!/^[a-zA-Z]{2,}$/.test(this.patient.prenom)) {

      if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.patient.prenom)) {
        this.$toast.error(
          "Le prénom est invalide !  Veuillez entrer au moins deux et au plus 100 caractères alphanumérique.",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorPrenom = true;
        return;
      }

      // patientService
      //   .addPatients(this.patient)
      //   .then((res) => {
      //     this.$toast.success("Enregistrement effectué avec succès !", {
      //       position: POSITION.TOP_RIGHT,
      //       timeout: 3000,
      //       bodyStyle: {
      //         borderRadius: "10px",
      //         backgroundColor: "#f0f0f0",
      //         color: "#333",
      //         fontWeight: "bold",
      //       },
      //     });
      //     this.$router.push("/patients/list");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // patientService
      //   .addPatients(this.patient)
      //   .then((res) => {
      //     this.$toast.success("Enregistrement effectué avec succès !", {
      //       position: POSITION.TOP_RIGHT,
      //       timeout: 3000,
      //       bodyStyle: {
      //         borderRadius: "10px",
      //         backgroundColor: "#f0f0f0",
      //         color: "#333",
      //         fontWeight: "bold",
      //       },
      //     });
      //     this.$router.push("/patients/list");
      //   })
      //   .catch((err) => {
      //     if (
      //       err.response &&
      //       err.response.status === 422 &&
      //       err.response.data.errors.urgencecontact
      //     ) {
      //       this.$toast.error("Le numéro de téléphone est déjà pris.", {
      //         position: POSITION.TOP_RIGHT,
      //         timeout: 3000,
      //         bodyStyle: {
      //           borderRadius: "10px",
      //           backgroundColor: "#ff0000",
      //           color: "#fff",
      //           fontWeight: "bold",
      //         },
      //       });
      //       this.formErrors.errorUrgenceContact = true;
      //     } else {
      //       console.log(err);
      //     }
      //   });

      patientService
        .addPatients(this.patient)
        .then((res) => {
          this.$toast.success("Enregistrement effectué avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/patients/list");
        })
        .catch((err) => {
          if (
            err.response &&
            err.response.status === 422 &&
            err.response.data.errors
          ) {
            const errors = err.response.data.errors;

            if (errors.telephone) {
              this.$toast.error("Le numéro de téléphone est déjà pris.", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
                bodyStyle: {
                  borderRadius: "10px",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
              this.formErrors.errorTelephone = true;
            }

            if (errors.whatsapp) {
              this.$toast.error("Le numéro de WhatsApp est déjà pris.", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
                bodyStyle: {
                  borderRadius: "10px",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
              this.formErrors.errorWhatsapp = true;
            }

            if (errors.urgencecontact) {
              this.$toast.error("Le numéro d'urgence est déjà pris.", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
                bodyStyle: {
                  borderRadius: "10px",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
              this.formErrors.errorUrgenceContact = true;
            }
          } else {
            console.log(err);
          }
        });
    },
    onDepartementSelect(departementId) {
      if (
        this.patient.departement_id === null ||
        this.patient.departement_id === "null"
      ) {
        this.formErrors.errorDepartement = true;
        this.formErrors.errorArrondissement = true;
        this.formErrors.errorCommune = true;
        this.formErrors.errorQuartier = true;

        this.patient.commune_id = null;
        this.patient.arrondissement_id = null;
        this.patient.quartier_id = null;

        this.communes = [];
        this.arrondissements = [];
        this.quartiers = [];
      } else {
        this.formErrors.errorDepartement = false;
        this.formErrors.errorCommune = true;
        this.formErrors.errorArrondissement = true;
        this.formErrors.errorQuartier = true;

        this.patient.commune_id = null;
        this.patient.arrondissement_id = null;
        this.patient.quartier_id = null;
        this.communes = [];
        this.arrondissements = [];
        this.quartiers = [];
      }

      communeService
        .getCommunes(departementId)
        .then((res) => {
          this.communes = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onCommuneSelect(communeId) {
      if (
        this.patient.commune_id === null ||
        this.patient.commune_id === "null"
      ) {
        this.formErrors.errorCommune = true;
        this.formErrors.errorArrondissement = true;
        this.formErrors.errorQuartier = true;

        this.patient.commune_id = null;
        this.patient.arrondissement_id = null;
        this.patient.quartier_id = null;

        this.arrondissements = [];
        this.quartiers = [];
      } else {
        this.formErrors.errorCommune = false;
        this.formErrors.errorArrondissement = true;
        this.formErrors.errorQuartier = true;

        this.patient.arrondissement_id = null;
        this.patient.quartier_id = null;

        this.arrondissements = [];
        this.quartiers = [];
      }

      arrondissementService
        .getArrondissements(communeId)
        .then((res) => {
          this.arrondissements = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onArrondissementSelect(arrondissementId) {
      if (
        this.patient.arrondissement_id === null ||
        this.patient.arrondissement_id === "null"
      ) {
        this.formErrors.errorArrondissement = true;
        this.formErrors.errorQuartier = true;

        this.patient.quartier_id = null;
        this.patient.arrondissement_id = null;
        this.quartiers = [];
      } else {
        this.formErrors.errorArrondissement = false;
        this.formErrors.errorQuartier = true;

        this.patient.quartier_id = null;

        this.quartiers = [];
      }

      quartierService
        .getQuartiers(arrondissementId)
        .then((res) => {
          this.quartiers = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<!-- <script src="@/assets/js/toastDemo.js"></script> -->

<style>

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

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6 + label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6 + label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked + label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked + label::before {
  background-color: #45c28e;
}
hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}
</style>
