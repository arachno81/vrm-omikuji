<template>
	<div class="min-h-screen bg-gray-100 text-center p-4 space-y-6">
		<h1 class="text-3xl font-bold text-indigo-700">VRMおみくじ</h1>
	</div>

	<!-- アップロード -->
	<div
		class="border-2 border-dashed border-indigo-300 rounded-lg p-8 bg-white"
		@dragover.prevent
		@drop.prevent=""
		>

		<p class="text-gray-700 mb-4">ここにVRMファイルをドラッグアンドドロップ！</p>
		<input type="file" accept=".vrm" @change="onFileChange" class="mx-auto" />
	</div>

	<!-- プレビュー -->
	<div class="bg-white p-4 rounded shadow-md">
		<div ref="mountRef" width="512" height="512" class="mx-auto border"></div>
	</div>

	<!-- ボタン -->
	<div class="space-x-4">
		<button
			@click=""
			class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
			>
			おみくじを引く！
		</button>
		<button
			@click=""
			class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
			>
			結果をダウンロード！
		</button>
  <!-- 一旦前後入れ替えボタンをここに -->
  <button
    @click="toggleRotation"
    class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
  >
    前後を入れ替える
  </button>
	</div>

	<!-- SNSシェア -->
	<div class="space-x-4">
		<button class="text-blue-500 underline" @click="">Xでシェア</button>
		<button class="text-blue-700 underline" @click="">Threadsでシェア</button>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useVrmRenderer } from '@/composables/useVrmRenderer.js'

const { mountRef, initRenderer, loadVRM, toggleModelRotation } = useVrmRenderer();

onMounted(()=>{
	initRenderer();
});

function onFileChange(e){
	const file = e.target.files[0];
	if(file) loadVRM(file);
}

function toggleRotation(){
	toggleModelRotation();
}

</script>
