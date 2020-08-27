<template>
  <div v-if="content" class="text-component bg-light-green py-3 px-1 px-md-2 px-lg-3 px-xl-5">
    <p
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      v-html="content"
      class="text-component__content w-500 lh-18"
    ></p>
  </div>
</template>

<script>
export default {
  name: "TextComponent",
  props: ["model"],

  mounted() {
    console.log(this.model, "TC");
  },

  computed: {
    content() {
      return this.model && _.get(this.model, "fields.content");
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

.text-component {
}
</style>