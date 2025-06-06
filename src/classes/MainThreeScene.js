import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/RAF'
import config from '../utils/config'
import MyGUI from '../utils/MyGUI'

import SpherePillards from '@/classes/SpherePillardClass'
import Floor from '@/classes/FloorClass'
import Spectrum from '@/classes/SpectrumClass'
import ParticleSystem from '@/classes/ParticleSystemClass';
import CamParallax from '@/classes/CamParallaxClass';

class MainThreeScene {
  constructor() {
    this.bind()
    this.camera
    this.scene
    this.renderer
    this.controls
  }

  init(container) {
    //RENDERER SETUP
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.debug.checkShaderErrors = true;
    container.appendChild(this.renderer.domElement)

    //MAIN SCENE INSTANCE
    const color = new THREE.Color(0x151515);
    const fog = new THREE.Fog(color, 15, 20);
    this.scene = new THREE.Scene()
    this.scene.background = color;
    this.scene.fog = fog;

    //CAMERA AND ORBIT CONTROLLER
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 12)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = false
    this.controls.maxDistance = 20
    this.controls.minDistance = 5
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2;
    CamParallax.init(this.camera)

    SpherePillards.init(this.scene)
    Floor.init(this.scene)
    Spectrum.init(this.scene)
    ParticleSystem.init(this.scene)

    MyGUI.hide()
    if (config.myGui) {
      MyGUI.show()
      MyGUI.close()
    }


    const camFolder = MyGUI.addFolder('Camera');

    camFolder.add(this.controls, "enabled").onChange(() => {
      if (this.controls.enabled) {
        CamParallax.active = false;
      }
    }).name("Orbit Cam").listen()
    camFolder.add(CamParallax, "active").onChange(() => {
      if (CamParallax.active) {
        this.controls.enabled = false;
      }
    }).name("Parallax Cam").listen()

    camFolder.add(CamParallax.params, "intensity", 0.001, 0.01)
    camFolder.add(CamParallax.params, "ease", 0.01, 0.1)

    //RENDER LOOP AND WINDOW SIZE UPDATER SETUP
    window.addEventListener("resize", this.resizeCanvas)
    RAF.subscribe('threeSceneUpdate', this.update)
  }

  update() {
    this.scene.rotateY(0.002)
    this.renderer.render(this.scene, this.camera);
    SpherePillards.update()
    Spectrum.update()
    ParticleSystem.update()
    CamParallax.update()
  }

  resizeCanvas() {
    const width = window.innerWidth;
    const height = window.visualViewport?.height || window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.update = this.update.bind(this)
    this.init = this.init.bind(this)
  }
}

const _instance = new MainThreeScene()
export default _instance