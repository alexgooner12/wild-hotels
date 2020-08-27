<template>
  <div class="page page--basic">
    <div class="components-wrapper overflow-hidden">
      <div v-if="header">
        <component :is="header.fields.template || 'Header'" :model="header" />
      </div>
      <!-- <h1>      {{ $t('add-activity')}} </h1> -->

      <div v-if="components">
        <component
          v-for="(component, index) in components"
          :key="index"
          :is="component.fields.template || component.sys.contentType.sys.id"
          :model="component"
        />
      </div>
      <div v-if="footer">
        <component :is="footer.fields.template || 'Footer'" :model="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { loadActivePage } from "../plugins/framework";

export default {
  name: "BasicPage",

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
    console.log(this.model, this.tr, "baseP", this.navModel);
    console.log(this.blackNav, "bnav");
  },

  computed: {
    tr() {
      return this.$store.getters["pages/getState"]("translations");
    },

    navModel() {
      return this.$store.getters["pages/getState"]("navigation");
    },

    components() {
      return this.model && _.get(this.model, "fields.components");
    },

    header() {
      return this.model && _.get(this.model, "fields.header");
    },

    footer() {
      return this.model && _.get(this.model, "fields.footer");
    },
    blackNav() {
      return this.$store.getters["app/getState"]("blackNav");
    }
  },

  components: {}
};
</script>

<style>
.page--basic {
}
</style>
