<template v-if="displayingItems">
  <div class="preview px-1 px-md-2 px-lg-3 px-xl-5 py-3 overflow-hidden">
    <h2 v-if="previewHeadline" v-html="previewHeadline" class="h2 color-blue text-center" />
    <!-- UPPER SECTION -->
    <div
         data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true" 
      class="upper-section px-md-1 px-lg-0 py-3 justify-content-md-center">
      <div class="px-1" v-for="(item, i) in displayingItems" :key="i + '01'">
        <p
          class="line-link text-center black subheadline-font tiny cursor-pointer"
          v-if="item.fields.headline || item.fields.name"
          v-html="item.fields.headline || item.fields.name"
          :class="{'shrink': currentIndex == i, 'grow': currentIndex != i}"
          @click="change(i)"
        ></p>
      </div>
    </div>
    <!-- END :: UPPER SECTION -->

    <ul v-if="displayingItems">
      <preview-box 
        v-if="i == currentIndex" 
        v-for="(item, i) in displayingItems" 
        :key="i"
        :inverted="i % 2" 
        :model="item" />
    </ul>
  </div>
  
</template>

<script>
import PreviewBox from "@/components/boxes/PreviewBox";

export default {
  name: "Preview",

  props: ["model"],

  data: () => ({
    currentIndex: 0,
    indexOfOpenAccordion: 0
  }),

  components: {
      PreviewBox
  },

  computed: {
    hotels() {
      return this.$store.getters["pages/getState"]("hotels");
    },
    items() {
      return this.model && _.get(this.model, "fields.items");
    },

    displayingItems() {
      return this.hotels || this.items;
    },

    image() {
      return this.model && _.get(
        this.items[this.currentIndex],
        "fields.backgroundImage.fields.file.url"
      );
    },

    previewHeadline() {
      return this.model && _.get(this.model, "fields.headline");
    },

    headline() {
      return this.model && _.get(this.items[this.currentIndex], "fields.headline");
    },

    content() {
      return this.model && _.get(this.items[this.currentIndex], "fields.content");
    },

    url() {
      return this.model && _.get(this.items[this.currentIndex], "fields.relatedPage.url");
    },

    button() {
      return _.get(this.items[this.currentIndex], "fields.button");
    },

    lastItemIndex() {
      return this.items && this.items.length - 1;
    }
  },

  methods: {
    change(i) {
      this.currentIndex = i;
    },
    toggleAccordionByIndex(index) {
      if (this.indexOfOpenAccordion !== index) {
        this.indexOfOpenAccordion = index;
        this.change(index);
      }
      else this.indexOfOpenAccordion = null;
    }
  }
};
</script>

<style lang="scss" scoped="">
.preview {
  .img {
    height: 20rem;
  }

  .upper-section {
    display: inline-flex;
    width: 100%;
    overflow-x: auto;
  }
}
</style>
