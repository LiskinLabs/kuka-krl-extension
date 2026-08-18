<template>
  <div class="kuka-landing min-h-screen bg-kuka-dark text-gray-200 selection:bg-kuka-orange selection:text-white pb-24 overflow-x-hidden">
    
    <!-- Language Switcher Bar -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-end items-center relative z-30">
      <div class="inline-flex items-center gap-1 bg-[#11161d]/90 backdrop-blur-md p-1.5 rounded-full border border-gray-800 shadow-xl">
        <span class="text-xs text-gray-400 pl-2 pr-1 font-mono flex items-center gap-1">
          <svg class="w-3.5 h-3.5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Language:
        </span>
        <a :href="withBase('/')" :class="['px-3 py-1 rounded-full text-xs font-bold transition-all', currentLang === 'en' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">EN</a>
        <a :href="withBase('/ru/')" :class="['px-3 py-1 rounded-full text-xs font-bold transition-all', currentLang === 'ru' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">RU</a>
        <a :href="withBase('/tr/')" :class="['px-3 py-1 rounded-full text-xs font-bold transition-all', currentLang === 'tr' ? 'bg-kuka-orange text-white shadow-md' : 'text-gray-400 hover:text-white']">TR</a>
      </div>
    </nav>

    <!-- Hero Section with Interactive Parallax Glow -->
    <header class="relative overflow-hidden pt-12 pb-24" @mousemove="handleMouseMove">
      <!-- Interactive Dynamic Glow Orb following mouse -->
      <div 
        class="absolute w-[650px] h-[650px] bg-gradient-to-r from-kuka-orange/20 via-amber-500/15 to-orange-600/10 rounded-full blur-[140px] pointer-events-none transition-all duration-300 ease-out"
        :style="{ left: `${glowX}px`, top: `${glowY}px`, transform: 'translate(-50%, -50%)' }"
      ></div>

      <!-- Cyber Grid Background -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <!-- Live Badges Row -->
        <div class="flex flex-wrap justify-center items-center gap-3 mb-8">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kuka-gray/90 border border-kuka-border text-xs sm:text-sm text-kuka-orange font-mono font-medium shadow-sm backdrop-blur-md">
            <span class="flex h-2 w-2 rounded-full bg-kuka-orange animate-pulse"></span>
            {{ t.heroBadge }}
          </div>
          <a href="https://secure.software/vscode/LiskinLabs.kuka-krl-extension" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-400 font-mono font-semibold hover:bg-emerald-500/20 transition-colors shadow-sm">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            Spectra Assure: PASSED (100% Clean)
          </a>
        </div>
        
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight" v-html="t.heroTitle"></h1>
        
        <p class="mt-4 max-w-3xl text-lg sm:text-xl text-gray-300 mx-auto mb-10 leading-relaxed font-normal" v-html="t.heroSubtitle"></p>
        
        <!-- Main CTAs -->
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a :href="withBase(t.wikiLink)" class="w-full sm:w-auto px-8 py-4 bg-kuka-orange hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,102,0,0.45)] flex items-center justify-center gap-2.5 shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            {{ t.openWiki }}
          </a>
          <a href="#pricing" class="w-full sm:w-auto px-8 py-4 bg-kuka-gray hover:bg-gray-800 text-white font-bold rounded-xl border border-kuka-border transition-all duration-200 hover:border-kuka-orange flex items-center justify-center gap-2">
            {{ t.getProKey }}
            <svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </a>
          <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-8 py-4 bg-kuka-gray/70 hover:bg-gray-800 text-white font-medium rounded-xl border border-kuka-border transition-all duration-200 flex items-center justify-center gap-2">
            {{ t.downloadFree }}
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.593 3.322c-.394-.271-.926-.237-1.28.083L12 7.228 7.687 3.405c-.354-.32-.886-.354-1.28-.083L.884 7.159c-.43.295-.494.908-.135 1.281l10.536 11.02a1.47 1.47 0 002.133.003L24 8.442c.36-.372.296-.985-.133-1.28L17.593 3.322zm-5.59 13.91l-7.794-8.15 4.542-3.13 3.252 2.89v8.39zm1.5-8.39l3.252-2.89 4.542 3.13-7.794 8.15v-8.39z"/></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Trust Badges Bar -->
    <section class="py-8 border-y border-kuka-border bg-kuka-darker/60 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-90">
        <div class="flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-gray-300">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          {{ t.secure100 }}
        </div>
        <div class="flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-gray-300">
          <svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ t.offlineFirst }}
        </div>
        <div class="flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-gray-300">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
          {{ t.builtFor }}
        </div>
        <div class="flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-gray-300">
          <span class="text-amber-400 text-base">⚡</span>
          KSS 8.3 / 8.6 / 8.7 Full AST
        </div>
      </div>
    </section>

    <!-- 🛡️ ReversingLabs Spectra Assure Security Verification Showcase -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1713]/90 to-[#0d1117]/90 relative overflow-hidden shadow-2xl">
        <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div class="lg:w-7/12 space-y-4 text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase">
              🛡️ Enterprise Security Certification
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
              {{ t.securityTitle }}
            </h2>
            <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
              {{ t.securityDesc }}
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div class="p-3 bg-[#131d18] rounded-xl border border-emerald-500/20 text-xs text-gray-300 font-mono">
                <span class="text-emerald-400 font-bold block text-sm">0 Malware</span> Clean binary scan
              </div>
              <div class="p-3 bg-[#131d18] rounded-xl border border-emerald-500/20 text-xs text-gray-300 font-mono">
                <span class="text-emerald-400 font-bold block text-sm">0 CVEs</span> 0 Vulnerabilities
              </div>
              <div class="p-3 bg-[#131d18] rounded-xl border border-emerald-500/20 text-xs text-gray-300 font-mono">
                <span class="text-emerald-400 font-bold block text-sm">0 Leaks</span> 0 Secret exposure
              </div>
            </div>
          </div>

          <div class="lg:w-5/12 w-full flex flex-col items-center justify-center p-6 bg-[#0a0f0d] rounded-2xl border border-emerald-500/30 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div>
              <div class="text-white font-bold text-lg">ReversingLabs Spectra Assure</div>
              <div class="text-emerald-400 font-mono font-bold text-sm">100% Security Health Score</div>
            </div>
            <a 
              href="https://secure.software/vscode/LiskinLabs.kuka-krl-extension" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <span>{{ t.viewSecurityReport }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 🎮 Interactive 5-in-1 Tool Inspector Widget -->
    <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">{{ t.toolInspectorTitle }}</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">{{ t.toolInspectorDesc }}</p>
      </div>

      <!-- Tab Buttons -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        <button
          v-for="(tab, i) in interactiveTabs"
          :key="i"
          @click="activeToolTab = i"
          :class="[
            'px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all border flex items-center gap-2',
            activeToolTab === i
              ? 'bg-kuka-orange text-white border-kuka-orange shadow-lg shadow-orange-500/25'
              : 'bg-[#11161d] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
          ]"
        >
          <span>{{ tab.icon }}</span>
          {{ tab.name[currentLang] }}
        </button>
      </div>

      <!-- Live Interactive Tab Content -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-kuka-border bg-[#11161d]/90 shadow-2xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5 space-y-4 text-left">
            <div class="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-kuka-orange font-mono text-xs font-bold uppercase border border-orange-500/20">
              Tool 0{{ activeToolTab + 1 }} • Pro Engine
            </div>
            <h3 class="text-2xl font-bold text-white">{{ interactiveTabs[activeToolTab].title[currentLang] }}</h3>
            <p class="text-gray-300 text-sm leading-relaxed">{{ interactiveTabs[activeToolTab].desc[currentLang] }}</p>
            <div class="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-xs text-orange-200">
              <strong class="text-orange-400 block mb-1">⚡ Factory Floor Impact:</strong>
              {{ interactiveTabs[activeToolTab].benefit[currentLang] }}
            </div>
            <a :href="withBase(interactiveTabs[activeToolTab].link)" class="inline-flex items-center gap-2 text-sm text-kuka-orange hover:text-orange-400 font-semibold pt-2">
              {{ t.readFullGuide }} →
            </a>
          </div>

          <div class="lg:col-span-7">
            <div class="rounded-2xl overflow-hidden border border-gray-800 bg-[#0d1117] shadow-xl relative aspect-video flex items-center justify-center">
              <img :src="withBase(interactiveTabs[activeToolTab].media)" :alt="interactiveTabs[activeToolTab].title[currentLang]" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase Features Grid -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
      <!-- Feature 1: Flowchart -->
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6 text-left">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f1Title }}</h2>
          <p class="text-lg text-gray-400 leading-relaxed">{{ t.f1Desc }}</p>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f1p1 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f1p2 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f1p3 }}</li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="glass-panel p-2 rounded-2xl overflow-hidden shadow-2xl relative group transform transition-transform hover:-translate-y-1">
            <div class="aspect-video bg-[#1e1e1e] rounded-xl flex flex-col items-center justify-center border border-kuka-border/50 relative overflow-hidden">
              <img :src="withBase('/media/control_flow_graph.gif')" alt="Interactive Flowchart Demo" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Feature 2: Diagnostics -->
      <div class="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div class="lg:w-1/2 space-y-6 text-left">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f2Title }}</h2>
          <p class="text-lg text-gray-400 leading-relaxed">{{ t.f2Desc }}</p>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f2p1 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f2p2 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f2p3 }}</li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="glass-panel p-2 rounded-2xl overflow-hidden shadow-2xl relative group transform transition-transform hover:-translate-y-1">
             <div class="aspect-video bg-[#1e1e1e] rounded-xl flex flex-col items-center justify-center border border-kuka-border/50 relative overflow-hidden">
              <img :src="withBase('/media/type-validation-demo.gif')" alt="Diagnostics and Safety Demo" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Feature 3: Backup Diff -->
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6 text-left">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f3Title }}</h2>
          <p class="text-lg text-gray-400 leading-relaxed">{{ t.f3Desc }}</p>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f3p1 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f3p2 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f3p3 }}</li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="glass-panel p-2 rounded-2xl overflow-hidden shadow-2xl relative group transform transition-transform hover:-translate-y-1">
            <div class="aspect-video bg-[#1e1e1e] rounded-xl flex flex-col items-center justify-center border border-kuka-border/50 relative overflow-hidden">
              <img :src="withBase('/media/krc_backup_diff.gif')" alt="KRC Backup Diff & Delta Inspector" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="py-24 bg-kuka-darker/80 border-y border-kuka-border relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">{{ t.compareTitle }}</h2>
          <p class="text-gray-400">{{ t.compareDesc }}</p>
        </div>
        
        <div class="glass-panel rounded-2xl overflow-hidden shadow-xl border border-kuka-border overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr class="bg-kuka-gray/50 border-b border-kuka-border text-gray-300">
                <th class="py-5 px-6 font-semibold w-1/2">{{ t.feature }}</th>
                <th class="py-5 px-6 font-semibold text-center border-l border-kuka-border w-1/4">Community (Free)</th>
                <th class="py-5 px-6 font-semibold text-center border-l border-kuka-border w-1/4 text-kuka-orange bg-kuka-orange/5">Pro Industrial</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-kuka-border text-gray-400">
              <tr v-for="(feat, i) in t.tableFeatures" :key="i" class="hover:bg-kuka-gray/30 transition-colors">
                <td class="py-4 px-6 font-medium text-gray-200">{{ feat.name }}</td>
                <td class="py-4 px-6 text-center">
                  <svg v-if="feat.free" class="w-5 h-5 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span v-else class="text-gray-600 font-bold">—</span>
                </td>
                <td class="py-4 px-6 text-center bg-kuka-orange/5">
                  <svg class="w-5 h-5 text-kuka-orange mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center mb-16 relative z-10">
        <h2 class="text-4xl font-bold text-white mb-4">{{ t.pricingTitle }}</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">{{ t.pricingDesc }}</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10 items-stretch">
        
        <!-- Community (Free) -->
        <div class="glass-panel p-8 rounded-2xl flex flex-col hover:border-gray-500 transition-colors border border-kuka-border text-left">
          <h3 class="text-xl font-bold text-white mb-2">{{ t.p0Name }}</h3>
          <p class="text-gray-400 text-sm mb-6">{{ t.p0Desc }}</p>
          <div class="text-4xl font-extrabold text-white mb-2">$0<span class="text-lg text-gray-500 font-normal"> / forever</span></div>
          <div class="text-xs text-emerald-400 font-mono font-semibold mb-6">🟢 100% FREE FOR PERSONAL & COMMERCIAL USE</div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf0_1 }}</li>
            <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf0_2 }}</li>
            <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf0_3 }}</li>
          </ul>
          <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension" target="_blank" rel="noopener noreferrer" class="block w-full py-3.5 px-4 bg-kuka-gray hover:bg-gray-700 text-center text-white font-bold rounded-lg border border-kuka-border transition-colors">{{ t.btnFree }}</a>
        </div>

        <!-- Monthly -->
        <div class="glass-panel p-8 rounded-2xl flex flex-col hover:border-gray-500 transition-colors relative border border-kuka-border text-left">
          <div class="inline-block self-start px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-kuka-orange text-xs font-mono font-bold uppercase mb-3">14-Day Free Trial</div>
          <h3 class="text-xl font-bold text-white mb-2">{{ t.p1Name }}</h3>
          <p class="text-gray-400 text-sm mb-6">{{ t.p1Desc }}</p>
          <div class="text-4xl font-extrabold text-white mb-2">$3.99<span class="text-lg text-gray-500 font-normal"> / mo</span></div>
          <div class="text-xs text-orange-400 font-mono font-semibold mb-6">⚡ Instant License Key • 3 PCs</div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf1 }}</li>
            <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf2 }}</li>
            <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf3_std }}</li>
          </ul>
          <a href="https://liskinlabs.lemonsqueezy.com/checkout/buy/ab34799e-42d7-49b0-ad33-94b2d4fe0a7d" target="_blank" rel="noopener noreferrer" class="block w-full py-3.5 px-4 bg-kuka-gray hover:bg-gray-700 text-center text-white font-bold rounded-lg border border-kuka-border transition-colors">{{ t.btnSub }}</a>
        </div>

        <!-- Annual (Featured) -->
        <div class="bg-kuka-gray p-[1px] rounded-2xl relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(255,102,0,0.25)] flex flex-col text-left">
          <div class="absolute inset-0 bg-gradient-to-b from-kuka-orange to-kuka-darker rounded-2xl opacity-50"></div>
          <div class="relative bg-kuka-dark h-full p-8 rounded-2xl flex flex-col z-10 border border-kuka-orange/50">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-kuka-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">{{ t.mostPopular }}</div>
            <div class="inline-block self-start px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-3">SAVE 20%</div>
            <h3 class="text-xl font-bold text-white mb-2">{{ t.p2Name }}</h3>
            <p class="text-kuka-orange/90 text-sm mb-6">{{ t.p2Desc }}</p>
            <div class="text-4xl font-extrabold text-white mb-2">$39.99<span class="text-lg text-gray-400 font-normal"> / yr</span></div>
            <div class="text-xs text-amber-400 font-mono font-semibold mb-6">👑 Priority Support & Updates • 3 PCs</div>
            <ul class="space-y-3 mb-8 flex-grow">
              <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf1 }}</li>
              <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf2 }}</li>
              <li class="flex gap-2 text-gray-300 text-sm"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf3_pri }}</li>
            </ul>
            <a href="https://liskinlabs.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7" target="_blank" rel="noopener noreferrer" class="block w-full py-3.5 px-4 bg-kuka-orange hover:bg-orange-600 text-center text-white font-bold rounded-lg transition-colors shadow-lg shadow-orange-500/20">{{ t.btnSubYr }}</a>
          </div>
        </div>

      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 bg-kuka-darker/50 border-t border-kuka-border">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-white mb-12 text-center">{{ t.faqTitle }}</h2>
        <div class="space-y-6">
          <div v-for="(faq, i) in t.faqs" :key="i" class="glass-panel p-6 rounded-xl hover:border-kuka-orange/30 transition-colors text-left">
            <h3 class="text-xl font-semibold text-white mb-3">{{ faq.q }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()

// Interactive Parallax mouse position
const glowX = ref(600)
const glowY = ref(300)

const handleMouseMove = (e) => {
  glowX.value = e.clientX
  glowY.value = e.clientY
}

// Compute current language key
const currentLang = computed(() => {
  if (lang.value === 'ru' || lang.value?.startsWith('ru')) return 'ru'
  if (lang.value === 'tr' || lang.value?.startsWith('tr')) return 'tr'
  return 'en'
})

// Active Interactive Tool Tab
const activeToolTab = ref(0)

const interactiveTabs = [
  {
    icon: '🗺️',
    name: { en: 'Flowchart', ru: 'Блок-схема', tr: 'Akış Şeması' },
    title: {
      en: 'Interactive Flowchart & Control Flow Graph',
      ru: 'Интерактивные Блок-схемы и Графы Логики',
      tr: 'Etkileşimli Akış Şeması ve Kontrol Grafiği'
    },
    desc: {
      en: 'Transforms nested KRL programs into interactive, clickable Mermaid SVG graphs with bidirectional code jumping.',
      ru: 'Превращает запутанные программы KRL в интерактивные кликабельные графы логики с прыжком к строкам кода.',
      tr: 'Karmaşık KRL programlarını iki yönlü kod atlamalı etkileşimli Mermaid SVG grafiklerine dönüştürür.'
    },
    benefit: {
      en: 'Instantly understand complex handover sequences and export clear vector documentation for clients.',
      ru: 'Мгновенно разбирайтесь в чужих программах и экспортируйте векторную документацию для заказчиков.',
      tr: 'Karmaşık robot sekanslarını anında anlayın ve müşteriler için vektör dokümantasyonu dışa aktarın.'
    },
    media: '/media/control_flow_graph.gif',
    link: '/guide/flowchart'
  },
  {
    icon: '🛡️',
    name: { en: 'Safety', ru: 'Безопасность', tr: 'Güvenlik' },
    title: {
      en: 'Safety & Velocity Collision Inspector',
      ru: 'Инспектор Безопасности и Скоростей ($VEL.CP)',
      tr: 'Güvenlik ve Hız Çarpışma Denetçisi'
    },
    desc: {
      en: 'Flags high speeds ($VEL.CP > 3.0 m/s), uninitialized Tool/Base frames, infinite loops, and invisible non-ASCII characters.',
      ru: 'Выявляет опасные скорости, движение без Tool/Base, зависающие циклы и русскую раскладку в коде.',
      tr: 'Aşırı hızları ($VEL.CP > 3.0 m/s), başlatılmamış Tool/Base değerlerini ve ASCII dışı karakterleri yakalar.'
    },
    benefit: {
      en: 'Prevents expensive mechanical robot crashes and compiler stalls before touching the teach pendant.',
      ru: 'Предотвращает механические удары робота об оснастку и сбои компилятора до запуска программы.',
      tr: 'Öğretme kumandasına dokunmadan önce mekanik robot çarpışmalarını ve derleyici durmalarını önler.'
    },
    media: '/media/type-validation-demo.gif',
    link: '/guide/diagnostics'
  },
  {
    icon: '📦',
    name: { en: 'Backup Diff', ru: 'KRC Diff', tr: 'Yedek Farkı' },
    title: {
      en: 'SmartPAD ZIP Backup Diff & Delta Math',
      ru: 'Сравнение бэкапов SmartPAD .ZIP и Дельта Точек',
      tr: 'SmartPAD ZIP Yedek Farkı ve Delta Hesabı'
    },
    desc: {
      en: 'Compares active source code against SmartPAD ZIP archives and calculates exact coordinate shifts (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC).',
      ru: 'Сравнивает код с архивными ZIP-бэкапами и рассчитывает точное смещение координат точек.',
      tr: 'Kaynak kodunu ZIP yedekleriyle karşılaştırır ve kesin koordinat kaymalarını (ΔX, ΔY, ΔZ) hesaplar.'
    },
    benefit: {
      en: 'Pinpoints unverified point modifications made on the shop floor before they cause collisions.',
      ru: 'Находит скрытые изменения точек на пульте робота до того, как они приведут к аварии.',
      tr: 'Sahada yapılan doğrulanmamış nokta değişikliklerini çarpışmalara yol açmadan önce tespit eder.'
    },
    media: '/media/krc_backup_diff.gif',
    link: '/guide/backup-diff'
  },
  {
    icon: '📐',
    name: { en: 'Frame Math', ru: 'Калькулятор', tr: 'Frame Hesabı' },
    title: {
      en: '3-Point Frame & Euler Angle Math Engine',
      ru: '3-Точечный Калькулятор Фреймов (Euler A, B, C)',
      tr: '3 Noktalı Frame ve Euler Açı Motoru'
    },
    desc: {
      en: 'Calculates BASE_DATA and TOOL_DATA transformations and Euler orientation angles from 3 measured calibration points.',
      ru: 'Вычисляет трансформации BASE_DATA и TOOL_DATA и углы Эйлера по 3 замеренным реперным точкам.',
      tr: '3 ölçülen noktadan BASE_DATA ve TOOL_DATA dönüşümlerini ve Euler yönelim açılarını hesaplar.'
    },
    benefit: {
      en: 'Zero manual trigonometry errors when establishing fixtures and coordinate frames on the shop floor.',
      ru: 'Исключает ошибки тригонометрии при привязке кондукторов и баз деталей в цеху.',
      tr: 'Sahada fikstür ve koordinat sistemlerini kurarken sıfır trigonometri hatası sağlar.'
    },
    media: '/media/kuka_control_center.gif',
    link: '/guide/pro-features'
  }
]

const translations = {
  en: {
    heroBadge: "KUKA KRL Professional v1.7.3 Industrial Suite",
    heroTitle: `The Definitive Industrial <br class="hidden md:block"/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange to-[#FF9900]">Development Suite</span>`,
    heroSubtitle: 'Professional-grade IDE & LSP support built for KRC4 & KRC5 robotics. <br class="hidden sm:block"/> Engineered for speed, safety, and zero downtime.',
    openWiki: "📚 Explore Features Wiki (26 Tools)",
    wikiLink: "/guide/features",
    getProKey: "Get Pro Key",
    downloadFree: "Download Free",
    secure100: "100% Secure (0 CVEs)",
    offlineFirst: "Offline-First Architecture",
    builtFor: "Built for KRC4 & KRC5",
    
    securityTitle: "Certified & Audited by ReversingLabs Spectra Assure",
    securityDesc: "Every production build of KUKA KRL Professional undergoes rigorous automated binary inspection and supply chain verification by ReversingLabs Spectra Assure. Fully compliant with enterprise automotive and OT security standards.",
    viewSecurityReport: "View Live Report on secure.software",

    toolInspectorTitle: "Interactive Industrial Tool Suite",
    toolInspectorDesc: "Experience the specialized engineering tools designed exclusively for commissioning engineers.",
    readFullGuide: "Read full deep-dive guide",

    f1Title: "Interactive Flowchart Viewer",
    f1Desc: "Turn massive, complex .src programs into visual, clean control-flow diagrams. Featuring bidirectional navigation, detailed signals, and SVG export. Stop guessing logic, start seeing it.",
    f1p1: "One-click drill-down into subprograms",
    f1p2: "Detailed timer & signal emoji visualization",
    f1p3: "Exportable for technical documentation",
    
    f2Title: "Industrial-Grade Diagnostics",
    f2Desc: "Catch syntax crashes and physical collision risks before you run the code on the real controller. Our static analyzer understands the strict requirements of KRC compilators.",
    f2p1: "Block balance diagnostic (IF/ENDIF mismatch)",
    f2p2: "Safety velocity warnings ($VEL.CP check)",
    f2p3: "Tool/Base initialization verifier",
    
    f3Title: "KRC Backup Diff & Delta Inspector",
    f3Desc: "Inspect and compare .src and .dat files and coordinate points directly against SmartPAD .zip backup archives with exact delta math.",
    f3p1: "Calculates coordinate deltas (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC)",
    f3p2: "Graphical side-by-side diff viewer",
    f3p3: "Prevents collisions caused by unverified teach pendant touches",

    compareTitle: "Choose Your Edition",
    compareDesc: "Pro edition pays for itself in the first prevented factory downtime.",
    feature: "Feature",
    tableFeatures: [
      { name: "Syntax Highlighting & 6 Themes", free: true },
      { name: "Smart Autocomplete (350+ KSS vars)", free: true },
      { name: "Trilingual NLS (EN / RU / TR)", free: true },
      { name: "Signal Inlay Hints & Hover Docs", free: true },
      { name: "Interactive Flowcharts (Mermaid SVG)", free: false },
      { name: "Strict Block & Safety Diagnostics", free: false },
      { name: "KRC Backup Diff & Point Delta Inspector", free: false },
      { name: "EthernetKRL (EKI) XML Suite", free: false },
      { name: "3-Point Frame Calculator (TOOL & BASE)", free: false },
      { name: "Motion Diagrams & Spline Generator", free: false },
      { name: "100% Offline Factory Access", free: true }
    ],

    pricingTitle: "Invest in Your Productivity",
    pricingDesc: "Flexible pricing for commissioning engineers. Secure payment processing via Lemon Squeezy (Merchant of Record).",
    
    p0Name: "Community Edition",
    p0Desc: "Core syntax & development tools.",
    p1Name: "Pro Monthly",
    p1Desc: "Short-term commissioning trips & full access.",
    p2Name: "Pro Annual",
    p2Desc: "Full-time automation engineers.",
    mostPopular: "Best Value",
    
    pf0_1: "KRL Syntax & 6 Contrast Themes",
    pf0_2: "Smart Autocomplete & Hover Docs",
    pf0_3: "Signal Inlay Hints & Code Formatter",
    
    pf1: "All 26 Pro & Industrial Tools",
    pf2: "Offline-First Activation (Up to 3 PCs)",
    pf3_std: "Standard Engineering Support",
    pf3_pri: "Priority Updates & Direct Support",
    
    btnFree: "Download on Marketplace",
    btnSub: "Start 14-Day Free Trial",
    btnSubYr: "Subscribe Yearly (Save 20%)",

    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Does it work entirely offline?", a: 'Yes. The Industrial Edition is built with an "Offline-First Architecture". Once you activate your license, it is securely cached in your OS keychain and works without any internet connection, making it perfect for secure factory floors.' },
      { q: "Do I need KUKA WorkVisual installed?", a: "No! KUKA KRL Professional operates completely independently in VS Code. It uses its own custom AST parser and static analyzer, meaning you can develop on any OS (Windows, macOS, Linux) without WorkVisual." },
      { q: "What payment methods do you accept?", a: "We process payments via Lemon Squeezy, which accepts all major credit cards, Apple Pay, Google Pay, and PayPal across 135+ countries. Official VAT/tax invoices are generated automatically." },
      { q: "How many machines can I use with one license?", a: "Each Pro license allows activation on up to 3 computers (e.g. your field laptop, office workstation, and home PC)." }
    ]
  },
  ru: {
    heroBadge: "KUKA KRL Professional v1.7.3 Industrial Suite",
    heroTitle: `Эталонная среда разработки <br class="hidden md:block"/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange to-[#FF9900]">для промышленной робототехники</span>`,
    heroSubtitle: 'Профессиональная поддержка LSP и IDE для роботов KRC4 и KRC5. <br class="hidden sm:block"/> Создано для скорости, безопасности и работы без простоев.',
    openWiki: "📚 Открыть Вики (26 инструментов)",
    wikiLink: "/ru/guide/features",
    getProKey: "Купить Pro Ключ",
    downloadFree: "Скачать Бесплатно",
    secure100: "100% Безопасно (0 CVE)",
    offlineFirst: "Офлайн-Архитектура",
    builtFor: "Для KRC4 и KRC5",
    
    securityTitle: "Сертифицировано ReversingLabs Spectra Assure",
    securityDesc: "Каждая сборка KUKA KRL Professional проходит всесторонний бинарный аудит безопасности в ReversingLabs Spectra Assure. Полное соответствие строгим стандартам безопасности автоконцернов и промышленных сетей OT/PLC.",
    viewSecurityReport: "Смотреть отчёт на secure.software",

    toolInspectorTitle: "Интерактивный Инспектор Промышленных Модулей",
    toolInspectorDesc: "Исследуйте специализированные инженерные инструменты, разработанные специально для инженеров-наладчиков.",
    readFullGuide: "Читать полное руководство",

    f1Title: "Интерактивные Блок-схемы",
    f1Desc: "Превращайте огромные и запутанные программы .src в чистые, визуальные графы логики. Двусторонняя навигация, отображение сигналов и экспорт в SVG. Хватит гадать — начните видеть код.",
    f1p1: "Проваливание в подпрограммы в 1 клик",
    f1p2: "Детальная визуализация таймеров и сигналов",
    f1p3: "Экспорт графов для технической документации",
    
    f2Title: "Промышленная Диагностика",
    f2Desc: "Ловите синтаксические ошибки и риски физических коллизий ДО запуска на реальном контроллере. Наш анализатор понимает строгие требования компиляторов KRC.",
    f2p1: "Проверка баланса блоков (забытые ENDIF/ENDFOR)",
    f2p2: "Контроль безопасности скоростей ($VEL.CP)",
    f2p3: "Верификация инициализации Tool/Base",
    
    f3Title: "Сравнение Бэкапов KRC Diff & Дельта Точек",
    f3Desc: "Сравнивайте файлы и координаты точек $E6POS/POS/E6AXIS$ напрямую с архивными бэкапами .zip со SmartPAD с расчетом точной дельты.",
    f3p1: "Расчет дельты координат (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC)",
    f3p2: "Графический Side-by-Side инспектор различий",
    f3p3: "Защита от аварий из-за правок точек на пульте",

    compareTitle: "Сравнение Версий",
    compareDesc: "Pro-версия окупает себя при первом же предотвращенном простое завода.",
    feature: "Функция",
    tableFeatures: [
      { name: "Подсветка синтаксиса и 6 контрастных тем", free: true },
      { name: "Умное автодополнение (350+ переменных KSS)", free: true },
      { name: "Мультиязычность NLS (Русский, EN, TR)", free: true },
      { name: "Подсказки сигналов Inlay Hints и Hover Docs", free: true },
      { name: "Интерактивные Блок-схемы (Mermaid SVG)", free: false },
      { name: "Строгая Диагностика (Баланс, Безопасность)", free: false },
      { name: "Сравнение бэкапов KRC Diff & Дельта точек", free: false },
      { name: "Сюит EthernetKRL (EKI) XML & Генератор кода", free: false },
      { name: "3D Калькулятор Фреймов (TOOL & BASE)", free: false },
      { name: "Генератор Траекторий и Сплайнов KSS 8.3+", free: false },
      { name: "100% Офлайн-доступ в цехах", free: true }
    ],

    pricingTitle: "Инвестируйте в Свою Продуктивность",
    pricingDesc: "Гибкие тарифы для инженеров-наладчиков. Безопасная оплата через Lemon Squeezy (Merchant of Record).",
    
    p0Name: "Community Edition",
    p0Desc: "Базовый синтаксис и инструменты.",
    p1Name: "Pro Месячный",
    p1Desc: "Короткие командировки и полный доступ.",
    p2Name: "Pro Годовой",
    p2Desc: "Для постоянных инженеров робототехники.",
    mostPopular: "Выгодный выбор",
    
    pf0_1: "Синтаксис KRL и 6 тем оформления",
    pf0_2: "Автодополнение и документация Hover",
    pf0_3: "Подсказки сигналов Inlay Hints и Форматирование",
    
    pf1: "Все 26 Промышленных Pro-инструментов",
    pf2: "Офлайн-Активация (до 3 компьютеров)",
    pf3_std: "Стандартная инженерная поддержка",
    pf3_pri: "Приоритетные обновления и прямая связь",
    
    btnFree: "Установить из Marketplace",
    btnSub: "Начать 14 дней бесплатно",
    btnSubYr: "Оформить на год (Скидка 20%)",

    faqTitle: "Часто Задаваемые Вопросы",
    faqs: [
      { q: "Работает ли расширение полностью офлайн?", a: "Да. Industrial Edition использует Офлайн-Архитектуру. После активации лицензионного ключа, он надежно кэшируется в системном хранилище. Для работы в цехах и на заводах интернет не требуется." },
      { q: "Нужен ли установленный KUKA WorkVisual?", a: "Нет! KUKA KRL Professional работает абсолютно независимо внутри VS Code. Он использует собственный AST-парсер, что позволяет программировать на любой ОС (Windows, macOS, Linux) без WorkVisual." },
      { q: "Какие методы оплаты вы принимаете?", a: "Мы обрабатываем платежи через Lemon Squeezy, который поддерживает банковские карты, Apple Pay, Google Pay и PayPal в более чем 135 странах. Официальные инвойсы и чеки формируются автоматически." },
      { q: "На скольких компьютерах можно использовать лицензию?", a: "Каждая лицензия Pro позволяет активировать расширение на 3 устройствах (например: рабочий ноутбук для выездов, офисный ПК и домашний компьютер)." }
    ]
  },
  tr: {
    heroBadge: "KUKA KRL Professional v1.7.3 Industrial Suite",
    heroTitle: `KUKA Robot Dili için Kesin <br class="hidden md:block"/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange to-[#FF9900]">Endüstriyel Geliştirme Paketi</span>`,
    heroSubtitle: 'KRC4 ve KRC5 robotları için profesyonel IDE ve LSP desteği. <br class="hidden sm:block"/> Hız, güvenlik ve sıfır duruş süresi için tasarlandı.',
    openWiki: "📚 Özellikler Wiki (26 Araç)",
    wikiLink: "/tr/guide/features",
    getProKey: "Pro Anahtarı Al",
    downloadFree: "Ücretsiz İndir",
    secure100: "%100 Güvenli (0 CVE)",
    offlineFirst: "Çevrimdışı Mimari",
    builtFor: "KRC4 & KRC5 Uyumlu",
    
    securityTitle: "ReversingLabs Spectra Assure Tarafından Sertifikalandırıldı",
    securityDesc: "KUKA KRL Professional'ın her üretim sürümü, ReversingLabs Spectra Assure tarafından otomatik ikili denetimden ve tedarik zinciri doğrulamasından geçer. Otomotiv ve OT güvenlik standartlarına %100 uygundur.",
    viewSecurityReport: "secure.software'de Canlı Raporu Gör",

    toolInspectorTitle: "Etkileşimli Endüstriyel Araç Paketi",
    toolInspectorDesc: "Devreye alma mühendisleri için özel olarak tasarlanmış mühendislik araçlarını keşfedin.",
    readFullGuide: "Kılavuzun tamamını oku",

    f1Title: "Etkileşimli Akış Şeması Görüntüleyici",
    f1Desc: "Büyük, karmaşık .src programlarını görsel, temiz kontrol akışı diyagramlarına dönüştürün. İki yönlü gezinme, ayrıntılı sinyaller ve SVG dışa aktarımı özellikleri.",
    f1p1: "Alt programlara tek tıklamayla inme",
    f1p2: "Ayrıntılı zamanlayıcı ve sinyal emoji görselleştirmesi",
    f1p3: "Teknik dokümantasyon için dışa aktarılabilir",
    
    f2Title: "Endüstriyel Kalite Teşhisleri",
    f2Desc: "Kodu gerçek kontrolörde çalıştırmadan önce sözdizimi çökmelerini ve fiziksel çarpışma risklerini yakalayın. Statik analizörümüz KRC derleyicilerinin katı gereksinimlerini anlar.",
    f2p1: "Blok dengesi teşhisi (IF/ENDIF uyuşmazlığı)",
    f2p2: "Güvenlik hızı uyarıları ($VEL.CP kontrolü)",
    f2p3: "Tool/Base başlatma doğrulayıcısı",
    
    f3Title: "KRC Yedekleme Farkı ve Nokta Delta Denetçisi",
    f3Desc: "SmartPAD .zip yedek arşivlerine karşı .src ve .dat dosyalarını doğrudan karşılaştırın ve nokta koordinat deltalarını hesaplayın.",
    f3p1: "Koordinat deltalarını hesaplar (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC)",
    f3p2: "Grafiksel yan yana fark görüntüleyici",
    f3p3: "Öğretme kumandasında yapılan doğrulanmamış değişikliklerden kaynaklanan çarpışmaları önler",

    compareTitle: "Sürümünüzü Seçin",
    compareDesc: "Pro sürümü, önlenen ilk fabrika duruşunda kendini amorti eder.",
    feature: "Özellik",
    tableFeatures: [
      { name: "Sözdizimi Vurgulama ve 6 Tema", free: true },
      { name: "Akıllı Otomatik Tamamlama (350+ KSS değişkeni)", free: true },
      { name: "Üç Dilli NLS (Türkçe, EN, RU)", free: true },
      { name: "Sinyal İpuçları ve Hover Belgeleri", free: true },
      { name: "Etkileşimli Akış Şemaları (Mermaid SVG)", free: false },
      { name: "Sıkı Blok ve Güvenlik Teşhisleri", free: false },
      { name: "KRC Yedekleme Farkı ve Nokta Delta Denetçisi", free: false },
      { name: "EthernetKRL (EKI) XML Paketi", free: false },
      { name: "3 Noktalı Frame Hesaplayıcı (TOOL & BASE)", free: false },
      { name: "Hareket Diyagramları ve Spline Oluşturucu", free: false },
      { name: "Fabrikalarda %100 Çevrimdışı Erişim", free: true }
    ],

    pricingTitle: "Verimliliğinize Yatırım Yapın",
    pricingDesc: "Devreye alma mühendisleri için esnek fiyatlandırma. Lemon Squeezy aracılığıyla güvenli ödemeler.",
    
    p0Name: "Community Sürümü",
    p0Desc: "Temel sözdizimi ve geliştirme araçları.",
    p1Name: "Pro Aylık",
    p1Desc: "Kısa vadeli projeler ve tam erişim.",
    p2Name: "Pro Yıllık",
    p2Desc: "Tam zamanlı otomasyon mühendisleri için.",
    mostPopular: "En Popüler",
    
    pf0_1: "KRL Sözdizimi ve 6 Kontrast Tema",
    pf0_2: "Akıllı Otomatik Tamamlama ve Hover Belgeleri",
    pf0_3: "Sinyal İpuçları ve Kod Biçimlendirici",
    
    pf1: "Tüm 26 Pro ve Endüstriyel Araç",
    pf2: "Çevrimdışı Etkinleştirme (3 PC'ye kadar)",
    pf3_std: "Standart Mühendislik Desteği",
    pf3_pri: "Öncelikli Güncellemeler ve Doğrudan Destek",
    
    btnFree: "Marketplace'ten İndir",
    btnSub: "14 Günlük Ücretsiz Deneme",
    btnSubYr: "Yıllık Abone Ol (%20 Tasarruf)",

    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      { q: "Tamamen çevrimdışı çalışıyor mu?", a: 'Evet. Industrial Edition "Çevrimdışı Öncelikli Mimari" ile oluşturulmuştur. Lisansı etkinleştirdiğinizde güvenli bir şekilde önbelleğe alınır ve internet olmadan çalışır.' },
      { q: "KUKA WorkVisual kurulu olması gerekir mi?", a: "Hayır! KUKA KRL Professional, VS Code içinde tamamen bağımsız çalışır. Kendi özel AST ayrıştırıcısını kullanır." },
      { q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", a: "Tüm büyük kredi kartlarını, Apple Pay, Google Pay ve PayPal'ı kabul eden Lemon Squeezy aracılığıyla ödemeleri alıyoruz." },
      { q: "Bir lisansı kaç bilgisayarda kullanabilirim?", a: "Her Pro lisansı 3 bilgisayara kadar etkinleştirilebilir (örn. saha dizüstü bilgisayarı, ofis iş istasyonu ve ev bilgisayarı)." }
    ]
  }
}

const t = computed(() => translations[currentLang.value] || translations.en)
</script>

<style scoped>
.glass-panel {
  background: rgba(17, 22, 29, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>
