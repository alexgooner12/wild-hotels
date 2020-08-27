<template>
  <div class="page hotels">
    <div v-if="header">
        <component :is="header.fields.template || 'Header'" :model="header" />
    </div>
    <div v-if="hotels">
        <hotels-wrapper :model="hotels" />
    </div>
       <div v-if="footer">
        <component :is="footer.fields.template || 'Footer'" :model="footer" />
      </div>
  </div>
</template>

<script>

import { loadActivePage } from "../plugins/framework"
import HotelsWrapper from "@/components/wrappers/HotelsWrapper"

export default {
  name: "Hotels",

  async asyncData({ store, route }) {
    const activePage = await loadActivePage(route.path);

    store.dispatch("pages/SET_STATE", {
      activePage
    });

    return {
      model: activePage
    };
  },

  mounted() {
  },

  components: {
      HotelsWrapper
  },

  computed: {
    hotels() {
      return this.$store.getters["pages/getState"]("hotels");
    },
    header() {
      return this.model && _.get(this.model, "fields.header");
    },

    footer() {
      return this.model && _.get(this.model, "fields.footer");
    }
  }
};
</script>

<style>
.page--basic {
}
</style>
