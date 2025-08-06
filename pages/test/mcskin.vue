<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const mcskinEmbed = ref(null)
const embedSize = { width: 240, height: 360 }

onMounted(() => {
  /// Initialize new Three.js Scene
  const scene = new THREE.Scene();
  // In minecraft, default FOV is 70deg
  const camera = new THREE.PerspectiveCamera( 70, embedSize.width / embedSize.height, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( embedSize.width, embedSize.height );
  mcskinEmbed.value.appendChild( renderer.domElement );


  const gltfLoader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();


  gltfLoader.load('/assets/models/MCPlayerWide.glb', (gltf) => {
    const model = gltf.scene;

    textureLoader.load('/assets/images/mc/skin/d19w.png', (customSkin) => {
      customSkin.colorSpace = THREE.SRGBColorSpace;
      customSkin.flipY = false; 
      
      model.traverse((child) => {
        if (child.isMesh && child.material && 'map' in child.material) {
          child.material.map = customSkin;
          child.material.needsUpdate = true;
        }
      });
    });

    
    scene.add(model);
  }, undefined, function ( error ) {

    console.error( error );

  })
  

  camera.position.z = 5;

  function process() {
    renderer.render(scene, camera)
  }
  renderer.setAnimationLoop(process)
})
</script>
<template>
  <NuxtLayout
    name="default" 
    title="Embedding Minecraft Skin with Three.js"
    align="center"
  >
    <div class="mcskin-embed" ref="mcskinEmbed"></div>
  </NuxtLayout>
</template>