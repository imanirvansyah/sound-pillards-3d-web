import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import SoundReactor from '@/classes/AudioReactorClass';
import MyGUI from '@/utils/MyGUI';
import LoadingController from '@/classes/LoadingController'

class SpherePillardsClass {
  constructor() {
    this.bind()
    this.modelLoader = new GLTFLoader(LoadingController);
    this.texLoader = new THREE.TextureLoader(LoadingController);
    this.params = {
      waveSpeed: 1,
      subDivision: 3,
      pillardSize: .2
    }
  }

  init(scene) {
    this.scene = scene;
    this.pillard;
    this.pillardsGroup = new THREE.Group();
    this.upVec = new THREE.Vector3(0, 1, 0);

    const gTex = this.texLoader.load('/blender/textures/grayMetal.png');
    const bTex = this.texLoader.load('/blender/textures/blackMetal.png');
    this.gMatCap = new THREE.MeshMatcapMaterial({
      matcap: gTex
    });
    this.bMatCap = new THREE.MeshMatcapMaterial({
      matcap: bTex
    });

    this.modelLoader.load('/blender/models/pillard.glb', (glb) => {
      glb.scene.traverse(child => {
        if (child.name === "Base") {
          this.pillard = child
          child.material = this.gMatCap
        }
        if (child.name === "Cylinder")
          child.material = this.bMatCap
      })
      this.computePosition()
    })
    const sphereFolder = MyGUI.addFolder('sphere pillards');
    sphereFolder.add(this.params, 'waveSpeed', 0.001, 3).name('Wave speed')
    sphereFolder.add(this.params, 'subDivision', 1, 5).step(1).name('Division').onChange(this.computePosition)
    sphereFolder.add(this.params, 'pillardSize', 0.1, 0.3).name('Size').onChange(this.computePosition)
  }

  computePosition() {
    let ico;

    this.scene.traverse(child => {
      if (child.name === 'ico') {
        ico = child
      }
    })

    if (!!ico) {
      this.scene.remove('ico')
    }
    const sphereGeom = new THREE.IcosahedronGeometry(2, this.params.subDivision);
    const sphereMat = this.gMatCap
    // const sphereMat = new THREE.MeshNormalMaterial({     //for debugging only
    //   wireframe: true
    // });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.name = 'ico'

    this.scene.add(sphere)
    this.pillardsGroup.clear();

    const verArray = [];
    for (let i = 0; i < sphereGeom.attributes.position.array.length; i += 3) {
      const x = sphereGeom.attributes.position.array[i]
      const y = sphereGeom.attributes.position.array[i + 1]
      const z = sphereGeom.attributes.position.array[i + 2]
      verArray.push({
        x, y, z
      })
    }

    const pilPos = [];
    for (let i = 0; i < verArray.length; i++) {
      let existFlag = false;
      for (let j = 0; j < pilPos.length; j++) {
        if (
          pilPos[j].x === verArray[i].x &&
          pilPos[j].y === verArray[i].y &&
          pilPos[j].z === verArray[i].z
        ) {
          existFlag = true
        }
      }

      if (!existFlag) {
        pilPos.push({
          x: verArray[i].x,
          y: verArray[i].y,
          z: verArray[i].z,
        })

        const c = this.pillard.clone();
        c.scale.multiplyScalar(this.params.pillardSize)
        const posVec = new THREE.Vector3(
          verArray[i].x,
          verArray[i].y,
          verArray[i].z,
        )
        c.position.copy(posVec)
        c.quaternion.setFromUnitVectors(this.upVec, posVec.normalize())
        this.pillardsGroup.add(c)
      }
    }
    this.scene.add(this.pillardsGroup)

  }

  update() {
    const groupBase = this.pillardsGroup.children

    if (SoundReactor.playFlag) {
      let i = 0;
      while (i < groupBase.length) {
        groupBase[i].children[0].position.y = SoundReactor.fdata[i] / 255 * 3
        i++
      }
    } else {
      let i = 0;
      while (i < groupBase.length) {
        groupBase[i].children[0].position.y = (Math.sin(Date.now() * 0.01 * this.params.waveSpeed + groupBase[i].position.x) + 1) * 0.75
        i++
      }
    }
  }

  bind() {
    this.computePosition = this.computePosition.bind(this);

  }
}

const _instance = new SpherePillardsClass()
export default _instance