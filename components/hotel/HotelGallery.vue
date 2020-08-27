<template v-if="model">
  <div class="hotel-gallery py-sm-3 px-md-2 px-lg-3 px-xl-5">
    <div class="row gutter d-none d-sm-flex">
      <div
        class="item"
        data-aos="fade-right"
        :data-aos-offset="200 * i / 2"
        :data-aos-delay="50 * i / 100"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        :class="i == 0 || (i % 3 == 0) ? 'col-12' : 'col-6'"
        v-for="(el, i) in model"
        :key="i"
      >
        <img :src="el.fields.file.url" class="image" :alt="'hotel image' + i"/>
      </div>
    </div>
    <div class="d-sm-none">
      <swiper class="h-100 w-100" :customOptions="swiperOptions" overflowVisible="true">
        <div class="swiper-slide pr-md-2 d-flex w-100" v-for="(el, i) in model" :key="i + 1">
          <img :src="el.fields.file.url" class="image" :alt="'hotel image' + i" />
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelGallery",
  props: ["model"],

  data: () => ({}),

  mounted() {
    console.log(this.model, "HGallery");
  },

  components: {},

  methods: {},

  computed: {
    swiperOptions() {
      // Params
      let interleaveOffset = 0.5;

      // Main Slider
      let mainSliderOptions = {
        effect: "fade",
        loop: true,
        speed: 1000,
        allowTouchMove: false,
        watchSlidesProgress: true,
      };

      return mainSliderOptions;
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

.hotel-gallery {
  & .image {
    height: 20rem;
    width: 100%;
  }
}
</style>