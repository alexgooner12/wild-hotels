<template v-if="model">
  <div class="hotel-footer px-1 px-md-2 px-lg-3 px-xl-5 py-3 bg-white">
    <div
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      class="container"
    >
      <h2
        v-if="$t('footer-headline-' + headlineName)"
        v-html="$t('footer-headline-' + headlineName)"
        class="color-blue text-center"
      ></h2>
      <div class="row py-3">
        <div class="col-2">
          <cowboy class="logo" />
        </div>
        <div class="col-md-4 col-6 ml-auto">
          <h5 class="pb-2">Info</h5>
          <p v-if="name" class="pb-6">{{ name }}</p>
          <p v-if="address" class="pb-6">
            <a
              rel="noreferrer"
              class="line-link white medium grow light"
              :href="'https://www.google.com/maps/search/?api=1&query=' + address"
              target="_blank"
              v-html="address"
            />
          </p>
          <p v-if="city" class="pb-6">
            {{ city }}
            <span v-if="state">,</span>
            {{ state }}
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
        <div class="col-md-3 col-sm-6 ml-auto">
          <h5 class="pb-2">Social Media</h5>
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
  </div>
</template>

<script>
import Cowboy from "@/assets/svg/cowboy.svg";

export default {
  name: "Footer",
  props: ["model"],
  data: () => ({}),

  components: {
    Cowboy,
  },

  mounted() {
    console.log(this.headlineName, "H name");
    console.log("H name");
  },

  computed: {
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
    city() {
      return this.model && _.get(this.model, "fields.city");
    },
    state() {
      return this.model && _.get(this.model, "fields.state");
    },
    email() {
      return this.model && _.get(this.model, "fields.email");
    },
    name() {
      return this.model && _.get(this.model, "fields.name");
    },
    title() {
      return this.model && _.get(this.model, "fields.title");
    },
    headlineName() {
      return this.name && this.title.toLowerCase().replace(/\s/g, "-");
    },
  },
};
</script>

<style lang="scss" scoped="true">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~/assets/css/variables.scss";
@import "~/assets/css/mixins.scss";

.hotel-footer {
  & .logo {
    height: 4rem;
    width: 4rem;
    // fill: $white;
  }
}
</style>