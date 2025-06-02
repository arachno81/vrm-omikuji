import * as THREE from 'three';
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

export async function loadVRMFromFile(file){
	const arrayBuffer = await file.arrayBuffer();

	return await new Promise((resolve, reject)=>{
		loader.parse(arrayBuffer, '',(gltf)=>{
			const vrm = gltf.userData.vrm;
			resolve(vrm);
		}, reject);
	});
}
