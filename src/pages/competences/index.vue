<template>
  <section class="tables container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="card">
          <div class="">
            <div
              class="d-flex justify-content-between align-items-center col-md-12 mt-3 mb-3"
            >
              <!-- Flexbox pour aligner les éléments -->
              <h6 class="mb-0 text-info">LISTE DES COMPETENCES PROFESSIONNELLES</h6>
              <!-- Texte du h4 -->
              <button class="btn btn-info">
                <router-link to="/competences/create">
                  AJOUTER UNE COMPETENCE
                </router-link>
              </button>
              <!-- Bouton Retour -->
            </div>
            <hr class="row" />

            <div class="table-responsive mt-4">
              <table id="order-listing" ref="myTable" class="table">
                <thead class="">
                  <tr class="">
                    <th>#</th>
                    <th>Niveau d'étude</th>
                    <th>Prénom(s)</th>
                    <th>Age</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th class="">Sexe</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="">1sdcsdsd</td>
                    <td>TICs, Multimédia et Services informatiques</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td class="text-right">
                      <div class="dropdown dropleft">
                        <button
                          class="btn btn-transparent p-0 float-right"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            class="mdi mdi-dots-vertical"
                            style="color: rgb(40, 78, 174); font-size: 20px"
                          >
                          </i>
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a class="dropdown-item" href="#">
                            <span class="text-left">
                              <i
                                class="mdi mdi-pen"
                                style="
                                  color: rgb(220, 170, 24);
                                  font-size: 20px;
                                "
                              >
                              </i>
                            </span>

                            <span class="text-left pl-4"> Modifier</span>
                          </a>
                          <a class="dropdown-item" href="#">
                            <span class="text-left">
                              <i
                                class="mdi mdi-file-eye-outline"
                                style="color: indigo; font-size: 20px"
                              >
                              </i>
                            </span>

                            <span
                              class="text-left pl-4"
                              style="text-align: left"
                            >
                              Voir le fichier</span
                            >
                          </a>
                          <a class="dropdown-item" href="#">
                            <span class="text-left">
                              <i
                                class="mdi mdi-file-restore"
                                style="color: indigo; font-size: 20px"
                              >
                              </i>
                            </span>

                            <span class="text-left pl-4"> Voir le fichier</span>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                      <div class="dropdown dropleft float-right">
                        <button
                          class="btn btn-transparent p-0"
                          style="margin-left"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            class="mdi mdi-dots-vertical"
                            style="color: rgb(40, 78, 174); font-size: 20px"
                          >
                          </i>
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a class="dropdown-item" href="#" variant="info"
                            >Action</a
                          >
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#"
                            >Something else here</a
                          >
                        </div>
                      </div>
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
      id="showDetail"
      tabindex="-1"
      role="dialog"
      aria-labelledby="showDetailLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="alert alert-success" role="alert">
            <p class="text-center">
              Informations concernant le patient {{ this.id }}
            </p>
          </div>
          <div class="modal-body">
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Nom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.nom }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Prénom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.prenom }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Age :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.age }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Adresse :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.adresse }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Email :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.email }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Téléphone :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.telephone }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Numéro Whatsapp :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.whatsapp }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Numéro d'Urgence :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.urgencecontact }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Profession :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.profession }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Sexe :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.sexe }}</p>
                </div>
              </div>
            </div>
            <!-- <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Centre Sanitaire :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">
                    {{ this.centresanitaires_id }}
                  </p>
                </div>
              </div>
            </div> -->
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Autres Informations :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title mx-auto">{{ this.autre }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="mx-auto">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Fermer
              </button>
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

require("datatables.net-dt");

import { patientService } from "@/_services";
import { paysService } from "@/_services";

