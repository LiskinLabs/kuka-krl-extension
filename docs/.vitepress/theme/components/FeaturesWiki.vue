<template>
  <div class="kuka-features-wiki min-h-screen bg-[#07090e] text-[#F0F4F8] font-sans selection:bg-kuka-orange selection:text-white pb-24 transition-colors">
    
    <!-- Cyberpunk Ambient Grid Overlay -->
    <div class="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px]"></div>
    
    <!-- Ambient Radial Glows -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-orange-600/15 via-amber-500/10 to-orange-700/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>

    <!-- Top Breadcrumb / Return to Main Landing Bar -->
    <div class="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-between items-center text-xs font-mono">
      <a :href="withBase(langKey === 'en' ? '/' : `/${langKey}/`)" class="inline-flex items-center gap-2 text-gray-400 hover:text-kuka-orange transition-colors">
        <span>←</span>
        <span>{{ text.backToLanding }}</span>
      </a>

      <!-- Quick Language Switcher -->
      <div class="inline-flex items-center gap-1 bg-[#0d121d] p-1 rounded-full border border-white/10 shadow-sm font-mono text-xs">
        <a :href="withBase('/guide/features')" :class="['px-2.5 py-0.5 rounded-full font-bold transition-all', langKey === 'en' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">EN</a>
        <a :href="withBase('/ru/guide/features')" :class="['px-2.5 py-0.5 rounded-full font-bold transition-all', langKey === 'ru' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">RU</a>
        <a :href="withBase('/tr/guide/features')" :class="['px-2.5 py-0.5 rounded-full font-bold transition-all', langKey === 'tr' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">TR</a>
      </div>
    </div>

    <!-- Hero Header -->
    <header class="relative pt-8 sm:pt-12 pb-12 sm:pb-16 overflow-hidden z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <!-- Status Badge -->
        <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs sm:text-sm text-kuka-orange font-mono font-bold mb-6 shadow-[0_0_15px_rgba(255,102,0,0.2)]">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-kuka-orange"></span>
          </span>
          <span>{{ text.heroBadge }}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight font-sans">
          {{ text.heroTitlePrefix }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange via-amber-400 to-[#FF9900] drop-shadow-[0_0_20px_rgba(255,102,0,0.3)]">
            {{ text.heroTitleHighlight }}
          </span>
        </h1>

        <p class="max-w-3xl text-sm sm:text-base text-gray-300 mx-auto mb-8 sm:mb-10 font-normal leading-relaxed">
          {{ text.heroSubtitle }}
        </p>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto font-mono">
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-kuka-orange/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-white">50</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statTotal }}</div>
          </div>
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-emerald-500/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-emerald-400">22</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statCommunity }}</div>
          </div>
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-kuka-orange/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-kuka-orange">28</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statPro }}</div>
          </div>
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-cyan-500/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-cyan-400">6</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statCategories }}</div>
          </div>
        </div>

      </div>
    </header>

    <!-- Sticky Filter & Search HUD Bar -->
    <div class="sticky top-0 z-40 py-3.5 backdrop-blur-xl bg-[#07090e]/90 border-y border-white/10 shadow-xl mb-8 sm:mb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="text.searchPlaceholder"
            class="w-full bg-[#0d121d] text-white placeholder-gray-500 text-xs rounded-xl px-4 py-2.5 pl-10 border border-white/15 focus:outline-none focus:border-kuka-orange focus:ring-1 focus:ring-kuka-orange transition-all font-mono"
          />
          <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs">
            ✕
          </button>
        </div>

        <!-- Filter Category Pills -->
        <div class="flex overflow-x-auto sm:flex-wrap items-center gap-2 w-full md:w-auto pb-1 sm:pb-0 scrollbar-none font-mono">
          <button
            @click="activeCategory = 'all'"
            :class="[
              'px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all border flex-shrink-0 flex items-center',
              activeCategory === 'all'
                ? 'bg-kuka-orange text-white border-kuka-orange shadow-[0_0_12px_rgba(255,102,0,0.5)]'
                : 'bg-[#0d121d] text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            ]"
          >
            {{ text.tabAll }} ({{ features.length }})
          </button>

          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              'px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all border flex items-center gap-1.5 flex-shrink-0',
              activeCategory === cat.id
                ? 'bg-kuka-orange text-white border-kuka-orange shadow-[0_0_12px_rgba(255,102,0,0.5)]'
                : 'bg-[#0d121d] text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            ]"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.title[langKey] }}</span>
          </button>
        </div>

        <!-- View Switcher (Grid / List) -->
        <div class="hidden sm:flex items-center gap-1 bg-[#0d121d] p-1 rounded-xl border border-white/10">
          <button
            @click="viewMode = 'grid'"
            :class="['p-1.5 rounded-lg text-xs transition-colors', viewMode === 'grid' ? 'bg-kuka-orange text-white' : 'text-gray-400 hover:text-white']"
            title="Grid view">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="['p-1.5 rounded-lg text-xs transition-colors', viewMode === 'list' ? 'bg-kuka-orange text-white' : 'text-gray-400 hover:text-white']"
            title="List view">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Main Content Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">

      <!-- Empty Search State -->
      <div v-if="filteredFeatures.length === 0" class="text-center py-20 bg-[#0a0d14] rounded-2xl border border-white/10 shadow-xl font-mono">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-lg font-bold text-white mb-1">{{ text.noResultsTitle }}</h3>
        <p class="text-gray-400 text-xs mb-5">{{ text.noResultsDesc }}</p>
        <button @click="searchQuery = ''; activeCategory = 'all'" class="px-4 py-2 bg-kuka-orange text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors">
          {{ text.resetFilters }}
        </button>
      </div>

      <!-- GRID VIEW MODE -->
      <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <article
          v-for="feat in filteredFeatures"
          :key="feat.id"
          :id="'feature-' + feat.id"
          class="group relative rounded-2xl border border-white/10 bg-[#0a0d14] hover:border-kuka-orange/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl text-left font-mono"
        >
          <!-- Top Accent Bar -->
          <div :class="['h-1 w-full', feat.isPro ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600' : 'bg-gradient-to-r from-emerald-500 to-teal-400']"></div>

          <div class="p-6 flex-grow">
            
            <!-- Card Header Meta -->
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-2.5">
                <span class="text-xs font-bold px-2 py-0.5 rounded-lg bg-[#0d121d] text-gray-300 border border-white/10">
                  #{{ String(feat.id).padStart(2, '0') }}
                </span>
                
                <span
                  :class="[
                    'text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border',
                    feat.isPro
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  ]"
                >
                  <span v-if="feat.isPro">👑 PRO</span>
                  <span v-else>🟢 COMMUNITY</span>
                </span>
              </div>

              <!-- Shortcut Badge -->
              <span v-if="feat.shortcut" class="text-[10px] font-medium px-2 py-0.5 rounded bg-[#0d121d] text-cyan-400 border border-white/10 flex items-center gap-1">
                ⌨️ {{ feat.shortcut }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-xl font-bold text-white group-hover:text-kuka-orange transition-colors mb-2 leading-snug font-sans flex items-center gap-2">
              <span>{{ feat.icon }}</span>
              <span>{{ feat.title[langKey] }}</span>
            </h2>

            <!-- Description -->
            <p class="text-gray-300 text-xs leading-relaxed mb-4 font-sans">
              {{ feat.desc[langKey] }}
            </p>

            <!-- Industrial Benefit Callout -->
            <div v-if="feat.benefit" class="mb-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-200 leading-relaxed flex items-start gap-2.5">
              <span class="text-sm flex-shrink-0">⚡</span>
              <div>
                <strong class="text-kuka-orange font-bold block mb-0.5 uppercase tracking-wider text-[10px]">{{ text.fieldBenefitLabel }}:</strong>
                <span class="font-sans text-[11px]">{{ feat.benefit[langKey] }}</span>
              </div>
            </div>

            <!-- Code Comparison Block (Before / After) if available -->
            <div v-if="feat.codeBefore || feat.codeAfter" class="mb-4 rounded-xl bg-[#07090e] border border-white/10 p-3 text-[11px] space-y-2 overflow-x-auto">
              <div v-if="feat.codeBefore" class="space-y-1">
                <div class="text-[10px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>✗</span> <span>Before (Legacy / Fault Risk):</span>
                </div>
                <pre class="text-gray-400 text-[10px] font-mono select-all"><code>{{ feat.codeBefore }}</code></pre>
              </div>
              <div v-if="feat.codeAfter" class="space-y-1 pt-2 border-t border-white/10">
                <div class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span class="flex items-center gap-1"><span>✓</span> <span>With KUKA KRL Pro:</span></span>
                  <button @click="copyCode(feat.codeAfter, feat.id)" class="text-kuka-orange hover:text-white transition-colors text-[9px]">
                    {{ copiedCodeId === feat.id ? '✓ Copied!' : '[ Copy ]' }}
                  </button>
                </div>
                <pre class="text-cyan-300 text-[10px] font-mono select-all"><code>{{ feat.codeAfter }}</code></pre>
              </div>
            </div>

            <!-- Settings / Config Parameter Badge -->
            <div v-if="feat.setting" class="mb-4 text-[10px] text-gray-400 bg-[#0d121d] px-2.5 py-1.5 rounded-lg border border-white/5 flex items-center justify-between">
              <span>Config: <code class="text-gray-300">{{ feat.setting }}</code></span>
              <span class="text-kuka-orange">settings.json</span>
            </div>

            <!-- Media Preview Block -->
            <div v-if="feat.media" class="mt-2">
              <div
                @click="openLightbox(resolveMedia(feat.media), feat.title[langKey])"
                class="relative rounded-xl overflow-hidden border border-white/10 bg-[#07090e] group/media cursor-pointer aspect-video flex items-center justify-center shadow-inner"
              >
                <img
                  :src="resolveMedia(feat.media)"
                  :alt="feat.title[langKey]"
                  class="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span class="text-[11px] text-white font-medium flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    <svg class="w-3.5 h-3.5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    {{ text.clickToEnlarge }}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- Card Footer -->
          <div class="px-6 py-3 bg-[#07090e] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              KSS 8.2 - 8.7 Supported
            </span>
            <span class="text-gray-500 text-[10px]">Liskin Labs Verified</span>
          </div>

        </article>
      </div>

      <!-- COMPACT LIST VIEW MODE -->
      <div v-else class="space-y-3 font-mono">
        <div
          v-for="feat in filteredFeatures"
          :key="feat.id"
          class="p-4 rounded-xl border border-white/10 bg-[#0a0d14] hover:border-kuka-orange/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg text-left"
        >
          <div class="flex items-start md:items-center gap-4">
            <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#0d121d] text-gray-400 border border-white/10">
              #{{ String(feat.id).padStart(2, '0') }}
            </span>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span :class="['text-[10px] font-bold px-2 py-0.5 rounded uppercase', feat.isPro ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30']">
                  {{ feat.isPro ? 'PRO' : 'COMMUNITY' }}
                </span>
                <h3 class="text-base font-bold text-white hover:text-kuka-orange transition-colors font-sans">
                  {{ feat.icon }} {{ feat.title[langKey] }}
                </h3>
              </div>
              <p class="text-xs text-gray-400 line-clamp-1 max-w-3xl font-sans">
                {{ feat.desc[langKey] }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 self-end md:self-center flex-shrink-0">
            <span v-if="feat.shortcut" class="text-xs px-2 py-1 bg-[#0d121d] text-cyan-400 rounded-lg border border-white/10">
              ⌨️ {{ feat.shortcut }}
            </span>
            <button
              v-if="feat.media"
              @click="openLightbox(resolveMedia(feat.media), feat.title[langKey])"
              class="px-3 py-1 bg-[#0d121d] hover:bg-kuka-orange hover:text-white text-gray-300 rounded-lg text-xs transition-all border border-white/10 font-bold"
            >
              {{ text.viewDemo }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div v-if="lightboxImage" @click="lightboxImage = null" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out">
        <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
          <div class="flex items-center justify-between w-full mb-3 text-white font-mono text-xs">
            <h3 class="text-base font-bold text-kuka-orange">{{ lightboxTitle }}</h3>
            <button @click="lightboxImage = null" class="px-3 py-1 bg-[#161f30] hover:bg-red-600 rounded-lg transition-colors text-white font-bold">
              ✕ {{ text.close }}
            </button>
          </div>
          <img :src="lightboxImage" class="max-w-full max-h-[80vh] object-contain rounded-2xl border border-white/15 shadow-2xl" @click.stop />
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()

const searchQuery = ref('')
const activeCategory = ref('all')
const viewMode = ref('grid')
const lightboxImage = ref(null)
const lightboxTitle = ref('')
const copiedCodeId = ref(null)

const resolveMedia = (path) => path ? withBase(path) : ''

const openLightbox = (img, title) => {
  lightboxImage.value = img
  lightboxTitle.value = title
}

const copyCode = async (code, id) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedCodeId.value = id
    setTimeout(() => { copiedCodeId.value = null }, 2500)
  } catch (e) {
    copiedCodeId.value = id
  }
}

const langKey = computed(() => {
  if (lang.value === 'ru' || lang.value?.startsWith('ru')) return 'ru'
  if (lang.value === 'tr' || lang.value?.startsWith('tr')) return 'tr'
  return 'en'
})

const categories = [
  { id: 'core', icon: '📝', title: { en: 'Core Editor', ru: 'Редактор & Язык', tr: 'Temel Editör' } },
  { id: 'safety', icon: '🛡️', title: { en: 'Safety & Diagnostics', ru: 'Безопасность & Диагностика', tr: 'Güvenlik & Teşhis' } },
  { id: 'flowchart', icon: '📊', title: { en: 'Flowcharts & Logic', ru: 'Блок-схемы & Логика', tr: 'Akış Şemaları' } },
  { id: 'backup', icon: '📦', title: { en: 'Backups & Math', ru: 'Бэкапы & Математика', tr: 'Yedek & Matematik' } },
  { id: 'iot', icon: '⚡', title: { en: 'Communication & IoT', ru: 'Связь & IoT / EKI', tr: 'İletişim & IoT' } },
  { id: 'enterprise', icon: '🏢', title: { en: 'Enterprise & Git', ru: 'Enterprise & Git', tr: 'Kurumsal & Git' } }
]

const features = [
  // 1-10: Core Language & Editor
  {
    id: 1, category: 'core', icon: '🎨', isPro: false,
    shortcut: 'Ctrl+K Ctrl+T', setting: 'workbench.colorTheme',
    media: '/media/kuka_theme_1.png',
    title: { en: '6 Industrial KUKA Themes', ru: '6 Промышленных тем KUKA', tr: '6 Endüstriyel KUKA Teması' },
    desc: { en: 'High-contrast color themes tuned specifically for rugged shop-floor laptops in bright sunlight or dark factory cells.', ru: 'Высококонтрастные темы, специально оптимизированные для работы в цеху при ярком свете или в затемненных ячейках.', tr: 'Atölye ortamındaki parlak güneş ışığı veya karanlık hücreler için optimize edilmiş yüksek kontrastlı temalar.' },
    benefit: { en: 'Eliminates eye strain during 12-hour commissioning shifts.', ru: 'Снижает усталость глаз при многочасовой наладке на объекте.', tr: '12 saatlik devreye alma vardiyalarında göz yorgunluğunu önler.' },
    codeBefore: '; Standard generic editor with low contrast\nPTP XHOME Vel=100%',
    codeAfter: '; KUKA Dark Theme with vivid syntax highlighting\nPTP XHOME Vel=100% DEFAULT'
  },
  {
    id: 2, category: 'core', icon: '⚡', isPro: false,
    shortcut: 'Ctrl+Space', setting: 'editor.quickSuggestions',
    media: '/media/Smart Autocomplete.gif',
    title: { en: 'Smart Autocomplete & 350+ KSS Variables', ru: 'Умный автокомплит и 350+ переменных KSS', tr: 'Akıllı Otomatik Tamamlama ve 350+ KSS Değişkeni' },
    desc: { en: 'Instant suggestions for all KUKA system variables ($ADVANCE, $OV_PRO, $POS_ACT, $VEL.CP) with documentation tooltips.', ru: 'Мгновенные подсказки всех системных переменных KSS с описанием типов и допустимых диапазонов.', tr: 'KUKA sistem değişkenleri ($ADVANCE, $OV_PRO, $POS_ACT) için anında öneriler ve belgeler.' },
    benefit: { en: 'Zero typos in complex system variables, eliminating controller compilation aborts.', ru: 'Исключает опечатки в системных регистрах и переменных ядра KSS.', tr: 'Sistem değişkenlerinde yazım hatalarını önler, derleme iptallerini engeller.' },
    codeBefore: '$ADV = 3 ; Error: undefined variable',
    codeAfter: '$ADVANCE = 3 ; Validated KSS Motion Look-Ahead'
  },
  {
    id: 3, category: 'core', icon: '🔗', isPro: false,
    shortcut: 'F12', setting: 'kuka.navigation.crossFile',
    media: '/media/Go-to-Definition.gif',
    title: { en: 'Cross-File Go-to-Definition (.src ↔ .dat)', ru: 'Навигация Go-to-Definition (.src ↔ .dat)', tr: 'Çapraz Dosya Tanıma Gitme (.src ↔ .dat)' },
    desc: { en: 'Jump instantly between procedure calls in .src and coordinate declarations in corresponding .dat files.', ru: 'Мгновенный переход по клавише F12 от вызова подпрограммы или точки в .src к ее определению в .dat.', tr: '.src dosyasındaki komutlardan .dat dosyasındaki koordinat tanımlarına F12 ile anında geçiş.' },
    benefit: { en: 'Saves hours spent manually opening and searching large companion .dat files.', ru: 'Экономит часы ручного поиска точек и структур в парных .dat файлах.', tr: 'Büyük .dat dosyalarında manuel arama yaparken harcanan saatleri kurtarır.' },
    codeBefore: '; Manual searching through 5,000 line .dat file...',
    codeAfter: '; F12 on XPICK_PART jumps directly to DECL E6POS in .dat'
  },
  {
    id: 4, category: 'core', icon: '💡', isPro: true,
    shortcut: 'Alt+Shift+H', setting: 'kuka.inlayHints.signals',
    media: '/media/Inlay Hints.gif',
    title: { en: 'Real-Time Hardware Signal Inlay Hints', ru: 'Инлайн-подсказки аппаратных сигналов I/O', tr: 'Gerçek Zamanlı Donanım Sinyali İpuçları' },
    desc: { en: 'Injects human-readable signal names from config files directly beside numeric $IN[x] and $OUT[y] indexes.', ru: 'Выводит человекочитаемые названия сигналов (например, Part_Clamped_OK) прямо рядом с индексами $IN[x] и $OUT[y].', tr: '$IN[x] ve $OUT[y] sinyallerinin yanına otomatik olarak insan tarafından okunabilir donanım adlarını yerleştirir.' },
    benefit: { en: 'Engineers understand code immediately without consulting electrical wiring schematics.', ru: 'Инженер сразу видит назначение дискретных сигналов без открытия электрических схем.', tr: 'Elektrik şemalarına bakmadan donanım sinyallerinin ne işe yaradığı hemen anlaşılır.' },
    codeBefore: 'IF $IN[27] == TRUE THEN ; What does 27 mean?',
    codeAfter: 'IF $IN[27] /* Part_Clamped_OK */ == TRUE THEN'
  },
  {
    id: 5, category: 'core', icon: '📐', isPro: false,
    shortcut: 'Shift+Alt+F', setting: 'editor.formatOnSave',
    media: '/media/Code Formatter & Indentation.gif',
    title: { en: 'Code Formatter & Indentation Engine', ru: 'Форматирование кода и выравнивание отступов', tr: 'Kod Biçimlendirici ve Girinti Motoru' },
    desc: { en: 'Standardizes indentations and capitalization for nested DEF, IF, LOOP, and SWITCH blocks automatically.', ru: 'Автоматически приводит отступы и регистр ключевых слов KRL к единому промышленному стандарту.', tr: 'DEF, IF, LOOP ve SWITCH bloklarının girintilerini ve büyük/küçük harf kurallarını otomatik standartlaştırır.' },
    benefit: { en: 'Clean, auditable code ready for OEM acceptance (VW, BMW, Mercedes standards).', ru: 'Идеально читаемый код, готовый к аудиту и сдаче технадзору заказчика.', tr: 'OEM kabul denetimlerine hazır, tertemiz ve standartlara uygun kod.' },
    codeBefore: 'def test()\nptp xhome\nendif\nend',
    codeAfter: 'DEF Test()\n  PTP XHOME\nEND'
  },
  {
    id: 6, category: 'core', icon: '📂', isPro: false,
    shortcut: 'Ctrl+K Ctrl+0', setting: 'editor.folding',
    media: '/media/Quick Fold Toolbar.gif',
    title: { en: 'Quick Fold Toolbar (FOLD / ENDFOLD)', ru: 'Быстрое сворачивание блоков FOLD / ENDFOLD', tr: 'Hızlı Blok Katlama (FOLD / ENDFOLD)' },
    desc: { en: 'Full folding support for WorkVisual and SmartPAD FOLD blocks, subprograms, and data structures.', ru: 'Сворачивание и разворачивание служебных блоков FOLD/ENDFOLD в один клик.', tr: 'WorkVisual ve SmartPAD FOLD bloklarının tek tıkla katlanması ve yönetimi.' },
    benefit: { en: 'Hides thousands of lines of teach pendant boilerplate to focus on core process logic.', ru: 'Скрывает тысячи строк вспомогательного кода пульта, оставляя только суть алгоритма.', tr: 'Ana proses mantığına odaklanmak için binlerce satırlık kumanda kodunu gizler.' },
    codeBefore: '; FOLD BAS INI\n; 50 lines of motion initialization\n; ENDFOLD',
    codeAfter: '▸ ; FOLD BAS INI ... [50 lines folded]'
  },
  {
    id: 7, category: 'core', icon: '🔍', isPro: false,
    shortcut: 'Shift+F12', setting: 'kuka.references.search',
    media: '/media/Find All References.gif',
    title: { en: 'Find All References Workspace Search', ru: 'Поиск всех ссылок и использований символа', tr: 'Tüm Referansları Bulma Araması' },
    desc: { en: 'Locates every occurrence of a point, signal, subprogram, or variable across all cell files.', ru: 'Находит все места чтения и записи выбранной точки, сигнала или переменной по всему проекту ячейки.', tr: 'Bir noktanın veya değişkenin projedeki tüm kullanım yerlerini anında listeler.' },
    benefit: { en: 'Prevents breaking shared points or subroutines during cell refactoring.', ru: 'Исключает случайную поломку общих точек и процедур при модификации программ.', tr: 'Programları düzenlerken paylaşılan noktaların veya alt programların bozulmasını önler.' },
    codeBefore: '; Guessing which routines call PickPart()...',
    codeAfter: '; Found 8 references in Cell.src, Routine1.src, Safety.src'
  },
  {
    id: 8, category: 'core', icon: '📊', isPro: false,
    shortcut: 'Ctrl+Shift+P > Sort', setting: 'kuka.declarations.sort',
    media: '/media/Sort Declarations.gif',
    title: { en: 'Declaration Sorter (INT, REAL, FRAME)', ru: 'Сортировка деклараций по типам данных', tr: 'Tanımlama Sıralayıcı (INT, REAL, FRAME)' },
    desc: { en: 'Groups and alphabetically sorts declarations in .dat and .src by type: BOOL, INT, REAL, CHAR, FRAME, E6POS.', ru: 'Группирует и сортирует переменные по типам (INT, REAL, FRAME, E6POS, E6AXIS) в заголовке файла.', tr: 'Değişken tanımlarını türlerine göre mantıksal ve alfabetik olarak yeniden düzenler.' },
    benefit: { en: 'Brings pristine order to legacy files with hundreds of disorganized global variables.', ru: 'Наводит идеальный порядок в файлах с сотнями хаотичных переменных.', tr: 'Yüzlerce dağınık değişken içeren eski dosyalara kusursuz düzen getirir.' },
    codeBefore: 'DECL REAL Y\nDECL INT A\nDECL FRAME F\nDECL INT B',
    codeAfter: '; Integers:\nDECL INT A, B\n; Reals:\nDECL REAL Y\n; Frames:\nDECL FRAME F'
  },
  {
    id: 9, category: 'core', icon: 'ℹ️', isPro: false,
    shortcut: 'Hover Mouse', setting: 'editor.hover.enabled',
    media: '/media/Hover Info & Read Write Status.gif',
    title: { en: 'Hover Telemetry & Read/Write Status', ru: 'Информационные тултипы и статус Read/Write', tr: 'Üzerine Gelme Bilgisi ve Okuma/Yazma Durumu' },
    desc: { en: 'Hover over any variable to inspect data type, dimension arrays, and read/write access permissions.', ru: 'При наведении курсора показывает тип, размерность массивов и статус доступа к переменной.', tr: 'Değişkenin türünü, dizi boyutunu ve yazma izinlerini fareyle üzerine gelerek görün.' },
    benefit: { en: 'Immediate clarity on read-only system flags vs writeable production variables.', ru: 'Сразу понятно, является ли переменная системной read-only или доступна для записи.', tr: 'Sistem değişkenlerinin salt okunur olup olmadığını anında teyit edin.' },
    codeBefore: '; Unsure if $POS_ACT can be overwritten...',
    codeAfter: 'ℹ️ $POS_ACT: E6POS (READ-ONLY System Variable)'
  },
  {
    id: 10, category: 'core', icon: '🎨', isPro: false,
    shortcut: 'Auto', setting: 'editor.semanticHighlighting',
    media: '/media/kuka_theme_4.png',
    title: { en: 'Semantic Token & Scope Highlighting', ru: 'Семантическая подсветка областей видимости', tr: 'Anlamsal Belirteç ve Kapsam Vurgulama' },
    desc: { en: 'Visually separates local variables, global .dat structures, and KSS system registers with distinctive colors.', ru: 'Визуально разделяет локальные переменные, глобальные структуры .dat и системные регистры KSS.', tr: 'Yerel değişkenleri, küresel .dat yapılarını ve KSS sistem kayıtlarını farklı renklerle ayırır.' },
    benefit: { en: 'Instantly spot variable shadowing and accidental global overwrites.', ru: 'Предотвращает перекрытие имен локальными переменными и случайную порчу данных.', tr: 'Aynı isimli değişkenlerin birbirini ezmesini ve veri kaybını önler.' },
    codeBefore: '; Same color for local and global variables',
    codeAfter: '; Local = Blue, Global = Cyan, System = Orange'
  },

  // 11-19: Safety & Diagnostics
  {
    id: 11, category: 'safety', icon: '🛡️', isPro: true,
    shortcut: 'Auto on Save', setting: 'kuka.safety.blockBalance',
    media: '/media/block-balance.gif',
    title: { en: 'Block Scope Balance Validator (IF/LOOP)', ru: 'Контроль баланса блоков IF/ENDIF и LOOP', tr: 'Blok Dengesi Doğrulayıcısı (IF/LOOP)' },
    desc: { en: 'Flags missing or unmatched ENDIF, ENDFOR, and ENDLOOP tags in real time before code reaches the robot.', ru: 'Выявляет пропущенные или лишние ENDIF, ENDFOR, ENDLOOP прямо в процессе набора кода.', tr: 'Kapanmamış IF, FOR ve LOOP bloklarını koda robota gitmeden önce tespit eder.' },
    benefit: { en: 'Prevents controller compiler lockups and emergency stops on program selection.', ru: 'Исключает аварийный сброс селектора программ на пульте из-за синтаксического сбоя.', tr: 'Kumandada sözdizimi hatası nedeniyle program seçiminin iptal edilmesini önler.' },
    codeBefore: 'IF $IN[1] == TRUE THEN\n  PTP XPICK\n; Missing ENDIF statement!',
    codeAfter: 'IF $IN[1] == TRUE THEN\n  PTP XPICK\nENDIF ; ✓ Balanced'
  },
  {
    id: 12, category: 'safety', icon: '⚡', isPro: true,
    shortcut: 'Ctrl+Shift+P > Lint', setting: 'kuka.safety.velocityGuard',
    media: '/media/type-validation-demo.gif',
    title: { en: 'Velocity Collision Inspector ($VEL.CP)', ru: 'Инспектор опасных скоростей ($VEL.CP)', tr: 'Hız ve Çarpışma Denetçisi ($VEL.CP)' },
    desc: { en: 'Scans for excessive Cartesian speeds ($VEL.CP > 3.0 m/s) in proximity to fixtures or gripping positions.', ru: 'Находит опасные скорости линейных перемещений в зонах захвата деталей и работы с оснасткой.', tr: 'Fikstür ve parça alma bölgelerindeki aşırı hızları ($VEL.CP > 3.0 m/s) uyarır.' },
    benefit: { en: 'Eliminates mechanical robot collisions and bent tooling during first dry runs.', ru: 'Предотвращает механические удары робота и поломку инструмента при первом прогоне.', tr: 'İlk deneme çalıştırmalarında takım kırılmalarını ve mekanik çarpmaları önler.' },
    codeBefore: 'LIN XPICK_PART Vel=3.5 m/s ; DANGEROUS HIGH SPEED',
    codeAfter: 'LIN XPICK_PART Vel=0.5 m/s ; ✓ Safe Touchdown'
  },
  {
    id: 13, category: 'safety', icon: '🛑', isPro: true,
    shortcut: 'Ctrl+Shift+P > Torq', setting: 'kuka.safety.torqmonGuard',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'Collision Torque Guard ($TORQMON)', ru: 'Инъекция барьера момента $TORQMON_GUARD', tr: 'Tork Çarpışma Koruması ($TORQMON)' },
    desc: { en: 'Inserts dynamic torque monitoring limits ($TORQMON) around critical assembly and insertion motions.', ru: 'Автоматически генерирует защитный коридор момента на осях для предотвращения поломки редукторов.', tr: 'Kritik montaj hareketleri etrafına dinamik motor tork sınırları ($TORQMON) ekler.' },
    benefit: { en: 'Protects expensive servomotors and gearboxes in case of misaligned workpieces.', ru: 'Спасает серводвигатели и редукторы робота при заклинивании деталей в кондукторе.', tr: 'Parça sıkışması durumunda pahalı servo motorları ve redüktörleri korur.' },
    codeBefore: '; Blind force insertion without torque monitoring\nLIN XINSERT_PIN',
    codeAfter: '$TORQMON_GUARD(120) ; Barrier active\nLIN XINSERT_PIN\n$TORQMON_RESET()'
  },
  {
    id: 14, category: 'safety', icon: '💀', isPro: true,
    shortcut: 'Auto', setting: 'kuka.diagnostics.deadCode',
    media: '/media/dead-code.gif',
    title: { en: 'Dead-Code & Unreachable Path Analyzer', ru: 'Детектор мертвого и недостижимого кода', tr: 'Ölü ve Ulaşılamaz Kod Analizörü' },
    desc: { en: 'Highlights unexecuted lines situated after RETURN, HALT, EXIT, or permanent IF FALSE branches.', ru: 'Подсвечивает серым строки, которые никогда не выполнятся (после RETURN, HALT или жестких условий).', tr: 'RETURN, HALT veya EXIT komutlarından sonra asla çalışmayacak satırları gösterir.' },
    benefit: { en: 'Reveals orphaned safety logic and forgotten temporary test statements.', ru: 'Выявляет забытый отладочный код и неработающие защитные ветки.', tr: 'Unutulmuş test kodlarını ve çalışmayan güvenlik adımlarını ortaya çıkarır.' },
    codeBefore: 'RETURN\nPULSE($OUT[10], TRUE, 0.5) ; NEVER REACHED',
    codeAfter: '; Dead code highlighted and flagged with warning'
  },
  {
    id: 15, category: 'safety', icon: '🔄', isPro: true,
    shortcut: 'Ctrl+Shift+P > Sync', setting: 'kuka.diagnostics.datSync',
    media: '/media/type-validation-demo.gif',
    title: { en: 'Type Validation & .DAT Sync Inspector', ru: 'Валидатор типов и синхронизации с .DAT', tr: 'Tür Doğrulama ve .DAT Senkronizasyonu' },
    desc: { en: 'Checks that variables declared in .src match the exact datatype defined in corresponding .dat files.', ru: 'Проверяет соответствие типов данных переменных и точек между кодом в .src и объявлением в .dat.', tr: '.src dosyasındaki değişkenlerin .dat dosyasındaki türlerle tam eşleştiğini doğrular.' },
    benefit: { en: 'Stops runtime type mismatch faults when running on physical KRC controllers.', ru: 'Устраняет трудноуловимые ошибки несовпадения типов при старте ячейки.', tr: 'Robot çalışırken ortaya çıkabilecek tür uyuşmazlığı çökmelerini engeller.' },
    codeBefore: '; .src: DECL INT COUNT / .dat: DECL REAL COUNT',
    codeAfter: '✓ Verified: COUNT is INT in both .src and .dat'
  },
  {
    id: 16, category: 'safety', icon: '🔤', isPro: false,
    shortcut: 'Auto', setting: 'kuka.diagnostics.nonAscii',
    media: '/media/KUKA COMMANDS.gif',
    title: { en: 'Non-ASCII & Cyrillic Layout Detector', ru: 'Детектор случайных русских символов и не-ASCII', tr: 'ASCII Dışı ve Hatalı Klavye Karakteri Tespiti' },
    desc: { en: 'Detects look-alike Cyrillic or non-ASCII characters (e.g. Cyrillic "С", "О", "А") inside variable names.', ru: 'Моментально подсвечивает русские буквы, случайно введенные в именах переменных на латинице.', tr: 'Değişken adları içine yanlışlıkla yazılmış yabancı veya benzer harfleri yakalar.' },
    benefit: { en: 'Eliminates mysterious KSS compiler errors that take hours to diagnose visually.', ru: 'Ликвидирует необъяснимые ошибки компилятора, на поиск которых уходили часы.', tr: 'Gözle fark edilmesi imkansız olan derleyici hatalarını saniyeler içinde çözer.' },
    codeBefore: 'PTP XHОME ; Hidden Cyrillic "О" causes compile abort!',
    codeAfter: 'PTP XHOME ; ✓ Verified pure ASCII identifier'
  },
  {
    id: 17, category: 'safety', icon: '📏', isPro: true,
    shortcut: 'Auto', setting: 'kuka.safety.arrayBounds',
    media: '/media/type-validation-demo.gif',
    title: { en: 'Array Bounds & Index Overrun Guard', ru: 'Контроль выхода за границы массивов', tr: 'Dizi Sınırları ve Aşım Koruması' },
    desc: { en: 'Warns against indexes exceeding bounds in TOOL_DATA[16], BASE_DATA[32], and custom arrays.', ru: 'Предупреждает об обращении к несуществующим номерам инструментов TOOL_DATA и баз BASE_DATA.', tr: 'TOOL_DATA, BASE_DATA veya özel dizilerde sınır dışı indeks kullanımını engeller.' },
    benefit: { en: 'Avoids KSS Array Index Out of Range emergency line stops.', ru: 'Предотвращает аварийный останов робота по ошибке Index Out of Bounds.', tr: 'Robot çalışırken dizi sınır aşımı kaynaklı acil duruşları engeller.' },
    codeBefore: '$TOOL = TOOL_DATA[17] ; KSS limit is 16!',
    codeAfter: '$TOOL = TOOL_DATA[16] ; ✓ In valid 1..16 bounds'
  },
  {
    id: 18, category: 'safety', icon: '🚀', isPro: true,
    shortcut: 'Auto', setting: 'kuka.safety.initmovCheck',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'BAS(#INITMOV) Motion Init Guard', ru: 'Контроль инициализации BAS(#INITMOV)', tr: 'BAS(#INITMOV) Hareket Başlatma Kontrolü' },
    desc: { en: 'Verifies that every motion program properly calls BAS(#INITMOV, 0) before executing Cartesian moves.', ru: 'Проверяет наличие обязательного вызова BAS(#INITMOV, 0) перед любыми командами перемещения.', tr: 'Tüm hareket programlarının önce BAS(#INITMOV, 0) çağrısı yaptığını doğrular.' },
    benefit: { en: 'Prevents uncontrolled acceleration jumps caused by uninitialized motion interpolators.', ru: 'Исключает рывки и резкие удары при старте робота с неинициализированным профилем.', tr: 'Başlatılmamış hareket profillerinin neden olduğu kontrolsüz sarsıntıları önler.' },
    codeBefore: 'DEF Bad_Cycle()\n  PTP XHOME ; Missing BAS(#INITMOV)!',
    codeAfter: 'DEF Safe_Cycle()\n  BAS(#INITMOV, 0) ; ✓ Interpolator ready\n  PTP XHOME'
  },
  {
    id: 19, category: 'safety', icon: '🎯', isPro: true,
    shortcut: 'Auto', setting: 'kuka.safety.activeFrameCheck',
    media: '/media/KUKA COMMANDS.gif',
    title: { en: 'Unassigned Active Frame Guard ($TOOL / $BASE)', ru: 'Контроль назначения $TOOL и $BASE', tr: 'Atanmamış Aktif Frame Koruması ($TOOL / $BASE)' },
    desc: { en: 'Flags linear and PTP motions occurring prior to explicit $TOOL and $BASE assignment.', ru: 'Блокирует перемещения, если перед ними явно не задан активный инструмент $TOOL и база $BASE.', tr: 'Açık bir $TOOL ve $BASE tanımlanmadan yapılan hareket komutlarını uyarır.' },
    benefit: { en: 'Prevents catastrophic collisions from the robot driving with the wrong tool definition.', ru: 'Исключает аварии из-за движения робота по чужой системе координат.', tr: 'Yanlış takım koordinatıyla hareket edilmesinden kaynaklanan çarpmaları önler.' },
    codeBefore: 'LIN XPICK ; Danger: $TOOL not assigned!',
    codeAfter: '$TOOL = TOOL_DATA[1]\n$BASE = BASE_DATA[2]\nLIN XPICK'
  },

  // 20-27: Visual Flowcharts & Logic
  {
    id: 20, category: 'flowchart', icon: '📊', isPro: true,
    shortcut: 'Ctrl+Shift+P > Graph', setting: 'kuka.flowchart.autoGenerate',
    media: '/media/Control Flow Graph.gif',
    title: { en: 'Interactive Mermaid Flowchart Visualizer', ru: 'Интерактивные блок-схемы на базе Mermaid', tr: 'Etkileşimli Mermaid Akış Şeması' },
    desc: { en: 'Transforms intricate KRL logic into an interactive, clickable vector control flow diagram in real time.', ru: 'Мгновенно преобразует сложные программы KRL в интерактивную блок-схему логики процесса.', tr: 'Karmaşık KRL kodlarını gerçek zamanlı, etkileşimli vektörel akış şemalarına dönüştürür.' },
    benefit: { en: 'Allows new engineers to understand 5,000-line legacy programs in 5 minutes.', ru: 'Позволяет новому инженеру разобраться в сложной программе за 5 минут вместо целого дня.', tr: 'Yeni mühendislerin 5.000 satırlık karmaşık programları 5 dakikada anlamasını sağlar.' },
    codeBefore: '; Reading 20 nested IF-THEN-ELSE statements...',
    codeAfter: '; Visual flowchart rendered instantly in side panel'
  },
  {
    id: 21, category: 'flowchart', icon: '🖱️', isPro: true,
    shortcut: 'Click Node', setting: 'kuka.flowchart.bidirectional',
    media: '/media/Control Flow Graph.gif',
    title: { en: 'Bidirectional Graph-to-Code Jumping', ru: 'Двунаправленный переход Граф ↔ Код', tr: 'İki Yönlü Grafik ↔ Kod Atlaması' },
    desc: { en: 'Clicking any node in the flowchart jumps cursor straight to the corresponding line in the editor.', ru: 'Клик по любому блоку на схеме моментально переносит курсор на соответствующую строку в коде.', tr: 'Akış şemasındaki herhangi bir düğüme tıklandığında imleç doğrudan kod satırına gider.' },
    benefit: { en: 'Effortless debugging of deep decision trees and branching logic.', ru: 'Быстрый поиск нужной ветки условий при отладке последовательности ячейки.', tr: 'Karmaşık karar ağaçlarında hata ayıklamayı son derece kolaylaştırır.' },
    codeBefore: '; Manually searching for where an alarm was triggered',
    codeAfter: '✓ Click [AlarmNode] ➔ Jumps to line 412 in editor'
  },
  {
    id: 22, category: 'flowchart', icon: '🖼️', isPro: true,
    shortcut: 'Ctrl+Shift+P > Export SVG', setting: 'kuka.flowchart.exportSvg',
    media: '/media/cell_flowchart.svg',
    title: { en: 'Vector SVG Flowchart Export for Handover', ru: 'Экспорт блок-схем в векторный SVG для сдачи', tr: 'Teslimat İçin Vektörel SVG Akış Şeması Dışa Aktarma' },
    desc: { en: 'Export crisp, scalable vector diagrams suitable for customer documentation, Word, and PDF manuals.', ru: 'Экспорт схем в масштабируемый SVG для вставки в отчеты, инструкции и проектную документацию.', tr: 'Müşteri raporları ve teknik kılavuzlar için net, ölçeklenebilir SVG dışa aktarımı.' },
    benefit: { en: 'Saves days of drawing manual flowcharts in Visio during project handover.', ru: 'Экономит дни ручного рисования алгоритмов в Visio при сдаче проекта заказчику.', tr: 'Proje teslimlerinde Visio ile günlerce şema çizme zahmetini ortadan kaldırır.' },
    codeBefore: '; Manual redrawing of logic in MS Visio (8 hours)',
    codeAfter: '✓ 1-Click SVG Export: Complete cell diagram ready'
  },
  {
    id: 23, category: 'flowchart', icon: '🏷️', isPro: true,
    shortcut: 'Auto', setting: 'kuka.flowchart.showBadges',
    media: '/media/Control Flow Graph.gif',
    title: { en: 'Signal & Timer Badges in Flowchart', ru: 'Бейджи сигналов и таймеров в блок-схеме', tr: 'Akış Şemasında Sinyal ve Zamanlayıcı Rozetleri' },
    desc: { en: 'Renders dedicated I/O indicators ($IN, $OUT) and $TIMER values directly inside decision diamonds.', ru: 'Отображает номера задействованных сигналов и таймеров прямо внутри блоков условий.', tr: 'Koşul kutucukları içinde I/O sinyallerini ve zamanlayıcı değerlerini görsel olarak gösterir.' },
    benefit: { en: 'Instantly identifies which physical sensors control each step of the sequence.', ru: 'Наглядно видно, какие физические датчики управляют каждым шагом робота.', tr: 'Hangi sensörün robotun hangi adımını tetiklediğini bir bakışta gösterir.' },
    codeBefore: '; Condition: ($IN[14] && !$IN[15])',
    codeAfter: 'Node: [Part Check] ➔ IN[14]:ON, IN[15]:OFF'
  },
  {
    id: 24, category: 'flowchart', icon: '🌳', isPro: true,
    shortcut: 'Ctrl+Shift+P > Tree', setting: 'kuka.flowchart.callTree',
    media: '/media/Control Flow Graph.gif',
    title: { en: 'Subroutine Call-Tree Hierarchy', ru: 'Иерархическое дерево вызовов подпрограмм', tr: 'Alt Program Çağrı Ağacı Hiyerarşisi' },
    desc: { en: 'Visualizes the entire call tree starting from Cell.src down to individual gripping routines.', ru: 'Строит дерево вызовов всех подпрограмм ячейки, начиная от главного цикла Cell.src.', tr: 'Cell.src dosyasından en küçük alt programa kadar tüm çağrı hiyerarşisini görselleştirir.' },
    benefit: { en: 'Guarantees complete coverage when auditing cell execution sequences.', ru: 'Дает полную картину архитектуры ячейки перед внесением изменений.', tr: 'Değişiklik yapmadan önce hücrenin tüm kod mimarisini eksiksiz gösterir.' },
    codeBefore: '; Tracing nested subroutines manually through 15 files',
    codeAfter: 'Cell.src ➔ PickPart() ➔ GripClose() ➔ CheckVacuum()'
  },
  {
    id: 25, category: 'flowchart', icon: '🔀', isPro: false,
    shortcut: 'Auto', setting: 'kuka.flowchart.switchCase',
    media: '/media/Control Flow Graph.gif',
    title: { en: 'SWITCH-CASE Branch Isolation', ru: 'Изоляция ветвлений SWITCH-CASE', tr: 'SWITCH-CASE Dal İzolasyonu' },
    desc: { en: 'Breaks complex multi-variant part selectors (CASE 1..10) into clean parallel branches.', ru: 'Наглядно раскладывает селекторы типов деталей (SWITCH nPartType) на параллельные ветки.', tr: 'Çoklu parça seçim mantıklarını (CASE 1..10) temiz paralel kollara ayırır.' },
    benefit: { en: 'Ensures no part variant branch is missing default error handling.', ru: 'Гарантирует, что для каждого типа детали предусмотрена корректная обработка.', tr: 'Hiçbir parça tipinin hata durumunda açıkta kalmamasını sağlar.' },
    codeBefore: 'SWITCH nPartType\n  CASE 1: ...\n  CASE 2: ...',
    codeAfter: 'Branching diagram clearly displaying all 10 part routes'
  },
  {
    id: 26, category: 'flowchart', icon: '♾️', isPro: true,
    shortcut: 'Auto', setting: 'kuka.safety.infiniteLoopDetector',
    media: '/media/dead-code.gif',
    title: { en: 'Infinite Loop Lockup Detector', ru: 'Детектор зависающих бесконечных циклов', tr: 'Sonsuz Döngü Kilitlenme Dedektörü' },
    desc: { en: 'Flags LOOP/WHILE structures lacking exit conditions or WAIT instructions that would freeze the CPU.', ru: 'Находит циклы без условий выхода или пауз, приводящие к 100% загрузке процессора KRC.', tr: 'Çıkış koşulu veya bekleme komutu olmayan, CPU\'yu kilitleyecek döngüleri tespit eder.' },
    benefit: { en: 'Prevents controller watchdog resets during autonomous operation.', ru: 'Предотвращает зависание планировщика задач и сторожевого таймера робота.', tr: 'Robotun otonom çalışırken donmasını ve kilitlenmesini engeller.' },
    codeBefore: 'WHILE $IN[1] == FALSE\n  ; No wait! CPU freezes at 100%\nENDWHILE',
    codeAfter: 'WHILE $IN[1] == FALSE\n  WAIT SEC 0.05 ; ✓ Non-blocking polling\nENDWHILE'
  },
  {
    id: 27, category: 'flowchart', icon: '⏳', isPro: true,
    shortcut: 'Auto', setting: 'kuka.safety.waitTimeoutCheck',
    media: '/media/KRL IO Signals.gif',
    title: { en: 'WAIT Signal & Timeout Validator', ru: 'Валидатор условий WAIT FOR и таймаутов', tr: 'WAIT Sinyal ve Zaman Aşımı Doğrulayıcısı' },
    desc: { en: 'Flags bare WAIT FOR statements lacking timeout handlers that could freeze an automotive line.', ru: 'Находит блокирующие команды WAIT FOR без контроля таймаута, способные остановить заводскую линию.', tr: 'Hattın durmasına yol açabilecek zaman aşımı korumasız WAIT FOR komutlarını bulur.' },
    benefit: { en: 'Prevents silent cell lockups when hardware sensors fail to trigger.', ru: 'Исключает «мертвые» зависания ячейки при выходе из строя датчиков.', tr: 'Sensör arızalarında hücrenin sessizce kilitlenip kalmasını önler.' },
    codeBefore: 'WAIT FOR $IN[10] == TRUE ; Line stalls if sensor breaks',
    codeAfter: 'WAIT FOR $IN[10] == TRUE OR $TIMER_FLAG[1] ; With timeout'
  },

  // 28-35: SmartPAD Backups & Math
  {
    id: 28, category: 'backup', icon: '📦', isPro: true,
    shortcut: 'Ctrl+Shift+P > Diff', setting: 'kuka.backup.directZipDiff',
    media: '/media/KRC Backup Diff & Point Delta Inspector.gif',
    title: { en: 'SmartPAD ZIP Archive Direct Diff', ru: 'Прямое сравнение архивов SmartPAD .ZIP', tr: 'SmartPAD ZIP Arşivi Doğrudan Farkı' },
    desc: { en: 'Compares active development files directly against USB SmartPAD .ZIP archives without extraction.', ru: 'Сравнивает рабочий проект напрямую с архивным .ZIP бэкапом пульта без ручной распаковки.', tr: 'Dosyaları açmaya gerek kalmadan doğrudan USB .ZIP yedekleriyle karşılaştırır.' },
    benefit: { en: 'Instantly identifies unrecorded changes made by operators on the night shift.', ru: 'Моментально показывает, какие строчки и точки изменили на пульте операторы в ночную смену.', tr: 'Gece vardiyasında operatörler tarafından kumandada yapılan değişiklikleri anında bulur.' },
    codeBefore: '; Manually unzipping and searching through 400 files',
    codeAfter: '✓ Side-by-side diff with SmartPAD_Backup_2026.zip'
  },
  {
    id: 29, category: 'backup', icon: '📐', isPro: true,
    shortcut: 'Ctrl+Shift+P > Delta', setting: 'kuka.math.pointDeltaInspector',
    media: '/media/KRC Backup Diff & Point Delta Inspector.gif',
    title: { en: '6-Axis Point Delta Spatial Inspector', ru: '6-Осевой расчет дельты точек (ΔX, ΔY, ΔZ)', tr: '6 Eksenli Nokta Deltası Uzamsal Denetçisi' },
    desc: { en: 'Calculates exact coordinate deltas (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) between point versions and flags hazards.', ru: 'Рассчитывает точное пространственное смещение координат и углов между версиями одной точки.', tr: 'Nokta versiyonları arasındaki kesin sapmaları (ΔX, ΔY, ΔZ) ve açıları hesaplar.' },
    benefit: { en: 'Immediately flags unauthorized touch-ups exceeding safety tolerance thresholds.', ru: 'Подсвечивает красным опасные смещения точек (например, +12 мм), угрожающие аварией.', tr: 'Tolerans sınırlarını aşan tehlikeli nokta değişikliklerini kırmızıyla uyarır.' },
    codeBefore: '; Point modified on pendant: XPICK_PART',
    codeAfter: 'ΔX: +0.00mm, ΔY: +12.45mm (HAZARD SHIFT DETECTED)'
  },
  {
    id: 30, category: 'backup', icon: '🎯', isPro: true,
    shortcut: 'Ctrl+Shift+P > Calc', setting: 'kuka.math.frameCalculator',
    media: '/media/KUKA Control Center.gif',
    title: { en: '3-Point Base/Tool Frame Calculator', ru: '3-Точечный калькулятор фреймов $BASE / $TOOL', tr: '3 Noktalı Base/Tool Frame Hesaplayıcı' },
    desc: { en: 'Computes Euler orientation angles (A, B, C) and BASE_DATA structures from 3 physical touch points.', ru: 'Вычисляет углы Эйлера (A, B, C) и матрицу трансформации BASE_DATA по 3 замеренным точкам детали.', tr: '3 fiziksel temas noktasından Euler yönelim açılarını (A, B, C) ve BASE_DATA hesaplar.' },
    benefit: { en: 'Zero trigonometry errors when calibrating welding fixtures and stamping dies.', ru: 'Исключает математические ошибки при привязке сварочной оснастки и штампов.', tr: 'Fikstür ve kalıp kalibrasyonunda sıfır trigonometri hatası sağlar.' },
    codeBefore: '; Manual calculation of Euler angles on scratch paper...',
    codeAfter: 'DECL FRAME BASE_DATA[1] = {X 1250, Y 350, Z 820, A 0, B 0, C 0}'
  },
  {
    id: 31, category: 'backup', icon: '🔄', isPro: true,
    shortcut: 'Ctrl+Shift+P > TCP', setting: 'kuka.math.tcpInverter',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'Tool Center Point (TCP) Shift Inverter', ru: 'Инспектор пересчета TCP при замене инструмента', tr: 'Takım Merkezi (TCP) Kayma Dönüştürücüsü' },
    desc: { en: 'Recalculates point targets when a damaged welding torch or gripper is replaced with new offsets.', ru: 'Автоматически пересчитывает координаты всех точек траектории при изменении вылета инструмента.', tr: 'Hasar gören kaynak torcu veya tutucu değiştiğinde tüm yörüngeyi yeniden hesaplar.' },
    benefit: { en: 'Eliminates reteaching hundreds of weld seams after mechanical tool repair.', ru: 'Избавляет от необходимости заново обучать сотни точек сварки после ремонта горелки.', tr: 'Takım tamirinden sonra yüzlerce kaynak noktasını yeniden öğretme zahmetini bitirir.' },
    codeBefore: '; Retouching 150 points manually after torch change',
    codeAfter: '✓ 150 Points transformed automatically for new TCP'
  },
  {
    id: 32, category: 'backup', icon: '➗', isPro: false,
    shortcut: 'Auto', setting: 'kuka.math.geometricOperator',
    media: '/media/KUKA COMMANDS.gif',
    title: { en: 'Geometric Operator (Frame Multiplication)', ru: 'Помощник геометрического оператора (:)', tr: 'Geometrik Operatör (Frame Çarpımı) Yardımcısı' },
    desc: { en: 'Validates and visually models KRL frame transformations combining offsets via the colon operator (:).', ru: 'Проверяет правильность и последовательность перемножения систем координат через оператор двоеточия (:).', tr: 'İki koordinat sistemini birleştiren iki nokta üst üste (:) operatörünü doğrular.' },
    benefit: { en: 'Prevents inverted matrix transformations in dynamic palletizing offsets.', ru: 'Исключает ошибки направления смещений при динамическом расчете слоев паллеты.', tr: 'Dinamik paletleme hesaplarında ters yönde hareket hatalarını önler.' },
    codeBefore: 'fTarget = fOffset : fBase ; Wrong order!',
    codeAfter: 'fTarget = fBase : fOffset ; ✓ Validated frame product'
  },
  {
    id: 33, category: 'backup', icon: '📐', isPro: false,
    shortcut: 'Ctrl+Shift+P > Euler', setting: 'kuka.math.eulerConverter',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'Euler Angles & Quaternion Converter', ru: 'Конвертер углов Эйлера и кватернионов', tr: 'Euler Açıları ve Kuaterniyon Dönüştürücü' },
    desc: { en: 'Converts between KUKA Euler convention (A=Z, B=Y, C=X) and 3D vision sensor quaternions.', ru: 'Переводит ориентацию из формата систем технического зрения (кватернионы) в углы Эйлера KUKA.', tr: '3D kamera kuaterniyonlarını KUKA Euler açılarına (A=Z, B=Y, C=X) dönüştürür.' },
    benefit: { en: 'Seamless integration with Cognex, Photoneo, and Keyence 3D bin-picking cameras.', ru: 'Упрощает интеграцию 3D-камер технического зрения для захвата деталей из коробов.', tr: '3D robotik görme sistemleriyle sorunsuz entegrasyon sağlar.' },
    codeBefore: 'q = [0.707, 0, 0.707, 0] ; Camera orientation',
    codeAfter: 'Euler KUKA: {A 90.0, B 0.0, C 90.0}'
  },
  {
    id: 34, category: 'backup', icon: '🌀', isPro: true,
    shortcut: 'Auto', setting: 'kuka.safety.singularityCheck',
    media: '/media/type-validation-demo.gif',
    title: { en: 'Singularity & Axis Status/Turn Inspector', ru: 'Инспектор сингулярностей и статуса/поворота (S, T)', tr: 'Tekillik ve Eksen Durumu/Dönüş Denetçisi (S, T)' },
    desc: { en: 'Warns against wrist singularity postures (Axis 5 near 0°) during continuous linear moves.', ru: 'Предупреждает о прохождении через сингулярность 5-й оси (угол A5 близко к 0°) на линейных траекториях.', tr: 'Doğrusal hareketlerde 5. eksenin tekilliğe (A5 ≈ 0°) girmesini önceden bildirir.' },
    benefit: { en: 'Avoids violent high-speed axis whipping in singularity zones.', ru: 'Исключает резкие неконтролируемые развороты осей робота на максимальной скорости.', tr: 'Tekillik bölgelerinde eksenlerin kontrolsüz ve ani savrulmalarını önler.' },
    codeBefore: 'LIN XAPPROACH ; Axis 5 reaches 0.1° (Singularity trap)',
    codeAfter: '⚠️ WARNING: Axis 5 singularity on linear path near XAPPROACH'
  },
  {
    id: 35, category: 'backup', icon: '⚖️', isPro: true,
    shortcut: 'Ctrl+Shift+P > Load', setting: 'kuka.safety.loadDataValidator',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'Load Data & Inertia Validator (LOAD_DATA)', ru: 'Валидатор параметров нагрузки LOAD_DATA', tr: 'Yük ve Eylemsizlik Doğrulayıcısı (LOAD_DATA)' },
    desc: { en: 'Validates mass, center of gravity, and inertia moments to verify compliance with robot motor limits.', ru: 'Проверяет массу, центр тяжести и моменты инерции инструмента на соответствие паспорту робота.', tr: 'Takım kütlesini, ağırlık merkezini ve eylemsizlik momentlerini denetler.' },
    benefit: { en: 'Prevents motor overtemperature errors and extends gearbox lifespan.', ru: 'Предотвращает перегрев моторов и износ подшипников при тяжелых нагрузках.', tr: 'Motor aşırı ısınmalarını engeller ve redüktör ömrünü uzatır.' },
    codeBefore: 'LOAD_DATA[1]={M -1, CM {X 0,Y 0,Z 0}} ; Invalid negative mass',
    codeAfter: 'LOAD_DATA[1]={M 45.2, CM {X 12.1,Y 0.0,Z 180.4}} ; Verified'
  },

  // 36-42: Communication & IoT
  {
    id: 36, category: 'iot', icon: '📡', isPro: true,
    shortcut: 'Ctrl+Shift+P > EKI', setting: 'kuka.eki.xmlValidator',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'EthernetKRL (EKI) XML Schema Validator', ru: 'Валидатор XML схем EthernetKRL (EKI)', tr: 'EthernetKRL (EKI) XML Şema Doğrulayıcısı' },
    desc: { en: 'Validates EKI XML configuration schemas and telegram buffers for robot-to-server TCP/IP links.', ru: 'Проверяет синтаксис и валидность XML-схем передачи данных по протоколу EthernetKRL.', tr: 'Robot ile sunucu arasındaki TCP/IP veri paketlerini ve XML şemalarını denetler.' },
    benefit: { en: 'Fixes malformed XML telegram structures before field commissioning.', ru: 'Устраняет ошибки парсинга XML пакетов до подключения к реальному серверу.', tr: 'Gerçek bağlantı öncesinde hatalı XML paket yapılarını tespit eder.' },
    codeBefore: '<RECEIVE><ELEMENT Tag="Pose" Type="REAL"/> ; Unclosed tag',
    codeAfter: '<RECEIVE><ELEMENT Tag="Pose" Type="REAL"/></RECEIVE> ; ✓ Valid'
  },
  {
    id: 37, category: 'iot', icon: '🔌', isPro: true,
    shortcut: 'Ctrl+Shift+P > Fieldbus', setting: 'kuka.fieldbus.auditor',
    media: '/media/KRL IO Signals.gif',
    title: { en: 'Profinet & EtherCAT Signal Mapping Auditor', ru: 'Аудитор маппинга шин Profinet и EtherCAT', tr: 'Profinet ve EtherCAT Sinyal Eşleme Denetçisi' },
    desc: { en: 'Cross-audits configured fieldbus byte offsets with physical robot digital inputs and outputs.', ru: 'Сверяет адреса байтов в конфигурации промышленной сети с номерами сигналов в коде робота.', tr: 'Haberleşme veri baytlarını robotun fiziksel giriş çıkışlarıyla karşılaştırır.' },
    benefit: { en: 'Prevents signal displacement faults between PLC and robot controllers.', ru: 'Исключает сдвиг сигналов обмена между контроллером PLC и роботом.', tr: 'PLC ile robot arasındaki sinyal kayması hatalarını tamamen ortadan kaldırır.' },
    codeBefore: '; PLC byte 4 mapped to $IN[25] instead of $IN[33]',
    codeAfter: '✓ Byte Alignment Confirmed: PLC Word 2 ➔ $IN[17..32]'
  },
  {
    id: 38, category: 'iot', icon: '🤝', isPro: true,
    shortcut: 'Ctrl+Shift+P > Handshake', setting: 'kuka.templates.handshake',
    media: '/media/KUKA COMMANDS.gif',
    title: { en: 'PLC Handshake Protocol Generator', ru: 'Генератор протоколов квитирования PLC', tr: 'PLC El Sıkışma (Handshake) Protokol Üreticisi' },
    desc: { en: 'Generates robust Request-Acknowledge signal handshakes for Siemens S7 and Beckhoff TwinCAT.', ru: 'Генерирует надежный код обмена сигналами запрос-подтверждение для контроллеров Siemens и Beckhoff.', tr: 'Siemens S7 ve Beckhoff için güvenilir talep-onay sinyal rutinleri oluşturur.' },
    benefit: { en: 'Eliminates lost commands and race conditions during high-speed cell cycles.', ru: 'Исключает потерю команд и зависание протокола при быстром обмене данными.', tr: 'Hızlı hücre döngülerinde komut kayıplarını ve sinyal çakışmalarını önler.' },
    codeBefore: '; Ad-hoc signal toggling prone to race conditions',
    codeAfter: '; Safe 4-phase handshake with timeout recovery generated'
  },
  {
    id: 39, category: 'iot', icon: '☁️', isPro: true,
    shortcut: 'Ctrl+Shift+P > OPC', setting: 'kuka.templates.opcua',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'OPC UA & Modbus TCP Packet Templates', ru: 'Шаблоны телеметрии OPC UA и Modbus TCP', tr: 'OPC UA ve Modbus TCP Paket Şablonları' },
    desc: { en: 'Generates telemetry publishing routines transmitting real-time robot coordinates to SCADA dashboards.', ru: 'Генерирует готовые шаблоны отправки координат и статусов робота в диспетчерские SCADA и облако.', tr: 'Robot koordinatlarını SCADA ve bulut panolarına aktaran hazır şablonlar üretir.' },
    benefit: { en: 'Zero-effort Industrial IoT integration for Industry 4.0 production monitoring.', ru: 'Быстрое подключение робота к системам сбора производственной аналитики Industry 4.0.', tr: 'Endüstri 4.0 üretim izleme sistemlerine zahmetsiz entegrasyon.' },
    codeBefore: '; Writing socket routines from scratch',
    codeAfter: '✓ Complete OPC UA state publisher routine generated'
  },
  {
    id: 40, category: 'iot', icon: '🔄', isPro: false,
    shortcut: 'Ctrl+Shift+P > KVP', setting: 'kuka.kvp.formatter',
    media: '/media/KUKA COMMANDS.gif',
    title: { en: 'KUKAVARPROXY Protocol Formatter', ru: 'Форматтер протокола KUKAVARPROXY', tr: 'KUKAVARPROXY Protokol Biçimlendirici' },
    desc: { en: 'Formats and tests external variable read/write packets for Python and C# integration scripts.', ru: 'Форматирует пакеты удаленного чтения и записи переменных для интеграции с Python и C# скриптами.', tr: 'Python ve C# uygulamaları için harici değişken okuma paketlerini biçimlendirir.' },
    benefit: { en: 'Instant communication testing for custom vision and automated test benches.', ru: 'Упрощает тестирование обмена при разработке стендов и нестандартных систем.', tr: 'Özel test sistemleri ve kameralar için anında iletişim testi sağlar.' },
    codeBefore: 'RAW: 00 05 00 01 00 0A 24 4F 56 5F 50 52 4F',
    codeAfter: 'READ: $OV_PRO ➔ Value: 100%'
  },
  {
    id: 41, category: 'iot', icon: '📡', isPro: true,
    shortcut: 'Auto', setting: 'kuka.rsi.streamHelper',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'RobotSensorInterface (RSI) Stream Helper', ru: 'Помощник потоков RobotSensorInterface (RSI)', tr: 'RobotSensorInterface (RSI) Akış Yardımcısı' },
    desc: { en: 'Pre-configures real-time 4ms and 12ms deterministic correction channels for seam tracking.', ru: 'Настраивает детерминированные каналы коррекции 4мс и 12мс для лазерного слежения за швом.', tr: 'Lazer dikiş takibi için 4ms ve 12ms gerçek zamanlı düzeltme kanallarını yapılandırır.' },
    benefit: { en: 'Guarantees deterministic cycle timing without jitter or communication dropouts.', ru: 'Гарантирует стабильное время цикла без задержек и потери управляющих пакетов.', tr: 'Gecikme veya paket kaybı olmadan kararlı gerçek zamanlı kontrol sağlar.' },
    codeBefore: '; Manual XML channel configuration with timing jitter',
    codeAfter: '✓ Deterministic 4ms RSI interpolation channel validated'
  },
  {
    id: 42, category: 'iot', icon: '🦺', isPro: true,
    shortcut: 'Auto', setting: 'kuka.safety.dualChannelSafety',
    media: '/media/type-validation-demo.gif',
    title: { en: 'Safety I/O ($SAFEIN/$SAFEOUT) Dual-Channel Checker', ru: 'Проверка двухканальных сигналов $SAFEIN / $SAFEOUT', tr: 'Çift Kanallı Güvenlik Sinyali Denetimi ($SAFEIN)' },
    desc: { en: 'Validates redundant dual-channel safety signal pairings for light curtains and emergency stops.', ru: 'Проверяет парность и синхронность обработки сигналов безопасности световых барьеров и кнопок E-Stop.', tr: 'Işık bariyerleri ve acil durdurma butonları için çift kanallı sinyalleri denetler.' },
    benefit: { en: 'Ensures ISO 13849-1 Performance Level d/e safety compliance.', ru: 'Обеспечивает строгое соответствие нормам безопасности ISO 13849-1 (категория безопасности 4).', tr: 'ISO 13849-1 Seviye d/e endüstriyel güvenlik standartlarına uyum sağlar.' },
    codeBefore: 'IF $SAFEIN[1] == TRUE ; Incomplete single-channel check!',
    codeAfter: 'IF $SAFEIN[1] AND $SAFEIN[2] ; ✓ Dual-channel verified'
  },

  // 43-50: Enterprise & Git
  {
    id: 43, category: 'enterprise', icon: '🌿', isPro: false,
    shortcut: 'Ctrl+Shift+P > Git', setting: 'kuka.git.graph',
    media: '/media/Git Metadata Cleaner.gif',
    title: { en: 'Embedded KRL Git Graph & Branch Visualizer', ru: 'Встроенный KRL Git Graph и визуализатор веток', tr: 'Gömülü KRL Git Grafiği ve Dal Görselleştirici' },
    desc: { en: 'Visual branch and commit history viewer tuned specifically for multi-robot Git repositories.', ru: 'Наглядный график истории коммитов и веток, оптимизированный под репозитории робототехники.', tr: 'Robotik projeleri için özel olarak ayarlanmış görsel Git geçmişi ve dal görüntüleyici.' },
    benefit: { en: 'Enables safe collaboration between multiple commissioning engineers on site.', ru: 'Обеспечивает комфортную совместную работу нескольких наладчиков на объекте.', tr: 'Sahadaki birden fazla mühendisin güvenle eş zamanlı çalışmasını sağlar.' },
    codeBefore: '; Chaos with USB drives and conflicting file copies',
    codeAfter: '✓ Clean visual Git branches: main ➔ cell_welding ➔ tuning'
  },
  {
    id: 44, category: 'enterprise', icon: '🧹', isPro: false,
    shortcut: 'Shift+Alt+C', setting: 'kuka.git.cleanMetadata',
    media: '/media/Git Metadata Cleaner.gif',
    title: { en: 'WorkVisual Metadata Cleaner (&ACCESS, &REL)', ru: 'Очиститель метаданных WorkVisual (&ACCESS, &REL)', tr: 'WorkVisual Üstveri Temizleyici (&ACCESS, &REL)' },
    desc: { en: 'Strips noisy WorkVisual proprietary header lines (&ACCESS, &REL, &COMMENT) from git staging.', ru: 'Очищает служебные заголовки WorkVisual (&ACCESS RVP, &REL 1), которые засоряют историю коммитов.', tr: 'Git geçmişini kirleten gereksiz WorkVisual başlık satırlarını tek tıkla temizler.' },
    benefit: { en: 'Produces pristine Git diffs showing only real engineering code modifications.', ru: 'Оставляет в Git diff только реальные изменения алгоритмов без лишнего системного мусора.', tr: 'Git farklarında yalnızca gerçek mühendislik kod değişikliklerini gösterir.' },
    codeBefore: '&ACCESS RVP\n&REL 1\n&PARAM EDITMASK = *\nDEF MyProg()',
    codeAfter: 'DEF MyProg() ; ✓ Pure clean source code'
  },
  {
    id: 45, category: 'enterprise', icon: '🔎', isPro: false,
    shortcut: 'Ctrl+Shift+F', setting: 'kuka.search.cellScope',
    media: '/media/Find All References.gif',
    title: { en: 'Multi-Robot Station Mass Search & Replace', ru: 'Массовый поиск и замена по всей станции', tr: 'Çoklu Robot İstasyonu Toplu Arama ve Değiştirme' },
    desc: { en: 'Fast regex search across multiple robot folders in a single cell with KRL syntax filtering.', ru: 'Быстрый поиск с поддержкой регулярных выражений по каталогам всех роботов ячейки одновременно.', tr: 'Tek bir hücredeki tüm robot klasörlerinde hızlı ve akıllı arama yapın.' },
    benefit: { en: 'Renames shared signals across 8 robots in seconds without missing occurrences.', ru: 'Позволяет переименовать общий сигнал во всей группе роботов за пару секунд без ошибок.', tr: '8 robottaki ortak sinyal adlarını saniyeler içinde hatasız günceller.' },
    codeBefore: '; Opening 8 robot project folders one by one',
    codeAfter: '✓ Replaced $OUT[15] in 24 files across Robot_1..Robot_8'
  },
  {
    id: 46, category: 'enterprise', icon: '🚗', isPro: true,
    shortcut: 'Ctrl+Shift+P > OEM', setting: 'kuka.lint.oemStandards',
    media: '/media/type-validation-demo.gif',
    title: { en: 'Automotive Standard Linter (VASS, BMW, Integra)', ru: 'Линтер стандартов автоконцернов (VASS, BMW, Integra)', tr: 'Otomotiv Standartları Denetçisi (VASS, BMW, Integra)' },
    desc: { en: 'Validates compliance with German automotive OEM standards (VW VASS, BMW TMO, Mercedes Integra).', ru: 'Проверяет структуру программ и именование на соответствие немецким автомобильным стандартам.', tr: 'Alman otomotiv standartlarına (VW VASS, BMW TMO, Integra) tam uyumu denetler.' },
    benefit: { en: 'Guarantees first-time approval during official OEM factory buy-offs.', ru: 'Гарантирует успешную сдачу ячейки с первого раза без замечаний аудиторов автоконцерна.', tr: 'Fabrika kabul testlerinde (FAT/SAT) ilk seferde tam onay alınmasını sağlar.' },
    codeBefore: 'DEF my_routine() ; Rejected by VASS naming convention',
    codeAfter: 'DEF FB_CELL_START() ; ✓ Fully VASS 6/7 Compliant'
  },
  {
    id: 47, category: 'enterprise', icon: '⏱️', isPro: false,
    shortcut: 'Auto on Save', setting: 'kuka.git.cleanTimestamps',
    media: '/media/Git Metadata Cleaner.gif',
    title: { en: 'Automated .DAT Timestamp Touch-up Cleaner', ru: 'Подавление фиктивных правок времени в .DAT', tr: 'Otomatik .DAT Zaman Damgası Temizleyicisi' },
    desc: { en: 'Suppresses false git modifications caused by SmartPAD touching timestamps without coordinate changes.', ru: 'Игнорирует фиктивные изменения файлов, когда пульт робота просто перезаписывает дату без изменения точек.', tr: 'Kumandanın koordinat değişmeden sadece tarihi güncellemesiyle oluşan sahte farkları önler.' },
    benefit: { en: 'Eliminates hundreds of false merge conflicts in version control.', ru: 'Устраняет сотни ложных конфликтов слияния в Git репозиториях.', tr: 'Sürüm kontrolünde yüzlerce sahte birleştirme çakışmasını engeller.' },
    codeBefore: '; 40 .dat files marked modified only because of timestamp',
    codeAfter: '✓ 0 False changes: Only genuine coordinate shifts staged'
  },
  {
    id: 48, category: 'enterprise', icon: '📦', isPro: true,
    shortcut: 'Ctrl+Shift+P > Pack', setting: 'kuka.archive.builder',
    media: '/media/KRC Backup Diff & Point Delta Inspector.gif',
    title: { en: 'KUKA Deployment Archive Builder (.KRA / .ZIP)', ru: 'Сборщик архивов развертывания (.KRA / .ZIP)', tr: 'KUKA Dağıtım Arşivi Oluşturucu (.KRA / .ZIP)' },
    desc: { en: 'Bundles code files into official KUKA SmartPAD archive structures ready for direct USB restoration.', ru: 'Упаковывает файлы в правильную структуру папок KUKA, готовую к немедленной загрузке с флешки.', tr: 'Kodları kumandadan doğrudan geri yüklemeye hazır resmi KUKA arşiv yapısında paketler.' },
    benefit: { en: 'Zero "Corrupted Archive" errors when restoring backups on physical KRC controllers.', ru: 'Исключает ошибку «Архив поврежден» при попытке восстановления проекта на пульте.', tr: 'Fiziksel kumandada yedek yüklerken "Bozuk Arşiv" hatalarını önler.' },
    codeBefore: '; Manually zipping files into wrong folder depth',
    codeAfter: '✓ Valid KRC_Archive.zip ready for USB restore'
  },
  {
    id: 49, category: 'enterprise', icon: '🔑', isPro: false,
    shortcut: 'Ctrl+Shift+P > License', setting: 'kuka.license.manager',
    media: '/media/KUKA Control Center.gif',
    title: { en: 'Offline License Manager (Up to 3 Machines)', ru: 'Менеджер офлайн-лицензий (до 3 ПК)', tr: 'Çevrimdışı Lisans Yöneticisi (3 Bilgisayara Kadar)' },
    desc: { en: 'Manage offline activation keys with 1-click license transfer between commissioning laptops.', ru: 'Удобное управление ключом лицензии и перенос между рабочими компьютерами без интернета.', tr: 'Saha bilgisayarları arasında internet olmadan tek tıkla lisans aktarımı ve yönetimi.' },
    benefit: { en: 'Guaranteed license validity even inside electromagnetic-shielded plant basements.', ru: 'Гарантированная работа лицензии даже в экранированных цехах без связи.', tr: 'Hücre içinde internet kesilse bile lisansınızın kesintisiz çalışmasını garanti eder.' },
    codeBefore: '; Internet requirement stalls work in offline facility',
    codeAfter: '✓ Cached Offline License: Active on Field Laptop'
  },
  {
    id: 50, category: 'enterprise', icon: '🏭', isPro: false,
    shortcut: 'Ctrl+Shift+P > Snippets', setting: 'kuka.snippets.enabled',
    media: '/media/KUKA COMMANDS.gif',
    title: { en: 'Industrial Snippet Factory (40+ Patterns)', ru: 'Библиотека промышленных сниппетов (40+ шаблонов)', tr: 'Endüstriyel Kod Parçacığı Fabrikası (40+ Şablon)' },
    desc: { en: 'Rich library of pre-tested production templates for palletizing, spot welding, dispensing, and safety cycles.', ru: 'Коллекция из 40+ готовых промышленных шаблонов для паллетирования, точечной сварки, нанесения клея и т.д.', tr: 'Paletleme, punta kaynağı, yapıştırıcı ve güvenlik için 40+ hazır endüstriyel şablon.' },
    benefit: { en: 'Deploy new robotic stations up to 3x faster using certified production code patterns.', ru: 'Ускоряет программирование новых ячеек в 3 раза за счет проверенных на реальных заводах шаблонов.', tr: 'Sertifikalı kod şablonlarıyla yeni robotik hücreleri 3 kat daha hızlı devreye alın.' },
    codeBefore: '; Writing 200 lines of palletizing trigonometry from zero',
    codeAfter: '✓ Tab snippet "kuka-palletize" ➔ Complete verified pattern'
  }
]

