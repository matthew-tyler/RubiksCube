import * as THREE from 'three';

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