<template>
  <div>
    <Navigation v-if="loaded" />
    <nuxt v-if="loaded" />
    <div
      id="preloader"
      v-else
      class="d-flex align-items-center justify-content-center flex-column position-fixed w-100 h-100 t-0 l-0 onTop"
    >
      <div id="bg" class="w-100 h-100 t-0 l-0 position-fixed bg-green" v-if="!loaded"></div>

      <h6 id="loading-text" class="big-font color-white mt-1 text-uppercase bold h1">Be Wild</h6>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/navigation/Navigation";

export default {
  data: () => ({
    loaded: false,
  }),
  components: {
    Navigation
  },
  async mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 1200);
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

#loading-text {
  position: absolute;
  top: 50%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
