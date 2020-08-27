<template>
  <div v-if="displayingItems" class="accordion bg-beige px-1 px-md-2 px-lg-3 px-xl-5 py-3">
    <div>
      <h2 v-if="headline" v-html="headline" class="h2 color-blue accordion__headline text-center pb-4" ></h2>
      <div
        v-for="(el, i) in displayingItems"
        :key="i"
        class="accordion__wrapper line-top w-100 narrow"
        :class="{'line-bottom' : i == lastItemIndex}"
      >
        <accordion-item 
          @toggle="toggleAccordionByIndex(i)" 
          :index="i" 
          :model="el" 
          :isOpen="i == indexOfOpenAccordion" />
      </div>
    </div>
  </div>
</template>

<script>
import AccordionItem from '@/components/accordion/AccordionItem'

export default {
  name: 'Accordion',

  props: ["model"],

  data: () => ({
    indexOfOpenAccordion: 0
  }),

  components: {
    AccordionItem
  },

  watch: {
    indexOfOpenAccordion() {
      this.$nextTick(() => {
        this.$bus.$emit("resize");
        this.$bus.$emit("updateScrollbar");
      });
    }
  },

  async mounted() {
    this.setupListeners();
  },

  computed: {
    hotels() {
      return this.$store.getters["pages/getState"]("hotels");
    },
    headline() {
      return this.model && _.get(this.model, "fields.headline");
    },
    items() {
      return this.model && _.get(this.model, "fields.items");
    },
    displayingItems() {
      return this.hotels || this.items;
    },
    lastItemIndex() {
      return this.items && this.items.length - 1;
    }
  },

  methods: {
    toggleAccordionByIndex(index) {
      if (this.indexOfOpenAccordion !== index)
        this.indexOfOpenAccordion = index;
      else this.indexOfOpenAccordion = null;
      this.setupListeners();
      this.$nextTick(() => {
        this.$bus.$emit("resize");
      });
    },

    setupListeners() {
      this.$bus.$on("resize", this.resizeHandler);
    },

    resizeHandler() {
      if (!this.$el) {
        return;
      }
      this.totalWidth = this.$el.clientWidth;
      this.totalHeight = this.$el.clientHeight;
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

  .accordion {
    .line-top {
      border-top: 1px solid $black;
    }

    .line-bottom {
      border-bottom: 1px solid $black;
    }

}
</style>
