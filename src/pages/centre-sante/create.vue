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
            <li class="breadcrumb-item" aria-current="page">
              Gestion Carte Sanitaire
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
              <h4 class="card-title">Ajouter un centre hospitalier</h4>
              <form class="forms-sample row" @submit.prevent="store">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="ref">Référence</label>
                    <input
                      :class="{
                        'is-invalid':
                          formErrors.errorReference || isReferenceTaken,
                      }"
                      type="text"
                      class="form-control"
                      id="ref"
                      placeholder="Ref"
                      v-model="centre.reference"
                      @input="clearError('errorReference')"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="formErrors.errorReference || isReferenceTaken"
                    >
                      {{
                        formErrors.errorReference ||
                        "La référence a déjà été prise."
                      }}
                    </div>
                  </div>
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
                  <div class="form-group">
                    <label for="mail">Email</label>
                    <input
                      :class="{ 'is-invalid': formErrors.errorEmail }"
                      type="email"
                      class="form-control"
                      id="mail"
                      mailto:placeholder="xyz@example.com"
                      v-model="centre.email"
                      @input="clearError('errorEmail')"
                    />
                    <div class="invalid-feedback" v-if="formErrors.errorEmail">
                      {{ formErrors.errorEmail }}
                    </div>
                  </div>
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
                  <div class="form-group controls">
                    <label for="depart">Sélectionner un Département</label>
                    <select
                      :class="{ 'is-invalid': formErrors.errorDepartement }"
                      v-model="centre.departement_id"
                      @change="onDepartementSelect(centre.departement_id)"
                      class="form-control mb-3"
                      id="depart"
                      @input="clearError('errorDepartement')"
                    >
                      <option value="">Selectionner un Département</option>
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
                  <div class="form-group controls">
                    <label for="commune">Sélectionner une Commune</label>
                    <select
                      :class="{ 'is-invalid': formErrors.errorCommune }"
                      v-model="centre.commune_id"
                      @change="onCommuneSelect(centre.commune_id)"
                      class="form-control mb-3"
                      id="commune"
                      @input="clearError('errorCommune')"
                    >
                      <option value="">Selectionner une Commune</option>
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
                  <div class="form-group controls">
                    <label for="arrondis">Sélectionner un Arrondissement</label>
                    <select
                      :class="{ 'is-invalid': formErrors.errorArrondissement }"
                      v-model="centre.arrondissement_id"
                      @change="onArrondissementSelect(centre.arrondissement_id)"
                      class="form-control mb-3"
                      id="arrondis"
                      @input="clearError('errorArrondissement')"
                    >
                      <option value="">Selectionner une Arrondissement</option>
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
                  <div class="form-group controls">
                    <label for="quartier">Sélectionner un Quartier</label>
                    <select
                      :class="{ 'is-invalid': formErrors.errorQuartier }"
                      v-model="centre.quartier_id"
                      class="form-control mb-3"
                      id="quartier"
                      @input="clearError('errorQuartier')"
                    >
                      <option value="">Selectionner un Quartier</option>
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
                  <div class="form-group controls">
                    <label for="centre">Sélectionner le Type de Centre</label>
                    <select
                      :class="{ 'is-invalid': formErrors.errorType }"
                      v-model="centre.idtypecentresanitaire"
                      class="form-control mb-3"
                      id="centre"
                      @input="clearError('errorType')"
                    >
                      <option value="">Selectionner un Type de Centre</option>
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
                    Ajouter
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
  
    data() {
      return {
        forms: [],
        departements: [],
        communes: [],
        arrondissements: [],
        quartiers: [],
        types: [],
        centre: {
          departement_id: "",
          commune_id: "",
          arrondissement_id: "",
          quartier_id: "",
          nom: "",
          adresse: "",
          reference: "",
          telephone: "",
          email: "",
          directeur: "",
          idtypecentresanitaire: "",
          wrong: "",
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
        isReferenceTaken: false,
      };
    },
  
    mounted() {
      departementService
        .getAlldepartements()
        .then((res) => {
          this.departements = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
  
      typescentresService
        .getAlltypes()
        .then((res) => {
          this.types = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  
    methods: {
      cancel() {
        this.$toast.error("Échec de l'enregistrement !", {
          position: "top-right",
          timeout: 3000,
          style: {
            background: "#ff0000",
            color: "#fff",
            fontWeight: "bold",
          },
        });
        this.$router.push("/eph/list");
      },
  
      async store() {
        this.isReferenceTaken = false;
        try {
          let isValid = true;
          this.formErrors = {};
  
          if (!this.centre.reference) {
            this.formErrors.errorReference = "La référence du centre est requise";
            isValid = false;
          }
          if (!this.centre.nom) {
            this.formErrors.errorNom = "Le nom du centre est requis.";
            isValid = false;
          }
  
          if (!this.centre.telephone) {
            this.formErrors.errorTelephone =
              "L'adresse téléphonique du centre est requise.";
            isValid = false;
          } else if (!this.isValidTelephone(this.centre.telephone)) {
            this.formErrors.errorTelephone = "Numéro de téléphone invalide.";
            isValid = false;
          }
  
          if (!this.centre.email) {
            this.formErrors.errorEmail = "L'adresse mail du centre est requise.";
            isValid = false;
          }
  
          if (!this.centre.adresse) {
            this.formErrors.errorAdresse = "L'adresse du centre est requise.";
            isValid = false;
          }
  
          if (!this.centre.directeur) {
            this.formErrors.errorDirecteur =
              "Veuillez spécifier le nom du directeur du centre.";
            isValid = false;
          }
  
          if (!this.centre.departement_id) {
            this.formErrors.errorDepartement =
              "Renseignez le nom du département de votre centre.";
            isValid = false;
          }
  
          if (!this.centre.commune_id) {
            this.formErrors.errorCommune =
              "Renseignez le nom de la commune de votre centre.";
            isValid = false;
          }
  
          if (!this.centre.arrondissement_id) {
            this.formErrors.errorArrondissement =
              "Renseignez le nom de l'arrondissement de votre centre.";
            isValid = false;
          }
  
          if (!this.centre.quartier_id) {
            this.formErrors.errorQuartier =
              "Renseignez le nom du quartier de votre centre.";
            isValid = false;
          }
  
          if (!this.centre.idtypecentresanitaire) {
            this.formErrors.errorType = "Le type du centre est requis.";
            isValid = false;
          }
  
          if (!isValid) {
            return;
          }
  
          const res = await centreService.addCentre(this.centre);
          this.$toast.success("Enregistrement effectué avec succès !", {
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
        } catch (error) {
          if (
            error.response &&
            error.response.data.errors &&
            error.response.data.errors.reference
          ) {
            this.isReferenceTaken = true;
          }
          this.$toast.warning("Veuillez remplir tous les champs requis!", {
            position: "top-right",
            timeout: 3000,
            style: {
              borderRadius: "10px",
              background: "#ffc107",
              color: "#333",
              fontWeight: "bold",
            },
          });
          console.error(error);
        }
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

input[type="radio"].demo6+label {
    position: relative;
    padding-left: 1.3rem;
}

input[type="radio"].demo6+label::before,
input[type="radio"].demo6+label::after {
    display: block;
    position: absolute;
    box-sizing: border-box;
    content: "";
    border-radius: 1rem;
}

input[type="radio"].demo6+label::before {
    bottom: 0;
    left: 0;
    border: 1px solid #ccc;
    background-color: #eee;
    width: 1rem;
    height: 1rem;
}

input[type="radio"].demo6+label::after {
    bottom: 3px;
    left: 3px;
    width: calc(1rem - 6px);
    height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked+label::after {
    background-color: #45c28e;
}

input[type="checkbox"].demo2 {
    display: none;
}

input[type="checkbox"].demo2+label::before {
    content: "";
    border: 1px solid #45c28e;
    padding: 0 0.6rem;
    margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked+label::before {
    background-color: #45c28e;
}
</style>
