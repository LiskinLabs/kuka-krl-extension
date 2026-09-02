<template>
  <div class="relative w-full h-full min-h-[500px] sm:min-h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0d121c] via-[#080c13] to-[#05070a] border border-white/15 shadow-[0_0_60px_rgba(255,102,0,0.2)] flex flex-col">
    
    <!-- Top HUD Toolbar -->
    <div class="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
      <!-- Status Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-orange-500/30 text-xs font-mono text-gray-200 pointer-events-auto shadow-xl">
        <span class="flex h-2 w-2 rounded-full bg-kuka-orange animate-ping"></span>
        <span class="text-kuka-orange font-bold uppercase tracking-wider">KUKA KR300 Articulated CAD</span>
        <span class="text-gray-500">|</span>
        <span class="text-emerald-400 font-semibold">6-Axis Real FK</span>
      </div>

      <!-- Mode Selector Buttons -->
      <div class="inline-flex items-center p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 pointer-events-auto gap-1 shadow-xl">
        <button
          @click="setMode('interactive')"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-mono transition-all',
            mode === 'interactive' ? 'bg-kuka-orange text-white shadow-md font-bold' : 'text-gray-400 hover:text-white'
          ]"
          title="Track mouse motion via kinematics"
        >
          🎮 Mouse Track
        </button>
        <button
          @click="setMode('auto')"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-mono transition-all',
            mode === 'auto' ? 'bg-kuka-orange text-white shadow-md font-bold' : 'text-gray-400 hover:text-white'
          ]"
          title="Simulate KRL motion cycle"
        >
          ⚡ KRL Cycle
        </button>
        <button
          @click="toggleWireframe"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-mono transition-all',
            isWireframe ? 'bg-cyan-500 text-black font-bold shadow-md' : 'text-gray-400 hover:text-white'
          ]"
          title="Toggle Cyber Hologram wireframe"
        >
          🌐 Cyber Wire
        </button>
      </div>
    </div>

    <!-- 3D Canvas Container -->
    <div 
      ref="canvasContainer" 
      class="w-full flex-1 relative cursor-grab active:cursor-grabbing"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <!-- Loading Overlay -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/85 z-30 backdrop-blur-sm">
        <div class="flex flex-col items-center gap-3">
          <div class="w-10 h-10 border-2 border-kuka-orange border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs font-mono text-orange-400 tracking-wider">ASSEMBLING KUKA KR300 6-AXIS CAD RIG...</span>
        </div>
      </div>
    </div>

    <!-- Bottom Telemetry HUD Bar (Live Axis Angles) -->
    <div class="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-2 sm:grid-cols-4 gap-2 pointer-events-none">
      <div class="p-2 sm:p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-gray-300 shadow-lg">
        <div class="text-gray-500 text-[10px] uppercase">A1 / A2 (Base / Rocker)</div>
        <div class="text-kuka-orange font-bold truncate">
          {{ jointAngles.a1.toFixed(1) }}° / {{ jointAngles.a2.toFixed(1) }}°
        </div>
      </div>
      <div class="p-2 sm:p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-gray-300 shadow-lg">
        <div class="text-gray-500 text-[10px] uppercase">A3 / A4 / A5 (Arm / Wrist)</div>
        <div class="text-cyan-400 font-bold truncate">
          {{ jointAngles.a3.toFixed(1) }}° / {{ jointAngles.a4.toFixed(1) }}° / {{ jointAngles.a5.toFixed(1) }}°
        </div>
      </div>
      <div class="p-2 sm:p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-gray-300 shadow-lg">
        <div class="text-gray-500 text-[10px] uppercase">KRL Trajectory Command</div>
        <div class="text-emerald-400 font-bold truncate">
          {{ currentKrlCommand }}
        </div>
      </div>
      <div class="p-2 sm:p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-gray-300 flex items-center justify-between pointer-events-auto shadow-lg">
        <div>
          <div class="text-gray-500 text-[10px] uppercase">Laser Optics</div>
          <div :class="laserActive ? 'text-red-400 font-bold' : 'text-gray-400'">
            {{ laserActive ? '1.2kW ACTIVE' : 'STANDBY' }}
          </div>
        </div>
        <button 
          @click="laserActive = !laserActive" 
          class="px-2 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 rounded text-[10px] font-bold uppercase transition-all"
        >
          {{ laserActive ? 'OFF' : 'ON' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { withBase } from 'vitepress'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const canvasContainer = ref<HTMLDivElement | null>(null)
const loading = ref(true)
const mode = ref<'interactive' | 'auto'>('interactive')
const isWireframe = ref(false)
const laserActive = ref(true)

const jointAngles = reactive({
  a1: 0,
  a2: 0,
  a3: 0,
  a4: 0,
  a5: 0,
  a6: 0
})

const currentKrlCommand = ref('PTP HOME Vel=100% DEFAULT')

// Three.js variables
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number
let clock: THREE.Clock

// Robot Node Hierarchy
let robotRoot: THREE.Group
let joint1Group: THREE.Group // A1 RotatingColumn
let joint2Group: THREE.Group // A2 LinkArm
let joint3Group: THREE.Group // A3 Arm
let joint4Group: THREE.Group // A4 Wrist
let joint5Group: THREE.Group // A5 EndEffector

let allRobotMeshes: THREE.Mesh[] = []
let laserBeam: THREE.Mesh | null = null
let laserPointLight: THREE.PointLight | null = null
let particles: THREE.Points | null = null

// Materials
let orangeMat: THREE.MeshStandardMaterial
let darkMetalMat: THREE.MeshStandardMaterial

// Mouse tracking & Orbit interaction
let isDragging = false
let previousMousePosition = { x: 0, y: 0 }
let targetCameraRotY = 0.5
let currentCameraRotY = 0.5
let mouseTarget = { x: 0, y: 0 }

function setMode(newMode: 'interactive' | 'auto') {
  mode.value = newMode
}

function toggleWireframe() {
  isWireframe.value = !isWireframe.value
  orangeMat.wireframe = isWireframe.value
  darkMetalMat.wireframe = isWireframe.value
}

function initThree() {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth || 600
  const height = canvasContainer.value.clientHeight || 540

  // 1. Scene & Fog
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x070a10, 0.035)

  // 2. Camera (Looking at robot center)
  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
  camera.position.set(4.5, 3.2, 5.2)
  camera.lookAt(0, 1.3, 0)

  // 3. Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25
  canvasContainer.value.appendChild(renderer.domElement)

  clock = new THREE.Clock()

  // 4. Materials (High-end KUKA PBR gloss)
  orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff5500,
    roughness: 0.25,
    metalness: 0.2,
    envMapIntensity: 1.2
  })

  darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x181c24,
    roughness: 0.45,
    metalness: 0.85
  })

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffeedd, 3.0)
  dirLight.position.set(6, 12, 6)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048
  dirLight.shadow.bias = -0.0001
  scene.add(dirLight)

  // KUKA Orange Rim Spotlight
  const orangeSpot = new THREE.SpotLight(0xff6600, 14, 20, Math.PI / 4, 0.4)
  orangeSpot.position.set(-6, 7, -3)
  scene.add(orangeSpot)

  // Cyber Cyan Backlight
  const cyanLight = new THREE.PointLight(0x00e5ff, 4.0, 15)
  cyanLight.position.set(4, 2, -4)
  scene.add(cyanLight)

  // 6. Floor Environment
  createEnvironment()

  // 7. Load & Assemble KUKA KR300 Kinematic Hierarchy
  loadKukaKr300CAD()

  animate()
}

