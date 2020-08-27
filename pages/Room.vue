<template>
  <div v-if="model" class="page room">
      <small-header v-if="headerImage" :model="headerImage" />
      <hotel-info v-if="content" :model="content" />
      <rooms-wrapper v-if="relatedRoomsWithUrl" :model="relatedRoomsWithUrl" />
      <hotel-footer v-if="activeHotel" :model="activeHotel" />
  </div>
</template>

<script>
import { loadRoom, loadActiveHotelFromRoom, loadActiveFloorFromRoom } from "../plugins/framework";
import SmallHeader from "@/components/headers/SmallHeader"
import HotelInfo from "@/components/hotel/HotelInfo"
import RoomsWrapper from "@/components/wrappers/RoomsWrapper";
import HotelFooter from "@/components/hotel/HotelFooter"

export default {
  name: "Room",

  async asyncData({ store, route }) {
    const activePage = await loadRoom(route.path)
    const activeHotel = await loadActiveHotelFromRoom(activePage);
    const activeFloor = await loadActiveFloorFromRoom(activePage);

    store.dispatch("pages/SET_STATE", {
      activePage
    });

    return {
      model: activePage,
      activeFloor,
      activeHotel
    };
  },

  mounted() {
  },

  computed: {
    headerImage() {
      return this.model && _.get(this.model, "fields.image");
    },
    content() {
      return this.model && _.get(this.model, "fields.content");
    },

    relatedRooms() {
      return this.activeFloor && _.filter(_.get(this.activeFloor, "fields.rooms"), room => _.get(room, "sys.id") != _.get(this.model, "sys.id"));
    },

    relatedRoomsWithUrl() {
      return this.relatedRooms && _.map(this.relatedRooms, room => Object.assign({}, { ...room, url: `/${_.get(room, "fields.title").toLowerCase().replace(/\s/g, "-")}` }))
    }
  },

  components: {
    SmallHeader,
    HotelInfo,
    RoomsWrapper,
    HotelFooter
  }
};
</script>

<style>
.room {
}
</style>
