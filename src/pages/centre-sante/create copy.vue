<template>
  <section class="container-scroller">
    <div class="page-header">
      <!-- <h3 class="page-title">
        Bootstrap Table
      </h3> -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item "><a href="javascript:void(0);" class="text-success font-weight-bold">Tableau de
              board</a></li>
          <li class="breadcrumb-item active" aria-current="page">Paiement et Facturation</li>
          <li class="breadcrumb-item active" aria-current="page">Ajouter</li>
        </ol>
      </nav>
    </div>



    <div class="row">
      <!-- <p class="card-description">
              For displaying tabular data. <code>&lt;b-table&gt;</code> supports pagination, filtering, sorting, custom rendering, events, and asynchronous data.
            </p> -->


      <div class=" col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Ajouter un paiement</h4>
            <form class="forms-sample ">

              <fieldset class="scheduler-border row col-md-12">
                <legend class="scheduler-border" style="font-size: medium !important;">Infos Patient</legend>

                <div class="control-group p-2 col-md-6">

                  <div class="form-group controls">
                    <label for="exampleFormControlSelect1">Sélectionner un patient</label>
                    <select class="form-control   mb-3 " id="exampleFormControlSelect1">
                      <option value="AL">Adam Akouvi</option>
                      <option value="WY">Sido vinou</option>
                      <option value="WY">Sido Akpa</option>
                      <option value="AM">Paul Sage</option>
                      <option value="CA">Yves wodu</option>
                      <option value="RU">Russia valentine</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Téléphone</label>
                    <input readonly type="email" class="form-control" id="exampleInputEmail1"
                      placeholder="Numéro de téléphone">
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPassword1">Sexe</label>
                    <input readonly type="password" class="form-control" id="exampleInputPassword1" placeholder="Sexe">
                  </div>




                </div>
                <div class="control-group p-2 col-md-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Age</label>
                    <input readonly type="email" class="form-control" id="exampleInputEmail1" placeholder="Age">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Adresse</label>
                    <input readonly type="email" class="form-control" id="exampleInputEmail1" placeholder="Adresse">
                  </div>

                  <div class="form-group">
                    <label for="exampleInputUsername1">Profession</label>
                    <input readonly type="text" class="form-control" id="exampleInputUsername1" placeholder="Profession">
                  </div>


                </div>
              </fieldset>

              <fieldset class="scheduler-border  row col-md-12">
                <legend class="scheduler-border" style="font-size: medium !important;">Infos Paiement</legend>

                <div class="control-group p-2 col-md-12 ">

                  <div class="form-group mx-auto">
                    <label for="exampleFormControlSelect1">Mode de Paiement</label>
                    <select class="form-control  mb-3 " id="exampleFormControlSelect1">
                      <option value="AL">Espèce</option>
                      <option value="WY">Mobile Money</option>
                      <option value="AM">Moov Money</option>
                      <option value="CA">Carte bancaire</option>
                      <option value="AM">Chèque</option>


                    </select>
                  </div>

                </div>

                <div class="control-group col-md-12">
                  <div class="row ">

                    <div class="form-group col-md-4">
                      <label for="exampleFormControlSelect1">Mode de Paiement</label>
                      <select class="form-control   mb-3 " id="exampleFormControlSelect1">
                        <option value="AL">Consultation</option>
                        <option value="WY">Hospitalisations</option>
                        <option value="AM">Examens médicaux</option>
                        <option value="CA">Transport en ambulance</option>
                        <option value="AM">ventes de produits pharmaceutiques</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2">
                      <label for="exampleInputEmail1">Code</label>
                      <input readonly type="email" value="FD01003" class="form-control" id="exampleInputEmail1"
                        placeholder="Code">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">prix</label>
                      <input readonly type="text" value="2000" class="form-control" id="exampleInputUsername1"
                        placeholder="prix">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">Quantité</label>
                      <input type="number" value="1" class="form-control" id="exampleInputUsername1"
                        placeholder="Quantité">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">Montant</label>
                      <input readonly type="text" value="2000" class="form-control" id="exampleInputUsername1"
                        placeholder="Montant">
                    </div>
                  </div>

                </div>

                <div class="control-group col-md-12" id="app">
                  <div class="row " v-for="(form, index) in forms" :key="index">

                    <div class="form-group col-md-4">
                      <label for="exampleFormControlSelect1">Mode de Paiement</label>
                      <select class="form-control   mb-3 " id="exampleFormControlSelect1" v-model="form.mode">
                        <option value="AL">Consultation</option>
                        <option value="WY">Hospitalisations</option>
                        <option value="AM">Examens médicaux</option>
                        <option value="CA">Transport en ambulance</option>
                        <option value="AM">ventes de produits pharmaceutiques</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2">
                      <label for="exampleInputEmail1">Code</label>
                      <input readonly type="email" value="FD01003" class="form-control" id="exampleInputEmail1"
                        placeholder="Code" v-model="form.code">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">prix</label>
                      <input readonly type="text" value="2000" class="form-control" id="exampleInputUsername1"
                        placeholder="prix" v-model="form.prix">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">Quantité</label>
                      <input type="number" value="1" class="form-control" id="exampleInputUsername1"
                        placeholder="Quantité" v-model="form.quantite">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">Montant</label>
                      <input readonly type="text" value="2000" class="form-control" id="exampleInputUsername1"
                        placeholder="Montant" v-model="form.montant">
                    </div>
                  </div>

                </div>

                <div class="control-group col-md-12 row">
                  <div class="form-group col-md-4">
                    <b-button size="sm" v-b-tooltip.hover title="Ajouter un acte" variant="success" @click="addForm">
                      <i class="mdi  mdi mdi-plus-box text-white menu-icon"></i>
                    </b-button>
                    <b-button size="sm" v-b-tooltip.hover title="Supprimer" variant="danger"
                      @click.prevent="deleteForm()">
                      <i class="mdi  mdi mdi-close-box text-white menu-icon"></i>
                    </b-button>
                  </div>
                </div>
              </fieldset>


              <div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false;">
          <div class="modal">
            <h1>Modal heading</h1>
            <p>This my first modal using vue.js</p>
          </div>
        </div>
      </div>
    </transition>
    <button @click="isOpen = !isOpen;" type="button">
      {{ isOpen ? "Close" : "Open" }} modal
    </button>
  </div>
              <!-- <button type="button" @click="addForm">Ajouter un champ de saisie</button>
              <button @click.prevent="deleteForm(index)">Supprimer ce formulaire</button> -->



              <!-- 
              <fieldset class="scheduler-border col-md-6">
                <legend class="scheduler-border" style="font-size: medium !important;">Infos Paiement</legend>
                <div class="control-group p-2">


                  <div class="form-group">
                    <label for="exampleFormControlSelect1">Mode de payement</label>
                    <select class="form-control   mb-3 " id="exampleFormControlSelect1">
                      <option value="AL">Espèce</option>
                      <option value="WY">Mobile Money</option>
                      <option value="AM">Moov Money</option>
                      <option value="CA">Carte bancaire</option>
                      <option value="AM">Chèque</option>


                    </select>
                  </div>

                  <div>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                  </div>


                  <div class="form-group form-check">
                    <label for="radio" class="">Choisir un élément </label>

                    <div class="p-3">
                      <input type="checkbox" class="demo2" id="demo2">
                      <label for="demo2" class="mx-3" style="font-size: 1rem;">element 1</label>


                      <input type="checkbox" class="demo2 mx-5" id="demo3">
                      <label for="demo3" style="font-size: 1rem;">element 2</label>

                    </div>

                  </div>


                  <div class="form-group form-check">
                    <label for="radio" class="">Sexe </label>

                    <div class="p-2">
                      <input type="radio" name="demo6" class="demo6 mx-auto form-check-input " id="demo6-a" checked>
                      <label for="demo6-a" class="mx-auto" style="font-size: 1rem;"> Féminin </label>

                      <input type="radio" name="demo6" class="demo6 mx-auto form-check-input " id="demo6-b">
                      <label for="demo6-b" class="mx-3" style="font-size: 1rem;"> Masculin </label>

                    </div>
                  </div>


                </div>
              </fieldset> -->

              <div class="mx-auto text-center ">
                <button type="submit" class="btn btn-gradient-success mr-2">Enregistrer</button>
                <button class="btn btn-gradient-info ">Imprimer</button>

              </div>

            </form>


          </div>

        </div>
      </div>
      <!-- <div class="col-md-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Horizontal Form</h4>
            <p class="card-description"> Horizontal form layout </p>
            <form class="forms-sample">
              <div class="form-group row">
                <label for="exampleInputUsername2" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="exampleInputUsername2" placeholder="Username">
                </div>
              </div>
              <div class="form-group row">
                <label for="exampleInputEmail2" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <input type="email" class="form-control" id="exampleInputEmail2" placeholder="Email">
                </div>
              </div>
              <div class="form-group row">
                <label for="exampleInputMobile" class="col-sm-3 col-form-label">Mobile</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="exampleInputMobile" placeholder="Mobile number">
                </div>
              </div>
              <div class="form-group row">
                <label for="exampleInputPassword2" class="col-sm-3 col-form-label">Password</label>
                <div class="col-sm-9">
                  <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
                </div>
              </div>
              <div class="form-group row">
                <label for="exampleInputConfirmPassword2" class="col-sm-3 col-form-label">Re Password</label>
                <div class="col-sm-9">
                  <input type="password" class="form-control" id="exampleInputConfirmPassword2" placeholder="Password">
                </div>
              </div>
              <div class="form-check form-check-flat form-check-primary">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input"> Remember me </label>
              </div>
              <button type="submit" class="btn btn-gradient-primary mr-2">Ajouter</button>
              <button class="btn btn-gradient-danger ">Cancel</button>
            </form>
          </div>
        </div>
      </div> -->

    </div>
  </section>
