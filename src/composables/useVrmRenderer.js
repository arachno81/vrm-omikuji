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

	function setExpression(name){
		if(!currentVRM) return;

		//VRM1.0~
		const exprManager = currentVRM.expressionManager;
		if(exprManager && exprManager.setValue){
			exprManager.setValue(name, 1.0);
			exprManager.update();
			return;
		}

		const proxy = currentVRM.blendShapeProxy;
		if (proxy && proxy.setValue) {
			proxy.setValue(name, 1.0);
			proxy.update();
			return;
		}
		console.warn('このVRMには表情制御機能がないようです');
	}

	function setPose(name){
		if(!currentVRM) return;

		const armL = currentVRM.humanoid.getBoneNode('leftUpperArm');
		const armR = currentVRM.humanoid.getBoneNode('rightUpperArm');

		if(name === 'arms_up'){
			armL.rotation.x = Math.PI / 4;
			armR.rotation.x = Math.PI / 4;
		}
	}

	return{
		mountRef,
		initRenderer,
		loadVRM,
		getCurrentVRM: ()=> currentVRM,
		setExpression,
		setPose,
		getRenderer: ()=> renderer,
		getCanvasElement: ()=> renderer.domElement,
	}
}

