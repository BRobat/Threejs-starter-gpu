import * as THREE from 'three'

import Debug from './Utils/debug.ts'
import Sizes from './Utils/sizes.ts'
import Time from './Utils/time.ts'
import Camera from './camera.ts'
import Renderer from './renderer.ts'
import World from './World/world.ts'
import Resources from './Utils/resources'

import * as src from './sources.ts'

import './index.d.ts'

let instance: Engine;

interface Source {
    type: string;
    path: string;
    name: string;
}

export default class Engine {
    canvas: HTMLCanvasElement;
    scene: THREE.Scene;
    camera: Camera;
    renderer: Renderer;
    world: World;
    debug: Debug;
    sizes: Sizes;
    time: Time;
    resources: Resources;

    sources = src.default as unknown as Source[];
    constructor(_canvas?: HTMLCanvasElement) {
        // Singleton
        if (instance) {
            this.camera = instance.camera;
            this.scene = instance.scene;
            this.resources = instance.resources;
            this.world = instance.world;
            this.debug = instance.debug;
            this.time = instance.time;
            this.debug = instance.debug;
            this.sizes = instance.sizes;
            this.time = instance.time;
            this.renderer = instance.renderer;
            this.canvas = instance.canvas;
            return
        }
        instance = this;

        // Global access
        (window as any).engine = this

        // Options
        this.canvas = _canvas ? _canvas : new HTMLCanvasElement()

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(this.sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })

        // handle keyboard logic
        addEventListener('keydown', (e: any) => {
            this.world.setKeyPressed(e.key)
        })

        addEventListener('keyup', (e: any) => {
            this.world.setKeyReleased(e.key)
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child: any) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui?.destroy()
    }
}