</template>

<script>
//import '../../assets/vendors/select2/select2.min.css'
//import '../../assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css'





//import '../../assets/vendors/js/vendor.bundle.base.js'
//import '../../assets/vendors/select2/select2.min.js';
//import '../../assets/js/file-upload.js'
//import '../../assets/js/settings.js'
//import '../../assets/js/select2.js'



export default {

  name: 'create-payement',

  data() {
    return {
      //selected: 'A',
      selected: '',
      options: [
        { item: 'F', name: ' Feminin' },
        { item: 'M', name: ' Masculin' },
        //{ item: 'D', name: 'Option C', notEnabled: true },
        // { item: { d: 1 }, name: 'Option D' }       this.forms.push({ mode: '', code: '', prix: '', quantite: '', montant: '' });

      ],

      forms: [
        {
          mode: 'AL',
          quantite: 1,

        }
      ],

      isOpen: false,
    }
  },

  methods: {
    addForm() {
      this.forms.push({ mode: '', code: '', prix: '', quantite: '', montant: '' });
    },
    deleteForm() {
      // this.forms.splice(index, 1);
      this.forms.splice(this.forms.length - 1, 1);
    },




  },




}



</script>

<style>
@import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';


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
  content: '';
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
  content: '';
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


.modal {
 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

</style>










<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Facture</title>
  <!-- Inclure le CDN de Bootstrap -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Facture</h1>
        <hr>
        <div class="row">
          <div class="col-md-6">
            <h4>De:</h4>
            <address>
              Votre nom<br>
              Adresse<br>
              Ville, Pays<br>
              Téléphone : xxx-xxx-xxxx<br>
              Email : votre-email@example.com
            </address>
          </div>
          <div class="col-md-6 text-right">
            <h4>À:</h4>
            <address>
              Nom du client<br>
              Adresse du client<br>
              Ville, Pays<br>
              Téléphone : xxx-xxx-xxxx<br>
              Email : email-du-client@example.com
            </address>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Article</th>
                <th scope="col">Prix unitaire</th>
                <th scope="col">Quantité</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Nom de l'article 1</td>
                <td>$10.00</td>
                <td>2</td>
                <td>$20.00</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Nom de l'article 2</td>
                <td>$5.00</td>
                <td>4</td>
                <td>$20.00</td>
              </tr>
              <tr>
                <th scope="row" colspan="4" class="text-right">Total</th>
                <td>$40.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row">
          <div class="col-md-12 text-right">
            <button type="button" class="btn btn-primary">Imprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Inclure les scripts JavaScript de Bootstrap -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14
