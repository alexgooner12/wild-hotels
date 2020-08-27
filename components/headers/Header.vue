<template v-if="model">
  <div
    ref="header"
    class="header overlay d-flex flex-center flex-column position-relative"
    :style="{ backgroundImage: `url('${bgImg}')` }"
  >
    <div
      data-aos="fade-down"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      class="on-top h-100 w-100 d-flex flex-center flex-column position-relative"
    >
      <h1 v-if="headline" v-html="headline" class="h1 color-white"></h1>
      <arrow-down @click.native="scrollTo()" class="arrow-down cursor-pointer"></arrow-down>
    </div>
  </div>
</template>

<script>
import ArrowDown from "@/assets/svg/arrow-down.svg";

export default {
  name: "Header",
  props: ["model"],

  components: {
    ArrowDown,
  },

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

.header {
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;

  & .arrow-down {
    fill: white;
    height: 2rem;
    width: 2rem;
    position: absolute;
    transform-origin: 50% 50%;
    animation: bounce 1.5s infinite alternate;
  }
}
</style>