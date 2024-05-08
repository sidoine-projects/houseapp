<template>
  <section class="dashboard">
    <div class="page-header">
      <h3 class="page-title">
        <span class="page-title-icon bg-gradient-white text-white mr-2 ">
          <i class="mdi "> <img src="@/assets/images/dashboard.png" alt="patient" class=""
              style="width: 1rem; height: 1rem;  "></i>

        </span> Tableau de board
      </h3>
      <nav aria-label="breadcrumb">
        <ul class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <span></span>Overview <i class="mdi mdi-view-dashboard-outline icon-sm text-success align-middle"></i>
          </li>
        </ul>
      </nav>
    </div>
    <div class="row">
      <div class="col-md-4 stretch-card grid-margin">
        <div class="card bg-gradient-success card-img-holder text-white">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
            <h4 class="font-weight-normal mb-3">Recettes Totale / jour <i
                class="mdi mdi-diamond mdi-24px float-right"></i>
              <i class="mdi mdi-arrow-up mdi-24px float-right"></i>
            </h4>
            <h2 class="mb-5">150.000 FCFA</h2>
            <router-link to="#" class="nav-link text-white">
              <h6 class="card-text">voir plus</h6>
            </router-link>

          </div>
        </div>
      </div>
      <div class="col-md-4 stretch-card grid-margin">
        <div class="card bg-gradient-danger card-img-holder text-white">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
            <h4 class="font-weight-normal mb-3">Decaissement / jour <i
                class="mdi mdi-diamond-outline mdi-24px float-right"></i><i
                class="mdi mdi-arrow-down mdi-24px float-right"></i>
            </h4>
            <h2 class="mb-5">10.000 FCFA</h2>
            <router-link to="#" class="nav-link text-white">
              <h6 class="card-text">voir plus</h6>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4 stretch-card grid-margin">
        <div class="card bg-gradient-info card-img-holder text-white">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
            <h4 class="font-weight-normal mb-3">Total Patient<i
                class="mdi mdi-account-multiple-plus mdi-24px float-right"></i>
            </h4>
            <h2 class="mb-5">1.000</h2>
            <router-link to="#" class="nav-link text-white">
              <h6 class="card-text">voir plus</h6>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="clearfix">
              <h4 class="card-title float-left">Evolution des encaissements et decaissements annuelle <i
                  class="mdi mdi-arrow-up  text-success  "></i><i class="mdi mdi-arrow-down text-danger"></i></h4>
              <div id="visit-sale-chart-legend" class="rounded-legend legend-horizontal legend-top-right float-right">
                <ul>
                  <li>
                    <span class="legend-dots bg-gradient-success"></span>Encaissement
                  </li>
                  <li>
                    <span class="legend-dots bg-gradient-danger"></span>Décaissement
                  </li>
                  <!-- <li>
                    <span class="legend-dots bg-gradient-info"></span>UK
                  </li> -->
                </ul>
              </div>
            </div>
            <visitAndSalesStatitics class='mt-5' :height='100'></visitAndSalesStatitics>
          </div>
        </div>
      </div>
      <div class="col-md-4 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Evolutions des patients au cours des 03 dernieres années</h4>
            <trafficSourceChart :height='200'></trafficSourceChart>
            <div id="traffic-chart-legend" class="rounded-legend legend-vertical legend-bottom-left pt-0">
              <ul>
                <li>
                  <span class="legend-dots bg-gradient-info"></span>2021
                  <span class="float-right">50%</span>
                </li>
                <li>
                  <span class="legend-dots bg-gradient-success"></span>2022
                  <span class="float-right">60%</span>
                </li>
                <li>
                  <span class="legend-dots bg-gradient-danger"></span>2023
                  <span class="float-right">40%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-lg-4 grid-margin stretch-card">
        <div class="card">
          <!-- <date-picker  :locale="fr" v-model="time1" valueType="format" inline></date-picker> -->
          <date-picker class=" vue-datepicker-body vue-datepicker-current" v-model="time1" valueType="format" inline
            style="border-radius: 50% !important; background-color: #007aff;"></date-picker>
          <!-- <datePicker :lang="lang"/> -->

        </div>
      </div>
      <div class="col-lg-8 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des 10 dernieres ventes</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th> # </th>
                    <th> Patient </th>
                    <th> Actes médicaux </th>
                    <th> Mode payement </th>
                    <th> Quantité </th>
                    <th> Montant </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <!-- <td>
                      <img src="../../assets/images/faces/face1.jpg" class="mr-2" alt="image"> David Grey
                    </td> -->
                    <td>
                      Davidfvfvfvfv fgfgfgfgf Grey Davidfvfvfvfv fgfgfgfgf Grey
                    </td>

                    <td> consulatation </td>
                    <td>
                      <label class="">Espèce</label>
                    </td>
                    <td> 3.000 </td>

                    <td> WD-12345 </td>
                  </tr>
                  <tr>
                    <td> 2 </td>
                    <!-- <td>
                      <img src="../../assets/images/faces/face1.jpg" class="mr-2" alt="image"> David Grey
                    </td> -->
                    <td>
                      David Grey
                    </td>

                    <td> consulatation </td>
                    <td>
                      <label class="">Espèce</label>
                    </td>
                    <td> 3.000 </td>

                    <td> WD-12345 </td>
                  </tr>
                  <tr>
                    <td> 3 </td>
                    <!-- <td>
                      <img src="../../assets/images/faces/face1.jpg" class="mr-2" alt="image"> David Grey
                    </td> -->
                    <td>
                      David Grey
                    </td>

                    <td> consulatation </td>
                    <td>
                      <label class="">Espèce</label>
                    </td>
                    <td> 3.000 </td>

                    <td> WD-12345 </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

  

        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Data table</h4>
            <div class="row">
              <div class="col-12">
                <table class="table" id="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Title</th>
            <th>Product Price</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>aaaa</td>
            <td>aaaa</td>
            <td>aaaa</td>
            <td>aaaa</td>
          </tr>
          
        </tbody>
      </table>    
              </div>
            </div>
          </div>
        </div>


    <!--<div class="row">
      <div class="col-lg-2 grid-margin stretch-card">
        <div class="card">
          <date-picker v-model="time1" valueType="format" inline></date-picker>
        </div>
      </div>

       <div class="col-lg-7 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Recent Updates</h4>
            <div class="d-flex">
              <div class="d-flex align-items-center mr-4 text-muted font-weight-light">
                <i class="mdi mdi-account-outline icon-sm mr-2"></i>
                <span>jack Menqu</span>
              </div>
              <div class="d-flex align-items-center text-muted font-weight-light">
                <i class="mdi mdi-clock icon-sm mr-2"></i>
                <span>October 3rd, 2018</span>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6 pr-1">
                <img src="../../assets/images/dashboard/img_1.jpg" class="mb-2 mw-100 w-100 rounded" alt="image">
                <img src="../../assets/images/dashboard/img_4.jpg" class="mw-100 w-100 rounded" alt="image">
              </div>
              <div class="col-6 pl-1">
                <img src="../../assets/images/dashboard/img_2.jpg" class="mb-2 mw-100 w-100 rounded" alt="image">
                <img src="../../assets/images/dashboard/img_3.jpg" class="mw-100 w-100 rounded" alt="image">
              </div>
            </div>
            <div class="d-flex mt-5 align-items-top">
              <img src="../../assets/images/faces/face3.jpg" class="img-sm rounded-circle mr-3" alt="image">
              <div class="mb-0 flex-grow">
                <h5 class="mr-2 mb-2">School Website - Authentication Module.</h5>
                <p class="mb-0 font-weight-light">It is a long established fact that a reader will be distracted by the
                  readable content of a page.</p>
              </div>
              <div class="ml-auto">
                <i class="mdi mdi-heart-outline text-muted"></i>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>-->
    <!-- <div class="row">
      <div class="col-md-7 stretch-card grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Project Status</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th> # </th>
                    <th> Name </th>
                    <th> Due Date </th>
                    <th> Progress </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <td> Herman Beck </td>
                    <td> May 15, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-success" role="progressbar" style="width: 25%"
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 2 </td>
                    <td> Messsy Adam </td>
                    <td> Jul 01, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-danger" role="progressbar" style="width: 75%"
                          aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 3 </td>
                    <td> John Richards </td>
                    <td> Apr 12, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-warning" role="progressbar" style="width: 90%"
                          aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 4 </td>
                    <td> Peter Meggik </td>
                    <td> May 15, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-primary" role="progressbar" style="width: 50%"
                          aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 5 </td>
                    <td> Edward </td>
                    <td> May 03, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-danger" role="progressbar" style="width: 35%"
                          aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 5 </td>
                    <td> Ronald </td>
                    <td> Jun 05, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 65%"
                          aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 stretch-card grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-white">Todo</h4>
            <todo-list />
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>






<script>
import visitAndSalesStatitics from '../../components/charts/widgets/visitAndSalesStatitics'
import trafficSourceChart from '../../components/charts/widgets/trafficSourceChart'
//import todoList from '../../components/apps/todoList'
import DatePicker from 'vue2-datepicker'

import 'vue2-datepicker/index.css';

import 'vue2-datepicker/locale/fr';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import axios from 'axios';




export default {
  name: 'dashboard',
  components: {
    DatePicker,
    trafficSourceChart,
    visitAndSalesStatitics,
    //todoList
  },
  mounted(){
    axios
    .get("https://www.testjsonapi.com/products/")
    .then((response)=>
    {
      this.products = response.data;
      $('#datatable').DataTable();
    })
  },
  data() {
    return {
      //time1: null,
      products:[]
    }
  },


}
</script>


<style>
th {

  font-weight: bold !important;

}


.vue-datepicker {

  height: 10em !important;
}

.vue-datepicker-body .vue-datepicker-current {
  border-radius: 50%;
  background-color: #007aff;
  color: #fff;
  padding: 5px;
}
</style>