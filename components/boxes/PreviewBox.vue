<template v-if="model">
  <div class="preview-box row justify-content-between">
    <div
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      class="preview-box__content col-sm-5 text-justify order-2 order-md-1"
      :class="inverted ? 'order-sm-2' : ''"
    >
      <h4 v-if="headline || hotelName" v-html="headline || hotelName" class="color-blue" />
      <p v-if="content" class="py-2" v-html="content" :class="{'pb-2' : link}"></p>
      <router-link v-if="displayingLink" :to="displayingLink" class="line-link shrink blue">See more</router-link>
    </div>
    <div
      data-aos="fade-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      class="preview-box__img col-sm-6 order-1 order-md-2 pb-2 pb-md-0"
    >
      <img :src="image || hotelImage" class="w-100 h-100" alt="hotel image preview" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PreviewBox",
  props: ["model", "inverted"],
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
    },
    hotelImage() {
      return (
        this.model &&
        _.get(this.model, "fields.backgroundImage.fields.file.url")
      );
    },
    hotelName() {
      return this.model && _.get(this.model, "fields.name");
    },
    hotelLink() {
      return this.model && _.get(this.model, "url");
    },
    link() {
      return this.model && _.get(this.model, "fields.link");
    },
    displayingLink() {
      return this.hotelLink || this.link;
    },
  },
};
</script>

<style></style>