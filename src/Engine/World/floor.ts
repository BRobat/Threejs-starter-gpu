import * as THREE from 'three'
import Engine from '../engine.ts'
import basicVertexShader from '../Shaders/basic/vertex.glsl'
import basicFragmentShader from '../Shaders/basic/fragment.glsl'


export default class Floor {
    engine: Engine;
    scene: THREE.Scene;
    geometry: THREE.PlaneGeometry;
    material: THREE.ShaderMaterial;
    mesh: THREE.Mesh;

    constructor() {
        this.engine = new Engine();
        this.scene = this.engine.scene;

        this.geometry = this.setGeometry();
        this.material = this.setMaterial();
        this.mesh = this.setMesh();
    }

    setGeometry(): THREE.PlaneGeometry {
        return new THREE.PlaneGeometry(12, 12);
    }

    setMaterial(): THREE.ShaderMaterial {
        const material = new THREE.ShaderMaterial({
            vertexShader: basicVertexShader,
            fragmentShader: basicFragmentShader
        })
        return material;
    }

    setMesh(): THREE.Mesh {
        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.rotation.x = - Math.PI * 0.5;
        mesh.rotation.y =  Math.PI * 0.5;
        mesh.position.y = -0.001;
        mesh.receiveShadow = true;
        // this.scene.add(mesh);
        return mesh;
    }
}