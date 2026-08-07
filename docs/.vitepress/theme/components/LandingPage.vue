<template>
  <div class="kuka-landing min-h-screen bg-kuka-dark text-gray-200 selection:bg-kuka-orange selection:text-white pb-20">
    <!-- Hero Section -->
    <header class="relative overflow-hidden pt-24 pb-32">
      <!-- Glow effect -->
      <div class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-kuka-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kuka-gray border border-kuka-border text-sm text-kuka-orange font-medium mb-8 shadow-sm">
          <span class="flex h-2 w-2 rounded-full bg-kuka-orange animate-pulse"></span>
          {{ t.heroBadge }}
        </div>
        
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6" v-html="t.heroTitle"></h1>
        
        <p class="mt-4 max-w-2xl text-xl text-gray-400 mx-auto mb-10" v-html="t.heroSubtitle"></p>
        
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a :href="t.wikiLink" class="px-8 py-4 bg-kuka-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,102,0,0.4)] flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            {{ t.openWiki }}
          </a>
          <a href="#pricing" class="px-8 py-4 bg-kuka-gray hover:bg-gray-800 text-white font-bold rounded-lg border border-kuka-border transition-all duration-200 hover:border-kuka-orange flex items-center gap-2">
            {{ t.getProKey }}
            <svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </a>
          <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl" target="_blank" class="px-8 py-4 bg-kuka-gray hover:bg-gray-800 text-white font-medium rounded-lg border border-kuka-border transition-all duration-200 flex items-center gap-2">
            {{ t.downloadFree }}
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.593 3.322c-.394-.271-.926-.237-1.28.083L12 7.228 7.687 3.405c-.354-.32-.886-.354-1.28-.083L.884 7.159c-.43.295-.494.908-.135 1.281l10.536 11.02a1.47 1.47 0 002.133.003L24 8.442c.36-.372.296-.985-.133-1.28L17.593 3.322zm-5.59 13.91l-7.794-8.15 4.542-3.13 3.252 2.89v8.39zm1.5-8.39l3.252-2.89 4.542 3.13-7.794 8.15v-8.39z"/></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Social Proof -->
    <section class="py-10 border-y border-kuka-border bg-kuka-darker/50">
      <div class="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
        <div class="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gray-400">
          <svg class="w-6 h-6 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          {{ t.secure100 }}
        </div>
        <div class="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gray-400">
          <svg class="w-6 h-6 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ t.offlineFirst }}
        </div>
        <div class="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gray-400">
          <svg class="w-6 h-6 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
          {{ t.builtFor }}
        </div>
      </div>
    </section>

    <!-- Showcase Features -->
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
      <!-- Feature 1 -->
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f1Title }}</h2>
          <p class="text-lg text-gray-400">{{ t.f1Desc }}</p>
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

      <!-- Feature 2 -->
      <div class="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f2Title }}</h2>
          <p class="text-lg text-gray-400">{{ t.f2Desc }}</p>
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
              <img src="/media/kuka_control_center.gif" alt="Diagnostics and Safety Demo" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Feature 3 -->
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <div class="inline-flex items-center justify-center p-3 bg-kuka-gray border border-kuka-border rounded-xl text-kuka-orange mb-2 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ t.f3Title }}</h2>
          <p class="text-lg text-gray-400">{{ t.f3Desc }}</p>
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
                <th class="py-5 px-6 font-semibold text-center border-l border-kuka-border w-1/4">Community</th>
                <th class="py-5 px-6 font-semibold text-center border-l border-kuka-border w-1/4 text-kuka-orange bg-kuka-orange/5">Industrial (Pro)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-kuka-border text-gray-400">
              <tr v-for="(feat, i) in t.tableFeatures" :key="i" class="hover:bg-kuka-gray/30 transition-colors">
                <td class="py-4 px-6 font-medium">{{ feat.name }}</td>
                <td class="py-4 px-6 text-center">
                  <svg v-if="feat.free" class="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span v-else class="text-gray-600">-</span>
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
        <h2 class="text-3xl font-bold text-white mb-4">{{ t.pricingTitle }}</h2>
        <p class="text-gray-400">{{ t.pricingDesc }}</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
        
        <!-- Monthly -->
        <div class="glass-panel p-8 rounded-2xl flex flex-col hover:border-gray-500 transition-colors relative">
          <h3 class="text-xl font-semibold text-white mb-2">{{ t.p1Name }}</h3>
          <p class="text-gray-400 text-sm mb-6">{{ t.p1Desc }}</p>
          <div class="text-4xl font-bold text-white mb-6">$19<span class="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf1 }}</li>
            <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf2 }}</li>
            <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf3_std }}</li>
          </ul>
          <a href="#" class="block w-full py-3 px-4 bg-kuka-gray hover:bg-gray-700 text-center text-white font-medium rounded-lg border border-kuka-border transition-colors">{{ t.btnSub }}</a>
        </div>

        <!-- Annual -->
        <div class="bg-kuka-gray p-[1px] rounded-2xl relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(255,102,0,0.2)]">
          <div class="absolute inset-0 bg-gradient-to-b from-kuka-orange to-kuka-darker rounded-2xl opacity-50"></div>
          <div class="relative bg-kuka-dark h-full p-8 rounded-2xl flex flex-col z-10 border border-kuka-orange/30">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-kuka-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">{{ t.mostPopular }}</div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ t.p2Name }}</h3>
            <p class="text-kuka-orange/80 text-sm mb-6">{{ t.p2Desc }}</p>
            <div class="text-4xl font-bold text-white mb-6">$149<span class="text-lg text-gray-500 font-normal">/yr</span></div>
            <ul class="space-y-3 mb-8 flex-grow">
              <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf1 }}</li>
              <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf2 }}</li>
              <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf3_pri }}</li>
            </ul>
            <a href="#" class="block w-full py-3 px-4 bg-kuka-orange hover:bg-orange-600 text-center text-white font-bold rounded-lg transition-colors shadow-lg shadow-orange-500/20">{{ t.btnSubYr }}</a>
          </div>
        </div>

        <!-- Lifetime -->
        <div class="glass-panel p-8 rounded-2xl flex flex-col hover:border-gray-500 transition-colors relative">
          <h3 class="text-xl font-semibold text-white mb-2">{{ t.p3Name }}</h3>
          <p class="text-gray-400 text-sm mb-6">{{ t.p3Desc }}</p>
          <div class="text-4xl font-bold text-white mb-6">$399<span class="text-lg text-gray-500 font-normal">/once</span></div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf1_life }}</li>
            <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf2_life }}</li>
            <li class="flex gap-2 text-gray-300"><svg class="w-5 h-5 text-kuka-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> {{ t.pf3_life }}</li>
          </ul>
          <a href="#" class="block w-full py-3 px-4 bg-kuka-gray hover:bg-gray-700 text-center text-white font-medium rounded-lg border border-kuka-border transition-colors">{{ t.btnLife }}</a>
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
            <p class="text-gray-400">{{ faq.a }}</p>
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
    heroBadge: "KUKA KRL Professional v1.7.3 Pro Hub",
    heroTitle: `The Definitive Industrial <br class="hidden md:block"/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange to-[#FF9900]">Development Suite</span>`,
    heroSubtitle: 'Professional-grade IDE & LSP support built for KRC4 & KRC5 robotics. <br class="hidden sm:block"/> Engineered for speed, safety, and zero downtime.',
    openWiki: "📚 Explore Features Wiki (26 Features)",
    wikiLink: "/guide/features.html",
    getProKey: "Get Pro Key",
    downloadFree: "Download Free",
    secure100: "100% Secure",
    offlineFirst: "Offline-First",
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
    
    f3Title: "Workspace-Wide Analysis",
    f3Desc: "Maintain the highest standards in your robotics projects. Automatically generate quality reports, find dead code, and clean Git metadata before committing.",
    f3p1: "Global \"Dead Code\" detection across all files",
    f3p2: "WorkVisual Header metadata stripper",
    f3p3: "Frame Calculator for offset calculation",

    compareTitle: "Choose Your Edition",
    compareDesc: "Pro edition pays for itself in the first prevented factory downtime.",
    feature: "Feature",
    tableFeatures: [
      { name: "Syntax Highlighting & Themes", free: true },
      { name: "Smart Autocomplete", free: true },
      { name: "Interactive Flowcharts (Mermaid)", free: false },
      { name: "Strict Block & Safety Diagnostics", free: false },
      { name: "Global Dead Code Analysis", free: false },
      { name: "KUKA Frame Calculator", free: false },
      { name: "100% Offline Access", free: true }
    ],

    pricingTitle: "Invest in Your Productivity",
    pricingDesc: "Secure payments via Lemon Squeezy. Instant license delivery.",
    
    p1Name: "Monthly",
    p1Desc: "Perfect for short-term projects.",
    p2Name: "Annual",
    p2Desc: "Save 35% with a yearly plan.",
    p3Name: "Lifetime",
    p3Desc: "Pay once, own forever.",
    mostPopular: "Most Popular",
    
    pf1: "All Pro Features",
    pf2: "Offline Activation",
    pf3_std: "Standard Support",
    pf3_pri: "Priority Support",
    pf1_life: "All Pro Features Forever",
    pf2_life: "All Future Updates",
    pf3_life: "Lifetime Support",
    
    btnSub: "Subscribe",
    btnSubYr: "Subscribe Yearly",
    btnLife: "Get Lifetime",

    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Does it work entirely offline?", a: 'Yes. The Industrial Edition is built with an "Offline-First Architecture". Once you activate the license via our portal or offline key file, it is securely cached and works without any internet connection, making it perfect for secure factory floors.' },
      { q: "Do I need KUKA WorkVisual installed?", a: "No! KUKA KRL Professional operates completely independently in VS Code. It uses its own custom AST parser and static analyzer, meaning you can develop on any OS (Windows, macOS, Linux) without WorkVisual." },
      { q: "What payment methods do you accept?", a: "We process payments via Lemon Squeezy, which accepts all major credit cards, Apple Pay, Google Pay, and PayPal across 135+ countries. B2B invoices are generated automatically." }
    ]
  },
  ru: {
    heroBadge: "KUKA KRL Professional v1.7.3 Pro Hub",
    heroTitle: `Эталонная среда разработки <br class="hidden md:block"/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange to-[#FF9900]">для промышленной робототехники</span>`,
    heroSubtitle: 'Профессиональная поддержка LSP и IDE для роботов KRC4 и KRC5. <br class="hidden sm:block"/> Создано для скорости, безопасности и работы без простоев.',
    openWiki: "📚 Открыть Вики (26 функций)",
    wikiLink: "/ru/guide/features.html",
    getProKey: "Купить Pro Ключ",
    downloadFree: "Скачать Бесплатно",
    secure100: "100% Безопасно",
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
    
    f3Title: "Глобальный Анализ Проекта",
    f3Desc: "Поддерживайте высочайшие стандарты качества кода в ваших проектах. Автоматически находите мертвый код и очищайте мусорные метаданные Git перед коммитом.",
    f3p1: "Глобальный поиск 'Мертвого кода' по всем файлам",
    f3p2: "Удаление скрытых метаданных WorkVisual",
    f3p3: "Калькулятор фреймов для расчета баз",

    compareTitle: "Сравнение Версий",
    compareDesc: "Pro-версия окупает себя при первом же предотвращенном простое завода.",
    feature: "Функция",
    tableFeatures: [
      { name: "Синтаксис и Темы оформления", free: true },
      { name: "Умное автодополнение", free: true },
      { name: "Интерактивные Блок-схемы (Mermaid)", free: false },
      { name: "Строгая Диагностика (Баланс, Безопасность)", free: false },
      { name: "Поиск Мертвого кода в WorkSpace", free: false },
      { name: "KUKA Калькулятор Фреймов", free: false },
      { name: "100% Офлайн-доступ", free: true }
    ],

    pricingTitle: "Инвестируйте в Свою Продуктивность",
    pricingDesc: "Безопасная оплата через Lemon Squeezy. Моментальная доставка лицензии.",
    
    p1Name: "Месяц",
    p1Desc: "Идеально для коротких проектов.",
    p2Name: "Год",
    p2Desc: "Скидка 35% при годовой оплате.",
    p3Name: "Навсегда",
    p3Desc: "Оплатите один раз, владейте всегда.",
    mostPopular: "Популярный",
    
    pf1: "Все Pro Функции",
    pf2: "Офлайн Активация",
    pf3_std: "Стандартная Поддержка",
    pf3_pri: "Приоритетная Поддержка",
    pf1_life: "Все Pro Функции Навсегда",
    pf2_life: "Все Будущие Обновления",
    pf3_life: "Пожизненная Поддержка",
    
    btnSub: "Подписаться",
    btnSubYr: "Купить на Год",
    btnLife: "Купить Навсегда",

    faqTitle: "Часто Задаваемые Вопросы",
    faqs: [
      { q: "Работает ли расширение полностью офлайн?", a: "Да. Industrial Edition использует Офлайн-Архитектуру. После активации лицензионного ключа через наш портал, он надежно кэшируется. Для работы в цехах и на заводах интернет не требуется." },
      { q: "Нужен ли установленный KUKA WorkVisual?", a: "Нет! KUKA KRL Professional работает абсолютно независимо внутри VS Code. Он использует собственный AST-парсер, что позволяет программировать на любой ОС (Windows, macOS, Linux) без WorkVisual." },
      { q: "Какие методы оплаты вы принимаете?", a: "Мы обрабатываем платежи через Lemon Squeezy, который поддерживает все основные кредитные карты, Apple Pay, Google Pay и PayPal в более чем 135 странах." }
    ]
  },
  tr: {
    heroBadge: "Industrial Edition v6.0 Yayında",
    heroTitle: `KUKA Robot Dili için Kesin <br class="hidden md:block"/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange to-[#FF9900]">Endüstriyel Geliştirme Paketi</span>`,
    heroSubtitle: 'KRC4 ve KRC5 robotları için profesyonel IDE ve LSP desteği. <br class="hidden sm:block"/> Hız, güvenlik ve sıfır duruş süresi için tasarlandı.',
    getProKey: "Pro Anahtarı Al",
    downloadFree: "Ücretsiz İndir",
    secure100: "%100 Güvenli",
    offlineFirst: "Çevrimdışı Çalışır",
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
    
    f3Title: "Çalışma Alanı Çapında Analiz",
    f3Desc: "Robotik projelerinizde en yüksek standartları koruyun. Otomatik olarak kalite raporları oluşturun, ölü kodları bulun ve komit yapmadan önce Git metadatalarını temizleyin.",
    f3p1: "Tüm dosyalarda küresel \"Ölü Kod\" algılaması",
    f3p2: "WorkVisual Başlık meta veri temizleyici",
    f3p3: "Ofset hesaplaması için Frame Hesaplayıcı",

    compareTitle: "Sürümünüzü Seçin",
    compareDesc: "Pro sürümü, önlenen ilk fabrika duruşunda kendini amorti eder.",
    feature: "Özellik",
    tableFeatures: [
      { name: "Sözdizimi Vurgulama ve Temalar", free: true },
      { name: "Akıllı Otomatik Tamamlama", free: true },
      { name: "Etkileşimli Akış Şemaları (Mermaid)", free: false },
      { name: "Sıkı Blok ve Güvenlik Teşhisleri", free: false },
      { name: "Küresel Ölü Kod Analizi", free: false },
      { name: "KUKA Frame Hesaplayıcı", free: false },
      { name: "%100 Çevrimdışı Erişim", free: true }
    ],

    pricingTitle: "Verimliliğinize Yatırım Yapın",
    pricingDesc: "Lemon Squeezy aracılığıyla güvenli ödemeler. Anında lisans teslimatı.",
    
    p1Name: "Aylık",
    p1Desc: "Kısa vadeli projeler için mükemmel.",
    p2Name: "Yıllık",
    p2Desc: "Yıllık planla %35 tasarruf edin.",
    p3Name: "Ömür Boyu",
    p3Desc: "Bir kez ödeyin, sonsuza dek sahip olun.",
    mostPopular: "En Popüler",
    
    pf1: "Tüm Pro Özellikleri",
    pf2: "Çevrimdışı Etkinleştirme",
    pf3_std: "Standart Destek",
    pf3_pri: "Öncelikli Destek",
    pf1_life: "Sonsuza Dek Tüm Pro Özellikleri",
    pf2_life: "Tüm Gelecekteki Güncellemeler",
    pf3_life: "Ömür Boyu Destek",
    
    btnSub: "Abone Ol",
    btnSubYr: "Yıllık Abone Ol",
    btnLife: "Ömür Boyu Al",

    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      { q: "Tamamen çevrimdışı çalışıyor mu?", a: 'Evet. Industrial Edition "Çevrimdışı Öncelikli Mimari" ile oluşturulmuştur. Lisansı portalımız veya çevrimdışı anahtar dosyası aracılığıyla etkinleştirdiğinizde, güvenli bir şekilde önbelleğe alınır ve herhangi bir internet bağlantısı olmadan çalışır.' },
      { q: "KUKA WorkVisual'ın kurulu olması gerekir mi?", a: "Hayır! KUKA KRL Professional, VS Code'da tamamen bağımsız çalışır. Kendi özel AST ayrıştırıcısını ve statik analizörünü kullanır, yani WorkVisual olmadan herhangi bir işletim sisteminde (Windows, macOS, Linux) geliştirebilirsiniz." },
      { q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", a: "Ödemeleri, 135'ten fazla ülkede tüm önemli kredi kartlarını, Apple Pay, Google Pay ve PayPal'ı kabul eden Lemon Squeezy aracılığıyla gerçekleştiriyoruz." }
    ]
  }
}

const t = computed(() => translations[lang.value] || translations.en)
</script>