function createEnvironment() {
  // Industrial Round Pedestal
  const pedestalGeo = new THREE.CylinderGeometry(1.8, 2.0, 0.25, 64)
  const pedestal = new THREE.Mesh(pedestalGeo, darkMetalMat)
  pedestal.position.y = -0.125
  pedestal.receiveShadow = true
  scene.add(pedestal)

  // Glowing Outer Accent Ring
  const ringGeo = new THREE.RingGeometry(1.95, 2.02, 64)
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff6600, side: THREE.DoubleSide })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.01
  scene.add(ring)

  // Floor Grid
  const gridHelper = new THREE.GridHelper(18, 24, 0xff6600, 0x1b2333)
  gridHelper.position.y = -0.25
  scene.add(gridHelper)

  // Laser Sparks
  const particleCount = 70
  const particleGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 0.4 + 1.2
    positions[i + 1] = Math.random() * 0.4 + 0.1
    positions[i + 2] = (Math.random() - 0.5) * 0.4
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleMat = new THREE.PointsMaterial({
    color: 0xffaa00,
    size: 0.045,
    transparent: true,
    opacity: 0.85
  })
  particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)

  // Laser Light
  laserPointLight = new THREE.PointLight(0xff2200, 3.5, 3)
  laserPointLight.position.set(1.4, 0.2, 0)
  scene.add(laserPointLight)
}

