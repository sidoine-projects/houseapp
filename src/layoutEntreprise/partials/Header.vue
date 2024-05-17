<template>
  <b-navbar
    id="template-header"
    class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
    toggleable="lg"
  >
    <div
      class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center"
    >
      <router-link class="navbar-brand brand-logo" to="/">
        <img
          src="@/assets/images/logohire.png"
          alt="profile"
          style="text-align: center; width: 60%; height: 75%"
        />
      </router-link>

      <router-link class="navbar-brand brand-logo-mini" to="/">
        <img
          src="@/assets/images/logohire.png"
          alt="logo"
          style="width: 80%; height: 40%"
        />
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <button
        class="navbar-toggler navbar-toggler align-self-center d-lg-block"
        type="button"
        @click="toggleSidebar()"
      >
        <span class="mdi mdi-menu"></span>
      </button>
      <div class="search-field d-none d-md-block">
        <div class="nav-profile-text">
          <router-link class="nav-link" to="/">
            <span class="mb-0 text-black"
              >Accueil
              <i
                class="mdi mdi-home page-title-icon bg-gradient-info text-white mr-2"
              ></i
            ></span>
          </router-link>
        </div>
      </div>
      <b-navbar-nav class="navbar-nav-right ml-auto">
        <b-nav-item-dropdown right class="nav-profile">
          <template slot="button-content">
            <span
              class="nav-link dropdown-toggle"
              id="profileDropdown"
              href="javascript:void(0);"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <!-- <div class="nav-profile-img">
                <img src="@/assets/images/user.png" alt="image" />
                <span class="availability-status online"></span>
              </div> -->
              <div class="nav-profile-img">
                <router-link to="/profile/list">
                  <img src="@/assets/images/user.png" alt="image" />
                  <span class="availability-status online"></span>
                </router-link>
              </div>
              <div class="nav-profile-text">
                <!-- <p class="mb-1 text-black">{{ user.nom }} {{ user.prenom }}</p> -->
              </div>
            </span>
          </template>
          <!-- <b-dropdown-item class="preview-item">
            <i class="mdi mdi-account mr-2 text-success"></i> Profile
          </b-dropdown-item> -->
        </b-nav-item-dropdown>
        <b-nav-item
          class="nav-logout d-none d-lg-block"
          @click="showLogoutModal"
        >
          <i class="mdi mdi-power" style="font-size: 25px; color: brown"></i>
        </b-nav-item>
        <!-- Modal de confirmation de déconnexion -->
        <b-modal
          ref="logoutModal"
          title="Confirmation de déconnexion"
          @ok="logout"
          ok-variant="info"
        >
          Êtes-vous sûr de vouloir vous déconnecter ?
        </b-modal>
      </b-navbar-nav>
      <button
        class="navbar-toggler navbar-toggler-right align-self-center"
        type="button"
        @click="toggleMobileSidebar()"
      >
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script>
import { LoginService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "app-header",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  methods: {
    toggleSidebar: () => {
      document.querySelector("body").classList.toggle("sidebar-icon-only");
    },
    toggleMobileSidebar: () => {
      document.querySelector("#sidebar").classList.toggle("active");
    },
    showLogoutModal() {
      this.$refs.logoutModal.show();
    },
    logout() {
      // Code de déconnexion ici
      // Par exemple, vous pouvez appeler une fonction de déconnexion de votre service d'authentification
      LoginService.logout()
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch((error) => {
          // Gérer les erreurs de déconnexion
          console.error("Erreur lors de la déconnexion :", error);
        });
    },
  },

  mounted() {
    console.log(this.user)
  },
};
</script>

<style scoped></style>
