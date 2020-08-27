<template v-if="navItems">
  <nav
    ref="nav"
    class="navigation position-fixed on-higher-top d-flex justify-content-between align-items-center px-1 px-md-2 px-lg-3 px-xl-5 t-0 l-0 w-100 transition"
    :class="{ 'shrink' : scrolled,
    'with-bg blue' : scrollY > 40 && !blackNav,
    'black': blackNav
    }"
  >
    <div
      ref="logoWrapper"
      class="logo-wrapper d-flex align-items-start on-higher-top"
      @click="closeMenu()"
    >
      <router-link to="/">
        <cowboy class="logo" alt="O logo picture" :class="{'blue': scrollY > 40 && !blackNav}" />
      </router-link>
    </div>
    <ul class="ul h-100 d-none d-lg-flex justify-content-center align-items-center">
      <li class="h6 pr-2 position-relative">
        <router-link @click.native="closeMenu" v-if="hotelsNavItem" :to="hotelsNavItem.slug" v-html="$t('our-locations')"></router-link>
        <span class="ml-7" @click="toggleHotelsVisibility">
          <down v-if="!dropdownIsOpen" class="icon" :class="{'icon--blue' : scrollY > 40}" />
          <up v-else class="icon" :class="{'icon--blue' : scrollY > 40}" />
        </span>
          <div v-if="dropdownIsOpen" class="hotels-list-box" :class="{'scrolled' : scrollY > 40}" :style="scrollY > 40 && { height: `${hotelsData.length * 2}rem`}" >
        <ul v-if="dropdownIsOpen" class="hotels-list">
          <li class="h6" v-for="(item, i) in hotelsData" :key="i" :class="{'pb-6' : i !== hotelsData.length - 1}">
            <router-link @click.native="closeMenu" :to="item.slug">{{ item.location }}</router-link>
          </li>
        </ul>
      </div>
      </li>
      <li
        class="h6"
        v-for="(item, i) in navItemsWithoutHotels"
        :key="i"
        :class="{'pr-2' : i !== navItemsWithoutHotels.length - 1}"
      >
        <router-link :to="item.slug" class v-html="item.title"></router-link>
      </li>
    </ul>
    <hamburger
      :class="{'blue' : scrollY > 40 && !blackNav}"
      class="hamburger d-block d-lg-none on-higher-top"
      @click.native="toggleMenu"
    />
    <fullscreen-menu :model="navItemsWithoutHotels" :hotelsNavItem="hotelsNavItem" :hotelsData="hotelsData" v-if="navItems && menuOpen" />
  </nav>
</template>

<script>
import Hamburger from "@/components/navigation/Hamburger";
import FullscreenMenu from "@/components/navigation/FullscreenMenu";
import Cowboy from "@/assets/svg/cowboy.svg";
import Down from "@/assets/svg/down.svg";
import Up from "@/assets/svg/up.svg";

export default {
  name: "Navigation",
  data: () => ({
    dropdownIsOpen: false,
    scrollY: 0,
    scrolled: false,
  }),

  components: {
    Hamburger,
    Cowboy,
    FullscreenMenu,
    Down,
    Up,
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  watch: {
    scrollY(v) {
      this.dropdownIsOpen = false;
    },
  },

  methods: {
    toggleHotelsVisibility() {
      setTimeout(() => (this.dropdownIsOpen = !this.dropdownIsOpen), 200);
    },

    closeMenu() {
      this.dropdownIsOpen = false;
      this.$store.dispatch("app/SET_STATE", {
        menuOpen: false,
      });

      return true;
    },

    toggleMenu() {
      this.$store.dispatch("app/SET_STATE", {
        menuOpen: !this.menuOpen,
      });
    },

    handleScroll() {
      this.scrolled = window.scrollY > this.scrollY;
      this.scrollY = window.scrollY;
    }
  },

  computed: {
    navItems() {
      return (
        this.nav &&
        _.map(_.get(this.nav, "fields.pages"), (el) => _.get(el, "fields"))
      );
    },

    navItemsWithoutHotels() {
      return this.navItems && this.navItems.slice(1);
    },

    hotelsNavItem() {
      return this.navItems && this.navItems[0];
    },

    hotelsData() {
      return (
        this.hotels &&
        _.map(this.hotels, (hotel) =>
          Object.assign(
            {},
            {
              slug: hotel.url,
              location:
                _.get(hotel, "fields.city") +
                ", " +
                _.get(hotel, "fields.state"),
            }
          )
        )
      );
    },

    menuOpen() {
      return this.$store.getters["app/getState"]("menuOpen");
    },
    blackNav() {
      return this.$store.getters["app/getState"]("blackNav");
    },
    nav() {
      return this.$store.getters["pages/getState"]("navigation")[0];
    },
    hotels() {
      return this.$store.getters["pages/getState"]("hotels");
    }
  },
};
</script>

<style lang="scss" scoped="">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~/assets/css/variables.scss";
@import "~/assets/css/mixins.scss";

.navigation {
  height: 13vh;
  color: $white;
  transition: 0.4s;

  & .icon {
    height: 1rem;
    width: 1rem;
    fill: $white;
    cursor: pointer;

    &--blue {
      fill: $blue;
    }
  }

  & .hotels-list-box {
    &.scrolled {
      position: absolute;
      left: -100vw;
      width: 200vw;
      background: $white;
      top: 6vh;
        & .hotels-list  {
          left: 100vw;
          top: 0;
        }
    }
  }
  & .hotels-list {
    position: absolute;
    top: 6vh;
  }

  &.black {
    background: $grey;
  }

  &.with-bg {
    background: $white;
    color: $blue;
  }

  & .hamburger {
    &.blue {
      & /deep/ {
        .line {
          background: $blueV2 !important;
        }
      }
    }
  }

  &.shrink {
    transform: translateY(-100%);
  }

  & .logo {
    height: 3rem;
    // width: 2rem;
    fill: white;

    &.blue {
      fill: $blue;
    }
  }
}
</style>

<!-- height: calc(4rem (ili koji vec padding: 2rem 0) + 100px-visina ul-lokacija) 
i na nav se menja align-center u start... mozda bi upalilo... !--> 