<template>
  <section class="tables">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="javascript:void(0);" class="text-dark font-weight-bold">Trésorerie</a></li>
          <li class="breadcrumb-item active" aria-current="page">Décaissement</li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">Liste</li>
        </ol>
      </nav>
    </div>

    <div class="row">

      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des Décaissements</h4>
            <div class="mx-auto mt-5 mb-5">
              <router-link to="/tresorerie/decaissement">
                <button type="submit" class="btn btn-success mr-2">Ajouter</button>
              </router-link>
            </div>
            <div class="table-responsive">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216);">
                    <th>#</th>
                    <th>Motif</th>
                    <th>Montant</th>
                    <th>Description</th>
                    <th>Facture</th>

                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(decaisse, index) in decaisses" :key="decaisse.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ decaisse.motif }}</td>
                    <td>{{ decaisse.montant }}</td>
                    <td>{{ decaisse.description }}</td>
                    <td style="text-align:center">

                      <a style="text-decoration: none; text-align:center;" class="btn btn-success" size="sm"
                        v-b-tooltip.hover title="Visualiser Facture" variant="info"
                        :href="base_path + 'decaissement/' + decaisse.id + '/facture'">Visualiser Facture</a>

                      <!-- <button @click="getFile(decaisse.id)" target="_blank">Ouvrir le fichier</button> -->
                      <!-- <b-button @click="getFilePath(decaisse.facture)" size="sm" v-b-tooltip.hover title="Visualiser Facture" variant="info">
                          Visualiser Facture
                        </b-button> -->
                        
                    </td>

                    <td class="text-center">
                      <b-button @click="update(decaisse.id)" size="sm" v-b-tooltip.hover title="Modifier"
                        variant="warning">
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



  </section>
</template>
  
<script>
import axios from 'axios'
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
import Axios from "@/_services/caller.services.js";
import { decaissementService } from "@/_services/decaissements_services.js";


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
      base_path: '',
      decaisses: [],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
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
      console.log(Axios)
      this.$router.push("/tresorerie/decaissement/update/" + id);
    },

    // downloadFile(id) {
    //   let apiUrl;
    //   if (process.env.NODE_ENV === 'production') {
    //     // apiUrl = `http://localhost:8080/api/decaissement/${id}/facture`;
    //     apiUrl = `https://api-medpay.akasigroup.net/api/decaissement/${id}/facture`;

    //   } else {
    //     apiUrl = `http://localhost:8000/api/decaissement/${id}/facture`;
    //   }

    //   axios({
    //     // url: 'http://localhost:8000/api/decaissement/${id}/facture', // Remplacez par l'URL de votre endpoint API
    //     url: 'https://api-medpay.akasigroup.net/api/decaissement/${id}/facture', // Remplacez par l'URL de votre endpoint API
    //     method: 'GET',
    //     responseType: 'blob', // Important pour traiter les fichiers binaires
    //   })
    //     .then((response) => {
    //       // Récupérez le contenu du fichier depuis la réponse
    //       const fileContent = response.data;
    //       // Créez un objet URL à partir du contenu du fichier
    //       const url = window.URL.createObjectURL(new Blob([fileContent]));
    //       // Créez un élément d'ancre pour déclencher le téléchargement
    //       const link = document.createElement('a');
    //       link.href = url;
    //       link.setAttribute('download', 'facture.pdf'); // Nom du fichier à télécharger
    //       // Ajoutez l'élément d'ancre à la page
    //       document.body.appendChild(link);
    //       // Simulez un clic sur l'élément d'ancre pour démarrer le téléchargement
    //       link.click();
    //       // Nettoyez l'URL de l'objet créé
    //       window.URL.revokeObjectURL(url);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },



    save(id) {
      decaissementService.getFile(id)
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'nom-du-fichier.pdf'); // Spécifiez ici le nom du fichier à télécharger
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => {
          console.log(err);
        });
    },

    getFile(id) {
      decaissementService.getFile(id).then((res) => {
        // console.log(id)
      })
    }
  },

  mounted() {
    decaissementService.getAllDecaisses().then((res) => {
      this.decaisses = res.data.data
      // console.log(res)

      // On essaye de récupérer le base URL du site 
      const url = res.request.responseURL;
      // console.log(url);
      const indiceApi = url.indexOf("/api/"); //  rechercher la première occurrence d'une sous-chaîne à l'intérieur d'une autre chaîne et renvoie son indice donc un nombre. Elle commence à compter à partir de  0


      if (indiceApi !== -1) {
        const contenu = url.substring(0, indiceApi + 5);
        this.base_path = contenu;
        console.log(this.base_path);
      } else {
        console.error("Le mot '/api/' n'a pas été trouvé dans l'URL.");
      }


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
              extend: "csvHtml5", charset: 'utf-8', bom: true // Extend the excel button
            },
            {
              extend: "excelHtml5", charset: 'utf-8', bom: true
            },
            {
              extend: "pdfHtml5", charset: 'utf-8', bom: true
            },
            { extend: "print", charset: 'utf-8', bom: true },
            { extend: "copy", charset: 'utf-8', bom: true },
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