import { ref } from 'vue';
import * as THREE from 	'three';
import { loadVRMFromFile } from '@/utils/VRMLoader.js';

let scene, camera, renderer;
let currentVRM = null;

export function useVrmRenderer(){
	const mountRef = ref(null);

	function initRenderer(){
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
		camera.position.set(0, 1.4, 1.5);

		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(512, 512);

	const light = new THREE.DirectionalLight(0xffffff, 1);

	light.position.set(1, 1, 1);
	scene.add(light);

		mountRef.value.appendChild(renderer.domElement);

		animate();
	}

	function animate(){
		requestAnimationFrame(animate);
		if(currentVRM) currentVRM.update(0.016);
		renderer.render(scene, camera);
	}

	async function loadVRM(file){
		if(currentVRM){
			scene.remove(currentVRM.scene);
			currentVRM.dispose();
		}

		currentVRM = await loadVRMFromFile(file);
		scene.add(currentVRM.scene);
	}

	return{
		mountRef,
		initRenderer,
		loadVRM,
		getCurrentVRM: ()=> currentVRM,
		getRenderer: ()=> renderer,
		getCanvasElement: ()=> renderer.domElement,
	}
}

