<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Indigence Patient
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Ajouter une indigence pour un patient</h4>

            <fieldset class="scheduler-border col-md-12">
              <form @submit.prevent="addIndigencePatient" class="row">
                <div class="control-group p-2 col-md-6">
                  <div class="form-group controls">
                    <label for="selectedPatient">Sélectionner un patient</label>
                    <select
                      class="form-control mb-3"
                      id="selectedPatient"
                      v-model="selectedPatient"
                      @input="clearError('selectedPatient')"
                      @change="detail"
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
                      v-if="formErrors.selectedPatient"
                      class="error-message text-danger"
                    >
                      {{ formErrors.selectedPatient }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="age">Age</label>
                    <input
                      readonly
                      type="number"
                      class="form-control"
                      id="age"
                      placeholder="Age"
                      v-model="patient.age"
                    />
                    <div
                      v-if="formErrors.age"
                      class="error-message text-danger"
                    >
                      {{ formErrors.age }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="datedebut">Date debut</label>
                    <input
                      type="date"
                      class="form-control"
                      id="datedebut"
                      placeholder="date debut"
                      v-model="datedebut"
                      @input="clearError('datedebut')"
                    />
                    <div
                      v-if="formErrors.datedebut"
                      class="error-message text-danger"
                    >
                      {{ formErrors.datedebut }}
                    </div>
                  </div>
                </div>
                <div class="control-group p-2 col-md-6">
                  <div class="form-group">
                    <label for="telephone">Téléphone</label>
                    <input
                      readonly
                      type="text"
                      class="form-control"
                      id="telephone"
                      v-model="patient.telephone"
                      @input="clearError('telephone')"
                    />
                  </div>

                  <div class="form-group">
                    <label for="pourcentageIndigence">pourcentage (En %)</label>
                    <input
                      readonly
                      type="number"
                      class="form-control"
                      id="pourcentageIndigence"
                      v-model="pourcentageIndigence"
                      @input="clearError('pourcentageIndigence')"
                    />
                    <div
                      v-if="formErrors.pourcentageIndigence"
                      class="error-message text-danger"
                    >
                      {{ formErrors.pourcentageIndigence }}
                    </div>
                    <div v-if="errorM" class="error-message text-danger">
                      {{ errorM }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="datefin">Date fin</label>
                    <input
                      type="date"
                      class="form-control"
                      id="datefin"
                      placeholder="date fin"
                      v-model="datefin"
                      @input="clearError('datefin')"
                    />
                    <div
                      v-if="formErrors.datefin"
                      class="error-message text-danger"
                    >
                      {{ formErrors.datefin }}
                    </div>
                    <div v-if="errorMessage" class="error-message text-danger">
                      {{ errorMessage }}
                    </div>
                  </div>
                </div>

                <div class="mx-auto text-center">
                  <button type="submit" class="btn btn-gradient-success mr-2">
                    Valider
                  </button>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { patientService } from "@/_services/patients_services";
import { IndigencespatientService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";

export default {
  data() {
    return {
      selectedPatient: "",
      patients: [], // Remplir cette liste avec les patients disponibles
      patient: {},
      pourcentageIndigence: "",
      datedebut: "",
      datefin: "",
      patient_id: "",
      pourcentage: "",
      errorMessage: "",
      errorM: "",
      assurances: "",
      pourcentageAssurance: "",
      formErrors: {},
    };
  },
  mounted() {
    this.fetchPatients();
  },
  methods: {
    checkAssurancePatient() {
      console.log(this.selectedPatient);

      PriseEnChargePatientService.getAllPriseenchargePatient()
        .then((res) => {
          this.assurances = res.data.data;

          const patientAssurance = this.assurances.find(
            (assurance) => assurance.patient_id === this.selectedPatient
          );

          if (patientAssurance) {
            this.pourcentageAssurance = patientAssurance.pourcentage;
          } else {
            this.pourcentageAssurance = null;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchPatients() {
      patientService
        .getAllPatients()
        .then((res) => {
          this.patients = res.data.data;
          console.log(this.patients);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addIndigencePatient(event) {
      event.preventDefault();
      const selectedDatedebut = new Date(this.datedebut);
      const selectedDatefin = new Date(this.datefin);

      this.formErrors = {};

      if (!this.selectedPatient) {
        this.formErrors.selectedPatient = "Veuillez sélectionner un patient.";
      }
      // if (!this.patient.age) {
      //   this.formErrors.age = "Veuillez renseigner l'âge du patient.";
      // }
      if (!this.datedebut) {
        this.formErrors.datedebut = "Veuillez renseigner la date de début.";
      }
      if (!this.datefin) {
        this.formErrors.datefin = "Veuillez renseigner la date de fin.";
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      if (selectedDatefin <= selectedDatedebut) {
        this.formErrors.datefin =
          "La date de fin est antérieure à la date de début.";
        return;
      }

      if (this.pourcentageAssurance + this.pourcentageIndigence > 100) {
        this.$toast.error(
          "Impossible d'enregistrer une indigence pour ce patient ! Ce patient a déjà une Assurance de " +
            this.pourcentageAssurance +
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

      const indigencePatient = {
        patient_id: this.selectedPatient,
        pourcentage: this.pourcentageIndigence,
        datedebut: this.datedebut,
        datefin: this.datefin,
      };
      IndigencespatientService.addIndigencespatients(indigencePatient)
        .then((res) => {
          this.$router.push("/indigence-patient/list-indigence-patient");
          console.log(res.data); // Réponse du serveur
          this.selectedPatient = "";
          this.patient = {};
          this.pourcentageIndigence = "";
          this.datedebut = "";
          this.datefin = "";
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
        })
        .catch((error) => {
          console.error(error);
        });
    },

    detail() {
      this.checkAssurancePatient();

      patientService
        .getPatient(this.selectedPatient)
        .then((res) => {
          this.patient = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
      IndigencespatientService.getPourcentage(this.selectedPatient)
        .then((res) => {
          this.pourcentageIndigence = res.data.data;
          this.errorM = "";
          if (this.pourcentageIndigence == 0) {
            this.errorM =
              "Impossible d'ajouter une indigence pour ce patient, car l'âge du patient ne figure pas dans l'intervalle d'âge prédéfini";
          }
          console.log(this.pourcentageIndigence);
          console.log(this.pourcentageAssurance + this.pourcentageIndigence);
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
