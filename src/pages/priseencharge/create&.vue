<!-- <template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Assurance patiente
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
            <h4 class="card-title">Ajouter une assurance patiente</h4>
            <form @submit="addPriseEnCharge" class="forms-sample row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="patient_id">Patient :</label>
                  <select
                    id="patient_id"
                    v-model="patient_id"
                    class="form-control"
                    required
                  >
                    <option value="">Sélectionnez un patient</option>
                    <option
                      v-for="patient in patients"
                      :value="patient.id"
                      :key="patient.id"
                    >
                      {{ patient.nom }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="assurance_id">Assurance :</label>
                  <select
                    id="assurance_id"
                    v-model="assurance_id"
                    class="form-control"
                    required
                  >
                    <option value="">Sélectionnez un assurance</option>
                    <option
                      v-for="assurance in assurances"
                      :value="assurance.id"
                      :key="assurance.id"
                    >
                      {{ assurance.nom }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="pourcentage">Pourcentage en %</label>
                  <input
                    v-model="pourcentage"
                    type="number"
                    class="form-control"
                    id="pourcentage"
                    placeholder="Pourcentage de prise en charge"
                  />
                </div>
                <div class="form-group">
                  <label for="radio" class="">Statut</label>
                  <div class="p-2">
                    <input
                      type="radio"
                      v-model="statut"
                      value="privé"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-a"
                      checked
                    />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem"
                      >Privé</label
                    >
                    <input
                      type="radio"
                      v-model="statut"
                      value="public"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-b"
                    />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem"
                      >Public</label
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="dateDebut">Date de début</label>
                  <input
                    type="date"
                    v-model="dateDebut"
                    class="form-control"
                    id="dateDebut"
                    placeholder="date_debut"
                  />
                </div>
                <div class="form-group">
                  <label for="dateFin">Date de fin</label>
                  <input
                    type="date"
                    v-model="dateFin"
                    class="form-control"
                    id="dateFin"
                    placeholder="date_fin"
                  />
                  <div v-if="errorMessage" class="error-message text-danger">
                    {{ errorMessage }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="Observation">Observation</label>
                  <textarea
                    id="observation"
                    v-model="observation"
                    class="form-control"
                    type="text"
                    placeholder="Donnez une observation"
                  ></textarea>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">
                  Ajouter
                </button>
                <button class="btn btn-gradient-danger">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import { patientService } from "@/_services/patients_services.js";
import { AssuranceService } from "@/_services/assurances_services.js";
import { CompagnieService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-priseencharge",

  data() {
    return {
      patient_id: "",
      assurance_id: "",
      pourcentage: null,
      statut: "privé",
      dateDebut: "",
      dateFin: "",
      observation: "",
      assurances: [],
      patients: [],
      errorMessage: "",
    };
  },
  mounted() {
    patientService
      .getAllPatients()
      .then((res) => {
        this.patients = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    AssuranceService.getAllAssurances()
      .then((res) => {
        this.assurances = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addPriseEnCharge(event) {
      event.preventDefault();
      const selectedDateDebut = new Date(this.dateDebut);
      const selectedDateFin = new Date(this.dateFin);

      if (selectedDateFin < selectedDateDebut) {
        this.errorMessage = "La date de fin est antérieure à la date de début.";
        return;
      }

      const priseencharge = {
        patient_id: this.patient_id,
        assurance_id: this.assurance_id,
        pourcentage: this.pourcentage,
        statut: this.statut,
        datedebut: this.dateDebut,
        datefin: this.dateFin,
        observation: this.observation,
      };

      // Vérifier si le patient a déjà une indigence
      if (this.hasIndigence(this.patient_id)) {
        console.log("Le patient possède déjà une indigence.");
        // Afficher un message indiquant que le patient a déjà une indigence
        return;
      }
      console.log("Valeurs entrées par l'utilisateur :", priseencharge);

      PriseEnChargePatientService.addPriseEnChargePatient(priseencharge)
        .then((response) => {
          console.log("Prise en charge ajoutée avec succès !");
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
          this.patient_id = "";
          this.assurance_id = "";
          this.pourcentage = null;
          this.dateDebut = "";
          this.datefin = "";
          this.statut = "";
          this.observation = "";
          // alert("L'assurance a été ajoutée avec succès.");
          // Rediriger vers la page "compagnie/list"
          this.$toast.success("Prise en charge ajoutée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/priseencharge/list");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'ajout de la prise en charge :",
            error
          );
          // Afficher un message d'erreur ou effectuer d'autres actions nécessaires
        });
    },
    hasIndigence(patientId) {
      // Vérifier si le patient a déjà une indigence
      const indigences = []; // Remplacer par le tableau des indigences existantes
      const patientHasIndigence = indigences.some(
        (indigence) => indigence.patient_id === patientId
      );
      return patientHasIndigence;
    },
  },
};
</script> -->

<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Assurance patiente
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
            <h4 class="card-title">Ajouter une assurance patiente</h4>
            <form @submit="addPriseEnCharge" class="forms-sample row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="patient_id">Patient :</label>
                  <select
                    id="patient_id"
                    v-model="patient_id"
                    class="form-control"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.patient_id,
                    }"
                  >
                    <option value="">Sélectionnez un patient</option>
                    <option
                      v-for="patient in patients"
                      :value="patient.id"
                      :key="patient.id"
                    >
                      {{ patient.nom }} {{ patient.prenom }}
                    </option>
                  </select>
                  <div
                    v-if="formErrors.patient_id"
                    class="error-message text-danger"
                  >
                    {{ formErrors.patient_id }}
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="compagnie">Compagnie</label>
                  <select
                    v-model="selectedCompagnie"
                    @change="getAss(selectedCompagnie)"
                    class="form-control mb-3"
                    id="compagnie"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.selectedCompagnie,
                    }"
                  >
                    <option value="">Selectionner une compagnie</option>
                    <option
                      v-for="compagnie in compagnies"
                      :key="compagnie.id"
                      :value="compagnie.id"
                    >
                      {{ compagnie.nom }}
                    </option>
                  </select>
                  <div
                    v-if="formErrors.selectedCompagnie"
                    class="error-message text-danger"
                  >
                    {{ formErrors.selectedCompagnie }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="assurance_id">Assurance :</label>
                  <select
                    id="assurance_id"
                    v-model="selectedAssurance"
                    @change="getPourcentage(selectedAssurance)"
                    class="form-control"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.selectedAssurance,
                    }"
                  >
                    <!-- v-model="assurance_id" -->
                    <option value="">Sélectionnez une assurance</option>
                    <option
                      v-for="assurance in assurances"
                      :value="assurance.id"
                      :key="assurance.id"
                    >
                      {{ assurance.nom }}
                    </option>
                  </select>
                  <div
                    v-if="formErrors.selectedAssurance"
                    class="error-message text-danger"
                  >
                    {{ formErrors.selectedAssurance }}
                  </div>
                </div>
                <!-- jjjjjjjjjjjjjjjj -->

                <div class="form-group">
                  <label for="radio" class="">Statut</label>
                  <div class="p-2">
                    <input
                      type="radio"
                      v-model="statut"
                      value="privé"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-a"
                      checked
                    />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem"
                      >Privé</label
                    >
                    <input
                      type="radio"
                      v-model="statut"
                      value="public"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-b"
                    />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem"
                      >Public</label
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="dateDebut">Date de début</label>
                  <input
                    type="date"
                    v-model="dateDebut"
                    class="form-control"
                    id="dateDebut"
                    placeholder="date_debut"
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
                <div class="form-group">
                  <label for="dateFin">Date de fin</label>
                  <input
                    type="date"
                    v-model="dateFin"
                    class="form-control"
                    id="dateFin"
                    placeholder="date_fin"
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

                <div class="form-group">
                  <label for="pourcentage">Pourcentage en %</label>
                  <input
                    v-model="pourcentage"
                    type="number"
                    class="form-control"
                    id="pourcentage"
                    placeholder="Pourcentage de prise en charge"
                    readonly
                  />
                  <!-- readonly -->
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Observation">Observation</label>
                  <textarea
                    id="observation"
                    v-model="observation"
                    class="form-control"
                    type="text"
                    placeholder="Donnez une observation"
                  ></textarea>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">
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
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import { patientService } from "@/_services/patients_services.js";
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-priseencharge",

  data() {
    return {
      patient_id: "",
      assurance_id: "",
      compagnie_d_assurance_id: "",
      pourcentage: "",
      statut: "privé",
      dateDebut: "",
      compagnies: [],
      selectedCompagnie: "",
      selectedAssurance: "",
      dateFin: "",
      observation: "",
      assurances: [],
      patients: [],
      errorMessage: "",
      formErrors: {},
    };
  },
  mounted() {
    patientService
      .getAllPatients()
      .then((res) => {
        this.patients = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    compagnieService
      .getAllCompagnies()
      .then((res) => {
        this.compagnies = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    cancel() {
      this.$toast.error("Vous avez annulé l'opération en cours !", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/priseencharge/list");
    },
    addPriseEnCharge(event) {
      let isValid = true;
      event.preventDefault();

      this.formErrors = {};
      if (!this.patient_id) {
        this.formErrors.patient_id = "Veuillez sélectionner un patient.";
      }
      if (!this.selectedCompagnie) {
        this.formErrors.selectedCompagnie =
          "Veuillez sélectionner une compagnie.";
      }
      if (!this.selectedAssurance) {
        this.formErrors.selectedAssurance =
          "Veuillez sélectionner une assurance.";
      }
      if (!this.dateDebut) {
        this.formErrors.dateDebut = "Veuillez sélectionner une date de début.";
      }
      if (!this.dateFin) {
        this.formErrors.dateFin = "Veuillez sélectionner une date de fin.";
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      const selectedDateDebut = new Date(this.dateDebut);
      const selectedDateFin = new Date(this.dateFin);

      if (selectedDateFin < selectedDateDebut) {
        this.errorMessage = "La date de fin est antérieure à la date de début.";
        return;
      }

      const priseencharge = {
        patient_id: this.patient_id,
        assurance_id: this.selectedAssurance,
        compagnie_d_assurance_id: this.selectedCompagnie,
        pourcentage: this.pourcentage,
        statut: this.statut,
        datedebut: this.dateDebut,
        datefin: this.dateFin,
        observation: this.observation,
      };

      PriseEnChargePatientService.addPriseEnChargePatient(priseencharge)
        .then((response) => {
          console.log("Prise en charge ajoutée avec succès !");
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
          this.patient_id = "";
          this.selectedAssurance = "";
          this.pourcentage = "";
          this.selectedCompagnie = "";
          this.dateDebut = "";
          this.dateFin = "";
          this.statut = "privé";
          this.observation = "";
          this.$toast.success("Prise en charge ajoutée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/priseencharge/list");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'ajout de la prise en charge :",
            error
          );
        });
    },
    getAss(compagnieId) {
      AssuranceService.getAssurancess(compagnieId)
        .then((response) => {
          this.assurances = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPourcentage(assuranceId) {
      if (assuranceId) {
        AssuranceService.getPourcentageByAssurance(assuranceId)
          .then((response) => {
            this.pourcentage = response.data.pourcentage;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.pourcentage = null;
      }
    },
  },
};
</script>
<style>
.error-message {
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
</style>
