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

	const aspect = window.innerWidth / window.innerHeight;
	//camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(10, 10, 500);
	// camera.rotation.set(10,60,0);
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xf0f0f0);

	scene2 = new THREE.Scene();

	const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide });


	const cssobj = document.getElementById("css3d")
	const css3dobj = new CSS3DObject(cssobj)
	css3dobj.position.set(0, 10, -4);
	css3dobj.rotation.set(0, 0, 0);
	css3dobj.scale.set(0.3, 0.3, 0.3);
	scene2.add(css3dobj)

	const cssobj2 = document.getElementById("css3d2")
	const css3dobj2 = new CSS3DObject(cssobj2)
	css3dobj2.position.set(0, 10, -4.01);
	css3dobj2.rotation.set(0, 0, 0);
	css3dobj2.scale.set(0.3, 0.3, 0.3);
	scene2.add(css3dobj2)
	//gltf
	const loader = new GLTFLoader();

	loader.load('/pc_monitor/scene.gltf', (data) => {
		const gltf = data;
		object = gltf.scene;
		object.scale.set(200.0, 200.0, 200.0);
		object.position.set(0, -50, 0);
		object.rotation.set(0, Math.PI / 2, 0);
		// object.rotation.x = Math.PI / -2;
		scene.add(object);
		console.log(object);
	});
	//

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
	controls.minZoom = 0.5;
	controls.maxZoom = 2;
	

	window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

	const aspect = window.innerWidth / window.innerHeight;

	camera.left = - frustumSize * aspect / 2;
	camera.right = frustumSize * aspect / 2;
	camera.top = frustumSize / 2;
	camera.bottom = - frustumSize / 2;

	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	cssrender.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	cssrender.render(scene2, camera);

}

function updateCameraViewOffset({ fullWidth, fullHeight, x, y, width, height }) {

	if (!camera.view) {

		camera.setViewOffset(fullWidth || window.innerWidth, fullHeight || window.innerHeight, x || 0, y || 0, width || window.innerWidth, height || window.innerHeight);

	} else {

		camera.setViewOffset(fullWidth || camera.view.fullWidth, fullHeight || camera.view.fullHeight, x || camera.view.offsetX, y || camera.view.offsetY, width || camera.view.width, height || camera.view.height);

	}

}