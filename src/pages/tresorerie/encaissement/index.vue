<template>
  <section class="tables">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="javascript:void(0);" class="text-dark font-weight-bold">Trésorerie</a></li>
          <li class="breadcrumb-item active" aria-current="page">Encaissement</li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">Liste</li>
        </ol>
      </nav>
    </div>



    <div class="row">

      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des Encaissements</h4>
            <div class="mx-auto mt-5 mb-5">
              <router-link to="/tresorerie/encaissement">
                <button type="submit" class="btn btn-success mr-2">Ajouter</button>
              </router-link>  
            </div>

            <div class="table-responsive">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216);">
                    <th> #</th>
                    <th> Mode</th>
                    <th>Nom</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Motif</th>
                    <th>Montant</th>
                    <th>Actions</th>
                    <!-- <th class="text-center">Actions</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(caisse, index) in caisses" :key="caisse.id">
                    <td>{{ index +1 }}</td>
                    <!-- <td>
                      <div v-for="mode in modes" :key="mode.id" v-if="mode.id === caisse.mode_id">
                        {{ mode.name }} {{getNomMode(caisse.mode_id)}}
                      </div>
                    </td> -->
                    <td>
                      {{getNomMode(caisse.mode_id)}}
                    </td>
                    <td>{{ caisse.name }}</td>
                    <td>{{ caisse.telephone }}</td>
                    <td>{{ caisse.email }}</td>
                    <td>{{ caisse.libelle }}</td>
                    <td>{{ caisse.montant }}</td>
                    <!-- <td>
                <label class="badge badge-info">Espèce</label>
              </td> -->
                    <td class="text-center">
                      <!-- <button class="btn btn-outline-primary">+</button> -->
                        <b-button size="sm" @click="detail(caisse)" v-b-tooltip.hover title="Détail" variant="success">
                          <i class="mdi  mdi-file-document text-white menu-icon"></i>
                        </b-button>
                      
                        <b-button size="sm" @click="update(caisse.id)" v-b-tooltip.hover title="Modifier" variant="warning">
                          <i class="mdi mdi mdi-table-edit text-white menu-icon"></i>
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
    <div class="modal fade" id="showDetail" tabindex="-1" role="dialog" aria-labelledby="showDetailLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="alert alert-success" role="alert">
            <p class="text-center">Informations concernant l'encaissement</p>
          </div>
          <div class="modal-body">
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Motif</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.libelle }}</p>
                </div>
              </div>
            </div>

            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Description</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="mx-auto">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    

  </section>
</template>
  
<script>
import $ from 'jquery';
import * as JSZip from '../../../../node_modules/jszip';
window.JSZip = JSZip;
import pdfMake from '../../../../node_modules/pdfmake/build/pdfmake';
import vfsFonts from '../../../../node_modules/pdfmake/build/vfs_fonts';
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import '../../../../node_modules/datatables.net-dt';
import "../../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from '@/assets/datatable/French.json';
import "../../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { encaissementService } from "@/_services";
import { modeService } from "@/_services";


require('datatables.net-dt');


const itemsTwo = [
  { Status: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { Status: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  {
    Status: false,
    age: 89,
    first_name: 'Geneva',
    last_name: 'Wilson',
    _rowVariant: 'danger'
  },
  {
    Status: true,
    age: 40,
    first_name: 'Thor',
    last_name: 'Macdonald',
    _cellVariants: { Status: 'success', age: 'info', first_name: 'warning' }
  },
  { Status: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' }
]
export default {
  name: 'patient-create',
  data() {
    return {
      itemsTwo: itemsTwo,
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      description: "",
      libelle: "",
      caisses: [],
      modes: [],
      fields: [
        {
          key: 'first_name',
          label: 'Person first name',
          sortable: true
        },
        {
          key: 'last_name',
          label: 'Person last name',
          sortable: true
        },
        {
          key: 'age',
          label: 'Person age',
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: 'success'
        }
      ],
    }
  }, 

  methods: {

    update(id) {
      this.$router.push("/tresorerie/update/" + id);
    },

    detail(caisse) {      
      this.description = caisse.description;
      this.libelle = caisse.libelle;
      $("#showDetail").modal("show");
    },

    getNomMode(idMode) {
      const modes = this.modes.find((mode) => mode.id === idMode);
      return modes ? modes.name : "Autre";
    },


  },

  mounted() {
    
    modeService.getAllModes().then((res) => {
      this.modes = res.data.data
      console.log(   this.modes)
    }).catch(err => {
      console.log(err)
    })

    encaissementService.getAllCaisses().then((res) => {
      this.caisses = res.data.data

      console.log( this.caisses)
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
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
                extend: "csvHtml5", charset: 'utf-8', bom: true// Extend the excel button
              },
              {
                extend: "excelHtml5",charset: 'utf-8', bom: true
              },
              {
                extend: "pdfHtml5",charset: 'utf-8', bom: true
              },
              { extend: "print" , charset: 'utf-8', bom: true},
              { extend: "copy" , charset: 'utf-8', bom: true},
            ],
          });
      });
      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    });
  }
}
</script>


<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

</style>