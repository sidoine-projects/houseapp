<template>
  <section class="register container-scroller">
    <div class="row">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <div class="content-wrapper align-items-center auth">
          <div class="w-100 flex-grow">
            <div class="col-xl-8 mx-auto col-lg-12 mx-auto col-md-12">
              <div class="auth-form-light text-left p-5 mt-5 card-custom">
                <h3
                  class="text-center font-weight-bold text-dark font-weight-bold"
                >
                  Choisissez votre inscription
                </h3>
                <hr />
                <div class="row">
                  <div
                    class="form-group controls col-md-6 col-lg-6 form-group-orange"
                  >
                    <p style="font-size: 25px; font-weight: bold">
                      Vous êtes un CANDIDAT ?
                    </p>
                    <router-link
                      to="/register/talent"
                      class="btn-orange font-weight-bold mt-5"
                      style="font-size: 20px"
                    >
                      Cliquer ici &rarr;
                    </router-link>
                    <!-- <button class="btn-orange font-weight-bold mt-5" style="font-size: 20px">Cliquer ici &rarr;</button> -->
                  </div>
                  <div
                    class="form-group controls col-md-6 col-lg-6 form-group-blue"
                  >
                    <p style="font-size: 25px; font-weight: bold">
                      Vous êtes un RECRUTEUR ?
                    </p>
                    <router-link
                      to="/register/society"
                      class="btn-blue font-weight-bold mt-5"
                      style="font-size: 20px"
                    >
                      Cliquer ici &rarr;
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- content-wrapper ends -->
      </div>

      <!-- page-body-wrapper ends -->
    </div>

    <Footer />
  </section>
</template>

<script>
import Header from "../../layout/partials/Header-home";
import Footer from "../../layout/partials/Footer-auth";

export default {
  name: "register",
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.card-custom {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.form-group-orange {
  background-color: orange;
  text-align: center;
  /* border-radius: 10px; */
  padding: 20px;
  margin: 10px 0;
}

.form-group-blue {
  background-color: #1382d6;
  text-align: center;
  /* border-radius: 10px; */
  padding: 20px;
  margin: 10px 0;
}

.form-group-orange p,
.form-group-blue p {
  color: white;
}

.btn-orange {
  background-color: orange;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-blue {
  background-color: #1382d6;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-orange:hover {
  background-color: darkorange;
}

.btn-blue:hover {
  background-color: #0f6ab0;
}

/* Vos styles CSS ici */
</style>
