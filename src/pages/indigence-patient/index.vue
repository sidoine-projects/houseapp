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
            Indigence patient
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Liste
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des Indigences Patients</h4>
            <div class="mx-auto mt-5 mb-5">
              <router-link to="/indigence-patient/indigence-patient-create">
                <button type="submit" class="btn btn-success mr-2">
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Patient</th>
                    <th>Age</th>
                    <th>pourcentage (EN %)</th>
                    <th>Date debut</th>
                    <th>Date fin</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(indigencepatient, index) in indigencepatients"
                    :key="indigencepatient.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ getNomPatient(indigencepatient.patient_id) }}
                    </td>
                    <td>{{ getAgePatient(indigencepatient.patient_id) }}</td>
                    <!-- <td>{{ indigencepatient.patient.nom }}</td>
                    <td>{{ indigencepatient.patient.age }}</td> -->
                    <td>
                      {{ indigencepatient.pourcentage }}
                    </td>
                    <td>
                      <!-- {{ indigencepatient.datedebut }} -->
                      {{
                        new Date(indigencepatient.datedebut).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "numeric", year: "numeric" }
                        )
                      }}
                    </td>
                    <td>
                      {{
                        new Date(indigencepatient.datefin).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "numeric", year: "numeric" }
                        )
                      }}
                    </td>

                    <td class="text-center">
                      <!-- <router-link class="" to="/">
                        <b-button
                          size="sm"
                          v-b-tooltip.hover
                          title="Détail"
                          variant="success"
                        >
                          <i
                            class="mdi mdi-file-document text-white menu-icon"
                          ></i>
                        </b-button>
                      </router-link> -->
                      <b-button
                        @click="update(indigencepatient.id)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Modifier"
                        variant="warning"
                      >
                        <i
                          class="mdi mdi mdi-table-edit text-white menu-icon"
                        ></i>
                      </b-button>
                      <b-button
                        @click="supprimer(index)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Supprimer"
                        variant="danger"
                      >
                        <i
                          class="mdi mdi mdi-delete-forever text-white menu-icon"
                        ></i>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="confirmDeleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">
              Confirmation de la suppression
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Êtes-vous sûr de vouloir supprimer cet élément "{{ deleteName }}" ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Annuler
            </button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import "@/assets/vendors/mdi/css/materialdesignicons.min.css";

import $ from "jquery";

import * as JSZip from "../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "../../../node_modules/datatables.net-dt";
import "../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { patientService } from "@/_services/patients_services";
import { IndigencespatientService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

require("datatables.net-dt");

export default {
  name: "list-actes",

  data() {
    return {
      indigencepatients: [],
      table: null,
      id: "",
      patients: [],
      indigencepatient: [],
      deleteIndex: null,
      deleteName: "",
    };
  },

  mounted() {
    // IndigencespatientService.getIndigencespatients(this.id).then((res) => {
    //   this.indigencepatient = res.data;
    //   this.indigencepatient.id = this.id;
    // });

    patientService
      .getAllPatients()
      .then((res) => {
        this.patients = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    IndigencespatientService.getAllIndigencespatients().then((response) => {
      this.indigencepatients = response.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',
          //  dom: 'Bfrtip',
          //  dom: 'lBfrtip',

          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,
          buttons: [
            {
              extend: "csvHtml5", charset: 'utf-8', bom: true // Extend the excel button
            },
            {
              extend: "excelHtml5", charset: 'utf-8', bom: true
            },

            {
              extend: "pdfHtml5", charset: 'utf-8', bom: true
              // className: 'btn btn-primary',
            },

            { extend: "print", charset: 'utf-8', bom: true },
            { extend: "copy", charset: 'utf-8', bom: true },
          ],
        });
      });

      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    });
  },
  methods: {
    // getNomPatient(patientId) {
    //   const patient = this.patients.find((patient) => patient.id === patientId);
    //   return patient ? patient.nom : "";
    // },
    getNomPatient(patientId) {
      const patient = this.patients.find((patient) => patient.id === patientId);
      return patient ? `${patient.nom} ${patient.prenom}` : "";
    },

    getAgePatient(patientId) {
      const patient = this.patients.find((patient) => patient.id === patientId);
      return patient ? patient.age : "";
    },

    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.indigencepatients[index].patient_id;
      $("#confirmDeleteModal").modal("show");
    },

    update(id) {
      this.$router.push("/indigence-patient/update/" + id);
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        IndigencespatientService.deleteIndigencespatient(
          this.indigencepatients[index].id
        )
          .then((res) => {
            this.indigencepatients.splice(index, 1);
            console.log(res);
            // Afficher le toast de succès
            this.$toast.success("suppression avec succès !", {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                // backgroundColor: "#f0f0f0",
                backgroundColor: "red",
                color: "#333",
                fontWeight: "bold",
              },
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.deleteIndex = null;
            this.deleteName = "";
            $("#confirmDeleteModal").modal("hide");
          });
      }
    },
  },
};
</script>

<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
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
