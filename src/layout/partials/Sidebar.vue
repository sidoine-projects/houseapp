<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <a href="javascript:void(0);" class="nav-link">
            <div
              class="navbar-brand brand-logo text-center navbar-brand-wrapper d-flex align-items-top justify-content-center"
            >
              <!-- <img src="@/assets/images/logopay.jpeg" alt="profile" style="width: 100%; height: 100%" /> -->
            </div>
          </a>
        </li>

        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/dashboard/talent">
            <span class="menu-title">Tableau de board</span>
            <i class="mdi menu-icon mdi-view-dashboard-outline"> </i>
          </router-link>
        </li>

        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_patient')" -->

          <router-link
            class="nav-link"
            to="/formations/list"
            style="text-decoration: none"
          >
            <span class="menu-title">Formations</span>

            <i class="mdi menu-icon mdi-clipboard-multiple-outline"> </i>
          </router-link>
        </li>

        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link
            class="nav-link"
            to="/experiences/list"
            style="text-decoration: none"
          >
            <span class="menu-title">Expérience</span>

            <i class="mdi menu-icon mdi-bookmark-multiple-outline"> </i>

            <!-- <i class="menu-arrow"></i> -->
          </router-link>
        </li>
        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link
            class="nav-link"
            to="/competences/list"
            style="text-decoration: none"
          >
            <span class="menu-title">Compétences</span>

            <i class="mdi menu-icon mdi-head-cog-outline"> </i>

            <!-- <i class="menu-arrow"></i> -->
          </router-link>
        </li>
        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link class="nav-link" to="/candidatures/list" style="text-decoration: none">
            <span class="menu-title">Candidatures</span>

            <i class="mdi menu-icon mdi-checkbox-multiple-marked-outline"> </i>

            <!-- <i class="menu-arrow"></i> -->
          </router-link>
        </li>
        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link
            class="nav-link"
            to="#"
            style="text-decoration: none"
          >
            <span class="menu-title">Suivi mensuel</span>

            <i class="mdi menu-icon mdi mdi-table-edit"> </i>

            <!-- <i class="menu-arrow"></i> -->
          </router-link>
        </li>
        <!-- 
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/indigence-patient/list-indigence-patient"
            style="text-decoration: none"
          >
            <span class="menu-title">Indigences Patient</span>

            <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
            /></i>

          </router-link>
        </li> -->

        <!-- <li class="nav-item">

          <router-link
            class="nav-link"
            to="/payement/list"
            style="text-decoration: none"
          >
            <span class="menu-title">Paiement et <br />Facturation</span>

            <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/pay.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
            /></i>

     
          </router-link>
        </li> -->

        <li class="nav-item sidebar-actions">
          <span class="nav-link" v-on:click="logout">
            <button
              class="btn btn-block btn-gradient-danger pt-3 mx-auto text-center"
            >
              <i
                class="mdi mdi-power text-dark"
                style="color: black !important"
              ></i>
              <span style="color: black !important">Déconnexion</span>
            </button>
          </span>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebar",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      permission: JSON.parse(localStorage.getItem("permission")),
      collapses: [{ show: false }, { show: false }, { show: false }],
    };
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    },
    logout() {
      LoginService.logout();
    },
  },
  mounted() {
    const body = document.querySelector("body");
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll(".sidebar .nav-item").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  },
  watch: {
    $route() {
      document.querySelector("#sidebar").classList.toggle("active");
    },
  },
};
</script>

<style>
/* .bien{
  filter: brightness(100%);
  } */

.special-style-icon {
  color: black !important;
}

.nav-link {
  font-weight: bold;
  font-size: 4px;

  /* font-family: "Montserrat"; */
}

/* .menu-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100% !important; /* Pour que le contenu s'étende à 100% 
  padding: 10px !important; /* Ajoutez le padding que vous souhaitez 
} */

.nav-item {
  border-radius: 0 10px 10px 0; /* Coins arrondis sur le côté droit */
}
</style>
