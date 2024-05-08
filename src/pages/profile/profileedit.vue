<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/profile/list"> Informations profil </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Modifier mes informations
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Informations de base</h4>
            <form @submit.prevent="update" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nom<span style="color: red">*</span></label>
                  <input
                    type="text"
                    v-model="user.name"
                    class="form-control"
                    id="name"
                    placeholder="Nom"
                  />
                </div>
                <div class="form-group">
                  <label for="prenom"
                    >Prénom<span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.prenom"
                    class="form-control"
                    id="prenom"
                    placeholder="Prénom"
                  />
                </div>
                <div class="form-group">
                  <label for="nom_utilisateur"
                    >Nom utilisateur<span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.nom_utilisateur"
                    class="form-control"
                    id="nom_utilisateur"
                    placeholder="@caissier"
                  />
                </div>
                <div class="form-group">
                  <label for="email"
                    >Email<span style="color: red">*</span></label
                  >
                  <input
                    type="email"
                    v-model="user.email"
                    class="form-control"
                    id="email"
                    placeholder="xyz@example.com"
                  />
                </div>
                <div class="form-group">
                  <label for="adresse"
                    >Adresse<span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.adresse"
                    class="form-control"
                    id="adresse"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                  />
                </div>
                <div class="form-group">
                  <label for="telephone"
                    >Téléphone<span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.telephone"
                    class="form-control"
                    id="telephone"
                    placeholder="98909776"
                  />
                </div>
                <div class="form-group">
                  <label for="radio" class="">Sexe</label>
                  <div class="p-2">
                    <input
                      type="radio"
                      v-model="user.sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-a"
                      value="Féminin"
                    />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem"
                      >Féminin</label
                    >
                    <input
                      type="radio"
                      v-model="user.sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-b"
                      value="Masculin"
                    />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem"
                      >Masculin</label
                    >
                    <!-- John12@a -->
                  </div>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-success mr-2">
                  Enregistrer
                </button>
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
// import { centreService } from "@/_services";
// import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "profile-update",
  props: ["id"],
  data() {
    return {
      user: {
        adresse: "",
        sexe: "Féminin",
        name: "",
        telephone: "",
        email: "",
        password: "",
        nom_utilisateur: "",
        prenom: "",
        // id: "",
      },
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      LoginService.getUser(this.id)
        .then((res) => {
          this.user = res.data.data;
          this.user.id = this.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    update() {
      LoginService.updateProfil(this.user)
        .then((res) => {
          console.log(res);
          this.$toast.success("Modification effectuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/profile/list");
        })
        .catch((err) => {
          this.$toast.error(
            "Erreur lors de la modification. Veuillez réessayer !",
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
        });
    },
  },
};
</script>

<style>
.logo-brand {
  display: flex;
  justify-content: space-between;
}

.logo-brand img {
  margin-left: 0;
  margin-right: 10px;
}

@media screen and (max-height: 767px) {
  #rc-imageselect,
  .g-recaptcha {
    transform: scale(0.57);
    -webkit-transform: scale(0.67);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }
}

.connect {
  font-size: 1.2rem;
  color: #fff;
}

.linked:hover {
  text-decoration: none;
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
