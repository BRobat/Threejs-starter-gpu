import * as THREE from 'three'
import Engine from './engine.ts'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sizes from './Utils/sizes.ts'

export default class Camera {
    engine: Engine
    scene: THREE.Scene
    sizes: Sizes;
    canvas: HTMLCanvasElement;
    instance: THREE.PerspectiveCamera;
    controls: OrbitControls

    constructor() {
        this.engine = new Engine();
        this.sizes = this.engine.sizes ? this.engine.sizes : new Sizes()
        this.scene = this.engine.scene;
        this.canvas = this.engine.canvas ? this.engine.canvas : new HTMLCanvasElement();

        this.instance = this.setInstance()
        this.controls = this.setControls()
    }

    setInstance(): THREE.PerspectiveCamera {
        const instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        instance.position.set(6, 4, 8)
        this.scene.add(instance)
        return instance
    }

    setControls(): OrbitControls {
        const controls = new OrbitControls(this.instance, this.canvas)
        controls.enableDamping = true
        return controls;
    }

    setPosition(x: number, y: number, z: number) {
        this.instance.position.set(x,y,z);
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}