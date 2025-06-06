<template>
  <div class="audioButton">
    <div>
      <h1>Sound Pillards</h1>
      <p>An amazing 3d course from <a href="https://www.awwwards.com/academy/course/the-fun-process-of-creating-lively-interactive-3d-scenes-for-the-web" target="_blank">AWWWARD academy</a></p>
    </div>
    <div>
      <h3  v-if="!playFlag">
        Press button below for start the music
      </h3>
      <h3 v-else>
        Playing: Free bird - Lynyrd Skynyrd (Eurobeat version)
      </h3>
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
      border: solid 3px rgb(0, 189, 126);
      border-radius: 99999px;
      background-color: rgba(255,255,255,0.2);
      font-size: 18px;
      padding: 10px 50px;
      color: rgba(0,0,0,0.9);
      letter-spacing: 3px;
      margin-top: 20px;
    };

    button:hover, .active {
      background-color: rgb(0, 189, 126);
      color: white;
    }
    padding: 100px;
  }
  
</style>
