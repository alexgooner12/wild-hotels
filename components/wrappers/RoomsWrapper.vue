<template>
  <div
    v-if="model"
    :class="{'px-lg-3 px-xl-5' : !noPaddingX}"
    class="rooms-wrapper bg-light-green px-1 px-md-2 py-3"
  >
    <h2 v-if="$t('rooms')" class="text-center pb-3 color-blue" v-html="$t('rooms')"></h2>
    <ul v-if="model && model.length" class="d-flex row gutter">
      <room-box
        data-aos="fade-left"
        :data-aos-offset="200 * i / 2"
        :data-aos-delay="50 * i / 100"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        v-for="(box, i) in visibleItems"
        :key="i"
        :model="box"
        class="item col-sm-6 col-lg-4"
      />
    </ul>
    <div v-if="model.length > numberOfVisibleItems" class="text-center pt-3">
      <button @click="showAllItems" class="button blue">See all rooms</button>
    </div>
  </div>
</template>

<script>
import RoomBox from "@/components/boxes/RoomBox";

export default {
  name: "RoomsWrapper",
  props: ["model", "noPaddingX"],
  data: () => ({
    numberOfVisibleItems: 6,
  }),

  methods: {
    showAllItems() {
      this.numberOfVisibleItems = this.model.length;
    },
  },

  components: {
    RoomBox,
  },

  computed: {
    visibleItems() {
      return this.model && this.model.slice(0, this.numberOfVisibleItems);
    },
  },
};
</script>

<style>
.rooms-wrapper {
}
</style>