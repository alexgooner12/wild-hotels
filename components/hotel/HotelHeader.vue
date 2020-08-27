<template v-if="model">
  <div
    ref="hotelHeader"
    class="hotel-header d-flex flex-center flex-column position-relative"
    :style="{ backgroundImage: `url('${bgImg}')` }"
  >
    <h2
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      v-if="$t('headline' + title)"
      v-html="$t(`headline-${title}`)"
      class="color-white"
    ></h2>
  </div>
</template>

<script>
export default {
  name: "HotelHeader",
  props: ["model", "title"],
  data: () => ({}),

  mounted() {
    console.log(this.model, "HH");
  },

  components: {},

  methods: {
    scrollTo() {
      // console.log(this.$bus.$emit);
      // this.$bus.$emit("scrollTo", this.$refs.header.offsetHeight);
      window.scrollTo({
        top: this.$refs.hotelHeader.offsetHeight,
        behavior: "smooth",
      });
    },
  },

  computed: {
    bgImg() {
      return this.model && _.get(this.model, "fields.file.url");
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

.hotel-header {
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: fixed;
}
</style>