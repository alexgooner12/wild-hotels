<template v-if="model">
  <a :href="model.url" class="room-box" rel="no-opener">
    <div class="row h-100">
      <div class="room-box__img-box w-100 h-50">
        <img :src="bgImage" class="room-box__image h-100 w-100" alt="Room image" />
      </div>
      <div class="d-flex flex-column justify-content-between w-100 h-50 bg-white py-2 p-2">
        <h5 v-if="type" class="h5 w-500 color-blue pb-2">{{ title }}</h5>
        <div>
          <p v-if="type" class="small pb-6">Type: {{ type }}</p>
          <p v-if="price" class="small pb-6">Starting from: {{ price }}$</p>
          <div v-if="amenities" class="small d-flex justify-content-between">
            Amenities:
            <ul>
              <li v-for="(el, i) in amenities" :key="i">{{ el.fields.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "RoomBox",
  props: ["model"],
  data: () => ({}),

  mounted() {
    console.log(this.model, "roombox");
  },

  computed: {
    amenities() {
      return this.model && _.get(this.model, "fields.amenities");
    },
    type() {
      return this.model && _.get(this.model, "fields.type");
    },
    title() {
      return this.model && _.get(this.model, "fields.title");
    },
    price() {
      return this.model && _.get(this.model, "fields.price");
    },
    bgImage() {
      return this.model && _.get(this.model, "fields.image.fields.file.url");
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

.room-box {
  transition: 0.4s;
  &:hover {
    transform: scale(0.95);
  }

  &__image {
    min-height: 15rem;
  }
}
</style>