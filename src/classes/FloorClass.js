import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from 'three'
import LoadingController from '@/classes/LoadingController';
class FloorClass {
  constructor() {
    this.bind()
    this.modelLoader = new GLTFLoader(LoadingController);
  }

  init(scene) {
    this.scene = scene
    this.floor
    this.modelLoader.load('/blender/models/floor.glb', (glb) => {
      // console.log(glb)
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          this.floor = child
        }
      })
      this.floor.translateY(-4)
      this.floor.scale.multiplyScalar(2)
      this.scene.add(glb.scene)
    });
  }

  update() {

  }

  bind() {

  }
}

const _instance = new FloorClass()
export default _instance