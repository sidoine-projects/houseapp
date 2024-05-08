<template>
  <div class="row">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage
            </a>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            Gestion Carte Sanitaire
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
    <div class="col-lg-12 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Liste des Cartes Sanitaires</h4>
          <div class="mx-auto mt-5 mb-5">
            <router-link to="/eph/create">
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
                  <th>Référence</th>
                  <th>Nom</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Directeur</th>
                  <!-- <th>Adresse</th> -->
                  <!-- <th>Quartier</th> -->
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(centre, index) in centres" :key="centre.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ centre.reference }}</td>
                  <td>{{ centre.nom }}</td>
                  <td>{{ centre.telephone }}</td>
                  <td>{{ centre.email }}</td>
                  <td>{{ centre.directeur }}</td>
                  <!-- <td>{{ centre.adresse }}</td> -->
                  <!-- <td>
                      <div
                        v-for="quartier in quartiers"
                        :key="quartier.id"
                        v-if="quartier.id === centre.quartier_id"
                      >
                        {{ quartier.nom }}
                      </div>
                    </td> -->
                  <td class="text-center">
                    <b-button
                      @click="detail(centre)"
                      size="sm"
                      v-b-tooltip.hover
                      title="Détail"
                      variant="success"
                    >
                      <i class="mdi mdi-file-document text-white menu-icon"></i>
                    </b-button>

                    <b-button
                      @click="update(centre.id)"
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
            <p class="text-center">Informations concernant le centre</p>
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
                  <h5 class="modal-title">Reference</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.reference }}</p>
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
                  <h5 class="modal-title">Directeur :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.directeur }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Département :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.departement_id }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Commune :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.commune_id }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Arrondissement :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.arrondissement_id }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Quartier :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title mx-auto">{{ this.quartier_id }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Type de Centre :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title mx-auto">{{ this.centro }}</p>
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
  </div>
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

import { useToast, POSITION } from "vue-toastification";

import { centreService } from "@/_services";
import { departementService } from "@/_services";
import { communeService } from "@/_services";
import { arrondissementService } from "@/_services";
import { quartierService } from "@/_services";
import { typescentresService } from "@/_services";

require("datatables.net-dt");

export default {
  name: "create-actes-medicaux",

  data() {
    return {
      centres: [],
      sanitaires: null,
      departements: null,
      communes: null,
      arrondissements: null,
      quartiers: null,
      deleteIndex: null,
      deleteName: "",
      table: null,
      nom: "",
      reference: "",
      departement_id: "",
      commune_id: "",
      arrondissement_id: "",
      quartier_id: "",
      telephone: "",
      email: "",
      adresse: "",
      reference: "",
      directeur: "",
      centro: "",
      id: "",
    };
  },

  mounted() {
    centreService.getAllcentres().then((res) => {
      this.centres = res.data.data;
      console.log(this.centres);
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

    departementService
      .getAlldepartements()
      .then((res) => {
        this.departements = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    communeService
      .getAllcommunes()
      .then((res) => {
        this.communes = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    arrondissementService
      .getAllarrondissements()
      .then((res) => {
        this.arrondissements = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    quartierService
      .getAllquartiers()
      .then((res) => {
        this.quartiers = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    typescentresService
      .getAlltypes()
      .then((res) => {
        this.sanitaires = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    detail(centre) {
      this.nom = centre.nom;
      this.prenom = centre.prenom;
      this.age = centre.age;
      this.adresse = centre.adresse;
      this.telephone = centre.telephone;
      this.reference = centre.reference;
      this.email = centre.email;
      this.directeur = centre.directeur;
      this.pays_id = centre.pays_id;
      const departement = this.departements.find(
        (departement) => departement.id === centre.departement_id
      );
      this.departement_id = departement ? departement.nom : "";
      const commune = this.communes.find(
        (commune) => commune.id === centre.commune_id
      );
      this.commune_id = commune ? commune.nom : "";
      const arrondissement = this.arrondissements.find(
        (arrondissement) => arrondissement.id === centre.arrondissement_id
      );
      this.arrondissement_id = arrondissement ? arrondissement.nom : "";
      const quartier = this.quartiers.find(
        (quartier) => quartier.id === centre.quartier_id
      );
      this.quartier_id = quartier ? quartier.nom : "";
      const sanitaire = this.sanitaires.find(
        (sanitaire) => sanitaire.id === centre.idtypecentresanitaire
      );
      this.centro = sanitaire ? sanitaire.nom : "";
      this.urgencecontact = centre.urgencecontact;
      $("#showDetail").modal("show");
    },

    update(id) {
      this.$router.push("/eph/update/" + id);
    },

    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.centres[index].nom;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        centreService
          .deleteCentre(this.centres[index].id)
          .then((res) => {
            this.$toast.success("Le centre sanitaire supprimé avec succès !", {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontWeight: "bold",
              },
            });
            this.centres.splice(index, 1);
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
</style>
