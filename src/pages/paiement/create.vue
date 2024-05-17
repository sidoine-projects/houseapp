<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Tableau de board</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Paiement et Facturation
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
            <h4 class="card-title">Ajouter un paiement</h4>

            <form class="forms-sample p-2">
              <fieldset class="scheduler-border col-md-12">
                <legend class="scheduler-border" style="font-size: medium !important">
                  Informations Patient
                </legend>
                <div class="">
                  <div class="control-group row">
                    <div class="form-group controls col-md-6">
                      <label for="exampleFormControlSelect1">Patient</label>
                      <select v-model="selectedPatient" class="form-control mb-3" id="exampleFormControlSelect1"
                        @change="detail" :class="{ 'is-invalid': formErrors.patient }">
                        <option value="">Sélectionner un patient</option>
                        <!-- Option par défaut avec une valeur vide -->

                        <option v-for="patient in patients" :value="patient.id" :key="patient.id">
                          {{ patient.nom }} {{ patient.prenom }}
                        </option>
                      </select>
                      <div v-if="formErrors.patient" class="error-message">
                        Ce champs est obligatoire.
                      </div>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="exampleInputEmail1">Age</label>
                      <input readonly type="text" class="form-control" id="exampleInputEmail1" placeholder="Age"
                        v-model="patient.age" />
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="control-group row">
                    <div class="form-group col-md-6">
                      <label for="exampleInputEmail1">Téléphone</label>
                      <input readonly type="email" class="form-control" id="exampleInputEmail1"
                        placeholder="Numéro de téléphone" v-model="patient.telephone" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="exampleInputEmail1">Sexe</label>
                      <input readonly type="email" class="form-control" id="exampleInputEmail1" placeholder="email"
                        v-model="patient.sexe" />
                    </div>
                  </div>
                </div>
                <!-- <fieldset class="scheduler-border col-md-12" v-if="assurancePourcentage !== null || pourcentageIndigence !== null"> -->
                <fieldset class="scheduler-border col-md-12"
                  v-if="pourcentageIndigence !== null || assurancepatient !== null">
                  <legend class="scheduler-border" style="font-size: medium !important">
                    Prise en charge patient
                  </legend>
                  <div class="row" v-if="assurancePourcentage !== null">

                    <div class="form-group p-2 col-md-4">
                      <label for="exampleInputUsername1">Assurance Patient </label>
                      <input readonly type="text" class="form-control" id="exampleInputUsername1"
                        placeholder="Assurance patient" v-model="assurancepatient" />
                    </div>

                    <div class="form-group p-2 col-md-4">
                      <label for="exampleInputUsername1"> Pourcentage Assurance </label>
                      <input readonly type="text" class="form-control" id="exampleInputUsername1"
                        placeholder=" Pourcentage Assurance" v-model="assurancePourcentage" />
                    </div>

                    <div class="form-group p-2 col-md-4">
                      <label for="exampleInputUsername1"> Numéro Assurance</label>
                      <input readonly type="text" class="form-control" id="exampleInputUsername1"
                        placeholder=" Pourcentage Assurance" v-model="assuranceNumero" />
                    </div>

                  </div>
                  <div class="row" v-if="pourcentageIndigence !== null">
                    <div class="form-group p-2 col-md-12">
                      <label for="exampleInputUsername1">Indigence Patient (En %)</label>
                      <input readonly type="text" class="form-control" id="exampleInputUsername1"
                        placeholder="Pourcentage indigence" v-model="pourcentageIndigence" />
                    </div>
                  </div>
                </fieldset>
              </fieldset>

              <fieldset class="scheduler-border container-fluid col-md-12">
                <legend class="scheduler-border" style="font-size: medium !important">
                  Informations Paiement
                </legend>

                <!-- ----------------------------------pour ajouter dynamiquement une acte médical---------------------------------------------------- -->
                <div class="control-group mt-2 p-2" id="app">
                  <div class="row" v-for="(form, index) in forms" :key="index">
                    <div class="form-group col-md-4">
                      <label for="exampleFormControlSelect1">Actes médicaux</label>

                      <select class="form-control" id="exampleFormControlSelect1" v-model="form.acte"
                        @change="fetchActeMedicalDetails(index)" :class="{
                          'is-invalid':
                            formErrors[index] && formErrors[index].acteMedical,
                        }">
                        <option value="SA">Sélectionner un acte médical</option>
                        <option v-for="acte in actesMedicals" :key="acte.id" :value="acte.id">
                          {{ acte.name }}
                        </option>
                        <option value="0">Autre</option>
                      </select>

                      <div v-if="formErrors[index] && formErrors[index].acteMedical" class="error-message">
                        Ce champ est obligatoire.
                      </div>
                    </div>

                    <div v-if="form.acte === '0'" class="col-md-8 mb-2">
                      <label for="exampleInputUsername1">Désignation</label>

                      <input type="text" class="form-control" id="" placeholder="Autre" v-model="form.autre" :class="{
                        'is-invalid': formErrors[index] && formErrors[index].autreActe,
                      }" />

                      <div v-if="formErrors[index] && formErrors[index].autreActe" class="error-message">
                        Ce champ est obligatoire.
                      </div>
                    </div>

                    <div v-if="form.acte !== '0'" class="form-group"
                      :class="form.acte === '0' ? 'col-md-4 mb-2' : 'col-md-2 mb-2'">
                      <label for="exampleInputEmail1">Code</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" :readonly="form.readonly"
                        placeholder="Code" v-model="form.code" />
                    </div>


                    <div class="form-group" :class="[
                      form.acte === '0' ? 'col-md-4' : 'col-md-2',
                      'mb-2',
                      {
                        'is-invalid':
                          form.acte === '0' &&
                          formErrors[index] &&
                          formErrors[index].prix,
                      },
                    ]">
                      <label for="exampleInputUsername1">Prix</label>
                      <input :readonly="form.readonly" type="text" class="form-control" id="exampleInputUsername1"
                        placeholder="prix" v-model="form.prix" @input="updateMontantActe(index)" />

                      <div v-if="form.acte === '0' && formErrors[index] && formErrors[index].prix
                        " class="error-message">
                        Ce champ prix est obligatoire.
                      </div>
                    </div>

                    <div class="form-group" :class="form.acte === '0' ? 'col-md-4 mb-2' : 'col-md-2 mb-2'">
                      <label for="exampleInputUsername1">Quantité</label>
                      <input type="number" :min="1" class="form-control" id="exampleInputUsername1"
                        @input="updateMontantActe(index)" placeholder="Quantité" v-model="form.quantite" :class="{
                          'is-invalid': formErrors[index] && formErrors[index].quantite,
                        }" />
                      <div v-if="formErrors[index] && formErrors[index].quantite" class="error-message">
                        Ce champ est obligatoire.
                      </div>
                    </div>
                    <div class="form-group" :class="form.acte === '0' ? 'col-md-4 mb-2' : 'col-md-2 mb-2'">
                      <label for="exampleInputUsername1">Montant</label>
                      <input readonly type="text" class="form-control" id="exampleInputUsername1" placeholder="Montant"
                        v-model="form.montant" />
                    </div>

                    <!-- <div class="form-group col-md-1" style="margin-top: 1.7rem;"> -->
                    <div class="form-group col-md-1">
                      <b-button size="sm" v-b-tooltip.hover title="Supprimer" variant="danger"
                        @click.prevent="deleteForm(index)" v-if="forms.length >= 2">
                        <i class="mdi mdi mdi-close-box text-white menu-icon"></i>
                      </b-button>
                    </div>
                  </div>
                </div>

                <!-- ----------------------------------pour ajouter dynamiquement une acte médical---------------------------------------------------- -->

                <div class="control-group col-md-12 p-1 mt-n3 row">
                  <div class="form-group ml-4">
                    <b-button size="sm" v-b-tooltip.hover title="Ajouter un acte" variant="success" @click="addForm">
                      <i class="mdi mdi mdi-plus-box text-white menu-icon"></i>
                    </b-button>
                  </div>
                </div>

                <div class="control-group p-2">
                  <div class="row">
                    <div class="form-group col-md-12">
                      <input readonly type="text" class="form-control text-right" id="" placeholder="Montant" :value="'Total Montant :    ' + calculateTotalMontantActe() + '   FCFA'
                        " style="text-align: right !important" />
                    </div>
                  </div>
                </div>

                <input readonly type="hidden" class="form-control text-right pr-5 font-weight-bold" id=""
                  placeholder="Montant" :value="'Total  :    ' + calculateTotalMontant() + '   FCFA'"
                  style="text-align: right !important" />
                <input readonly type="hidden" class="form-control text-right pr-5 font-weight-bold" id=""
                  placeholder="Montant" :value="'Total  :    ' + calculateTotalMontantEspece() + '   FCFA'"
                  style="text-align: right !important" />

                <div class="control-group p-2" style="text-align: right !important">
                  <div class="row">
                    <div class="form-group col-md-12">
                      <label for="exampleInputUsername1">
                        <strong> Montant Total A Payer </strong>
                      </label>
                      <input readonly type="text" class="form-control font-weight-bold" id="exampleInputUsername1"
                        v-model="momoDataEspece.montant" placeholder="Montant total"
                        style="text-align: right !important" />
                    </div>
                  </div>
                </div>

                <div class="control-group col-md-12 p-2">
                  <div class="row">
                    <div class="form-group col-md-12">
                      <label for="exampleFormControlSelect1"> Mode de Paiement</label>
                      <select class="form-control mb-3" id="exampleFormControlSelect1" v-model="selectedOptionMode"
                        @change="fetchModePayementDetails">
                        <option value="" class="">Sélectionnez un Mode</option>
                        <option v-for="mode in modePayements" :key="mode.id" :value="mode.id">
                          {{ mode.mode }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="p-2 container-fluid">
                  <div v-if="selectedOptionMode === 1" class="control-group">
                    <img src="@/assets/images/mode-espece.png" alt="patient" class="row col-md-12 mx-auto h-25"
                      style="width: 180px" />

                    <div class="p-1 mt-1 row">
                      <div class="form-group p-4 mx-auto">
                        <button @click="showConfirmationModal" type="button"
                          class="btn btn-success d-flex btn btn-block btn-block text-center">
                          <i class="mdi mdi-check-circle-outline menu-icon"></i>
                          <span class="text-center ml-1">Valider</span>
                        </button>

                      </div>
                    </div>
                  </div>

                  <div v-if="selectedOptionMode === 2" class="control-group">
                    <img src="@/assets/images/mtn.jpg" alt="patient" class="row col-md-12 mx-auto h-25"
                      style="width: 170px" />

                    <div class="p-2 mt-4 row">
                      <div class="form-group col-md-4">
                        <!-- <label for="exampleInputEmail1">Nom {{ momoData.statut }}</label> -->
                        <label for="exampleInputEmail1">Nom <span style="color: red">*</span>
                        </label>
                        <input v-model="momoData.nom" type="text" class="form-control" id="exampleInputEmail1"
                          placeholder="Nom" required :class="{ 'is-invalid': formErrors.nom }"
                          @input="formErrors.nom = false" />
                        <div v-if="formErrors.nom" class="error-message">
                          Le champ Nom est requis.
                        </div>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="exampleInputEmail1">Prénom(s) <span style="color: red">*</span>
                        </label>
                        <input v-model="momoData.prenom" type="text" class="form-control" id="exampleInputEmail1"
                          placeholder="Prénom(s)" required :class="{ 'is-invalid': formErrors.prenom }"
                          @input="formErrors.prenom = false" />
                        <div v-if="formErrors.prenom" class="error-message">
                          Le champ Prénom est requis.
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <label for="exampleInputEmail1">Téléphone <span style="color: red">*</span>
                        </label>
                        <input v-model="momoData.telephone" type="text" class="form-control" id="exampleInputEmail1"
                          placeholder="Téléphone" required :class="{ 'is-invalid': formErrors.telephone }"
                          @input="formErrors.telephone = false" />
                        <div v-if="formErrors.telephone" class="error-message">
                          Ce champs est requis ou invalid.
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <label for="exampleInputUsername1">Montant Total A Payer</label>
                        <input v-model="momoData.montant" readonly type="text" class="form-control"
                          id="exampleInputUsername1" placeholder="Montant total" required />
                      </div>

                      <div class="form-group p-2 mx-auto">
                        <button @click="validerPayement" type="button"
                          class="btn btn-success d-flex mx-auto btn btn-block btn-block text-center">
                          <i class="mdi mdi-check-circle-outline menu-icon"></i>
                          <span class="text-center ml-1">Valider</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-if="selectedOptionMode === 3" class="control-group">
                    <img src="@/assets/images/fedapay.png" alt="patient" class="row col-md-12 mx-auto h-50"
                      style="width: 300px" />

                    <div class="p-1 mt-1 row">
                      <div class="form-group p-4 mx-auto" @click="validerPayement">
                        <button id="pay-btn" type="button"
                          class="btn btn-success d-flex btn btn-block btn-block text-center">
                          <i class="mdi mdi-check-circle-outline menu-icon"></i>
                          <span class="text-center ml-1">Valider</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-if="selectedOptionMode === 4" class="control-group">
                    <img src="@/assets/images/kkiapay.jpg" alt="patient" class="row col-md-12 mx-auto h-50"
                      style="width: 300px" />

                    <div class="p-1 mt-1 row">
                      <div class="form-group p-4 mx-auto home" @click="validerPayement">
                        <button id="" type="button" class="btn btn-success d-flex btn btn-block btn-block text-center">
                          <i class="mdi mdi-check-circle-outline menu-icon"></i>
                          <span class="text-center ml-1">Valider</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </fieldset>
            </form>

            <div class="modal fade" id="confirmationMOMO" tabindex="-1" role="dialog"
              aria-labelledby="confirmationMOMOLabel1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">


                    <h5 class="modal-title" id="confirmationMOMOLabel">
                      {{
                        momoData.statut === "PENDING"
                        ? "Validation en cours"
                        : momoData.statut === "FAILED"
                          ? "Échec de paiement"
                          : "Paiement réussi avec succès"
                      }}
                    </h5>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body" style="text-align: center">
                    <div id="pending-content" v-if="momoData.statut === 'PENDING'">
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->
                      <img src="../../assets/images/loading.gif" alt="Trulli" width="200" height="200" />
                      <h3 class="mt-3">
                        <label style="color: #1d7db4">Veuillez patienter s'il vous plaît...</label>
                      </h3>
                    </div>

                    <div id="success-content" v-if="momoData.statut == 'SUCCESSFUL'">
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->
                      <img src="../../assets/images/img-valider.png" alt="logo" class="w-50" />
                      <!-- <h4><a href="#"> Cliquez ici pour continuer le processus.</a></h4> -->
                    </div>

                    <div id="failed-content" v-if="momoData.statut === 'FAILED'">
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->
                      <img src="../../assets/images/delete.png" alt="Trulli" width="200" height="200" />
                      <h4>Le paiement a échoué. Veuillez réessayer.</h4>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button v-if="momoData.statut === 'PENDING'" type="button" class="btn btn-outline-danger text-dark"
                      @click="annulerMomo">
                      Annuler
                    </button>

                    <button class="btn btn-outline-danger text-dark" v-if="momoData.statut === 'FAILED'"
                      data-dismiss="modal" type="button">
                      Fermer
                    </button>

                    <button v-if="momoData.statut === 'SUCCESSFUL'" type="button"
                      class="btn btn-outline-success text-dark mx-auto mt-n2" @click="ShowFacture">
                      <i class="mdi mdi mdi-cloud-download"></i> Cliquer ici pour imprimer
                      la facture
                    </button>
                    <!-- <button type="button" class="btn btn-outline-success text-dark" @click="validateData">Oui</button> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="modal fade" id="confirmationModalFedapay" tabindex="-1" role="dialog"
              aria-labelledby="confirmationMOMOLabel1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                  
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body" style="text-align: center">
                    <div id="success-content" v-if="statusFedapay == 'approved'">

                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->

                      <img src="../../assets/images/img-valider.png" alt="logo" class="w-50" />
                      <!-- <h4><a href="#"> Cliquez ici pour continuer le processus.</a></h4> -->
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button class="btn btn-outline-danger text-dark" v-if="statusFedapay == 'canceled'"
                      data-dismiss="modal" type="button">
                      Fermer
                    </button>

                    <button v-if="statusFedapay == 'approved'" type="button"
                      class="btn btn-outline-success text-dark mx-auto mt-n2" @click="ShowFacture">
                      <i class="mdi mdi mdi-cloud-download"></i> Cliquer ici pour imprimer
                      la facture
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              

              <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog"
                aria-labelledby="confirmationModalLabel1" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="confirmationModalLabel">
                        Confirmation
                      </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      Êtes-vous sûr de vouloir valider le paiement ?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-outline-danger text-dark" data-dismiss="modal">
                        Non
                      </button>

                      <button type="button" class="btn btn-outline-success text-dark" @click="validerPayement">
                        Oui
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="modal fade" id="confirmationModalpay" tabindex="-1" role="dialog"
                aria-labelledby="confirmationModalPayLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="confirmationModalPayLabel">
                        Paiement validé avec succès
                      </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="modal-body text-center">
                      <img src="@/assets/images/img-valider.png" alt="logo" class="w-50" />
                      <p>
                        Vous avez reçu un paiement de {{ patient.nom }}
                        {{ patient.prenom }} !
                      </p>
                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-outline-success text-dark mx-auto mt-n2" @click="ShowFacture">
                        <i class="mdi mdi mdi-cloud-download"></i> Cliquer ici pour
                        imprimer la facture
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="modal fade" id="paiementencour" tabindex="-1" role="dialog"
                aria-labelledby="paiementencourLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="paiementencourLabel">
                        Paiement en cours de validation
                      </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="modal-footer"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl" role="document">
                <div class="modal-content bg-white">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" id="print-section" ref="modalContent">
                    <div class="container-fluid">
                      <div class="row mb-2 mr-0 ml-0 col-sm-12">
                        <div class="col-sm-4">
                   
                        </div>
                        <div class="col-sm-12 text-center mt-auto mx-auto">
                          <img src="@/assets/images/logopay.jpeg" alt="logo" class="w-25" />
                        </div>

                      </div>

                      <hr style="background-color: rgb(156, 151, 151)" class="mt-n2" />

                      <div class="row mb-1">
                        <div class="col-sm-6">
                          <h4>Partie versante</h4>
                          <p>
                            <strong>{{ patient.nom }} {{ patient.prenom }}</strong>
                          </p>
                          <p>{{ patient.adresse }}</p>
                          <p>{{ patient.telephone }}</p>
                        </div>
                        <div class="col-sm-6 text-right">
                          <h4>Facture N° {{ invoice.number }}</h4>
                          <p>
                            <strong>Date : {{ invoice.date | formatDate }} </strong>
                          </p>
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
                            <!-- <td>{{ item.mode }}</td> -->
                            <tr v-for="(acte, index) in actesSelectionnes" :key="index">
                              <td>{{ modePayement }}</td>
                              <td>{{ acte.code }}</td>
                              <td>{{ acte.nom }}</td>
                              <td>{{ acte.quantite }}</td>
                              <td>{{ acte.prix }}</td>
                              <td>{{ acte.montant }}</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="5" class="text-right">
                                <strong>Montant Total (+) </strong>
                              </td>
                              <td>
                                <strong>{{
                                  formatNumber(calculateTotalMontantActe())
                                }}
                                  FCFA</strong>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="5" class="text-right">
                                <strong> Total Prise en charge (-)</strong>
                              </td>
                              <td>
                                <strong>{{ formatNumber(totalPriseEncharge) }} FCFA</strong>
                              </td>
                            </tr>

                            <tr v-if="selectedOptionMode == 4">
                              <td colspan="5" class="text-right">
                                <strong> Kkiapay fees (+)</strong>
                              </td>
                              <td>
                                <strong>{{ formatNumber(feesKikiapay) }} FCFA</strong>
                              </td>
                            </tr>
                            <tr v-if="selectedOptionMode == 3">
                              <td colspan="5" class="text-right">
                                <strong> Fedapay fees (+)</strong>
                              </td>
                              <td>
                                <strong>{{ formatNumber(feesFedapay) }} FCFA</strong>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="5" class="text-right" style="background-color: rgb(213, 219, 218)">
                                <strong>Montant Total Versé</strong>
                              </td>
                              <td style="background-color: rgb(213, 219, 218)">
                                <strong>{{
                                  formatNumber(calculateTotalMontant())
                                }}
                                  FCFA</strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      <div class="row mt-1">
                        <div class="col-sm-6">

                          <!-- <p>Arrête la présente facture à la somme de : <strong> Cinq mille ({{ calculateTotalMontant() | currency('FCFA', 0, ' ', ',') }}) FCFA </strong></p> -->
                          <!-- <p>Arrête la présente facture à la somme de : <strong>{{ convertNumberToLetter(10500) }} FCFA </strong></p> -->
                          
                          <p>
                            la présente facture à la somme de :
                            <strong>{{ convertNumberToLetter(calculateTotalMontant()) }} FCFA
                            </strong>
                          </p>

                          <!-- <img src="@/assets/images/codeQR.png" alt="logo" class="w-50" /> -->

                          <div>
                            <router-link v-if="qrCodeUrl" :to="{
                              name: 'FactureDetails',
                              params: { id: payementId },
                              path: '/facture' + $route.path,
                            }" target="_blank">
                              <img :src="qrCodeUrl" alt="QR Code" />
                            </router-link>
                          </div>
                        </div>
                        <div class="col-sm-6 text-right">
                          <p><strong> Le Chef Caissier </strong></p>
                          <img src="@/assets/images/signature.png" alt="logo" class="w-25" />
                          <p><strong> Félicien DAGBOGBO </strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <!-- <router-link class="" to="">
                      <b-button size="sm" v-b-tooltip.hover title="Whatsapp" variant="success">
                        <i class="mdi mdi mdi-whatsapp text-white menu-icon"></i>
                      </b-button>
                    </router-link>
                    <router-link class="" to="">
                      <b-button size="sm" v-b-tooltip.hover title="Email" variant="info">
                        <i class="mdi mdi mdi-email text-white menu-icon"></i>
                      </b-button>
                    </router-link>
                    <router-link class="" to="">
                      <b-button size="sm" v-b-tooltip.hover title="MMS" variant="primary">
                        <i class="mdi mdi-message-text text-white menu-icon"></i>
                      </b-button>
                    </router-link> -->
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      Fermer
                    </button>

                    <button type="button" class="btn btn-info" @click="printModal">
                      Imprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<script type="text/javascript">
