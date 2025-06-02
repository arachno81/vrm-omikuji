import * as THREE from 'three';
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm';

const loader = new THREE.GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

export async function loadVRMFromFile(file){
	const arrayBuffer = await file.arrayBuffer();
	return await new Promise((resolve, reject)=>{
		loader.parse(arrayBuffer, '',(gltf)=>{
			const vrm = gltf.userData.vrm;
			VRMUtils.removeUnnecessaryJoints(vrm.scene);
			resolve(vrm);
		}, reject);
	});
}
