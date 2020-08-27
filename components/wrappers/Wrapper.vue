<template v-if="displayingItems">
  <div class="wrapper bg-light-green px-1 px-md-2 px-lg-3 px-xl-5 py-3">
    <h2 v-if="headline" v-html="headline" class="wrapper__headline pb-3 color-blue text-center" />
    <ul class="wrapper__content d-none d-sm-flex row gutter wrapper-list">
      <room-box
        data-aos="fade-left"
        :data-aos-offset="200 * i / 2"
        :data-aos-delay="50 * i / 100"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        v-for="(box, i) in displayingItems"
        :key="i"
        :model="box"
        class="b item col-sm-6 col-md-4"
      />
    </ul>
    <div class="d-sm-none">
      <swiper class="h-100 w-100" :customOptions="swiperOptions" overflowVisible="true">
        <div
          class="swiper-slide pr-md-2 d-flex w-100"
          v-for="(box, i) in displayingItems"
          :key="i + 1"
        >
          <room-box class="should-animate col-lg-6 col-12 d-flex flex-column w-100" :model="box" />
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { loadCheapestRoomsByType } from "../../plugins/framework";
import Box from "@/components/boxes/Box";
import RoomBox from "@/components/boxes/RoomBox";

export default {
  name: "Wrapper",
  props: ["model"],
  data: () => ({
    cheapestRoomsByType: null
  }),

  async mounted() {
    const cheapestRoomsByType = await loadCheapestRoomsByType(this.rooms);
    this.cheapestRoomsByType = cheapestRoomsByType;
  },

  components: {
    Box,
    RoomBox
  },

  methods: {},

  computed: {
    rooms() {
      return this.$store.getters["pages/getState"]("rooms");
    },
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },
    boxes() {
      return this.model && _.get(this.model, "fields.boxes");
    },
    displayingItems() {
      return this.cheapestRoomsByType || this.boxes;
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
    }
  }
};
</script>

<style></style>