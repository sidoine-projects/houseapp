<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Paramétrage
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Assurance patiente
          </li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">
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
                  <label for="patient_id">Patient<span style="color: red; font-weight: bold !important">*</span>
                  </label>

                  <select id="patient_id" v-model="patient_id" @change="getPourcentageIndigence()" class="form-control"
                    @input="clearError('patient_id')" :class="{
                      'form-control': true,
                      'is-invalid': formErrors.patient_id,
                    }">
                    <option value="">Sélectionnez un patient</option>
                    <option v-for="patient in patients" :value="patient.id" :key="patient.id">
                      {{ patient.nom }} {{ patient.prenom }}
                    </option>
                  </select>
                  <div v-if="formErrors.patient_id" class="error-message text-danger">
                    {{ formErrors.patient_id }}
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="compagnie">Compagnie <span style="color: red">*</span></label>
                  <select v-model="selectedCompagnie" @change="getAss(selectedCompagnie)" class="form-control mb-3"
                    @input="clearError('selectedCompagnie')" id="compagnie" :class="{
                      'form-control': true,
                      'is-invalid': formErrors.selectedCompagnie,
                    }">
                    <option value="">Selectionner une compagnie</option>
                    <option v-for="compagnie in compagnies" :key="compagnie.id" :value="compagnie.id">
                      {{ compagnie.nom }}
                    </option>
                  </select>
                  <div v-if="formErrors.selectedCompagnie" class="error-message text-danger">
                    {{ formErrors.selectedCompagnie }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="assurance_id">Assurance <span style="color: red">*</span></label>
                  <select id="assurance_id" v-model="selectedAssurance" @input="clearError('selectedAssurance')"
                    @change="getPourcentage(selectedAssurance)" class="form-control" :class="{
                      'form-control': true,
                      'is-invalid': formErrors.selectedAssurance,
                    }">
                    <option value="">Sélectionnez une assurance</option>
                    <option v-for="assurance in assurances" :value="assurance.id" :key="assurance.id">
                      {{ assurance.nom }}
                    </option>
                  </select>
                  <div v-if="formErrors.selectedAssurance" class="error-message text-danger">
                    {{ formErrors.selectedAssurance }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="radio" class="">Statut <span style="color: red">*</span></label>
                  <div class="p-2">
                    <input type="radio" v-model="statut" value="privé" class="demo6 mx-auto form-check-input" id="demo6-a"
                      @input="clearError('statut')" checked />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem">Privé</label>
                    <input type="radio" v-model="statut" value="public" class="demo6 mx-auto form-check-input"
                      id="demo6-b" />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem">Public</label>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="dateDebut">Date de début <span style="color: red">*</span></label>
                  <input type="date" v-model="dateDebut" @input="clearError('dateDebut')" class="form-control"
                    id="dateDebut" placeholder="date_debut" :class="{
                      'form-control': true,
                      'is-invalid': formErrors.dateDebut,
                    }" />
                  <div v-if="formErrors.dateDebut" class="error-message text-danger">
                    {{ formErrors.dateDebut }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="dateFin">Date de fin <span style="color: red">*</span></label>
                  <input type="date" v-model="dateFin" @input="clearError('dateFin')" class="form-control" id="dateFin"
                    placeholder="date_fin" :class="{
                      'form-control': true,
                      'is-invalid': formErrors.dateFin,
                    }" />
                  <div v-if="formErrors.dateFin" class="error-message text-danger">
                    {{ formErrors.dateFin }}
                  </div>
                  <div v-if="errorMessage" class="error-message text-danger">
                    {{ errorMessage }}
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="pourcentage">Pourcentage en % </label>
                      <input v-model="pourcentage" @input="clearError('observation')" type="number" class="form-control"
                        id="pourcentage" placeholder="Pourcentage de prise en charge" readonly />
                    </div>
                    <div class="col-md-6">
                      <label for="numero_assurance">Numéro d'assurance </label>
                      <input v-model="numero_assurance" type="text" class="form-control" id="numero_assurance"
                        placeholder="Numéro d'assurance" readonly />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Observation">Observation</label>
                  <textarea id="observation" v-model="observation" class="form-control" type="text"
                    placeholder="Donnez une observation"></textarea>
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
import { IndigencespatientService } from "@/_services";
export default {
  name: "create-priseencharge",

  data() {
    return {
      patient_id: "",
      assurance_id: "",
      compagnie_d_assurance_id: "",
      pourcentage: "",
      numero_assurance: "",
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
      pourcentageIndigence: "",
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

      if (this.pourcentage + this.pourcentageIndigence > 100) {
        this.$toast.error(
          "Veuillez revoir le pourcentage du patient ! Ce patient a déjà une indigence de " +
          this.pourcentageIndigence +
          "%",
          {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          }
        );
        return;
      }

      const priseencharge = {
        patient_id: this.patient_id,
        assurance_id: this.selectedAssurance,
        compagnie_d_assurance_id: this.selectedCompagnie,
        pourcentage: this.pourcentage,
        numero_assurance: this.numero_assurance,
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
          numero_assurance;
          this.pourcentage = "";
          this.numero_assurance = "";
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
            this.numero_assurance = response.data.numero_assurance;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.pourcentage = null;
        this.numero_assurance = null;
      }
    },
    getPourcentageIndigence() {
      IndigencespatientService.getPourcentage(this.patient_id)
        .then((res) => {
          this.pourcentageIndigence = res.data.data;
          this.errorM = "";
          // console.log(res.data.success);
          if (this.pourcentageIndigence == 0) {
            this.errorM = "Impossible d'ajouter une indigence pour ce patient.";
          }
        })

        .catch((error) => {
          console.error(error);
        });
    },
    clearError(field) {
      this.formErrors[field] = "";
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

input[type="radio"].demo6+label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6+label::before,
input[type="radio"].demo6+label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6+label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6+label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked+label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2+label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked+label::before {
  background-color: #45c28e;
}
</style>
