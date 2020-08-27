<template>
  <div v-if="model" class="page hotel">
      <hotel-header v-if="bgImage" :model="bgImage" :title="title" />
      <hotel-info v-if="content" :model="content" />
      <hotel-gallery v-if="images" :model="images" />
      <rooms-wrapper v-if="rooms" :model="rooms" />
      <hotel-footer :model="model" />
  </div>
</template>

<script>
import { loadHotel } from "../plugins/framework";

import HotelHeader from "@/components/hotel/HotelHeader";
import HotelInfo from "@/components/hotel/HotelInfo";
import HotelGallery from "@/components/hotel/HotelGallery";
import RoomsWrapper from "@/components/wrappers/RoomsWrapper";
import HotelFooter from "@/components/hotel/HotelFooter";

export default {
  name: "Hotel",

  async asyncData({ store, route }) {
    let hotel = await loadHotel(route.path)

    store.dispatch("pages/SET_STATE", {
      activePage: hotel
    });

    return {
      model: hotel
    };
  },

  mounted() {
    console.log(this.model, "hotel");
    // console.log(this.rooms, "rooms");
  },

  computed: {
      title() {
        return this.model && _.get(this.model, "fields.title").toLowerCase().replace(/\s/g, "-");
      },
      bgImage() {
        return this.model && _.get(this.model, "fields.backgroundImage");
      },
      content() {
        return this.model && _.get(this.model, "fields.content");
      },
      name() {
        return this.model && _.get(this.model, "fields.name");
      },
      address() {
        return this.model && _.get(this.model, "fields.address");
      },
      state() {
        return this.model && _.get(this.model, "fields.state");
      },
      images() {
        return this.model && _.get(this.model, "fields.images");
      },
      floors() {
        return this.model && _.get(this.model, "fields.floors");
      },
      rooms() {
        return this.floors && _.flatten(_.map(this.floors, floor => _.get(floor, "fields.rooms")));
      }
  },

  components: {
      HotelHeader,
      HotelInfo,
      HotelGallery,
      RoomsWrapper,
      HotelFooter
  }
};
</script>

<style>
.page--basic {
}
</style>
