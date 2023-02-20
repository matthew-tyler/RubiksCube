import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

renderer.setSize(sizes.width, sizes.height);

const cube = new THREE.BoxGeometry(8, 8, 8);


const material = new THREE.MeshPhongMaterial({
  color: 0xFF0000,    // red (can also use a CSS color string here)
  flatShading: true,
});

const mesh = new THREE.Mesh(cube, material);

scene.add(mesh);

const ambientLight = new THREE.AmbientLight(0x404040, 10); // soft white light
const light = new THREE.PointLight(0xff0000, 20, 100);
light.position.set(50, 50, 50);
scene.add(ambientLight)
scene.add(light);


const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 10000);
scene.add(camera);


renderer.render(scene, camera)


const controls = new OrbitControls(camera, canvas);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
});

function animate() {

  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate()