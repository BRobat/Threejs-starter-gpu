import Engine from '../engine.ts'
import * as THREE from 'three'
import { GPGPUParticleSystem } from '../gpgpu.ts';
import basicVertexShader from '../Shaders/particles/vertex.glsl'
import basicFragmentShader from '../Shaders/particles/fragment.glsl'
import Sizes from '../Utils/sizes.ts';
import Resources from '../Utils/resources';


export default class Particles {
    engine: Engine;
    scene: THREE.Scene;
    gpgpu: GPGPUParticleSystem;
    particlesUvArray: Float32Array;
    points: THREE.Points;
    material: THREE.ShaderMaterial;
    sizes: Sizes;

    resources: Resources
    count: number;
    sCount: number;


    constructor() {
        this.engine = new Engine();
        this.scene = this.engine.scene;
        this.sizes = this.engine.sizes;
        this.resources = this.engine.resources;


        const geometry = new THREE.BufferGeometry();

        this.count = 20000;
        this.sCount = Math.ceil(Math.sqrt(this.count))

        const positions = new Float32Array(this.count * 3);
        const velocities = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
            const x = Math.floor(Math.random() * 2)

            positions[i * 3] = Math.random() * 2 - 1.1;
            positions[i * 3 + 1] = Math.random() * 2 - 1.1;
            positions[i * 3 + 2] = Math.random() * 0;

            velocities[i * 3] = (Math.random() - 0.5) * 200.1;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 200.1;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 50.1;
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

        const particleTexture = new THREE.Texture();
        const velocityTexture = new THREE.Texture();
        
        this.gpgpu = new GPGPUParticleSystem(this.count, geometry);

        this.material = new THREE.ShaderMaterial({
            vertexShader: basicVertexShader, fragmentShader: basicFragmentShader, uniforms:
            {
                uSize: new THREE.Uniform(0.07),
                uResolution: new THREE.Uniform(new THREE.Vector2(this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio)),
                uParticlesTexture: new THREE.Uniform(particleTexture),
                uVelocitiesTexture: new THREE.Uniform(velocityTexture),
                uBaseTexture: {value: (this.resources as any).items['face']},
            }
        });
        this.points = new THREE.Points(geometry, this.material);
        this.scene.add(this.points);

        this.particlesUvArray = new Float32Array(this.count * 2)



        // debbuger plane

        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        planeGeometry.rotateY(Math.PI / 2);
        const planeMaterial = new THREE.MeshStandardMaterial({
            map: (this.resources as any).items['face'],
            alphaMap: (this.resources as any).items['face'],
            transparent: true,
            depthWrite: false
        })


        for (let y = 0; y < this.sCount; y++) {
            for (let x = 0; x < this.sCount; x++) {
                const i = y * this.sCount + x;
                const i2 = i * 2;
                const uvX = (x + 0.5) / this.sCount;
                const uvY = (y + 0.5) / this.sCount;
                this.particlesUvArray[i2 + 0] = uvX;
                this.particlesUvArray[i2 + 1] = uvY;
            }
        }
        this.points.geometry.setAttribute('aParticlesUv', new THREE.Float32BufferAttribute(this.particlesUvArray, 2));
    }

    update() {
        this.gpgpu.update();
        this.material.uniforms.uParticlesTexture.value = this.gpgpu.gpgpu.computation.getCurrentRenderTarget(this.gpgpu.gpgpu.particlesVariable).texture
        this.material.uniforms.uVelocitiesTexture.value = this.gpgpu.gpgpu.computation.getCurrentRenderTarget(this.gpgpu.gpgpu.velocitiesVariable).texture
    }
}