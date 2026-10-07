<template>
  <div class="kuka-features-wiki min-h-screen bg-[#07090e] text-[#F0F4F8] font-sans selection:bg-kuka-orange selection:text-white pb-24 transition-colors">
    
    <!-- Cyberpunk Ambient Grid Overlay -->
    <div class="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px]"></div>
    
    <!-- Ambient Radial Glows -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-orange-600/15 via-amber-500/10 to-orange-700/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>

    <!-- Top Breadcrumb / Return to Main Landing Bar & 6-Language Switcher -->
    <div class="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
      <a :href="withBase(langKey === 'en' ? '/' : `/${langKey}/`)" class="inline-flex items-center gap-2 text-gray-400 hover:text-kuka-orange transition-colors">
        <span>←</span>
        <span>{{ text.backToLanding }}</span>
      </a>

      <!-- 6-Language Switcher Pill -->
      <div class="inline-flex items-center gap-1 bg-[#0d121d] p-1 rounded-full border border-white/10 shadow-sm font-mono text-xs">
        <a :href="withBase('/guide/features')" :class="['px-2 py-0.5 rounded-full font-bold transition-all', langKey === 'en' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">EN</a>
        <a :href="withBase('/de/guide/features')" :class="['px-2 py-0.5 rounded-full font-bold transition-all', langKey === 'de' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">DE</a>
        <a :href="withBase('/es/guide/features')" :class="['px-2 py-0.5 rounded-full font-bold transition-all', langKey === 'es' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">ES</a>
        <a :href="withBase('/it/guide/features')" :class="['px-2 py-0.5 rounded-full font-bold transition-all', langKey === 'it' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">IT</a>
        <a :href="withBase('/ru/guide/features')" :class="['px-2 py-0.5 rounded-full font-bold transition-all', langKey === 'ru' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">RU</a>
        <a :href="withBase('/tr/guide/features')" :class="['px-2 py-0.5 rounded-full font-bold transition-all', langKey === 'tr' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">TR</a>
      </div>
    </div>

    <!-- Hero Header -->
    <header class="relative pt-8 sm:pt-12 pb-10 sm:pb-14 overflow-hidden z-10">
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

        <!-- Dynamic Live Stats Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto font-mono">
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-kuka-orange/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-white">{{ stats.total }}</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statTotal }}</div>
          </div>
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-emerald-500/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-emerald-400">{{ stats.community }}</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statCommunity }}</div>
          </div>
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-kuka-orange/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-kuka-orange">{{ stats.pro }}</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statPro }}</div>
          </div>
          <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 text-center hover:border-cyan-500/50 transition-all shadow-lg">
            <div class="text-2xl sm:text-3xl font-black text-cyan-400">{{ stats.categories }}</div>
            <div class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{{ text.statCategories }}</div>
          </div>
        </div>

      </div>
    </header>

    <!-- Sticky Filter & Search HUD Bar -->
    <div class="sticky top-0 z-40 py-3.5 backdrop-blur-xl bg-[#07090e]/90 border-y border-white/10 shadow-xl mb-8 sm:mb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        <!-- Search Input -->
        <div class="relative w-full md:w-96">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="text.searchPlaceholder"
            class="w-full bg-[#0d121d] text-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:border-kuka-orange focus:ring-1 focus:ring-kuka-orange outline-none transition-all placeholder:text-gray-500 font-mono shadow-inner"
          />
          <svg class="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs">✕</button>
        </div>

        <!-- Filter Scope Pills: All, Free, Pro -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto font-mono text-xs">
          <button 
            @click="filterTier = 'all'" 
            :class="['px-3 py-1.5 rounded-lg border transition-all', filterTier === 'all' ? 'bg-white/10 border-white/30 text-white font-bold' : 'border-white/5 text-gray-400 hover:text-white']">
            All ({{ allToolsList.length }})
          </button>
          <button 
            @click="filterTier = 'Free'" 
            :class="['px-3 py-1.5 rounded-lg border transition-all', filterTier === 'Free' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold' : 'border-white/5 text-gray-400 hover:text-white']">
            Free ({{ stats.community }})
          </button>
          <button 
            @click="filterTier = 'PRO'" 
            :class="['px-3 py-1.5 rounded-lg border transition-all', filterTier === 'PRO' ? 'bg-kuka-orange/20 border-kuka-orange/40 text-kuka-orange font-bold' : 'border-white/5 text-gray-400 hover:text-white']">
            Pro ({{ stats.pro }})
          </button>
        </div>

      </div>

      <!-- Category Filter Tabs -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
        <button
          @click="activeCategory = 'all'"
          :class="['px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border shrink-0', activeCategory === 'all' ? 'bg-kuka-orange text-white border-kuka-orange font-bold shadow-[0_0_10px_rgba(255,102,0,0.3)]' : 'bg-[#0d121d] text-gray-400 border-white/5 hover:text-white hover:border-white/10']">
          {{ text.tabAll }}
        </button>
        <button
          v-for="cat in categoryList"
          :key="cat"
          @click="activeCategory = cat"
          :class="['px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border shrink-0', activeCategory === cat ? 'bg-kuka-orange text-white border-kuka-orange font-bold shadow-[0_0_10px_rgba(255,102,0,0.3)]' : 'bg-[#0d121d] text-gray-400 border-white/5 hover:text-white hover:border-white/10']">
          {{ cat }} ({{ inventoryData.inventory[cat]?.length || 0 }})
        </button>
      </div>
    </div>

    <!-- Main Features Grid -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Counter & Results Status -->
      <div class="flex items-center justify-between mb-6 text-xs font-mono text-gray-400">
        <div>
          Showing <span class="text-white font-bold">{{ filteredFeatures.length }}</span> of {{ allToolsList.length }} verified capabilities
          <span v-if="searchQuery" class="text-kuka-orange"> (matching "{{ searchQuery }}")</span>
        </div>
      </div>

      <!-- Empty Results State -->
      <div v-if="filteredFeatures.length === 0" class="py-16 text-center rounded-3xl bg-[#0a0d14] border border-white/10">
        <div class="text-3xl mb-3">🔍</div>
        <h3 class="text-lg font-bold text-white mb-2">{{ text.noResultsTitle }}</h3>
        <p class="text-sm text-gray-400 max-w-md mx-auto mb-6">{{ text.noResultsDesc }}</p>
        <button 
          @click="resetFilters" 
          class="px-4 py-2 rounded-xl bg-kuka-orange hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md">
          {{ text.resetFilters }}
        </button>
      </div>

      <!-- Feature Cards Grid (Modern Bento Layout) -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(feat, idx) in filteredFeatures"
          :key="feat.id || idx"
          class="group relative rounded-2xl bg-[#0a0d14]/90 border border-white/10 hover:border-kuka-orange/50 p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(255,102,0,0.12)] hover:-translate-y-0.5">
          
          <!-- Card Header: Category & Pro/Free Badge -->
          <div>
            <div class="flex items-center justify-between gap-2 mb-3 font-mono text-[11px]">
              <span class="px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                {{ feat.category }}
              </span>
              <span 
                :class="['px-2 py-0.5 rounded-full font-bold border text-[10px]', feat.status === 'PRO' ? 'bg-orange-500/15 border-orange-500/30 text-kuka-orange' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400']">
                {{ feat.status === 'PRO' ? 'PRO' : 'COMMUNITY' }}
              </span>
            </div>

            <!-- Title & Type -->
            <h3 class="text-base font-bold text-white mb-2 group-hover:text-kuka-orange transition-colors">
              {{ feat.title }}
            </h3>

            <!-- Value Proposition -->
            <p class="text-xs text-gray-300 leading-relaxed mb-4">
              {{ feat.valueProposition }}
            </p>
          </div>

          <!-- Card Footer: Command Identifier / ID -->
          <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-1.5 text-gray-400 truncate max-w-[220px]">
              <span class="text-kuka-orange">cmd:</span>
              <code class="text-gray-300 text-[10px] select-all truncate">{{ feat.id }}</code>
            </div>
            
            <button 
              @click="copyCommand(feat.id)"
              :title="'Copy: ' + feat.id"
              class="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </button>
          </div>

        </div>
      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData, withBase } from 'vitepress'
