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
            Ajouter
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Ajouter une compagnie</h4>

            <form @submit.prevent="addCompagnie" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="compagnieName">Nom de la compagnie :</label>
                  <input
                    v-model="compagnieName"
                    type="text"
                    class="form-control"
                    id="compagnieName"
                    placeholder="Nom de la compagnie"
                    @input="clearError('compagnieName')"
                  />
                  <div v-if="formErrors.compagnieName" class="error-message">
                    {{ formErrors.compagnieName }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="compagnieAddress">Adresse de la compagnie:</label>
                  <input
                    v-model="compagnieAddress"
                    type="text"
                    class="form-control"
                    id="compagnieAddress"
                    placeholder="Adresse"
                    @input="clearError('compagnieAddress')"
                  />
                  <div v-if="formErrors.compagnieAddress" class="error-message">
                    {{ formErrors.compagnieAddress }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="compagnieEmail">Email :</label>
                  <input
                    v-model="compagnieEmail"
                    type="email"
                    class="form-control"
                    id="compagnieEmail"
                    placeholder="Email de la compagnie"
                    @input="clearError('compagnieEmail')"
                  />
                  <div v-if="formErrors.compagnieEmail" class="error-message">
                    {{ formErrors.compagnieEmail }}
                  </div>
                  <div v-if="isEmailTaken" class="error-message">
                    Cet e-mail est déjà utilisé. Veuillez saisir un autre
                    e-mail.
                  </div>
                </div>
                <div class="form-group">
                  <label for="compagnieTelephone">Téléphone :</label>
                  <input
                    v-model="compagnieTelephone"
                    type="text"
                    class="form-control"
                    id="compagnieTelephone"
                    placeholder="Téléphone compagnie"
                    @input="clearError('compagnieTelephone')"
                  />
                  <div
                    v-if="formErrors.compagnieTelephone"
                    class="error-message"
                  >
                    {{ formErrors.compagnieTelephone }}
                  </div>
                  <div v-if="isTelephoneTaken" class="error-message">
                    Ce numéro de téléphone est déjà utilisé. Veuillez saisir un
                    autre numéro.
                  </div>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">
                  Enregistrer
                </button>
                <button @click="cancel" class="btn btn-gradient-danger">
                  Cancel
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
import { compagnieService } from "@/_services/compagnie_services.js";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-assurance",

  data() {
    return {
      compagnieName: "",
      compagnieAddress: "",
      compagnieEmail: "",
      compagnieTelephone: "",
      formErrors: {
        compagnieName: null,
        compagnieAddress: null,
        compagnieEmail: null,
        compagnieTelephone: null,
      },
      isEmailTaken: false,
      isTelephoneTaken: false,
    };
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
      this.$router.push("/compagnie/list");
    },
    addCompagnie() {
      this.clearError();
      this.isEmailTaken = false;
      this.isTelephoneTaken = false;

      if (!this.validateForm()) {
        return;
      }

      const compagnie = {
        nom: this.compagnieName,
        adresse: this.compagnieAddress,
        email: this.compagnieEmail,
        telephone: this.compagnieTelephone,
      };

      compagnieService
        .addCompagnie(compagnie)
        .then((response) => {
          console.log("Résultat de l'ajout de la compagnie :", response.data);
          this.resetForm();
          this.showToast("Enregistrement effectué avec succès !", "success");
          this.$router.push("/compagnie/list");
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la compagnie :", error);

          // if (error.response && error.response.status === 400) {
          const errors = error.response.data.errors;
          if (errors) {
            if (errors.email) {
              this.isEmailTaken = true;
            }
            if (errors.telephone) {
              this.isTelephoneTaken = true;
            }
            // }
          }
        });
    },

    clearError(fieldName) {
      this.formErrors[fieldName] = null;
    },

    validateForm() {
      let isValid = true;

      if (!this.compagnieName) {
        this.formErrors.compagnieName =
          "Veuillez saisir le nom de la compagnie.";
        isValid = false;
      }

      if (!this.compagnieAddress) {
        this.formErrors.compagnieAddress =
          "Veuillez saisir l'adresse de la compagnie.";
        isValid = false;
      }

      if (!this.compagnieEmail) {
        this.formErrors.compagnieEmail =
          "Veuillez saisir l'email de la compagnie.";
        isValid = false;
      } else if (!this.isValidEmail(this.compagnieEmail)) {
        this.formErrors.compagnieEmail =
          "Veuillez saisir une adresse email valide.";
        isValid = false;
      }

      if (!this.compagnieTelephone) {
        this.formErrors.compagnieTelephone =
          "Veuillez saisir le numéro de téléphone de la compagnie.";
        isValid = false;
      } else if (!this.isValidTelephone(this.compagnieTelephone)) {
        this.formErrors.compagnieTelephone =
          "Veuillez saisir un numéro de téléphone valide .";
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

    resetForm() {
      this.compagnieName = "";
      this.compagnieAddress = "";
      this.compagnieEmail = "";
      this.compagnieTelephone = "";
    },

    showToast(message, type) {
      this.$toast.success(message, {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
        bodyStyle: {
          borderRadius: "10px",
          backgroundColor: "#f0f0f0",
          color: "#333",
          fontWeight: "bold",
        },
      });
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
