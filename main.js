import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import imgUrl from './earth.jpg'

// import { lights } from 'three/examples/jsm/nodes/Nodes.js';
// import { update } from 'three/examples/jsm/libs/tween.module.js';

//scene
const scene = new THREE.Scene();









//Create pur Sphere
const geometry = new THREE.SphereGeometry( 3 , 64 , 64 );  // 15 = radius 64 an 64 = witdth and height
const texture = new THREE.TextureLoader().load(imgUrl); 
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
texture.colorSpace = THREE.SRGBColorSpace;
const loader = new THREE.TextureLoader();


const material = new THREE.MeshStandardMaterial( {
  map: loader.load(imgUrl)
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);



//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight, 
}



//Light
const light = new THREE.PointLight(0xffffff, 10, 60, 1.7);
light.position.set(-95, -10, 10)
scene.add(light)




//camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height ,0.1, 100); //45 = FOV aspect ratio= 800x600
camera.position.z = 20;
scene.add(camera);



//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


//resize
window.addEventListener("resize", () => {
  //update size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
});


const loop = () => {
  light.position.x += 0.15
  if (light.position.x > 95){
    light.position.x = -95
    
    
  }
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()