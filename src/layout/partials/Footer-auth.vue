<template>
  <section class=" ">
    <footer class="fixed-bottom ">
      <!-- Contenu de votre footer ici -->
      <div class="container-fluid clearfix">
        <h6
          class="d-block text-center text-sm-left d-sm-inline-block font-weight-bold"
        >
          TALENT VIRTUEL
          <span style="color: rgb(199, 149, 10)"> @{{ currentYear }}</span>
          <span class="text-dark"> all right reserved</span>
        </h6>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-right">
          <a href="/" target="_blank" style="text-decoration: none !important">
            <span class="font-weight-bold" style="color: blue">HIRETOP</span>
          </a>
        </span>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'app-footer12',
  data() {
    return {
      currentYear: null
    };

  },
  mounted() {
    const date = new Date();
    this.currentYear = date.getFullYear();
  }
};
</script>

<style scoped>
.fixed-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: transparent; /* Couleur de fond du footer */
  padding: 20px; /* Espacement interne du footer */
  border-top: 1px solid #ccc; /* Bordure supérieure du footer */
}


/* Vos styles CSS ici */
</style>