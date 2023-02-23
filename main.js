import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as rubik from "./rubik"
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

// Setup scene and renderer
const scene = new THREE.Scene();
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x191919, 1)
scene.add(new THREE.AxesHelper(50))

// define size by the size of the window
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
renderer.setSize(sizes.width, sizes.height);


// Actors at the mark
const rubikCube = await rubik.getBlenderCube(scene);
scene.add(rubikCube[0]);

const cubelets = rubikCube[1]

// const rubikCube = rubik.getCube(1)
// scene.add(rubikCube);


// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 10); // soft white light
const light = new THREE.PointLight(0xff0000, 20, 100);
light.position.set(50, 50, 50);
scene.add(ambientLight)
scene.add(light);

// Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 10000);
camera.position.set(0, 5, 20);
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
});



const pivot = new THREE.Object3D()
pivot.position.set(1, 1, 1)
pivot.updateMatrixWorld();
scene.add(pivot)

for (const cubelet of cubelets) {

  if (cubelet.position.x === 2) {
    pivot.attach(cubelet)
  }

}

const mover = new rubik.RubiksCube()

mover.moveLR(pivot, true)

function action() {
  requestAnimationFrame(action);
  TWEEN.update()
  controls.update();
  renderer.render(scene, camera);
}

action()



