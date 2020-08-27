<template>
  <div
    ref="videoHeader"
    title="video"
    class="video-header position-relative d-flex justify-content-center align-items-end color-white"
  >
    <!-- BACKGROUND VIDEO SLIDER -->
    <div class="position-absolute overlay t-0 l-0 w-100 h-100 overflow-hidden">
      <html-video title="video" :autoplay="true" class="w-100 h-100" :url="video.fields.file.url"></html-video>
    </div>
    <!-- END :: BACKGROUND VIDEO SLIDER -->
    <div
      class="content-box on-top h-100 w-100 d-flex flex-center flex-column position-absolute"
      data-aos="fade-down"
      data-aos-offset="200"
      data-aos-delay="250"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
    >
      <h1 v-if="headline" v-html="headline" class="pt-3 h1 color-white"></h1>
      <arrow-down @click.native="scrollTo()" class="arrow-down cursor-pointer"></arrow-down>
    </div>
  </div>
</template>

<script>
import HtmlVideo from "@/components/HtmlVideo";
import ArrowDown from "@/assets/svg/arrow-down.svg";

export default {
  name: "VideoHeader",

  data: () => ({}),

  props: ["model"],

  watch: {},

  mounted() {
    console.log(this.model, "videoHeader");
  },

  methods: {
    scrollTo() {
      window.focus();
      window.scrollTo({
        top: this.$refs.videoHeader.offsetHeight,
        behavior: "smooth",
      });
    }
  },

  computed: {
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },
    video() {
      return this.model && _.get(this.model, "fields.video");
    },
  },

  components: {
    HtmlVideo,
    ArrowDown,
  },
};
</script>

<style lang="scss" scoped="true">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~/assets/css/variables.scss";
@import "~/assets/css/mixins.scss";
.video-header {
  min-height: 100vh;

  & .content-box {
    top: 10vh;
  }

  & .arrow-down {
    fill: white;
    height: 2rem;
    width: 2rem;
    position: absolute;
    transform-origin: 50% 50%;
    animation: bounce 1.5s infinite alternate;
  }

  h1 {
    @include media-breakpoint-down(md) {
      font-size: 2rem;
    }
  }
}
</style>
