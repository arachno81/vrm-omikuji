let scene, camera, renderer;
let currentVRM = null;

function initThree(canvasDom){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
	camera.position.set(0, 1.4, 1.5);

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(512, 512);
	canvasDom.appendChild(renderer.domElement);

	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(1, 1, 1);
	scene.add(light);

	animate();
}

function animate(){
	requestAnimationFrame(animate);
	if(currentVRM){
		currentVRM.update(0.016);
	}
	renderer.render(scene, camera);
}
