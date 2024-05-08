<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Trésorerie</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Décaissement</li>
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
            <h4 class="card-title">Enregistrer un décaissement</h4>

            <form class="forms-sample row">
              <fieldset class="scheduler-border container-fluid col-md-12">
                <legend class="scheduler-border mt-5" style="font-size: medium !important">
                  Informations Décaissement
                </legend>

                <div class="control-group col-md-12 mt-2 p-2" id="app">
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="exampleInputEmail1">Motif</label>
                      <input :class="{ 'is-invalid': formErrors.errorMotif }" @input="formErrors.errorMotif = false"
                        type="text" class="form-control" id="exampleInputEmail1" placeholder="Achat de matériels"
                        v-model="decaisse.motif" required />
                      <div class="invalid-feedback" v-if="formErrors.errorMotif">
                        Ce champs est requis
                      </div>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="montant">Montant</label>
                      <input :class="{ 'is-invalid': formErrors.errorMontant }" @input="formErrors.errorMontant = false"
                        type="text" class="form-control" id="montant" placeholder="100 000" v-model="decaisse.montant"
                        required />
                      <div class="invalid-feedback" v-if="formErrors.errorMontant">
                        Ce champs est requis ou invalide
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group col-xs-12 col-md-12 p-2">
                  <label>Facture/Référence</label>
                  <div class="input-group ">
                    <div class="custom-file">
                      <input :class="{ 'is-invalid': formErrors.errorFacture }" @input="formErrors.errorFacture = false"
                        accept="*" v-on:change="handleFileChange" type="file" class="custom-file-input" id="fileInput">
                      <label class="custom-file-label" for="fileInput">{{ fileName }}</label>
                    </div>

                  </div>
                  <div class=" " style="font-size:12px; font-family:arial, sans-serif !important; color:rgb(216, 79, 79)"
                    v-if="formErrors.errorFacture">
                    Ce champs est requis
                  </div>
                </div>

                <div class="form-group p-2">
                  <label for="exampleTextarea1">Description</label>
                  <textarea :class="{ 'is-invalid': formErrors.errorDescription }"
                    @input="formErrors.errorDescription = false" class="form-control" id="exampleTextarea1" rows="4"
                    v-model="decaisse.description">
                                    </textarea>
                  <div class="invalid-feedback" v-if="formErrors.errorDescription">
                    Ce champs est requis
                  </div>
                </div>

                <div class="row">
                  <div class="form-group p-1 text-center mx-auto">
                    <button @click="store" type="button"
                      class="btn btn-success d-flex btn btn-block btn-block text-center">
                      <i class="mdi mdi-check-circle-outline menu-icon"></i>
                      <span class="text-center">Valider</span>
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "../../../assets/js/file-upload.js";

import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal    tresorerie/decaissement
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { decaissementService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-decaissement",

  data() {
    return {
      formErrors: {
        errorMotif: "",
        errorMontant: "",
        errorFacture: "",
        errorDescription: "",
      },
      fileName: '',
      decaisse: {},
    };
  },

  mounted() {


  },

  methods: {

    handleFileChange(event) {
      this.decaisse.facture = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },

    browseFiles() {
      document.getElementById('fileInput').click();
    },


    store() {
      const formData = new FormData();
      if (this.decaisse.motif !== undefined) {
        formData.append("motif", this.decaisse.motif);
      }

      if (this.decaisse.montant !== undefined) {
        formData.append("montant", this.decaisse.montant);
      }

      if (this.decaisse.description !== undefined) {
        formData.append("description", this.decaisse.description);
      }

      if (this.decaisse.facture !== undefined) {
        formData.append("facture", this.decaisse.facture);
      }

      let isValid = true;
      this.formErrors = {};

      this.formErrors.errorMotif = false;
      this.formErrors.errorMontant = false;
      this.formErrors.errorDescription = false;
      this.formErrors.errorFacture = false;

   

      if (!this.decaisse.motif) {
        this.formErrors.errorMotif = true;
        isValid = false;
      }

      if (!this.decaisse.montant) {
        this.formErrors.errorMontant = true;
        isValid = false;
      }

      if (!this.decaisse.facture) {
        this.formErrors.errorFacture = true;

        isValid = false;
      }

      if (!this.decaisse.description) {
        this.formErrors.errorDescription = true;

        isValid = false;
      }

      if (!/^\d{3,}$/.test(this.decaisse.montant)) {
        this.$toast.error(
          "Le montant est invalide. Veuillez entrer au moins 3 chiffres!",
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
        this.formErrors.errorMontant = true;
        return;
      }

      if (!isValid) {
        return;
      }



      // Utilisez ici votre méthode Axios pour effectuer la requête POST vers le backend
      // Remplacez 'votre_url_api' par l'URL de votre API Laravel pour enregistrer les données
      decaissementService
        .addDecaisse(formData)
        .then((res) => {

          this.$toast.success("Décaissement enregistré avec succès.");
          this.$router.push("/tresorerie/list-decaissement");
          // Réinitialiser le formulaire après la soumission réussie
        })
        .catch((error) => {
 

          console.error(error);
       

          // this.$toast.error(
          //   "Une erreur s'est produite lors de l'enregistrement du décaissement."
          // );
        });
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";


.custom-file-input~.custom-file-label::after {
  content: "Telecharger";
}

.custom-file-label-purple {
  color: #2f3131;
  /* Couleur violette */
  background: linear-gradient(to bottom, #6ca597, #7ba89d);
  /* Dégradé de bleu */

}

.custom-file-label::after {
  content: 'Télécharger';
  /* display: block; */
  background: linear-gradient(to bottom, #bce2d9, #a8c7bf);
  /* Dégradé de bleu */
  color: #000000;
  /* Couleur du texte du libellé */
  cursor: pointer;
  /* margin-left: 8px; */
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

fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}

legend.scheduler-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}

th,
td {
  text-align: center;
}

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

.container-fluid {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

h2,
h4 {
  font-weight: bold;
  margin: 0;
}

.mb-4 {
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
}

table td,
table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

table th {
  font-weight: bold;
}

table tbody+tbody {
  border-top: 2px solid #ffffff;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.text-right {
  text-align: right;
}

.mt-5 {
  margin-top: 3rem;
}

.text-danger {
  color: #dc3545;
}
</style>