<template v-if="model">
  <header ref="header" class="contact-header overlay row position-relative">
    <!-- <div class="contact-header__display col-md-8" :style="{ backgroundImage: `url('${bgImg}')` }"></div> -->
    <div class="contact-header__display col-md-8">
      <img :src="bgImg" class="h-100 w-100" alt="Contact header image" />
    </div>
    <div class="col-md-4 on-top d-flex align-items-center justify-content-center justify-content-md-end pr-md-2 pr-lg-3 pr-xl-5">
      <div
         data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
         class="d-flex flex-column py-2 py-md-0">
        <h6
          v-if="$t('contact-small-headline')"
          v-html="$t('contact-small-headline')"
          class="h6 uppercase small letter-spaced color-white text-center text-md-right pb-1"
        ></h6>
        <h1 v-if="headline" v-html="headline" class="h1 col-lg-10 text-center text-md-right ml-auto color-white pb-2"></h1>
        <div v-if="$t('see-more')" class="text-center text-md-right">
            <button @click="scrollTo" class="contact__button button blue uppercase tiny" v-html="$t('see-more')"></button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "ContactHeader",
  props: ["model"],

  methods: {
    scrollTo() {
      window.scrollTo({
        top: this.$refs.header.offsetHeight,
        behavior: "smooth",
      });
    },
  },

  computed: {
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },

    bgImg() {
      return (
        this.model &&
        _.get(this.model, "fields.backgroundImage.fields.file.url")
      );
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

.contact-header {
  &__display {
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>