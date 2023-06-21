import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, scene, renderer;

let scene2, cssrender;
let object;

const frustumSize = 400;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
	camera.position.set(30, 28, 30);
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x333333);
	const light = new THREE.SpotLight(0xFFFFFF, 4, 50, Math.PI / 4, 10, 0.5);
	light.position.set(0, 45, 0);
	scene.add(light);
	scene2 = new THREE.Scene();

	const loader = new GLTFLoader();
	loader.load('/isometric_room/scene.gltf', (data) => {
		const gltf = data;
		object = gltf.scene;
		object.scale.set(10.0, 10.0, 10.0);
		object.position.set(0, 0, 0);
		object.rotation.y = THREE.MathUtils.degToRad(80); 
		scene.add(object);
		console.log(object);
	});

	const cssobj = document.getElementById("css3d")
	const css3dobj = new CSS3DObject(cssobj)
	css3dobj.position.set(-7.2, 9.38, -2.8);
	css3dobj.rotation.set(0, THREE.MathUtils.degToRad(80), 0);
	css3dobj.scale.set(0.015, 0.015, 0.015);
	scene2.add(css3dobj);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	cssrender = new CSS3DRenderer();
	cssrender.setSize(window.innerWidth, window.innerHeight);
	cssrender.domElement.style.position = 'absolute';
	cssrender.domElement.style.top = 0;
	document.body.appendChild(cssrender.domElement);

	const controls = new OrbitControls( camera, cssrender.domElement );
	controls.enablezoom = false;

	let wsw = window.screen.width;
	if (wsw < 564) {
		controls.minDistance = 80;
		controls.maxDistance = 80;
	}
	else{
		controls.minDistance = 40;
		controls.maxDistance = 40;
	}

	controls.minPolarAngle = -Math.PI / 4;
	controls.maxPolarAngle = Math.PI / 4;
	controls.minAzimuthAngle = -Math.PI / 8;
	controls.maxAzimuthAngle = Math.PI / 2;
	
	window.addEventListener("DOMContentLoaded", onWindowResize);
	window.addEventListener("resize", onWindowResize);
	window.addEventListener("orientationchange", onWindowResize);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    cssrender.setSize(window.innerWidth, window.innerHeight);
	this.wsw = window.screen.width;
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	cssrender.render(scene2, camera);
}