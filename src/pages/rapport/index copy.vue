<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Tableau de board
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Rapport</li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">
            Liste
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Rapport</h4>
            <form class="forms-sample mt-3 col-md-12 mt-4" @submit.prevent="filtre">
              <div class="row">
                <div class="form-group col-md-5">
                  <label for="exampleInputUsername1">Date Début</label>
                  <input type="date" class="form-control" id="date_debut" :max="today" v-model="startDate"
                    name="date_debut" />
                </div>
                <div class="form-group col-md-5">
                  <label for="exampleInputUsername1">Date Fin</label>
                  <input type="date" class="form-control" id="date_fin" v-model="endDate" name="date_fin" :max="today" />
                </div>
                <div class="form-group mx-auto mt-4">
                  <button type="submit" class="btn btn-gradient-success">Filtrer</button>
                </div>
              </div>
            </form>
            <div class="table-responsive ">
              <table id="order-listing" ref="myTable" class="table table-bordered  table-striped">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Date</th>
                    <th>Référence</th>
                    <th>Mode</th>
                    <th>Patient</th>
                    <th>Montant versé</th>

                    <!-- <th class="text-center">Actions</th> -->
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="(facture, index) in factures" :key="facture.id">

                    <td>{{ index + 1 }}</td>
                    <td>{{ formatDate(facture.created_at) }}</td>
                    <td>{{ facture.reference }}</td>
                    <td>{{ facture.mode_payement }}</td>
                    <td>{{ facture.nom }} {{ facture.prenom }}</td>
                    <td>{{ formatNumber(facture.total_montant) }} </td>

                  </tr>

                </tbody>

                <tfoot>
                  <tr>
                    <td style="background-color: rgb(213, 219, 218); "></td>
                    <td style="background-color: rgb(213, 219, 218); "></td>
                    <td style="background-color: rgb(213, 219, 218); "></td>
                    <td style="background-color: rgb(213, 219, 218); "></td>
                    <td colspan="1" class="text-left" style="background-color: rgb(213, 219, 218); ">
                      <strong>Montant Total </strong>
                    </td>
                    <td colspan="1" style="background-color: rgb(213, 219, 218); ">
                      <strong>{{ formatNumber(calculateTotals()) }} FCFA</strong>
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
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services/compagnie_services.js";
import { factureService } from "@/_services/facture_services.js";
import { patientService } from "@/_services";
import { actsService } from "@/_services";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import QRCode from "qrcode";

require("datatables.net-dt");

