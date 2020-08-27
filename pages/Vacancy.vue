<template>
  <div class="page vacancy">
    <div v-if="header">
      <component :is="header.fields.template || 'Header'" :model="header" />
    </div>
    <div class="row">
      <aside
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="250"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        class="col-md-3 pt-md-5 py-3 pb-md-0 text-center"
      >
        <div
          v-if="fOptions && fOptions.length"
          v-for="(filter, i) in fOptions"
          :key="i"
          class="d-flex flex-column filter-container px-1 mx-auto"
        >
          <h6
            @click="toggleFilterMobileVisibility"
            class="color-blue text-center text-md-left"
            :class="{'pb-2': isFilterVisible}"
          >
            <span class="pr-6">{{ $t(`${filter.translationKey }`) }}</span>
            <span v-if="isMobile">
              <down class="icon" v-if="!isFilterVisible" />
              <up class="icon" v-else />
            </span>
          </h6>
          <component
            v-if="isFilterVisible"
            :is="filter.type"
            v-for="(el, i) in filter.values"
            :key="i"
            :filterName="filter.queryParam"
            @getSelectedValues="getSelectedValues"
            :model="el"
          ></component>
        </div>
      </aside>
      <rooms-wrapper class="col-md-9" :model="filteredRooms" :noPaddingX="true" />
    </div>
    <div v-if="footer">
      <component :is="footer.fields.template || 'Footer'" :model="footer" />
    </div>
  </div>
</template>

<script>
import filtersConfig from "../config/filters";
import { loadActivePage } from "../plugins/framework";
import RoomsWrapper from "@/components/wrappers/RoomsWrapper";
import filterC from "../mixins/filter";
import Down from "@/assets/svg/down.svg";
import Up from "@/assets/svg/up.svg";

export default {
  name: "Vacancy",

  data: () => ({
    filters: filtersConfig,
    selectedValues: [],
    isFilterVisible: false,
  }),

  watch: {
    filteredRooms(v) {
      console.log(v, "faasd");
    },
  },

  async asyncData({ store, route }) {
    const activePage = await loadActivePage(route.path);

    store.dispatch("pages/SET_STATE", {
      activePage,
    });

    return {
      model: activePage,
    };
  },

  methods: {
    toggleFilter(opt) {
      return _.filter(this.rooms, (room) => room);
    },

    toggleFilterMobileVisibility() {
      setTimeout(() => (this.isFilterVisible = !this.isFilterVisible), 200);
    },

    getSelectedValues(val) {
      if (_.find(this.selectedValues, (v) => v.value.label == val.value.label))
        this.selectedValues = _.filter(
          this.selectedValues,
          (sv) => sv.value.label != val.value.label
        );
      else this.selectedValues.push(val);
    },
  },

  mounted() {
    this.isFilterVisible = !this.isMobile;
  },

  components: {
    RoomsWrapper,
    Down,
    Up
  },

  computed: {
    rooms() {
      return this.$store.getters["pages/getState"]("rooms");
    },
    typesOfRooms() {
      return (
        this.rooms &&
        _.map(
          _.uniq(_.map(this.rooms, (room) => _.get(room, "fields.type"))),
          (el) =>
            Object.assign(
              {},
              {
                label: el,
                num: `${
                  (el.includes("One") && 1) || (el.includes("Two") && 2) || 999
                }`,
              }
            )
        )
      );
    },
    fOptions() {
      if (this.filters && this.typesOfRooms) {
        return _.map(this.filters, (filter) => {
          return Object.assign(
            {},
            {
              ...filter,
              values: this.typesOfRooms.sort((a, b) => a.num - b.num),
            }
          );
        });
      }
    },

    header() {
      return this.model && _.get(this.model, "fields.header");
    },

    footer() {
      return this.model && _.get(this.model, "fields.footer");
    },

    filteredRooms() {
      return (
        (this.selectedValues.length &&
          filterC.filter(this.rooms, this.selectedValues)) ||
        this.rooms
      );
    },
    isMobile() {
      if (process.client) {
        return window.innerWidth < 500;
      }
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

.vacancy {
  .filter-container {
    @include media-breakpoint-up(md) {
      width: 75%;
    }
  }

  .icon {
    height: 1.25rem;
    width: 1.25rem;
    fill: $blue;
  }
}
</style>
