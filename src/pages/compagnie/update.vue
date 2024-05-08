<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">Compagnie</li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Modifier
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier une compagnie</h4>
            <form class="forms-sample row" @submit.prevent="update">
              <!-- <div class="col-md-12">
                <p v-if="wrong > 0">
                  <b>Merci de corriger vos données</b>
                </p>
              </div> -->
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleInputUsername1">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    placeholder="Nom"
                    v-model="compagnie.nom"
                    @input="clearError('nom')"
                  />
                  <div v-if="formErrors.nom" class="error-message">
                    {{ formErrors.nom }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Adresse</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                    v-model="compagnie.adresse"
                    @input="clearError('adresse')"
                  />
                  <div v-if="formErrors.adresse" class="error-message">
                    {{ formErrors.adresse }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputPassword1"
                    mailto:placeholder="xyz@example.com"
                    v-model="compagnie.email"
                    @input="clearError('email')"
                  />
                  <div v-if="formErrors.email" class="error-message">
                    {{ formErrors.email }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1">Téléphone</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder="90098989"
                    v-model="compagnie.telephone"
                    @input="clearError('telephone')"
                  />
                  <div v-if="formErrors.telephone" class="error-message">
                    {{ formErrors.telephone }}
                  </div>
                </div>
                <div class="mx-auto">
                  <button type="submit" class="btn btn-success mr-2">
                    Modifier
                  </button>
                  <!-- <button class="btn btn-danger">Cancel</button> -->
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { compagnieService } from "@/_services";
// import "@/assets/vendors/mdi/css/materialdesignicons.min.css";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-compagnie",
  props: ["id"],
  data() {
    return {
      compagnie: {},
      formErrors: {
        nom: null,
        adresse: null,
        email: null,
        telephone: null,
      },
    };
  },
  mounted() {
    compagnieService.getCompagnies(this.id).then((res) => {
      this.compagnie = res.data.data;
      this.compagnie.id = this.id;
    });
  },
  methods: {
    update() {
      this.resetFormErrors();

      if (!this.validateForm()) {
        return;
      }

      compagnieService
        .updateCompagnie(this.compagnie)
        .then((res) => {
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
          this.$router.push("/compagnie/list");
        })
        .catch((err) => {
          console.error(
            "Erreur lors de la modification de la compagnie :",
            err
          );
        });
    },

    clearError(fieldName) {
      this.formErrors[fieldName] = null;
    },

    resetFormErrors() {
      this.formErrors = {
        nom: null,
        adresse: null,
        email: null,
        telephone: null,
      };
    },

    validateForm() {
      let isValid = true;

      if (!this.compagnie.nom) {
        this.formErrors.nom = "Veuillez saisir le nom de la compagnie.";
        isValid = false;
      }

      if (!this.compagnie.adresse) {
        this.formErrors.adresse = "Veuillez saisir l'adresse de la compagnie.";
        isValid = false;
      }

      if (!this.compagnie.email) {
        this.formErrors.email = "Veuillez saisir l'email de la compagnie.";
        isValid = false;
      } else if (!this.isValidEmail(this.compagnie.email)) {
        this.formErrors.email = "Veuillez saisir une adresse email valide.";
        isValid = false;
      }

      if (!this.compagnie.telephone) {
        this.formErrors.telephone =
          "Veuillez saisir le numéro de téléphone de la compagnie.";
        isValid = false;
      } else if (!this.isValidTelephone(this.compagnie.telephone)) {
        this.formErrors.telephone =
          "Veuillez saisir un numéro de téléphone valide.";
        isValid = false;
      }

      return isValid;
    },

    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    isValidTelephone(telephone) {
      return /^[0-9]+$/.test(telephone);
    },
  },
};
</script>
<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>

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