export default {
  name: "list rapport ",

  data() {
    return {
      factures: [],
      today: null,
      table: null,
      factureDetails: [],
      nom: "",
      patientId: "",
      patient: {},
      patients: [],
      pourcentage: "",
      id: "",
      assurance: [],
      date: "",
      nom: "",
      prenom: "",
      code: "",
      autre: "",
      prix: "",
      quantite: "",
      montant: "",
      mode_payement: "",
      mode_payement_id: "",
      total_montant: "",
      payement_id: "",
      nomActeResult: "",
      nomsActes: [],
      acts: [],
      assurancePourcentage: null,
      pourcentageIndigence: null,
      totalPriseEncharge: "",
      difference: "",
      qrCodeUrl: "",
      reference: "",
      montantPaye: "",
      startDate: "",
      endDate: "",
      totals: [],
      rapportfullDate: "",


    };
  },

  mounted() {
    // this.today = new Date();

    const date = new Date();
    const dateCurrent = date.getDate(); // Obtient le jour du mois (1-31)
    const monthCurrent = date.getMonth() + 1; // Obtient le mois (0-11), ajoutez 1 pour obtenir le mois réel (1-12)
    const yearCurrent = date.getFullYear(); // Obtient l'année (par exemple, 2023)

    // Format de la date complète au format "dd/mm/yyyy"monthCurrent
    this.rapportfullDate = `${dateCurrent < 10 ? '0' : ''}${dateCurrent}/${month < 10 ? '0' : ''}${monthCurrent}/${yearCurrent}`;


    patientService.getAllPatients().then((res) => {
      this.patients = res.data.data;
      // console.log(this.patients);
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
      factureService.getAllFatures().then((res) => {
        this.factures = res.data.data;
        this.updateDataTable();
      });
    },

    filtre() {
      if (!this.startDate || !this.endDate) {
        this.$toast.error(
          "Veuillez choisir une periode pour filtrer!",
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
        return;
      }

      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      if (startDate > endDate) {

        this.$toast.error("La date de début doit être antérieure ou égale à la date de fin !", {
          position: "top-right",
          timeout: 3000,
          style: {
            background: "#ff0000", // Couleur de fond rouge pour l'erreur
            color: "#fff", // Couleur du texte
            fontWeight: "bold",
          },
        });
        return;
      }

      const formData = {
        date_debut: this.startDate,
        date_fin: this.endDate,
      };

      factureService
        .filtreDate(formData)
        .then((res) => {
          console.log(res.data.data);
          this.factures = res.data.data;

          this.updateDataTable();
        })

        .catch((error) => {
          console.error(error);
        });
    },

    updateDataTable() {
      this.$nextTick(() => {
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
            { extend: "csvHtml5", charset: 'utf-8', bom: true },
            { extend: "excelHtml5", charset: 'utf-8', bom: true },

            {

              extend: "pdfHtml5", charset: 'utf-8', bom: true,
              footer: true,

              orientation: 'landscape',
              // download: 'open',
              filename: "Rapport_hôpital_" + this.rapportfullDate,
              // orientation: 'landscape', //portrait

              // title: "Rapport_hôpital_" + this.rapportfullDate, // Titre personnalisé de l'exportation
              // title: ' ', // Titre personnalisé de l'exportation
              title: ' ', // Titre personnalisé de l'exportation
              exportOptions: {
                columns: ':visible', // Exporter toutes les colonnes visibles
              },



              customize: function (doc) {

                //Create a date string that we use in the footer. Format is dd-mm-yyyy
                var now = new Date();
                var jsDate = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();




                doc['header'] = (function () {
                  return {

                    columns: [
                      {
                        stack: [
                          {
                            canvas: [{ type: 'rect', x: 0, y: 0, w: 820, h: 30, color: '#2D4154' }]
                          },
                          {
                            absolutePosition: { x: 0, y: 16 }, // Adjust the 'y' coordinate to center the text vertically
                            alignment: 'center',
                            fontSize: 14,
                            text: 'Rapport de l\'hôpital',
                            width: 820, // Adjust the width to match the rectangle's width
                            color: 'white' // Add the 'color' property with the value 'white'

                          }
                        ],
                        width: 'auto'
                        
                      }
                    ],
                    margin: [10, 10, 10, 0] // Adjust top margin for header



                  };


                });



                doc['footer'] = (function (page, pages) {
                  return {
                    columns: [
                      {
                        alignment: 'left',
                        text: ['Crée le: ', { text: jsDate.toString() }]
                      },
                      {
                        alignment: 'right',
                        text: ['page ', { text: page.toString() }, '/', { text: pages.toString() }]
                      }
                    ],
                    margin: 20
                  };
                });

                doc.title = "Rapport de l\'hôpital " + jsDate.toString();




                // doc.content[0].background = '#A5269E'; // Couleur de fond du titre

                doc.content[0].width = '80%'; // Réinitialiser la largeur du titre pour laisser le contenu déterminer la largeur


                // doc.content.unshift({ text: "messageTop", alignment: 'center', margin: [0, 0, 0, 10] });

                // Obtenir le nombre de colonnes du DataTable
                const columnCount = doc.content[1].table.body[0].length;



                // Calculer la largeur de chaque colonne pour centrer
                const columnWidth = 100 / columnCount + '%';

                // Centrer le contenu du PDF exporté
                // doc.content[1].table.widths = new Array(columnCount).fill(columnWidth);
                doc.content[1].table.widths = ['5%', '25%', '20%', '10%', '25%', '15%'];
                doc.content[1].table.alignment = 'center';



                doc.content[1].table.body.forEach(row => {
                  row.forEach(cell => {
                    cell.border = [1, 1, 1, 1]; // Ajouter une bordure à chaque cellule
                  });
                });

                // Placer les titres des colonnes à gauche
                doc.content[1].table.body[0].forEach(cell => {
                  cell.alignment = 'left';
                  cell.bold = true; // Souligner le titre des colonnes
                });


                // Souligner le titre de l'exportation
                doc.content[1].textDecoration = 'underline';



              }





            },



            { extend: "print", charset: 'utf-8', bom: true },
            { extend: "copy", charset: 'utf-8', bom: true },
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
            facture.reference,
            facture.mode_payement,
            facture.nom + " " + facture.prenom,
            this.formatNumber(facture.total_montant),
            // Ajoutez ici les boutons ou liens pour les actions
          ];
          this.dataTable.row.add(rowData);
        });

        this.dataTable.draw();

        const totalMontant = this.calculateTotals();
        $(this.$refs.myTable).find("tfoot td:last-child").html(`<strong>${this.formatNumber(totalMontant)} FCFA</strong>`);


      });
    },


    calculateTotals() {
      let totalMontant = 0; // Initialiser le total à zéro
      this.factures.forEach((facture) => {

        totalMontant += parseFloat(facture.total_montant); // Utiliser parseFloat pour convertir en nombre

      });



      return totalMontant;
    },



    calculerMontantTotal() {
      let montantTotal = 0;
      for (const factureDetail of this.factureDetails) {
        montantTotal += factureDetail.prix * factureDetail.quantite;
      }

      return montantTotal;
    },

    getNomActe(idActe) {
      const acte = this.acts.find((acte) => acte.id === idActe);
      return acte ? acte.name : "Autre";
    },

    getPatientTelephone() {
      const patient = this.patients.find((patient) => this.patientId === patient.id);
      return patient ? patient.telephone : "";
    },

    getPatientAdresse() {
      const patient = this.patients.find((patient) => this.patientId === patient.id);
      return patient ? patient.adresse : "";
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
      // if (typeof value !== "number") {
      //   return value;
      // }

      // return value.toLocaleString("fr-FR", { minimumFractionDigits: 2 });

      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },



  },
};
</script>
  
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