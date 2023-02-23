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
const mesh = await rubik.getBlenderCube();
scene.add(mesh[0])


const Cube = new rubik.RubiksCube(scene, mesh[0], mesh[1])


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


function action() {
  requestAnimationFrame(action);
  TWEEN.update()
  controls.update();
  renderer.render(scene, camera);
}

action()


document.getElementById("controls").addEventListener("click", function (event) {

  if (event.target.id === "controls") {
    return
  }
  Cube.move(event.target.id)

})
