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
            Ajouter
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Ajouter un  </h4> -->

            <form @submit="addterminal" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="user_id"
                    >Utilisateur <span style="color: red">*</span></label
                  >
                  <select
                    id="user_id"
                    v-model="user_id"
                    class="form-control"
                    @input="clearError('user_id')"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.user_id,
                    }"
                  >
                    <option value="">Sélectionnez un utilisateur</option>
                    <option
                      v-for="user in users"
                      :value="user.id"
                      :key="user.id"
                    >
                      {{ user.name }} {{ user.prenom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.user_id">
                    {{ formErrors.user_id }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="terminal_id"
                    >Terminal <span style="color: red">*</span></label
                  >
                  <select
                    id="terminal_id"
                    v-model="terminal_id"
                    class="form-control"
                    @input="clearError('terminal_id')"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.terminal_id,
                    }"
                  >
                    <option value="">Sélectionnez un terminal</option>
                    <option
                      v-for="affectterminal in affectterminals"
                      :value="affectterminal.id"
                      :key="affectterminal.id"
                    >
                      {{ affectterminal.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.terminal_id">
                    {{ formErrors.terminal_id }}
                  </div>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-gradient-success mr-2">
                  Ajouter
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
import { affectterminalService } from "@/_services";
import { terminalService } from "@/_services";
import { LoginService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-affectterminal",

  data() {
    return {
      user_id: "",
      users: [],
      terminal_id: "",
      affectterminals: [],
      formErrors: {
        user_id: "",
        terminal_id: "",
      },
    };
  },
  mounted() {
    LoginService.getAllCaissiers()
      .then((res) => {
        this.users = res.data.data.caissiers;
      })
      .catch((error) => {
        console.log(error);
      });
    terminalService
      .getAllterminals()
      .then((res) => {
        this.affectterminals = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    addterminal(event) {
      event.preventDefault();

      const terminal = {
        // id:this.id,
        user_id: this.user_id,
        terminal_id: this.terminal_id,
      };
      console.log("Valeurs entrées par l'utilisateur :", terminal);
      let isValid = true;
      this.formErrors = {};

      if (!this.user_id) {
        this.formErrors.user_id = "L'utilisateur est requis.";
        isValid = false;
      }
      if (!this.terminal_id) {
        this.formErrors.terminal_id = "Le terminal est requis.";
        isValid = false;
      }

      if (!isValid) {
        return;
      }
      affectterminalService
        .addAffectTerminal(terminal)
        .then((response) => {
          console.log("Terminal ajoutée avec succès !");
          console.log(response);
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires

          this.user_id = "";
          this.terminal_id = "";
          // alert("L'assurance a été ajoutée avec succès.");
          // Rediriger vers la page "compagnie/list"
          this.$toast.success("Terminal ajoutée avec succès !", {
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
        .catch((error) => {
          console.error("Erreur lors de l'ajout du terminal :", error);
          // Afficher un message d'erreur ou effectuer d'autres actions nécessaires
        });
    },
    clearError(field) {
      if (field in this.formErrors) {
        this.formErrors[field] = "";
      }
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
