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
          <li class="breadcrumb-item active" aria-current="page">
            Gestion des Actes médicaux
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
            <h4 class="card-title">Ajouter un acte médical</h4>
            <form class="forms-sample row" @submit.prevent="store">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="code">Code</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    placeholder="Code"
                    v-model="act.code"
                    @input="clearError('act.code')"
                  />
                  <ul v-for="code in errorCode" :key="code">
                    <li class="text-danger">{{ code }}</li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="name">Libellé</label>
                  <input
                    v-model="act.name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Consultation"
                    @input="clearError('act.name')"
                  />
                  <ul v-for="name in errorName" :key="name">
                    <li class="text-danger">{{ name }}</li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input
                    v-model="act.description"
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="Consultation de ......."
                    @input="clearError('act.description')"
                  />
                  <ul
                    v-for="description in errorDescription"
                    :key="description"
                  >
                    <li class="text-danger">{{ description }}</li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="tarif">Prix</label>
                  <input
                    v-model="act.tarif"
                    type="text"
                    class="form-control"
                    id="tarif"
                    placeholder="25 000"
                    @input="clearError('act.tarif')"
                  />
                  <ul v-for="tarif in errorTarif" :key="tarif">
                    <li class="text-danger">{{ tarif }}</li>
                  </ul>
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
import { POSITION } from "vue-toastification";
import { actsService } from "@/_services";

export default {
  name: "create-actes-medicaux",

  data() {
    return {
      selected: "",
      act: {
        code: "",
        name: "",
        description: "",
        tarif: "",
      },
      wrong: "",
      errorCode: [],
      errorName: [],
      errorDescription: [],
      errorTarif: [],
    };
  },
  methods: {
    cancel() {
      this.$toast.error("Enregistrement annulé !", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Red background for error
          color: "#fff", // Text color
          fontWeight: "bold",
        },
      });
      this.$router.push("/actes-medicaux/list");
    },

    store() {
      actsService
        .addActe(this.act)
        .then((res) => {
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
          this.$router.push("/actes-medicaux/list");
        })
        .catch((error) => {
          this.$toast.warning("Veuillez remplir tous les champs requis !", {
            position: "top-right",
            timeout: 3000,
            style: {
              borderRadius: "10px",
              background: "#ffc107", // Yellow background for warning
              color: "#333", // Text color
              fontWeight: "bold",
            },
          });
          let $faute = error.response.data.errors;
          let size = Object.keys($faute).length;
          this.wrong = size;
          console.log(error.response);

          if (this.wrong > 0) {
            this.errorCode = $faute.code;
            this.errorName = $faute.name;
            this.errorDescription = $faute.description;
            this.errorTarif = $faute.tarif;
            if (
              this.errorCode &&
              this.errorName &&
              this.errorDescription &&
              this.errorTarif
            ) {
              this.$router.push("/actes-medicaux/create");
            }
          }
        });
    },
    clearError(field) {
      switch (field) {
        case "act.code":
          this.errorCode = [];
          break;
        case "act.name":
          this.errorName = [];
          break;
        case "act.description":
          this.errorDescription = [];
          break;
        case "act.tarif":
          this.errorTarif = [];
          break;
      }
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
