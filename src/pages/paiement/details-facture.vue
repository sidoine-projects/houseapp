<template>
  <section class="container">

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title py-3" style="background-color: rgb(211, 207, 207); text-align: center; font-size: 20px; height:50px">
              Détails facture</h2>
            <div class="container-fluid">
              <div class="row mb-2 mr-0 ml-0 col-sm-12 col-md-12 col-lg-12">
                <div class="col-sm-4">
                  <!-- <div class="mx-auto text-center">
                    <img src="@/assets/images/logo-ministere.png" alt="logo" style="margin-left: -70px; width: 65%;">
                    <img src="@/assets/images/oms.svg" alt="logo" class="w-50">

                  </div> -->
                </div>
                <div class="col-sm-4 text-center mt-auto mb-auto py-4">
                  <img src="@/assets/images/logopay.jpeg" alt="logo" class="w-50">
                </div>
                <!-- <div class="col-sm-4 mr-0" style="display: flex;">
                  <div class="col-sm-12" style="display: flex; margin-left: 5rem;">
                    <div>
                      <h3
                        style="margin-top: 5px; text-transform: uppercase; font-size: 0.7rem; font-weight: bold; text-align: right;">
                        Direction gérérale du tresor et de la comptabilité publique</h3>

                      <h4 style="font-size: 0.7em; font-weight: bold; text-align: right;">
                        Tél: 21 30 19 37 - Fax: 21 30 07 58</h4>
                      <h3 style="text-transform: uppercase; font-size: 0.6rem; font-weight: bold; text-align: right;">
                        BP : 40 cotonou - route de l'aéroport</h3>
                    </div>
                    <img src="@/assets/images/tresor.png" class="w-25  mt-n1">
                  </div>

                </div> -->
              </div>

              <hr style="background-color: rgb(156, 151, 151);" class="mt-n2 ">


              <div class="row mb-1">
                <div class="col-sm-6">
                  <h4>Partie versante</h4>
                  <p><strong> {{ nom }} {{ prenom }}</strong></p>

                  <p>{{ getPatientTelephone() }}</p>
                  <p>{{ getPatientAdresse() }}</p>

                </div>
                <div class="col-sm-6 text-right">
                  <h4>Facture N° {{ reference }}</h4>
                  <p> <strong>Date : {{ formatDate(date) }}</strong></p>
                  <p>Hôpital de Zone de KETOU</p>
                  <p>Tél. 68 90 65 45</p>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Mode</th>
                      <th>code</th>
                      <th>Désignation</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="(factureDetail, index) in factureDetails" :key="index">
                      <td>{{ factureDetail.mode_payement }}</td>
                      <td>
                        <span v-if="factureDetail.code === null">AAAAA</span>
                        <span v-else> {{ factureDetail.code }}</span>
                      </td>

                      <td>
                        {{ getNomActe(factureDetail.acte_medical_id) }}
                      </td>
                      <!-- <td>{{  getNomActe(factureDetail.acte_medical_id) }}</td> -->
                      <td>{{ factureDetail.quantite }}</td>
                      <td>{{ factureDetail.prix }}</td>
                      <td>{{ factureDetail.prix * factureDetail.quantite }}</td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr>

                      <td colspan="5" class="text-right"><strong>Montant Total (+) </strong></td>
                      <td><strong>{{ formatNumber(calculerMontantTotal()) }} FCFA</strong></td>
                    </tr>
                    <tr>

                      <td colspan="5" class="text-right"><strong> Total Prise en charge (-)</strong></td>
                      <td><strong>{{ formatNumber(totalPriseEncharge) }} FCFA</strong></td>
                    </tr>

                    <tr v-if="this.mode_payement_id == 3">

                      <td colspan="5" class="text-right"><strong> Fedapay fees (+)</strong></td>
                      <td><strong>{{ formatNumber(this.getFedapay() - (calculerMontantTotal()-totalPriseEncharge)) }}
                          FCFA</strong></td>
                    </tr>
                    <tr v-if="this.mode_payement_id == 4">

                      <td colspan="5" class="text-right"><strong> kkiapay fees (+)</strong></td>
                      <td><strong>{{ formatNumber(this.getFedapay() - (calculerMontantTotal()-totalPriseEncharge)) }}
                          FCFA</strong></td>
                    </tr>
                    <tr>
                      <td colspan="5" class="text-right" style="background-color: rgb(213, 219, 218);">
                        <strong>Montant Total Versé</strong>
                      </td>
                      <td style="background-color: rgb(213, 219, 218)"><strong>{{ formatNumber(difference) }}
                          FCFA</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div class="row mt-1">
                <div class="col-sm-6">

                  <p>Arrête la présente facture à la somme de : <strong>{{
                    convertNumberToLetter(difference) }} FCFA </strong></p>



                </div>
                <div class="col-sm-6 text-right">
                  <p><strong> Le Chef Caissier </strong></p>
                  <img src="@/assets/images/signature.png" alt="logo" class="w-25">
                  <p><strong> Félicien DAGBOGBO </strong></p>


                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


  </section>