function loadKukaKr300CAD() {
  const loader = new OBJLoader()
  const modelBase = withBase('/models/kuka_kr300/')

  const scale = 0.001 // Convert CAD mm to Three.js meters

  robotRoot = new THREE.Group()
  robotRoot.scale.set(scale, scale, scale)
  robotRoot.position.set(0, 0, 0)
  scene.add(robotRoot)

  // Helper function to load mesh and set material
  const loadPart = (filename: string, material: THREE.Material): Promise<THREE.Group> => {
    return new Promise((resolve, reject) => {
      loader.load(
        modelBase + filename,
        (obj) => {
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh
              mesh.material = material
              mesh.castShadow = true
              mesh.receiveShadow = true
              allRobotMeshes.push(mesh)
            }
          })
          resolve(obj)
        },
        undefined,
        reject
      )
    })
  }

  // Load all 11 parts and assemble kinematic tree
  Promise.all([
    loadPart('BaseFrame.obj', darkMetalMat),
    loadPart('RotatingColumn.obj', orangeMat),
    loadPart('Motor_RotatingColumn.obj', darkMetalMat),
    loadPart('LinkArm.obj', orangeMat),
    loadPart('Motor_LinkArm.obj', darkMetalMat),
    loadPart('Arm.obj', orangeMat),
    loadPart('Motor_Arm.obj', darkMetalMat),
    loadPart('Wrist.obj', orangeMat),
    loadPart('Motor_Wrist.obj', darkMetalMat),
    loadPart('EndEffector.obj', orangeMat),
    loadPart('Motor_EndEffector.obj', darkMetalMat)
  ]).then(([
    baseFrame,
    rotColumn,
    motorRotColumn,
    linkArm,
    motorLinkArm,
    arm,
    motorArm,
    wrist,
    motorWrist,
    endEffector,
    motorEndEffector
  ]) => {
    // 1. BaseFrame (A0) - Fixed to ground
    robotRoot.add(baseFrame)

    // 2. Joint 1 (A1 - Rotating Column) -> rotates around vertical Z axis (CAD Z-axis)
    joint1Group = new THREE.Group()
    joint1Group.position.set(0, 0, 555) // Axis 1 pivot point
    robotRoot.add(joint1Group)

    rotColumn.position.set(0, 0, -555)
    motorRotColumn.position.set(0, 0, -555)
    motorLinkArm.position.set(0, 0, -555)
    joint1Group.add(rotColumn)
    joint1Group.add(motorRotColumn)
    joint1Group.add(motorLinkArm)

    // 3. Joint 2 (A2 - LinkArm / Rocker) -> rotates around Y axis
    joint2Group = new THREE.Group()
    joint2Group.position.set(500, 0, 490) // Pivot relative to Joint 1
    joint1Group.add(joint2Group)

    linkArm.position.set(-500, 0, -1045)
    joint2Group.add(linkArm)

    // 4. Joint 3 (A3 - Arm / Elbow) -> rotates around Y axis
    joint3Group = new THREE.Group()
    joint3Group.position.set(0, 0, 1300) // Pivot relative to Joint 2
    joint2Group.add(joint3Group)

    arm.position.set(-500, 0, -2345)
    motorArm.position.set(-500, 0, -2345)
    joint3Group.add(arm)
    joint3Group.add(motorArm)

    // 5. Joint 4 (A4 - Wrist) -> rotates around X axis
    joint4Group = new THREE.Group()
    joint4Group.position.set(0, 0, 0)
    joint3Group.add(joint4Group)

    wrist.position.set(-500, 0, -2345)
    motorWrist.position.set(-500, 0, -2345)
    joint4Group.add(wrist)
    joint4Group.add(motorWrist)

    // 6. Joint 5 (A5 - EndEffector / Flange) -> rotates around Y axis
    joint5Group = new THREE.Group()
    joint5Group.position.set(2200, 0, 0)
    joint4Group.add(joint5Group)

    endEffector.position.set(-2700, 0, -2345)
    motorEndEffector.position.set(-2700, 0, -2345)
    joint5Group.add(endEffector)
    joint5Group.add(motorEndEffector)

    // Laser Beam attached to EndEffector Tool Tip
    const beamGeo = new THREE.CylinderGeometry(15, 20, 1800, 12)
    beamGeo.translate(0, 900, 0)
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.85 })
    laserBeam = new THREE.Mesh(beamGeo, glowMat)
    laserBeam.rotation.z = Math.PI / 2
    laserBeam.position.set(-2700 + 400, 0, -2345)
    joint5Group.add(laserBeam)

    // Rotate CAD coordinate system so CAD Z-Up matches Three.js Y-Up
    robotRoot.rotation.x = -Math.PI / 2

    loading.value = false
  }).catch((err) => {
    console.error('Error assembling KUKA KR300 CAD:', err)
    loading.value = false
  })
}

