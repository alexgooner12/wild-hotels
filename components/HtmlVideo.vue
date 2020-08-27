<template>
<div class="video-player overflow-hidden">
    <video
           class="video responsive"
           ref="video"
           @canplaythrough="onCanPlay"
           @play="playHandle"
           @pause="pauseVideo"
           @seeking="preventPause"
           playsinline
           :muted="!playSound && muted"
           :loop='loop'
           :autoplay='autoplay'
           :controls="controls">
        <source :src="videoUrl"
                type="video/mp4">
    </video>
</div>

</template>

<script>

export default {
    name: 'video-player',

    data: () => ({
        cantplay: false,
        muted: true,
        loop: true,
        controls: false,
        videoPoster: true,
        // autoplay: true
    }),

    props: [
        'model',
        'url',
        'playing',
        'playSound',
        'autoplay'
    ],

    mixins: [
    ],

    watch: {
        playing(playing){
            if(playing){
                this.playVideo()
            }else{
                this.$refs.video && this.$refs.video.pause()
            }
        }
    },

    mounted()  {
        
    },

    methods: {
        onCanPlay(e){
            if(this.autoplay){
                this.playVideo()
            }
        },

        playVideo(e)  {
            console.log("PLAY VIDEO!!!")

            if (!this.$refs.video) {
                return
            }

            let promise = this.$refs.video.play()

            if (promise !== undefined) {
                promise.then(_ => {
                    // video playing
                }).catch(error => {
                    this.cantplay = true
                })
            }

        },

        toggleVideoPlay()  {
            // this.playing = !this.playing
        },

        playHandle()  {},

        pauseVideo()  {},

        preventPause()  {
            this.seeking = true
        }
    },

    computed: {
      videoUrl(){
        return this.url || _.get(this.model, 'fields.video.fields.file.url') 
      }
    },

    components: {}
};

</script>

<style lang="scss" scoped="">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~/assets/css/variables.scss";
@import "~/assets/css/mixins.scss";
.video-player {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
}

.video {
    // &.not-responsive {
      width: 100%;
      height: 100%;
      object-fit: cover;
    // }
    &.responsive {
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translateX(-50%) translateY(-50%);
        // min-width: 100%;
        // min-height: 100%;
        // width: auto;
        // height: auto;
        // background-size: cover;
    }
}
</style>
