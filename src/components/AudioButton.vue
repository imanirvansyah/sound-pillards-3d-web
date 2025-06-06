<template>
  <div class="audioButton">
    <div>
      <h1>Sound Pillards</h1>
      <p>An amazing simple 3d course from AWWWARD academy</p>
    </div>
    <div>
      <button v-if="!playFlag" @click="onPlay()">Play</button>
      <button v-else @click="onPause()" class="active">Pause</button>
    </div>
  </div>
</template>

<script>

import SoundReactor from "@/classes/AudioReactorClass";

export default {
  name: "AudioButton",
  data() {
    return {
      initFlag: false,
      playFlag: false
    }
  },
  methods: {
    onPlay(){
      if (!this.initFlag) {
        this.initFlag = true;
        SoundReactor.init();
      }
      SoundReactor.play();
      this.playFlag = true;
    },
    onPause() {
     SoundReactor.pause();
     this.playFlag = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .audioButton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align:center;

    h1 {
      font-size:48px;
      color: white;
    }

    button {
      border: solid 3px rgba(0,0,0,0.2);
      border-radius: 99999px;
      background-color: rgba(255,255,255,0.2);
      font-size: 18px;
      padding: 10px 50px;
      color: rgba(0,0,0,0.9);
      letter-spacing: 3px;
    };

    button:hover, .active {
      background-color: hsl(287, 80%, 80%);
      color: white;
    }
    padding: 100px;
  }
  
</style>