</template>
<script>


import $ from "jquery";


import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services/compagnie_services.js";
import { factureService } from "@/_services/facture_services.js";
import { patientService } from "@/_services";
import { actsService } from '@/_services';
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import QRCode from 'qrcode';

require("datatables.net-dt");

export default {
  name: "list-facture",

  data() {
    return {
      factures: [],
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
      telephone: "",
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
      qrCodeUrl: '',
      reference: '',
      montantPaye: '',
      getAllEspeceData: [],
      getAllMomosData: [],
      getAllFedapayData: [],

    };
  },

  mounted() {

    const id = this.$route.params.id;
    this.payement_id = id;

    console.log(id);

    factureService.getAllEspece()
      .then((res) => {
        this.getAllEspeceData = res.data.data;
        // console.log(this.getAllEspece);
      })

    factureService.getAllMomos()
      .then((res) => {
        this.getAllMomosData = res.data.data;
        // console.log( this.getAllMomos);

      })

    factureService
      .getAllFedapay()
      .then((res) => {

        this.getAllFedapayData = res.data.data;

      })



    patientService
      .getAllPatients()
      .then((res) => {
        this.patients = res.data.data;
        // console.log(this.patients);
      })



    actsService.getAllActes().then((res) => {
      this.acts = res.data.data;
    });

    this.detail(id)
    // factureService.getFacture(this.payement_id)
    //     .then((res) => {
    //       const factureDetails = res.data.data;
    //       this.factureDetails = factureDetails;
    //       this.nom = this.factureDetails[0].nom;
    //       this.prenom = this.factureDetails[0].prenom;
    //       this.reference = facture.reference;
    //       this.mode_payement = facture.mode_payement;
    //       this.montantPaye = facture.total_montant;
    //       this.date = facture.created_at;
    //       this.generateQRCode();

    //       const montantTotalActe = this.calculerMontantTotal();

    //       PriseEnChargePatientService.getAssurancePatient(facture.patient_id)
    //         .then((res) => {
    //           this.assurancePourcentage = res.data.data.pourcentage_assurance;
    //           if (this.assurancePourcentage) {
    //             assuranceMontant = (this.assurancePourcentage * montantTotalActe) / 100;
    //           } else {
    //             assuranceMontant = 0;
    //           }

    //           pourcentagePatient.getPourcentagePatient(facture.patient_id)
    //             .then((res) => {
    //               this.pourcentageIndigence = res.data.data;
    //               if (this.pourcentageIndigence) {
    //                 indigenceMontant = (this.pourcentageIndigence * montantTotalActe) / 100;
    //               } else {
    //                 indigenceMontant = 0;
    //               }

    //               this.totalPriseEncharge = assuranceMontant + indigenceMontant;
    //               // this.difference = montantTotalActe - this.totalPriseEncharge;
    //               this.difference = facture.total_montant;
    //               console.log(this.difference);

    //               $("#showDetail").modal("show");
    //             })
    //             .catch(error => {
    //               console.error(error);
    //             });
    //         })
    //         .catch(error => {
    //           console.error(error);
    //         });
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });


  },

  methods: {


    detail(payementId) {

      let assuranceMontant = 0;
      let indigenceMontant = 0;
      payementId = this.payement_id;



      factureService.getFacture(payementId)
        .then((res) => {
          const factureDetails = res.data.data;

          console.log(factureDetails);

          this.factureDetails = factureDetails;
          this.nom = this.factureDetails[0].nom;
          this.prenom = this.factureDetails[0].prenom;
          this.mode_payement_id = this.factureDetails[0].mode_payement_id;
          this.reference = this.factureDetails[0].reference;
          this.mode_payement = this.factureDetails[0].mode_payement;
          this.patientId = this.factureDetails[0].patient_id;
          this.date = this.factureDetails[0].created_at;

          const montantTotalActe = this.calculerMontantTotal();

          PriseEnChargePatientService.getAssurancePatient(this.factureDetails[0].patient_id)
            .then((res) => {
              this.assurancePourcentage = res.data.data.pourcentage_assurance;


              const assuranceMontant = this.assurancePourcentage ? (this.assurancePourcentage * montantTotalActe) / 100 : 0;

              pourcentagePatient.getPourcentagePatient(this.factureDetails[0].patient_id)
                .then((res) => {
                  this.pourcentageIndigence = res.data.data;



                  const indigenceMontant = this.pourcentageIndigence ? (this.pourcentageIndigence * montantTotalActe) / 100 : 0;

                  this.totalPriseEncharge = assuranceMontant + indigenceMontant;
                  console.log(this.mode_payement_id)

                  if (this.mode_payement_id == 1) {

                    this.difference = this.getEspeces();
                    console.log(this.difference);

                  } else if (this.mode_payement_id == 2) {

                    this.difference = this.getMomos();
                    console.log(this.getMomos());

                  }
                  else if (this.mode_payement_id == 3 || this.mode_payement_id == 4) {

                    this.difference = this.getFedapay();
                    console.log(this.difference);


                  }
                })
                .catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });


    },

    // generateQRCode() {
    //   const qrCodeData = JSON.stringify({
    //     Reference: this.reference,
    //     Patient: this.nom + ' ' + this.prenom,
    //     Montant: this.montantPaye,
    //   });

    // QRCode.toDataURL(qrCodeData, { errorCorrectionLevel: "L" }, (err, url) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }

    //   this.qrCodeUrl = url;
    // });
    // },

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
      const patient = this.patients.find((patient) => this.patientId == patient.id);
      return patient ? patient.telephone : "";
    },

    getPatientAdresse() {
      const patient = this.patients.find((patient) => this.patientId === patient.id);
      return patient ? patient.adresse : "";
    },


    getEspeces() {
      const espece = this.getAllEspeceData.find((espece) => this.payement_id == espece.payement_id);

      return espece ? espece.montant : "";
    },


    getMomos() {
      const momos = this.getAllMomosData.find((momo) => this.payement_id == momo.payement_id);
      console.log(momos);
      return momos ? momos.montant : "";
    },

    getFedapay() {
      const fedapay = this.getAllFedapayData.find((fedapay) => this.payement_id == fedapay.payement_id);
      console.log(fedapay);
      return fedapay ? fedapay.montant : "";

    },


    // formatDate(date) {
    //   const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    //   return new Date(date).toLocaleDateString('fr-FR', options);
    // },

    formatDate(date) {
      const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(date).toLocaleString('fr-FR', options);
    },




    formatNumber(value) {
      if (typeof value !== 'number') {
        return value;
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },


    Unite(nombre) {
      let unite;
      switch (nombre) {
        case 0:
          unite = "zéro";
          break;
        case 1:
          unite = "un";
          break;
        case 2:
          unite = "deux";
          break;
        case 3:
          unite = "trois";
          break;
        case 4:
          unite = "quatre";
          break;
        case 5:
          unite = "cinq";
          break;
        case 6:
          unite = "six";
          break;
        case 7:
          unite = "sept";
          break;
        case 8:
          unite = "huit";
          break;
        case 9:
          unite = "neuf";
          break;
      }
      return unite;
    },

    Dizaine(nombre) {
      let dizaine;
      switch (nombre) {
        case 10:
          dizaine = "dix";
          break;
        case 11:
          dizaine = "onze";
          break;
        case 12:
          dizaine = "douze";
          break;
        case 13:
          dizaine = "treize";
          break;
        case 14:
          dizaine = "quatorze";
          break;
        case 15:
          dizaine = "quinze";
          break;
        case 16:
          dizaine = "seize";
          break;
        case 17:
          dizaine = "dix-sept";
          break;
        case 18:
          dizaine = "dix-huit";
          break;
        case 19:
          dizaine = "dix-neuf";
          break;
        case 20:
          dizaine = "vingt";
          break;
        case 30:
          dizaine = "trente";
          break;
        case 40:
          dizaine = "quarante";
          break;
        case 50:
          dizaine = "cinquante";
          break;
        case 60:
          dizaine = "soixante";
          break;
        case 70:
          dizaine = "soixante-dix";
          break;
        case 80:
          dizaine = "quatre-vingt";
          break;
        case 90:
          dizaine = "quatre-vingt-dix";
          break;
      }
      return dizaine;
    },

    NumberToLetter(nombre) {
      let i, j, n, quotient, reste, nb;
      let ch;
      let numberToLetter = "";

      if (nombre.toString().replace(/ /gi, "").length > 15) return "dépassement de capacité";
      if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

      nb = parseFloat(nombre.toString().replace(/ /gi, ""));
      if (Math.ceil(nb) !== nb) return "Nombre avec virgule non géré.";

      n = nb.toString().length;
      switch (n) {
        case 1:
          numberToLetter = this.Unite(nb);
          break;
        case 2:
          if (nb > 19) {
            quotient = Math.floor(nb / 10);
            reste = nb % 10;
            if (nb < 71 || (nb > 79 && nb < 91)) {
              if (reste === 0) numberToLetter = this.Dizaine(quotient * 10);
              if (reste === 1) numberToLetter = this.Dizaine(quotient * 10) + "-et-" + this.Unite(reste);
              if (reste > 1) numberToLetter = this.Dizaine(quotient * 10) + "-" + this.Unite(reste);
            } else numberToLetter = this.Dizaine((quotient - 1) * 10) + "-" + this.Dizaine(10 + reste);
          } else numberToLetter = this.Dizaine(nb);
          break;
        case 3:
          quotient = Math.floor(nb / 100);
          reste = nb % 100;
          if (quotient === 1 && reste === 0) numberToLetter = "cent";
          if (quotient === 1 && reste !== 0) numberToLetter = "cent" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0) numberToLetter = this.Unite(quotient) + " cents";
          if (quotient > 1 && reste !== 0) numberToLetter = this.Unite(quotient) + " cent " + this.NumberToLetter(reste);
          break;
        case 4:
        case 5:
        case 6:
          quotient = Math.floor(nb / 1000);
          reste = nb - quotient * 1000;
          if (quotient === 1 && reste === 0) numberToLetter = "mille";
          if (quotient === 1 && reste !== 0) numberToLetter = "mille" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0) numberToLetter = this.NumberToLetter(quotient) + " mille";
          if (quotient > 1 && reste !== 0) numberToLetter = this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
          break;
        case 7:
        case 8:
        case 9:
          quotient = Math.floor(nb / 1000000);
          reste = nb % 1000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un million";
          if (quotient === 1 && reste !== 0) numberToLetter = "un million" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0) numberToLetter = this.NumberToLetter(quotient) + " millions";
          if (quotient > 1 && reste !== 0) numberToLetter = this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
          break;
        case 10:
        case 11:
        case 12:
          quotient = Math.floor(nb / 1000000000);
          reste = nb - quotient * 1000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un milliard";
          if (quotient === 1 && reste !== 0) numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0) numberToLetter = this.NumberToLetter(quotient) + " milliards";
          if (quotient > 1 && reste !== 0) numberToLetter = this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
          break;
        case 13:
        case 14:
        case 15:
          quotient = Math.floor(nb / 1000000000000);
          reste = nb - quotient * 1000000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un billion";
          if (quotient === 1 && reste !== 0) numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0) numberToLetter = this.NumberToLetter(quotient) + " billions";
          if (quotient > 1 && reste !== 0) numberToLetter = this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
          break;
      }

      // Respect de l'accord de "quatre-vingt"
      if (numberToLetter.substr(numberToLetter.length - "quatre-vingt".length, "quatre-vingt".length) === "quatre-vingt") {
        numberToLetter += "s";
      }

      return numberToLetter;
    },

    convertNumberToLetter(number) {
      let result = this.NumberToLetter(number);
      return result;
    },


  }

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