function animate() {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  // Smooth Orbit / Camera Parallax
  currentCameraRotY += (targetCameraRotY - currentCameraRotY) * 0.08
  if (robotRoot) {
    robotRoot.rotation.z = currentCameraRotY
  }

  // Kinematics Articulation
  if (mode.value === 'auto') {
    // Automated KRL Program Kinematics Sequence
    const t = time * 0.7
    jointAngles.a1 = Math.sin(t) * 35
    jointAngles.a2 = Math.sin(t * 1.3) * 20
    jointAngles.a3 = Math.cos(t * 1.3) * 25
    jointAngles.a4 = Math.sin(t * 2) * 30
    jointAngles.a5 = Math.cos(t * 1.5) * 35

    const cycle = Math.floor((time % 8) / 2)
    if (cycle === 0) currentKrlCommand.value = 'PTP HOME Vel=100% DEFAULT'
    else if (cycle === 1) currentKrlCommand.value = `LIN {X 1450, Y ${jointAngles.a1.toFixed(0)}, Z 850}`
    else if (cycle === 2) currentKrlCommand.value = 'PULSE(do_LaserActive, TRUE, 1.2)'
    else currentKrlCommand.value = 'PTP SafeZoneRetract C_DIS'
  } else {
    // Interactive Mouse Kinematics Tracking
    const targetA1 = mouseTarget.x * 40
    const targetA2 = mouseTarget.y * 22
    const targetA3 = -mouseTarget.y * 28
    const targetA4 = mouseTarget.x * 35
    const targetA5 = mouseTarget.y * 30

    jointAngles.a1 += (targetA1 - jointAngles.a1) * 0.08
    jointAngles.a2 += (targetA2 - jointAngles.a2) * 0.08
    jointAngles.a3 += (targetA3 - jointAngles.a3) * 0.08
    jointAngles.a4 += (targetA4 - jointAngles.a4) * 0.08
    jointAngles.a5 += (targetA5 - jointAngles.a5) * 0.08

    currentKrlCommand.value = `LIN {A1 ${jointAngles.a1.toFixed(0)}°, A2 ${jointAngles.a2.toFixed(0)}°, A3 ${jointAngles.a3.toFixed(0)}°}`
  }

  // Apply True Articulation Rotations to Joint Groups
  if (joint1Group) joint1Group.rotation.z = THREE.MathUtils.degToRad(jointAngles.a1)
  if (joint2Group) joint2Group.rotation.y = THREE.MathUtils.degToRad(jointAngles.a2)
  if (joint3Group) joint3Group.rotation.y = THREE.MathUtils.degToRad(jointAngles.a3)
  if (joint4Group) joint4Group.rotation.x = THREE.MathUtils.degToRad(jointAngles.a4)
  if (joint5Group) joint5Group.rotation.y = THREE.MathUtils.degToRad(jointAngles.a5)

  // Laser Torch animation
  if (laserBeam) {
    laserBeam.visible = laserActive.value
  }
  if (laserPointLight) {
    laserPointLight.visible = laserActive.value
    laserPointLight.intensity = laserActive.value ? 3.0 + Math.random() * 1.0 : 0
  }

  // Animate Sparks
  if (particles && laserActive.value) {
    const pos = particles.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] += (Math.random() - 0.3) * 0.02
      if (pos[i + 1] > 0.45 || pos[i + 1] < 0.08) {
        pos[i + 1] = 0.08 + Math.random() * 0.05
      }
    }
    particles.geometry.attributes.position.needsUpdate = true
  }

  renderer.render(scene, camera)
}

function onMouseDown(e: MouseEvent) {
  isDragging = true
  previousMousePosition = { x: e.clientX, y: e.clientY }
}

function onMouseMove(e: MouseEvent) {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  mouseTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouseTarget.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x
    targetCameraRotY += deltaX * 0.008
    previousMousePosition = { x: e.clientX, y: e.clientY }
  }
}

function onMouseUp() {
  isDragging = false
}

function onMouseLeave() {
  isDragging = false
}

function onWindowResize() {
  if (!canvasContainer.value || !renderer || !camera) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initThree()
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onWindowResize)
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
canvas {
  outline: none;
  touch-action: none;
}
</style>
