<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const mcskinEmbed = ref(null)
const embedSize = { width: 240, height: 360 }

let mouseSensitivity = 0.02

function deg_to_rad(degree) {
  return degree * (Math.PI / 180);
}

onMounted(() => {
  /// Initialize new Three.js Scene
  const scene = new THREE.Scene();

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(-5, 2.5, -7.5);
  scene.add(directionalLight);

  /*
    debug: DirectionalLightHelper
  const helper = new THREE.DirectionalLightHelper(directionalLight);
  scene.add(helper);
  */

  // In minecraft, default FOV is 70deg
  const camera = new THREE.PerspectiveCamera( 70, embedSize.width / embedSize.height, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( embedSize.width, embedSize.height );
  mcskinEmbed.value.appendChild( renderer.domElement );


  const gltfLoader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();


  gltfLoader.load('/assets/models/MCPlayerSlim.glb', (gltf) => {
    const model = gltf.scene;
    playerModel = model; // Save reference

    // Compute bounding box center
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());

    // Create a pivot object at origin
    const pivot = new THREE.Object3D();
    scene.add(pivot);

    // Move model so its center is at the origin
    model.position.sub(center);

    // Add model to pivot
    pivot.add(model);

    // Save reference for rotation
    playerModel = pivot;

    // Load the skin texture first
    textureLoader.load('/assets/images/mc/skin/d19w.png', (customSkin) => {
      customSkin.colorSpace = THREE.SRGBColorSpace;
      customSkin.flipY = false;
      customSkin.magFilter = THREE.NearestFilter;

      model.traverse((child) => {
        if (child.isMesh && child.material) {
          // Optionally filter by mesh name
          // if (child.name === 'Body' || child.name === 'Head') { ... }
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if ('map' in mat) {
                mat.map = customSkin;
                mat.needsUpdate = true;
              }
            });
          } else {
            if ('map' in child.material) {
              child.material.map = customSkin;
              child.material.needsUpdate = true;
            }
          }
        }
      });


      // Do NOT add model to scene again!
    });
  }, undefined, function ( error ) {

    console.error( error );

  })
  

  camera.position.set(0, 0, -2.25)
  camera.lookAt(0, 0, 0)

  let yaw = Math.PI + deg_to_rad(27);
  let pitch = deg_to_rad(-27);
  let playerModel = null;

  let isDragging = false;
  let lastX = 0, lastY = 0;

  function updateModelRotation() {
    if (playerModel) {
      // Clamp pitch to avoid flipping
      pitch = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch));
      playerModel.rotation.y = yaw + Math.PI;
      playerModel.rotation.x = pitch;
    }
  }

  function onPointerDown(e) {
    isDragging = true;
    lastX = e.clientX ?? e.touches[0].clientX;
    lastY = e.clientY ?? e.touches[0].clientY;
  }
  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX ?? e.touches[0].clientX;
    const clientY = e.clientY ?? e.touches[0].clientY;
    yaw += (clientX - lastX) * mouseSensitivity;
    pitch -= (clientY - lastY) * mouseSensitivity;
    lastX = clientX;
    lastY = clientY;
    updateModelRotation();
  }
  function onPointerUp() {
    isDragging = false;
  }

  function process() {
    renderer.render(scene, camera)
  }
  renderer.setAnimationLoop(process)


  updateModelRotation();

  mcskinEmbed.value.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  mcskinEmbed.value.addEventListener('touchstart', onPointerDown, { passive: false });
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('touchend', onPointerUp);
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