const filteredFeatures = computed(() => {
  return features.filter(feat => {
    // Category match
    const matchesCat = activeCategory.value === 'all' || feat.category === activeCategory.value
    if (!matchesCat) return false

    // Search query match
    if (!searchQuery.value.trim()) return true
    const q = searchQuery.value.toLowerCase().trim()

    const titleEn = feat.title.en?.toLowerCase() || ''
    const titleRu = feat.title.ru?.toLowerCase() || ''
    const titleTr = feat.title.tr?.toLowerCase() || ''
    const descEn = feat.desc.en?.toLowerCase() || ''
    const descRu = feat.desc.ru?.toLowerCase() || ''
    const descTr = feat.desc.tr?.toLowerCase() || ''
    const shortcut = feat.shortcut?.toLowerCase() || ''
    const setting = feat.setting?.toLowerCase() || ''

    return titleEn.includes(q) || titleRu.includes(q) || titleTr.includes(q) ||
           descEn.includes(q) || descRu.includes(q) || descTr.includes(q) ||
           shortcut.includes(q) || setting.includes(q)
  })
})

const translations = {
  en: {
    backToLanding: 'Back to Main Landing',
    heroBadge: 'v1.7.3 Industrial Suite • 50 Core Tools',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Complete 50 Tools Encyclopedia',
    heroSubtitle: 'Exhaustive technical reference for all 50 industrial features, field commissioning benefits, keyboard shortcuts, configuration parameters, and before/after code examples.',
    statTotal: 'Total Tools',
    statCommunity: 'Community (Free)',
    statPro: 'Pro Industrial',
    statCategories: 'Categories',
    searchPlaceholder: 'Search 50 tools by name, shortcut, or config...',
    tabAll: 'All Tools',
    fieldBenefitLabel: 'Commissioning Benefit',
    clickToEnlarge: 'Click to expand media',
    viewDemo: 'View Demo',
    noResultsTitle: 'No tools match your query',
    noResultsDesc: 'Try adjusting your search terms or filter selection.',
    resetFilters: 'Reset Filters',
    close: 'Close'
  },
  ru: {
    backToLanding: 'Вернуться на главную',
    heroBadge: 'v1.7.3 Industrial Suite • 50 Промышленных Инструментов',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Полная Энциклопедия 50 Инструментов',
    heroSubtitle: 'Исчерпывающий технический разбор всех 50 функций расширения, пользы на пусконаладке, горячих клавиш, параметров settings.json и примеров кода «До / После».',
    statTotal: 'Всего Утилит',
    statCommunity: 'Бесплатно (Free)',
    statPro: 'Промышленные Pro',
    statCategories: 'Категорий',
    searchPlaceholder: 'Поиск по названию, шорткату или параметру...',
    tabAll: 'Все 50 инструментов',
    fieldBenefitLabel: 'Польза для инженера на объекте',
    clickToEnlarge: 'Нажмите для увеличения',
    viewDemo: 'Демо',
    noResultsTitle: 'Инструменты не найдены',
    noResultsDesc: 'Попробуйте изменить поисковый запрос или сбросить фильтр категории.',
    resetFilters: 'Сбросить фильтры',
    close: 'Закрыть'
  },
  tr: {
    backToLanding: 'Ana Sayfaya Dön',
    heroBadge: 'v1.7.3 Endüstriyel Paket • 50 Temel Araç',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Kapsamlı 50 Araç Ansiklopedisi',
    heroSubtitle: 'Tüm 50 endüstriyel özelliğin, saha devreye alma faydalarının, kısayolların, settings.json ayarlarının ve önce/sonra kod örneklerinin ayrıntılı teknik referansı.',
    statTotal: 'Toplam Araç',
    statCommunity: 'Topluluk (Ücretsiz)',
    statPro: 'Pro Endüstriyel',
    statCategories: 'Kategori',
    searchPlaceholder: 'İsme, kısayola veya ayara göre 50 araçta ara...',
    tabAll: 'Tüm Araçlar',
    fieldBenefitLabel: 'Saha Devreye Alma Faydası',
    clickToEnlarge: 'Medyayı büyütmek için tıklayın',
    viewDemo: 'Demoyu Gör',
    noResultsTitle: 'Aramanızla eşleşen araç bulunamadı',
    noResultsDesc: 'Arama terimlerini değiştirmeyi veya kategori filtresini sıfırlamayı deneyin.',
    resetFilters: 'Filtreleri Sıfırla',
    close: 'Kapat'
  }
}

const text = computed(() => translations[langKey.value] || translations.en)
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
