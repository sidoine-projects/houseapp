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
            AffectTerminal
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
            <h4 class="card-title">Modifier un terminal</h4>
            <form class="forms-sample row" @submit.prevent="update">
              <!-- <div class="col-md-12">
                <p v-if="wrong > 0">
                  <b>Merci de corriger vos données</b>
                </p>
              </div> -->
              <div class="col-md-12">
                <div class="form-group">
                  <label for="user_id"
                    >Utilisateur <span style="color: red">*</span></label
                  >
                  <select
                    id="user_id"
                    class="form-control"
                    v-model="affectterminal.user_id"
                  >
                    <option value="">Sélectionnez un utilisateur</option>
                    <option
                      v-for="user in users"
                      :value="user.id"
                      :key="user.id"
                    >
                      {{ user.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="terminal_id"
                    >Terminal <span style="color: red">*</span></label
                  >
                  <select
                    id="terminal_id"
                    class="form-control"
                    v-model="affectterminal.terminal_id"
                  >
                    <option value="">Sélectionnez un terminal</option>
                    <option
                      v-for="terminal in terminals"
                      :value="terminal.id"
                      :key="terminal.id"
                    >
                      {{ terminal.nom }}
                    </option>
                  </select>
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
import { affectterminalService } from "@/_services";
import { terminalService } from "@/_services";
import { LoginService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-compagnie",
  props: ["id"],
  data() {
    return {
      users: [],
      terminals: [],
      // assurance: [],

      affectterminal: {},
    };
  },
  mounted() {
    affectterminalService.getAffectTerminal(this.id).then((res) => {
      this.affectterminal = res.data.data;
      this.affectterminal.id = this.id;
    });
    LoginService.getAllUsers()
      .then((res) => {
        this.users = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    terminalService
      .getAllterminals()
      .then((res) => {
        this.terminals = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    update() {
      affectterminalService
        .updateAffectTerminal(this.affectterminal)
        .then((res) => {
          console.log(res);
          this.$toast.success("Modification effctuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/affectterminal/list");
        })
        .catch((err) => {
          this.$toast.success("Attention, merci !", {
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
/* Vos styles CSS personnalisés */
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
