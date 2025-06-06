import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from 'three'
import spectrumFrag from '@/shaders/spectrum.frag'
import spectrumVert from '@/shaders/spectrum.vert'
import LoadingController from '@/classes/LoadingController'

import MyGUI from '@/utils/MyGUI'

class SpectrumClass {
  constructor() {
    this.bind()
    this.modelLoader = new GLTFLoader(LoadingController);
    this.texLoader = new THREE.TextureLoader(LoadingController);
  }

  init(scene) {
    this.scene = scene;
    this.uniforms = {
      uMatCap: {
        value: this.texLoader.load('/blender/textures/blackMetal.png')
      },
      uSpecterSize: {
        value: -0.2
      },
      uWaveBorder: {
        value: .4
      },
      uWaveSpeed: {
        value: .03
      },
      uBorderColor: {
        value: new THREE.Color("rgb(0, 189, 126)")
      },
      uTime: {
        value: 0
      }
    }

    const shaderFolder = MyGUI.addFolder('Spectrum');
    shaderFolder.add(this.uniforms.uSpecterSize, "value", 0, 1).name('Specter size')
    shaderFolder.add(this.uniforms.uWaveBorder, "value", 0, 1).name('Wave border')
    shaderFolder.add(this.uniforms.uWaveSpeed, "value", 0, 0.1).name('Wave speed')

    this.shaderMat = new THREE.ShaderMaterial({
      fragmentShader: spectrumFrag,
      vertexShader: spectrumVert,
      uniforms: this.uniforms,
      transparent: true
    })

    this.modelLoader.load('/blender/models/spectrum.glb', (glb) => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = this.shaderMat;
          child.scale.multiplyScalar(2.4)
          child.translateY(-1.5)
        }
      })
      this.scene.add(glb.scene)
    });

  }

  update() {
    this.uniforms.uTime.value += 1
  }

  bind() {

  }
}

const _instance = new SpectrumClass()
export default _instance