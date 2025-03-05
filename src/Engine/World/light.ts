import Engine from '../engine.ts'
import * as THREE from 'three'

export default class Light {
    engine: Engine;
    scene: THREE.Scene;
    constructor() {
        this.engine = new Engine();
        this.scene = this.engine.scene;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight)
        

    }
}