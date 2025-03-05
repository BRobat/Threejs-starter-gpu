import { GPUComputationRenderer, Variable } from "three/examples/jsm/Addons.js";
import Engine from "./engine";
import EngineRenderer from "./renderer";
import * as THREE from 'three'
import gpgpuVelocityShader from './Shaders/compute/velocity.glsl'
import gpgpuPositionShader from './Shaders/compute/position.glsl'

export class GPGPU {
    computation: GPUComputationRenderer
    positionTexture: THREE.DataTexture;
    velocityTexture: THREE.DataTexture;
    particlesVariable: Variable;
    velocitiesVariable: Variable;
    constructor(computation: GPUComputationRenderer) {
        this.computation = computation;
        this.positionTexture = computation.createTexture();
        this.velocityTexture = computation.createTexture();

        this.particlesVariable = computation.addVariable('uParticles', gpgpuPositionShader, this.positionTexture)
        this.velocitiesVariable = computation.addVariable('uVelocities', gpgpuVelocityShader, this.velocityTexture)
    }
}

export class GPGPUParticleSystem {
    engine: Engine
    renderer: EngineRenderer;

    gpgpu: GPGPU;
    geometry: THREE.BufferGeometry

    constructor(size: number, geometry: THREE.BufferGeometry) {
        this.engine = new Engine();
        this.renderer = this.engine.renderer
        this.geometry = geometry;
        const newSize = Math.ceil(Math.sqrt(size))

        const computation = new GPUComputationRenderer(newSize, newSize, this.renderer.instance)

        this.gpgpu = new GPGPU(computation)
        console.log(geometry.attributes.position.array)
        for (let i = 0; i < size; i++) {
            const i3 = i * 3
            const i4 = i * 4
            this.gpgpu.positionTexture.image.data[i4 + 0] = this.geometry.attributes.position.array[i3 + 0]
            this.gpgpu.positionTexture.image.data[i4 + 1] = this.geometry.attributes.position.array[i3 + 1]
            this.gpgpu.positionTexture.image.data[i4 + 2] = this.geometry.attributes.position.array[i3 + 2]
            this.gpgpu.positionTexture.image.data[i4 + 3] = Math.random()

            this.gpgpu.velocityTexture.image.data[i4 + 0] = this.geometry.attributes.velocity.array[i3 + 0]
            this.gpgpu.velocityTexture.image.data[i4 + 1] = this.geometry.attributes.velocity.array[i3 + 1]
            this.gpgpu.velocityTexture.image.data[i4 + 2] = this.geometry.attributes.velocity.array[i3 + 2]
            this.gpgpu.velocityTexture.image.data[i4 + 3] = Math.random()
        }
        
        
        // **we will see if moving the particles variable to the gpgpu class was a good idea**
        // it wasn't 
        
        this.gpgpu.computation.setVariableDependencies(this.gpgpu.particlesVariable, [this.gpgpu.particlesVariable, this.gpgpu.velocitiesVariable])
        this.gpgpu.computation.setVariableDependencies(this.gpgpu.velocitiesVariable, [this.gpgpu.particlesVariable, this.gpgpu.velocitiesVariable])
        
        this.gpgpu.computation.init()
    }

    update() {
        this.gpgpu.computation.compute()
    }
}