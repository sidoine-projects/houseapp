<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Indigences</li>
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
            <h4 class="card-title">
              Ajouter un pourcentage pour chaque interval d'Age
            </h4>

            <form class="forms-sample row" @submit.prevent="store">
              <div class="col-md-12">
                <div class="control-group mt-2 p-2" id="app">
                  <div class="row" v-for="(form, index) in forms" :key="index">
                    <div class="form-group col-md-4">
                      <label for="exampleInputEmail1">Age min</label>
                      <input
                        type="number"
                        :class="{
                          'form-control': true,
                          'is-invalid': form.ageminError,
                        }"
                        value=""
                        class="form-control"
                        id="agemin"
                        placeholder="Age Min"
                        v-model="form.agemin"
                        @input="clearError(index, 'agemin')"
                      />
                      <div class="invalid-feedback" v-if="form.ageminError">
                        {{ form.ageminError }}
                      </div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="exampleInputEmail1">Age Max</label>
                      <input
                        type="number"
                        :class="{
                          'form-control': true,
                          'is-invalid': form.agemaxError,
                        }"
                        value="2000"
                        class="form-control"
                        id="text"
                        placeholder="Age Max"
                        v-model="form.agemax"
                        @input="clearError(index, 'agemax')"
                      />
                      <div class="invalid-feedback" v-if="form.agemaxError">
                        {{ form.agemaxError }}
                      </div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="exampleInputPassword1"
                        >Pourcentage (En %)</label
                      >
                      <input
                        type="number"
                        :class="{
                          'form-control': true,
                          'is-invalid': form.pourcentageError,
                        }"
                        value="1"
                        class="form-control"
                        id="pourcentage"
                        placeholder="Pourcentage"
                        v-model="form.pourcentage"
                        @input="clearError(index, 'pourcentage')"
                      />
                      <div
                        class="invalid-feedback"
                        v-if="form.pourcentageError"
                      >
                        {{ form.pourcentageError }}
                      </div>
                    </div>

                    <div class="form-group col-md-12">
                      <label for="exampleInputPassword1">Observation</label>

                      <textarea
                        class="form-control"
                        id="exampleTextarea1"
                        rows="1"
                        v-model="form.observation"
                      ></textarea>
                    </div>

                    <div class="form-group col-md-1">
                      <b-button
                        size="sm"
                        v-b-tooltip.hover
                        title="Supprimer"
                        variant="danger"
                        @click.prevent="deleteForm(index)"
                        v-if="forms.length >= 2"
                      >
                        <i
                          class="mdi mdi mdi-close-box text-white menu-icon"
                        ></i>
                      </b-button>
                    </div>
                  </div>
                </div>

                <div class="control-group col-md-12 p-1 mt-n3 row">
                  <div class="form-group ml-4">
                    <b-button
                      size="sm"
                      v-b-tooltip.hover
                      title="Ajouter un acte"
                      variant="success"
                      @click="addForm"
                    >
                      <i class="mdi mdi mdi-plus-box text-white menu-icon"></i>
                    </b-button>
                  </div>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">
                  Ajouter
                </button>
                <button @click="cancel" class="btn btn-gradient-danger">
                  Annuler
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
import { indigenceService } from "@/_services/indigences_services.js";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "indigence",

  data() {
    return {
      forms: [
        {
          agemin: "",
          agemax: "",
          pourcentage: "",
          observation: "",
          ageminError: "",
          agemaxError: "",
          pourcentageError: "",
        },
      ],
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
      this.$router.push("/assurance/list");
    },
    addForm() {
      this.forms.push({
        agemin: "",
        agemax: "",
        pourcentage: "",
        observation: "",
        ageminError: "",
        agemaxError: "",
        pourcentageError: "",
      });
    },

    deleteForm(index) {
      this.forms.splice(index, 1);
    },

    store() {
      let isValid = true;

      this.forms.forEach((form) => {
        form.ageminError = "";
        form.agemaxError = "";
        form.pourcentageError = "";

        if (!form.agemin) {
          form.ageminError = "Âge minimum est requis.";
          isValid = false;
        }

        if (!form.agemax) {
          form.agemaxError = "Âge maximum est requis.";
          isValid = false;
        }

        if (!form.pourcentage) {
          form.pourcentageError = "Pourcentage est requis.";
          isValid = false;
        }
      });

      if (!isValid) {
        return;
      }

      if (this.forms.length === 0) {
        console.error("Aucun formulaire à enregistrer.");
        return;
      }

      indigenceService
        .addIndigence({ forms: this.forms })
        .then((response) => {
          console.log("Indigence ajoutée avec succès", response);
          this.$router.push("/indigence/list");
          this.$toast.success("Indigence ajoutée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'indigence", error);
        });
    },

    clearError(index, fieldName) {
      this.forms[index][fieldName + "Error"] = null;
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
