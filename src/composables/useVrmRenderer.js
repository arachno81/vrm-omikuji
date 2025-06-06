import { ref } from 'vue';
import * as THREE from 'three';
import { loadVRMFromFile } from '@/utils/VRMLoader.js';

let scene, camera, renderer;
let currentVRM = ref(null);

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
		if(currentVRM.value) currentVRM.value.update(0.016);
		renderer.render(scene, camera);
	}

	async function loadVRM(file) {
		const vrm = await loadVRMFromFile(file);

		if (!vrm) {
			console.warn("VRMの読み込みに失敗しました");
			return;
		}

		// VRMを現在のモデルとして保持
		currentVRM.value = vrm;

		// 表示シーンに追加
		scene.add(vrm.scene);

		// 行列の初期更新）
		scene.updateMatrixWorld(true);

		console.log(`VRMが正常に読み込まれました！: ${vrm.meta?.title || 'タイトル未設定'}`);
	}

	function toggleModelRotation(){
		if(!currentVRM.value) return;
		const currentRotation = currentVRM.value.scene.rotation.y;
		currentVRM.value.scene.rotation.y = currentRotation === 0 ? Math.PI : 0;

		//入れ替え中髪がボッサボサになるのを阻止
		if (vrm.springBoneManager?.reset) {
			vrm.springBoneManager.reset(); // 揺れものをゼロにリセット
			console.log("springBoneをリセットしました");
		}
		console.log('アバターの向きの前後を入れ替えました！')
	}


	function setExpression(name = 'happy'){
		if (!currentVRM.value) {
			console.warn(' VRMがまだ読み込まれていません！');
			return;
		}

		const exprManager = currentVRM.value.expressionManager;

		if (!exprManager) {
			console.warn('expressionManager が存在しません');
			return;
		}

		const expressionMap = exprManager._expressionMap;
		const availableExpressions = Object.keys(expressionMap || {});

		console.log('使える表情一覧:', availableExpressions);

		if (expressionMap?.[name]) {
			exprManager.setValue(name, 1.0);
			exprManager.update?.();
			console.log(`表情 '${name}' を適用しました`);
		} else {
			console.warn(`表情 '${name}' は見つかりませんでした`);
		}
	}

	function setPose(name){
		if (!currentVRM.value) return;
		console.log('ポーズ変更実行');

		const armL = currentVRM.value.humanoid.getRawBoneNode('leftUpperArm');
		const armR = currentVRM.value.humanoid.getRawBoneNode('rightUpperArm');

		if(name === 'arms_up'){
			if(armL && armR){
				armL.rotation.x = Math.PI / 4;
				armR.rotation.x = Math.PI / 4;
			} else {
				console.warn('ポーズ用のボーンが取得できませんでした');
			}
		}
	}

	function renderOnce(){
		console.log('renderOnce');
		if(renderer && scene && camera){
			renderer.render(scene, camera);
		}
	}

	return {
		mountRef,
		initRenderer,
		loadVRM,
		currentVRM,
		getCurrentVRM: () => currentVRM,
		setExpression,
		setPose,
		renderOnce,
		getRenderer: () => renderer,
		getCanvasElement: () => renderer.domElement,
		toggleModelRotation,
	};
}
