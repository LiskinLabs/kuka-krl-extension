<template>
  <div class="kuka-scrollytelling relative my-12 font-mono text-left select-none">
    
    <!-- Stage Outer Container -->
    <div class="relative rounded-2xl bg-[#06090e] border border-slate-700/50 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
      
      <!-- Top Cyberpunk HUD Control Bar -->
      <div class="px-4 py-3 bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-3 z-30 relative">
        <div class="flex items-center gap-2.5">
          <span class="w-3 h-3 rounded-full bg-kuka-orange shadow-[0_0_10px_#ff6600] animate-pulse"></span>
          <span class="font-black tracking-wider text-white text-xs sm:text-sm uppercase">
            CINEMATIC INDUSTRIAL SHOWCASE // <span class="text-kuka-orange">KUKA KRL SUITE</span>
          </span>
        </div>

        <!-- Scene Quick Navigation Tabs -->
        <div class="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10 text-xs">
          <button 
            v-for="(scene, idx) in scenes" 
            :key="scene.id"
            @click="activeSceneIndex = idx"
            :class="[
              'px-2.5 sm:px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5',
              activeSceneIndex === idx 
                ? 'bg-gradient-to-r from-kuka-orange to-amber-500 text-white shadow-[0_0_15px_rgba(255,102,0,0.5)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            ]">
            <span>{{ scene.icon }}</span>
            <span class="hidden sm:inline">{{ scene.shortTitle[currentLang] || scene.shortTitle.en }}</span>
          </button>
        </div>

        <!-- Stream Status & Auto Play Toggle -->
        <div class="hidden md:flex items-center gap-3 text-[11px] text-gray-400">
          <button 
            @click="toggleAutoPlay" 
            class="px-2.5 py-1 rounded border border-white/10 hover:border-kuka-orange/50 text-gray-300 hover:text-white transition-colors flex items-center gap-1">
            <span>{{ isAutoPlaying ? '⏸ Pause Tour' : '▶ Auto Tour' }}</span>
          </button>
          <span class="text-emerald-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 120 FPS READY
          </span>
        </div>
      </div>

      <!-- Main Visual Viewport -->
      <div class="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[520px] max-h-[640px] bg-slate-950 overflow-hidden group">
        
        <!-- Image Layers with Smooth Transitions -->
        <div 
          v-for="(scene, idx) in scenes" 
          :key="scene.id"
          class="absolute inset-0 transition-all duration-700 ease-out transform"
          :class="[
            activeSceneIndex === idx 
              ? 'opacity-100 scale-100 pointer-events-auto z-10' 
              : 'opacity-0 scale-105 pointer-events-none z-0'
          ]">
          
          <img 
            :src="withBase(scene.image)" 
            :alt="scene.title[currentLang]"
            class="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08]" />

          <!-- Dark Gradient Vignette for Text Readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60 pointer-events-none"></div>

          <!-- Interactive Hotspot Pins for the Active Scene -->
          <div 
            v-for="pin in scene.pins" 
            :key="pin.id"
            :style="{ left: `${pin.x}%`, top: `${pin.y}%` }"
            class="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
            @mouseenter="activePin = pin"
            @click="activePin = pin">
            
            <!-- Pulsing Ring -->
            <div class="relative flex items-center justify-center">
              <span class="absolute w-8 h-8 rounded-full bg-kuka-orange/30 animate-ping"></span>
              <span class="relative w-5 h-5 rounded-full bg-kuka-orange text-white text-[10px] font-black border-2 border-white shadow-[0_0_15px_#ff6600] flex items-center justify-center">
                +
              </span>
            </div>

            <!-- Hover Tooltip -->
            <div 
              v-if="activePin && activePin.id === pin.id"
              class="absolute left-6 top-1/2 -translate-y-1/2 w-56 sm:w-64 p-3 rounded-xl bg-slate-900/95 backdrop-blur-md border border-kuka-orange/50 shadow-2xl text-white text-xs font-mono animate-fadeIn z-30">
              <div class="text-kuka-orange font-bold pb-1 mb-1 border-b border-white/10 flex justify-between items-center">
                <span>{{ pin.title[currentLang] || pin.title.en }}</span>
                <span class="text-[9px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300">ACTIVE</span>
              </div>
              <p class="text-[11px] text-gray-300 leading-relaxed font-sans">{{ pin.desc[currentLang] || pin.desc.en }}</p>
              <div v-if="pin.code" class="mt-2 p-1.5 rounded bg-black/60 text-cyan-300 text-[10px] font-mono border border-white/5">
                <code>{{ pin.code }}</code>
              </div>
            </div>
          </div>

        </div>

        <!-- Active Scene Floating Text HUD -->
        <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-24 sm:right-auto sm:max-w-xl z-20 text-left pointer-events-none">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-kuka-orange/40 text-kuka-orange text-xs font-bold mb-2 sm:mb-3 shadow-lg pointer-events-auto">
            <span>{{ currentScene.badge }}</span>
          </div>

          <h3 class="text-lg sm:text-3xl font-black text-white tracking-tight drop-shadow-md font-sans leading-snug">
            {{ currentScene.title[currentLang] || currentScene.title.en }}
          </h3>

          <p class="text-xs sm:text-sm text-gray-200 mt-1 sm:mt-2 leading-relaxed drop-shadow font-sans line-clamp-2 sm:line-clamp-none">
            {{ currentScene.desc[currentLang] || currentScene.desc.en }}
          </p>

          <!-- Scene Key Highlights Badges -->
          <div class="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 pointer-events-auto">
            <span 
              v-for="(tag, tIdx) in currentScene.tags[currentLang] || currentScene.tags.en" 
              :key="tIdx"
              class="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/15 text-gray-200 text-[10px] sm:text-xs font-mono shadow-sm flex items-center gap-1">
              <span class="text-kuka-orange font-bold">✓</span> {{ tag }}
            </span>
          </div>
        </div>

        <!-- Next / Prev Arrow Navigation Overlay -->
        <div class="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2">
          <button 
            @click="prevScene" 
            class="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-kuka-orange hover:text-white text-gray-300 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-sm transition-all shadow-lg active:scale-95"
            title="Previous Scene">
            ‹
          </button>
          <button 
            @click="nextScene" 
            class="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-kuka-orange hover:text-white text-gray-300 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-sm transition-all shadow-lg active:scale-95"
            title="Next Scene">
            ›
          </button>
        </div>

      </div>

      <!-- Bottom Progress Bar -->
      <div class="h-1 bg-slate-900 w-full relative overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-kuka-orange via-amber-400 to-cyan-400 transition-all duration-500"
          :style="{ width: `${((activeSceneIndex + 1) / scenes.length) * 100}%` }"></div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()

