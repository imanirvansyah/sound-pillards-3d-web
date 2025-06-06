<template>
  <div class="loadingScreen" ref="loadingScreen">
    <h1>Now Loading</h1>
  </div>
</template>

<script>
import LoadingController from '@/classes/LoadingController';

export default {
  name: "LoadingScreen",
  data() {
    return {
      progress: 0,
      url: ""
    }
  },
  mounted() {
    LoadingController.onProgress = this.onProgress;
    LoadingController.onLoad = this.onLoad;
  },
  methods: {
   onProgress(url, loaded, total) {

    this.progress = Math.floor((loaded/total)*100);
    this.url = url
   },
   onLoad() {
    setTimeout(() => {
      this.$refs.loadingScreen.classList.add('finished')
    }, 2000)
   }
  }
};
</script>
<style scoped lang="stylus">
  .loadingScreen {
    width : 100vw;
    height: 100vh;
    background-color: #151515;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    transition: all 0.2s;
    display:flex;
    align-items: center;
    justify-content: center;

    &.finished {
      opacity : 0;
      pointer-events: none;
    }
  }
  .loadingScreen p {
     transition: all 0.2s;
  }
</style>
