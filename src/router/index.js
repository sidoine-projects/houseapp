import Vue from "vue";
import Router from "vue-router";
import App from "../App.vue";

import layout from "../layout";
import layout2 from "../layout-2";
import layoutEntreprise from "../layoutEntreprise";
// import layout3 from "../Layout-3";
import accueil from "../pages/accueil/accueil.vue";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/dashboard",
      component: layout,
      children: [
        {
          path: "talent",
          name: "dashboard",
          component: () => import("@/pages/dashboard"),
          meta: { requiresAuth: true, role: "roletalent" },
        },
        {
          path: "",
          redirect: "/error-pages/error-404",
        },
      ],
    },

    {
      path: "/dashboard",
      component: layoutEntreprise,
      children: [
        {
          path: "entreprise",
          name: "dashboardEntreprise",
          component: () => import("@/pages/dashboard/indexEntreprise"),
          meta: { requiresAuth: true, role: "roleentreprise" },
        },
        {
          path: "",
          redirect: "/error-pages/error-404",
        },
      ],
    },

    {
      path: "/charts",
      component: layout,
      children: [
        {
          path: "chartjs",
          name: "chartjs",
          component: () => import("@/pages/charts/chartjs"),
        },
      ],
    },
    // {
    //   path: "/tables",
    //   component: layout,
    //   children: [
    //     {
    //       path: "basic-tables",
    //       name: "basic-tables",
    //       component: () => import("@/pages/tables/basic-tables"),
    //     },
    //   ],
    // },
    {
      path: "/auth-pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        // {
        //   path: "login",
        //   name: "login",
        //   component: () => import("@/pages/samples/auth-pages/login"),
        // },
        // {
        //   path: "register",
        //   name: "register",
        //   component: () => import("@/pages/samples/auth-pages/register"),
        // },
        {
          path: "reset",
          name: "reset",
          component: () => import("@/pages/samples/auth-pages/reset-password"),
        },
        {
          path: "forget-password",
          name: "forget-password",
          component: () => import("@/pages/samples/auth-pages/forget-password"),
        },
        {
          path: "forget-password-confirm",
          name: "forget-password-confirm",
          component: () =>
            import("@/pages/samples/auth-pages/forget-password-confirm"),
        },
      ],
    },
    {
      path: "/error-pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "error-404",
          name: "error-404",
          component: () => import("@/pages/samples/error-pages/error-404"),
        },
        {
          path: "error-500",
          name: "error-500",
          component: () => import("@/pages/samples/error-pages/error-500"),
        },
      ],
    },
    // {
    //   path: "/icons",
    //   component: layout,
    //   children: [
    //     {
    //       path: "mdi-icons",
    //       name: "mdi-icons",
    //       component: () => import("@/pages/icons/mdi-icons"),
    //     },
    //   ],
    // },
    // {
    //   path: "/patients",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "create",
    //       component: () => import("@/pages/patients/create"),
    //     },
    //   ],
    // },
    // {
    //   path: "/patients",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "list",
    //       component: () => import("@/pages/patients/index"),
    //     },
    //   ],
    // },
    // {
    //   path: "/patients",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "update",
    //       component: () => import("@/pages/patients/update"),
    //       props: true,
    //     },
    //   ],
    // },

    // {
    //   path: "/priseencharge",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "create",
    //       component: () => import("@/pages/priseencharge/create"),
    //     },
    //   ],
    // },

    {
      path: "/",
      component: () => import("@/pages/inscriptions/inscription-home"),
      children: [
        {
          path: "register",
          name: "createRegister",
          component: () => import("@/pages/inscriptions/inscription-home"),
        },
      ],
    },

    {
      path: "/register",
      component: () => import("@/pages/inscriptions/inscription-etudiant"),
      children: [
        {
          path: "talent",
          name: "createRegisterTalent",
          component: () => import("@/pages/inscriptions/inscription-etudiant"),
        },
      ],
    },

    {
      path: "/register",
      component: () => import("@/pages/inscriptions/inscription-entreprise"),
      children: [
        {
          path: "society",
          name: "createRegisterSociety",
          component: () =>
            import("@/pages/inscriptions/inscription-entreprise"),
        },
      ],
    },
    {
      path: "/register",
      component: () => import("@/pages/inscriptions/verify-code-register"),
      children: [
        {
          path: "verifycode",
          name: "createVerifyCode",
          component: () => import("@/pages/inscriptions/verify-code-register"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/pages/inscriptions/login"),
      children: [
        {
          path: "login",
          name: "createLogin",
          component: () => import("@/pages/inscriptions/login"),
        },
      ],
    },

    {
      path: "/formations",
      component: layout,
      children: [
        {
          path: "create",
          name: "create",
          component: () => import("@/pages/formations/create"),
        },
      ],
    },

    {
      path: "/formations",
      component: layout,
      children: [
        {
          path: "list",
          name: "list",
          component: () => import("@/pages/formations/index"),
        },
      ],
    },
    {
      path: "/formations",
      component: layout,
      children: [
        {
          path: "update/:id(\\d+)",
          name: "update",
          component: () => import("@/pages/formations/update"),
          props: true,
        },
      ],
    },

    {
      path: "/experiences",
      component: layout,
      children: [
        {
          path: "create",
          name: "create",
          component: () => import("@/pages/experiences/create"),
        },
      ],
    },
    {
      path: "/experiences",
      component: layout,
      children: [
        {
          path: "list",
          name: "list",
          component: () => import("@/pages/experiences/index"),
        },
      ],
    },
    {
      path: "/experiences",
      component: layout,
      children: [
        {
          path: "update/:id(\\d+)",
          name: "update",
          component: () => import("@/pages/experiences/update"),
          props: true,
        },
      ],
    },
    {
      path: "/competences",
      component: layout,
      children: [
        {
          path: "create",
          name: "create",
          component: () => import("@/pages/competences/create"),
        },
      ],
    },
    {
      path: "/competences",
      component: layout,
      children: [
        {
          path: "list",
          name: "list",
          component: () => import("@/pages/competences/index"),
        },
      ],
    },
    {
      path: "/competences",
      component: layout,
      children: [
        {
          path: "update/:id(\\d+)",
          name: "update",
          component: () => import("@/pages/competences/update"),
          props: true,
        },
      ],
    },
    {
      path: "/candidatures",
      component: layout,
      children: [
        {
          path: "create",
          name: "create",
          component: () => import("@/pages/candidatures/create"),
        },
      ],
    },
    {
      path: "/candidatures",
      component: layout,
      children: [
        {
          path: "list",
          name: "list",
          component: () => import("@/pages/candidatures/index"),
        },
      ],
    },
    {
      path: "/candidatures",
      component: layout,
      children: [
        {
          path: "update/:id(\\d+)",
          name: "update",
          component: () => import("@/pages/candidatures/update"),
          props: true,
        },
      ],
    },
    // {
    //   path: "/priseencharge",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "list",
    //       component: () => import("@/pages/priseencharge/index"),
    //     },
    //   ],
    // },

    // {
    //   path: "/",
    //   component: layout2,
    //   children: [
    //     {
    //       path: "",
    //       name: "home",
    //       component: () => import("@/pages/dashboard/home"),
    //     },
    //   ],
    // },
    // {
    //   path: "/accueil",
    //   component: layout3,
    //   children: [
    //     {
    //       path: "/accueil",
    //       name: "accueil",
    //       component: () => import("@/pages/accueil/accueil"),
    //     },
    //   ],
    // },

    {
      path: "/accueil",
      component: accueil,
    },

    // {
    //   path: "/payement",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "create-payement",
    //       component: () => import("@/pages/paiement/create"),
    //     },
    //   ],
    // },

    // {
    //   path: "/payement",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "list-payement",
    //       component: () => import("@/pages/paiement/index"),
    //     },
    //   ],
    // },

    // {
    //   path: "/facture/details/:id(\\d+)",
    //   name: "FactureDetails",
    //   component: () => import("@/pages/paiement/details-facture"),
    //   props: true,
    // },

    {
      path: "/eph",
      component: layout,
      children: [
        {
          path: "create",
          name: "eph-create",
          component: () => import("@/pages/centre-sante/create"),
        },
      ],
    },

    {
      path: "/eph",
      component: layout,
      children: [
        {
          path: "list",
          name: "eph-list",
          component: () => import("@/pages/centre-sante/index"),
        },
      ],
    },

    {
      path: "/eph",
      component: layout,
      children: [
        {
          path: "update/:id(\\d+)",
          name: "eph-update",
          component: () => import("@/pages/centre-sante/update"),
          props: true,
        },
      ],
    },

    // {
    //   path: "/affectterminal",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "affectterminal-create",
    //       component: () => import("@/pages/affectterminal/create"),
    //     },
    //   ],
    // },

    // {
    //   path: "/affectterminal",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "affectterminal-list",
    //       component: () => import("@/pages/affectterminal/index"),
    //     },
    //   ],
    // },

    // {
    //   path: "/affectterminal",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "affectterminal-update",
    //       component: () => import("@/pages/affectterminal/update"),
    //       props: true,
    //     },
    //   ],
    // },
    // {
    //   path: "/terminal",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "terminal-create",
    //       component: () => import("@/pages/terminal/create"),
    //     },
    //   ],
    // },

    // {
    //   path: "/terminal",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "terminal-list",
    //       component: () => import("@/pages/terminal/index"),
    //     },
    //   ],
    // },

    // {
    //   path: "/terminal",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "terminal-update",
    //       component: () => import("@/pages/terminal/update"),
    //       props: true,
    //     },
    //   ],
    // },
    // {
    //   path: "/profile",
    //   component: layout,
    //   children: [
    //     {
    //       path: "/:id",
    //       name: "profile-update",
    //       component: () => import("@/pages/profile/profileedit"),
    //       // props: true,
    //     },
    //   ],
    // },

    {
      path: "/profile",
      component: layout,
      children: [
        {
          path: "profileedit/:id",
          name: "profile-update",
          component: () => import("@/pages/profile/profileedit"),
          props: true,
        },
      ],
    },

    {
      path: "/profile",
      component: layout,
      children: [
        {
          path: "create",
          name: "profile-create",
          component: () => import("@/pages/profile/profilepasswordedit"),
        },
      ],
    },

    {
      path: "/profile",
      component: layout,
      children: [
        {
          path: "list",
          name: "profile-list",
          component: () => import("@/pages/profile/profileshow"),
        },
      ],
    },

    // {
    //   path: "/profile",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "profile-update",
    //       component: () => import("@/pages/profile/update"),
    //       props: true,
    //     },
    //   ],
    // },
    {
      path: "/ephe",
      component: layout,
      children: [
        {
          path: "create",
          name: "ephe-create",
          component: () => import("@/pages/typecentre/create"),
        },
      ],
    },

    {
      path: "/ephe",
      component: layout,
      children: [
        {
          path: "list",
          name: "ephe-list",
          component: () => import("@/pages/typecentre/index"),
        },
      ],
    },

    {
      path: "/ephe",
      component: layout,
      children: [
        {
          path: "update/:id(\\d+)",
          name: "ephe-update",
          component: () => import("@/pages/typecentre/update"),
          props: true,
        },
      ],
    },
    // {
    //   path: "/actes-medicaux",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "actes-create",
    //       component: () => import("@/pages/actes-medicaux/create"),
    //     },
    //   ],
    // },
    // {
    //   path: "/actes-medicaux",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "actes-list",
    //       component: () => import("@/pages/actes-medicaux/index"),
    //     },
    //   ],
    // },
    // {
    //   path: "/assurance",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "assurance-create",
    //       component: () => import("@/pages/assurance/create"),
    //     },
    //   ],
    // },
    // {
    //   path: "/assurance",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "assurance-list",
    //       component: () => import("@/pages/assurance/index"),
    //     },
    //   ],
    // },
    // {
    //   path: "/compagnie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "compagnie-create",
    //       component: () => import("@/pages/compagnie/create"),
    //     },
    //   ],
    // },
    // {
    //   path: "/compagnie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "compagnie-list",
    //       component: () => import("@/pages/compagnie/index"),
    //     },
    //   ],
    // },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "create",
          name: "users-create",
          component: () => import("@/pages/user/create"),
        },
      ],
    },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "list",
          name: "users-list",
          component: () => import("@/pages/user/index"),
        },
      ],
    },

    // {
    //   path: "/priseencharge",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "update",
    //       component: () => import("@/pages/priseencharge/update"),
    //       props: true,
    //     },
    //   ],
    // },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "create",
          name: "users-create",
          component: () => import("@/pages/user/create"),
        },
      ],
    },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "list",
          name: "users-list",
          component: () => import("@/pages/user/index"),
        },
      ],
    },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "update/:id(\\d+)",
          name: "update",
          component: () => import("@/pages/user/update"),
          props: true,
        },
      ],
    },
    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "role/create",
          name: "role-create",
          component: () => import("@/pages/user/role/create"),
        },
      ],
    },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "role/list",
          name: "role-list",
          component: () => import("@/pages/user/role/index"),
        },
      ],
    },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "role/permissions",
          name: "role-permissions",
          component: () => import("@/pages/user/permissions/index"),
        },
      ],
    },

    // {
    //   path: "/tresorerie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "encaissement",
    //       name: "encaissement-create",
    //       component: () => import("@/pages/tresorerie/encaissement/create"),
    //     },
    //   ],
    // },
    // {
    //   path: "/tresorerie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "decaissement",
    //       name: "decaissement-create",
    //       component: () => import("@/pages/tresorerie/decaissement/create"),
    //     },
    //   ],
    // },
    // {
    //   path: "/tresorerie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list-encaissement",
    //       name: "list-encaissement",
    //       component: () => import("@/pages/tresorerie/encaissement/index"),
    //     },
    //   ],
    // },
    // {
    //   path: "/tresorerie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list-decaissement",
    //       name: "list-decaissement",
    //       component: () => import("@/pages/tresorerie/decaissement/index"),
    //     },
    //   ],
    // },
    // {
    //   path: "/tresorerie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "decaissement/update/:id(\\d+)",
    //       name: "tresorerie-update",
    //       component: () => import("@/pages/tresorerie/decaissement/update"),
    //       props: true,
    //     },
    //   ],
    // },
    // {
    //   path: "/indigence-patient",
    //   component: layout,
    //   children: [
    //     {
    //       path: "indigence-patient-create",
    //       name: "indigence-patient-create",
    //       component: () => import("@/pages/indigence-patient/create"),
    //     },
    //   ],
    // },

    // {
    //   path: "/indigence-patient",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list-indigence-patient",
    //       name: "list-indigence-patient",
    //       component: () => import("@/pages/indigence-patient/index"),
    //     },
    //   ],
    // },

    // {
    //   path: "/indigence",
    //   component: layout,
    //   children: [
    //     {
    //       path: "create",
    //       name: "indigence",
    //       component: () => import("@/pages/indigence/create"),
    //     },
    //   ],
    // },

    // {
    //   path: "/indigence",
    //   component: layout,
    //   children: [
    //     {
    //       path: "list",
    //       name: "list-indigence",
    //       component: () => import("@/pages/indigence/index"),
    //     },
    //   ],
    // },

    {
      path: "/rapport",
      component: layout,
      children: [
        {
          path: "/rapport",
          name: "rapport",
          component: () => import("@/pages/rapport/index"),
        },
      ],
    },

    {
      path: "/rapport",
      component: layout,
      children: [
        {
          path: "/rapport/caissier",
          name: "rapport-caissier",
          component: () => import("@/pages/rapport/caissier"),
        },
      ],
    },
    {
      path: "/rapport",
      component: layout,
      children: [
        {
          path: "/rapport-general/hospital",
          name: "rapports-hospital",
          component: () => import("@/pages/rapport-general/hospital"),
        },
      ],
    },
    {
      path: "/rapport",
      component: layout,
      children: [
        {
          path: "/rapport-general/geospatial",
          name: "rapports-geospatial",
          component: () => import("@/pages/rapport-general/geospatial"),
        },
      ],
    },

    {
      path: "/rapport",
      component: layout,
      children: [
        {
          path: "/rapport/terminal",
          name: "rapport-terminal",
          component: () => import("@/pages/rapport/terminal"),
        },
      ],
    },

    // {
    //   path: "/compagnie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "update",
    //       component: () => import("@/pages/compagnie/update"),
    //       props: true,
    //     },
    //   ],
    // },

    // {
    //   path: "/assurance",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "update",
    //       component: () => import("@/pages/assurance/update"),
    //       props: true,
    //     },
    //   ],
    // },

    // {
    //   path: "/actes-medicaux",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "update",
    //       component: () => import("@/pages/actes-medicaux/update"),
    //       props: true,
    //     },
    //   ],
    // },

    {
      path: "/user",
      component: layout,
      children: [
        {
          path: "role/update/:id(\\d+)",
          name: "update",
          component: () => import("@/pages/user/role/update"),
          props: true,
        },
      ],
    },

    // {
    //   path: "/indigence",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "update",
    //       component: () => import("@/pages/indigence/update"),
    //       props: true,
    //     },
    //   ],
    // },

    // {
    //   path: "/indigence-patient",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "update",
    //       component: () => import("@/pages/indigence-patient/update"),
    //       props: true,
    //     },
    //   ],
    // },

    // {
    //   path: "/tresorerie",
    //   component: layout,
    //   children: [
    //     {
    //       path: "update/:id(\\d+)",
    //       name: "tresorerie-update",
    //       component: () => import("@/pages/tresorerie/encaissement/update"),
    //       props: true,
    //     },
    //   ],
    // },

    {
      path: "*",
      redirect: "/error-404",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "error-404",
          component: () => import("@/pages/samples/error-pages/error-404"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/accueil",
    "/register",
    "/register/talent",
    "/register/society",
    "/register/verifycode",
    "/login",
    "/auth-pages/forget-password",
    "/auth-pages/reset",
  ];
  const authRequired = !publicPages.includes(to.path); // to.path est la route demandé
  const loggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Récupérer le rôle de l'utilisateur

  if (authRequired && !loggedIn) {
    next("/login");
  } else if (
    to.meta.requiresAuth &&
    to.meta.role &&
    to.meta.role !== userRole
  ) {
    // Rediriger vers le tableau de bord correspondant au rôle de l'utilisateur
    if (userRole == "roletalent") {
      next("/dashboard/talent");
    } else if (userRole == "roleentreprise") {
      next("/dashboard/entreprise");
    } else {
      next("/error-pages/error-404"); // Par défaut, rediriger vers une page d'erreur si le rôle n'est pas reconnu
    }
  } else {
    next();
  }
});

export default router;
