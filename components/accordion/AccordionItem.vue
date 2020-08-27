<template>
  <div class="py-3">
    <div
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      @click="toggle(index)"
      class="d-flex justify-content-between w-100 cursor-pointer"
    >
      <h6 v-if="smallHeadline || name" v-html="smallHeadline || name"></h6>
      <span v-if="isOpen">-</span>
      <span v-else>+</span>
    </div>
    <div
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      v-if="isOpen && content"
      class="text-column col-md-8 col-10 ml-sm-auto color-grey-text-v2 lh-18 pr-sm-4 pt-3"
    >
      <p :class="{'pb-2': url}">{{ content }}</p>
      <router-link v-if="url" :to="url" class="line-link shrink blue">See more</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccordionItem",
  props: [
    "model", 
    "isOpen", 
    "index"
  ],

  methods: {
    toggle(i) {
        this.$emit('toggle', i)
    }
  },

  computed: {
      smallHeadline() {
          return this.model && _.get(this.model, "fields.smallHeadline")
      },
      content() {
          return this.model && _.get(this.model, "fields.content")
      },
      name() {
          return this.model && _.get(this.model, "fields.name")
      },

      url() {
        return this.model && _.get(this.model, "url")
      }
    //   button() {
    //       return this.model && _.get(this.model, "fields.button")
    //   },
  }
};
</script>