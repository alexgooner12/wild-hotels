<template v-if="model">
  <div class="box row">
    <div class="box__img-box">
      <img :src="image" class="h-100 w-100" alt="box image" />
    </div>
    <div class="bg-white py-2 p-2">
      <h5 v-if="headline" v-html="headline" class="pb-1" />
      <p v-if="content" v-html="content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: ["model"],
  data: () => ({}),

  mounted() {
    console.log(this.model, "box");
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

.box {
  &__img-box {
    height: 15rem;
  }
}

</style>