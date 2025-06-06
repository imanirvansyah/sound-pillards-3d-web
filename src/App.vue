<template>
  <LoadingScreen />
  <ThreeScene />
  <AudioButton />
</template>

<script>
import LoadingScreen from "./components/LoadingScreen.vue";
import ThreeScene from "./components/ThreeScene.vue";
import AudioButton from "./components/AudioButton.vue";

export default {
  name: "App",
  components: {
    LoadingScreen,
    ThreeScene,
    AudioButton
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
   font-family: "Poppins", sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.threeScene {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
}
</style>
