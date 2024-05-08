<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card"></div>
      </div>
    </div>
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Tableau de board
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Gestion des Form
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Ajouter
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Ajouter un patient</h4>
            <form class="forms-sample row" @submit.prevent="store">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1"
                    >Nom <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorNom }"
                    @input="formErrors.errorNom = false"
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    style="text-transform: uppercase"
                    placeholder="Nom"
                    v-model="patient.nom"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorNom">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1"
                    >Prénom(s) <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorPrenom }"
                    type="text"
                    @input="formErrors.errorPrenom = false"
                    style="text-transform: capitalize"
                    class="form-control"
                    id="exampleInputUsername1"
                    placeholder="Prénom"
                    v-model="patient.prenom"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorPrenom">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"
                    >Age <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorAge }"
                    @input="formErrors.errorAge = false"
                    type="number"
                    min="1"
                    max="200"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="67"
                    v-model="patient.age"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorAge">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"
                    >Adresse <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorAdresse }"
                    @input="formErrors.errorAdresse = false"
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                    v-model="patient.adresse"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorAdresse">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"
                    >Email <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorEmail }"
                    @input="formErrors.errorEmail = false"
                    type="email"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="xyz@example.com"
                    v-model="patient.email"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorEmail">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Téléphone <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorTelephone }"
                    @input="formErrors.errorTelephone = false"
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder="90098989"
                    v-model="patient.telephone"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorTelephone"
                  >
                    Ce champs est requis ou invalide
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Numéro Whatsapp <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorWhatsapp }"
                    @input="formErrors.errorWhatsapp = false"
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder="90098989"
                    v-model="patient.whatsapp"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorWhatsapp">
                    Ce champs est requis ou invalide
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Numéro d'Urgence <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorUrgenceContact }"
                    @input="formErrors.errorUrgenceContact = false"
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder="90098989"
                    v-model="patient.urgencecontact"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorUrgenceContact"
                  >
                    Ce champs est requis ou invalide
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1"
                    >Profession <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorProfession }"
                    @input="formErrors.errorProfession = false"
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    placeholder="Comptable"
                    v-model="patient.profession"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorProfession"
                  >
                    Ce champs est requis ou invalide
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1"
                    >Situation Matrimoniale
                    <span style="color: red">*</span></label
                  >
                  <select
                    :class="{
                      'is-invalid': formErrors.errorSituationMatrimoniale,
                    }"
                    @change="formErrors.errorSituationMatrimoniale = false"
                    v-model="patient.situationmatrimoniale"
                    class="form-control mb-3"
                    id="exampleFormControlSelect1"
                  >
                    <option value="">Selectionner</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié">Marié</option>
                    <option value="Veuve">Veuve</option>
                    <option value="Concubinage">Concubinage</option>
                    <option value="Union libre">Union libre</option>
                    <option value="Divorcé">Divorcé</option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorSituationMatrimoniale"
                  >
                    Ce champs est requis
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Pays </label>
                  <select
                    :class="{ 'is-invalid': formErrors.errorPays }"
                    @change="formErrors.errorPays = false"
                    v-model="patient.pays_id"
                    class="form-control mb-3"
                    id="exampleFormControlSelect1"
                  >
                    <option value="null">Selectionner un Pays</option>
                    <option
                      v-for="pays in pays"
                      :key="pays.id"
                      :value="pays.id"
                    >
                      {{ pays.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorPays">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1"
                    >Département <span style="color: red">*</span></label
                  >
                  <select
                    :class="{ 'is-invalid': formErrors.errorDepartement }"
                    v-model="patient.departement_id"
                    @change="onDepartementSelect(patient.departement_id)"
                    class="form-control mb-3"
                    id="exampleFormControlSelect1"
                  >
                    <option value="null">Selectionner un Département</option>
                    <option
                      v-for="departement in departements"
                      :key="departement.id"
                      :value="departement.id"
                    >
                      {{ departement.nom }}
                    </option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorDepartement"
                  >
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1"
                    >Commune <span style="color: red">*</span></label
                  >
                  <select
                    :class="{ 'is-invalid': formErrors.errorCommune }"
                    v-model="patient.commune_id"
                    @change="onCommuneSelect(patient.commune_id)"
                    class="form-control mb-3"
                    id="exampleFormControlSelect1"
                  >
                    <option value="null">Selectionner une Commune</option>
                    <option
                      v-for="commune in communes"
                      :key="commune.id"
                      :value="commune.id"
                    >
                      {{ commune.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorCommune">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1"
                    >Arrondissement <span style="color: red">*</span></label
                  >
                  <select
                    :class="{ 'is-invalid': formErrors.errorArrondissement }"
                    v-model="patient.arrondissement_id"
                    @change="onArrondissementSelect(patient.arrondissement_id)"
                    class="form-control mb-3"
                    id="exampleFormControlSelect1"
                  >
                    <option value="null">Selectionner un Arrondissement</option>

                    <option
                      v-for="arrondissement in arrondissements"
                      :key="arrondissement.id"
                      :value="arrondissement.id"
                    >
                      {{ arrondissement.nom }}
                    </option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorArrondissement"
                  >
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1"
                    >Quartier <span style="color: red">*</span></label
                  >
                  <select
                    :class="{ 'is-invalid': formErrors.errorQuartier }"
                    @change="formErrors.errorQuartier = false"
                    v-model="patient.quartier_id"
                    class="form-control mb-3"
                    id="exampleFormControlSelect1"
                  >
                    <option value="null">Selectionner un Quartier</option>

                    <option
                      v-for="quartier in quartiers"
                      :key="quartier.id"
                      :value="quartier.id"
                    >
                      {{ quartier.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorQuartier">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Autres informations</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder=""
                    v-model="patient.autre"
                  />
                </div>

                <div class="form-group form-check">
                  <label for="radio" class=""
                    >Sexe <span style="color: red">*</span></label
                  >
                  <!-- <ul v-for="sexe in errorSexe" :key="sexe">
                    <li class="text-danger">{{ sexe }}</li>
                  </ul> -->
                  <div class="p-2">
                    <input
                      type="radio"
                      name="demo6"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-a"
                      value="Feminin"
                      v-model="patient.sexe"
                      :class="{ 'is-invalid': formErrors.errorSexe }"
                    />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem"
                      >Féminin</label
                    >
                    <input
                      type="radio"
                      name="demo6"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-b"
                      value="Masculin"
                      v-model="patient.sexe"
                    />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem"
                      >Masculin</label
                    >
                  </div>

                  <div class="invalid-feedback" v-if="formErrors.errorSexe">
                    Ce champs est requis
                  </div>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-success mr-2">
                  Ajouter
                </button>
                <button @click="cancel" class="btn btn-danger">Annuler</button>
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
      patient: {
        pays_id: null,
        departement_id: null,
        commune_id: null,
        arrondissement_id: null,
        quartier_id: null,
        nom: "",
        prenom: "",
        age: "",
        adresse: "",
        telephone: "",
        email: "",
        whatsapp: "",
        profession: "",
        situationmatrimoniale: "",
        urgencecontact: "",
        autre: "",
        sexe: "Feminin",
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
</style>
