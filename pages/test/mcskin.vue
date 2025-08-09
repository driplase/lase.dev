<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import ToggleSwitch from '~/components/toggleSwitch.vue';

const isSlim = ref(true)
const skinURL = ref(null)

const mcskinEmbed = ref(null)
const embedSize = { width: 240, height: 360 }

let mouseSensitivity = 0.02

function deg_to_rad(degree) {
  return degree * (Math.PI / 180);
}

let yaw = Math.PI + deg_to_rad(27);
let pitch = deg_to_rad(-27);
let playerModel = null;
let pivot = null;
let scene, camera, renderer, gltfLoader, textureLoader;

function loadPlayerModel() {
  // Remove previous model if exists
  if (pivot && scene) {
    scene.remove(pivot);
    pivot = null;
    playerModel = null;
  }

  const modelPath = isSlim.value
    ? '/assets/models/MCPlayerSlim.glb'
    : '/assets/models/MCPlayerWide.glb';

  gltfLoader.load(modelPath, (gltf) => {
    const model = gltf.scene;

    // Compute bounding box center
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());

    // Create a pivot object at origin
    pivot = new THREE.Object3D();
    scene.add(pivot);

    // Move model so its center is at the origin
    model.position.sub(center);

    // Add model to pivot
    pivot.add(model);

    // Save reference for rotation
    playerModel = pivot;

    function applySkinTexture(url, fallbackUrl) {
      textureLoader.load(
        url,
        (customSkin) => {
          customSkin.colorSpace = THREE.SRGBColorSpace;
          customSkin.flipY = false;
          customSkin.magFilter = THREE.NearestFilter;

          model.traverse((child) => {
            if (child.isMesh && child.material) {
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
          updateModelRotation();
        },
        undefined,
        // onError: try fallback
        () => {
          if (url !== fallbackUrl) {
            applySkinTexture(fallbackUrl, fallbackUrl);
          }
        }
      );
    }

    let isUrlValid;
    try {
      new URL(skinURL.value);
      isUrlValid = true
    } catch (err) {
      console.error(err)
      isUrlValid = false
    }

    const fallbackSkinURL = '/assets/images/mc/skin/d22.png'

    // Use skinURL if set, otherwise fallback to d22.png
    const mainSkin = isUrlValid ? skinURL.value?.trim()
      : fallbackSkinURL;
    applySkinTexture(mainSkin, fallbackSkinURL);
  }, undefined, function (error) {
    console.error(error);
  });
}

function updateModelRotation() {
  if (playerModel) {
    // Clamp pitch to avoid flipping
    pitch = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch));
    playerModel.rotation.y = yaw + Math.PI;
    playerModel.rotation.x = pitch;
  }
}

onMounted(() => {
  scene = new THREE.Scene();

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(-5, 2.5, -7.5);
  scene.add(directionalLight);

  camera = new THREE.PerspectiveCamera(70, embedSize.width / embedSize.height, 0.1, 1000);
  camera.position.set(0, 0, -2.25);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(embedSize.width, embedSize.height);
  mcskinEmbed.value.appendChild(renderer.domElement);

  gltfLoader = new GLTFLoader();
  textureLoader = new THREE.TextureLoader();

  loadPlayerModel();

  let isDragging = false;
  let lastX = 0, lastY = 0;

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

  // Watch for isSlim changes and reload model
  watch(isSlim, () => {
    loadPlayerModel();
  });

  // Watch for skinURL
  watch(skinURL, (currentValue) => {
    const beforeSkinURL = currentValue;
    
    // wait for 0.5s to prevent request spam
    setTimeout(() => {
      // Discard if user is still typing skinURL
      if (beforeSkinURL !== skinURL.value) return;

      loadPlayerModel();
    }, 500)
  });
});
</script>
<template>
  <NuxtLayout
    name="default" 
    title="Embedding Minecraft Skin with Three.js"
    align="center"
  >

    <div class="mcskin-embed cursor-move" ref="mcskinEmbed"></div>

    <div class="mt-2">
      <div class="my-2">
        <label>
          <ToggleSwitch v-model="isSlim" />
          Slim
        </label>
      </div>
      
      <div class="my-2">
        <label>
          Skin URL:
          <input type="url" v-model="skinURL" />
        </label>
      </div>
    </div>

  </NuxtLayout>
</template>
<style scoped>
.mcskin-embed > canvas {
  border-radius: 12rem;
}
</style>