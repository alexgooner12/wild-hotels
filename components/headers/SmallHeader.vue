<template v-if="model">
  <div class="small-header d-flex flex-center" :style="{ backgroundImage: `url('${bgImg}')` }">
    <h2
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false" 
      v-if="headline" v-html="headline" class="color-white"></h2>
  </div>
</template>

<script>

export default {
  name: "SmallHeader",
  props: ['model'],

  computed: {
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },

    bgImg() {
      return this.model && _.get(this.model, "fields.backgroundImage.fields.file.url") || _.get(this.model, "fields.file.url");
    }
  }
};
</script>

<style lang="scss" scoped="true">
  .small-header {
    height: 75vh;
    background-size: cover;
  }
</style>