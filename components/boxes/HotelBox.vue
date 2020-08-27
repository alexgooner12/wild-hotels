<template v-if="model">
 <a :href="model.url" class="hotel-box" rel="no-opener">
  <div class="row">
    <div class="hotel-box__img-box position-relative">
      <img :src="bgImage" class="hotel-box__image w-100" alt="Hotel Image background" />
    </div>
    <div class="w-100 bg-white py-2 p-2">
      <h5 v-if="name" v-html="name" class="pb-1" />
      <p v-if="state" class="pb-6" >State: {{ state }}</p>
      <p v-if="city" class="pb-6" >City: {{ city }}</p>
      <div v-if="rating" class="pb-6 rating">
        <font-awesome-icon v-for="(el, i) in rating" :key="i" color="yellow" :icon="['fas', 'star']"/>
      </div>
      <address v-if="address">Address: {{ address }}</address>
    </div>
  </div>
 </a>
</template>

<script>
export default {
  name: "HotelBox",
  props: ["model"],
  data: () => ({}),

  mounted() {
    console.log(this.model, "box");
  },

  computed: {
    name() {
      return this.model && _.get(this.model, "fields.name");
    },
    address() {
      return this.model && _.get(this.model, "fields.address");
    },
    state() {
      return this.model && _.get(this.model, "fields.state");
    },
    city() {
      return this.model && _.get(this.model, "fields.city");
    },
    rating() {
      return this.model && _.get(this.model, "fields.rating");
    },
    bgImage() {
      return this.model && _.get(this.model, "fields.backgroundImage.fields.file.url");
    }
  }
};
</script>

<style lang="scss" scoped="true">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~/assets/css/variables.scss";
@import "~/assets/css/mixins.scss";

.hotel-box {
  transition: .4s;
  &:hover {
    transform: scale(.95);
  }
  &__image {
    height: 15rem;
  }

  & .rating {
    position: absolute;
    top: 1.5rem;
    left: .75rem;
    transform: rotate3d(1, 1, 1, -60deg)
  }
}

</style>