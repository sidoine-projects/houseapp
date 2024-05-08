<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramètre
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Type centre
          </li>
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
            <h4 class="card-title">Modifier un Rôle</h4>
            <form @submit.prevent="update" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="nom">Type centre</label>
                  <input
                    type="text"
                    v-model="type.nom"
                    class="form-control"
                    id="nom"
                    placeholder="Type centre"
                  />
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-success mr-2">
                  Modifier
                </button>
                <!-- <button class="btn btn-danger">Cancel</button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { typescentresService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-type",
  props: ["id"],
  data() {
    return {
      type: [],
    };
  },
  mounted() {
    typescentresService.getType(this.id).then((res) => {
      this.type = res.data.data;
      this.type.id = this.id;
    });
  },
  methods: {
    update() {
      typescentresService
        .updateType(this.type)
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
          this.$router.push("/ephe/list");
        })
        .catch((err) => {
          this.$toast.error("Erreur lors de la modification du type centre.", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
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
