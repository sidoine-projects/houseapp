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
          <li class="breadcrumb-item active" aria-current="page">Gestion des patients</li>
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
            <h4 class="card-title">Ajouter un patient</h4>
            <form class="forms-sample row">
              <div class="col-md-6">

                <div class="form-group">
                  <label for="exampleInputUsername1">Username</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password">
                </div>

              </div>


              <div class="col-md-6">


                <div class="form-group">
                  <label for="exampleFormControlSelect1">Large select</label>
                  <select class="form-control   mb-3 " id="exampleFormControlSelect1">
                    <option value="AL">Alabama</option>
                    <option value="WY">Wyoming</option>
                    <option value="AM">America</option>
                    <option value="CA">Canada</option>
                    <option value="RU">Russia</option>
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
                <!-- <div class="form-group">
                  <label class="checkbox-inline">
                    <input type="checkbox" value="">Option 1
                  </label>

                </div> -->


                <div class="form-group form-check">
                  <label for="radio" class="">Sexe </label>

                  <div class="p-2">
                    <input type="radio" name="demo6" class="demo6 mx-auto form-check-input " id="demo6-a" checked>
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem;"> Féminin </label>

                    <input type="radio" name="demo6" class="demo6 mx-auto form-check-input " id="demo6-b">
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem;"> Masculin </label>

                  </div>
                </div>

                <!-- <div class="form-group form-check">
                  <b-form-group label="Sexe" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group size="lg" v-model="selected" :options="options"
                      :aria-describedby="ariaDescribedby" name="radio-inline" value-field="item" text-field="name"
                      class="" disabled-field="notEnabled" id="membershipRadios2"></b-form-radio-group>
                  </b-form-group>
                  <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
                </div> -->

              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">Ajouter</button>
                <button class="btn btn-gradient-danger ">Cancel</button>

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
import '../../assets/vendors/mdi/css/materialdesignicons.min.css'


//import '../../assets/vendors/js/vendor.bundle.base.js'
//import '../../assets/vendors/select2/select2.min.js';
//import '../../assets/js/file-upload.js'
//import '../../assets/js/settings.js'
//import '../../assets/js/select2.js'



export default {

  name: 'create-patient',

  data() {
    return {
      //selected: 'A',
      selected: '',
      options: [
        { item: 'F', name: ' Feminin' },
        { item: 'M', name: ' Masculin' },
        //{ item: 'D', name: 'Option C', notEnabled: true },
        // { item: { d: 1 }, name: 'Option D' }
      ]
    }
  }
}
</script>

<style>
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
</style>