<template>
  <!-- Affichage des informations du profil -->
  <div class="row">
    <div class="col-md-3">
      <div class="card card-primary card-outline">
        <!-- ... (le reste du code pour la partie gauche du profil) ... -->
      </div>
      <!-- Code added above "A propos" section -->

      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Profil</h3>
          <!-- Add the heading here -->
        </div>

        <div class="card-body">
          <!-- Profile image -->
          <div class="text-center mb-3">
            <img
              src="@/assets/images/user.png"
              alt="image"
              class="profile-image"
            />
          </div>

          <!-- User information -->
          <h3 class="profile-username text-center text-capitalize">
            {{ user.prenom }} {{ user.name }}
          </h3>
          <p class="text-muted text-center text-capitalize">
            <!-- {{ user.role.name }} -->
            {{ getNomRole(user.role_id) }}
          </p>

          <router-link
            v-if="user.id"
            :to="{ name: 'profile-update', params: { id: user.id } }"
            class="nav-link baa text-center"
          >
            Modifier mes informations
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-md-9">
      <div class="card">
        <div class="card-header p-2 d-flex justify-content-between">
          <ul class="nav nav-pills">
            <li class="text-red">
              <!-- Lien actif pour les informations du profil -->
              <span class="nav-link active ok">Informations</span>
            </li>
          </ul>
          <ul class="nav nav-pills">
            <li class="ml-3">
              <!-- Lien pour modifier le mot de passe -->
              <router-link :to="{ path: '/profile/create' }" class="bien">
                Modifier mon mot de passe
              </router-link>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="active tab-pane" id="activity">
              <div class="row post">
                <!-- Affichage des informations du profil -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Nom</h6>
                  <p class="text-capitalize">{{ user.name }}</p>
                </div>
                <!-- Prenoms -->

                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Prénoms</h6>
                  <p class="text-capitalize">{{ user.prenom }}</p>
                </div>
                <!-- Email -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Email</h6>
                  <p>{{ user.email }}</p>
                </div>
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">
                    Nom utilisateur
                  </h6>
                  <p class="text-capitalize">{{ user.nom_utilisateur }}</p>
                </div>
                <!-- Prenoms -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Sexe</h6>
                  <p class="text-capitalize">{{ user.sexe }}</p>
                </div>
                <!-- Email -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Adresse</h6>
                  <p>{{ user.adresse }}</p>
                </div>
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Téléphone</h6>
                  <p class="text-capitalize">{{ user.telephone }}</p>
                </div>
                <!-- Prenoms -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Rôle</h6>
                  <!-- <p class="text-capitalize">{{ user.role.name }}</p> -->
                  <p class="text-capitalize">{{ getNomRole(user.role_id) }}</p>
                </div>
                <!-- Email -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Centre</h6>
                  <p>{{ getNomCentre(user.idcentre) }}</p>
                </div>
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Terminal</h6>
                  <p class="text-capitalize">
                    {{ getNomTerminal(user.terminal_id) }}
                  </p>
                </div>
                <!-- Prenoms -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Autres</h6>
                  <p class="text-capitalize">--</p>
                </div>
                <!-- Email -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Autres</h6>
                  <p>--</p>
                </div>
              </div>
            </div>
            <!-- ... (le reste du code pour d'autres onglets s'il y en a) ... -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin de l'affichage des informations du profil -->
</template>
<script>
import { roleService } from "@/_services";
import { centreService } from "@/_services";
import { terminalService } from "@/_services";
export default {
  name: "app-profil",
  data() {
    return {
      roles: [],
      centres: [],
      terminals: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  created() {
    // Fetch roles data
    this.fetchRoles();
    this.fetchCentre();
    this.fetchTerminal();
  },
  methods: {
    fetchRoles() {
      roleService
        .getAllRoles()
        .then((res) => {
          this.roles = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchCentre() {
      centreService
        .getAllcentres()
        .then((res) => {
          this.centres = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchTerminal() {
      terminalService
        .getAllterminals()
        .then((res) => {
          this.terminals = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getNomRole(roleId) {
    //   const role = this.roles.find((role) => role.id === roleId);
    //   return role ? role.name : "";
    // },
    // getNomRole(roleId) {
    //   const role = $.grep(this.roles, function (role) {
    //     return role.id === roleId;
    //   })[0];
    //   return role ? role.name : "";
    // },
    getNomRole(roleId) {
      let roleName = "";
      $.each(this.roles, function (index, role) {
        if (role.id === roleId) {
          roleName = role.name;
          return false; // Pour sortir de la boucle une fois que le rôle est trouvé
        }
      });
      return roleName;
    },

    getNomCentre(centreId) {
      const centre = this.centres.find((centre) => centre.id === centreId);
      return centre ? centre.nom : "";
    },
    getNomTerminal(terminalId) {
      const terminal = this.terminals.find(
        (terminal) => terminal.id === terminalId
      );
      return terminal ? terminal.nom : "";
    },
  },
};
</script>

<style scoped>
/* Add custom CSS styles here */
.card-body {
  text-align: left;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 2px solid #ccc;
  margin-bottom: 10px;
}

.profile-username {
  font-size: 20px;
  margin-bottom: 5px;
}
.baa {
  font-size: 16px;
  padding: 0px;
}
.ok {
  font-size: 16px;
}
.bien {
  margin: 12px;
  font-size: 20px;
}

.text-muted {
  font-size: 16px;
}

/* Add responsive styles for smaller screens */
@media (max-width: 767px) {
  .col-md-3 {
    order: 2;
    margin-top: 20px;
  }
  .col-md-9 {
    order: 1;
    margin-bottom: 20px;
  }
}
</style>
