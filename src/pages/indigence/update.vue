<template>
  <section class="container-scroller">
    <!-- ... -->
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier une indigence</h4>

            <form class="forms-sample row" @submit.prevent="update">
              <div class="col-md-12">
                <div class="control-group mt-2 p-2" id="app">
                  <div class="row">
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
                        @input="clearError('agemin')"
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
                        @input="clearError('agemax')"
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
                        @input="clearError('pourcentage')"
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
                  </div>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">
                  Modifier
                </button>
                <!-- <button class="btn btn-gradient-danger">Cancel</button> -->
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
  name: "indigence-update",
  props: ["id"],
  data() {
    return {
      form: {
        agemin: "",
        agemax: "",
        pourcentage: "",
        observation: "",
        ageminError: "",
        agemaxError: "",
        pourcentageError: "",
      },
    };
  },

  mounted() {
    indigenceService.getIndigence(this.id).then((res) => {
      this.form = {
        ...res.data.data,
        id: this.id,
        ageminError: "",
        agemaxError: "",
        pourcentageError: "",
      };
    });
  },
  methods: {
    update() {
      // Reset error messages
      this.form.ageminError = "";
      this.form.agemaxError = "";
      this.form.pourcentageError = "";

      let isValid = true;

      // Validate Age Min field
      if (!this.form.agemin) {
        this.form.ageminError = "Âge minimum est requis";
        isValid = false;
      }

      // Validate Age Max field
      if (!this.form.agemax) {
        this.form.agemaxError = "Âge maximum est requis";
        isValid = false;
      }

      // Validate Pourcentage field
      if (!this.form.pourcentage) {
        this.form.pourcentageError = "Pourcentage est requis";
        isValid = false;
      }

      if (isValid) {
        indigenceService
          .updateIndigence(this.form)
          .then((res) => {
            this.$router.push("/indigence/list");
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
          })
          .catch((err) => {
            this.$toast.warning(
              "Une erreur s'est produite lors de la modification de l'indigence.",
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
      }
    },
    clearError(fieldName) {
      this.form[fieldName + "Error"] = "";
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
