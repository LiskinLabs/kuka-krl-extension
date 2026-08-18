<template>
  <div class="kuka-features-wiki font-sans text-gray-200 selection:bg-kuka-orange selection:text-white pb-24">
    
    <!-- Hero Header -->
    <header class="relative pt-12 pb-16 overflow-hidden">
      <!-- Ambient Glows -->
      <div class="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-orange-600/20 via-amber-500/10 to-orange-700/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div class="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <!-- Top Badge -->
        <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-kuka-orange/30 text-xs sm:text-sm text-kuka-orange font-mono font-medium mb-6 backdrop-blur-md shadow-lg shadow-orange-500/10">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-kuka-orange"></span>
          </span>
          <span>{{ text.heroBadge }}</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-none">
          {{ text.heroTitlePrefix }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange via-amber-400 to-orange-500 drop-shadow-[0_0_25px_rgba(255,102,0,0.3)]">
            {{ text.heroTitleHighlight }}
          </span>
        </h1>

        <p class="max-w-3xl text-lg sm:text-xl text-gray-400 mx-auto mb-10 font-normal leading-relaxed">
          {{ text.heroSubtitle }}
        </p>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="glass-panel p-4 rounded-xl border border-kuka-orange/20 text-center hover:border-kuka-orange/50 transition-all">
            <div class="text-3xl font-black text-white font-mono">26</div>
            <div class="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statTotal }}</div>
          </div>
          <div class="glass-panel p-4 rounded-xl border border-emerald-500/20 text-center hover:border-emerald-500/50 transition-all">
            <div class="text-3xl font-black text-emerald-400 font-mono">15</div>
            <div class="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statCommunity }}</div>
          </div>
          <div class="glass-panel p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-500/50 transition-all">
            <div class="text-3xl font-black text-amber-400 font-mono">11</div>
            <div class="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statPro }}</div>
          </div>
          <div class="glass-panel p-4 rounded-xl border border-kuka-orange/20 text-center hover:border-kuka-orange/50 transition-all">
            <div class="text-3xl font-black text-white font-mono">350+</div>
            <div class="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statKSS }}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Interactive Control Bar (Search + Filter Tabs) -->
    <div class="sticky top-16 z-30 py-4 backdrop-blur-xl bg-[#0d1117]/85 border-y border-gray-800/80 shadow-2xl mb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="text.searchPlaceholder"
            class="w-full bg-[#161b22] text-white placeholder-gray-500 text-sm rounded-xl px-4 py-2.5 pl-10 border border-gray-700 focus:outline-none focus:border-kuka-orange focus:ring-1 focus:ring-kuka-orange transition-all"
          />
          <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-3 text-gray-400 hover:text-white text-xs">
            ✕
          </button>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          <button
            @click="activeCategory = 'all'"
            :class="[
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border',
              activeCategory === 'all'
                ? 'bg-kuka-orange text-white border-kuka-orange shadow-lg shadow-orange-500/25'
                : 'bg-[#161b22] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
            ]"
          >
            {{ text.tabAll }} ({{ features.length }})
          </button>

          <button
            @click="activeCategory = 'community'"
            :class="[
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border flex items-center gap-1.5',
              activeCategory === 'community'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/25'
                : 'bg-[#161b22] text-emerald-400/80 border-gray-800 hover:text-emerald-300 hover:border-emerald-500/40'
            ]"
          >
            <span>🟢</span> {{ text.tabCommunity }} (15)
          </button>

          <button
            @click="activeCategory = 'pro'"
            :class="[
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border flex items-center gap-1.5',
              activeCategory === 'pro'
                ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-600/25'
                : 'bg-[#161b22] text-amber-400/80 border-gray-800 hover:text-amber-300 hover:border-amber-500/40'
            ]"
          >
            <span>👑</span> {{ text.tabPro }} (11)
          </button>

          <button
            @click="activeCategory = 'shortcut'"
            :class="[
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border flex items-center gap-1.5',
              activeCategory === 'shortcut'
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/25'
                : 'bg-[#161b22] text-blue-400/80 border-gray-800 hover:text-blue-300 hover:border-blue-500/40'
            ]"
          >
            <span>⌨️</span> {{ text.tabShortcut }}
          </button>
        </div>

        <!-- View Switcher -->
        <div class="hidden sm:flex items-center gap-1 bg-[#161b22] p-1 rounded-lg border border-gray-800">
          <button
            @click="viewMode = 'grid'"
            :class="['p-1.5 rounded text-xs transition-colors', viewMode === 'grid' ? 'bg-kuka-orange text-white' : 'text-gray-400 hover:text-white']"
            title="Grid view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="['p-1.5 rounded text-xs transition-colors', viewMode === 'list' ? 'bg-kuka-orange text-white' : 'text-gray-400 hover:text-white']"
            title="Compact list view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Main Content Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Empty State -->
      <div v-if="filteredFeatures.length === 0" class="text-center py-20 bg-[#161b22]/50 rounded-2xl border border-gray-800">
        <div class="text-4xl mb-4">🔍</div>
        <h3 class="text-xl font-bold text-white mb-2">{{ text.noResultsTitle }}</h3>
        <p class="text-gray-400 text-sm mb-6">{{ text.noResultsDesc }}</p>
        <button @click="searchQuery = ''; activeCategory = 'all'" class="px-4 py-2 bg-kuka-orange text-white rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors">
          {{ text.resetFilters }}
        </button>
      </div>

      <!-- GRID VIEW MODE -->
      <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <article
          v-for="feat in filteredFeatures"
          :key="feat.id"
          :id="'feature-' + feat.id"
          class="glass-panel group relative rounded-2xl border border-gray-800/80 bg-[#11161d]/90 hover:border-kuka-orange/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(255,102,0,0.15)]"
        >
          <!-- Accent Top Bar -->
          <div :class="['h-1.5 w-full', feat.isPro ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600' : 'bg-gradient-to-r from-emerald-500 to-teal-400']"></div>

          <div class="p-6 sm:p-7 flex-grow">
            
            <!-- Card Header Meta -->
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-3">
                <span class="font-mono text-sm font-bold px-2.5 py-1 rounded-md bg-[#1c232d] text-gray-400 border border-gray-700/60">
                  #{{ String(feat.id).padStart(2, '0') }}
                </span>
                
                <span
                  :class="[
                    'text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono flex items-center gap-1 border',
                    feat.isPro
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  ]"
                >
                  <span v-if="feat.isPro">👑 PRO INDUSTRIAL</span>
                  <span v-else>🟢 COMMUNITY (FREE)</span>
                </span>
              </div>

              <!-- Shortcut Badge -->
              <span v-if="feat.shortcut" class="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-gray-800 text-amber-300 border border-gray-700/80 flex items-center gap-1">
                ⌨️ {{ feat.shortcut }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-xl sm:text-2xl font-bold text-white group-hover:text-kuka-orange transition-colors mb-3 leading-snug">
              {{ feat.title[langKey] }}
            </h2>

            <!-- Description -->
            <p class="text-gray-300 text-sm leading-relaxed mb-5">
              {{ feat.desc[langKey] }}
            </p>

            <!-- Field Benefit Callout -->
            <div v-if="feat.benefit" class="mb-5 p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/20 text-xs text-orange-200/90 leading-relaxed flex items-start gap-2.5">
              <span class="text-base flex-shrink-0">⚡</span>
              <div>
                <strong class="text-orange-400 font-semibold block mb-0.5">{{ text.fieldBenefitLabel }}:</strong>
                {{ feat.benefit[langKey] }}
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span
                v-for="tag in feat.tags"
                :key="tag"
                class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#18202a] text-gray-400 border border-gray-800"
              >
                #{{ tag }}
              </span>
            </div>

            <!-- Media Preview Block -->
            <div v-if="feat.media" class="mt-4">
              <div
                @click="openLightbox(feat.media, feat.title[langKey])"
                class="relative rounded-xl overflow-hidden border border-gray-800 bg-[#161b22] group/media cursor-pointer aspect-video flex items-center justify-center shadow-inner"
              >
                <img
                  :src="feat.media"
                  :alt="feat.title[langKey]"
                  class="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span class="text-xs text-white font-medium flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    <svg class="w-3.5 h-3.5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    {{ text.clickToEnlarge }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Before & After Comparison if available -->
            <div v-if="feat.mediaBefore" class="mt-4 grid grid-cols-2 gap-3">
              <div @click="openLightbox(feat.mediaBefore, 'Before Installation')" class="cursor-pointer group/b shadow border border-gray-800 rounded-xl overflow-hidden bg-[#161b22]">
                <div class="text-[10px] uppercase font-mono font-bold bg-gray-800 text-gray-400 px-2 py-0.5 text-center">Before (Plain)</div>
                <img :src="feat.mediaBefore" class="w-full aspect-video object-cover group-hover/b:scale-105 transition-transform" />
              </div>
              <div @click="openLightbox(feat.media, 'After Installation')" class="cursor-pointer group/a shadow border border-kuka-orange/30 rounded-xl overflow-hidden bg-[#161b22]">
                <div class="text-[10px] uppercase font-mono font-bold bg-orange-600/30 text-orange-300 px-2 py-0.5 text-center">After (High-Contrast)</div>
                <img :src="feat.media" class="w-full aspect-video object-cover group-hover/a:scale-105 transition-transform" />
              </div>
            </div>

          </div>

          <!-- Card Footer -->
          <div class="px-6 py-3 bg-[#0d1117]/80 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              KSS 8.3 / 8.5 / 8.6 / 8.7
            </span>

            <a v-if="feat.deepLink" :href="feat.deepLink" class="text-kuka-orange hover:underline font-sans font-semibold flex items-center gap-1">
              {{ text.deepDiveLink }} →
            </a>
          </div>
        </article>
      </div>

      <!-- COMPACT LIST VIEW MODE -->
      <div v-else class="space-y-3">
        <div
          v-for="feat in filteredFeatures"
          :key="feat.id"
          class="glass-panel p-4 rounded-xl border border-gray-800 bg-[#11161d] hover:border-kuka-orange/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div class="flex items-start md:items-center gap-4">
            <span class="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1c232d] text-gray-400 border border-gray-800">
              #{{ String(feat.id).padStart(2, '0') }}
            </span>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span :class="['text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono', feat.isPro ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400']">
                  {{ feat.isPro ? 'PRO' : 'FREE' }}
                </span>
                <h3 class="text-base font-bold text-white hover:text-kuka-orange transition-colors">
                  {{ feat.title[langKey] }}
                </h3>
              </div>
              <p class="text-xs text-gray-400 line-clamp-1 max-w-3xl">
                {{ feat.desc[langKey] }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 self-end md:self-center flex-shrink-0">
            <span v-if="feat.shortcut" class="font-mono text-xs px-2 py-1 bg-gray-800 text-amber-300 rounded border border-gray-700">
              {{ feat.shortcut }}
            </span>
            <button
              v-if="feat.media"
              @click="openLightbox(feat.media, feat.title[langKey])"
              class="px-3 py-1 bg-gray-800 hover:bg-kuka-orange text-white rounded text-xs transition-colors font-medium"
            >
              {{ text.viewDemo }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div v-if="lightboxImage" @click="lightboxImage = null" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 cursor-zoom-out">
        <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
          <div class="flex items-center justify-between w-full mb-3 text-white">
            <h3 class="text-lg font-bold text-kuka-orange">{{ lightboxTitle }}</h3>
            <button @click="lightboxImage = null" class="px-3 py-1 bg-gray-800 hover:bg-red-600 rounded text-sm transition-colors">
              ✕ {{ text.close }}
            </button>
          </div>
          <img :src="lightboxImage" class="max-w-full max-h-[80vh] object-contain rounded-xl border border-gray-800 shadow-2xl" @click.stop />
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const searchQuery = ref('')
const activeCategory = ref('all')
const viewMode = ref('grid')
const lightboxImage = ref(null)
const lightboxTitle = ref('')

const openLightbox = (img, title) => {
  lightboxImage.value = img
  lightboxTitle.value = title
}

// Compute language key
const langKey = computed(() => {
  if (lang.value === 'ru' || lang.value?.startsWith('ru')) return 'ru'
  if (lang.value === 'tr' || lang.value?.startsWith('tr')) return 'tr'
  return 'en'
})

// Text dictionary
const translations = {
  en: {
    heroBadge: 'v1.7.3 Industrial Suite • 26 Core Tools',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Complete Feature Wiki & Encyclopedia',
    heroSubtitle: 'Comprehensive technical reference for all 26 industrial features, keyboard shortcuts, field benefits, and interactive media demonstrations.',
    statTotal: 'Total Tools',
    statCommunity: 'Community (Free)',
    statPro: 'Pro Industrial',
    statKSS: 'KSS Variables',
    searchPlaceholder: 'Search 26 features by name, shortcut, KSS var...',
    tabAll: 'All Features',
    tabCommunity: 'Community',
    tabPro: 'Pro Edition',
    tabShortcut: 'Shortcuts Only',
    fieldBenefitLabel: 'Field Commissioning Benefit',
    clickToEnlarge: 'Click to expand media',
    deepDiveLink: 'Read Deep-Dive',
    viewDemo: 'View Media',
    noResultsTitle: 'No features match your query',
    noResultsDesc: 'Try adjusting your search terms or filter selection.',
    resetFilters: 'Reset Filters',
    close: 'Close'
  },
  ru: {
    heroBadge: 'v1.7.3 Industrial Suite • 26 Промышленных Инструментов',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Полная Энциклопедия и Справочник',
    heroSubtitle: 'Подробнейший технический разбор всех 26 функций расширения, горячих клавиш, практической пользы на пусконаладке и видеодемонстраций.',
    statTotal: 'Всего Инструментов',
    statCommunity: 'Бесплатные (Community)',
    statPro: 'Промышленные Pro',
    statKSS: 'Переменных KSS',
    searchPlaceholder: 'Поиск по 26 функциям, горячим клавишам, KSS...',
    tabAll: 'Все Инструменты',
    tabCommunity: 'Бесплатные',
    tabPro: 'Pro Инструменты',
    tabShortcut: 'С клавишами',
    fieldBenefitLabel: 'Практическая выгода на объекте',
    clickToEnlarge: 'Нажмите для увеличения',
    deepDiveLink: 'Подробный обзор',
    viewDemo: 'Просмотр Демо',
    noResultsTitle: 'Функции не найдены',
    noResultsDesc: 'Попробуйте изменить поисковый запрос или сбросить фильтры.',
    resetFilters: 'Сбросить фильтры',
    close: 'Закрыть'
  },
  tr: {
    heroBadge: 'v1.7.3 Industrial Suite • 26 Temel Özellik',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Eksiksiz Özellik Wiki ve Ansiklopedisi',
    heroSubtitle: '26 endüstriyel özelliğin tümü, klavye kısayolları, saha avantajları ve etkileşimli medya gösterimleri için kapsamlı teknik referans.',
    statTotal: 'Toplam Araç',
    statCommunity: 'Ücretsiz (Community)',
    statPro: 'Pro Endüstriyel',
    statKSS: 'KSS Değişkeni',
    searchPlaceholder: '26 özellik, kısayol veya KSS değişkeni ara...',
    tabAll: 'Tüm Özellikler',
    tabCommunity: 'Ücretsiz',
    tabPro: 'Pro Sürüm',
    tabShortcut: 'Yalnızca Kısayollar',
    fieldBenefitLabel: 'Saha Devreye Alma Avantajı',
    clickToEnlarge: 'Büyütmek için tıklayın',
    deepDiveLink: 'Detaylı İnceleme',
    viewDemo: 'Medyayı Gör',
    noResultsTitle: 'Eşleşen özellik bulunamadı',
    noResultsDesc: 'Arama terimlerinizi veya filtre seçiminizi ayarlamayı deneyin.',
    resetFilters: 'Filtreleri Sıfırla',
    close: 'Kapat'
  }
}

const text = computed(() => translations[langKey.value])

// Complete Data Array of all 26 Features
const features = [
  {
    id: 1,
    isPro: false,
    shortcut: '',
    title: {
      en: 'KRL Syntax Highlighting',
      ru: 'Синтаксическая подсветка KRL (Syntax Highlighting)',
      tr: 'KRL Sözdizimi Vurgulama'
    },
    desc: {
      en: 'Context-aware parsing of .src, .dat, and .sub files. Highlights data types (INT, REAL, BOOL, E6POS), system variables ($POS_ACT, $VEL.CP), and WorkVisual FOLD blocks.',
      ru: 'Контекстный парсинг файлов .src, .dat и .sub. Контрастная подсветка типов данных (INT, REAL, BOOL, E6POS), системных переменных ($POS_ACT, $VEL.CP) и блоков ;FOLD.',
      tr: '.src, .dat ve .sub dosyalarının bağlama duyarlı ayrıştırılması. Veri türlerini, sistem değişkenlerini ve FOLD bloklarını vurgular.'
    },
    benefit: {
      en: 'Syntax typos and unclosed string literals are caught visually before code reaches the physical robot controller.',
      ru: 'Опечатки в синтаксисе и незакрытые кавычки видна визуально до загрузки на физический контроллер робота.',
      tr: 'Sözdizimi hataları ve kapatılmamış dizeler, kod fiziksel robot denetleyicisine ulaşmadan önce görsel olarak yakalanır.'
    },
    media: '/media/syntax_after.png',
    mediaBefore: '/media/syntax_before.png',
    tags: ['Syntax', 'Highlighting', 'FOLD', 'WorkVisual']
  },
  {
    id: 2,
    isPro: false,
    shortcut: 'Ctrl+K Ctrl+T',
    title: {
      en: '6 Exclusive KUKA Color Themes',
      ru: '6 Наборов Эксклюзивных Тем KUKA',
      tr: '6 Özel KUKA Renk Teması'
    },
    desc: {
      en: '6 contrast-optimized color themes for industrial laptops and SmartPAD screens: Industrial Dark (#FF6600), WorkVisual Dark/Light, Midnight OLED, Blueprint, Industrial Light.',
      ru: '6 контрастных тем оформления для работы на промышленных ноутбуках при цеховом освещении и на экранах SmartPAD: Industrial Dark (#FF6600), WorkVisual Dark/Light, Midnight OLED, Blueprint.',
      tr: 'Endüstriyel dizüstü bilgisayarlar ve SmartPAD ekranları için 6 özel renk teması.'
    },
    benefit: {
      en: 'Reduces eye strain under harsh factory lighting and saves laptop battery in field environments.',
      ru: 'Снижает нагрузку на глаза при ярком заводском освещении и бережет батарею ноутбука в полевых условиях.',
      tr: 'Fabrika aydınlatması altında göz yorgunluğunu azaltır ve pil tasarrufu sağlar.'
    },
    media: '/media/kuka_theme_1.png',
    tags: ['Themes', 'UI', 'Industrial Dark', 'SmartPAD']
  },
  {
    id: 3,
    isPro: false,
    shortcut: '$ (Trigger)',
    title: {
      en: 'Smart Autocomplete (350+ KSS 8.7 Variables)',
      ru: 'Умное Автодополнение (350+ Переменных KSS 8.7)',
      tr: 'Akıllı Otomatik Tamamlama (350+ KSS Değişkeni)'
    },
    desc: {
      en: 'Instant dropdown trigger covering 350+ KSS system variables ($POS_ACT, $VEL_ACT, $BASE, $TOOL, $IN, $OUT), data structures, and user subroutines.',
      ru: 'Мгновенное автодополнение при вводе $ по 350+ системным переменным KSS ($POS_ACT, $VEL_ACT, $BASE, $TOOL, $IN, $OUT), структурам данных и подпрограммам.',
      tr: '350+ KSS sistem değişkeni ve kullanıcı alt programları için anında açılır menü.'
    },
    benefit: {
      en: 'Eliminates the need to consult paper manuals or memorize exact system structure spellings.',
      ru: 'Исключает необходимость открывать бумажные руководства или помнить наизусть имена системных структур KUKA.',
      tr: 'Kağıt kılavuzlara başvurma veya sistem yapısı yazımlarını ezberleme ihtiyacını ortadan kaldırır.'
    },
    media: '/media/smart_autocomplete.gif',
    tags: ['Autocomplete', 'KSS 8.7', 'System Variables']
  },
  {
    id: 4,
    isPro: false,
    shortcut: '',
    title: {
      en: 'Trilingual NLS Localization (EN / RU / TR)',
      ru: 'Мультиязычность NLS (Русский / English / Türkçe)',
      tr: 'Üç Dilli Yerelleştirme (EN / RU / TR)'
    },
    desc: {
      en: 'Native internationalization of hover documentation, diagnostics, context menus, TreeViews, and Control Center.',
      ru: 'Полная локализация интерфейса, всплывающих подсказок Hover, сообщений об ошибках, меню и боковых панелей на 3 языка.',
      tr: 'Hover belgeleri, teşhisler, bağlam menüleri ve Control Center için tam yerel dil desteği.'
    },
    benefit: {
      en: 'Enables seamless collaboration across multinational robotics commissioning teams in Europe, Turkey, and Central Asia.',
      ru: 'Обеспечивает комфортную работу международных команд робототехников на автозаводах в Европе, Турции и СНГ.',
      tr: 'Avrupa ve Türkiye otomotiv fabrikalarındaki uluslararası ekipler arasında kesintisiz işbirliği sağlar.'
    },
    media: '',
    tags: ['i18n', 'English', 'Русский', 'Türkçe']
  },
  {
    id: 5,
    isPro: false,
    shortcut: 'Inline Overlay',
    title: {
      en: 'Hardware Signal Inlay Hints ($IN / $OUT)',
      ru: 'Подсказки Сигналов Inlay Hints ($IN / $OUT)',
      tr: 'Donanım Sinyali İpucu İpuçları ($IN / $OUT)'
    },
    desc: {
      en: 'Virtual inline overlay showing signal comment names (e.g. $IN[1] : diPartReady) pulled live from .dat declarations without modifying source code.',
      ru: 'Виртуальный прозрачный текст рядом с физическими каналами ($IN[1] : diPartReady), считывающий комментарии из .dat файлов без изменения исходного кода.',
      tr: 'Kaynak kodu değiştirmeden .dat açıklamalarından canlı olarak çekilen sinyal yorum adlarını gösteren sanal metin.'
    },
    benefit: {
      en: 'Engineers see exact sensor and valve assignments right inside logic files without opening signal mapping tables.',
      ru: 'Инженер видит назначение датчиков и клапанов прямо в логическом коде, не переключаясь на таблицы сигналов.',
      tr: 'Mühendisler, sinyal eşleme tablolarını açmadan mantık dosyalarının tam içinde sensör atamalarını görür.'
    },
    media: '/media/inlay_hints.gif',
    deepLink: '/guide/inlay-hints',
    tags: ['Inlay Hints', 'I/O', 'Signals', 'Hardware']
  },
  {
    id: 6,
    isPro: false,
    shortcut: 'Mouse Hover',
    title: {
      en: 'Hover Documentation & Read/Write Status',
      ru: 'Подсказки при Наведении & Права Доступа (Read/Write)',
      tr: 'Üzerine Gelme Belgeleri ve Okuma/Yazma Durumu'
    },
    desc: {
      en: 'Hovering over variables displays official KSS limits, descriptions, and Read-Only vs Read-Write access permissions.',
      ru: 'Всплывающая карточка при наведении на системные переменные с описанием из документации KSS, границами значений и правами записи.',
      tr: 'Değişkenlerin üzerine gelindiğinde resmi KSS sınırları ve Okuma/Yazma erişim izinleri görüntülenir.'
    },
    benefit: {
      en: 'Prevents runtime crashes caused by trying to write into read-only system variables (like $POS_ACT).',
      ru: 'Предотвращает попытки записи в переменные только для чтения (например $POS_ACT) до загрузки на KRC.',
      tr: 'Salt okunur değişkenlere yazmaya çalışmanın neden olduğu çalışma zamanı çökmelerini önler.'
    },
    media: '/media/hover_info.gif',
    tags: ['Hover', 'KSS Docs', 'Read/Write', 'Permissions']
  },
  {
    id: 7,
    isPro: false,
    shortcut: 'F12 / Ctrl+Click',
    title: {
      en: 'Cross-File Navigation (.src ↔ .dat Go-to-Definition)',
      ru: 'Кросс-Файловая Навигация (.src ↔ .dat F12)',
      tr: 'Dosyalar Arası Gezinme (.src ↔ .dat Definition)'
    },
    desc: {
      en: 'Instant jump from point references in .src logic directly to exact E6POS declaration coordinates inside .dat file.',
      ru: 'Мгновенный переход по F12 от вызова точки в файле алгоритма .src к месту ее объявления и координат E6POS в .dat.',
      tr: '.src mantığındaki nokta referanslarından doğrudan .dat dosyasındaki E6POS koordinatlarına anında geçiş.'
    },
    benefit: {
      en: 'Accelerates navigation across complex KRL programs with split logic and data structures.',
      ru: 'Ускоряет навигацию по крупным проектам KRL с раздельным хранением кода и данных.',
      tr: 'Bölünmüş mantık ve veri yapılarına sahip karmaşık KRL programlarında gezinmeyi hızlandırır.'
    },
    media: '/media/goto_definition.gif',
    tags: ['Go-to-Definition', 'F12', 'Navigation', 'SRC/DAT']
  },
  {
    id: 8,
    isPro: false,
    shortcut: 'Shift+Alt+F12',
    title: {
      en: 'Find All References Across Workspace',
      ru: 'Поиск всех ссылок (Find All References)',
      tr: 'Tüm Referansları Bul (Shift+Alt+F12)'
    },
    desc: {
      en: 'Side panel listing every single usage of a target variable, point, or subroutine across all project workspace files.',
      ru: 'Выплывающая панель со всеми местами использования переменной, точки или подпрограммы по всему проекту.',
      tr: 'Tüm proje dosyalarında bir değişkenin veya alt programın her bir kullanımını listeleyen yan panel.'
    },
    benefit: {
      en: 'Safe refactoring and point deletion audits prior to program modification.',
      ru: 'Безопасный рефакторинг и аудит точек перед их модификацией или удалением.',
      tr: 'Program değişikliğinden önce güvenli yeniden yapılandırma ve nokta silme denetimleri.'
    },
    media: '/media/find_all_references.gif',
    tags: ['References', 'Refactoring', 'Workspace Search']
  },
  {
    id: 9,
    isPro: false,
    shortcut: 'Shift+Alt+F',
    title: {
      en: 'Global KRL Code Formatter',
      ru: 'Глобальный Форматировщик Кода KRL',
      tr: 'Küresel KRL Kod Biçimlendirici'
    },
    desc: {
      en: 'Standardizes assignment = alignments, indents IF/FOR/WHILE logic loops, and formats ;FOLD / ;ENDFOLD blocks.',
      ru: 'Автоматически выравнивает присвоения =, строит лесенку отступов для циклов IF/FOR/WHILE и выравнивает блоки ;FOLD.',
      tr: 'Atama eşitlemelerini standartlaştırır, IF/FOR/WHILE döngülerini girintiler ve FOLD bloklarını biçimlendirir.'
    },
    benefit: {
      en: 'Converts legacy unformatted factory code into clean, readable industrial code standards.',
      ru: 'Превращает неаккуратный старый код с заводов в ухоженный промышленный стандарт.',
      tr: 'Biçimlendirilmemiş eski fabrika kodunu temiz, okunabilir endüstriyel kod standartlarına dönüştürür.'
    },
    media: '/media/code_formatter.gif',
    tags: ['Formatter', 'Clean Code', 'Indentation', 'FOLD']
  },
  {
    id: 10,
    isPro: false,
    shortcut: 'Toolbar Icons',
    title: {
      en: 'Quick Fold / Unfold Toolbar Buttons',
      ru: 'Быстрое Сворачивание Блоков FOLD',
      tr: 'Hızlı FOLD Katlama / Açma Düğmeleri'
    },
    desc: {
      en: 'Top editor toolbar icons for 1-click collapse (krl.foldAll) or expansion (krl.unfoldAll) of WorkVisual Inline Forms.',
      ru: 'Кнопки 🙈 и 📖 в верхней панели редактора для мгновенного сворачивания или разворачивания всех блоков FOLD.',
      tr: 'WorkVisual FOLD bloklarını 1 tıklamayla daraltmak veya genişletmek için üst düzenleyici simgeleri.'
    },
    benefit: {
      en: 'Hides thousands of lines of inline form generated code to focus purely on high-level logic.',
      ru: 'Скрывает тысячи строк сгенерированного кода FOLD, фокусируя инженера на бизнес-логике.',
      tr: 'Yalnızca üst düzey mantığa odaklanmak için binlerce satırlık FOLD kodunu gizler.'
    },
    media: '/media/quick_fold_toolbar.gif',
    tags: ['FOLD', 'Toolbar', 'Code Collapse']
  },
  {
    id: 11,
    isPro: false,
    shortcut: 'Activity Bar Panel',
    title: {
      en: 'KUKA COMMANDS TreeView Sidebar',
      ru: 'Дерево Команд KUKA COMMANDS',
      tr: 'KUKA COMMANDS Ağaç Görünümü Paneli'
    },
    desc: {
      en: 'Activity Bar sidebar panel categorizing all extension tools into 4 categories: Tools, Network, Cleaning, Reports.',
      ru: 'Боковая панель со структурированным деревом команд расширения (Инструменты, Сеть, Очистка, Отчеты).',
      tr: 'Tüm uzantı araçlarını 4 kategoride sınıflandıran Activity Bar yan paneli.'
    },
    benefit: {
      en: 'Quick access to all KRL extension features without opening Command Palette.',
      ru: 'Быстрый доступ ко всем функциям расширения без поиска в Command Palette.',
      tr: 'Komut Paletini açmadan tüm KRL uzantı özelliklerine hızlı erişim.'
    },
    media: '/media/kuka_commands.gif',
    tags: ['Sidebar', 'TreeView', 'Commands', 'Activity Bar']
  },
  {
    id: 12,
    isPro: false,
    shortcut: 'Activity Bar Panel',
    title: {
      en: 'KRL I/O Signals Management Panel',
      ru: 'Панель Входов и Выходов KRL I/O Signals',
      tr: 'KRL I/O Sinyalleri Yönetim Paneli'
    },
    desc: {
      en: 'Interactive panel listing all workspace $IN, $OUT, and SIGNAL declarations with live search and comment inspection.',
      ru: 'Панель для обзора всех входов/выходов ($IN, $OUT, SIGNAL) проекта с поиском и просмотром комментариев.',
      tr: 'Canlı arama ile tüm $IN, $OUT ve SIGNAL açıklamalarını listeleyen etkileşimli panel.'
    },
    benefit: {
      en: 'Find physical signal channels instantly across huge multi-cell robotic projects.',
      ru: 'Мгновенный поиск каналов сигналов в крупных проектах роботизированных ячеек.',
      tr: 'Büyük çok hücreli robotik projelerde fiziksel sinyal kanallarını anında bulun.'
    },
    media: '/media/krl_io_signals.gif',
    tags: ['I/O', 'Signals', 'TreeView', 'Hardware']
  },
  {
    id: 13,
    isPro: false,
    shortcut: 'Command Palette',
    title: {
      en: 'Unused Variable Cleaner',
      ru: 'Очистка Неиспользуемых Переменных .dat',
      tr: 'Kullanılmayan Değişken Temizleyici'
    },
    desc: {
      en: 'Command (KRL: Clean Up Unused Variables) scanning .dat files for unreferenced DECL statements and removing them safely.',
      ru: 'Команда сканирования .dat файлов и удаления неиспользуемых объявлений DECL без повреждения метаданных.',
      tr: '.dat dosyalarını taranarak kullanılmayan DECL bildirimlerini güvenle siler.'
    },
    benefit: {
      en: 'Reduces data file bloat and keeps robot memory clean.',
      ru: 'Уменьшает размер файлов данных и сохраняет память контроллера чистой.',
      tr: 'Veri dosyası şişkinliğini azaltır ve robot belleğini temiz tutar.'
    },
    media: '',
    tags: ['Cleaner', 'DAT', 'Refactoring', 'Memory']
  },
  {
    id: 14,
    isPro: false,
    shortcut: 'Command Palette',
    title: {
      en: 'WorkVisual Git Metadata Cleaner',
      ru: 'Очистка Метаданных Git (WorkVisual Cleaner)',
      tr: 'WorkVisual Git Meta Veri Temizleyici'
    },
    desc: {
      en: 'Strips WorkVisual IDE header noise (&ACCESS RVP, &REL 1, &PARAM) to keep Git commits focused purely on logic changes.',
      ru: 'Удаляет мусорные метаданные WorkVisual (&ACCESS RVP, &REL 1, &PARAM) из заголовков для чистых коммитов в Git.',
      tr: 'Git komitlerini yalnızca mantık değişikliklerine odaklamak için WorkVisual başlık gürültüsünü temizler.'
    },
    benefit: {
      en: 'Prevents massive Git diff noise caused by WorkVisual line timestamp modifications.',
      ru: 'Исключает гигантский шум в Git diff от изменений временных меток WorkVisual.',
      tr: 'WorkVisual zaman damgası değişikliklerinin neden olduğu büyük Git fark gürültüsünü önler.'
    },
    media: '/media/git_metadata_cleaner.gif',
    tags: ['Git', 'WorkVisual', 'Clean Code', 'Diff']
  },
  {
    id: 15,
    isPro: false,
    shortcut: 'Command Palette',
    title: {
      en: 'Sort Declarations in Data Files',
      ru: 'Сортировка Объявлений в .dat Файлах',
      tr: 'Veri Dosyalarında Bildirimleri Sırala'
    },
    desc: {
      en: 'Sorts data type declarations (INT, REAL, BOOL, E6POS) in .dat files alphabetically and by category.',
      ru: 'Сортирует объявления типов данных (INT, REAL, BOOL, E6POS) в .dat файлах по алфавиту и категориям.',
      tr: '.dat dosyalarındaki veri türü bildirimlerini alfabetik olarak ve kategoriye göre sıralar.'
    },
    benefit: {
      en: 'Maintains structured data order inside data modules.',
      ru: 'Поддерживает идеальный порядок в модулях данных.',
      tr: 'Veri modülleri içinde yapılandırılmış veri sırasını korur.'
    },
    media: '/media/sort_declarations.gif',
    tags: ['DAT', 'Sorting', 'Structure', 'Clean Code']
  },
  // PRO FEATURES (16 - 26)
  {
    id: 16,
    isPro: true,
    shortcut: 'krl.openControlCenter',
    title: {
      en: 'KUKA Control Center Dashboard (v1.8.5 Hub)',
      ru: 'Дашборд KUKA Control Center (Pro Hub)',
      tr: 'KUKA Control Center Kontrol Paneli'
    },
    desc: {
      en: 'Centralized Fluent UI hub providing 1-click access to all Pro tools, workspace health metrics, license manager, and Telegram support.',
      ru: 'Центральный дашборд Fluent UI для быстрого вызова всех Pro-инструментов, показателей здоровья проекта и поддержки.',
      tr: 'Tüm Pro araçlarına, sağlık metriklerine ve desteğe 1 tıklamayla erişim sağlayan merkezi kontrol paneli.'
    },
    benefit: {
      en: 'Command center for automation team leads managing multiple robot project files.',
      ru: 'Командный центр для лидов автоматизации, управляющих проектами роботов.',
      tr: 'Birden fazla robot proje dosyasını yöneten otomasyon ekip liderleri için komuta merkezi.'
    },
    media: '/media/kuka_control_center.gif',
    tags: ['Control Center', 'Dashboard', 'Pro Hub', 'GUI']
  },
  {
    id: 17,
    isPro: true,
    shortcut: 'krl.openTelegramChat',
    title: {
      en: 'VS Code Telegram Support Chat Panel',
      ru: 'Встроенный Чат Поддержки Telegram в VS Code',
      tr: 'VS Code Telegram Destek Sohbet Paneli'
    },
    desc: {
      en: 'Embedded support window linked with @kukakrlbot for sending feedback, logs, and screenshots directly to developers.',
      ru: 'Встроенное окно чата с ботом @kukakrlbot для отправки отчетов, логов и скриншотов создателю расширения.',
      tr: 'Geri bildirim ve günlükleri doğrudan geliştiricilere göndermek için @kukakrlbot ile bağlantılı sohbet penceresi.'
    },
    benefit: {
      en: 'Instant technical help during field commissioning right from inside VS Code.',
      ru: 'Мгновенная техническая помощь прямо на объекте пусконаладки из редактора.',
      tr: 'Saha devreye alma sırasında doğrudan VS Code içinden anında teknik yardım.'
    },
    media: '',
    tags: ['Telegram', 'Support', 'Chat', 'Helpdesk']
  },
  {
    id: 18,
    isPro: true,
    shortcut: 'Standalone App',
    title: {
      en: 'Autonomous Helpdesk App (KukaAdminHelpdesk.exe)',
      ru: 'Автономная Консоль Админа (KukaAdminHelpdesk.exe)',
      tr: 'Bağımsız Admin Yardım Masası Uygulaması'
    },
    desc: {
      en: 'Standalone Windows admin console for lead automation engineers to monitor workspace statuses (ONLINE / IDLE / OFFLINE).',
      ru: 'Автономное Windows-приложение для мониторинга статусов инженеров на объекте (ONLINE / IDLE / OFFLINE).',
      tr: 'Mühendis çalışma alanı durumlarını izlemek için bağımsız Windows yönetim konsolu.'
    },
    benefit: {
      en: 'Enterprise engineering team oversight and license deployment tracking.',
      ru: 'Контроль за выездной бригадой инженеров и учет промышленных лицензий.',
      tr: 'Kurumsal mühendislik ekibi gözetimi ve lisans dağıtım takibi.'
    },
    media: '',
    tags: ['Enterprise', 'Helpdesk', 'Admin', 'Monitoring']
  },
  {
    id: 19,
    isPro: true,
    shortcut: 'Command Palette',
    title: {
      en: 'KRC Backup Diff & Point Delta Inspector',
      ru: 'Сравнение Бэкапов KRC Diff & Дельта Точек (ΔX,ΔY,ΔZ)',
      tr: 'KRC Yedekleme Farkı ve Nokta Delta Denetçisi'
    },
    desc: {
      en: 'Loads SmartPAD KRC4/KRC5 .zip backup archives, compares against local code, and calculates coordinate deltas (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC).',
      ru: 'Загружает .zip бэкапы SmartPAD KRC4/KRC5, сравнивает с локальным кодом и рассчитывает дельту физических координат точек.',
      tr: 'KRC4/KRC5 .zip yedek arşivlerini yükler ve fiziksel koordinat deltalarını hesaplar.'
    },
    benefit: {
      en: 'Prevents robot collisions caused by unverified point touch-ups on the SmartPAD teach pendant.',
      ru: 'Предотвращает столкновения робота из-за несанкционированных подправленных точек на SmartPAD.',
      tr: 'SmartPAD teach pendant üzerindeki doğrulanmamış nokta düzeltmelerinin neden olduğu robot çarpışmalarını önler.'
    },
    media: '/media/krc_backup_diff.gif',
    deepLink: '/guide/backup-diff',
    tags: ['KRC Diff', 'Backup', 'Safety', 'Deltas', 'Collisions']
  },
  {
    id: 20,
    isPro: true,
    shortcut: 'GUI Builder',
    title: {
      en: 'Interactive Motion Trajectory Generator',
      ru: 'Генератор Траекторий Движения & TCP Jerk Profiles',
      tr: 'Etkileşimli Hareket Yörüngesi Oluşturucu'
    },
    desc: {
      en: '2-column GUI builder for KUKA motions (PTP, LIN, CIRC, SPTP, SLIN, SPLINE). Generates real-time vector SVG scheme diagrams with TCP jerk profiles.',
      ru: 'Интерактивный GUI-конструктор траекторий движения KUKA с генерацией векторных SVG-схем и профилей рывка TCP.',
      tr: 'KUKA hareketleri için canlı SVG şema diyagramları oluşturan 2 sütunlu GUI oluşturucu.'
    },
    benefit: {
      en: 'Visualizes robot motion blending parameters (C_PTP, C_DIS) before driving real axes.',
      ru: 'Визуализирует сглаживание траектории (C_PTP, C_DIS) до запуска физических осей.',
      tr: 'Gerçek eksenleri sürmeden önce robot hareket yumuşatma parametrelerini görselleştirir.'
    },
    media: '',
    tags: ['Trajectory', 'Motion', 'SVG', 'Jerk Profile']
  },
  {
    id: 21,
    isPro: true,
    shortcut: 'krl.showFlowchart',
    title: {
      en: 'Interactive Flowchart Viewer (Control Flow Graph)',
      ru: 'Интерактивные Блок-Схемы (Control Flow Graph)',
      tr: 'Etkileşimli Akış Şeması Görüntüleyici'
    },
    desc: {
      en: 'Converts .src program logic into clean Mermaid SVG control flow graphs. Click subprograms to drill down, export SVG for customer sign-off.',
      ru: 'Преобразует алгоритм .src в наглядную векторную блок-схему Mermaid SVG с возможностью провала в подпрограммы и экспорта.',
      tr: '.src program mantığını temiz Mermaid SVG akış şemalarına dönüştürür. Alt programlara tıklayarak detaylara inin.'
    },
    benefit: {
      en: 'Generates client-ready documentation and simplifies debugging of complex cell logic.',
      ru: 'Создает готовую документацию для заказчика и упрощает отладку сложных циклов ячейки.',
      tr: 'Müşteriye hazır dokümantasyon oluşturur ve karmaşık hücre mantığının hata ayıklamasını basitleştirir.'
    },
    media: '/media/control_flow_graph.gif',
    deepLink: '/guide/flowchart',
    tags: ['Flowchart', 'Mermaid', 'SVG', 'Graph']
  },
  {
    id: 22,
    isPro: true,
    shortcut: 'GUI Suite',
    title: {
      en: 'EthernetKRL (EKI) XML Suite & Handler Generator',
      ru: 'Сюит EthernetKRL (EKI) XML & Генератор Обработчиков',
      tr: 'EthernetKRL (EKI) XML Paketi ve Oluşturucu'
    },
    desc: {
      en: 'Validates EthernetKRL XML communication schemas and automatically generates KRL networking modules (EKI_Init, EKI_Open, EKI_Get*).',
      ru: 'Валидирует схемы XML-связи EthernetKRL и автоматически генерирует сетевые модули KRL.',
      tr: 'EthernetKRL XML iletişim şemalarını doğrular ve otomatik olarak KRL ağ modüllerini oluşturur.'
    },
    benefit: {
      en: 'Saves hours of writing repetitive Socket communication boilerplate for PLC and Vision integration.',
      ru: 'Экономит часы ручного написания сетевых сокетов для связи с ПЛК и техническим зрением.',
      tr: 'PLC ve Vision entegrasyonu için tekrarlayan Soket iletişim kodlarını yazarken saatler kazandırır.'
    },
    media: '',
    tags: ['EKI', 'EthernetKRL', 'XML', 'Sockets', 'PLC']
  },
  {
    id: 23,
    isPro: true,
    shortcut: 'KRL: Run Safety Check',
    title: {
      en: 'Industrial Safety & Velocity Diagnostics',
      ru: 'Промышленная Диагностика Безопасности и Скоростей',
      tr: 'Endüstriyel Güvenlik ve Hız Teşhisleri'
    },
    desc: {
      en: 'Automated safety inspector alerting on excessive velocity ($VEL.CP > 3.0 m/s), uninitialized $TOOL/$BASE, and invisible non-ASCII characters.',
      ru: 'Автоматический инспектор безопасности, предупреждающий об опасной скорости ($VEL.CP > 3.0 м/с), незаданном $TOOL и русской раскладке.',
      tr: 'Aşırı hız ($VEL.CP > 3.0 m/s) ve başlatılmamış $TOOL/$BASE uyarıları veren otomatik güvenlik denetçisi.'
    },
    benefit: {
      en: 'Prevents mechanical hardware crashes and safety interlock trip outages.',
      ru: 'Предотвращает аппаратные аварии оборудования и выбивание контуров безопасности.',
      tr: 'Mekanik donanım çökmelerini ve güvenlik kilitlenme kesintilerini önler.'
    },
    media: '/media/kuka_control_center.gif',
    deepLink: '/guide/diagnostics',
    tags: ['Diagnostics', 'Safety', 'Velocity', 'Compiler']
  },
  {
    id: 24,
    isPro: true,
    shortcut: '@kuka AI Commands',
    title: {
      en: 'AI-Supportive Domain Context Tools (@kuka)',
      ru: 'Контекстные Инструменты для ИИ-Ассистентов (@kuka)',
      tr: 'Yapay Zeka Destekli Alan Bağlam Araçları (@kuka)'
    },
    desc: {
      en: 'Grounding tools for AI assistants (Antigravity IDE / Copilot) providing exact KSS 8.7 AST, I/O matrices, and safety audit reports.',
      ru: 'Инструменты заземления контекста для ИИ-ассистентов, передающие точное дерево AST KSS 8.7 и отчеты безопасности.',
      tr: 'Yapay zeka asistanları için KSS 8.7 AST ve güvenlik raporları sağlayan bağlam araçları.'
    },
    benefit: {
      en: 'Allows AI coding assistants to write 100% valid KRL code without syntax hallucinations.',
      ru: 'Позволяет ИИ-помощникам генерировать 100% валидный код KRL без галлюцинаций в синтаксисе.',
      tr: 'Yapay zeka kodlama asistanlarının sözdizimi halüsinasyonları olmadan %100 geçerli KRL kodu yazmasını sağlar.'
    },
    media: '',
    tags: ['AI Context', 'Copilot', 'Antigravity', 'AST']
  },
  {
    id: 25,
    isPro: true,
    shortcut: 'krl.showCalculator',
    title: {
      en: '3-Point Frame Calculator (BASE & TOOL Math)',
      ru: '3D Калькулятор Фреймов Баз и Инструментов (BASE & TOOL)',
      tr: '3 Noktalı Frame Hesaplayıcı (BASE & TOOL)'
    },
    desc: {
      en: '3D geometric frame transformation tool calculating BASE_DATA[x] Euler angles (A, B, C) from 3 recorded points (Origin, X-Axis, XY-Plane).',
      ru: 'Инструмент трехмерных гео-трансформаций для расчета углов Эйлера (A, B, C) системы координат по 3 реперным точкам.',
      tr: '3 kaydedilmiş noktadan BASE_DATA Euler açılarını (A, B, C) hesaplayan 3D geometrik dönüştürme aracı.'
    },
    benefit: {
      en: 'Calculates physical base offset matrices mathematically directly on site.',
      ru: 'Рассчитывает матрицы смещения баз прямо на объекте без обращения к стороннему ПО CAD.',
      tr: 'Fiziksel baz ofset matrislerini doğrudan sahada matematiksel olarak hesaplar.'
    },
    media: '',
    tags: ['Frame Calculator', '3D Math', 'Euler', 'BASE']
  },
  {
    id: 26,
    isPro: true,
    shortcut: 'Command Palette',
    title: {
      en: 'Quality Acceptance Report Generator',
      ru: 'Генератор Актов и Отчетов Качества Проекта',
      tr: 'Kalite Kabul Raporu Oluşturucu'
    },
    desc: {
      en: 'Generates comprehensive HTML/JSON project quality reports for client acceptance sign-off.',
      ru: 'Автоматически генерирует цифровой HTML/JSON отчет о качестве и готовности кода для сдачи заказчику.',
      tr: 'Müşteri kabulü için kapsamlı HTML/JSON proje kalite raporları oluşturur.'
    },
    benefit: {
      en: 'Accelerates formal project sign-off and commission documentation delivery.',
      ru: 'Ускоряет подписание актов сдачи-приемки работ на заводе заказчика.',
      tr: 'Resmi proje onayını ve devreye alma dokümantasyonu teslimatını hızlandırır.'
    },
    media: '',
    tags: ['Quality', 'Reports', 'Acceptance', 'HTML']
  }
]

// Computed filtered list based on Search & Tabs
const filteredFeatures = computed(() => {
  return features.filter(f => {
    // Category tab check
    if (activeCategory.value === 'community' && f.isPro) return false
    if (activeCategory.value === 'pro' && !f.isPro) return false
    if (activeCategory.value === 'shortcut' && !f.shortcut) return false

    // Search query check
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const title = f.title[langKey.value].toLowerCase()
      const desc = f.desc[langKey.value].toLowerCase()
      const benefit = f.benefit ? f.benefit[langKey.value].toLowerCase() : ''
      const tags = f.tags.join(' ').toLowerCase()
      const shortcut = f.shortcut.toLowerCase()

      return title.includes(q) || desc.includes(q) || benefit.includes(q) || tags.includes(q) || shortcut.includes(q)
    }

    return true
  })
})
</script>

<style scoped>
.glass-panel {
  background: rgba(17, 22, 29, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
