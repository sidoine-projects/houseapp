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
            Indigence Patient
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier une indigence pour un patient</h4>

            <fieldset class="scheduler-border col-md-12">
              <form @submit.prevent="update" class="row">
                <div class="control-group p-2 col-md-6">
                  <div class="form-group controls">
                    <label for="selectedPatient">Sélectionner un patient</label>
                    <select
                      class="form-control mb-3"
                      id="selectedPatient"
                      v-model="selectedPatient"
                      @change="fetchPatientDetails"
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
                    <label for="age">Age</label>
                    <input
                      readonly
                      type="number"
                      class="form-control"
                      id="age"
                      placeholder="Age"
                      v-model="patient.age"
                    />
                  </div>

                  <div class="form-group">
                    <label for="datedebut">Date debut</label>
                    <input
                      type="date"
                      class="form-control"
                      id="datedebut"
                      placeholder="date debut"
                      v-model="datedebut"
                    />
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
                    />
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
                    />
                    <div v-if="errorMessage" class="error-message text-danger">
                      {{ errorMessage }}
                    </div>
                  </div>
                </div>

                <div class="mx-auto text-center">
                  <button type="submit" class="btn btn-gradient-success mr-2">
                    Modifier
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

export default {
  name: "update",
  props: ["id"],
  data() {
    return {
      selectedPatient: "",
      patients: [],
      patient: {},
      pourcentageIndigence: "",
      datedebut: "",
      datefin: "",
      errorMessage: "",

      errorM: "",
    };
  },
  mounted() {
    this.fetchPatients();
    this.fetchIndigencePatient();
  },
  methods: {
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
    fetchIndigencePatient() {
      IndigencespatientService.getIndigencespatients(this.id)
        .then((res) => {
          this.selectedPatient = res.data.data.patient_id;
          this.datedebut = res.data.data.datedebut;
          this.datefin = res.data.data.datefin;

          this.fetchPatientDetails();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchPatientDetails() {
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
            this.errorM = "Impossible d'ajouter une indigence pour ce patient.";
          }
          console.log(this.pourcentageIndigence);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    update() {
      const selectedDatedebut = new Date(this.datedebut);
      const selectedDatefin = new Date(this.datefin);
      if (selectedDatefin <= selectedDatedebut) {
        this.errorMessage = "La date de fin est antérieure à la date de début.";
        return;
      }
      else {
        console.log(this.errorMessage);
        this.errorMessage = "";
      }
      const indigencespatient = {
        id:this.id,
        // indigence_id: "",
        pourcentage: this.pourcentageIndigence,
        patient_id: this.selectedPatient,
        datedebut: this.datedebut,
        datefin: this.datefin,
      };

      IndigencespatientService.updateIndigencespatient(indigencespatient)
        .then((res) => {
          this.$router.push("/indigence-patient/list-indigence-patient");
          console.log(res.data.data);
          this.selectedPatient = "";
          this.patient = {};
          this.pourcentageIndigence = "";
          this.datedebut = "";
          this.datefin = "";
          this.$toast.success("Modification effectuée avec succès !", {
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
