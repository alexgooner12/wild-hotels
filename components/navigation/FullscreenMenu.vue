<template>
  <div
    ref="menu"
    class="fullscreen-menu position-fixed t-0 l-0 w-100 h-100 bg-blue on-top pb-2 pb-md-3 d-flex flex-column justify-content-center align-items-center"
  >
    <ul>
      <li class="pb-1">
        <router-link
          class="h4"
          @click.native="closeMenu"
          v-if="hotelsNavItem"
          :to="hotelsNavItem.slug"
          v-html="$t('our-locations')"
        ></router-link>
        <span class="ml-7 vert-align-super" @click="dropdownIsOpen = !dropdownIsOpen">
          <down v-if="!dropdownIsOpen" class="icon" />
          <up v-else class="icon" />
        </span>
        <ul v-if="dropdownIsOpen">
          <li class="pl-3" v-for="(item, i) in hotelsData" :key="i" :class="{'pb-1' : i !== hotelsData.length - 1, 'pt-1' : i == 0}">
            <router-link
              @click.native="closeMenu()"
              v-if="item && item.slug"
              :to="item.slug"
              class="h6"
              v-html="item.location"
            ></router-link>
          </li>
        </ul>
      </li>
      <li v-for="(item, i) in model" :key="i" :class="{'pb-1' : i !== model.length - 1}">
        <router-link
          @click.native="closeMenu()"
          v-if="item && item.slug"
          :to="item.slug"
          class="h4"
          v-html="item.title"
        ></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Down from "@/assets/svg/down.svg";
import Up from "@/assets/svg/up.svg";

export default {
  name: "fullscreen-menu",

  data: () => ({
    dropdownIsOpen: false,
  }),

  components: {
    Down,
    Up,
  },

  props: ["model", "hotelsData", "hotelsNavItem"],

  watch: {},

  methods: {
    closeMenu() {
      setTimeout(
        () =>
          this.$store.dispatch("app/SET_STATE", {
            menuOpen: false,
          }),
        400
      );
      return true;
    },
  },

  mounted() {
    disableBodyScroll("body");
    document.querySelector('body').style.position = "fixed";
  },

  destroyed() {
    enableBodyScroll("body");
    document.querySelector('body').style.position = "static";
  },

  computed: {
  },
};
</script>

<style lang="scss" scoped="">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~/assets/css/variables.scss";
@import "~/assets/css/mixins.scss";
.fullscreen-menu {
  & .icon {
    height: 1rem;
    width: 1rem;
    fill: $white;
    cursor: pointer;

    &--blue {
      fill: $blue;
    }
  }
}
</style>