import rawInventory from './krl_tools_inventory.json'

const { lang } = useData()
const langKey = computed(() => {
  const current = (lang.value || 'en').toLowerCase()
  if (current.startsWith('ru')) return 'ru'
  if (current.startsWith('de')) return 'de'
  if (current.startsWith('es')) return 'es'
  if (current.startsWith('it')) return 'it'
  if (current.startsWith('tr')) return 'tr'
  return 'en'
})

const searchQuery = ref('')
const activeCategory = ref('all')
const filterTier = ref('all') // 'all', 'Free', 'PRO'

const inventoryData = rawInventory

const categoryList = computed(() => {
  return Object.keys(inventoryData.inventory || {})
})

// Flatten all items with category injected
const allToolsList = computed(() => {
  const list = []
  if (!inventoryData.inventory) return list
  for (const [catName, items] of Object.entries(inventoryData.inventory)) {
    items.forEach(item => {
      list.push({
        ...item,
        category: catName
      })
    })
  }
  return list
})

const stats = computed(() => {
  const total = allToolsList.value.length
  const pro = allToolsList.value.filter(i => i.status === 'PRO').length
  const community = total - pro
  const categories = categoryList.value.length
  return { total, pro, community, categories }
})

const filteredFeatures = computed(() => {
  return allToolsList.value.filter(item => {
    // Tier filter
    if (filterTier.value !== 'all' && item.status !== filterTier.value) {
      return false
    }

    // Category filter
    if (activeCategory.value !== 'all' && item.category !== activeCategory.value) {
      return false
    }

    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const title = item.title?.toLowerCase() || ''
      const id = item.id?.toLowerCase() || ''
      const vp = item.valueProposition?.toLowerCase() || ''
      const cat = item.category?.toLowerCase() || ''
      return title.includes(q) || id.includes(q) || vp.includes(q) || cat.includes(q)
    }

    return true
  })
})

