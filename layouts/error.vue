<template>
  <div class="bg-green custtom-div d-flex px-1 px-md-2 px-lg-3 px-xl-5 flex-center flex-column">
    <div class>
      <h1 class="bold mb-1">{{$t('404-headline')}}</h1>
      <div class="py-2">
        <h4 class="pb-1">{{$t('404-small-headline')}}</h4>
      </div>
      <div class="d-flex align-items-center cursor-pointer" @click="goBack()">
        <div class="mr-7 circle-icon transition">
          <div>
            <arrow-left class="arrow-left" />
          </div>
        </div>
        <span class="ml-6 line-link shrink cursor-pointer regular">{{$t('go-back')}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import ArrowLeft from "@/assets/svg/arrow-left.svg";

export default {
	methods: {
    goBack() {
      this.$router.push('/');
    },

    prepareMeta()  {
      return {
          title: '404 Page',
          meta: [
              {
                  property: 'og:title',
                  content: '404 – Siden finnes ikke'
              },
              {
                  property: 'og:image',
                  content: "https://images.ctfassets.net/lnyttpc6il2h/cixW6kFTUtgMmtV9jtOBl/3fda25b2ab1ac3fa6a0608001c7870cb/hivan-arvizu-soyhivan-MAnhvw0nDDY-unsplash.png"
              },
          ]
      }
    }
	},

  head()  {
      return this.prepareMeta()
  },

 components: {
    ArrowLeft
	},

	beforeDestroy() {
    this.$store.dispatch("app/SET_STATE", {
      blackNav: false
    })
	},

	mounted() { 
        this.$store.dispatch("app/SET_STATE", {
            blackNav: true
        })
	},
};
</script>
<style>
.custtom-div {
  height: 100vh;
  width: 100vw;
}

.circle-icon {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  background: #0b58a4;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(0.95);
  }
}

.arrow-left {
  width: 2.5rem;
}
</style>
 