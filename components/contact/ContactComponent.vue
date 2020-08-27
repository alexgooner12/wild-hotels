<template>
  <div
    class="contact-component bg-beige position-relative px-2 px-md-0 t-0 l-0 w-100 h-100 on-top py-3"
  >
    <div class="col-md-8 mx-auto row">
      <h6
        v-html="$t('contact-headline')"
        class="form-headline letter-spacing color-blue text-center mx-auto pb-3"
      ></h6>
      <!-- <ValidationObserver ref="updateForm" v-slot="{ invalid }" class="w-100 d-flex flex-column" tag="form" @submit.prevent="sendEmail()"> -->
      <form
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        class="form gutter row mt-n2 tiny"
        @submit.prevent="sendEmail"
      >
        <div class="col-6 item">
          <!-- <ValidationProvider rules="required" v-slot="{ errors }"> -->
          <label for="first-name"></label>
          <input
            id="first-name"
            type="text"
            placeholder="First name"
            class="input w-100 h-100"
            name="firstName"
            v-model="firstName"
          />
          <!-- </ValidationProvider> -->
        </div>
        <div class="col-6 item">
          <label for="last-name"></label>
          <input
            id="last-name"
            type="text"
            placeholder="Last name"
            class="input w-100 h-100"
            name="lastName"
            v-model="lastName"
          />
        </div>
        <div class="col-6 item">
          <label for="email"></label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            class="input w-100 h-100"
            name="email"
            v-model="email"
          />
        </div>
        <div class="col-6 item">
          <label for="phone"></label>
          <input id="phone" type="phone" placeholder="Phone" class="input w-100 h-100" name="phone" />
        </div>
        <div class="col-12 item">
          <label for="reason"></label>
          <input
            id="reason"
            type="text"
            placeholder="Reason for contact"
            class="input w-100 h-100"
            name="reason"
            v-model="reason"
          />
        </div>
        <div class="w-100 item">
          <label></label>
          <textarea rows="5" class="w-100" placeholder="Message..." v-model="message" />
        </div>
        <div class="pt-3 mt-n2 mx-auto">
          <button
            type="submit"
            class="form__button button blue text tiny wide uppercase"
            :class="{'d-none' : sent, 'd-block' : !sent}"
            v-html="$t('send')"
          ></button>
          <p class="regular d-none" :class="{'d-block' : sent}" v-html="$t('form-submit')"></p>
        </div>
      </form>
      <!-- </ValidationObserver> -->
    </div>
  </div>
</template>

<script>
// import { ValidationProvider, ValidationObserver, validate } from "vee-validate";
import axios from "axios";

export default {
  name: "ContactComponent",

  components: {
    // ValidationProvider,
    // ValidationObserver,
  },

  props: ["model"],

  data: () => ({
    sent: false,
    firstName: null,
    lastName: null,
    reason: null,
    phone: null,
    email: null,
    message: null,
    customErrors: {
      custom: {
        name: {
          required: "'Navn' is required.",
          alpha: "'Navn' should contain letters only.",
        },
        phone: {
          required: "'Telefonnummer' is required.",
          alpha: "'Telefonnummer' should contain letters only.",
        },
        email: {
          required: "'E-post' is required.",
          email: "Please enter the valid email address.",
        },
      },
    },
  }),

  computed: {},

  watch: {},

  methods: {
    // async sendEmail() {
    //   let self = this

    //   await this.$validator.validate().then(v => {
    //       self.sent = v

    //       console.log(v, "Vvv")
    //       if (v) {
    //         self.name = null
    //         self.phone = null
    //         self.email = null
    //         self.comment = null
    //       }
    //   });

    //   if (self.sent) {
    //     this.$nextTick(() => this.errors.clear());
    //   }

    // },

    async sendEmail() {
      const r = await axios.post("/", {
        email: "aleksandar_radulovic@rocketmail.com ",
      });
      console.log(r);
    },
  },
};
</script>

<style lang="scss" scoped="">
.contact-component {
  // height: 35vw;
  // .image {
  //     height: 35vw;
  // }

  .image {
    width: calc(100% - 12rem);
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    // @include media-breakpoint-down(sm) {
    //   width: 100%;
    // }
  }
}
</style>
