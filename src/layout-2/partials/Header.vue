<template>
    <b-navbar id="template-header" class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" toggleable="lg"
    style="background: #0b5d3f">
      <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <router-link class="navbar-brand brand-logo" to="/">
          <img src="@/assets/images/logopay.jpeg"  style="width: 100%; height:100%;" alt="logo" />
        </router-link>
        <router-link class="navbar-brand brand-logo-mini" to="/">
          <!-- <img src="@/assets/images/logopay.jpeg" alt="logo" style="width: 50%; height:50%;"/> -->
        </router-link>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
        <button class="navbar-toggler navbar-toggler align-self-center d-lg-block" type="button" @click="toggleSidebar()">
          <span class="mdi mdi-menu"></span>
        </button>
  
         
        <button class="navbar-toggler navbar-toggler-right align-self-center" type="button" @click="toggleMobileSidebar()">
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </b-navbar>
  </template>
  
  <script>
  export default {
    name: 'header',
    methods: {
      toggleSidebar: () => {
        document.querySelector('body').classList.toggle('sidebar-icon-only');
      },
      toggleMobileSidebar: () => {
        document.querySelector('#sidebar').classList.toggle('active');
      }
    }
  }
  </script>
  
  <style scoped>
  </style>