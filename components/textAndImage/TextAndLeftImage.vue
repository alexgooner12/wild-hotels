<template v-if="model">
  <div class="text-and-left-image px-1 px-md-2 px-lg-3 px-xl-5 py-3">
    <div class="row">
      <div
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
         class="col-sm-6 text-and-left-image__img pb-3 pb-sm-0">
        <img :src="image" class="image h-100 w-100" alt="Nice image" />
      </div>
      <div
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
         class="col-sm-6 pl-sm-3 text-and-left-image__content">
        <h2 
          v-if="headline" 
          v-html="headline" 
          class="pb-3 color-blue" />
        <p 
          v-if="content" 
          v-html="content"
          class="text-justify"
          :class="{'pb-2' : link}" />
        <router-link v-if="link" :to="link" class="line-link blue shrink">See more</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TextAndLeftImage",
  props: ["model"],
  data: () => ({}),

  mounted() {
  },

  computed: {
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },
    content() {
      return this.model && _.get(this.model, "fields.content");
    },
    image() {
      return this.model && _.get(this.model, "fields.image.fields.file.url");
    },
    link() {
      return this.model && _.get(this.model, "fields.link");
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

.text-and-left-image {
 & .image {
   min-height: 20rem;
 }
}
</style>