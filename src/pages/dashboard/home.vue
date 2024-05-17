<template>
  <section class="dashboard">
    <div class="page-header">
      <h3 class="page-title"></h3>
      <nav aria-label="breadcrumb"></nav>
    </div>
    <div class="row">
      <div
        class="col-md-4 stretch-card grid-margin"
       
      >
        <!-- v-if="permission.includes('Voir_module_paramètre')" -->
        <!-- v-if="permission.includes('Caissier')" -->
        <!-- v-if="isUserRoleAdmin(id)" -->
        <!-- v-if="user.role_id == 1" -->

        <div class="card card-img-holder text-black">
          <img
            src="@/assets/images/setting.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          />
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">Paramétrage</h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/dashboard"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 stretch-card grid-margin"
        
      >
        <!-- v-if="permission.includes('Voir_module_patient')" -->
        <div class="card card-img-holder text-black">
          <img
            src="@/assets/images/patients.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          />
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">Gestion des patients</h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/patients/list"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 stretch-card grid-margin"
        
      >
        <!-- v-if="permission.includes('Voir_module_indigence_patient')" -->
        <div class="card card-img-holder text-black">
          <img
            src="@/assets/images/indigence.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          />
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">Indigence Patient</h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/indigence-patient/list-indigence-patient"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>

      <!-- <div class="col-md-4 stretch-card grid-margin" >
          <div class="card card-img-holder text-black">
            <img
              src="@/assets/images/actsmedicaux.png"
              style="width: 25%"
              class="mt-4 ml-auto mr-auto"
            />
            <div class="card-body">
              <center>
                   <h2 class="mb-5" style="font-size:20px">Actes Médicaux</h2>
              </center>
              <center>
                <button
                  class="btn"
                  style="background: #0b5d3f; border-radius: 3rem"
                >
                  <router-link
                    class="nav-link"
                    style="color: #fff; font-size:  1rem"
                    to="/actes-medicaux/list"
                  >
                    Acceder au module
                  </router-link>
                </button>
              </center>
            </div>
          </div>
        </div> -->
    </div>
    <div class="row">
      <div
        class="col-md-4 stretch-card grid-margin"
        
      >
        <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->
        <div class="card card-img-holder text-black">
          <img
            src="@/assets/images/assurancee.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          />
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">Assurance patient</h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/priseencharge/list"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>
      <!-- <div
          class="col-md-4 stretch-card grid-margin" v-if="permission.includes('Voir_module_paiement_et_facturation')"
        > -->
      <div
        class="col-md-4 stretch-card grid-margin"
       
      >
        <!-- v-if="permission.includes('Voir_module_paiement_et_facturation')" -->
        <div class="card card-img-holder text-black">
          <!-- <img
            src="@/assets/images/paiements.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          /> -->
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">
                Paiements et facturation
              </h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/payement/list"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 stretch-card grid-margin"
       
      >
        <!-- v-if="permission.includes('Voir_module_tresorier')" -->
        <div class="card card-img-holder text-black">
          <!-- <img
            src="@/assets/images/treasury.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          /> -->
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">Trésorerie</h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/tresorerie/list-encaissement"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 stretch-card grid-margin"
       
      >
        <!-- v-if="permission.includes('Voir_module_rapport')" -->
        <div class="card card-img-holder text-black">
          <!-- <img
            src="@/assets/images/reports.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          /> -->
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">Rapports</h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/parametrage"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 stretch-card grid-margin"
        
      >
        <div class="card card-img-holder text-black">
          <!-- <img
            src="@/assets/images/reports.png"
            style="width: 25%"
            class="mt-4 ml-auto mr-auto"
          /> -->
          <div class="card-body">
            <center>
              <h2 class="mb-5" style="font-size: 20px">Rapport Général</h2>
            </center>
            <center>
              <button
                class="btn"
                style="background: #0b5d3f; border-radius: 3rem"
              >
                <router-link
                  class="nav-link"
                  style="color: #fff; font-size: 1rem"
                  to="/rapport-general/hospital"
                >
                  Acceder au module
                </router-link>
              </button>
            </center>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-4 stretch-card grid-margin">
          <div class="card card-img-holder text-black">
            <img
              src="@/assets/images/hopital.png"
              style="width: 25%"
              class="mt-4 ml-auto mr-auto"
            />
            <div class="card-body">
              <center>
                   <h2 class="mb-5" style="font-size:20px">Gestion des EPHs</h2>
              </center>
              <center>
                <button
                  class="btn"
                  style="background: #0b5d3f; border-radius: 3rem"
                >
                  <router-link
                    class="nav-link"
                    style="color: #fff; font-size:  1rem"
                    to="/eph/list"
                  >
                    Acceder au module
                  </router-link>
                </button>
              </center>
            </div>
          </div>
        </div> -->
    </div>
    <!-- <div class="row">
        
      </div> -->
  </section>
</template>

<script>
export default {
  name: "acceuil",
  data() {
    return {
      time1: null,
      user: JSON.parse(localStorage.getItem("user")),
      permission: JSON.parse(localStorage.getItem("permission")),
    };
  },
};
</script>
<!-- <script>
  export default {
    name: "acceuil",
    data() {
      return {
        time1: null,
        user: null,
      };
    },
    mounted() {
      this.fetchUserFromLocalStorage();
    },
    computed: {
      isUserRoleAdmin() {
        return (id) => this.user && this.user.role_id && this.user.role_id === id;
      },
    },
    methods: {
      fetchUserFromLocalStorage() {
        const user = localStorage.getItem("user");
        if (user) {
          this.user = JSON.parse(user);
        }
      },
    },
  };
  </script> -->

<style scoped>
.text-black:hover {
  transition: 1s;
  background: #a5ddbe;
}
</style>
