<template>
  <section class="register container-scroller">
    <div class="row">
      <Header />

      <!-- Nouveau h3 ajouté ici -->
      <div class="col-md-12 col-xl-12">
        <h3
          class="text-center font-weight-bold text-primary welcome-text py-4 mb-0 mt-5"
          style="color: white !important; padding-bottom: 13px !important"
        >
          Recruteurs, inscrivez-vous et publiez vos offres d'emploi !
        </h3>
      </div>

      <div class="container-fluid page-body-wrapper">
        <div class="content-wrapper align-items-center auth">
          <div class="w-100 flex-grow">
            <div class="col-xl-8 col-lg-12 mx-auto col-md-12">
              <form class="forms-sample " @submit.prevent="store" enctype="multipart/form-data">
                <div class="auth-form-light text-left card-custom">
                  <h4 class="text-left font-weight-bold" style="color: black">
                    Votre entreprise
                  </h4>
                  <div class="row">
                    <hr class="w-100" style="border-top: 1px solid #cfd0d5" />
                  </div>
                
                  <div class="row">
                    <div class="form-group controls col-md-12 col-lg-12">
                      <label for="exampleFormControlSelect1"
                        >Nom de l'entreprise<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <input
                        type="text"
                        :class="{ 'is-invalid': formErrors.nom }"
                        class="form-control form-control-lg"
                        v-model="entreprise.nomEntreprise"
                        id="nomEntreprise"
                        placeholder="Nom "
                      />
                      <div class="invalid-feedback" v-if="formErrors.nom">
                        {{ formErrors.nom[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-6 col-lg-6">
                      <label for="exampleFormControlSelect1"
                        >Adresse<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <input
                        type="text"
                        :class="{ 'is-invalid': formErrors.adresse }"
                        class="form-control form-control-lg"
                        v-model="entreprise.adresse"
                        id="adresse"
                        placeholder="Adresse"
                      />
                      <div class="invalid-feedback" v-if="formErrors.adresse">
                        {{ formErrors.adresse[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-6 col-lg-6">
                      <label for="exampleFormControlSelect1"
                        >Date de création<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <input
                        :class="{ 'is-invalid': formErrors.date_creation }"
                        @input="clearError('prenom')"
                        type="date"
                        class="form-control form-control-lg"
                        v-model="entreprise.date_creation"
                        id="date_creation"
                        placeholder="date de création"
                      />
                      <div
                        class="invalid-feedback"
                        v-if="formErrors.date_creation"
                      >
                        {{ formErrors.date_creation[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-4 col-lg-4 col-sm-4">
                      <label for="exampleFormControlSelect1"
                        >Pays<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <vue-country-dropdown
                        class="form-control form-control-lg "
                        style="font-size: 15px !important;"
                        :class="{ 'is-invalid': formErrors.pays }"
                        v-model="entreprise.pays"
                        id="pays"
                        @onSelect="onSelect"
                        :preferredCountries="['BJ', 'FR']"
                        :disabledFetchingCountry="false"
                        :defaultCountryByAreaCode="229"
                        :immediateCallSelectEvent="true"
                        :enabledFlags="true"
                        :enabledCountryCode="true"
                        :showNameInput="true"
                        :showNotSelectedOption="true"
                        :notSelectedOptionText="'Sélectionner un pays'"
                      />

                      <div class="invalid-feedback" v-if="formErrors.pays">
                        {{ formErrors.pays[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >ville<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <input
                        :class="{ 'is-invalid': formErrors.ville }"
                        @input="clearError('ville')"
                        type="text"
                        class="form-control form-control-lg"
                        v-model="entreprise.ville"
                        id="ville"
                        placeholder="Ville"
                      />
                      <div class="invalid-feedback" v-if="formErrors.ville">
                        {{ formErrors.ville[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Code postal</label
                      >
                      <input
                        :class="{ 'is-invalid': formErrors.code_postal }"
                        @input="clearError('code_postal')"
                        type="text"
                        class="form-control form-control-lg"
                        v-model="entreprise.code_postal"
                        id="codepostal"
                        placeholder="Code postal"
                      />
                      <div class="invalid-feedback" v-if="formErrors.code_postal">
                        {{ formErrors.code_postal[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Site Internet</label
                      >
                      <input
                        type="text"
                        :class="{ 'is-invalid': formErrors.site_web }"
                        class="form-control form-control-lg"
                        v-model="entreprise.site_web"
                        id="site_web"
                        placeholder="Site web"
                      />
                      <div class="invalid-feedback" v-if="formErrors.site_web">
                        {{ formErrors.site_web[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Logo de l'entreprise</label
                      >
                      <input
                        :class="{ 'is-invalid': formErrors.logo }"
                        @input="clearError('logo')"
                        type="file" name="logo"
                        class="form-control form-control-lg"
                        @change="handleFileUpload"
                        id="logo"
                        placeholder="Logo entreprise"
                      />
                      <div class="invalid-feedback" v-if="formErrors.logo">
                        {{ formErrors.logo[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Secteur d'activité<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <select
                        :class="{
                          'is-invalid': formErrors.secteurs_activite_id,
                        }"
                        @change="clearError('secteurs_activite_id')"
                        v-model="entreprise.secteurs_activite_id"
                        class="form-control text-dark form-control-lg"
                        id="secteurs_activite_id"
                      >
                        <option value="" disabled>
                          Secteur activite
                        </option>
                        <option
                          v-for="secteur in SecteursActivite"
                          :key="secteur.id"
                          :value="secteur.id"
                        >
                          {{ secteur.secteur }}
                        </option>
                      </select>
                  
                      <div
                        class="invalid-feedback"
                        v-if="formErrors.secteurs_activite_id"
                      >
                        {{ formErrors.secteurs_activite_id[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="auth-form-light text-left card-custom mt-4">
                  <h4 class="text-left font-weight-bold" style="color: black">
                    Présentation de l'entreprise
                  </h4>
                  <div class="row">
                    <hr class="w-100" style="border-top: 1px solid #cfd0d5" />
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-12 col-lg-12">
                      <label for="exampleFormControlSelect1">
                        Description de l'entreprise<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >

                      <froala
                        :class="{ 'is-invalid': formErrors.presentation }"
                        id="presentation"
                        :tag="'textarea'"
                        :config="config"
                        v-model="entreprise.presentation"
                      ></froala>
                      <div
                        class="invalid-feedback"
                        v-if="formErrors.presentation"
                      >
                        {{ formErrors.presentation[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="auth-form-light text-left card-custom mt-4">
                  <h4 class="text-left font-weight-bold" style="color: black">
                    Histoire de l'entreprise
                  </h4>
                  <div class="row">
                    <hr class="w-100" style="border-top: 1px solid #cfd0d5" />
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-12 col-lg-12">
                      <label for="exampleFormControlSelect1">
                        Histoire de l'entreprise<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >

                      <froala
                        :class="{ 'is-invalid': formErrors.histoire }"
                        id="histoire"
                        :tag="'textarea'"
                        :config="config2"
                        v-model="entreprise.histoire"
                      ></froala>
                      <div class="invalid-feedback" v-if="formErrors.histoire">
                        {{ formErrors.histoire[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="auth-form-light text-left card-custom mt-4">
                  <h4 class="text-left font-weight-bold" style="color: black">
                    Culture d'entreprise et les valeurs
                  </h4>
                  <div class="row">
                    <hr class="w-100" style="border-top: 1px solid #cfd0d5" />
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-12 col-lg-12">
                      <label for="exampleFormControlSelect1">
                        Culture d'entreprise et les valeurs<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <froala
                        :class="{ 'is-invalid': formErrors.culture }"
                        id="culture"
                        :tag="'textarea'"
                        :config="config3"
                        v-model="entreprise.culture"
                      ></froala>
                      <div class="invalid-feedback" v-if="formErrors.culture">
                        {{ formErrors.culture[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="auth-form-light text-left card-custom mt-4">
                  <h4 class="text-left font-weight-bold" style="color: black">
                    Coordonnées de contact
                  </h4>
                  <div class="row">
                    <hr class="w-100" style="border-top: 1px solid #cfd0d5" />
                  </div>
                  <div class="row">
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Civilité
                        <span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <select
                        :class="{ 'is-invalid': formErrors.civilite }"
                        @change="clearError('civilite')"
                        v-model="entreprise.civilite"
                        class="form-control text-dark"
                        id="civilite"
                      >
                        <option value="" disabled>Civilité</option>
                        <option value="Mr" class="text-dark">Mr</option>
                        <option value="Mme" class="text-dark">Mme</option>
                      </select>
                      <div class="invalid-feedback" v-if="formErrors.civilite">
                        {{ formErrors.civilite[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Nom<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <input
                        type="text"
                        :class="{ 'is-invalid': formErrors.nom }"
                        class="form-control form-control-lg"
                        v-model="entreprise.nom"
                        id="nom"
                        placeholder="Nom"
                      />
                      <div class="invalid-feedback" v-if="formErrors.nom">
                        {{ formErrors.nom[0] }}
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Prénom<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <input
                        :class="{ 'is-invalid': formErrors.prenom }"
                        @input="clearError('prenom')"
                        type="text"
                        class="form-control form-control-lg"
                        v-model="entreprise.prenom"
                        id="prenom"
                        placeholder="Prénom"
                      />
                      <div class="invalid-feedback" v-if="formErrors.prenom">
                        {{ formErrors.prenom[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div
                      class="form-group controls col-md-4 col-lg-4 col-sm-12 col-xl-4"
                    >
                      <label for="exampleFormControlSelect1"
                        >Téléphone<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <div class="iti-wrapper">
                        <input
                          :class="{ 'is-invalid': formErrors.telephone }"
                          type="tel"
                          id="phone"
                          ref="phoneInput"
                          class="form-control form-control-lg iti-input pr-5 w-100"
                          v-model="entreprise.telephone"
                          @input="onPhoneInputChange"
                          placeholder="Téléphone"
                        />
                        <div
                          class=""
                          style="font-size: 14px; color: rgb(232, 74, 69)"
                          v-if="formErrors.telephone"
                        >
                          {{ formErrors.telephone[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1"
                        >Email<span class="font-weight-bold" style="color: red">
                          *</span
                        ></label
                      >
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        v-model="entreprise.email"
                        id="email"
                        placeholder="email"
                        :class="{ 'is-invalid': formErrors.email }"
                        @input="clearError('email')"
                      />
                      <div class="invalid-feedback" v-if="formErrors.email">
                        {{ formErrors.email[0] }}
                      </div>
                    </div>

                    <div class="form-group controls col-md-4 col-lg-4">
                      <label for="exampleFormControlSelect1">Page LinkedIn</label>
                      <input
                        type="linkedin"
                        class="form-control form-control-lg"
                        v-model="entreprise.linkedin"
                        id="linkedin"
                        placeholder="Page LinkedIn"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group controls col-md-6 col-lg-6">
                      <label for="exampleFormControlSelect1"
                        >Password<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <div class="input-group">
                        <input
                          type="password"
                          class="form-control form-control-lg"
                          v-model="entreprise.password"
                          id="password"
                          placeholder="Password"
                          :class="{ 'is-invalid': formErrors.password }"
                          @input="clearError('password')"
                        />

                        <div class="input-group-append">
                          <button
                            class="btn btn-custom"
                            type="button"
                            @click.prevent="togglePasswordVisibility('password')"
                          >
                            <i
                              id="toggle-password-visibility"
                              class="fas fa-eye-slash text-dark"
                            ></i>
                          </button>
                        </div>
                        <div class="invalid-feedback" v-if="formErrors.password">
                          {{ formErrors.password[0] }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group controls col-md-6 col-lg-6">
                      <label for="exampleFormControlSelect1"
                        >Confirmer Password<span
                          class="font-weight-bold"
                          style="color: red"
                        >
                          *</span
                        ></label
                      >
                      <div class="input-group">
                        <input
                          type="password"
                          class="form-control form-control-lg"
                          v-model="entreprise.password_confirmation"
                          id="confirmPassword"
                          placeholder="Confirmer Password"
                          :class="{
                            'is-invalid': formErrors.password_confirmation,
                          }"
                          @input="clearError('password_confirmation')"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-custom"
                            type="button"
                            @click.prevent="
                              togglePasswordVisibility('confirmPassword')
                            "
                          >
                            <i
                              id="toggle-confirmPassword-visibility"
                              class="fas fa-eye-slash text-dark"
                            ></i>
                          </button>
                        </div>
                        <div
                          class="invalid-feedback"
                          v-if="formErrors.password_confirmation"
                        >
                          {{ formErrors.password_confirmation[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 col-md-12 col-lg-12 row">
                    <button type="submit" class="btn btn-info mx-auto">
                      CREER VOTRE COMPTE
                    </button>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    Aviez vous déjà un compte?
                    <router-link to="/auth-pages/login" class="text-info">
                      Se connecter
                    </router-link>
                  </div>
              </form>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from "../../layout/partials/Header-home";
import Footer from "../../layout/partials/Footer";
//import VuePhoneNumberInput from "vue-phone-number-input";
//import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { useToast, POSITION } from "vue-toastification";
import "froala-editor/js/languages/fr.js";

import "intl-tel-input/build/css/intlTelInput.min.css";
import fr from "intl-tel-input/build/js/i18n/fr";
import { entrepriseService } from "@/_services";
import VueCountryDropdown from "vue-country-dropdown";

export default {
  name: "register-student",
  components: {
    Header,
    Footer,
    // VuePhoneNumberInput,
    VueCountryDropdown,
  },
  data() {
    return {
      entreprise: {
        // users_id: "",
        nomEntreprise: "",
        adresse: "",
        code_postal: "",
        pays: "Benin (Bénin)",
        ville: "",
        site_web: "",
        logo: "",
        secteurs_activite_id: "",
        date_creation: "",
        presentation: "",
        histoire: "",
        culture: "",
        nom: "",
        prenom: "",
        civilite: "",
        telephone: "",
        linkedin: "",
        email: "",
        linkdin: "",
        password: "",
        country_code: "229",
        password_confirmation: "",
      },
    
      SecteursActivite:[],


      config: {
        placeholderText: "Description de l'entreprise",
        charCounterCount: false,
        language: "fr",
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
            ],
            align: "left",
            buttonsVisible: 1,
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "formatOLSimple",
              "quote",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
            ],
            align: "left",
            buttonsVisible: 2,
          },
          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              "insertVideo",
              "insertFile",
              "insertTable",
              // "emoticons",
              "fontFamily",
              "fontSize",
              "insertHR",
            ],
            align: "left",
            buttonsVisible: 3,
          },
          moreMisc: {
            buttons: [
              "undo",
              "redo",
              "fullscreen",
              "print",
              // "getPDF",
              "spellChecker",
              "selectAll",
              // "html",
              "help",
            ],
            align: "left",
            buttonsVisible: 8,
          },
        },
        pluginsEnabled: [
          "align",
          "charCounter",
          "codeView",
          "colors",
          // "emoticons",
          "entities",
          "fontFamily",
          "fontSize",
          "fullscreen",
          "inlineStyle",
          "lineBreaker",
          "lists",
          "paragraphFormat",
          "paragraphStyle",
          "quote",
          "save",
          "specialCharacters",
          "url",
          "wordPaste",
        ],
      },
      config2: {
        placeholderText: "Histoire de l'entreprise",
        charCounterCount: false,
        language: "fr",
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
            ],
            align: "left",
            buttonsVisible: 1,
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "formatOLSimple",
              "quote",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
            ],
            align: "left",
            buttonsVisible: 2,
          },
          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              "insertVideo",
              "insertFile",
              "insertTable",
              // "emoticons",
              "fontFamily",
              "fontSize",
              "insertHR",
            ],
            align: "left",
            buttonsVisible: 3,
          },
          moreMisc: {
            buttons: [
              "undo",
              "redo",
              "fullscreen",
              "print",
              // "getPDF",
              "spellChecker",
              "selectAll",
              // "html",
              "help",
            ],
            align: "left",
            buttonsVisible: 8,
          },
        },
        pluginsEnabled: [
          "align",
          "charCounter",
          "codeView",
          "colors",
          // "emoticons",
          "entities",
          "fontFamily",
          "fontSize",
          "fullscreen",
          "inlineStyle",
          "lineBreaker",
          "lists",
          "paragraphFormat",
          "paragraphStyle",
          "quote",
          "save",
          "specialCharacters",
          "url",
          "wordPaste",
        ],
      },
      config3: {
        placeholderText: "Culture d'entreprise et les valeurs",
        charCounterCount: false,
        language: "fr",
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
            ],
            align: "left",
            buttonsVisible: 1,
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "formatOLSimple",
              "quote",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
            ],
            align: "left",
            buttonsVisible: 2,
          },
          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              "insertVideo",
              "insertFile",
              "insertTable",
              // "emoticons",
              "fontFamily",
              "fontSize",
              "insertHR",
            ],
            align: "left",
            buttonsVisible: 3,
          },
          moreMisc: {
            buttons: [
              "undo",
              "redo",
              "fullscreen",
              "print",
              // "getPDF",
              "spellChecker",
              "selectAll",
              // "html",
              "help",
            ],
            align: "left",
            buttonsVisible: 8,
          },
        },
        pluginsEnabled: [
          "align",
          "charCounter",
          "codeView",
          "colors",
          // "emoticons",
          "entities",
          "fontFamily",
          "fontSize",
          "fullscreen",
          "inlineStyle",
          "lineBreaker",
          "lists",
          "paragraphFormat",
          "paragraphStyle",
          "quote",
          "save",
          "specialCharacters",
          "url",
          "wordPaste",
        ],
      },

      formErrors: {},
    };
  },
  methods: {
    handleFileUpload(event) {
    this.entreprise.logo = event.target.files[0];
    this.clearError('logo');
  },
    onSelect(country) {
      this.entreprise.pays = country.name;
      this.entreprise.country_code = country.dialCode ;
      // console.log(this.entreprise.pays);
    },
    togglePasswordVisibility(field) {
      const inputField = document.getElementById(field);
      const icon = document.getElementById(`toggle-${field}-visibility`);
      if (inputField.type === "password") {
        inputField.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      } else {
        inputField.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
    },
    updateValue() {
      this.entreprise.telephone = this.iti.getNumber();
      const selectedCountryData = this.iti.getSelectedCountryData();
      this.entreprise.country_code = selectedCountryData.dialCode;
      // console.log(this.entreprise.country_code);
      // console.log(this.entreprise.telephone);
    },
    onPhoneInputChange() {
      // console.log(this.entreprise.country_code);
      // console.log(this.entreprise.telephone);

      const isValidPhoneNumber = this.iti.isValidNumberPrecise();
      if (!isValidPhoneNumber) {
        this.formErrors.telephone = ["N° Téléphone invalide."];
        // console.log("Ne numéro de téléphone:", this.formErrors.telephone);
      } else {
        this.formErrors.telephone = "";
        this.clearError("telephone");
      }
    },
    getSecteursActivite() {
      entrepriseService.getSecteursActivite()
        .then((response) => {
          this.SecteursActivite = response.data;
        })
        .catch((error) => {
          console.error("Error fetching SecteursActivite:", error);
        });
    },

    store() {

      const formData = new FormData();
      Object.keys(this.entreprise).forEach(key => {
        formData.append(key, this.entreprise[key]);
      });

      entrepriseService.addEntreprise(formData)
        .then((res) => {
          // Traitement en cas de succès de la requête
          this.$toast.success("Entreprise ajoutée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          localStorage.setItem("email", this.entreprise.email);
          this.$router.push("/register/verifycode");
          // Réinitialiser le formulaire ou rediriger vers une autre page, etc.
        })
        .catch((error) => {
          // Traitement en cas d'erreur de la requête
          console.error(error); // Afficher l'erreur dans la console
          if (error.response && error.response.data) {
            // S'il y a des erreurs de validation, les afficher
            this.formErrors = error.response.data.errors;
            // console.log(this.formErrors);
          } else {
            // Sinon, afficher un message d'erreur générique
            this.$toast.error(
              "Une erreur s'est produite. Veuillez réessayer!",
              {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000", // Couleur de fond rouge pour l'erreur
                  color: "#fff", // Couleur du texte
                  fontWeight: "bold",
                  // Autres styles si nécessaire
                },
              }
            );
          }
        });
    },

    clearError(field) {
      if (field in this.formErrors) {
        this.formErrors[field] = "";
      }
    },
    beforeDestroy() {
      if (this.iti) {
        this.iti.destroy();
      }
    },
  },

  mounted() {
    this.getSecteursActivite();
    const input = this.$refs.phoneInput;
    this.iti = intlTelInput(input, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.7/build/js/utils.js",
      i18n: fr,
      separateDialCode: true,
      initialCountry: "bj",
    });
    input.addEventListener("countrychange", () => {
      this.updateValue();
    });
  },
};
</script>

<style scoped>

.iti-input {
  width: 100% !important;
  margin-top: 0px !important; /* Ajoutez la marge supérieure ici */
  padding-right: 5%;
}
.iti-flag {
  background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/10.0.2/img/flags.png");
}
body .intl-tel-input .flag-container {
  position: static !important;
  width: 100% !important;
}

body .intl-tel-input .selected-flag {
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  height: 100% !important;
  width: 100% !important;
}

body .intl-tel-input .country-list {
  width: 100% !important;
  top: 100% !important;
}
.iti {
  --iti-path-flags-1x: url("../../assets/images/intl-tel-input/flags.png");
  --iti-path-flags-2x: url("../../assets/images/intl-tel-input/flags@2x.png");
  --iti-path-globe-1x: url("../../assets/images/intl-tel-input/globe.png");
  --iti-path-globe-2x: url("../../assets/images/intl-tel-input/globe@2x.png");
}
.welcome-text {
  background-color: #3b424b; /* Couleur de fond sombre */
  color: white; /* Couleur du texte */
  padding: 16px; /* Espacement intérieur */
  margin-top: 50px; /* Décalage par rapport au header */
  display: flex; /* Utilisation de Flexbox */
  justify-content: center; /* Centrage horizontal */
  align-items: center; /* Centrage vertical */
  text-align: center; /* Centrer le texte */
  font-weight: bold; /* Mettre le texte en gras */
  align-items: center;
}
.custom-hr {
  border: none; /* Supprime les bordures par défaut */
  border-top: 1px solid #cfd0d5; /* Ajoute une bordure supérieure de couleur noire */
  width: 100% !important; /* Prend toute la largeur */
  margin: 0; /* Annule les marges par défaut */
}
.btn-custom {
  color: #6c757d; /* Couleur du texte par défaut */
  border-color: #ababad; /* Couleur de la bordure par défaut */
}

.card-custom {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.btn-custom:hover,
.btn-custom:focus {
  color: #8a959e; /* Couleur du texte au survol ou au focus */
  background-color: transparent; /* Fond transparent au survol ou au focus */
  border-color: #ababad; /* Couleur de la bordure au survol ou au focus */
}

.background-text {
  background-color: #f0f0f0; /* Couleur de fond */
  padding: 20px; /* Ajout de marge intérieure pour le texte */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre */
  position: relative; /* Position relative pour le positionnement du texte */
}

.background-text h4 {
  position: absolute; /* Position absolue pour centrer le texte */
  top: 50%; /* Aligner le haut du texte à 50% de la hauteur du conteneur */
  left: 50%; /* Aligner le gauche du texte à 50% de la largeur du conteneur */
  transform: translate(
    -50%,
    -50%
  ); /* Utiliser transform pour centrer le texte */
  margin: 0; /* Supprimer les marges par défaut */
}

select {
  cursor: pointer;
  height: 43px !important;
}
/* Vos styles CSS ici */
</style>