export default {
  name: "patients",
  data() {
    return {
      patients: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      nom: "",
      prenom: "",
      age: "",
      adresse: "",
      pays_id: "",
      departement_id: "",
      commune_id: "",
      arrondissement_id: "",
      quartier_id: "",
      telephone: "",
      email: "",
      whatsapp: "",
      profession: "",
      sexe: "",
      urgencecontact: "",
      autre: "",
      id: "",
      // nom, prenom, age, adresse, telephone, email, whatsapp, profession, sexe, urgencecontact, autre,
    };
  },
  mounted() {
    patientService.getPatient(this.id).then((res) => {
      this.patient = res.data.data;
      this.patient.id = this.id;
    });

    patientService.getAllPatients().then((res) => {
      this.patients = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',

          // dom: 'Bfrtip',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,

          buttons: [
            {
              extend: "csvHtml5",
              charset: "utf-8",
              bom: true, // Extend the excel button
            },
            {
              extend: "excelHtml5",
              charset: "utf-8",
              bom: true,
            },
            {
              extend: "pdfHtml5",
              charset: "utf-8",
              bom: true,
              // className: 'btn btn-primary',
            },
            { extend: "print", charset: "utf-8", bom: true },
            { extend: "copy", charset: "utf-8", bom: true },
          ],
        });
      });
      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    });
  },
  methods: {
    detail(patient) {
      this.id = patient.id;
      this.nom = patient.nom;
      this.prenom = patient.prenom;
      this.age = patient.age;
      this.adresse = patient.adresse;
      this.telephone = patient.telephone;
      this.email = patient.email;
      this.whatsapp = patient.whatsapp;
      this.profession = patient.profession;
      this.sexe = patient.sexe;
      this.pays_id = patient.pays_id;
      this.departement_id = patient.departement_id;
      this.commune_id = patient.commune_id;
      this.arrondissement_id = patient.arrondissement_id;
      this.quartier_id = patient.quartier_id;
      this.urgencecontact = patient.urgencecontact;
      this.autre = patient.autre;
      $("#showDetail").modal("show");
    },
    update(id) {
      this.$router.push("/patients/update/" + id);
    },
    // supprimer(index) {
    //   console.log(index);
    //   patientService
    //     .deletePatient(this.patients[index].id)
    //     .then((res) => {
    //       this.patients.splice(index, 1);
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName =
        this.patients[index].nom + " " + this.patients[index].prenom;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;

      if (index !== null) {
        patientService
          .deletePatient(this.patients[index].id)
          .then((res) => {
            this.patients.splice(index, 1);
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
@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

a .dropdown-item span {
  color: #707377;
  font-weight: 600 !important;
}

.table td {
  font-size: 13px !important; /* Changer la taille du texte */
  font-weight: 600 !important;
  color: #707377;
  padding: 0px 20px !important;
}
.table th,
.table td {
  border-right: none !important;
  text-align: left;
}
/* Ajouter une bordure en bas pour les cellules dans thead */
.table thead th {
  border-bottom: 1px solid #dee2e6 !important;
  color: rgb(70, 77, 85);
  font-weight: bold !important;
  padding: 3px 20px 8px !important;
  font-size: 13px !important; /* Changer la taille du texte */
}
.table tbody th,
.table tbody td {
  border-bottom: 1px solid #dee2e6 !important;
}

#confirmDeleteModal .modal-dialog {
  max-width: 500px;
  border-radius: 10px;
}

.btn-transparent {
  background-color: transparent !important; /* Rendre le fond du bouton transparent */
  box-shadow: none !important; /* Supprimer l'ombre du bouton */
}

#confirmDeleteModal .modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

#confirmDeleteModal .modal-header {
  background-color: #f8f9fa;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}

#confirmDeleteModal .close {
  font-size: 24px;
  color: #6c757d;
}

#confirmDeleteModal .alert {
  border-radius: 10px;
}

#confirmDeleteModal .alert p {
  margin-bottom: 0;
  font-weight: bold;
}

#confirmDeleteModal .modal-body {
  padding: 20px;
}

#confirmDeleteModal .modal-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

#confirmDeleteModal .modal-value {
  margin-bottom: 10px;
  font-size: 16px;
}

#confirmDeleteModal .modal-footer {
  border-top: none;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

#confirmDeleteModal .btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

#confirmDeleteModal .btn-danger:hover,
#confirmDeleteModal .btn-danger:focus {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