const currentLang = computed(() => {
  if (lang.value === 'ru' || lang.value?.startsWith('ru')) return 'ru'
  if (lang.value === 'tr' || lang.value?.startsWith('tr')) return 'tr'
  return 'en'
})

const activeSceneIndex = ref(0)
const activePin = ref(null)
const isAutoPlaying = ref(true)
let autoPlayTimer = null

const scenes = [
  {
    id: 'hero',
    icon: '🤖',
    image: '/media/cinematic/kuka_hero.jpg',
    badge: 'STAGE 01 // CORE ARCHITECTURE',
    shortTitle: { en: 'Robot IDE', ru: 'Главная IDE', tr: 'Robot IDE' },
    title: {
      en: 'The Definitive KUKA Robotic IDE & LSP Suite',
      ru: 'Промышленная среда разработки для роботов KUKA',
      tr: 'KUKA Robot Dili için Profesyonel IDE Paketi'
    },
    desc: {
      en: 'Native AST parser engineered for KSS 8.2 to 8.7. 50 industrial tools designed for maximum programming speed and zero production downtime.',
      ru: 'Встроенный AST-парсер для KSS 8.2 - 8.7. 50 специализированных инструментов для максимальной скорости и надежности на объекте.',
      tr: 'KSS 8.2 - 8.7 için yerel AST ayrıştırıcı. Maksimum devreye alma hızı ve sıfır duruş süresi için 50 endüstriyel araç.'
    },
    tags: {
      en: ['0ms Input Lag', 'Native AST Engine', '100% Offline Ready'],
      ru: ['0 мс задержка', 'Встроенный AST парсер', '100% Офлайн-режим'],
      tr: ['0ms Gecikme', 'Yerel AST Motoru', '%100 Çevrimdışı Hazır']
    },
    pins: [
      {
        id: 'p1',
        x: 48,
        y: 45,
        title: { en: 'A3 Joint & Velocity Guard', ru: 'Ось A3 и Контроль Скорости', tr: 'A3 Ekseni ve Hız Koruması' },
        desc: { en: 'Continuous monitoring of $VEL.CP and angular limits on physical joints.', ru: 'Непрерывный контроль скоростей $VEL.CP и лимитов осей.', tr: '$VEL.CP ve eksen sınırlarının sürekli denetimi.' },
        code: '$VEL.CP = 2.5 ; Checked Safe'
      },
      {
        id: 'p2',
        x: 72,
        y: 52,
        title: { en: 'Flange & Gripper Frame', ru: 'Фланец и Кадр Инструмента', tr: 'Flanş ve Takım Çerçevesi' },
        desc: { en: 'Automatic $TOOL and $BASE assignment validator with live hover preview.', ru: 'Автопроверка привязки $TOOL и $BASE с подсказками.', tr: '$TOOL ve $BASE doğrulayıcısı.' },
        code: '$TOOL = TOOL_DATA[1]'
      }
    ]
  },
  {
    id: 'safety',
    icon: '🛡️',
    image: '/media/cinematic/kuka_safety.jpg',
    badge: 'STAGE 02 // REAL-TIME SAFETY LINT',
    shortTitle: { en: 'Safety Guard', ru: 'Безопасность', tr: 'Güvenlik Teşhisi' },
    title: {
      en: 'Real-Time Safety Diagnostics & Collision Guard',
      ru: 'Диагностика безопасности и защита от коллизий',
      tr: 'Gerçek Zamanlı Güvenlik ve Çarpışma Koruması'
    },
    desc: {
      en: 'Catch syntax crashes, unclosed block scopes (IF/ENDIF), and unsafe motion trajectories before transferring code to the robot controller.',
      ru: 'Предотвращает падения компилятора, незакрытые блоки IF/ENDIF и опасные траектории до запуска программы на роботе.',
      tr: 'Kodu robota yüklemeden önce sözdizimi çökmelerini, kapanmamış blokları ve tehlikeli yörüngeleri yakalar.'
    },
    tags: {
      en: ['Block Balance Linter', '$TORQMON Collision Guard', 'BAS(#INITMOV) Guard'],
      ru: ['Баланс блоков IF/ENDIF', 'Защита по моменту $TORQMON', 'Контроль BAS(#INITMOV)'],
      tr: ['Blok Dengesi Denetimi', '$TORQMON Çarpışma Koruması', 'BAS(#INITMOV) Kontrolü']
    },
    pins: [
      {
        id: 'p3',
        x: 46,
        y: 48,
        title: { en: '3D Spatial Bounding Box', ru: '3D Зона Безопасности', tr: '3D Güvenlik Alanı' },
        desc: { en: 'Holographic safety envelope prevents mechanical collisions with fixtures.', ru: 'Контроль габаритов и защита от ударов об оснастку.', tr: 'Mekanik çarpışmaları önleyen 3D güvenlik zarfı.' },
        code: '$TORQMON_GUARD(150)'
      }
    ]
  },
  {
    id: 'wrist',
    icon: '📐',
    image: '/media/cinematic/kuka_wrist.jpg',
    badge: 'STAGE 03 // 6-AXIS DELTA & EULER MATH',
    shortTitle: { en: '6-Axis Delta', ru: 'Дельта Точек', tr: '6 Eksenli Delta' },
    title: {
      en: '6-Axis Point Delta Math & Euler Frame Engine',
      ru: 'Расчет 6-осевой дельты точек и углов Эйлера',
      tr: '6 Eksenli Nokta Deltası ve Euler Açı Motoru'
    },
    desc: {
      en: 'Instantly calculate spatial deltas (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) and compare active workspace code against SmartPAD ZIP backups.',
      ru: 'Мгновенный расчет пространственного смещения точек и прямое сравнение файлов с архивными ZIP-бэкапами робота.',
      tr: 'Uzamsal nokta kaymalarını (ΔX, ΔY, ΔZ) anında hesaplayın ve SmartPAD ZIP yedekleriyle karşılaştırın.'
    },
    tags: {
      en: ['3-Point Frame Calibration', 'Euler Angles A/B/C', 'SmartPAD ZIP Diff'],
      ru: ['3-Точечная привязка баз', 'Углы Эйлера A/B/C', 'Сравнение ZIP бэкапов'],
      tr: ['3 Noktalı Kalibrasyon', 'Euler Açıları A/B/C', 'SmartPAD ZIP Farkı']
    },
    pins: [
      {
        id: 'p4',
        x: 52,
        y: 38,
        title: { en: 'Euler Rotation Rings A, B, C', ru: 'Кольца Ротации Эйлера A, B, C', tr: 'Euler Dönme Halkaları A, B, C' },
        desc: { en: 'Rigid body spatial rotation calculation for precise workpiece calibration.', ru: 'Вычисление пространственной ориентации деталей в цеху.', tr: 'Hassas iş parçası kalibrasyonu için uzamsal yönelim hesabı.' },
        code: 'DECL FRAME BASE_DATA[1]'
      }
    ]
  },
  {
    id: 'factory',
    icon: '🌐',
    image: '/media/cinematic/kuka_factory.jpg',
    badge: 'STAGE 04 // GLOBAL COMMISSIONING NETWORK',
    shortTitle: { en: 'Global Radar', ru: 'Глобальный Радар', tr: 'Küresel Radar' },
    title: {
      en: 'Real-Time Global Commissioning Telemetry',
      ru: 'Глобальная телеметрия пусконаладки в реальном времени',
      tr: 'Gerçek Zamanlı Küresel Devreye Alma Telemetrisi'
    },
    desc: {
      en: 'Connecting robotics commissioning engineers across 48 countries — from German automotive plants to integration cells in the US, Turkey, and Japan.',
      ru: 'Объединяет инженеров-робототехников в 48 странах мира — от автозаводов Германии до роботизированных ячеек в США, Турции и Японии.',
      tr: "Almanya'dan ABD, Türkiye ve Japonya'ya kadar 48 ülkedeki devreye alma mühendislerini birbirine bağlar."
    },
    tags: {
      en: ['48 Active Countries', 'Live D1 Synchronization', 'Zero-PII Privacy'],
      ru: ['48 стран мира', 'Синхронизация через D1', 'Анонимность и безопасность'],
      tr: ['48 Aktif Ülke', 'Canlı D1 Senkronizasyonu', 'Gizlilik Korumalı']
    },
    pins: [
      {
        id: 'p5',
        x: 53,
        y: 42,
        title: { en: '3D Telemetry Radar Hub', ru: 'Узел 3D Телеметрии', tr: '3D Telemetri Radarı' },
        desc: { en: 'Real-time telemetry pulse validating KSS 8.7 compatibility worldwide.', ru: 'Пульс телеметрии, подтверждающий совместимость с KSS по всему миру.', tr: 'Dünya çapında KSS uyumluluğunu doğrulayan telemetri sinyali.' },
        code: 'Cloudflare Edge // D1 Store'
      }
    ]
  }
]

const currentScene = computed(() => scenes[activeSceneIndex.value] || scenes[0])

const nextScene = () => {
  activeSceneIndex.value = (activeSceneIndex.value + 1) % scenes.length
  activePin.value = null
}

const prevScene = () => {
  activeSceneIndex.value = (activeSceneIndex.value - 1 + scenes.length) % scenes.length
  activePin.value = null
}

const startAutoPlay = () => {
  stopAutoPlay()
  autoPlayTimer = setInterval(() => {
    if (isAutoPlaying.value) {
      nextScene()
    }
  }, 6000)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}
</style>