import $ from "jquery";
import { format } from "date-fns";

import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal

import { momoService } from "@/_services/momos_services.js";
// import { acteMedicalService } from "@/_services/acte_medical_services.js";
import { actsService } from "@/_services/actsmedicals_services.js";
import { patientService } from "@/_services/patients_services.js";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";

import { modePayementService } from "@/_services/mode_payement_services.js";
import { payementService } from "@/_services/payements_services.js";
import { factureService } from "@/_services/facture_services.js";
import { especeService } from "@/_services/espece_services.js";
import { fedapayService } from "@/_services/fedapay_services.js";
import { useToast, POSITION } from "vue-toastification";
import QRCode from "qrcode";

import "@/asset/js/fedapay_checkout.js?v=1.1.7";
// import "@/asset/js/kkiapay.js";
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from "kkiapay";

// import "../../assets/js/alertify.js";

export default {
  name: "create-payement",

  data() {
    return {
      selectedPatient: "",
      modePayements: [],
      // modePayement: {},
      user: JSON.parse(localStorage.getItem("user")),
      modePayement: "",
      patients: [], // Remplir cette liste avec les patients disponibles
      patient: {},
      assurance: "",
      indigence: "",
      assurancePourcentage: null,
      assuranceNumero: null,
      indigencePourcentage: "",
      totalPriseEncharge: "",
      indigencePatients: [],
      indigences: [],
      patientIndigence: null,
      pourcentageIndigence: null,
      prisenchargePourcentage: null,
      assurancepatient: null,
      indigencepatient: "",
      payementId: "",
      montantFedapay: null,
      montantKikiapay: null,
      qrCodeUrl: "",
      invoiceUrl: "",
      feesKikiapay: "",
      feesFedapay: "",

      // pourcentageindigence:"",

      actesMedicals: [], // Tableau pour stocker l'acte medical en fonction de l'id de l'acte choisi par user
      actesSelectionnes: [], // Tableau pour stocker tous les actes medicaux chaque fois que user clique dessus
      // form: {
      //   acte: "", // Initialiser la valeur par défaut à "SA"
      //   code: "",
      //   prix: "",
      // },

      montantEspece: null,
      statusFedapay: null,

      momoData: {
        selectedOptionMode: "",
        nom: "",
        statut: "PENDING",
        prenom: "",
        telephone: "",
        montant: "",
        transaction: null,
      },

      momoDataEspece: {
        montant: "",
      },

      //  readonlyoption: 'autre',
      //  isreadonly: true,

      afficherModal: false,
      //selected: 'A',

      selectedOptionMode: "",

      selected: "",
      options: [
        { item: "F", name: " Feminin" },
        { item: "M", name: " Masculin" },
        //{ item: 'D', name: 'Option C', notEnabled: true },
        // { item: { d: 1 }, name: 'Option D' } this.forms.push({ mode: '', code: '', prix: '', quantite: '', montant: '' });
      ],

      forms: [
        {
          acte: "SA",
          quantite: "",
          code: "",
          prix: "",
          montant: "",
          autre: "",
          readonly: true,
        },
      ],

      showModal: false,

      invoice: {
        number: "230510406-CS006",
        date: new Date(),
      },

      formErrors: {
        nom: false,
        prenom: false,
        telephone: false,
        patient: false,
        agePatient: false,
        acteMedical: false,
        autreActe: false,
        prix: false,
      },
    };
  },

  methods: {
    kkiapay(payementId) {
      const k = openKkiapayWidget({
        amount: this.momoData.montant,
        position: "center",
        callback: "",
        data: "",
        url: "@/assets/images/logopay.jpeg",
        sandbox: "true",
        theme: "green",
        key: "d9da5d50d3a311edb532ad421d393c9e",
      });

      addSuccessListener((response) => {
        console.log(response);

        if (response.transactionId) {
          const transaction_id = response.transactionId;
          console.log(transaction_id);
          payementService
            .gettransactionKikiapay(transaction_id)
            .then((res) => {
              const data = res.data.data;

              console.log(data);

              if (data.status == "SUCCESS") {
                this.feesKikiapay = data.fees;
                this.montantKikiapay = data.amount + data.fees;

                const credentials = {
                  mode_payements_id: this.selectedOptionMode,
                  payement_id: payementId,
                  nom: data.client.fullname,
                  prenom: data.client.fullname,
                  telephone: data.client.phone,
                  montant: data.amount + data.fees,
                  transaction_id: transaction_id,
                  statut: data.status,
                };

                // console.log(credentials);

                fedapayService
                  .requestFedapay(credentials, payementId)
                  .then((response) => {
                    console.log(response.data.data.montant);
                  })

                  .catch((error) => {
                    console.error(error);
                  });

                this.createFacture(payementId);

                setTimeout(function () {
                  // Code à exécuter après l'attente de 3 secondes
                  $("#exampleModal").modal("show");
                }, 3000); // 3000 millisecondes équivalent à 3 secondes
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },

    // successHandler(response, payementId ) {
    //   if (response.transactionId) {
    //     const transaction_id = response.transactionId;
    //     console.log(transaction_id)
    //     payementService
    //       .gettransactionKikiapay(transaction_id)
    //       .then((res) => {
    //         const data = res.data.data;

    //         console.log(data);

    //         if (data.status == "SUCCESS") {
    //           const credentials = {
    //             mode_payements_id: this.selectedOptionMode,
    //             payement_id: payementId,
    //             nom: data.client.fullname,
    //             prenom: data.client.fullname,
    //             telephone: data.client.phone,
    //             montant: data.amount + data.fees,
    //             transaction_id: transaction_id,
    //             statut: data.status,
    //           };

    //           console.log(credentials);

    //           // fedapayService
    //           //   .requestFedapay(credentials, payementId)
    //           //   .then((response) => {
    //           //     console.log(response.data.data.montant);

    //           //   })

    //           //   .catch((error) => {
    //           //     console.error(error);
    //           //   });

    //           // this.createFacture(payementId);
    //         }

    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // },

    fedaPay(payementId) {
      return FedaPay.init("#pay-btn", {
        public_key: "pk_sandbox_cdiapMSeRJxMt6rwvjP7t2Ns",

        transaction: {
          amount: this.momoData.montant,
          description: "Payement Facture",
        },

        customer: {
          email: this.patient.email,
          lastname: this.patient.prenom,
          firstname: this.patient.nom,
          phone_number: {
            // number: this.patient.telephone,
            country: "BJ",
          },
        },

        onComplete: (response) => {
          console.log(response.transaction);

          if (response.transaction.status == "approved") {
            this.statusFedapay = "approved";
            this.feesFedapay = response.transaction.fees;

            this.montantFedapay = response.transaction.amount_debited;

            const credentials = {
              mode_payements_id: this.selectedOptionMode,
              payement_id: payementId,
              nom: response.transaction.customer.firstname,
              prenom: response.transaction.customer.lastname,
              telephone: response.transaction.payment_method.number,
              montant: response.transaction.amount_debited,
              transaction_id: response.transaction.transaction_key,
              statut: response.transaction.status,
            };

            fedapayService
              .requestFedapay(credentials, payementId)
              .then((response) => {
                console.log(response.data.data.montant);
              })

              .catch((error) => {
                console.error(error);
              });

            this.createFacture(payementId);
          }

          $("#confirmationModalFedapay").modal("show");
        },
      });
    },

    fetchModePayements() {
      modePayementService
        .getAllModePayement()
        .then((res) => {
          this.modePayements = res.data.data;
          // console.log(this.modePayement); // $('button#pay-btn').click(); })
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchModePayementDetails() {
      modePayementService
        .getModePayement(this.selectedOptionMode)
        .then((res) => {
          this.modePayement = res.data.data.mode;

          if (this.selectedOptionMode == 2) {
            this.momoData.nom = this.patient.nom;
            this.momoData.prenom = this.patient.prenom;
            this.momoData.telephone = this.patient.telephone;
          }

          console.log(this.modePayement);
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
          // console.log(this.patients);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    detail() {
      this.formErrors.patient = false;
      patientService.getPatient(this.selectedPatient).then((res) => {
        this.patient = res.data.data;

        // this.assurance = this.patient.assurance;
        // this.indigence = this.patient.indigence;
        // this.assurancePourcentage = this.patient.assurancePourcentage;  pk_live_pEpqCZWH8MzLlFG06SCzq3ZU
        // this.indigencePourcentage = this.patient.indigencePourcentage;
      });

      pourcentagePatient
        .getPourcentagePatient(this.selectedPatient)
        .then((res) => {
          this.pourcentageIndigence = res.data.data;

          // console.log(this.pourcentageIndigence);
        })

        .catch((error) => {
          console.error(error);
        });

      PriseEnChargePatientService.getAssurancePatient(this.selectedPatient)
        .then((res) => {
          console.log(res.data.data);
          this.assurancepatient = res.data.data.assurance_nom;
          this.assurancePourcentage = res.data.data.pourcentage_assurance;
          this.assuranceNumero = res.data.data.numero_assurance;
          console.log(this.assurancepatient, this.assurancePourcentage);
        })
        .catch((error) => {
          console.error(error);
        });

      // Recharger la liste des actes médicaux
      actsService
        .getAllActes()
        .then((res) => {
          this.actesMedicals = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // fetchActeMedicalDetails(id) {    // function pour recuperer un acte medical

    //   acteMedicalService.getacteMedical(id)
    //     .then(response => {
    //       const acteMedicalDetails = response.data.data; // recuperer un acte medical
    //       // Mettre à jour les détails de l'acte médical
    //       this.form.code = acteMedicalDetails.code;
    //       this.form.prix = acteMedicalDetails.prix;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // },

    generateQRCode(payementId) {
      const base = location.origin;
      const invoiceDetailsUrl = `${base}/facture/details/${payementId}`;

      QRCode.toDataURL(invoiceDetailsUrl, { errorCorrectionLevel: "L" }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }

        this.qrCodeUrl = url;
      });
    },

    calculateTotalMontantActe() {
      let total = 0;
      for (const form of this.forms) {
        total += form.montant;
      }
      return total;
    },

    calculateTotalMontant() {
      let total = 0;
      let assuranceMontant = 0;
      let indigenceMontant = 0;

      for (const form of this.forms) {
        total += form.montant;
      }

      if (this.assurancePourcentage) {
        assuranceMontant = (this.assurancePourcentage * total) / 100;
      } else {
        assuranceMontant = 0;
      }

      if (this.pourcentageIndigence) {
        indigenceMontant = (this.pourcentageIndigence * total) / 100;
      } else {
        indigenceMontant = 0;
      }

      // TotalPriseEncharge = assuranceMontant + indigenceMontant;
      this.totalPriseEncharge = assuranceMontant + indigenceMontant;
      total = total - this.totalPriseEncharge;

      if (this.selectedOptionMode == 4) {
        total = total + this.feesKikiapay;
      }

      if (this.selectedOptionMode == 3) {
        total = total + this.feesFedapay;
      }

      this.momoData.montant = total;

      return total;
    },

    calculateTotalMontantEspece() {
      // cette fonction calcule le montant total identique à calculateTotalMontant()
      let total = 0;
      let assuranceMontant = 0;
      let indigenceMontant = 0;

      for (const form of this.forms) {
        total += form.montant;
      }

      if (this.assurancePourcentage) {
        assuranceMontant = (this.assurancePourcentage * total) / 100;
      } else {
        assuranceMontant = 0;
      }

      if (this.pourcentageIndigence) {
        indigenceMontant = (this.pourcentageIndigence * total) / 100;
      } else {
        indigenceMontant = 0;
      }

      // TotalPriseEncharge = assuranceMontant + indigenceMontant;
      this.totalPriseEncharge = assuranceMontant + indigenceMontant;
      total = total - this.totalPriseEncharge;
      this.momoDataEspece.montant = total;
      return total;
    },

    formatNumber(value) {
      if (typeof value !== "number") {
        return value;
      }

      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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

      if (nombre.toString().replace(/ /gi, "").length > 15)
        return "dépassement de capacité";
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
              if (reste === 1)
                numberToLetter = this.Dizaine(quotient * 10) + "-et-" + this.Unite(reste);
              if (reste > 1)
                numberToLetter = this.Dizaine(quotient * 10) + "-" + this.Unite(reste);
            } else
              numberToLetter =
                this.Dizaine((quotient - 1) * 10) + "-" + this.Dizaine(10 + reste);
          } else numberToLetter = this.Dizaine(nb);
          break;
        case 3:
          quotient = Math.floor(nb / 100);
          reste = nb % 100;
          if (quotient === 1 && reste === 0) numberToLetter = "cent";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "cent" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.Unite(quotient) + " cents";
          if (quotient > 1 && reste !== 0)
            numberToLetter = this.Unite(quotient) + " cent " + this.NumberToLetter(reste);
          break;
        case 4:
        case 5:
        case 6:
          quotient = Math.floor(nb / 1000);
          reste = nb - quotient * 1000;
          if (quotient === 1 && reste === 0) numberToLetter = "mille";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "mille" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " mille";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
          break;
        case 7:
        case 8:
        case 9:
          quotient = Math.floor(nb / 1000000);
          reste = nb % 1000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un million";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un million" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " millions";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
          break;
        case 10:
        case 11:
        case 12:
          quotient = Math.floor(nb / 1000000000);
          reste = nb - quotient * 1000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un milliard";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " milliards";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
          break;
        case 13:
        case 14:
        case 15:
          quotient = Math.floor(nb / 1000000000000);
          reste = nb - quotient * 1000000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un billion";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " billions";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
          break;
      }

      // Respect de l'accord de "quatre-vingt"
      if (
        numberToLetter.substr(
          numberToLetter.length - "quatre-vingt".length,
          "quatre-vingt".length
        ) === "quatre-vingt"
      ) {
        numberToLetter += "s";
      }

      return numberToLetter;
    },

    convertNumberToLetter(number) {
      let result = this.NumberToLetter(number);
      return result;
    },

    fetchActesMedicals() {
      actsService
        .getAllActes()
        .then((res) => {
          this.actesMedicals = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchActeMedicalDetails(index) {
      const id = this.forms[index].acte;

      if (id === "SA") {
        // L'utilisateur a sélectionné "Sélectionner un acte médical"
        this.forms[index].readonly = true;
        this.forms[index].code = "";
        this.forms[index].prix = "";
        this.forms[index].montant = "";

        // ...
      }

      if (id === "0") {
        // L'utilisateur a sélectionné "Autres"
        this.forms[index].readonly = false;
        this.forms[index].code = "";
        this.forms[index].prix = "";
        this.forms[index].montant = "";

        // Vérifier si l'objet formulaire existe déjà dans actesSelectionnes

        const existingIndex = this.actesSelectionnes.findIndex(
          (acte) => acte.index === index
        );

        if (existingIndex !== -1) {
          const existingForm = this.actesSelectionnes[existingIndex];

          // Mettre à jour les détails de l'objet formulaire existant
          existingForm.code = "";
          existingForm.prix = this.forms[index].prix;
          existingForm.quantite = this.forms[index].quantite;
          existingForm.montant = this.forms[index].montant;
          // Mettez à jour d'autres propriétés si nécessaire
        } else {
          // Ajouter l'objet formulaire à actesSelectionnes
          this.actesSelectionnes.push({
            index: index,
            id: "0",
            nom: "Autre",
            code: "AAAAA",
            prix: this.forms[index].prix,
            quantite: this.forms[index].quantite,
            montant: this.forms[index].montant,
            // Ajoutez d'autres propriétés si nécessaire
          });
        }
      } else {
        // L'utilisateur a sélectionné un acte médical existant
        this.forms[index].readonly = true;
        this.forms[index].quantite = ""; // Initialiser la quantité à 1

        if (!this.formErrors[index]) {
          this.formErrors[index] = {}; // Créez l'objet formErrors[index] s'il n'existe pas
        }

        // Vérifiez si la propriété acteMedical est définie avant de la définir à false
        if ("acteMedical" in this.formErrors[index]) {
          this.formErrors[index].acteMedical = false;
        }

        actsService
          .getActe(id)
          .then((response) => {
            const acteMedical = response.data.data; // Adapt this to your API response structure

            // Mettre à jour les détails du formulaire avec les détails de l'acte médical
            this.forms[index].code = acteMedical.code;
            this.forms[index].prix = acteMedical.tarif;
            this.forms[index].montant = this.forms[index].quantite * acteMedical.tarif;

            // Vérifier si l'objet formulaire existe déjà dans actesSelectionnes
            const existingIndex = this.actesSelectionnes.findIndex(
              (acte) => acte.index === index
            );
            // console.log(existingIndex);
            // console.log(this.actesSelectionnes);
            if (existingIndex !== -1) {
              const existingForm = this.actesSelectionnes[existingIndex];

              // Mettre à jour les détails de l'objet formulaire existant
              existingForm.nom = acteMedical.name;
              existingForm.code = acteMedical.code;
              existingForm.prix = acteMedical.tarif;
              existingForm.quantite = this.forms[index].quantite;
              existingForm.montant = this.forms[index].quantite * acteMedical.tarif;
            } else {
              // Ajouter l'objet formulaire à actesSelectionne

              this.actesSelectionnes.push({
                index: index,
                id: acteMedical.id,
                nom: acteMedical.name,
                code: acteMedical.code,
                prix: acteMedical.tarif,
                quantite: this.forms[index].quantite,
                montant: this.forms[index].quantite * acteMedical.tarif,
                // Ajoutez d'autres propriétés si nécessaire
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

      // Calculer les totaux après avoir mis à jour les détails de l'acte médical
      this.calculateTotalMontantActe();
      this.calculateTotalMontant();
      this.calculateTotalMontantEspece();
    },

    // updateMontantActe(index) {
    //   const form = this.forms[index];
    //   form.montant = form.quantite * form.prix;

    //   if (this.actesSelectionnes[index]) {

    //     this.actesSelectionnes[index].quantite = form.quantite;
    //     this.actesSelectionnes[index].montant = form.quantite * form.prix;
    //     console.log( this.forms[index], );

    //     const acteMedical = this.actesMedicals.find(acte => acte.id === form.acte);
    //     if (acteMedical) {
    //       this.actesSelectionnes[index].nom = acteMedical.name;
    //       this.actesSelectionnes[index].prix = acteMedical.tarif;
    //     } else {

    //     }

    //   } else {

    //     const acteMedical = this.actesMedicals.find(acte => acte.id === form.acte);
    //     if (acteMedical) {
    //       this.actesSelectionnes.push({
    //         code: form.code,
    //         nom: acteMedical.name,
    //         prix: acteMedical.tarif,
    //         quantite: form.quantite,
    //         montant: form.quantite * form.prix,
    //         // Ajoutez d'autres propriétés si nécessaire
    //       });
    //     } else {

    //     }

    //   }

    //   this.calculateTotalMontantActe();
    //   this.calculateTotalMontant();
    // },

    updateMontantActe(index) {
      const form = this.forms[index];
      form.montant = form.quantite * form.prix;

      this.formErrors[index].quantite = false;
      this.formErrors[index].prix = false;

      if (this.actesSelectionnes[index]) {
        this.actesSelectionnes[index].quantite = form.quantite;
        this.actesSelectionnes[index].montant = form.quantite * form.prix;
        console.log(this.forms[index]);

        if (form.acte == "0") {
          // L'acte est "Autre"
          this.actesSelectionnes[index].nom = form.autre;
          this.actesSelectionnes[index].prix = form.prix;
        } else {
          const acteMedical = this.actesMedicals.find((acte) => acte.id === form.acte);
          if (acteMedical) {
            this.actesSelectionnes[index].nom = acteMedical.name;
            this.actesSelectionnes[index].prix = acteMedical.tarif;
          }
        }
      } else {
        // L'objet formulaire n'existe pas encore dans actesSelectionnes
        if (form.acte == "0") {
          // L'acte est "Autre"
          this.actesSelectionnes.push({
            code: "-",
            nom: form.autre,
            prix: form.prix,
            quantite: form.quantite,
            montant: form.quantite * form.prix,
            // Ajoutez d'autres propriétés si nécessaire
          });
        } else {
          const acteMedical = this.actesMedicals.find((acte) => acte.id === form.acte);
          if (acteMedical) {
            this.actesSelectionnes.push({
              code: form.code,
              nom: acteMedical.name,
              prix: acteMedical.tarif,
              quantite: form.quantite,
              montant: form.quantite * acteMedical.tarif,
              // Ajoutez d'autres propriétés si nécessaire
            });
          }
        }
      }

      this.calculateTotalMontantActe();
      this.calculateTotalMontant();
      this.calculateTotalMontantEspece();
    },

    addForm() {
      // this.forms.push({ acte: 'SA', code: '', prix: '', quantite: '', montant: '' });
      this.forms.push({
        acte: "SA",
        quantite: "",
        code: "",
        prix: "",
        montant: "",
        autre: "",
        readonly: true,
      });
      // const newForm = { acte: 'SA', code: '', prix: '', quantite: '', montant: '' };
    },

    deleteForm(index) {
      this.forms.splice(index, 1);
      this.actesSelectionnes.splice(index, 1); // Supprimer l'élément correspondant de actesSelectionnes

      for (let i = index; i < this.actesSelectionnes.length; i++) {
        this.actesSelectionnes[i].index = i;
        // console.log(this.actesSelectionnes[i].index);// compter les index à partir de index
      }

      // for (let i = 0; i < this.actesSelectionnes.length; i++) {
      //   this.actesSelectionnes[i].index = i;
      //   console.log(this.actesSelectionnes[i].index);// compter les index à partir de index

      // }

      this.calculateTotalMontantActe();
      this.calculateTotalMontant();
      this.calculateTotalMontantEspece();

      //this.forms.splice(this.forms.length - 1, 1);
    },

    annulerMomo(event) {
      event.stopPropagation();
      this.momoData.statut = "FAILED";
    },

    validerPayement() {
      // this.formErrors.patient = false;

      this.formErrors = {};
      let isValid = true; // Variable pour suivre si tous les formulaires sont valides
      let hasQuantiteVide = false; // Variable pour suivre si au moins un champ quantité est vide
      let hasActeVide = false; // Variable pour suivre si au moins un acte est vide
      let hasAutreActeDesignation = false; // Variable pour suivre si au moins un acte est vide
      let hasAutreActeprix = false; // Variable pour suivre si au moins un acte est vide

      this.formErrors.nom = false;
      this.formErrors.prenom = false;
      this.formErrors.telephone = false;

      // Vérifier les champs obligatoires

      if (this.selectedOptionMode==2 && this.momoData.nom == "") {
        this.formErrors.nom = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      if (this.selectedOptionMode==2 && this.momoData.prenom == "") {
        this.formErrors.prenom = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      if (this.selectedOptionMode==2 && this.momoData.telephone == "") {
        this.formErrors.telephone = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      // Vérifier les champs obligatoires

      if (!this.selectedPatient) {
        this.formErrors.patient = true;
        isValid = false;

        this.$toast.error(
          "Veuillez sélectionnez un patient avant de procéder au paiement!",
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

        return; // Sortir de la fonction en cas d'erreur
      }

      this.forms.forEach((form, index) => {
        this.formErrors[index] = {}; // Réinitialiser les erreurs pour le formulaire actuel

        // Valider l'élément 'acteMedical' du formulaire actuel
        if (!form.acte || form.acte == "SA") {
          // si le champs acte medicaux n'est pas electionner
          hasActeVide = true; // Un acte est vide
          this.formErrors[index].acteMedical = true;
          isValid = false; // Le formulaire actuel est invalide

          return;
        }

        // Valider l'élément 'quantite' du formulaire actuel
        if (!form.quantite) {
          this.formErrors[index].quantite = true;
          isValid = false; // Le formulaire actuel est invalide
          hasQuantiteVide = true; // Un champ quantité est vide

          return;
        }

        if (form.acte && form.acte == "0" && !form.autre) {
          // form.autre c'est la designation de autre
          this.formErrors[index].autreActe = true;
          isValid = false; // Le formulaire actuel est invalide
          hasAutreActeDesignation = true; // Un champ quantité est vide

          return;
        }

        if (
          (form.acte && form.acte == "0" && !form.prix) ||

          !/^\d{3,}$/.test(form.prix)
        ) {
          // si le champs acte medicaux n'est pas electionner
          hasAutreActeprix = true; // Un acte est vide
          this.formErrors[index].prix = true;
          isValid = false; // Le formulaire actuel est invalide

          return;
        }
      });

      if (hasActeVide) {
        this.$toast.error("Le champs acte médical ne peut être vide!", {
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
      if (hasQuantiteVide) {
        this.$toast.error("Le champs quantité ne peut  être vide!", {
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

      if (hasAutreActeDesignation) {
        this.$toast.error("Le champs Désignation ne peut  être vide!", {
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

      if (hasAutreActeprix) {
        this.$toast.error("Le champs prix ne peut  être vide ou est invalide!", {
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

      if (this.selectedOptionMode==2 &&  !/^\d{8,}$/.test(this.momoData.telephone)) {
        this.$toast.error(
          "Le Numéro de téléphone MOMO est invalide. Veuillez entrer au moins 8 chiffres!",
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

        this.formErrors.telephone = true;

        return;
      }

      // if (Object.keys(this.formErrors[index].acteMedical).length > 0) {
      //   isValid = false;

      //   this.$toast.error("Le champs quantité ne peut être vide!", {
      //     position: "top-right",
      //     timeout: 3000,
      //     style: {
      //       background: "#ff0000", // Couleur de fond rouge pour l'erreur
      //       color: "#fff", // Couleur du texte
      //       fontWeight: "bold",
      //     },
      //   });
      //   return;
      // }

      if (isValid) {
        const credentials = {
          patient_id: this.selectedPatient,
          mode_payement_id: this.selectedOptionMode,
        };

        // Enregistrer les données dans la base de données

        payementService
          .requestPayement(credentials)
          .then((response) => {
            const payementId = response.data.data; // Récupérer l'ID du paiement
            this.payementId = payementId;
            this.generateQRCode(payementId);
            console.log(payementId);

            if (this.selectedOptionMode == 4) {
              this.kkiapay(payementId);
            }

            if (this.selectedOptionMode == 3) {
              this.fedaPay(payementId);

              $("button#pay-btn").click(function (event) {
                event.stopPropagation();
              });

              $("button#pay-btn").click();
            }

            if (this.selectedOptionMode == 2) {
              this.validerMomo(payementId);
            }

            if (this.selectedOptionMode == 1) {
              this.validerEspece(payementId);

              this.createFacture(payementId);

              this.validateData();

              // console.log('aaaaaaaaaaa'+ this.modePayement);
              
            }

          })

          .catch((error) => {
            console.error(error);
          });
      }
    },

    createFacture(payementId) {

      console.log(this.user.id);
      const userId = this.user.id;

      const factures = this.forms.map((form) => {
        return {
          // reference: "",
          payement_id: payementId,
          acte_medical_id: form.acte,
          patient_id: this.selectedPatient,
          code: form.code,
          autre: form.autre,
          prix: form.prix,
          quantite: form.quantite,

          montant:
            this.selectedOptionMode == 1
              ? this.momoDataEspece.montant
              : this.selectedOptionMode == 2
              ? this.momoData.montant
              : this.selectedOptionMode == 3
              ? this.montantFedapay
              : this.selectedOptionMode == 4
              ? this.montantKikiapay
              : 0,
        };

      });


      factureService
        .requestFacture(payementId, factures)
        .then((response) => {
          const factures = response.data.data;

        })
        .catch((error) => {
          console.error(error);
        });
    },

    validerEspece(payementId) {
      const credentials = {
        mode_payements_id: this.selectedOptionMode,
        payement_id: payementId,
        montant: this.momoDataEspece.montant,
      };

      especeService
        .requestEspece(credentials, payementId)
        .then((response) => {
          const montant = response.data.data.montant;
          console.log(montant);
        })

        .catch((error) => {
          console.error(error);
        });
    },

    validerMomo(payementId) {
      this.formErrors.nom = false;
      this.formErrors.prenom = false;
      this.formErrors.telephone = false;

      // Vérifier les champs obligatoires

      if (this.selectedOptionMode==2 && this.momoData.nom == "") {
        this.formErrors.nom = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      if (this.selectedOptionMode==2 && this.momoData.prenom == "") {
        this.formErrors.prenom = true;
        return; // Sortir de la fonction en cas d'erreur

      }

      if (this.selectedOptionMode==2 && this.momoData.telephone == "") {
        this.formErrors.telephone = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      $("#confirmationMOMO").modal("show");

      setTimeout(() => {
        // Mettre à jour la valeur de statut à "SUCCESSFUL"
        if (this.momoData.statut === "PENDING") {
          this.momoData.statut = "SUCCESSFUL";
        }

        if (this.momoData.statut === "SUCCESSFUL") {
          // Enregistrer les données dans la base de données

          const credentials = {
            mode_payements_id: this.selectedOptionMode,
            payement_id: payementId,
            nom: this.momoData.nom,
            prenom: this.momoData.prenom,
            telephone: this.momoData.telephone,
            montant: this.momoData.montant,
            transaction_id: "",
            statut: this.momoData.statut,
          };

          momoService
            .requestMomo(credentials, payementId)
            .then((response) => {
              const transaction = response.data.transaction;
              this.momoData.statut = transaction.statut;

              $("#confirmationMOMO").modal("show");
            })
            .catch((error) => {
              console.error(error);
            });

          this.createFacture(payementId);
        }
      }, 6000);
    },

    checkreadonly(form) {
      // console.log(form.acte);
      if (form.acte === "0") {
        // if (this.forms.some((form) => form.acte === "autre")) {
        form.readonly = false;
      } else {
        form.readonly = true;
      }
    },

    showConfirmationModal() {
      this.formErrors = {};
      let isValid = true; // Variable pour suivre si tous les formulaires sont valides
      let hasQuantiteVide = false; // Variable pour suivre si au moins un champ quantité est vide
      let hasActeVide = false; // Variable pour suivre si au moins un acte est vide
      let hasAutreActeDesignation = false; // Variable pour suivre si au moins un acte est vide
      let hasAutreActeprix = false; // Variable pour suivre si au moins un acte est vide

      // Vérifier les champs obligatoires

      if (!this.selectedPatient) {
        this.formErrors.patient = true;
        isValid = false;

        this.$toast.error(
          "Veuillez sélectionnez un patient avant de procéder au paiement!",
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

        return; // Sortir de la fonction en cas d'erreur
      }

      this.forms.forEach((form, index) => {
        this.formErrors[index] = {}; // Réinitialiser les erreurs pour le formulaire actuel

        // Valider l'élément 'acteMedical' du formulaire actuel
        if (!form.acte || form.acte == "SA") {
          // si le champs acte medicaux n'est pas electionner
          hasActeVide = true; // Un acte est vide
          this.formErrors[index].acteMedical = true;
          isValid = false; // Le formulaire actuel est invalide

          return;
        }

        // Valider l'élément 'quantite' du formulaire actuel
        if (!form.quantite) {
          this.formErrors[index].quantite = true;
          isValid = false; // Le formulaire actuel est invalide
          hasQuantiteVide = true; // Un champ quantité est vide

          return;
        }

        if (form.acte && form.acte == "0" && !form.autre) {
          // form.autre c'est la designation de autre
          this.formErrors[index].autreActe = true;
          isValid = false; // Le formulaire actuel est invalide
          hasAutreActeDesignation = true; // Un champ quantité est vide

          return;
        }

        if (form.acte && form.acte == "0" && !form.prix) {
          // si le champs acte medicaux n'est pas electionner
          hasAutreActeprix = true; // Un acte est vide
          this.formErrors[index].prix = true;
          isValid = false; // Le formulaire actuel est invalide

          return;
        }
      });

      if (hasActeVide) {
        this.$toast.error("Le champs acte médical ne peut être vide!", {
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
      if (hasQuantiteVide) {
        this.$toast.error("Le champs quantité ne peut  être vide!", {
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

      if (hasAutreActeDesignation) {
        this.$toast.error("Le champs Désignation ne peut  être vide!", {
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

      if (hasAutreActeprix) {
        this.$toast.error("Le champs prix ne peut  être vide!", {
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


      if (isValid) {
        $("#confirmationModal").modal("show");
      }
    },

    validateData() {
      // Code pour valider les données dans la base de données

      $("#confirmationModal").modal("hide");
      $("#confirmationModalpay").modal("show");
    },

    validationEnCour() {
      // Code pour valider les données dans la base de données

      $("#paiementencour").modal("show");
    },

    ShowFacture() {
      // Code pour valider les données dans la base de données

      $("#confirmationModal").modal("hide");
      $("#exampleModal").modal("show");
    },

 

    printModal() {
      const modalContent = this.$refs.modalContent;
      const originalContents = document.body.innerHTML;

      // Temporairement remplacer le contenu de la page par le contenu du modal
      document.body.innerHTML = modalContent.innerHTML;

      // Imprimer le contenu
      window.print();

      // Restaurer le contenu original de la page
      document.body.innerHTML = originalContents;

      $("#exampleModal").modal("hide");
    },



  },

  filters: {
    formatDate(value) {
      return format(value, "dd/MM/yyyy");
    },
  },

  mounted() {
    // addKkiapayListener("success", this.successHandler);

    this.fetchActesMedicals();
    $("#confirmationMOMO").on("hidden.bs.modal", () => {
      this.momoData.statut = "PENDING";
    });

    this.fetchPatients();
    this.fetchModePayements();



  },

  beforeDestroy() {
    removeKkiapayListener("success", this.successHandler);
  },
};
</script>

<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";


.text-red {
  color: red !important;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.modal--fullscreen {
  max-width: 90vw;
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
