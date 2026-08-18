<template>
  <div class="kuka-landing min-h-screen bg-kuka-dark text-gray-200 selection:bg-kuka-orange selection:text-white pb-20">
    <!-- Hero Section -->
    <header class="relative overflow-hidden pt-24 pb-32">
      <!-- Glow effect -->
      <div class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-kuka-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kuka-gray border border-kuka-border text-sm text-kuka-orange font-medium mb-8 shadow-sm">
          <span class="flex h-2 w-2 rounded-full bg-kuka-orange animate-pulse"></span>
          {{ t.heroBadge }}
        </div>
        
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6" v-html="t.heroTitle"></h1>
        
        <p class="mt-4 max-w-3xl text-xl text-gray-400 mx-auto mb-10 leading-relaxed" v-html="t.heroSubtitle"></p>
        
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a :href="t.wikiLink" class="px-8 py-4 bg-kuka-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,102,0,0.4)] flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            {{ t.openWiki }}
          </a>
          <a href="#pricing" class="px-8 py-4 bg-kuka-gray hover:bg-gray-800 text-white font-bold rounded-lg border border-kuka-border transition-all duration-200 hover:border-kuka-orange flex items-center gap-2">
            {{ t.getProKey }}
            <svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </a>
          <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension" target="_blank" rel="noopener noreferrer" class="px-8 py-4 bg-kuka-gray hover:bg-gray-800 text-white font-medium rounded-lg border border-kuka-border transition-all duration-200 flex items-center gap-2">
            {{ t.downloadFree }}
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.593 3.322c-.394-.271-.926-.237-1.28.083L12 7.228 7.687 3.405c-.354-.32-.886-.354-1.28-.083L.884 7.159c-.43.295-.494.908-.135 1.281l10.536 11.02a1.47 1.47 0 002.133.003L24 8.442c.36-.372.296-.985-.133-1.28L17.593 3.322zm-5.59 13.91l-7.794-8.15 4.542-3.13 3.252 2.89v8.39zm1.5-8.39l3.252-2.89 4.542 3.13-7.794 8.15v-8.39z"/></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Trust Badges -->
    <section class="py-10 border-y border-kuka-border bg-kuka-darker/50">
      <div class="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
        <div class="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gray-300">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          {{ t.secure100 }}
        </div>
        <div class="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gray-300">
          <svg class="w-6 h-6 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ t.offlineFirst }}
        </div>
        <div class="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gray-300">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
          {{ t.builtFor }}
        </div>
      </div>
    </section>

    <!-- Showcase Features -->
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
      <!-- Feature 1: Flowchart -->
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f1Title }}</h2>
          <p class="text-lg text-gray-400 leading-relaxed">{{ t.f1Desc }}</p>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f1p1 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f1p2 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f1p3 }}</li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="glass-panel p-2 rounded-2xl overflow-hidden shadow-2xl relative group transform transition-transform hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-r from-kuka-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="aspect-video bg-[#1e1e1e] rounded-xl flex flex-col items-center justify-center border border-kuka-border/50 relative overflow-hidden">
              <img src="/media/control_flow_graph.gif" alt="Interactive Flowchart Demo" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Feature 2: Diagnostics -->
      <div class="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f2Title }}</h2>
          <p class="text-lg text-gray-400 leading-relaxed">{{ t.f2Desc }}</p>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f2p1 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f2p2 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f2p3 }}</li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="glass-panel p-2 rounded-2xl overflow-hidden shadow-2xl relative group transform transition-transform hover:-translate-y-2">
             <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div class="aspect-video bg-[#1e1e1e] rounded-xl flex flex-col items-center justify-center border border-kuka-border/50 relative overflow-hidden">
              <img src="/media/type-validation-demo.gif" alt="Diagnostics and Safety Demo" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Feature 3: Backup Diff -->
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f3Title }}</h2>
          <p class="text-lg text-gray-400 leading-relaxed">{{ t.f3Desc }}</p>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f3p1 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f3p2 }}</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.f3p3 }}</li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="glass-panel p-2 rounded-2xl overflow-hidden shadow-2xl relative group transform transition-transform hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="aspect-video bg-[#1e1e1e] rounded-xl flex flex-col items-center justify-center border border-kuka-border/50 relative overflow-hidden">
              <img src="/media/krc_backup_diff.gif" alt="KRC Backup Diff & Delta Inspector" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="py-24 bg-kuka-darker/80 border-y border-kuka-border relative overflow-hidden">
      <div class="absolute top-[50%] left-[-10%] w-[500px] h-[500px] bg-kuka-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
      
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
        <div class="glass-panel p-8 rounded-2xl flex flex-col hover:border-gray-500 transition-colors border border-kuka-border">
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
        <div class="glass-panel p-8 rounded-2xl flex flex-col hover:border-gray-500 transition-colors relative border border-kuka-border">
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
        <div class="bg-kuka-gray p-[1px] rounded-2xl relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(255,102,0,0.25)] flex flex-col">
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
          <div v-for="(faq, i) in t.faqs" :key="i" class="glass-panel p-6 rounded-xl hover:border-kuka-orange/30 transition-colors">
            <h3 class="text-xl font-semibold text-white mb-3">{{ faq.q }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

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

const t = computed(() => translations[lang.value] || translations.en)
</script>

<style scoped>
.glass-panel {
  background: rgba(17, 22, 29, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
