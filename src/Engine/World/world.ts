import * as THREE from 'three'
import Engine from '../engine.ts'
import Resources from '../Utils/resources'
import Floor from './floor.ts'
import Ship from './ship.ts'
import Light from './light.ts'
import Particles from './particles.ts'



export default class World {
    engine: Engine
    scene: THREE.Scene
    resources: Resources;

    private keysPressed = new Map<string, boolean>();
    
    floor?: Floor;
    ship?: Ship;
    light?: Light;
    particles?: Particles;

    constructor() {
        this.engine = new Engine()
        this.scene = this.engine.scene
        this.resources = this.engine.resources

        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor()
            // this.ship = new Ship();
            this.light = new Light();
            this.particles = new Particles();



            this.engine.camera.setPosition(10,0,0)

        })
    }


    setKeyPressed(key: string) {
        this.keysPressed.set(key, true)
    }

    setKeyReleased(key: string) {
        this.keysPressed.delete(key);
    }

    update() {
        this.particles?.update()
    }
}