function resetFilters() {
  searchQuery.value = ''
  activeCategory.value = 'all'
  filterTier.value = 'all'
}

function copyCommand(id) {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(id)
  }
}

const translations = {
  en: {
    backToLanding: 'Back to Main Landing',
    heroBadge: 'v1.9.3 Industrial Suite • 159 Certified Tools & Capabilities',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Complete 159 Tools Encyclopedia',
    heroSubtitle: 'Exhaustive technical reference of all 159 verified language features, AST diagnostics, KRC backup diff utilities, trajectory math tools, and CI/CD automation rules.',
    statTotal: 'Total Tools',
    statCommunity: 'Community (Free)',
    statPro: 'Pro Industrial',
    statCategories: 'Categories',
    searchPlaceholder: 'Search 159 tools by name, command ID, or description...',
    tabAll: 'All Capabilities',
    noResultsTitle: 'No tools match your query',
    noResultsDesc: 'Try adjusting your search terms or filter selection.',
    resetFilters: 'Reset Filters'
  },
  de: {
    backToLanding: 'Zurück zur Hauptseite',
    heroBadge: 'v1.9.3 Industrie-Suite • 159 Zertifizierte Werkzeuge',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Vollständige Enzyklopädie (159 Tools)',
    heroSubtitle: 'Vollständige technische Referenz aller 159 verifizierten Sprachfunktionen, AST-Diagnosen, KRC-Backup-Diffs und Bahnberechnungstools.',
    statTotal: 'Gesamte Werkzeuge',
    statCommunity: 'Community (Kostenlos)',
    statPro: 'Pro Industrie',
    statCategories: 'Kategorien',
    searchPlaceholder: '159 Werkzeuge nach Name, Befehls-ID oder Beschreibung durchsuchen...',
    tabAll: 'Alle Funktionen',
    noResultsTitle: 'Keine Werkzeuge gefunden',
    noResultsDesc: 'Versuchen Sie, die Suchbegriffe oder Filter anzupassen.',
    resetFilters: 'Filter zurücksetzen'
  },
  es: {
    backToLanding: 'Volver a la página principal',
    heroBadge: 'Suite Industrial v1.9.3 • 159 Herramientas Certificadas',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Enciclopedia Completa de 159 Herramientas',
    heroSubtitle: 'Referencia técnica exhaustiva de las 159 características de lenguaje, diagnósticos AST, diferencias de respaldo KRC y cálculos cinemáticos.',
    statTotal: 'Total Herramientas',
    statCommunity: 'Comunidad (Gratis)',
    statPro: 'Pro Industrial',
    statCategories: 'Categorías',
    searchPlaceholder: 'Buscar en las 159 herramientas por nombre, comando o descripción...',
    tabAll: 'Todas las funciones',
    noResultsTitle: 'No se encontraron herramientas',
    noResultsDesc: 'Intente ajustar sus términos de búsqueda o filtros.',
    resetFilters: 'Restablecer filtros'
  },
  it: {
    backToLanding: 'Torna alla pagina principale',
    heroBadge: 'Suite Industriale v1.9.3 • 159 Strumenti Certificati',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Enciclopedia Completa di 159 Strumenti',
    heroSubtitle: 'Riferimento tecnico esaustivo di tutte le 159 funzionalità di linguaggio, diagnostica AST, differenze di backup KRC e calcoli di traiettoria.',
    statTotal: 'Totale Strumenti',
    statCommunity: 'Community (Gratis)',
    statPro: 'Pro Industriale',
    statCategories: 'Categorie',
    searchPlaceholder: 'Cerca tra i 159 strumenti per nome, comando o descrizione...',
    tabAll: 'Tutte le funzioni',
    noResultsTitle: 'Nessuno strumento trovato',
    noResultsDesc: 'Prova a modificare i termini di ricerca o la selezione dei filtri.',
    resetFilters: 'Reimposta filtri'
  },
  ru: {
    backToLanding: 'Вернуться на главную',
    heroBadge: 'v1.9.3 Industrial Suite • 159 Проверенных Инструментов и Возможностей',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Полная Энциклопедия 159 Инструментов',
    heroSubtitle: 'Исчерпывающий технический справочник всех 159 функций ядра, AST-диагностики, сравнения бэкапов KRC, математики траекторий и правил безопасности.',
    statTotal: 'Всего Утилит',
    statCommunity: 'Бесплатно (Free)',
    statPro: 'Промышленные Pro',
    statCategories: 'Категорий',
    searchPlaceholder: 'Поиск по названию, ID команды или описанию...',
    tabAll: 'Все 159 возможностей',
    noResultsTitle: 'Инструменты не найдены',
    noResultsDesc: 'Попробуйте изменить поисковый запрос или сбросить фильтр категории.',
    resetFilters: 'Сбросить фильтры'
  },
  tr: {
    backToLanding: 'Ana Sayfaya Dön',
    heroBadge: 'v1.9.3 Endüstriyel Paket • 159 Sertifikalı Araç ve Yetenek',
    heroTitlePrefix: 'KUKA KRL Professional — ',
    heroTitleHighlight: 'Kapsamlı 159 Araç Ansiklopedisi',
    heroSubtitle: 'Tüm 159 doğrulanmış dil özelliğinin, AST teşhisinin, KRC yedekleme farkı araçlarının ve yörünge matematiği kurallarının kapsamlı teknik referansı.',
    statTotal: 'Toplam Araç',
    statCommunity: 'Topluluk (Ücretsiz)',
    statPro: 'Pro Endüstriyel',
    statCategories: 'Kategori',
    searchPlaceholder: '159 araçta ada, komut kimliğine veya açıklamaya göre ara...',
    tabAll: 'Tüm Yetenekler',
    noResultsTitle: 'Aramanızla eşleşen araç bulunamadı',
    noResultsDesc: 'Arama terimlerini değiştirmeyi veya filtre seçimini sıfırlamayı deneyin.',
    resetFilters: 'Filtreleri Sıfırla'
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
