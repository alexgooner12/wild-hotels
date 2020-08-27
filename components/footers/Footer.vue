<template v-if="model">
  <div class="footer px-1 px-md-2 px-lg-3 px-xl-5 py-3 bg-blue color-white">
      <h2 v-if="headline" v-html="headline" class="footer__headline text-center"></h2>
      <div
         data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false" 
        class="footer__content row py-md-3 pt-3">
        <div class="footer__logo-box col-2 mb-2 mb-sm-0">
          <cowboy class="footer__logo slogo" />
        </div>
        <div class="col-sm-4 ml-auto mx-md-auto col-6">
          <h5 class="pb-2">Contact</h5>
          <p v-if="address" class="pb-6">
            <a
              rel="noreferrer"
              class="line-link white medium grow light"
              :href="'https://www.google.com/maps/search/?api=1&query=' + address"
              target="_blank"
              v-html="address"
            />
          </p>
          <p v-if="phone" class="pb-6">
            <a
              rel="noreferrer"
              class="line-link white medium grow"
              :href="'tel:' + phone"
            >Call us via phone</a>
          </p>
          <p v-if="email" class="pb-6">
            <a
              rel="noreferrer"
              class="line-link white medium grow"
              :href="'mailto:' + email"
            >Email us</a>
          </p>
        </div>
        <div class="col-sm-3 pt-3 pt-md-0 col-6">
          <h5 class="pb-2">Social media</h5>
          <p v-if="facebook" class="pb-6">
            <a
              rel="noreferrer"
              target="_blank"
              class="line-link white medium grow"
              :href="facebook"
            >Facebook</a>
          </p>
          <p v-if="instagram" class="pb-6">
            <a
              rel="noreferrer"
              target="_blank"
              class="line-link white medium grow"
              :href="instagram"
            >Instagram</a>
          </p>
          <p v-if="linkedIn" class="pb-6">
                <a
              rel="noreferrer"
              target="_blank"
              class="line-link white medium grow"
              :href="linkedIn"
            >LinkedIn</a>
          </p>
        </div>
      </div>
  </div>
</template>

<script>
import Cowboy from "@/assets/svg/cowboy.svg";

export default {
  name: "Footer",
  props: ["model"],

  components: {
    Cowboy
  },

  computed: {
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },
    instagram() {
      return this.model && _.get(this.model, "fields.instagram");
    },
    facebook() {
      return this.model && _.get(this.model, "fields.facebook");
    },
    linkedIn() {
      return this.model && _.get(this.model, "fields.linkedIn");
    },
    phone() {
      return this.model && _.get(this.model, "fields.phone");
    },
    address() {
      return this.model && _.get(this.model, "fields.address");
    },
    email() {
      return this.model && _.get(this.model, "fields.email");
    }
  }
};
</script>

<style lang="scss" scoped="true">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~/assets/css/variables.scss";
@import "~/assets/css/mixins.scss";

.footer {  
  &__logo {
    height: 4rem;
    width: 4rem;
    fill: $white;
  }
}
</style>