<template v-if="model">
  <div class="hotels-wrapper bg-light-green px-1 px-md-2 px-lg-3 px-xl-5 py-3">
    <!-- <h2 v-if="headline" v-html="headline" class="pb-3 color-blue text-center" /> -->
    <ul v-if="model && model.length" class="hotels-wrapper__list d-none d-sm-flex row gutter">
      <hotel-box
        data-aos="fade-left"
        :data-aos-offset="200 * i / 2"
        :data-aos-delay="50 * i / 100"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        v-for="(box, i) in model"
        :key="i"
        :model="box"
        class="item col-sm-6 col-md-4"
      />
    </ul>
    <div class="d-sm-none">
      <swiper class="h-100 w-100" :customOptions="swiperOptions" overflowVisible="true">
        <div class="swiper-slide pr-md-2 d-flex w-100" v-for="(box, i) in model" :key="i + 1">
          <hotel-box :model="box" class="item col-12 col-sm-6 col-md-4" />
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
import HotelBox from "@/components/boxes/HotelBox";

export default {
  name: "HotelsWrapper",
  props: ["model"],

  components: {
    HotelBox,
  },

  computed: {
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },

    boxes() {
      return this.model && _.get(this.model, "fields.boxes");
    },
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

<style>
.hotels-wrapper {
}
</style>