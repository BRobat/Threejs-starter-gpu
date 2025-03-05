import Engine from '../engine.ts'
import * as THREE from 'three'

export default class Ship {
    engine: Engine;
    scene: THREE.Scene;
    constructor() {
        this.engine = new Engine();
        this.scene = this.engine.scene;

        const mesh = new THREE.Mesh();
        const geometry = new THREE.BoxGeometry(0.3, 0.4, 0.6)
        const material = new THREE.MeshBasicMaterial({color: 'blue'})

        mesh.geometry = geometry;
        mesh.material = material;
        this.scene.add(mesh);

    }
}