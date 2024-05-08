
<template>
  <section class="container-scroller">
    <!-- Le reste du code... -->
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier un centre hospitalier</h4>
            <form class="forms-sample row" @submit.prevent="update">
              <div class="col-md-6">
                <!-- Référence -->
                <div class="form-group">
                  <label for="ref">Référence</label>
                  <input
                    :class="{ 'is-invalid': formErrors.errorReference }"
                    type="text"
                    class="form-control"
                    id="ref"
                    placeholder="Ref"
                    v-model="centre.reference"
                    @input="clearError('errorReference')"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorReference"
                  >
                    {{ formErrors.errorReference }}
                  </div>
                </div>
                <!-- Nom -->
                <div class="form-group">
                  <label for="nom">Nom</label>
                  <input
                    :class="{ 'is-invalid': formErrors.errorNom }"
                    type="text"
                    class="form-control"
                    id="nom"
                    placeholder="Nom"
                    v-model="centre.nom"
                    @input="clearError('errorNom')"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorNom">
                    {{ formErrors.errorNom }}
                  </div>
                </div>

                <!-- Téléphone -->
                <div class="form-group">
                  <label for="tele">Téléphone</label>
                  <input
                    :class="{ 'is-invalid': formErrors.errorTelephone }"
                    type="text"
                    class="form-control"
                    id="tele"
                    placeholder="21212121"
                    v-model="centre.telephone"
                    @input="clearError('errorTelephone')"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorTelephone"
                  >
                    {{ formErrors.errorTelephone }}
                  </div>
                </div>

                <!-- Email -->
                <div class="form-group">
                  <label for="mail">Email</label>
                  <input
                    :class="{ 'is-invalid': formErrors.errorEmail }"
                    type="email"
                    class="form-control"
                    id="mail"
                    placeholder="xyz@example.com"
                    v-model="centre.email"
                    @input="clearError('errorEmail')"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorEmail">
                    {{ formErrors.errorEmail }}
                  </div>
                </div>

                <!-- Adresse -->
                <div class="form-group">
                  <label for="adresse">Adresse</label>
                  <input
                    :class="{ 'is-invalid': formErrors.errorAdresse }"
                    type="text"
                    class="form-control"
                    id="adresse"
                    placeholder="Adresse"
                    v-model="centre.adresse"
                    @input="clearError('errorAdresse')"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorAdresse">
                    {{ formErrors.errorAdresse }}
                  </div>
                </div>

                <!-- Directeur -->
                <div class="form-group">
                  <label for="dirt">Directeur</label>
                  <input
                    :class="{ 'is-invalid': formErrors.errorDirecteur }"
                    type="text"
                    class="form-control"
                    id="dirt"
                    placeholder="Mr Blackman"
                    v-model="centre.directeur"
                    @input="clearError('errorDirecteur')"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorDirecteur"
                  >
                    {{ formErrors.errorDirecteur }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <!-- Sélectionner un Département -->
                <div class="form-group controls">
                  <label for="depart">Sélectionner un Département</label>
                  <select
                    :class="{ 'is-invalid': formErrors.errorDepartement }"
                    v-model="centre.departement_id"
                    @change="onDepartementSelect(centre.departement_id)"
                    class="form-control mb-3"
                    id="depart"
                  >
                    <option
                      v-for="departement in departements"
                      :key="departement.id"
                      :value="departement.id"
                    >
                      {{ departement.nom }}
                    </option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorDepartement"
                  >
                    {{ formErrors.errorDepartement }}
                  </div>
                </div>

                <!-- Sélectionner une Commune -->
                <div class="form-group controls">
                  <label for="commune">Sélectionner une Commune</label>
                  <select
                    :class="{ 'is-invalid': formErrors.errorCommune }"
                    v-model="centre.commune_id"
                    @change="onCommuneSelect(centre.commune_id)"
                    class="form-control mb-3"
                    id="commune"
                  >
                    <option
                      v-for="commune in communes"
                      :key="commune.id"
                      :value="commune.id"
                    >
                      {{ commune.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorCommune">
                    {{ formErrors.errorCommune }}
                  </div>
                </div>

                <!-- Sélectionner un Arrondissement -->
                <div class="form-group controls">
                  <label for="arrondis">Sélectionner un Arrondissement</label>
                  <select
                    :class="{ 'is-invalid': formErrors.errorArrondissement }"
                    v-model="centre.arrondissement_id"
                    @change="onArrondissementSelect(centre.arrondissement_id)"
                    class="form-control mb-3"
                    id="arrondis"
                  >
                    <option
                      v-for="arrondissement in arrondissements"
                      :key="arrondissement.id"
                      :value="arrondissement.id"
                    >
                      {{ arrondissement.nom }}
                    </option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.errorArrondissement"
                  >
                    {{ formErrors.errorArrondissement }}
                  </div>
                </div>

                <!-- Sélectionner un Quartier -->
                <div class="form-group controls">
                  <label for="quartier">Sélectionner un Quartier</label>
                  <select
                    :class="{ 'is-invalid': formErrors.errorQuartier }"
                    v-model="centre.quartier_id"
                    class="form-control mb-3"
                    id="quartier"
                  >
                    <option
                      v-for="quartier in quartiers"
                      :key="quartier.id"
                      :value="quartier.id"
                    >
                      {{ quartier.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorQuartier">
                    {{ formErrors.errorQuartier }}
                  </div>
                </div>

                <!-- Sélectionner le Type de Centre -->
                <div class="form-group controls">
                  <label for="centre">Sélectionner le Type de Centre</label>
                  <select
                    :class="{ 'is-invalid': formErrors.errorType }"
                    v-model="centre.idtypecentresanitaire"
                    class="form-control mb-3"
                    id="centre"
                  >
                    <option
                      v-for="type in types"
                      :key="type.id"
                      :value="type.id"
                    >
                      {{ type.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorType">
                    {{ formErrors.errorType }}
                  </div>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">
                  Modifier
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
import { centreService } from "@/_services";
import { departementService } from "@/_services";
import { communeService } from "@/_services";
import { arrondissementService } from "@/_services";
import { quartierService } from "@/_services";
import { typescentresService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-centres",
  props: ["id"],

  data() {
    return {
      departements: [],
      communes: [],
      arrondissements: [],
      quartiers: [],
      types: [],
      centre: {
        reference: "",
        id: "",
      },
      formErrors: {
        errorNom: "",
        errorReference: "",
        errorAdresse: "",
        errorTelephone: "",
        errorEmail: "",
        errorDirecteur: "",
        errorType: "",
        errorPays: "",
        errorDepartement: "",
        errorCommune: "",
        errorArrondissement: "",
        errorQuartier: "",
      },
    };
  },

  mounted() {
    centreService.getCentres(this.id).then((res) => {
      this.centre = res.data;
      this.centre.id = this.id;
    });

    typescentresService.getAlltypes().then((res) => {
      this.types = res.data.data;
    });

    departementService
      .getAlldepartements()
      .then((res) => {
        this.departements = res.data.data;
        this.onDepartementSelect(this.centre.departement_id);
      })
      .catch((err) => {
        console.log(err);
      });

    communeService
      .getAllcommunes()
      .then((res) => {
        this.communes = res.data.data;
        this.onCommuneSelect(this.centre.commune_id);
      })
      .catch((err) => {
        console.log(err);
      });
    arrondissementService
      .getAllarrondissements()
      .then((res) => {
        this.arrondissements = res.data.data;
        this.onArrondissementSelect(this.centre.arrondissement_id);
      })
      .catch((err) => {
        console.log(err);
      });
    quartierService
      .getQuartiers(arrondissementId)
      .then((res) => {
        this.quartiers = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    quartierService
      .getAllquartiers()
      .then((res) => {
        this.quartiers = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    cancel() {
      this.$toast.error("Échec de l'enregistrement !", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/eph/list");
    },

    update() {
      // Valider le champ de téléphone
      if (!this.isValidTelephone(this.centre.telephone)) {
        this.formErrors.errorTelephone = "Numéro de téléphone invalide.";
        return;
      }

      // Valider que tous les champs sont remplis
      const requiredFields = [
        "nom",
        "reference",
        "adresse",
        "telephone",
        "email",
        "directeur",
        "departement_id",
        "commune_id",
        "arrondissement_id",
        "quartier_id",
        "idtypecentresanitaire",
      ];

      let hasErrors = false;

      requiredFields.forEach((field) => {
        if (!this.centre[field]) {
          this.formErrors[
            `error${field.charAt(0).toUpperCase() + field.slice(1)}`
          ] = "Ce champ est requis.";
          hasErrors = true;
        }
      });

      if (hasErrors) {
        return;
      }

      // Valider le champ de téléphone
      if (!this.isValidTelephone(this.centre.telephone)) {
        this.formErrors.errorTelephone = "Numéro de téléphone invalide.";
        return;
      }
      centreService
        .updateCentre(this.centre)
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
          this.$router.push("/eph/list");
        })
        .catch((err) => {
          this.$toast.warning("Veuillez remplir tout les champs requis!", {
            position: "top-right",
            timeout: 3000,
            style: {
              borderRadius: "10px",
              background: "#ffc107", // Couleur de fond jaune pour le warning
              color: "#333", // Couleur du texte
              fontWeight: "bold",
            },
          });

          if (err.response && err.response.data.errors) {
            const errors = err.response.data.errors;
            this.formErrors.errorNom = errors.nom ? errors.nom[0] : "";
            this.formErrors.errorReference = errors.reference
              ? errors.reference[0]
              : "";
            // Les autres erreurs...
          }
        });
    },
    onDepartementSelect(departement_id) {
      communeService
        .getCommunes(departement_id)
        .then((res) => {
          this.communes = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onCommuneSelect(commune_id) {
      arrondissementService
        .getArrondissements(commune_id)
        .then((res) => {
          this.arrondissements = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onArrondissementSelect(arrondissement_id) {
      quartierService
        .getQuartiers(arrondissement_id)
        .then((res) => {
          this.quartiers = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    clearError(errorField) {
      this.formErrors[errorField] = "";
    },

    isValidTelephone(telephone) {
      return /^[0-9]+$/.test(telephone);
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
