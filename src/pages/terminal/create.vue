<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramètre</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">Terminal</li>
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
            <h4 class="card-title">Ajouter un terminal</h4>
            <form @submit.prevent="addTerminal" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="terminalName">Nom</label>
                  <input
                    type="text"
                    v-model="terminalName"
                    class="form-control"
                    id="terminalName"
                    placeholder="Nom terminal"
                    @input="clearError('terminalName')"
                  />
                  <ul v-if="errorTerminalName.length" class="text-danger">
                    <li v-for="error in errorTerminalName" :key="error">
                      {{ error }}
                    </li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="terminalEmplacement">Description</label>
                  <input
                    type="text"
                    v-model="terminalEmplacement"
                    class="form-control"
                    id="terminalEmplacement"
                    placeholder="Emplacement terminal"
                    @input="clearError('terminalEmplacement')"
                  />
                  <ul
                    v-if="errorTerminalEmplacement.length"
                    class="text-danger"
                  >
                    <li v-for="error in errorTerminalEmplacement" :key="error">
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mx-auto">
                <button type="submit" class="btn btn-success mr-2">
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
import { terminalService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-terminal",

  data() {
    return {
      terminalName: "",
      terminalEmplacement: "",
      errorTerminalName: [],
      errorTerminalEmplacement: [],
    };
  },
  methods: {
    addTerminal() {
      // Avant d'effectuer la requête d'ajout, on réinitialise les erreurs
      this.errorTerminalName = [];
      this.errorTerminalEmplacement = [];

      const terminal = {
        nom: this.terminalName,
        Description: this.terminalEmplacement,
      };
      console.log("Valeurs entrées par l'utilisateur :", terminal);

      // Vérifier si les champs requis sont vides
      if (!this.terminalName) {
        this.errorTerminalName.push("Le champ Nom est requis.");
      }
      if (!this.terminalEmplacement) {
        this.errorTerminalEmplacement.push("Le champ Emplacement est requis.");
      }

      // Si des erreurs sont présentes, afficher un message d'erreur
      if (
        this.errorTerminalName.length > 0 ||
        this.errorTerminalEmplacement.length > 0
      ) {
        this.$toast.warning("Veuillez remplir tous les champs requis !", {
          position: "top-right",
          timeout: 3000,
          style: {
            borderRadius: "10px",
            background: "#ffc107", // Couleur de fond jaune pour le warning
            color: "#333", // Couleur du texte
            fontWeight: "bold",
          },
        });
        return;
      }

      terminalService
        .addTerminal(terminal)
        .then((response) => {
          // Traitement en cas de succès
          console.log("Résultat de l'ajout du terminal :", response.data);
          // Afficher un message de succès
          // alert("La compagnie a été ajoutée avec succès.");

          // Réinitialiser les champs du formulaire
          this.terminalName = "";
          this.terminalEmplacement = "";

          // Rediriger vers la page "terminal/list"
          this.$router.push("/terminal/list");
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
        })
        .catch((error) => {
          // Traitement en cas d'erreur
          console.error("Erreur lors de l'ajout du terminal :", error);
        });
    },
    clearError(fieldName) {
      if (fieldName === "terminalName") {
        this.errorTerminalName = [];
      }
      if (fieldName === "terminalEmplacement") {
        this.errorTerminalEmplacement = [];
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
