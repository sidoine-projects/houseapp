<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Tableau de board</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Utilisateurs
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Ajouter
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Ajouter un utilisateur</h4>
            <form @submit.prevent="addUser" class="forms-sample row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Nom</label>
                  <input
                    type="text"
                    v-model="name"
                    class="form-control"
                    id="name"
                    placeholder="Nom"
                    @input="clearError('name')"
                  />
                  <small class="text-danger" v-if="nameError">{{
                    nameError
                  }}</small>
                </div>

                <div class="form-group">
                  <label for="prenom">Prénom(s)</label>
                  <input
                    type="text"
                    v-model="prenom"
                    class="form-control"
                    id="prenom"
                    placeholder="Prénom"
                    @input="clearError('prenom')"
                  />
                  <small class="text-danger" v-if="prenomError">{{
                    prenomError
                  }}</small>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="email"
                    mailto:placeholder="xyz@example.com"
                    @input="clearError('email')"
                  />
                  <small class="text-danger" v-if="emailError">{{
                    emailError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="nom_utilisateur">Nom d'utilisateur</label>
                  <input
                    type="text"
                    v-model="nom_utilisateur"
                    class="form-control"
                    id="nom_utilisateur"
                    placeholder="@caissier"
                    @input="clearError('nom_utilisateur')"
                  />
                  <small class="text-danger" v-if="nom_utilisateurError">{{
                    nom_utilisateurError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="telephone">Téléphone</label>
                  <input
                    type="text"
                    v-model="telephone"
                    class="form-control"
                    id="telephone"
                    placeholder="98909776"
                    @input="clearError('telephone')"
                  />
                  <small class="text-danger" v-if="telephoneError">{{
                    telephoneError
                  }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="adresse">Adresse</label>
                  <input
                    type="text"
                    v-model="adresse"
                    class="form-control"
                    id="adresse"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                    @input="clearError('adresse')"
                  />
                  <small class="text-danger" v-if="adresseError">{{
                    adresseError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="role_id">Rôle:</label>
                  <select id="role_id" v-model="role_id" class="form-control">
                    <option value="">Sélectionnez un rôle</option>
                    <option
                      v-for="role in roles"
                      :value="role.id"
                      :key="role.id"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                  <small class="text-danger" v-if="role_idError">{{
                    role_idError
                  }}</small>
                </div>

                <div class="form-group">
                  <label for="idcentre">Centre Sanitaire:</label>
                  <select id="idcentre" v-model="idcentre" class="form-control">
                    <option value="">Sélectionnez un centre sanitaire</option>
                    <option
                      v-for="centre in centres"
                      :value="centre.id"
                      :key="centre.id"
                    >
                      {{ centre.nom }}
                    </option>
                  </select>
                  <small class="text-danger" v-if="idcentreError">{{
                    idcentreError
                  }}</small>
                </div>

                <div class="form-group">
                  <label for="password">Mot de passe</label>
                  <input
                    type="password"
                    v-model="password"
                    @blur="validatePassword"
                    class="form-control"
                    id="password"
                    placeholder="........."
                    @input="clearError('password')"
                  />
                  <small class="text-danger" v-if="passwordError">{{
                    passwordError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="radio" class="">Sexe</label>
                  <div class="p-2">
                    <input
                      type="radio"
                      v-model="sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-a"
                      value="Féminin"
                      @input="clearError('sexe')"
                    />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem"
                      >Féminin</label
                    >
                    <input
                      type="radio"
                      v-model="sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-b"
                      value="Masculin"
                      @input="clearError('sexe')"
                    />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem"
                      >Masculin</label
                    >
                  </div>
                  <small class="text-danger" v-if="sexeError">{{
                    sexeError
                  }}</small>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-success mr-2">
                  Ajouter
                </button>
                <button @click="cancel" class="btn btn-danger">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { LoginService } from "@/_services";
import { centreService } from "@/_services";
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-patient",

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      permission: JSON.parse(localStorage.getItem("permission")),
      idcentre: "",
      role_id: "",
      name: "",
      sexe: "Féminin",
      adresse: "",
      nom_utilisateur: "",
      email: "",
      telephone: "",
      password: "",
      prenom: "",
      centres: [],
      roles: [],
      passwordError: "",
      nameError: "",
      prenomError: "",
      emailError: "",
      nom_utilisateurError: "",
      telephoneError: "",
      adresseError: "",
      idcentreError: "",
      role_idError: "",
      passwordError: "",
      sexeError: "",
      users: [],
    };
  },

  mounted() {
    centreService
      .getAllcentres()
      .then((res) => {
        this.centres = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    roleService
      .getAllRoles()
      .then((res) => {
        this.roles = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.fetchUsers();
  },
  methods: {
    cancel() {
      this.$toast.error("Enregistrement annulé!", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/user/list");
    },
    validatePassword() {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(this.password)) {
        this.passwordError =
          "Le mot de passe doit comporter au moins 8 caractères avec une majuscule, une minuscule, un chiffre et un caractère spécial.";
      } else {
        this.passwordError = "";
      }
    },
    // handleRoleChange() {
    //   if (this.role_id === "admin") {
    //     this.idcentre = ""; // Réinitialiser le centre sélectionné si le rôle est admin
    //   }
    // },
    handleRoleChange() {
      if (this.role_id === "1") {
        this.idcentre = ""; // Réinitialiser le centre sélectionné si le rôle est admin
        console.log("Role ID sélectionné:", this.role_id); // Affiche le role_id dans la console
      }
    },

    addUser(event) {
      event.preventDefault();
      // // Check if a user with the same role and center already exists
      // const existingUser = this.users.find(
      //   (user) =>
      //     user.role_id === this.role_id && user.idcentre === this.idcentre
      // );

      // if (existingUser) {
      //   this.$toast.error(
      //     "Un utilisateur avec le même rôle existe déjà dans ce centre.",
      //     {
      //       position: POSITION.TOP_RIGHT,
      //       timeout: 3000,
      //       bodyStyle: {
      //         borderRadius: "10px",
      //         backgroundColor: "#f0f0f0",
      //         color: "#333",
      //         fontWeight: "bold",
      //       },
      //     }
      //   );
      //   return; // Stop execution if user already exists
      // }

      // // Check if a user with the same role and center already exists
      // const existingDirector = this.users.find(
      //   (user) => user.role_id === 5 && user.idcentre === this.idcentre
      // );

      // if (existingDirector) {
      //   this.$toast.error(
      //     "Un utilisateur avec le rôle de Directeur existe déjà dans ce centre.",
      //     {
      //       position: POSITION.TOP_RIGHT,
      //       timeout: 3000,
      //       bodyStyle: {
      //         borderRadius: "10px",
      //         backgroundColor: "#f0f0f0",
      //         color: "#333",
      //         fontWeight: "bold",
      //       },
      //     }
      //   );
      //   return; // Stop execution if a director already exists
      // }
      // Check if a user with the same role and center already exists
      // Vérification du numéro de téléphone
      const phonePattern = /^\d{8}$/; // Modifiez le motif selon votre format de numéro souhaité
      if (!phonePattern.test(this.telephone)) {
        this.telephoneError =
          "Le numéro de téléphone doit être au format valide (e.g. 62032158).";
        return; // Arrêter l'exécution si le numéro de téléphone est invalide
      } else {
        this.telephoneError = ""; // Réinitialiser l'erreur s'il est valide
      }
      if (this.role_id === 5) {
        const existingDirector = this.users.find(
          (user) => user.role_id === 5 && user.idcentre === this.idcentre
        );

        if (existingDirector) {
          this.$toast.error(
            "Un utilisateur avec le rôle de Directeur existe déjà dans ce centre.",
            {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontWeight: "bold",
              },
            }
          );
          return; // Stop execution if a director already exists
        }
      }

      // Vérifier le nombre d'utilisateurs actuellement enregistrés
      if (this.users.length >= 10) {
        this.$toast.error(
          "La limite d'utilisateurs est atteinte. Vous ne pouvez pas ajouter plus de 10 utilisateurs.",
          {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          }
        );
        return; // Arrêter l'exécution de la fonction
      }

      const user = {
        idcentre: this.idcentre,
        role_id: this.role_id,
        name: this.name,
        sexe: this.sexe,
        adresse: this.adresse,
        prenom: this.prenom,
        telephone: this.telephone,
        nom_utilisateur: this.nom_utilisateur,
        email: this.email,
        password: this.password,
      };

      LoginService.addUser(user)
        .then((response) => {
          console.log("User ajouté avec succès !");
          this.idcentre = "";
          this.role_id = "";
          this.name = "";
          this.sexe = "";
          this.adresse = "";
          this.prenom = "";
          this.telephone = "";
          this.nom_utilisateur = "";
          this.email = "";
          this.password = "";

          this.$toast.success("Utilisateur ajouté avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/user/list");
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'utilisateur :", error);
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data.errors;
            this.nameError = errorData.name ? errorData.name[0] : "";
            this.prenomError = errorData.prenom ? errorData.prenom[0] : "";
            this.emailError = errorData.email ? errorData.email[0] : "";
            this.nom_utilisateurError = errorData.nom_utilisateur
              ? errorData.nom_utilisateur[0]
              : "";
            this.telephoneError = errorData.telephone
              ? errorData.telephone[0]
              : "";
            this.adresseError = errorData.adresse ? errorData.adresse[0] : "";
            this.idcentreError = errorData.idcentre
              ? errorData.idcentre[0]
              : "";
            this.role_idError = errorData.role_id ? errorData.role_id[0] : "";
            this.passwordError = errorData.password
              ? errorData.password[0]
              : "";
            this.sexeError = errorData.sexe ? errorData.sexe[0] : "";
          } else {
            // Gestion des autres erreurs
          }
        });
    },
    clearError(fieldName) {
      this[fieldName + "Error"] = "";
    },
    fetchUsers() {
      // Appeler l'API pour récupérer la liste des utilisateurs
      LoginService.getAllUsers()
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des utilisateurs :",
            error
          );
        });
    },
  },
};
</script>
<style>
select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6 + label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6 + label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked + label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked + label::before {
  background-color: #45c28e;
}
</style>
