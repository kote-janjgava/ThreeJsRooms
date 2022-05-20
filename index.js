import * as THREE from "./three.js-master/build/three.module.js";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";
import { GUI } from "./dat.gui.module.js";
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// Object
const loader = new GLTFLoader();
loader.load(
  "roomsWithFurniture.glb",
  function (glb) {
    console.log(glb);
    const root = glb.scene;
    root.scale.set(0.1, 0.1, 0.1);

    scene.add(root);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("errooooooooor!");
  }
);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);
/// GUI controls

const gui = new GUI();

var obj = {
  rotate: function () {
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 0;
  },
  rotateBack: function () {
    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = 1;
  },
};
gui.add(obj, "rotate").name("Rotate 90 degrees");
gui.add(obj, "rotateBack").name("Rotate to original possition");

//Load background texture
const bgLoader = new THREE.TextureLoader();
bgLoader.load(
  "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg",
  function (texture) {
    scene.background = texture;
  }
);

///// plate code
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 1;
scene.add(camera);

/// mouseevent
// Controls;
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOuput = true;

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
