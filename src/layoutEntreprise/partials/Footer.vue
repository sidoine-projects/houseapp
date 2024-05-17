<template>
  <section class="app-footer">
    <footer class="footer">
      <div class="container-fluid clearfix">
        <h6 class="d-block text-center text-sm-left d-sm-inline-block  font-weight-bold"> TALENT VIRTUEL <span style="color: rgb(199, 149, 10);"> @{{ currentYear }}</span> <span class="text-dark"> all right
          reserved</span> </h6>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-right"> <a href="/" target="_blank"
            style="text-decoration: none !important; "> <span class="font-weight-bold" style="color:blue">HIRETOP</span> </a>
        </span>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'app-footer',
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