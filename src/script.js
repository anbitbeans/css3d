

import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

import { CSS3DRenderer, CSS3DObject } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/renderers/CSS3DRenderer';
import GltfLoader from 'https://cdn.skypack.dev/three-gltf-loader';
let camera, scene, renderer;

let scene2, renderer2;

const frustumSize = 500;

init();
animate();

function init() {

	const aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);

	camera.position.set(- 200, 200, 200);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xf0f0f0);

	scene2 = new THREE.Scene();

	const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide });


	const cssobj = document.getElementById("css3d")
	const css3dobj = new CSS3DObject(cssobj)
	css3dobj.position.set(0, 0, 0);
	css3dobj.scale.set(5, 5, 5);
	scene2.add(css3dobj)

	const cssobj2 = document.getElementById("css3d2")
	const css3dobj2 = new CSS3DObject(cssobj2)
	css3dobj2.position.set(500, 200, 100);
	css3dobj2.rotation.set(0, 0, 90);
	css3dobj2.scale.set(6, 6, 6);
	scene2.add(css3dobj2)
	//scene2.add(cssObject);


	//gltf
	const loader = new GltfLoader();

	loader.load('/pc_monitor/scene.gltf', (data) => {
		const gltf = data;
		object = gltf.scene;
		object.scale.set(100.0, 100.0, 100.0);
		object.position.set(0,-400,0);

	   // object.rotation.x = Math.PI / -2;
	scene.add(object);

		

	});

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	renderer2 = new CSS3DRenderer();
	renderer2.setSize(window.innerWidth, window.innerHeight);
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = 0;
	document.body.appendChild(renderer2.domElement);

	const controls = new OrbitControls(camera, renderer2.domElement);
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

	renderer2.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);

	renderer.render(scene, camera);
	renderer2.render(scene2, camera);

}

function updateCameraViewOffset({ fullWidth, fullHeight, x, y, width, height }) {

	if (!camera.view) {

		camera.setViewOffset(fullWidth || window.innerWidth, fullHeight || window.innerHeight, x || 0, y || 0, width || window.innerWidth, height || window.innerHeight);

	} else {

		camera.setViewOffset(fullWidth || camera.view.fullWidth, fullHeight || camera.view.fullHeight, x || camera.view.offsetX, y || camera.view.offsetY, width || camera.view.width, height || camera.view.height);

	}

}