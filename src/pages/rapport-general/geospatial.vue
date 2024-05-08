<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Tableau de bord
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Rapport Géospatial
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
            <h4 class="card-title" style="margin-left: 24px">
              Rapport géospatial
            </h4>

            <div class="row ml-1">
              <div class="form-group col-md-3">
                <select
                  id="departement_id"
                  v-model="departement_id"
                  @change="filtre(departement_id)"
                  class="form-control"
                >
                  <option value="">Département</option>

                  <!-- @change="filtre(idCaissier)" -->
                  <option
                    v-for="departement in departements"
                    :value="departement.id"
                    :key="departement.id"
                  >
                    {{ departement.nom }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <select
                  id="commune_id"
                  v-model="commune_id"
                  @change="filtrecom(commune_id)"
                  class="form-control"
                >
                  <option value="">Commune</option>

                  <!-- @change="filtre(idCaissier)" -->
                  <option
                    v-for="commune in communes"
                    :value="commune.id"
                    :key="commune.id"
                  >
                    {{ commune.nom }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <select
                  id="arrondissement_id"
                  v-model="arrondissement_id"
                  @change="filtrearrondis(arrondissement_id)"
                  class="form-control"
                >
                  <option value="">Arrondissement</option>

                  <!-- @change="filtre(idCaissier)" -->
                  <option
                    v-for="arrondissement in arrondissements"
                    :value="arrondissement.id"
                    :key="arrondissement.id"
                  >
                    {{ arrondissement.nom }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <select
                  id="quartier_id"
                  v-model="quartier_id"
                  @change="filtrequartier(quartier_id)"
                  class="form-control"
                >
                  <option value="">Quartier</option>

                  <!-- @change="filtre(idCaissier)" -->
                  <option
                    v-for="quartier in quartiers"
                    :value="quartier.id"
                    :key="quartier.id"
                  >
                    {{ quartier.nom }}
                  </option>
                </select>
              </div>
            </div>

            <div class="table-responsive">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered table-striped"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Date</th>
                    <th>Auteur</th>
                    <th>Référence</th>
                    <th>Mode</th>
                    <th>Patient</th>
                    <th>Département</th>
                    <th>Commune</th>
                    <th>Arrondissement</th>
                    <th>Quartier</th>
                    <th>Montant versé</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(facture, index) in factures" :key="facture.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formatDate(facture.created_at) }}</td>
                    <td>{{ facture.nomUser }} {{ facture.prenomUser }}</td>
                    <td>{{ facture.reference }}</td>
                    <td>{{ facture.mode_payement }}</td>
                    <td>{{ facture.nom }} {{ facture.prenom }}</td>
                    <td>{{ facture.nomDepartement }}</td>
                    <td>{{ facture.nomCommunes }}</td>
                    <td>{{ facture.nomArrondissement }}</td>
                    <td>{{ facture.nomQuartier }}</td>
                    <td>{{ formatNumber(facture.total_montant) }}</td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>
                    <td style="background-color: rgb(213, 219, 218)"></td>

                    <td
                      colspan="1"
                      class="text-left"
                      style="background-color: rgb(213, 219, 218)"
                    >
                      <strong>Montant Total </strong>
                    </td>
                    <td
                      colspan="1"
                      style="background-color: rgb(213, 219, 218)"
                    >
                      <strong
                        >{{ formatNumber(calculateTotals()) }} FCFA</strong
                      >
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $ from "jquery";

import * as JSZip from "jszip";
window.JSZip = JSZip;
import pdfMake from "../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "datatables.net-dt";
import "../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // très important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // très important pour le modal

import { factureService } from "@/_services/facture_services.js";
import { patientService } from "@/_services";
import { departementService } from "@/_services";
import { communeService } from "@/_services";
import { arrondissementService } from "@/_services";
import { quartierService } from "@/_services";
import { actsService } from "@/_services";
import { centreService } from "@/_services";

require("datatables.net-dt");

export default {
  name: "list_rapport",

  data() {
    return {
      idcentre: "",
      arrondissement_id: "",
      departement_id: "",
      quartier_id: "",
      quartiers: [],
      arrondissements: [],
      commune_id: "",
      centres: [],
      communes: [],
      departements: [],
      factures: [],
      today: null,
      dataTable: null,
      rapportfullDate: "",
      nomDepartementSelectionne: "",
      nomCommuneSelectionne: "",
      nomArrondissementSelectionne: "",
      nomQuartierSelectionne: "",
    };
  },

  mounted() {
    centreService
      .getAllcentres()
      .then((res) => {
        this.centres = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    departementService
      .getAlldepartements()
      .then((res) => {
        this.departements = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    const date = new Date();
    const dateCurrent = date.getDate();
    const monthCurrent = date.getMonth() + 1;
    const yearCurrent = date.getFullYear();

    this.rapportfullDate = `${dateCurrent < 10 ? "0" : ""}${dateCurrent}/${
      monthCurrent < 10 ? "0" : ""
    }${monthCurrent}/${yearCurrent}`;

    patientService.getAllPatients().then((res) => {
      this.patients = res.data.data;
    });

    actsService.getAllActes().then((res) => {
      this.acts = res.data.data;
    });

    this.loadData();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    this.today = `${year}-${month}-${day}`;
  },

  methods: {
    loadData() {
      factureService.getAllRapportGeneral().then((res) => {
        this.factures = res.data.data;
        this.updateDataTable();
      });
    },

    // departe
    filtre(departement_id) {
      communeService
        .getCommunes(departement_id)
        .then((res) => {
          this.communes = res.data;
        })
        .catch((error) => {
          console.error(error);
        });

      // Charger les factures pour le département choisi
      factureService
        .getUserDepart(departement_id)
        .then((res) => {
          this.factures = res.data.data;
          this.updateDataTable();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // commmune
    filtrecom(commune_id) {
      arrondissementService
        .getArrondissements(commune_id)
        .then((res) => {
          this.arrondissements = res.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .catch((error) => {
          console.error(error);
        });

      // Charger les factures pour la commune choisie
      factureService
        .getUserCom(commune_id)
        .then((res) => {
          this.factures = res.data.data;
          this.updateDataTable();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filtrearrondis(arrondissement_id) {
      // Charger les quartiers associées a l'arrondissement  choisi
      quartierService
        .getQuartiers(arrondissement_id)
        .then((res) => {
          this.quartiers = res.data;
        })
        .catch((error) => {
          console.error(error);
        });

      // Charger les factures pour l'arrondissement  choisi
      factureService
        .getUserAron(arrondissement_id)
        .then((res) => {
          this.factures = res.data.data;
          this.updateDataTable();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // charger les factures pour le quartier choisi
    filtrequartier(quartier_id) {
      factureService
        .getUserQuar(quartier_id)
        .then((res) => {
          this.factures = res.data.data;
          this.updateDataTable();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateDataTable() {
      this.$nextTick(() => {
        this.nomDepartementSelectionne = this.departements.find(
          (departement) => departement.id === this.departement_id
        );
        var rapport = this.nomDepartementSelectionne;

        this.nomCommuneSelectionne = this.communes.find(
          (commune) => commune.id === this.commune_id
        );
        var rapport1 = this.nomCommuneSelectionne;

        this.nomArrondissementSelectionne = this.arrondissements.find(
          (arrondissement) => arrondissement.id === this.arrondissement_id
        );
        var rapport2 = this.nomArrondissementSelectionne;

        this.nomQuartierSelectionne = this.quartiers.find(
          (quartier) => quartier.id === this.quartier_id
        );
        var rapport3 = this.nomQuartierSelectionne;

        var rapportText = "Rapport : ";

        if (rapport) {
          rapportText += `Département : ${rapport.nom}`;
        }

        if (rapport1) {
          if (rapport) {
            rapportText += " - ";
          }
          rapportText += `Commune : ${rapport1.nom}`;

          if (rapport2) {
            rapportText += ` - Arrondissement : ${rapport2.nom}`;
          }
          if (rapport3) {
            rapportText += ` - Quartier : ${rapport3.nom}`;
          }
        }

        if (this.dataTable) {
          this.dataTable.destroy();
        }

        this.dataTable = $(this.$refs.myTable).DataTable({
          dom:
            '<"row mb-3 ml-4"<"col-md-12 mx-auto d-flex"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',
          pageLength: 10,
          language: FrenchTranslation,

          buttons: [
            {
              extend: "csvHtml5",
              charset: "utf-8",
              bom: true,
              filename: "Rappor" + this.rapportfullDate,
              footer: true,
              title: rapportText,
            },
            {
              extend: "excelHtml5",
              charset: "utf-8",
              bom: true,
              filename: "Rapport" + this.rapportfullDate,
              footer: true,
              title: rapportText,
            },

            {
              extend: "pdfHtml5",
              charset: "utf-8",
              bom: true,
              footer: true,
              orientation: "landscape",
              filename: "Rapport" + this.rapportfullDate,
              title: rapportText,
              exportOptions: {
                columns: ":visible",
              },

              customize: function (doc) {
                var now = new Date();
                var day = String(now.getDate()).padStart(2, "0");
                var month = String(now.getMonth() + 1).padStart(2, "0");
                var year = now.getFullYear();
                var jsDate = day + "/" + month + "/" + year;

                doc["header"] = function () {
                  return {
                    columns: [
                      {
                        stack: [
                          {
                            canvas: [
                              {
                                type: "rect",
                                x: 0,
                                y: 0,
                                w: 800,
                                h: 30,
                                color: "#2D4154",
                              },
                            ],
                          },
                          {
                            absolutePosition: { x: 0, y: 16 },
                            alignment: "center",
                            fontSize: 14,
                            text: rapportText,

                            color: "white",
                          },
                        ],
                        width: "auto",
                      },
                    ],
                    margin: [40, 10],
                  };
                };

                doc["footer"] = function (page, pages) {
                  return {
                    columns: [
                      {
                        alignment: "left",
                        text: ["Crée le: ", { text: jsDate.toString() }],
                      },
                      {
                        alignment: "right",
                        text: [
                          "page ",
                          { text: page.toString() },
                          "/",
                          { text: pages.toString() },
                        ],
                      },
                    ],
                    margin: 20,
                  };
                };

                doc.content[0].text = [
                  {
                    text: "Date du jour: ",
                    decoration: "underline",
                    bold: true,
                  },
                  "" + jsDate.toString(),
                ];
                doc.content[0].alignment = "left";
                doc.content[0].fontSize = 13;
                doc.content[0].margin = [0, 20, 0, 0];

                const columnCount = doc.content[1].table.body[0].length;
                doc.content[1].margin = [0, 20, 0, 0];
                const columnWidth = 100 / columnCount + "%";
                doc.content[1].table.widths = [
                  "1%",
                  "10%",
                  "10%",
                  "13%",
                  "6%",
                  "10%",
                  "11%",

                  "9%",
                  "12%",
                  "10%",
                  "8%",
                ];
                doc.content[1].table.alignment = "center";

                doc.content[1].table.body.forEach((row) => {
                  row.forEach((cell) => {
                    cell.border = [1, 1, 1, 1];
                  });
                });

                doc.content[1].table.body[0].forEach((cell) => {
                  cell.alignment = "left";
                  cell.bold = true;
                });

                doc.content[1].textDecoration = "underline";
              },
            },

            {
              extend: "print",
              charset: "utf-8",
              bom: true,
              filename: "Rapport" + this.rapportfullDate,
              footer: true,
              title: rapportText,
            },
            {
              extend: "copy",
              charset: "utf-8",
              bom: true,
              filename: "Rapport" + this.rapportfullDate,
              footer: true,
              title: rapportText,
            },
          ],
          columnDefs: [
            {
              targets: -1,
              searchable: false,
              orderable: false,
            },
          ],
        });

        this.dataTable.clear();
        this.factures.forEach((facture, index) => {
          const rowData = [
            index + 1,
            this.formatDate(facture.created_at),
            facture.nomUser + " " + facture.prenomUser,
            facture.reference,
            facture.mode_payement,
            facture.nom + " " + facture.prenom,
            facture.nomDepartement,
            facture.nomCommunes,
            facture.nomArrondissement,
            facture.nomQuartier,
            this.formatNumber(facture.total_montant),
          ];
          this.dataTable.row.add(rowData);
        });

        this.dataTable.draw();

        const totalMontant = this.calculateTotals();
        $(this.$refs.myTable)
          .find("tfoot td:last-child")
          .html(`<strong>${this.formatNumber(totalMontant)} FCFA</strong>`);
      });
    },

    calculateTotals() {
      let totalMontant = 0;
      this.factures.forEach((facture) => {
        totalMontant += parseFloat(facture.total_montant);
      });

      return totalMontant;
    },

    formatDate(date) {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(date).toLocaleString("fr-FR", options);
    },

    formatNumber(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style>
/* Styles spécifiques au composant */
</style>

<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

select {
  cursor: pointer;
  height: 43px !important;
}
</style>
