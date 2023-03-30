import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'



// Cube definitions from https://www.speedsolving.com/wiki/index.php/File:Western_colors.png
const COLOURS = {
    red: 0xf71414,
    orange: 0xff8400,
    white: 0xffffff,
    yellow: 0xffef0a,
    green: 0x26ff12,
    blue: 0x0046ad
}

const COLOUR_VALUES = Object.values(COLOURS);

const FACES = {
    F: "green",
    U: "white",
    L: "orange",
    D: "yellow",
    R: "red",
    B: "blue"
}

const SIZE = 8
const SPACING = 0.3

export function getCube(n) {

    // Create basic cube
    const geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE).toNonIndexed();

    // Create a mesh 
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    const positionAttribute = geometry.getAttribute('position');

    // Create a
    const colors = [];
    const color = new THREE.Color();
    const ALPHA = 1;

    let count = 0;
    for (let i = 0; i < positionAttribute.count; i += 6) {
        color.set(COLOUR_VALUES[count++]);
        // 6 Verticies per side
        // Define the same colour for each 
        colors.push(color.r, color.g, color.b, ALPHA);
        colors.push(color.r, color.g, color.b, ALPHA);
        colors.push(color.r, color.g, color.b, ALPHA);
        colors.push(color.r, color.g, color.b, ALPHA);
        colors.push(color.r, color.g, color.b, ALPHA);
        colors.push(color.r, color.g, color.b, ALPHA);
    }

    // define the new attribute
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4, false));

    // Create a mini cube used to make the whole
    const protocube = new THREE.Mesh(geometry, material)
    // Define the group used to form the whole
    const group = new THREE.Group();

    // Starting X,Y,Z
    var x = -SIZE;
    var y = -SIZE;
    var z = -SIZE;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                const cube = protocube.clone()
                cube.position.set(x, y, z);
                x += (SIZE + SPACING)
                group.add(cube)
            }
            x = -SIZE
            y += (SIZE + SPACING)
        }
        y = -SIZE
        z += (SIZE + SPACING)
    }

    return group;
}


const loader = new GLTFLoader();

export async function getBlenderCube() {

    var protocube = await loader.loadAsync('flipped.glb');

    protocube = protocube.scene.children[0]

    var cubelets = []

    protocube.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        } else {
            node.layers.disableAll();
        }
    });

    const group = new THREE.Group()

    var size = 2
    var x = -size;
    var y = -size;
    var z = -size;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                const cube = protocube.clone()
                cube.position.set(x, y, z);
                cube.name = "cubelet"
                cubelets.push(cube)
                x += size
                group.add(cube)
            }
            x = -size
            y += size
        }
        y = -size
        z += size
    }

    group.name = "Cube"


    return [group, cubelets]
}



export class RubiksCube {

    constructor(Scene, Mesh, Cubelets) {
        this.Scene = Scene;
        this.Mesh = Mesh;
        this.Cubelets = Cubelets;
        return this
    }

    moves = {
        L: [-2, "x"],
        R: [2, "x"],
        U: [2, "y"],
        D: [-2, "y"],
        F: [2, "z"],
        B: [-2, "z"]
    }

    moving = false


    // "L R U D F B"
    // "L' R' U' D' F' B'"
    move(code) {
        var m = this.moves[code.charAt(0)]
        var counterclockwise = (code.length > 1)

        const pivot = new THREE.Object3D()
        pivot.position.set(1, 1, 1)
        pivot.updateMatrixWorld();
        this.Scene.add(pivot)

        const reattach = []

        for (const cubelet of this.Cubelets) {

            console.log(cubelet.position);
            // this.Scene.attach(cubelet)
        }


        for (const cubelet of this.Cubelets) {
            if (cubelet.position[m[1]] === m[0]) {
                pivot.attach(cubelet)
                // reattach.push(cubelet)
            }
        }


        this.moving = true;

        switch (code.charAt(0)) {
            case "L":
            case "R":
                this.moveLR(pivot, counterclockwise)
                break;
            case "U":
            case "D":
                this.moveUD(pivot, counterclockwise)
                break;
            case "F":
            case "B":
                this.moveFB(pivot, counterclockwise)
        }





        pivot.remove()
    }

    setMoving = () => { this.moving = false }

    moveLR(pivotGroup, counterclockwise) {
        var direction = "+"

        if (counterclockwise) {
            direction = "-"
        }
        const tween = new TWEEN.Tween(pivotGroup.rotation).to({ x: direction + Math.PI / 2 }, 1000)
        this.animate(tween)
    }

    moveUD(pivotGroup, counterclockwise) {
        var direction = "+"

        if (counterclockwise) {
            direction = "-"
        }
        const tween = new TWEEN.Tween(pivotGroup.rotation).to({ y: direction + Math.PI / 2 }, 1000)
        this.animate(tween)
    }

    moveFB(pivotGroup, counterclockwise) {
        var direction = "+"

        if (counterclockwise) {
            direction = "-"
        }
        const tween = new TWEEN.Tween(pivotGroup.rotation).to({ z: direction + Math.PI / 2 }, 1000)
        this.animate(tween)
    }


    animate(tween) {

        var tweens = TWEEN.getAll()

        if (tweens.length === 0) {
            tween.start()
        } else {
            tweens[tweens.length - 1].chain(tween)
        }


    }

}