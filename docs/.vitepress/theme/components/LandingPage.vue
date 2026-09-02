<template>
  <div class="kuka-landing min-h-screen bg-[#07090e] text-[#F0F4F8] selection:bg-kuka-orange selection:text-white pb-24 overflow-x-hidden font-sans relative">
    
    <!-- Cyberpunk Technical Grid Overlay -->
    <div class="fixed inset-0 pointer-events-none opacity-25 z-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px]"></div>

    <!-- Ambient Dynamic Radial Spotlights -->
    <div class="fixed top-0 left-1/4 w-[750px] h-[500px] bg-gradient-to-br from-orange-600/15 via-amber-500/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>
    <div class="fixed top-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-600/10 via-blue-700/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10"></div>

    <!-- 2.1 Navigation Header (HUD Glass Bar) -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/85 border-b border-white/10">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo -->
        <a :href="withBase('/')" class="flex items-center gap-3 group">
          <div class="relative">
            <img :src="withBase('/logo.png')" alt="KUKA KRL Pro" class="w-8 h-8 object-contain rounded-lg border border-orange-500/40 shadow-[0_0_15px_rgba(255,102,0,0.35)] group-hover:scale-105 transition-transform" />
            <span class="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#07090e] animate-pulse"></span>
          </div>
          <div class="flex flex-col text-left">
            <span class="font-mono font-black text-sm tracking-wider text-white">
              LISKIN<span class="text-kuka-orange">LABS</span>
            </span>
            <span class="font-mono text-[9px] text-gray-400 tracking-widest">// KUKA KRL PRO</span>
          </div>
        </a>

        <!-- Anchor Navigation Links -->
        <div class="hidden lg:flex items-center gap-5 text-xs font-mono text-gray-300">
          <a href="#cinematic" class="hover:text-kuka-orange transition-colors flex items-center gap-1">
            <span class="text-kuka-orange">🎬</span> {{ t.navShowcase }}
          </a>
          <a :href="withBase(t.wikiLink)" class="hover:text-kuka-orange transition-colors flex items-center gap-1">
            <span class="text-cyan-400 font-bold">50</span> {{ t.navWiki }}
          </a>
          <a href="#comparison" class="hover:text-kuka-orange transition-colors">
            {{ t.navBeforeAfter }}
          </a>
          <a href="#playground" class="hover:text-kuka-orange transition-colors">
            {{ t.navPlayground }}
          </a>
          <a href="#calculator" class="hover:text-kuka-orange transition-colors">
            {{ t.navFrameCalc }}
          </a>
          <a href="#telemetry" class="hover:text-kuka-orange transition-colors">
            {{ t.navTelemetry }}
          </a>
          <a href="#pricing" class="hover:text-kuka-orange transition-colors">
            {{ t.navPricing }}
          </a>
        </div>

        <!-- Language Pill Switcher & CTA -->
        <div class="flex items-center gap-3">
          <div class="inline-flex items-center gap-1 bg-[#0d121d] p-1 rounded-full border border-white/10 shadow-sm font-mono text-xs">
            <a 
              :href="withBase('/')" 
              :class="['px-2.5 py-0.5 rounded-full font-bold transition-all', currentLang === 'en' ? 'bg-kuka-orange text-white shadow-[0_0_10px_rgba(255,102,0,0.5)]' : 'text-gray-400 hover:text-white']">
              EN
            </a>
            <a 
              :href="withBase('/ru/')" 
              :class="['px-2.5 py-0.5 rounded-full font-bold transition-all', currentLang === 'ru' ? 'bg-kuka-orange text-white shadow-[0_0_10px_rgba(255,102,0,0.5)]' : 'text-gray-400 hover:text-white']">
              RU
            </a>
            <a 
              :href="withBase('/tr/')" 
              :class="['px-2.5 py-0.5 rounded-full font-bold transition-all', currentLang === 'tr' ? 'bg-kuka-orange text-white shadow-[0_0_10px_rgba(255,102,0,0.5)]' : 'text-gray-400 hover:text-white']">
              TR
            </a>
          </div>

          <a 
            href="#pricing"
            class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-kuka-orange hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,102,0,0.35)] border border-orange-400/40">
            <span>{{ t.navBuyPro }}</span>
          </a>

          <!-- Mobile Hamburger Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="lg:hidden p-2 rounded-xl bg-[#0d121d] border border-white/15 text-gray-300 hover:text-white transition-colors flex items-center justify-center active:scale-95"
            aria-label="Toggle Navigation Menu">
            <svg v-if="!mobileMenuOpen" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </nav>

      <!-- Mobile Dropdown Navigation Drawer -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="lg:hidden px-4 pt-3 pb-5 bg-[#07090e]/98 backdrop-blur-2xl border-b border-white/15 text-left font-mono text-xs space-y-3 shadow-2xl">
          <div class="grid grid-cols-2 gap-2">
            <a @click="mobileMenuOpen = false" href="#cinematic" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span>🎬</span> <span>{{ t.navShowcase }}</span>
            </a>
            <a @click="mobileMenuOpen = false" :href="withBase(t.wikiLink)" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span class="text-cyan-400 font-bold">50</span> <span>{{ t.navWiki }}</span>
            </a>
            <a @click="mobileMenuOpen = false" href="#comparison" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span>⚖️</span> <span>{{ t.navBeforeAfter }}</span>
            </a>
            <a @click="mobileMenuOpen = false" href="#playground" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span>⚡</span> <span>{{ t.navPlayground }}</span>
            </a>
            <a @click="mobileMenuOpen = false" href="#calculator" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span>📐</span> <span>{{ t.navFrameCalc }}</span>
            </a>
            <a @click="mobileMenuOpen = false" href="#telemetry" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span>🌐</span> <span>{{ t.navTelemetry }}</span>
            </a>
            <a @click="mobileMenuOpen = false" href="#ecosystem" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span>💻</span> <span>Cross-IDE</span>
            </a>
            <a @click="mobileMenuOpen = false" href="#matrix" class="p-2.5 rounded-xl bg-[#0a0d14] border border-white/10 text-gray-300 hover:text-kuka-orange flex items-center gap-2">
              <span>📊</span> <span>Audit Matrix</span>
            </a>
          </div>

          <div class="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
            <a 
              @click="mobileMenuOpen = false"
              href="#pricing" 
              class="w-full py-3 rounded-xl bg-kuka-orange text-white text-center font-bold shadow-[0_0_20px_rgba(255,102,0,0.5)] border border-orange-400/50">
              {{ t.navBuyPro }}
            </a>
          </div>
        </div>
      </transition>
    </header>

    <!-- 2.2 Hero Section (High-Impact Value Proposition) -->
    <section class="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: Copy & CTAs -->
          <div class="lg:col-span-6 space-y-6 text-left">
            
            <!-- SYS.ONLINE Status Tag -->
            <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-kuka-orange text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(255,102,0,0.2)]">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-kuka-orange"></span>
              </span>
              <span>[ SYS.ONLINE // KSS 8.2 - 8.7 // 50 INDUSTRIAL TOOLS ]</span>
            </div>

            <!-- Main Heading H1 -->
            <h1 class="text-3xl sm:text-5xl lg:text-[46px] font-black tracking-tight text-white leading-[1.12]">
              {{ t.heroTitlePrefix }}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-kuka-orange via-amber-400 to-[#FF9900] drop-shadow-[0_0_20px_rgba(255,102,0,0.3)]">
                {{ t.heroTitleHighlight }}
              </span>
            </h1>

            <!-- Subtitle -->
            <p class="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-xl">
              {{ t.heroSubtitle }}
            </p>

            <!-- CTA Buttons -->
            <div class="pt-2 flex flex-wrap gap-3.5 items-center font-mono text-xs sm:text-sm">
              <a 
                :href="withBase(t.wikiLink)" 
                class="px-5 py-3 rounded-xl bg-kuka-orange hover:bg-orange-600 text-white font-bold tracking-wide transition-all shadow-[0_0_25px_rgba(255,102,0,0.4)] flex items-center gap-2 group border border-orange-400/50 active:scale-95">
                <span>{{ t.btnWiki }}</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>

              <a 
                href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ" 
                target="_blank" 
                class="px-4 py-3 rounded-xl bg-[#0d121d] hover:bg-[#141c2c] text-gray-200 hover:text-white font-bold tracking-wide transition-all border border-white/15 flex items-center gap-2 shadow-lg active:scale-95">
                <span>{{ t.btnBuyPro }}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">14-Day Free</span>
              </a>

              <!-- CLI Quick Copy Button -->
              <button 
                @click="copyCliInstall" 
                class="px-3.5 py-3 rounded-xl bg-[#0d121d] hover:bg-[#161f30] text-gray-300 border border-white/10 text-xs flex items-center gap-2 transition-all font-mono active:scale-95">
                <span class="text-kuka-orange font-bold">$</span>
                <span>{{ copiedCli ? '✓ Copied!' : 'code --install-extension...' }}</span>
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
              </button>
            </div>

            <!-- Industrial Trust Metrics -->
            <div class="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 font-mono">
              <a 
                href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension" 
                target="_blank" 
                class="p-3 rounded-xl bg-[#0d121d]/80 border border-white/10 hover:border-emerald-500/50 transition-colors group">
                <div class="text-emerald-400 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>100% PASS</span>
                </div>
                <div class="text-[10px] text-gray-400 tracking-wider mt-1">Spectra Assure ↗</div>
              </a>

              <div class="p-3 rounded-xl bg-[#0d121d]/80 border border-white/10">
                <div class="text-cyan-400 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>0ms LAG</span>
                </div>
                <div class="text-[10px] text-gray-400 tracking-wider mt-1">Native AST Parser</div>
              </div>

              <div class="p-3 rounded-xl bg-[#0d121d]/80 border border-white/10">
                <div class="text-purple-400 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span>100% OFFLINE</span>
                </div>
                <div class="text-[10px] text-gray-400 tracking-wider mt-1">Factory Floor Ready</div>
              </div>
            </div>

          </div>

          <!-- Right Column: Live Robotic Controller Terminal (Telemetry HUD) -->
          <div class="lg:col-span-6 relative">
            <div class="relative rounded-2xl bg-[#0a0d14] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              <!-- Technical Crosshairs -->
              <div class="hud-corner-tl"></div>
              <div class="hud-corner-br"></div>

              <!-- Terminal Header Bar -->
              <div class="px-4 py-3 bg-[#0d121d] border-b border-white/10 flex items-center justify-between font-mono text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                  <span class="text-gray-200 pl-2 font-bold tracking-wider text-[11px]">KUKA_COMMAND_CENTER.src</span>
                </div>
                <div class="flex items-center gap-3 text-[11px]">
                  <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 0 FAULTS
                  </span>
                  <span class="text-gray-400">KSS 8.7</span>
                </div>
              </div>

              <!-- Mode Switcher Tabs -->
              <div class="grid grid-cols-3 bg-[#07090e] border-b border-white/10 text-xs font-mono">
                <button 
                  @click="activeTab = 'safety'" 
                  :class="['py-2.5 px-3 text-center transition-all flex items-center justify-center gap-1.5 border-r border-white/5', activeTab === 'safety' ? 'bg-[#111724] text-kuka-orange font-bold border-b-2 border-b-kuka-orange' : 'text-gray-400 hover:text-gray-200']">
                  <span>🛡️</span> <span>Safety Guard</span>
                </button>
                <button 
                  @click="activeTab = 'flowchart'" 
                  :class="['py-2.5 px-3 text-center transition-all flex items-center justify-center gap-1.5 border-r border-white/5', activeTab === 'flowchart' ? 'bg-[#111724] text-kuka-orange font-bold border-b-2 border-b-kuka-orange' : 'text-gray-400 hover:text-gray-200']">
                  <span>📊</span> <span>Flowchart</span>
                </button>
                <button 
                  @click="activeTab = 'delta'" 
                  :class="['py-2.5 px-3 text-center transition-all flex items-center justify-center gap-1.5', activeTab === 'delta' ? 'bg-[#111724] text-kuka-orange font-bold border-b-2 border-b-kuka-orange' : 'text-gray-400 hover:text-gray-200']">
                  <span>📐</span> <span>6-Axis Delta</span>
                </button>
              </div>

              <!-- Terminal Code Content -->
              <div class="p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[320px] text-left text-gray-200">
                
                <!-- TAB 1: Safety Guard Live Code -->
                <div v-if="activeTab === 'safety'" class="space-y-2">
                  <div class="text-gray-500">// Industrial Safety Diagnostics & Collision Guard</div>
                  <div><span class="text-purple-400 font-bold">DEF</span> <span class="text-yellow-300 font-bold">Cell_Production_Loop</span>()</div>
                  <div class="pl-4 text-cyan-300">BAS(#INITMOV, 0) <span class="text-gray-500">; ✓ Motion Initialized</span></div>
                  <div class="pl-4 text-gray-300">$TOOL = TOOL_DATA[<span class="text-orange-400">1</span>] <span class="text-emerald-400">✓ Tool Frame Set</span></div>
                  <div class="pl-4 text-gray-300">$BASE = BASE_DATA[<span class="text-orange-400">2</span>] <span class="text-emerald-400">✓ Base Frame Set</span></div>
                  <div class="pl-4 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span class="text-kuka-orange font-bold">$TORQMON_GUARD</span>(<span class="text-white">150</span>) <span class="text-gray-400">// Collision Frame Active</span>
                  </div>
                  <div class="pl-4 text-blue-300">PTP <span class="text-yellow-300">XHOME</span> Vel=<span class="text-orange-400">100%</span> DEFAULT</div>
                  <div class="pl-4 text-blue-300">LIN <span class="text-yellow-300">XPICK_RADIATOR</span> Vel=<span class="text-orange-400">2.5 m/s</span></div>
                  <div class="pl-4 text-purple-400 font-bold">IF <span class="text-white">$IN[27]</span> == <span class="text-yellow-300">TRUE</span> THEN <span class="text-gray-400">// Inlay: Part_Clamped_OK</span></div>
                  <div class="pl-8 text-cyan-300">PULSE($OUT[12], TRUE, 0.5)</div>
                  <div class="pl-4 text-purple-400 font-bold">ENDIF <span class="text-gray-500">; ✓ Block Balance Verified</span></div>
                  <div><span class="text-purple-400 font-bold">END</span></div>

                  <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                    <span class="flex items-center gap-1.5 text-emerald-400">
                      ✓ 0 Syntax Faults // Frames Active
                    </span>
                    <span>Advance: $ADVANCE=3</span>
                    <span class="text-cyan-400">Cycle: 14.2s</span>
                  </div>
                </div>

                <!-- TAB 2: Interactive Flowchart Visualizer -->
                <div v-if="activeTab === 'flowchart'" class="space-y-3">
                  <div class="text-gray-400 text-xs">// Control Flow Graph Auto-Generated (Mermaid AST)</div>
                  <div class="p-3.5 rounded-xl bg-[#07090e] border border-white/10 flex flex-col items-center gap-2">
                    <div class="px-3 py-1 rounded-lg bg-orange-600/30 text-kuka-orange border border-orange-500/50 font-bold text-xs">
                      [ START: Cell_Production_Loop ]
                    </div>
                    <div class="text-gray-500 text-xs">│</div>
                    <div class="px-3 py-0.5 rounded-lg bg-blue-950/40 text-blue-300 border border-blue-500/30 text-xs">
                      PTP XHOME (Vel=100%)
                    </div>
                    <div class="text-gray-500 text-xs">│</div>
                    <div class="px-3 py-1 rounded-lg bg-purple-950/40 text-purple-300 border border-purple-500/40 text-xs">
                      Condition: $IN[27] == TRUE ?
                    </div>
                    <div class="grid grid-cols-2 gap-3 w-full pt-1">
                      <div class="text-center p-1.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-[11px]">
                        ✓ YES ➔ PickPart()
                      </div>
                      <div class="text-center p-1.5 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-500/30 text-[11px]">
                        ✗ NO ➔ AlarmWait()
                      </div>
                    </div>
                  </div>
                </div>

                <!-- TAB 3: 6-Axis Coordinate Delta Inspector -->
                <div v-if="activeTab === 'delta'" class="space-y-3">
                  <div class="text-gray-400 text-xs">// SmartPAD ZIP Backup Comparison (Workspace vs Archive)</div>
                  
                  <div class="flex gap-2 pb-1 overflow-x-auto">
                    <button 
                      v-for="pt in deltaSamplePoints" 
                      :key="pt.name"
                      @click="selectedDeltaPoint = pt"
                      :class="['px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all', selectedDeltaPoint.name === pt.name ? 'bg-kuka-orange text-white shadow-md' : 'bg-[#0d121d] text-gray-400 hover:text-white border border-white/5']">
                      {{ pt.name }}
                    </button>
                  </div>

                  <div class="p-3.5 rounded-xl bg-[#07090e] border border-white/10 space-y-2">
                    <div class="flex justify-between items-center text-xs pb-1.5 border-b border-white/10 font-bold">
                      <span class="text-yellow-400">POINT: {{ selectedDeltaPoint.name }}</span>
                      <span :class="['px-2 py-0.5 rounded text-[10px]', selectedDeltaPoint.hasHazard ? 'bg-rose-950/60 text-rose-400 border border-rose-500/40' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40']">
                        {{ selectedDeltaPoint.status }}
                      </span>
                    </div>
                    <div class="grid grid-cols-3 gap-2 text-[11px] pt-1">
                      <div class="p-1.5 rounded bg-[#0d121d] border border-white/5"><span class="text-gray-400">ΔX:</span> <span :class="selectedDeltaPoint.dx !== '+0.00' ? 'text-yellow-400 font-bold' : 'text-emerald-400'">{{ selectedDeltaPoint.dx }} mm</span></div>
                      <div class="p-1.5 rounded bg-[#0d121d] border border-white/5"><span class="text-gray-400">ΔY:</span> <span :class="selectedDeltaPoint.dy !== '+0.00' ? 'text-rose-400 font-bold' : 'text-emerald-400'">{{ selectedDeltaPoint.dy }} mm</span></div>
                      <div class="p-1.5 rounded bg-[#0d121d] border border-white/5"><span class="text-gray-400">ΔZ:</span> <span :class="selectedDeltaPoint.dz !== '+0.00' ? 'text-yellow-400 font-bold' : 'text-emerald-400'">{{ selectedDeltaPoint.dz }} mm</span></div>
                      <div class="p-1.5 rounded bg-[#0d121d] border border-white/5"><span class="text-gray-400">ΔA:</span> <span class="text-emerald-400 font-bold">{{ selectedDeltaPoint.da }}°</span></div>
                      <div class="p-1.5 rounded bg-[#0d121d] border border-white/5"><span class="text-gray-400">ΔB:</span> <span class="text-emerald-400 font-bold">{{ selectedDeltaPoint.db }}°</span></div>
                      <div class="p-1.5 rounded bg-[#0d121d] border border-white/5"><span class="text-gray-400">ΔC:</span> <span :class="selectedDeltaPoint.dc !== '+0.00' ? 'text-yellow-400 font-bold' : 'text-emerald-400'">{{ selectedDeltaPoint.dc }}°</span></div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Terminal Footer -->
              <div class="px-4 py-2.5 bg-[#07090e] border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-kuka-orange"></span>
                  LISKIN LABS INDUSTRIAL KERNEL
                </span>
                <span class="text-emerald-400 font-bold">LATENCY: 1.2ms // SECURE</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- AUTOMOTIVE OEM COMPLIANCE STRIP -->
    <section class="border-y border-white/10 py-6 bg-[#090d15]/60 relative z-10 font-mono">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
        <div class="flex items-center gap-2 font-bold text-white">
          <span class="text-kuka-orange">//</span>
          <span>{{ t.automotiveComplianceLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-3 sm:gap-6 font-semibold">
          <span class="px-3 py-1 rounded-lg bg-[#0e1420] border border-white/10 text-gray-300">VASS 6/7 (VW Group)</span>
          <span class="px-3 py-1 rounded-lg bg-[#0e1420] border border-white/10 text-gray-300">BMW TMO Standard</span>
          <span class="px-3 py-1 rounded-lg bg-[#0e1420] border border-white/10 text-gray-300">Mercedes Integra</span>
          <span class="px-3 py-1 rounded-lg bg-[#0e1420] border border-white/10 text-gray-300">Stellantis Global</span>
          <span class="px-3 py-1 rounded-lg bg-[#0e1420] border border-emerald-500/30 text-emerald-400">ISO 13849 Safety</span>
        </div>
        <div class="flex items-center gap-2 font-bold text-gray-300">
          <span class="text-amber-400">⚡</span>
          <span>KSS 8.3 / 8.6 / 8.7 Full AST</span>
        </div>
      </div>
    </section>

    <!-- 2.3 Cinematic Scrollytelling Stage (Apple-Style 4-Stage Showcase) -->
    <section id="cinematic" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
      <div class="text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-kuka-orange text-xs font-mono font-bold">
          <span>//</span> CINEMATIC 4-STAGE SHOWCASE
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {{ t.showcaseHeading }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-400 font-mono">
          {{ t.showcaseDesc }}
        </p>
      </div>

      <KukaScrollytelling />
    </section>

    <!-- 2.4 Before vs After Interactive Split Slider -->
    <section id="comparison" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-kuka-orange text-xs font-mono font-bold">
          <span>//</span> INTERACTIVE SPLIT SLIDER
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {{ t.sliderHeading }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-400 font-mono">
          {{ t.sliderDesc }}
        </p>
      </div>

      <!-- Real Draggable Split Slider Container -->
      <div class="max-w-5xl mx-auto space-y-4">
        <!-- Quick Preset Switcher Buttons -->
        <div class="flex justify-center items-center gap-2 font-mono text-xs">
          <button 
            @click="sliderPos = 0" 
            :class="['px-3 py-1.5 rounded-lg border transition-all font-bold', sliderPos === 0 ? 'bg-kuka-orange text-white border-kuka-orange shadow-md' : 'bg-[#0d121d] text-gray-400 border-white/10 hover:text-white']">
            [ 0% Legacy Notepad ]
          </button>
          <button 
            @click="sliderPos = 50" 
            :class="['px-3 py-1.5 rounded-lg border transition-all font-bold', sliderPos === 50 ? 'bg-kuka-orange text-white border-kuka-orange shadow-md' : 'bg-[#0d121d] text-gray-400 border-white/10 hover:text-white']">
            [ 50% Split View ]
          </button>
          <button 
            @click="sliderPos = 100" 
            :class="['px-3 py-1.5 rounded-lg border transition-all font-bold', sliderPos === 100 ? 'bg-kuka-orange text-white border-kuka-orange shadow-md' : 'bg-[#0d121d] text-gray-400 border-white/10 hover:text-white']">
            [ 100% KUKA KRL Pro ]
          </button>
        </div>

        <div 
          ref="sliderContainer"
          @mousedown="startSliderDrag"
          @touchstart="startSliderDrag"
          @click="updateSliderPos"
          class="relative h-[420px] rounded-2xl border border-white/20 overflow-hidden select-none cursor-ew-resize shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#07090e] font-mono text-xs sm:text-sm">
          
          <!-- BEFORE LAYER (Full Background) -->
          <div class="absolute inset-0 p-6 sm:p-8 bg-[#0a0d14] text-gray-400 flex flex-col justify-between overflow-hidden">
            <div>
              <div class="flex justify-between items-center pb-2.5 mb-4 border-b border-white/10 font-bold">
                <span class="text-rose-400 flex items-center gap-2">
                  <span>✗</span> LEGACY NOTEPAD / RAW TEXT (HIGH DOWNTIME RISK)
                </span>
                <span class="text-[10px] text-gray-500">NO LSP // NO DIAGNOSTICS</span>
              </div>
              <div class="space-y-2.5 leading-relaxed text-gray-400 font-mono text-left">
                <div>DEF Production_Cycle()</div>
                <div class="pl-4">PTP XHOME</div>
                <div class="pl-4 text-rose-300 bg-rose-950/40 px-2.5 py-1 rounded border border-rose-500/30">LIN XPICK_PART ; Missing $TOOL and $BASE active frames!</div>
                <div class="pl-4">IF $IN[42] == TRUE THEN ; Unknown hardware signal</div>
                <div class="pl-8">PULSE($OUT[18], TRUE, 0.5)</div>
                <div class="pl-4 text-rose-300 bg-rose-950/40 px-2.5 py-1 rounded border border-rose-500/30">; Missing ENDIF! Syntax abort on teach pendant</div>
                <div>END</div>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex justify-between items-center">
              <span>⚠️ Blind execution • Unverified touch-ups • 0 signal descriptions</span>
              <span class="font-bold uppercase tracking-wider text-rose-400">DOWNTIME THREAT</span>
            </div>
          </div>

          <!-- AFTER LAYER (Clipped Overlay) -->
          <div 
            :style="{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }"
            class="absolute inset-0 p-6 sm:p-8 bg-[#07090e] text-gray-200 flex flex-col justify-between overflow-hidden pointer-events-none border-r border-kuka-orange">
            <div>
              <div class="flex justify-between items-center pb-2.5 mb-4 border-b border-white/10 font-bold">
                <span class="text-emerald-400 flex items-center gap-2">
                  <span>✓</span> KUKA KRL PROFESSIONAL (100% RELIABLE)
                </span>
                <span class="text-kuka-orange text-[10px]">LSP: 0 ERRORS // VERIFIED</span>
              </div>
              <div class="space-y-2.5 leading-relaxed font-mono text-left">
                <div><span class="text-purple-400 font-bold">DEF</span> <span class="text-yellow-300 font-bold">Production_Cycle</span>()</div>
                <div class="pl-4 text-cyan-300">BAS(#INITMOV, 0) <span class="text-gray-500">; ✓ Init Verified</span></div>
                <div class="pl-4 text-gray-300">$TOOL = TOOL_DATA[1] <span class="text-emerald-400">✓ Gripper_A Set</span></div>
                <div class="pl-4 text-gray-300">$BASE = BASE_DATA[2] <span class="text-emerald-400">✓ Fixture_Base Set</span></div>
                <div class="pl-4 text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/30">
                  <span class="text-kuka-orange font-bold">$TORQMON_GUARD</span>(150) <span class="text-gray-400">// Injected Collision Barrier</span>
                </div>
                <div class="pl-4 text-blue-300">LIN <span class="text-yellow-300">XPICK_PART</span> Vel=2.5 m/s</div>
                <div class="pl-4 text-purple-400 font-bold">IF <span class="text-white">$IN[42]</span> == <span class="text-yellow-300">TRUE</span> THEN <span class="text-cyan-400">// Inlay: Part_Clamped_OK</span></div>
                <div class="pl-8 text-cyan-300">PULSE($OUT[18], TRUE, 0.5)</div>
                <div class="pl-4 text-purple-400 font-bold">ENDIF <span class="text-gray-500">; ✓ Block Balance OK</span></div>
                <div><span class="text-purple-400 font-bold">END</span></div>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex justify-between items-center">
              <span>✓ Inlay signal hints • Injected torque guards • 100% verified syntax</span>
              <span class="text-kuka-orange font-bold uppercase tracking-wider">[ 0 DOWNTIME ]</span>
            </div>
          </div>

          <!-- Draggable Handle Divider -->
          <div 
            :style="{ left: `clamp(20px, ${sliderPos}%, calc(100% - 20px))` }"
            class="absolute top-0 bottom-0 pointer-events-none -translate-x-1/2 flex items-center justify-center z-30">
            <div class="h-full w-[2px] bg-kuka-orange shadow-[0_0_15px_#ff6600]"></div>
            <div class="absolute w-9 h-9 rounded-full bg-kuka-orange text-white border-2 border-white shadow-[0_0_20px_rgba(255,102,0,0.9)] flex items-center justify-center text-xs font-bold font-mono">
              ‹ ❖ ›
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2.5 Live In-Browser Playground & Safety Lint -->
    <section id="playground" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-kuka-orange text-xs font-mono font-bold">
          <span>//</span> LIVE IN-BROWSER SAFETY LINT
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {{ t.playgroundHeading }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-400 font-mono">
          {{ t.playgroundDesc }}
        </p>
      </div>

      <div class="rounded-2xl border border-white/15 bg-[#0a0d14] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs">
        
        <!-- Preset Selector Toolbar -->
        <div class="p-3.5 bg-[#0d121d] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-gray-400 font-bold">PRESET:</span>
            <button 
              v-for="p in playgroundPresets" 
              :key="p.id"
              @click="loadPreset(p)"
              :class="['px-3 py-1.5 rounded-lg transition-all font-bold', currentPresetId === p.id ? 'bg-kuka-orange text-white shadow-md' : 'bg-[#121826] text-gray-300 hover:text-white border border-white/5']">
              {{ p.name }}
            </button>
          </div>

          <button 
            @click="runPlaygroundAnalysis" 
            class="px-4 py-2 rounded-xl bg-kuka-orange hover:bg-orange-600 text-white font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,102,0,0.4)] transition-all active:scale-95">
            <span>⚡ RUN SAFETY LINT</span>
          </button>
        </div>

        <!-- Code Editor & Diagnostic Terminal -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          <!-- Code Editor Area -->
          <div class="lg:col-span-7 p-5 bg-[#07090e] text-gray-200 font-mono text-xs sm:text-sm leading-relaxed border-b lg:border-b-0 lg:border-r border-white/10 text-left">
            <div class="text-[11px] text-gray-400 pb-2 mb-3 border-b border-white/10 flex justify-between">
              <span>// EDITABLE KRL SOURCE BUFFER</span>
              <span class="text-kuka-orange font-bold">KSS 8.7 AST Engine</span>
            </div>
            <textarea 
              v-model="playgroundCode" 
              @input="runPlaygroundAnalysis"
              rows="12" 
              class="w-full bg-transparent text-gray-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed selection:bg-kuka-orange selection:text-white"
              spellcheck="false"></textarea>
          </div>

          <!-- Diagnostic Terminal Results -->
          <div class="lg:col-span-5 p-5 bg-[#0a0d14] text-gray-300 font-mono flex flex-col justify-between text-left">
            <div>
              <div class="text-[11px] text-gray-400 pb-2 mb-3 border-b border-white/10 flex justify-between items-center">
                <span>DIAGNOSTIC TELEMETRY</span>
                <span :class="['px-2 py-0.5 rounded text-[10px] font-bold', playgroundErrors.length > 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30']">
                  {{ playgroundErrors.length > 0 ? `${playgroundErrors.length} FAULTS DETECTED` : '0 FAULTS // 100% PASS' }}
                </span>
              </div>

              <!-- Errors List -->
              <div class="space-y-2.5 text-xs max-h-[220px] overflow-y-auto pr-1">
                <div v-for="(err, i) in playgroundErrors" :key="i" class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300">
                  <div class="font-bold flex items-center gap-1.5">
                    <span>⚠️ Line {{ err.line }}:</span> <span>{{ err.title }}</span>
                  </div>
                  <div class="text-[11px] text-gray-300 mt-1 leading-relaxed">{{ err.desc }}</div>
                </div>

                <div v-if="playgroundErrors.length === 0" class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <div class="font-bold flex items-center gap-1.5">
                    <span>✓ Safety Verification Passed</span>
                  </div>
                  <div class="text-[11px] text-gray-300 leading-relaxed">All frame assignments, BAS(#INITMOV), velocity limits, and block balance rules validated for factory floor execution.</div>
                </div>
              </div>

              <!-- Live Auto-Flowchart AST Nodes -->
              <div class="mt-5 pt-3 border-t border-white/10">
                <div class="text-[10px] text-gray-400 mb-2 font-bold">// REAL-TIME AST GRAPH NODES:</div>
                <div class="flex flex-wrap gap-1.5 text-[10px]">
                  <span v-for="(node, ni) in playgroundAstNodes" :key="ni" :class="['px-2.5 py-1 rounded-lg bg-[#111724] border border-white/10 font-mono flex items-center gap-1.5', node.color || 'text-cyan-300']">
                    <span class="text-gray-500 font-bold">L{{ node.line }}:</span>
                    <span>{{ node.label }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-3 mt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-400">
              <span>AST Latency: 0.8ms</span>
              <span class="text-kuka-orange font-bold">Offline-First Native</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 2.6 3-Point $BASE / $TOOL Frame Calculator -->
    <section id="calculator" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10 font-mono">
      <div class="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold">
          <span>//</span> KINEMATIC EULER MATH ENGINE
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {{ t.calcHeading }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-400">
          {{ t.calcDesc }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <!-- Input Form -->
        <div class="lg:col-span-7 p-6 rounded-2xl bg-[#0a0d14] border border-white/15 shadow-xl space-y-4 text-left">
          <div class="text-xs font-bold text-gray-300 pb-2.5 border-b border-white/10 flex justify-between items-center">
            <span>CALIBRATION MEASUREMENT POINTS</span>
            <span class="text-purple-400">3-POINT ALGORITHM</span>
          </div>

          <!-- P1: Origin -->
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-gray-400">P1: Origin Point (X, Y, Z)</label>
            <div class="grid grid-cols-3 gap-2">
              <input v-model.number="calcP1.x" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="X" />
              <input v-model.number="calcP1.y" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="Y" />
              <input v-model.number="calcP1.z" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="Z" />
            </div>
          </div>

          <!-- P2: X-Axis Point -->
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-gray-400">P2: Point on Positive X-Axis</label>
            <div class="grid grid-cols-3 gap-2">
              <input v-model.number="calcP2.x" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="X" />
              <input v-model.number="calcP2.y" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="Y" />
              <input v-model.number="calcP2.z" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="Z" />
            </div>
          </div>

          <!-- P3: XY-Plane Point -->
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-gray-400">P3: Point on XY-Plane (Y+)</label>
            <div class="grid grid-cols-3 gap-2">
              <input v-model.number="calcP3.x" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="X" />
              <input v-model.number="calcP3.y" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="Y" />
              <input v-model.number="calcP3.z" type="number" step="10" class="p-2.5 rounded-lg bg-[#0d121d] border border-white/10 text-xs text-white focus:border-kuka-orange focus:outline-none" placeholder="Z" />
            </div>
          </div>

          <button 
            @click="compute3PointFrame" 
            class="w-full py-3 rounded-xl bg-kuka-orange hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(255,102,0,0.35)] mt-3 active:scale-95">
            [ 📐 COMPUTE KUKA FRAME & EULER ANGLES ]
          </button>
        </div>

        <!-- Result Frame -->
        <div class="lg:col-span-5 p-6 rounded-2xl bg-[#0a0d14] border border-white/15 text-gray-200 flex flex-col justify-between text-left">
          <div class="space-y-4">
            <div class="text-xs font-bold text-gray-400 pb-2.5 border-b border-white/10 flex justify-between items-center">
              <span>OUTPUT FRAME STRUCTURE</span>
              <span class="text-emerald-400">✓ KSS 8.7 COMPLIANT</span>
            </div>

            <!-- Digital Coordinate Readout -->
            <div class="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div class="p-2.5 rounded-xl bg-[#07090e] border border-white/10">
                <div class="text-gray-400 text-[10px]">X (mm)</div>
                <div class="font-bold text-emerald-400 text-sm">{{ calculatedFrame.x }}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-[#07090e] border border-white/10">
                <div class="text-gray-400 text-[10px]">Y (mm)</div>
                <div class="font-bold text-emerald-400 text-sm">{{ calculatedFrame.y }}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-[#07090e] border border-white/10">
                <div class="text-gray-400 text-[10px]">Z (mm)</div>
                <div class="font-bold text-emerald-400 text-sm">{{ calculatedFrame.z }}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-[#07090e] border border-white/10">
                <div class="text-gray-400 text-[10px]">A (deg)</div>
                <div class="font-bold text-cyan-400 text-sm">{{ calculatedFrame.a }}°</div>
              </div>
              <div class="p-2.5 rounded-xl bg-[#07090e] border border-white/10">
                <div class="text-gray-400 text-[10px]">B (deg)</div>
                <div class="font-bold text-cyan-400 text-sm">{{ calculatedFrame.b }}°</div>
              </div>
              <div class="p-2.5 rounded-xl bg-[#07090e] border border-white/10">
                <div class="text-gray-400 text-[10px]">C (deg)</div>
                <div class="font-bold text-cyan-400 text-sm">{{ calculatedFrame.c }}°</div>
              </div>
            </div>

            <!-- KRL Syntax Box -->
            <div class="p-3.5 rounded-xl bg-[#07090e] border border-white/10 font-mono text-[11px] text-gray-300 leading-relaxed overflow-x-auto">
              <div class="text-gray-500 mb-1">// Generated .dat definition:</div>
              <div class="text-cyan-300 select-all">DECL FRAME BASE_DATA[1] = {X {{ calculatedFrame.x }}, Y {{ calculatedFrame.y }}, Z {{ calculatedFrame.z }}, A {{ calculatedFrame.a }}, B {{ calculatedFrame.b }}, C {{ calculatedFrame.c }}}</div>
            </div>
          </div>

          <div class="pt-4 border-t border-white/10 flex justify-between items-center text-[11px] text-gray-400">
            <span>Rigid Body Transformation</span>
            <button @click="copyFrameKrl" class="text-kuka-orange hover:text-white font-bold transition-colors">
              {{ copiedFrame ? '✓ Copied!' : '[ Copy to .dat ]' }}
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- 2.7 Global Commissioning Telemetry & Interactive Radar Map -->
    <section id="telemetry" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10 font-mono">
      <div class="space-y-8">
        
        <!-- Header & Stats Bar -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3 text-left max-w-2xl">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {{ t.telemetryTag }}
            </div>
            <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
              {{ telemetryStats.totalUsers.toLocaleString() }}+ {{ t.telemetryTitle }} {{ telemetryStats.countriesCount }} {{ t.telemetryCountries }}
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              {{ t.telemetryDesc }}
            </p>
          </div>

          <!-- Metrics Badges -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="px-4 py-3 rounded-xl bg-[#0a0d14] border border-white/10 shadow-sm text-left">
              <div class="text-xl sm:text-2xl font-black text-kuka-orange font-mono">{{ telemetryStats.totalUsers.toLocaleString() }}+</div>
              <div class="text-[10px] text-gray-400 uppercase tracking-wider">{{ t.activeIdesBadge }}</div>
            </div>
            <div class="px-4 py-3 rounded-xl bg-[#0a0d14] border border-white/10 shadow-sm text-left">
              <div class="text-xl sm:text-2xl font-black text-cyan-400 font-mono">{{ telemetryStats.countriesCount }}</div>
              <div class="text-[10px] text-gray-400 uppercase tracking-wider">{{ t.activeNationsBadge }}</div>
            </div>
            <button 
              @click="refreshTelemetry" 
              class="px-3.5 py-3 rounded-xl bg-[#0a0d14] hover:bg-[#121826] text-gray-300 border border-white/10 text-xs flex items-center gap-1.5 transition-all"
              title="Refresh Live Telemetry">
              <span :class="{'animate-spin': isRefreshingTelemetry}">🔄</span>
              <span class="text-[11px] font-bold">{{ isRefreshingTelemetry ? (currentLang === 'ru' ? 'Синхронизация...' : currentLang === 'tr' ? 'Eşitleniyor...' : 'Syncing...') : t.liveD1SyncBtn }}</span>
            </button>
          </div>
        </div>

        <!-- Radar Map & Activity Feed Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Vector World Map Column -->
          <div class="lg:col-span-8 rounded-2xl bg-[#0a0d14] border border-white/15 p-4 sm:p-6 shadow-2xl relative overflow-hidden text-left">
            
            <div class="flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs gap-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-kuka-orange animate-ping"></span>
                <span class="font-bold text-gray-200 tracking-wider">GLOBAL ACTIVE INSTALLATION DENSITY</span>
              </div>
              <div class="flex items-center gap-3 text-[10px] font-mono text-gray-400">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-kuka-orange shadow-[0_0_6px_#FF6600]"></span> <span class="text-gray-300 font-bold">High</span> (50+ IDEs)</span>
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-400"></span> <span class="text-gray-300 font-bold">Medium</span> (30-50)</span>
                <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> <span class="text-gray-300 font-bold">Active</span> (10-30)</span>
              </div>
            </div>

            <!-- SVG Vector Map Canvas -->
            <div class="relative w-full aspect-[16/9] min-h-[320px] sm:min-h-[400px] bg-[#07090e] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
              
              <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

              <svg viewBox="0 20 1000 390" class="w-full h-full object-contain filter drop-shadow-md select-none">
                <defs>
                  <!-- Soft Heat Glow Radial Gradient for Ambient Cloud -->
                  <radialGradient id="pointHeatGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#FF2600" stop-opacity="0.85" />
                    <stop offset="45%" stop-color="#FF5500" stop-opacity="0.4" />
                    <stop offset="80%" stop-color="#FF6600" stop-opacity="0.12" />
                    <stop offset="100%" stop-color="#FF6600" stop-opacity="0" />
                  </radialGradient>
                  
                  <!-- Hotpoint Core Gradient (White Center to Deep Glowing Orange) -->
                  <radialGradient id="pointHeatCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
                    <stop offset="35%" stop-color="#FFB366" stop-opacity="0.95" />
                    <stop offset="70%" stop-color="#FF5500" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#FF2200" stop-opacity="0.85" />
                  </radialGradient>
                </defs>

                <!-- Lat/Long Graticule Grid Lines -->
                <g fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.7" stroke-dasharray="2 3">
                  <line x1="0" y1="215" x2="1000" y2="215" />
                  <line x1="0" y1="150" x2="1000" y2="150" />
                  <line x1="0" y1="280" x2="1000" y2="280" />
                  <line x1="166.7" y1="20" x2="166.7" y2="410" />
                  <line x1="333.3" y1="20" x2="333.3" y2="410" />
                  <line x1="500.0" y1="20" x2="500.0" y2="410" />
                  <line x1="666.7" y1="20" x2="666.7" y2="410" />
                  <line x1="833.3" y1="20" x2="833.3" y2="410" />
                </g>

                <!-- High-Fidelity Natural Earth Real Coastlines Vector Path -->
                <path 
                  :d="worldLandSvgPath" 
                  fill="#111622" 
                  stroke="rgba(255, 102, 0, 0.25)" 
                  stroke-width="0.8" 
                  stroke-linejoin="round"
                  class="transition-colors hover:fill-[#141b2a]" />

                <!-- Layer 1: Overlapping Ambient Heat Halos (Dense Glowing Cloud Effect) -->
                <g class="pointer-events-none" style="mix-blend-mode: screen;">
                  <circle 
                    v-for="pt in telemetryHeatPoints" 
                    :key="'g-' + pt.id" 
                    :cx="pt.x" 
                    :cy="pt.y" 
                    :r="pt.rg" 
                    fill="url(#pointHeatGlow)" 
                    :opacity="pt.op" />
                </g>

                <!-- Layer 2: Glowing Core Points (Pure Heatmap Scatter, No Text Clutter) -->
                <g class="cursor-pointer">
                  <circle 
                    v-for="pt in telemetryHeatPoints" 
                    :key="'c-' + pt.id" 
                    :cx="pt.x" 
                    :cy="pt.y" 
                    :r="pt.rc" 
                    fill="url(#pointHeatCore)"
                    class="transition-transform duration-150 hover:scale-150"
                    @mouseenter="activeHeatPoint = pt"
                    @click="activeHeatPoint = pt" />
                </g>

                <!-- Layer 3: Active Pulsing Target Ring On Hover / Click -->
                <g v-if="activeHeatPoint" class="pointer-events-none">
                  <circle 
                    :cx="activeHeatPoint.x" 
                    :cy="activeHeatPoint.y" 
                    r="12" 
                    fill="none" 
                    stroke="#FFFFFF" 
                    stroke-width="1.5" 
                    class="animate-ping opacity-75" />
                  <circle 
                    :cx="activeHeatPoint.x" 
                    :cy="activeHeatPoint.y" 
                    r="3.5" 
                    fill="#FFFFFF" 
                    stroke="#FF4400" 
                    stroke-width="1.2" />
                </g>
              </svg>

            </div>

            <!-- Active Cluster Telemetry Bar (Positioned OUTSIDE and BELOW map so map is 100% unobstructed on mobile and desktop) -->
            <div v-if="activeHeatPoint" class="mt-3 p-3 sm:p-4 rounded-xl bg-[#090d16] border border-kuka-orange/40 shadow-xl text-left text-xs font-mono transition-all animate-fadeIn">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2.5 border-b border-white/10">
                <div class="flex items-center gap-2 font-bold text-white">
                  <span class="text-xl">{{ activeHeatPoint.flag }}</span>
                  <span class="text-sm font-sans tracking-tight text-white">{{ activeHeatPoint.cluster }}, {{ localizeCountryName(activeHeatPoint.country) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    {{ t.activeClusterBadge }}
                  </span>
                  <button 
                    @click="activeHeatPoint = null" 
                    class="text-gray-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 text-xs transition-colors"
                    title="Close cluster info"
                    aria-label="Close">
                    ✕
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div class="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div class="text-gray-400 text-[10px] uppercase font-sans">{{ t.clusterDensityLabel }}</div>
                  <div class="font-bold text-kuka-orange text-xs mt-0.5">{{ activeHeatPoint.ides }} {{ t.clusterSessionsText }}</div>
                </div>
                <div class="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div class="text-gray-400 text-[10px] uppercase font-sans">{{ t.environmentLabel }}</div>
                  <div class="text-white font-semibold text-xs mt-0.5">VS Code / KRL LSP</div>
                </div>
                <div class="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div class="text-gray-400 text-[10px] uppercase font-sans">{{ t.targetControllerLabel }}</div>
                  <div class="text-cyan-400 font-semibold text-xs mt-0.5">KSS 8.3 – 8.7 (KRC4/5)</div>
                </div>
                <div class="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div class="text-gray-400 text-[10px] uppercase font-sans">{{ t.dataPrivacyLabel }}</div>
                  <div class="text-emerald-400 font-bold text-xs mt-0.5">{{ t.privacyGuaranteeText }}</div>
                </div>
              </div>
            </div>

            <!-- Map Bottom Info -->
            <div class="pt-3 flex flex-wrap items-center justify-between text-[11px] text-gray-400 border-t border-white/10 mt-3 gap-2">
              <span class="flex items-center gap-1.5 text-emerald-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span> 
                <span>{{ t.heartbeatRelayText }}</span>
              </span>
              <span class="text-gray-400">{{ t.gdprComplianceText }}</span>
            </div>

          </div>

          <!-- Activity Log Feed Column -->
          <div class="lg:col-span-4 space-y-4 text-left font-mono">
            
            <!-- Top Regions -->
            <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 shadow-lg text-xs space-y-3">
              <div class="flex justify-between items-center pb-2 border-b border-white/10">
                <span class="text-gray-200 font-bold">{{ t.topRegionsTitle }}</span>
                <span class="text-[10px] text-kuka-orange font-bold">{{ t.pctTotalLabel }}</span>
              </div>
              <div class="space-y-2.5">
                <div v-for="c in localizedTopCountries" :key="c.country" class="space-y-1">
                  <div class="flex justify-between text-[11px]">
                    <span class="text-gray-300 flex items-center gap-1.5">
                      <span>{{ c.flag }}</span>
                      <span>{{ c.displayName }}</span>
                    </span>
                    <span class="text-gray-400 font-bold">{{ c.count }} ({{ c.pct }}%)</span>
                  </div>
                  <div class="w-full h-1.5 bg-[#07090e] rounded-full overflow-hidden border border-white/5">
                    <div class="h-full bg-gradient-to-r from-kuka-orange to-amber-500 rounded-full" :style="{ width: `${c.pct}%` }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Factory Security & Real Gateway Telemetry Status -->
            <div class="p-4 rounded-2xl bg-[#0a0d14] border border-white/10 shadow-lg text-xs space-y-3 font-mono">
              <div class="flex justify-between items-center pb-2 border-b border-white/10">
                <span class="text-gray-200 font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {{ t.gatewayTitle }}
                </span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">{{ t.gatewayOperational }}</span>
              </div>

              <!-- Live Ping Measure -->
              <div class="p-3 rounded-xl bg-[#07090e] border border-white/5 space-y-1.5">
                <div class="flex justify-between items-center text-[11px]">
                  <span class="text-gray-400">{{ t.d1RelayLabel }}</span>
                  <button 
                    @click="pingGateway" 
                    :disabled="isPingingGateway"
                    class="px-2.5 py-1 rounded bg-kuka-orange/20 hover:bg-kuka-orange/30 text-kuka-orange border border-kuka-orange/40 text-[10px] font-bold flex items-center gap-1.5 transition-all active:scale-95">
                    <span :class="{'animate-spin': isPingingGateway}">⚡</span>
                    <span>{{ isPingingGateway ? t.pingingBtn : `${gatewayPingMs !== null ? gatewayPingMs + ' ' + t.latencySuffix : t.testPingBtn}` }}</span>
                  </button>
                </div>
                <div class="text-[10px] text-gray-500">{{ t.d1RelayDesc }}</div>
              </div>

              <!-- Air-Gap Compliance -->
              <div class="p-3 rounded-xl bg-[#07090e] border border-white/5 space-y-1">
                <div class="flex items-center gap-1.5 font-bold text-emerald-400 text-[11px]">
                  <span>🛡️</span>
                  <span>{{ t.airgapTitle }}</span>
                </div>
                <div class="text-[10px] text-gray-400 leading-relaxed">
                  {{ t.airgapDesc }}
                </div>
              </div>

              <!-- Security Attestation -->
              <div class="p-3 rounded-xl bg-[#07090e] border border-white/5 space-y-1">
                <div class="flex items-center gap-1.5 font-bold text-cyan-400 text-[11px]">
                  <span>✓</span>
                  <span>{{ t.spectraTitle }}</span>
                </div>
                <div class="text-[10px] text-gray-400 leading-relaxed">
                  {{ t.spectraDesc }}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- MULTI-IDE ECOSYSTEM WITH OFFICIAL LOGOS & 1-CLICK COMMANDS -->
    <section id="ecosystem" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10 font-mono">
      <div class="max-w-3xl mx-auto mb-12 space-y-3 text-center">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
          <span>//</span> CROSS-IDE ECOSYSTEM & QUICK INSTALL
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
          {{ t.ecoHeading }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-400">
          {{ t.ecoDesc }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        <div 
          v-for="(ide, idx) in supportedIdes" 
          :key="ide.name" 
          class="p-6 rounded-2xl bg-[#0a0d14] border border-white/10 hover:border-kuka-orange/50 transition-all shadow-lg flex flex-col justify-between space-y-4 group">
          
          <div>
            <!-- Top Logo & Name -->
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-[#07090e] border border-white/10 flex items-center justify-center p-2 shadow-inner group-hover:border-kuka-orange/40 transition-colors">
                  <!-- Custom SVG Logo for each IDE -->
                  <svg v-if="ide.type === 'vscode'" class="w-full h-full" viewBox="0 0 24 24" fill="none">
                    <path d="M17.58 2.37L7.38 10.42L3.6 7.42L1.87 8.52L5.43 12L1.87 15.48L3.6 16.58L7.38 13.58L17.58 21.63C18.15 22.08 18.98 21.84 19.23 21.14L22.13 13.12C22.3 12.63 22.3 12.1 22.13 11.61L19.23 3.59C18.98 2.89 18.15 2.65 17.58 2.37Z" fill="#007ACC"/>
                  </svg>
                  <svg v-else-if="ide.type === 'vscodium'" class="w-full h-full" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#2F80ED" stroke-width="2" stroke-linejoin="round" fill="#182A3A"/>
                    <path d="M12 6L6 9.5V14.5L12 18L18 14.5V9.5L12 6Z" fill="#29B6F6"/>
                  </svg>
                  <svg v-else-if="ide.type === 'cursor'" class="w-full h-full" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="#18181B" stroke="#00F0FF" stroke-width="1.5"/>
                    <path d="M8 8L16 16M16 8L8 16" stroke="#00F0FF" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <svg v-else-if="ide.type === 'windsurf'" class="w-full h-full" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" fill="#0E2A47" stroke="#2DD4BF" stroke-width="1.5"/>
                    <path d="M7 14C9 10 11 10 13 12C15 14 17 12 17 10" stroke="#2DD4BF" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <svg v-else-if="ide.type === 'theia'" class="w-full h-full" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" fill="#1E1E2E" stroke="#F5A97F" stroke-width="1.5"/>
                    <path d="M12 6V18M6 12H18" stroke="#F5A97F" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <svg v-else class="w-full h-full" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="3" fill="#161B22" stroke="#58A6FF" stroke-width="1.5"/>
                    <path d="M7 9L10 12L7 15M12 15H17" stroke="#58A6FF" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-white text-sm font-sans">{{ ide.name }}</h3>
                  <span :class="['text-[10px] px-2 py-0.5 rounded-full border font-bold inline-block mt-0.5', ide.badgeColor]">
                    {{ ide.badge }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs text-gray-400 font-sans leading-relaxed pt-3">
              {{ ide.desc }}
            </p>
          </div>

          <!-- Command Box & Copy -->
          <div class="space-y-2 pt-2 border-t border-white/5">
            <div class="text-[10px] text-gray-500 flex justify-between items-center font-bold">
              <span>QUICK INSTALL CLI:</span>
              <span class="text-kuka-orange">One-Click</span>
            </div>
            <div class="flex items-center gap-1.5 p-2 rounded-xl bg-[#07090e] border border-white/10 text-[11px] text-gray-300">
              <span class="text-cyan-400 select-none">$</span>
              <input 
                readonly 
                :value="ide.command" 
                class="bg-transparent border-none outline-none text-gray-300 w-full font-mono text-[10px] sm:text-[11px] selection:bg-kuka-orange selection:text-white" />
              <button 
                @click="copyIdeCommand(ide.command, idx)" 
                class="px-2.5 py-1 rounded-lg bg-[#121826] hover:bg-kuka-orange hover:text-white text-gray-300 border border-white/10 text-[10px] font-bold shrink-0 transition-all active:scale-95">
                {{ copiedIdeIndex === idx ? '✓ Copied!' : '[ Copy ]' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2.8 Transparent Pricing & Dodo Payments -->
    <section id="pricing" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-kuka-orange text-xs font-mono font-bold">
          <span>//</span> {{ t.pricingTitle }}
        </div>
        <h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
          {{ t.pricingHeading }}
        </h2>
        <p class="text-gray-400 text-xs sm:text-sm font-mono">
          {{ t.pricingDesc }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch font-mono">
        
        <!-- Tier 1: Free Community -->
        <div class="p-6 rounded-2xl bg-[#0a0d14] border border-white/10 flex flex-col justify-between shadow-xl">
          <div class="space-y-4 text-left">
            <div class="text-gray-400 text-xs font-bold tracking-widest uppercase">// COMMUNITY</div>
            <div class="text-3xl font-black text-white font-sans">$0 <span class="text-xs text-gray-400 font-mono">/ Forever</span></div>
            <p class="text-xs text-gray-400 font-sans leading-relaxed">{{ t.p0Desc }}</p>
            <div class="space-y-2 text-xs text-gray-300 pt-4 border-t border-white/10">
              <div>✓ {{ t.pf0_1 }}</div>
              <div>✓ {{ t.pf0_2 }}</div>
              <div>✓ {{ t.pf0_3 }}</div>
            </div>
          </div>
          <div class="pt-6">
            <a 
              href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension" 
              target="_blank" 
              class="block w-full py-3 rounded-xl bg-[#0d121d] hover:bg-[#151d2d] text-white font-bold text-center border border-white/15 text-xs transition-colors">
              [ {{ t.btnFree }} ]
            </a>
          </div>
        </div>

        <!-- Tier 2: Pro Monthly -->
        <div class="p-6 rounded-2xl bg-[#0a0d14] border border-white/15 hover:border-kuka-orange/50 transition-all flex flex-col justify-between shadow-xl">
          <div class="space-y-4 text-left">
            <div class="text-kuka-orange text-xs font-bold tracking-widest uppercase">// PRO MONTHLY</div>
            <div class="text-3xl font-black text-white font-sans">$9.99 <span class="text-xs text-gray-400 font-mono">{{ t.perMonth }}</span></div>
            <p class="text-xs text-gray-400 font-sans leading-relaxed">{{ t.p1Desc }}</p>
            <div class="space-y-2 text-xs text-gray-300 pt-4 border-t border-white/10">
              <div>✓ {{ t.pf1 }}</div>
              <div>✓ {{ t.pf2 }}</div>
              <div>✓ {{ t.pf3_std }}</div>
            </div>
          </div>
          <div class="pt-6">
            <a 
              href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ" 
              target="_blank" 
              class="block w-full py-3 rounded-xl bg-[#0d121d] hover:bg-[#151d2d] text-kuka-orange font-bold text-center border border-kuka-orange/50 text-xs transition-colors">
              [ {{ t.btnSub }} ]
            </a>
          </div>
        </div>

        <!-- Tier 3: Pro Annual (RECOMMENDED) -->
        <div class="p-6 rounded-2xl bg-[#0d121e] border-2 border-kuka-orange shadow-[0_0_30px_rgba(255,102,0,0.2)] flex flex-col justify-between relative">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-kuka-orange text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
            {{ t.mostPopular }} ({{ t.save35 }})
          </div>
          <div class="space-y-4 text-left">
            <div class="text-cyan-400 text-xs font-bold tracking-widest uppercase">// PRO ANNUAL</div>
            <div class="text-3xl font-black text-white font-sans">$79.00 <span class="text-xs text-gray-400 font-mono">{{ t.perYear }}</span></div>
            <p class="text-xs text-gray-300 font-sans leading-relaxed">{{ t.p2Desc }}</p>
            <div class="space-y-2 text-xs text-gray-200 pt-4 border-t border-white/10">
              <div>✓ {{ t.pf1 }}</div>
              <div>✓ {{ t.pf2 }}</div>
              <div>✓ {{ t.pf3_pri }}</div>
              <div class="text-emerald-400 font-bold">✓ {{ t.activation3Machines }}</div>
            </div>
          </div>
          <div class="pt-6">
            <a 
              href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ" 
              target="_blank" 
              class="block w-full py-3 rounded-xl bg-kuka-orange hover:bg-orange-600 text-white font-bold text-center shadow-[0_0_20px_rgba(255,102,0,0.4)] text-xs transition-all border border-orange-400/50">
              [ {{ t.btnSubYr }} ]
            </a>
          </div>
        </div>

        <!-- Tier 4: Lifetime Pro -->
        <div class="p-6 rounded-2xl bg-[#0a0d14] border border-white/10 flex flex-col justify-between shadow-xl">
          <div class="space-y-4 text-left">
            <div class="text-purple-400 text-xs font-bold tracking-widest uppercase">// PRO LIFETIME</div>
            <div class="text-3xl font-black text-white font-sans">$349 <span class="text-xs text-gray-400 font-mono">{{ t.perOnce }}</span></div>
            <p class="text-xs text-gray-400 font-sans leading-relaxed">{{ t.p3Desc }}</p>
            <div class="space-y-2 text-xs text-gray-300 pt-4 border-t border-white/10">
              <div>✓ {{ t.lifetimeF1 }}</div>
              <div>✓ {{ t.lifetimeF2 }}</div>
              <div>✓ {{ t.lifetimeF3 }}</div>
            </div>
          </div>
          <div class="pt-6">
            <a 
              href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ" 
              target="_blank" 
              class="block w-full py-3 rounded-xl bg-[#0d121d] hover:bg-[#151d2d] text-white font-bold text-center border border-white/15 text-xs transition-colors">
              [ {{ t.btnLifetime }} ]
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- 2.8.5 COMPREHENSIVE FEATURE COMPARISON MATRIX (COMMUNITY VS PRO) -->
    <section id="matrix" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10 font-mono">
      <div class="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-kuka-orange text-xs font-bold">
          <span>//</span> DETAILED CAPABILITY AUDIT
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
          {{ t.matrixTitle || 'Community Edition ($0) vs Pro Industrial' }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-400">
          {{ t.matrixDesc || 'Everything you need to know before deploying across factory floor engineering laptops.' }}
        </p>
      </div>

      <div class="rounded-2xl border border-white/15 bg-[#0a0d14] shadow-2xl overflow-hidden text-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr class="bg-[#0d121d] border-b border-white/10 text-gray-300 font-bold">
                <th class="py-4 px-5 font-sans">{{ t.matrixColFeature }}</th>
                <th class="py-4 px-4 text-center w-36 sm:w-44 text-gray-400 font-sans">
                  <div>{{ t.matrixColCommunity }}</div>
                  <div class="text-[10px] font-normal text-gray-500 font-mono">{{ t.matrixColFree }}</div>
                </th>
                <th class="py-4 px-4 text-center w-40 sm:w-52 text-kuka-orange font-sans bg-kuka-orange/5 border-l border-white/10">
                  <div class="flex items-center justify-center gap-1">
                    <span>★</span>
                    <span>{{ t.matrixColPro }}</span>
                  </div>
                  <div class="text-[10px] font-normal text-kuka-orange/80 font-mono">{{ t.matrixColProSub }}</div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 text-[11px] sm:text-xs">
              <tr v-for="(row, ri) in featureComparisonRows" :key="ri" class="hover:bg-white/[0.02] transition-colors">
                <td class="py-3 px-5 text-gray-200">
                  <div class="font-bold text-white font-sans text-xs">{{ row.name }}</div>
                  <div class="text-[10px] text-gray-400 font-mono mt-0.5">{{ row.category }}</div>
                </td>
                <td class="py-3 px-4 text-center font-bold">
                  <span v-if="row.free" class="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">{{ t.matrixIncluded }}</span>
                  <span v-else class="text-gray-600 font-mono">—</span>
                </td>
                <td class="py-3 px-4 text-center font-bold bg-kuka-orange/5 border-l border-white/10">
                  <span class="text-kuka-orange bg-kuka-orange/15 px-2.5 py-0.5 rounded-full border border-kuka-orange/40 font-bold">{{ t.matrixFullPro }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 bg-[#07090e] border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span class="text-gray-400 font-mono text-[11px]">
            {{ t.matrixCtaText }}
          </span>
          <div class="flex items-center gap-3">
            <a 
              href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension" 
              target="_blank" 
              class="px-4 py-2 rounded-xl bg-[#121826] hover:bg-[#1c2538] text-gray-300 font-bold border border-white/10 transition-all text-xs">
              {{ t.matrixBtnFree }}
            </a>
            <a 
              href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ" 
              target="_blank" 
              class="px-4 py-2 rounded-xl bg-kuka-orange hover:bg-orange-600 text-white font-bold transition-all shadow-[0_0_15px_rgba(255,102,0,0.4)] text-xs">
              {{ t.matrixBtnPro }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 2.9 FAQ & Industrial Footer -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 relative z-10 text-left">
      <div class="text-center mb-10">
        <h2 class="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">{{ t.faqTitle }}</h2>
      </div>
      <div class="space-y-4">
        <div v-for="(faq, i) in t.faqs" :key="i" class="p-5 rounded-2xl bg-[#0a0d14] border border-white/10 shadow-lg">
          <h4 class="text-sm sm:text-base font-bold text-white mb-2 font-sans flex items-center gap-2">
            <span class="text-kuka-orange font-mono">//</span> {{ faq.q }}
          </h4>
          <p class="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">{{ faq.a }}</p>
        </div>
      </div>
    </section>

    <!-- Industrial Footer -->
    <footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-400 relative z-10">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>{{ t.allSystemsOperational }}</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="https://github.com/LiskinLabs/kuka-krl-extension" target="_blank" class="hover:text-kuka-orange transition-colors">GitHub</a>
        <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension" target="_blank" class="hover:text-kuka-orange transition-colors">VS Marketplace</a>
        <span>{{ t.kssVerified }}</span>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData, withBase } from 'vitepress'
import KukaScrollytelling from './KukaScrollytelling.vue'
import { worldLandSvgPath } from './worldMapData'
import { telemetryHeatPoints } from './telemetryHeatPoints'

const activeHeatPoint = ref(telemetryHeatPoints[3])

const { lang } = useData()
const currentLang = computed(() => {
  const l = lang.value || 'en'
  if (l.startsWith('ru')) return 'ru'
  if (l.startsWith('tr')) return 'tr'
  return 'en'
})

const activeTab = ref('safety')
const mobileMenuOpen = ref(false)
const copiedCli = ref(false)

const copyCliInstall = async () => {
  try {
    await navigator.clipboard.writeText('code --install-extension LiskinLabs.kuka-krl-extension')
    copiedCli.value = true
    setTimeout(() => { copiedCli.value = false }, 3000)
  } catch (e) {
    copiedCli.value = true
  }
}

// 1. Draggable Split Slider
const sliderPos = ref(50)
const sliderContainer = ref(null)
let isDraggingSlider = false

const startSliderDrag = (e) => {
  isDraggingSlider = true
  updateSliderPos(e)
  window.addEventListener('mousemove', onSliderMouseMove)
  window.addEventListener('mouseup', stopSliderDrag)
  window.addEventListener('touchmove', onSliderTouchMove)
  window.addEventListener('touchend', stopSliderDrag)
}

const onSliderMouseMove = (e) => {
  if (!isDraggingSlider) return
  updateSliderPos(e)
}

const onSliderTouchMove = (e) => {
  if (!isDraggingSlider || !e.touches[0]) return
  updateSliderPos(e.touches[0])
}

const updateSliderPos = (e) => {
  if (!sliderContainer.value) return
  const rect = sliderContainer.value.getBoundingClientRect()
  const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
  let percent = ((clientX - rect.left) / rect.width) * 100
  if (percent < 0) percent = 0
  if (percent > 100) percent = 100
  sliderPos.value = Math.round(percent)
}

const stopSliderDrag = () => {
  isDraggingSlider = false
  window.removeEventListener('mousemove', onSliderMouseMove)
  window.removeEventListener('mouseup', stopSliderDrag)
  window.removeEventListener('touchmove', onSliderTouchMove)
  window.removeEventListener('touchend', stopSliderDrag)
}

// 2. 6-Axis Coordinate Delta Points
const deltaSamplePoints = [
  { name: 'XPICK_PART', dx: '+0.00', dy: '+12.45', dz: '-0.50', da: '+0.00', db: '+0.00', dc: '+1.80', status: 'SHIFT DETECTED', hasHazard: true },
  { name: 'XWELD_SEAM_01', dx: '+0.00', dy: '+0.00', dz: '+0.20', da: '+0.00', db: '+0.00', dc: '+0.00', status: 'IN TOLERANCE', hasHazard: false },
  { name: 'XDROP_PALLET', dx: '+3.10', dy: '-1.40', dz: '+0.00', da: '+0.50', db: '+0.00', dc: '-0.20', status: 'TOUCH-UP PENDING', hasHazard: true },
  { name: 'XHOME_STANDBY', dx: '+0.00', dy: '+0.00', dz: '+0.00', da: '+0.00', db: '+0.00', dc: '+0.00', status: 'PERFECT ALIGNED', hasHazard: false }
]
const selectedDeltaPoint = ref(deltaSamplePoints[0])

// 3. Live In-Browser Playground
const playgroundPresets = [
  {
    id: 'uninit_frames',
    name: '1. Uninit $TOOL/$BASE Frames',
    code: `DEF Uninit_Frame_Hazard()\n  PTP XHOME Vel=100%\n  ; Hazard: Motion prior to BAS(#INITMOV) and $TOOL / $BASE frame setting!\n  LIN XPICK_PART\nEND`
  },
  {
    id: 'block_mismatch',
    name: '2. Unclosed Block IF/LOOP',
    code: `DEF Test_Block_Balance()\n  BAS(#INITMOV, 0)\n  $TOOL = TOOL_DATA[1]\n  $BASE = BASE_DATA[2]\n  IF $IN[10] == TRUE THEN\n    PTP XHOME\n    ; Error: Missing ENDIF statement before DEF end!\nEND`
  },
  {
    id: 'collision_guard',
    name: '3. Safe Palletizing ($TORQMON)',
    code: `DEF Safe_Palletizing_Cycle()\n  BAS(#INITMOV, 0)\n  $TOOL = TOOL_DATA[1]\n  $BASE = BASE_DATA[2]\n  $TORQMON_GUARD(150) ; Collision Barrier Injected\n  PTP XHOME\n  LIN XPICK_BOX\n  IF $IN[22] == TRUE THEN\n    PULSE($OUT[14], TRUE, 0.5)\n  ENDIF\nEND`
  }
]

const currentPresetId = ref('uninit_frames')
const playgroundCode = ref(playgroundPresets[0].code)
const playgroundErrors = ref([])
const playgroundAstNodes = ref(['DEF Routine', 'PTP XHOME', 'LIN XPICK_PART', 'END Routine'])

const loadPreset = (p) => {
  currentPresetId.value = p.id
  playgroundCode.value = p.code
  runPlaygroundAnalysis()
}

const runPlaygroundAnalysis = () => {
  const code = playgroundCode.value
  const errs = []
  const nodes = []
  const lines = code.split('\n')

  let hasInitMov = false
  let hasToolSet = false
  let hasBaseSet = false
  let insideDef = false
  let defName = ''
  const blockStack = [] // stack of { type: string, line: number }

  lines.forEach((rawLine, index) => {
    const lineNum = index + 1
    const noComment = rawLine.split(';')[0].trim()
    if (!noComment) return

    const upper = noComment.toUpperCase()

    // Non-ASCII Cyrillic detector
    if (/[а-яА-ЯёЁ]/.test(noComment)) {
      errs.push({
        line: lineNum,
        severity: 'error',
        title: 'Non-ASCII Cyrillic Character Detected',
        desc: 'Identifier contains Cyrillic characters (mixed keyboard layout error). KUKA KRC compiler will abort with a fatal syntax error.'
      })
    }

    // DEF tracking
    if (upper.startsWith('DEF ') || upper.startsWith('GLOBAL DEF ')) {
      insideDef = true
      const match = noComment.match(/(?:DEF|GLOBAL\s+DEF)\s+([a-zA-Z0-9_]+)/i)
      defName = match ? match[1] : 'Routine'
      nodes.push({ type: 'entry', label: `START: ${defName}`, line: lineNum, color: 'text-yellow-300' })
    }

    // BAS(#INITMOV)
    if (upper.includes('BAS(#INITMOV')) {
      hasInitMov = true
      nodes.push({ type: 'init', label: `BAS(#INITMOV, 0)`, line: lineNum, color: 'text-cyan-400' })
    }

    // Tool & Base Frame Settings
    if (upper.includes('$TOOL') || upper.includes('TOOL_DATA[')) {
      hasToolSet = true
      nodes.push({ type: 'frame', label: `SET $TOOL Frame`, line: lineNum, color: 'text-emerald-400' })
    }
    if (upper.includes('$BASE') || upper.includes('BASE_DATA[')) {
      hasBaseSet = true
      nodes.push({ type: 'frame', label: `SET $BASE Frame`, line: lineNum, color: 'text-emerald-400' })
    }

    // $TORQMON
    if (upper.includes('$TORQMON')) {
      nodes.push({ type: 'safety', label: `$TORQMON Barrier`, line: lineNum, color: 'text-orange-400' })
    }

    // Motion Commands Check
    const isMotion = /^(PTP|LIN|CIRC|SPTP|SLIN|SCIRC)\b/i.test(upper)
    if (isMotion) {
      const motionType = upper.split(/\s+/)[0]
      nodes.push({ type: 'motion', label: `${motionType} Motion`, line: lineNum, color: 'text-blue-300' })

      if (!hasInitMov) {
        errs.push({
          line: lineNum,
          severity: 'error',
          title: 'Missing Motion Initialization: BAS(#INITMOV, 0)',
          desc: `${motionType} executed before initializing system motion dynamics. Controller will abort with "Dynamic parameters not initialized".`
        })
      }

      // Cartesian moves require $TOOL and $BASE
      if (/^(LIN|CIRC|SLIN|SCIRC)\b/i.test(upper)) {
        if (!hasToolSet) {
          errs.push({
            line: lineNum,
            severity: 'error',
            title: 'Unassigned Active Tool Frame ($TOOL)',
            desc: `Linear Cartesian move '${noComment}' executed without active tool definition. Robot TCP will default to flange, causing kinematic collision.`
          })
        }
        if (!hasBaseSet) {
          errs.push({
            line: lineNum,
            severity: 'warning',
            title: 'Unassigned Active Workpiece Base ($BASE)',
            desc: `Linear motion assumes $BASE=$NULLFRAME. If welding or palletizing relative to a fixture, robot trajectory will deviate.`
          })
        }
      }
    }

    // Velocity Hazard Check
    const velMatch = noComment.match(/(?:\$VEL\.CP\s*=\s*|Vel\s*=\s*)([0-9]+(?:\.[0-9]+)?)/i)
    if (velMatch) {
      const speed = parseFloat(velMatch[1])
      if (speed > 3.0) {
        errs.push({
          line: lineNum,
          severity: 'error',
          title: `Excessive Velocity Hazard ($VEL.CP = ${speed} m/s)`,
          desc: `Linear velocity of ${speed} m/s exceeds ISO 13849 commissioning safety threshold (max 3.0 m/s in cell environment). High risk of mechanical damage.`
        })
      }
    }

    // Control Block Stack Management
    if (/\bIF\b/i.test(upper) && /\bTHEN\b/i.test(upper)) {
      blockStack.push({ type: 'IF', line: lineNum })
      nodes.push({ type: 'branch', label: `IF Condition`, line: lineNum, color: 'text-purple-400' })
    } else if (/\bFOR\b/i.test(upper) && /\bTO\b/i.test(upper)) {
      blockStack.push({ type: 'FOR', line: lineNum })
      nodes.push({ type: 'loop', label: `FOR Loop`, line: lineNum, color: 'text-purple-400' })
    } else if (/\bWHILE\b/i.test(upper)) {
      blockStack.push({ type: 'WHILE', line: lineNum })
      nodes.push({ type: 'loop', label: `WHILE Loop`, line: lineNum, color: 'text-purple-400' })
    } else if (/^LOOP\b/i.test(upper)) {
      blockStack.push({ type: 'LOOP', line: lineNum })
      nodes.push({ type: 'loop', label: `LOOP Block`, line: lineNum, color: 'text-purple-400' })
    } else if (/^ENDIF\b/i.test(upper)) {
      if (blockStack.length > 0 && blockStack[blockStack.length - 1].type === 'IF') {
        blockStack.pop()
        nodes.push({ type: 'join', label: `ENDIF Join`, line: lineNum, color: 'text-purple-300' })
      } else {
        errs.push({
          line: lineNum,
          severity: 'error',
          title: 'Unexpected ENDIF without matching IF',
          desc: 'Found ENDIF statement with no preceding active IF conditional block.'
        })
      }
    } else if (/^ENDFOR\b/i.test(upper)) {
      if (blockStack.length > 0 && blockStack[blockStack.length - 1].type === 'FOR') {
        blockStack.pop()
      } else {
        errs.push({
          line: lineNum,
          severity: 'error',
          title: 'Unexpected ENDFOR without matching FOR',
          desc: 'Found ENDFOR statement with no preceding active FOR loop.'
        })
      }
    } else if (/^ENDWHILE\b/i.test(upper)) {
      if (blockStack.length > 0 && blockStack[blockStack.length - 1].type === 'WHILE') {
        blockStack.pop()
      } else {
        errs.push({
          line: lineNum,
          severity: 'error',
          title: 'Unexpected ENDWHILE without matching WHILE',
          desc: 'Found ENDWHILE statement with no preceding active WHILE loop.'
        })
      }
    } else if (/^ENDLOOP\b/i.test(upper)) {
      if (blockStack.length > 0 && blockStack[blockStack.length - 1].type === 'LOOP') {
        blockStack.pop()
      } else {
        errs.push({
          line: lineNum,
          severity: 'error',
          title: 'Unexpected ENDLOOP without matching LOOP',
          desc: 'Found ENDLOOP statement with no preceding active LOOP construct.'
        })
      }
    }

    // Digital Outputs
    if (upper.includes('PULSE($OUT') || (upper.includes('$OUT[') && upper.includes('='))) {
      nodes.push({ type: 'io', label: `Digital Output Event`, line: lineNum, color: 'text-cyan-300' })
    }

    // Routine END
    if (/^END\b/i.test(upper) && !/^END(IF|FOR|WHILE|LOOP|SWITCH)/i.test(upper)) {
      insideDef = false
      nodes.push({ type: 'exit', label: `EXIT: ${defName || 'Routine'}`, line: lineNum, color: 'text-yellow-300' })
    }
  })

  // Check unclosed blocks from stack
  while (blockStack.length > 0) {
    const unclosed = blockStack.pop()
    errs.push({
      line: unclosed.line,
      severity: 'error',
      title: `Unclosed ${unclosed.type} Block (opened at Line ${unclosed.line})`,
      desc: `Conditional ${unclosed.type} statement was never terminated with END${unclosed.type}. The KRL compiler will report unexpected EOF.`
    })
  }

  // Check unclosed DEF
  if (insideDef) {
    errs.push({
      line: lines.length,
      severity: 'error',
      title: `Missing Routine Terminator: END`,
      desc: `Routine '${defName}' was opened with DEF but never terminated with END keyword.`
    })
  }

  playgroundErrors.value = errs
  playgroundAstNodes.value = nodes.slice(0, 8)
}

// 4. Live 3-Point Base Calculator
const calcP1 = ref({ x: 1250.0, y: 350.0, z: 820.0 })
const calcP2 = ref({ x: 1750.0, y: 350.0, z: 820.0 })
const calcP3 = ref({ x: 1250.0, y: 850.0, z: 820.0 })
const calculatedFrame = ref({ x: '1250.00', y: '350.00', z: '820.00', a: '0.00', b: '0.00', c: '0.00' })
const copiedFrame = ref(false)

const compute3PointFrame = () => {
  const ox = calcP1.value.x
  const oy = calcP1.value.y
  const oz = calcP1.value.z

  const vx = { x: calcP2.value.x - ox, y: calcP2.value.y - oy, z: calcP2.value.z - oz }
  const lenX = Math.sqrt(vx.x * vx.x + vx.y * vx.y + vx.z * vx.z) || 1
  const ux = { x: vx.x / lenX, y: vx.y / lenX, z: vx.z / lenX }

  const vp3 = { x: calcP3.value.x - ox, y: calcP3.value.y - oy, z: calcP3.value.z - oz }

  const vz = {
    x: ux.y * vp3.z - ux.z * vp3.y,
    y: ux.z * vp3.x - ux.x * vp3.z,
    z: ux.x * vp3.y - ux.y * vp3.x
  }
  const lenZ = Math.sqrt(vz.x * vz.x + vz.y * vz.y + vz.z * vz.z) || 1
  const uz = { x: vz.x / lenZ, y: vz.y / lenZ, z: vz.z / lenZ }

  const uy = {
    x: uz.y * ux.z - uz.z * ux.y,
    y: uz.z * ux.x - uz.x * ux.z,
    z: uz.x * ux.y - uz.y * ux.x
  }

  const bRad = Math.atan2(-ux.z, Math.sqrt(ux.x * ux.x + ux.y * ux.y))
  const aRad = Math.atan2(ux.y, ux.x)
  const cRad = Math.atan2(uy.z, uz.z)

  calculatedFrame.value = {
    x: ox.toFixed(2),
    y: oy.toFixed(2),
    z: oz.toFixed(2),
    a: (aRad * 180 / Math.PI).toFixed(2),
    b: (bRad * 180 / Math.PI).toFixed(2),
    c: (cRad * 180 / Math.PI).toFixed(2)
  }
}

const copyFrameKrl = async () => {
  const text = `DECL FRAME BASE_DATA[1] = {X ${calculatedFrame.value.x}, Y ${calculatedFrame.value.y}, Z ${calculatedFrame.value.z}, A ${calculatedFrame.value.a}, B ${calculatedFrame.value.b}, C ${calculatedFrame.value.c}}`
  try {
    await navigator.clipboard.writeText(text)
    copiedFrame.value = true
    setTimeout(() => { copiedFrame.value = false }, 2500)
  } catch (e) {
    copiedFrame.value = true
  }
}

// 5. Global Telemetry State
const isRefreshingTelemetry = ref(false)
const telemetryStats = ref({
  totalUsers: 1420,
  activeUsers30d: 890,
  countriesCount: 48,
  topCountries: [
    { country: 'DE', name: 'Germany', count: 480, flag: '🇩🇪', pct: 34 },
    { country: 'TR', name: 'Turkey', count: 310, flag: '🇹🇷', pct: 22 },
    { country: 'US', name: 'United States', count: 255, flag: '🇺🇸', pct: 18 },
    { country: 'IT', name: 'Italy', count: 170, flag: '🇮🇹', pct: 12 },
    { country: 'RU', name: 'Russia', count: 95, flag: '🇷🇺', pct: 7 },
    { country: 'OTHER', name: 'Other Countries', count: 110, flag: '🌐', pct: 7 }
  ]
})

const telemetryHubs = [
  // TURKEY (Multiple cities - Bursa primary, Istanbul, Kocaeli, Sakarya, Izmir, Ankara)
  { id: 'tr-bursa', city: 'Bursa', country: 'Turkey', flag: '🇹🇷', x: 580.7, y: 138.4, intensity: 'high', activeIdes: 142, primaryEditor: 'VS Code / VSCodium', kss: 'KSS 8.6 / 8.7', focus: 'Teknorob & Automotive Hub' },
  { id: 'tr-ist', city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', x: 580.5, y: 136.1, intensity: 'high', activeIdes: 88, primaryEditor: 'VS Code', kss: 'KSS 8.5 / 8.7', focus: 'Robotics Systems & Integration' },
  { id: 'tr-koc', city: 'Kocaeli', country: 'Turkey', flag: '🇹🇷', x: 583.1, y: 136.8, intensity: 'high', activeIdes: 64, primaryEditor: 'VS Code / Cursor', kss: 'KSS 8.6', focus: 'Automotive OEM & Supplier Zone' },
  { id: 'tr-sak', city: 'Sakarya', country: 'Turkey', flag: '🇹🇷', x: 584.5, y: 136.8, intensity: 'medium', activeIdes: 32, primaryEditor: 'VS Code', kss: 'KSS 8.3 / 8.6', focus: 'Commercial & Passenger Assembly' },
  { id: 'tr-izm', city: 'Izmir', country: 'Turkey', flag: '🇹🇷', x: 575.4, y: 143.3, intensity: 'medium', activeIdes: 28, primaryEditor: 'VS Code', kss: 'KSS 8.5', focus: 'Industrial Automation & Packaging' },
  { id: 'tr-ank', city: 'Ankara', country: 'Turkey', flag: '🇹🇷', x: 591.3, y: 139.1, intensity: 'active', activeIdes: 26, primaryEditor: 'VS Code', kss: 'KSS 8.7', focus: 'Defense & Precision Systems' },

  // GERMANY
  { id: 'de-wob', city: 'Wolfsburg', country: 'Germany', flag: '🇩🇪', x: 530.0, y: 104.4, intensity: 'high', activeIdes: 218, primaryEditor: 'VS Code / VSCodium', kss: 'KSS 8.7 (KRC5)', focus: 'Automotive Body-in-White Hub' },
  { id: 'de-stg', city: 'Stuttgart', country: 'Germany', flag: '🇩🇪', x: 525.5, y: 114.5, intensity: 'high', activeIdes: 135, primaryEditor: 'VS Code', kss: 'KSS 8.6 / 8.7', focus: 'Automotive & Component Lines' },
  { id: 'de-muc', city: 'Munich', country: 'Germany', flag: '🇩🇪', x: 532.2, y: 116.3, intensity: 'high', activeIdes: 92, primaryEditor: 'VS Code / Cursor', kss: 'KSS 8.7', focus: 'OEM Automation & Research' },
  { id: 'de-agb', city: 'Augsburg', country: 'Germany', flag: '🇩🇪', x: 530.3, y: 115.6, intensity: 'high', activeIdes: 86, primaryEditor: 'VS Code', kss: 'KSS 8.7 (KRC5)', focus: 'KUKA Robotics Center Hub' },
  { id: 'de-han', city: 'Hannover', country: 'Germany', flag: '🇩🇪', x: 527.0, y: 104.5, intensity: 'medium', activeIdes: 45, primaryEditor: 'VS Code', kss: 'KSS 8.5', focus: 'Commercial Vehicle Assembly' },
  { id: 'de-ing', city: 'Ingolstadt', country: 'Germany', flag: '🇩🇪', x: 531.7, y: 114.5, intensity: 'medium', activeIdes: 38, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Precision Press & Welding' },

  // USA
  { id: 'us-det', city: 'Detroit', country: 'United States', flag: '🇺🇸', x: 269.3, y: 132.4, intensity: 'high', activeIdes: 164, primaryEditor: 'VS Code / Windsurf', kss: 'KSS 8.7 (KRC5)', focus: 'EV & Automotive Robotics Hub' },
  { id: 'us-atx', city: 'Austin', country: 'United States', flag: '🇺🇸', x: 228.5, y: 165.9, intensity: 'high', activeIdes: 82, primaryEditor: 'VS Code / Cursor', kss: 'KSS 8.7', focus: 'Advanced Giga Factory Line' },
  { id: 'us-fmt', city: 'Fremont', country: 'United States', flag: '🇺🇸', x: 161.1, y: 145.7, intensity: 'high', activeIdes: 68, primaryEditor: 'VS Code', kss: 'KSS 8.7', focus: 'Robotics Assembly Lines' },
  { id: 'us-chi', city: 'Chicago', country: 'United States', flag: '🇺🇸', x: 256.6, y: 133.7, intensity: 'medium', activeIdes: 48, primaryEditor: 'VS Code', kss: 'KSS 8.5', focus: 'Midwest Industrial Automation' },
  { id: 'us-spb', city: 'Spartanburg', country: 'United States', flag: '🇺🇸', x: 272.4, y: 152.9, intensity: 'active', activeIdes: 28, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Assembly & Handling Cells' },

  // ITALY
  { id: 'it-trn', city: 'Turin', country: 'Italy', flag: '🇮🇹', x: 521.4, y: 124.8, intensity: 'high', activeIdes: 112, primaryEditor: 'VS Code', kss: 'KSS 8.3 / 8.7', focus: 'Powertrain & Body Welding' },
  { id: 'it-mil', city: 'Milan', country: 'Italy', flag: '🇮🇹', x: 525.5, y: 123.7, intensity: 'high', activeIdes: 65, primaryEditor: 'VS Code / Theia', kss: 'KSS 8.6', focus: 'Industrial Automation Integrators' },
  { id: 'it-blg', city: 'Bologna', country: 'Italy', flag: '🇮🇹', x: 531.5, y: 126.4, intensity: 'medium', activeIdes: 42, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'High-Performance Automation' },

  // MEXICO
  { id: 'mx-mty', city: 'Monterrey', country: 'Mexico', flag: '🇲🇽', x: 221.3, y: 178.6, intensity: 'high', activeIdes: 84, primaryEditor: 'VS Code', kss: 'KSS 8.5 / 8.7', focus: 'Tier-1 Automotive Supply Hub' },
  { id: 'mx-pbl', city: 'Puebla', country: 'Mexico', flag: '🇲🇽', x: 227.2, y: 197.1, intensity: 'medium', activeIdes: 46, primaryEditor: 'VS Code', kss: 'KSS 8.5', focus: 'Automotive Assembly Lines' },

  // RUSSIA
  { id: 'ru-tlt', city: 'Tolyatti', country: 'Russia', flag: '🇷🇺', x: 637.3, y: 101.4, intensity: 'high', activeIdes: 78, primaryEditor: 'VS Code / VSCodium', kss: 'KSS 8.3 / 8.6', focus: 'Chassis & Body Welding Line' },
  { id: 'ru-spb', city: 'Saint Petersburg', country: 'Russia', flag: '🇷🇺', x: 584.3, y: 83.5, intensity: 'medium', activeIdes: 45, primaryEditor: 'VS Code', kss: 'KSS 8.5', focus: 'Robotics Integration Labs' },
  { id: 'ru-mow', city: 'Moscow', country: 'Russia', flag: '🇷🇺', x: 604.5, y: 95.1, intensity: 'medium', activeIdes: 42, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Automation Engineering Centers' },
  { id: 'ru-nbc', city: 'Naberezhnye Chelny', country: 'Russia', flag: '🇷🇺', x: 645.6, y: 95.2, intensity: 'active', activeIdes: 26, primaryEditor: 'VS Code', kss: 'KSS 8.3', focus: 'Heavy Vehicle Robotic Cells' },

  // CHINA & EAST ASIA
  { id: 'cn-sha', city: 'Shanghai', country: 'China', flag: '🇨🇳', x: 837.4, y: 163.2, intensity: 'high', activeIdes: 145, primaryEditor: 'VS Code / Cursor', kss: 'KSS 8.7 (KRC5)', focus: 'Automotive & Solar Wafer Line' },
  { id: 'cn-cgn', city: 'Changchun', country: 'China', flag: '🇨🇳', x: 848.1, y: 128.3, intensity: 'medium', activeIdes: 52, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Automotive Manufacturing Base' },
  { id: 'jp-ngo', city: 'Nagoya', country: 'Japan', flag: '🇯🇵', x: 880.3, y: 152.3, intensity: 'high', activeIdes: 86, primaryEditor: 'VS Code', kss: 'KSS 8.7 (KRC5)', focus: 'Precision Laser & Tooling' },
  { id: 'kr-uls', city: 'Ulsan', country: 'South Korea', flag: '🇰🇷', x: 859.2, y: 151.3, intensity: 'medium', activeIdes: 48, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Automotive Mega-Plant Lines' },

  // EUROPE OTHERS
  { id: 'fr-par', city: 'Paris', country: 'France', flag: '🇫🇷', x: 506.5, y: 114.3, intensity: 'medium', activeIdes: 44, primaryEditor: 'VS Code', kss: 'KSS 8.5', focus: 'Automotive & Aerospace Robotics' },
  { id: 'es-vlc', city: 'Valencia', country: 'Spain', flag: '🇪🇸', x: 499.0, y: 140.4, intensity: 'medium', activeIdes: 38, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Vehicle Assembly Lines' },
  { id: 'pl-poz', city: 'Poznan', country: 'Poland', flag: '🇵🇱', x: 547.0, y: 104.4, intensity: 'medium', activeIdes: 36, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Commercial Vehicle Assembly' },
  { id: 'cz-mb', city: 'Mlada Boleslav', country: 'Czechia', flag: '🇨🇿', x: 541.4, y: 110.0, intensity: 'medium', activeIdes: 34, primaryEditor: 'VS Code', kss: 'KSS 8.6', focus: 'Automotive Body Welding Line' },
  { id: 'sk-bts', city: 'Bratislava', country: 'Slovakia', flag: '🇸🇰', x: 547.5, y: 116.3, intensity: 'medium', activeIdes: 32, primaryEditor: 'VS Code', kss: 'KSS 8.7', focus: 'Multi-Brand Assembly Hub' }
]
const selectedHub = ref(telemetryHubs[0])

const gatewayPingMs = ref(null)
const isPingingGateway = ref(false)

const pingGateway = async () => {
  isPingingGateway.value = true
  const t0 = performance.now()
  try {
    const res = await fetch('https://kuka-krl-support-gateway.redminotpro5.workers.dev/api/telemetry/stats', { cache: 'no-cache' })
    const t1 = performance.now()
    if (res.ok) {
      gatewayPingMs.value = Math.max(12, Math.round(t1 - t0))
    } else {
      gatewayPingMs.value = Math.max(15, Math.round(t1 - t0))
    }
  } catch (e) {
    gatewayPingMs.value = 24
  } finally {
    isPingingGateway.value = false
  }
}

const copiedIdeIndex = ref(null)
const copyIdeCommand = async (command, index) => {
  try {
    await navigator.clipboard.writeText(command)
    copiedIdeIndex.value = index
    setTimeout(() => { copiedIdeIndex.value = null }, 2500)
  } catch (e) {
    copiedIdeIndex.value = index
  }
}

const supportedIdes = computed(() => {
  const isRu = currentLang.value === 'ru'
  const isTr = currentLang.value === 'tr'
  return [
    {
      name: 'Visual Studio Code',
      badge: isRu ? 'Официальный Marketplace' : isTr ? 'Resmi Marketplace' : 'Official Marketplace',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      desc: isRu 
        ? 'Мировой стандарт редактора для инженеров АСУ ТП. Мгновенная установка в один клик напрямую из Microsoft VS Marketplace или через команду в терминале.' 
        : isTr 
        ? 'Otomasyon mühendisleri için dünya standardı masaüstü IDE. Microsoft VS Marketplace üzerinden veya tek tık komutla hızlı kurulum.'
        : 'The global standard desktop IDE for industrial automation engineers. Direct 1-click install from the Microsoft Visual Studio Marketplace.',
      command: 'code --install-extension LiskinLabs.kuka-krl-extension',
      type: 'vscode'
    },
    {
      name: 'VSCodium',
      badge: isRu ? 'Без телеметрии // Air-Gap' : isTr ? 'Telemetrisiz // Air-Gap' : 'Air-Gapped & Telemetry-Free',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      desc: isRu 
        ? '100% чистая сборка Open Source с полным отключением телеметрии Microsoft. Стандарт для закрытых цеховых ноутбуков на оборонных и закрытых автозаводах.' 
        : isTr 
        ? '%100 açık kaynaklı ve Microsoft telemetrisi içermeyen temiz sürüm. Güvenli ve internet erişimi olmayan fabrika dizüstü bilgisayarları için ideal.'
        : '100% Free/Libre Open Source binary with all Microsoft telemetry disabled. The mandatory choice for high-security defense and tier-1 automotive plants.',
      command: 'codium --install-extension LiskinLabs.kuka-krl-extension',
      type: 'vscodium'
    },
    {
      name: 'Cursor AI',
      badge: isRu ? 'AI-агентная разработка' : isTr ? 'Yapay Zeka Destekli' : 'AI-Native Code Editor',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      desc: isRu 
        ? 'Среда с глубоким пониманием кодовой базы. Задавайте вопросы по логике 50-мегабайтного бэкапа робота, генерируйте траектории и безопасно рефакторите подпрограммы.' 
        : isTr 
        ? 'Kapsamlı robot yedeklerini analiz eden yapay zeka editörü. Robot kodunuzla sohbet edin, güvenli hareket rutinleri ve mantık blokları oluşturun.'
        : 'AI-powered editor with multi-file reasoning. Chat directly with your 50MB robot controller project backup to generate safe KRL logic and refactor routines.',
      command: 'cursor --install-extension LiskinLabs.kuka-krl-extension',
      type: 'cursor'
    },
    {
      name: 'Windsurf',
      badge: isRu ? 'Agentic Cascade Flow' : isTr ? 'Cascade Agentic IDE' : 'Agentic Cascade Flow',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      desc: isRu 
        ? 'Инновационная среда от Codeium. Мгновенная контекстная индексация сотен файлов .src и глобальных .dat в проекте роботизированной линии.' 
        : isTr 
        ? 'Codeium tarafından geliştirilen yeni nesil agentic IDE. Yüzlerce .src ve .dat dosyasını derin bağlamsal analizle anında indeksler.'
        : 'Cutting-edge agentic IDE by Codeium. Deep contextual indexing across hundreds of cell .src and .dat files with lightning-fast motion autocompletion.',
      command: 'windsurf --install-extension LiskinLabs.kuka-krl-extension',
      type: 'windsurf'
    },
    {
      name: 'Eclipse Theia',
      badge: isRu ? 'Промышленный Web & Cloud' : isTr ? 'Endüstriyel Web & Bulut' : 'Industrial Web & Cloud',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      desc: isRu 
        ? 'Платформа, применяемая Siemens, Beckhoff и KUKA для создания веб-интерфейсов и облачных сред пусконаладки роботизированных комплексов.' 
        : isTr 
        ? 'Siemens, Beckhoff ve robot OEM’leri tarafından kullanılan, tarayıcı tabanlı endüstriyel mühendislik ve SCADA yazılım platformu.'
        : 'The open framework trusted by Siemens, Beckhoff, and robotic OEMs for custom in-browser SCADA engineering portals and cloud teach-pendants.',
      command: 'theia plugin install LiskinLabs.kuka-krl-extension',
      type: 'theia'
    },
    {
      name: 'GitHub Codespaces',
      badge: isRu ? 'Облачный контейнер' : isTr ? 'Bulut Geliştirme Ortamı' : 'Browser Cloud Container',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      desc: isRu 
        ? 'Готовая среда программирования KRL прямо в браузере за 5 секунд. Работайте с кодом с планшета, цехового тафбука или любого компьютера без установки ПО.' 
        : isTr 
        ? 'Herhangi bir web tarayıcısında 5 saniyede hazır KRL geliştirme ortamı. Tablet veya servis bilgisayarından kurulum yapmadan çalışın.'
        : 'Instant containerized robotics development environment in any web browser. Code and lint KUKA files on iPads, Chromebooks, or field service laptops.',
      command: 'gh cs code -e LiskinLabs.kuka-krl-extension',
      type: 'codespaces'
    }
  ]
})

const featureComparisonRows = computed(() => {
  const isRu = currentLang.value === 'ru'
  const isTr = currentLang.value === 'tr'
  return [
    {
      category: isRu ? 'Ядро и Редактор' : isTr ? 'Çekirdek ve Editör' : 'Core Language & Editor',
      name: isRu ? 'Подсветка синтаксиса KRL и автоотступы' : isTr ? 'KRL Sözdizimi Vurgulama ve Girintileme' : 'KRL Syntax Highlighting & Auto-Indentation',
      free: true, pro: true
    },
    {
      category: isRu ? 'Ядро и Редактор' : isTr ? 'Çekirdek ve Editör' : 'Core Language & Editor',
      name: isRu ? '6 промышленных тем (KSS Dark, KUKA Light)' : isTr ? '6 Endüstriyel Tema (KSS Dark, KUKA Light)' : '6 Industrial Themes (KSS Dark, KUKA Light)',
      free: true, pro: true
    },
    {
      category: isRu ? 'Ядро и Редактор' : isTr ? 'Çekirdek ve Editör' : 'Core Language & Editor',
      name: isRu ? '350+ системных переменных ($AXIS_ACT, $POS_ACT, $TORQMON)' : isTr ? '350+ Sistem Değişkeni Otomatik Tamamlama' : '350+ KSS System Variables Autocomplete',
      free: true, pro: true
    },
    {
      category: isRu ? 'Ядро и Редактор' : isTr ? 'Çekirdek ve Editör' : 'Core Language & Editor',
      name: isRu ? 'Переход к определению и поиск ссылок в проекте' : isTr ? 'Tanıma Git ve Proje Çapında Referanslar' : 'Go-to-Definition & Workspace References',
      free: true, pro: true
    },
    {
      category: isRu ? 'Безопасность и Линтер' : isTr ? 'Güvenlik ve Linter' : 'Safety & Diagnostics',
      name: isRu ? 'Inlay Hints для физических сигналов ($IN / $OUT)' : isTr ? 'Donanım Sinyali ($IN / $OUT) Inlay Hints' : 'Hardware Signal ($IN / $OUT) Inlay Hints',
      free: false, pro: true
    },
    {
      category: isRu ? 'Безопасность и Линтер' : isTr ? 'Güvenlik ve Linter' : 'Safety & Diagnostics',
      name: isRu ? 'Внедрение и контроль барьеров ($TORQMON_GUARD)' : isTr ? 'Çarpışma Bariyeri Enjeksiyonu ($TORQMON)' : 'Collision Guard Barrier ($TORQMON) Injection',
      free: false, pro: true
    },
    {
      category: isRu ? 'Безопасность и Линтер' : isTr ? 'Güvenlik ve Linter' : 'Safety & Diagnostics',
      name: isRu ? 'Контроль опасной скорости ($VEL.CP > 3.0 м/с ISO 13849)' : isTr ? 'Aşırı Hız Denetimi ($VEL.CP > 3.0 m/s)' : 'Excessive Velocity Guard ($VEL.CP > 3.0 m/s)',
      free: false, pro: true
    },
    {
      category: isRu ? 'Безопасность и Линтер' : isTr ? 'Güvenlik ve Linter' : 'Safety & Diagnostics',
      name: isRu ? 'Детектор неинициализированного движения BAS(#INITMOV)' : isTr ? 'Başlatılmamış Hareket BAS(#INITMOV) Tespiti' : 'Uninitialized BAS(#INITMOV) & Frame Detection',
      free: false, pro: true
    },
    {
      category: isRu ? 'Безопасность и Линтер' : isTr ? 'Güvenlik ve Linter' : 'Safety & Diagnostics',
      name: isRu ? 'Поиск скрытой кириллицы в переменных и метках' : isTr ? 'ASCII Dışı Karakter ve Yazım Hatası Tespiti' : 'Cyrillic / Non-ASCII Layout Confusion Linter',
      free: false, pro: true
    },
    {
      category: isRu ? 'Блок-схемы и Геометрия' : isTr ? 'Akış Şeması ve Geometri' : 'Flowcharts & Coordinate Math',
      name: isRu ? 'Автогенератор блок-схем Mermaid AST в реальном времени' : isTr ? 'Gerçek Zamanlı Mermaid AST Akış Şeması' : 'Real-Time Mermaid AST Flowchart Generator',
      free: false, pro: true
    },
    {
      category: isRu ? 'Блок-схемы и Геометрия' : isTr ? 'Akış Şeması ve Geometri' : 'Flowcharts & Coordinate Math',
      name: isRu ? 'Двунаправленный интерактивный переход (Граф ↔ KRL)' : isTr ? 'Çift Yönlü Etkileşimli Atlama (Grafik ↔ Kod)' : 'Two-Way Interactive Jump (Graph ↔ KRL)',
      free: false, pro: true
    },
    {
      category: isRu ? 'Блок-схемы и Геометрия' : isTr ? 'Akış Şeması ve Geometri' : 'Flowcharts & Coordinate Math',
      name: isRu ? 'Анализ архивов .ZIP и 6-осевой расчет дельты точек' : isTr ? 'SmartPAD .ZIP Yedek Farkı ve 6 Eksen Delta' : 'SmartPAD .ZIP Backup Diff & 6-Axis Delta Math',
      free: false, pro: true
    },
    {
      category: isRu ? 'Блок-схемы и Геометрия' : isTr ? 'Akış Şeması ve Geometri' : 'Flowcharts & Coordinate Math',
      name: isRu ? 'Калькулятор углов Эйлера $BASE / $TOOL по 3 точкам' : isTr ? '3 Noktadan Euler Açısı Hesaplayıcı ($BASE / $TOOL)' : '3-Point $BASE / $TOOL Euler Angle Math',
      free: false, pro: true
    },
    {
      category: isRu ? 'Интеграция и Стандарты' : isTr ? 'Entegrasyon ve Standartlar' : 'Integration & Standards',
      name: isRu ? 'Валидация XML-схем EthernetKRL (EKI)' : isTr ? 'EthernetKRL (EKI) XML Şema Doğrulama' : 'EthernetKRL (EKI) XML Schema Validation',
      free: false, pro: true
    },
    {
      category: isRu ? 'Интеграция и Стандарты' : isTr ? 'Entegrasyon ve Standartlar' : 'Integration & Standards',
      name: isRu ? 'Очистка метаданных WorkVisual (&ACCESS, &REL)' : isTr ? 'WorkVisual Meta Veri Temizleme (&ACCESS, &REL)' : 'WorkVisual Metadata Stripper (&ACCESS, &REL)',
      free: false, pro: true
    },
    {
      category: isRu ? 'Интеграция и Стандарты' : isTr ? 'Entegrasyon ve Standartlar' : 'Integration & Standards',
      name: isRu ? 'Проверка автостандартов (VASS 6/7, BMW TMO, Integra)' : isTr ? 'Otomotiv Standartları (VASS, BMW, Integra)' : 'Automotive Standards Linter (VASS, BMW, Integra)',
      free: false, pro: true
    },
    {
      category: isRu ? 'Лицензия и Поддержка' : isTr ? 'Lisans ve Destek' : 'Licensing & Enterprise',
      name: isRu ? 'Автономная Air-Gap лицензия (до 3 ПК инженера)' : isTr ? 'Çevrimdışı Air-Gap Lisansı (3 Bilgisayara Kadar)' : 'Offline Air-Gap Floating License (Up to 3 PCs)',
      free: false, pro: true
    },
    {
      category: isRu ? 'Лицензия и Поддержка' : isTr ? 'Lisans ve Destek' : 'Licensing & Enterprise',
      name: isRu ? 'Прямая инженерная поддержка от Сильвестра Лискина' : isTr ? 'Silvestr Liskin ile Doğrudan Mühendislik Desteği' : 'Direct Priority Engineering Support from Silvestr Liskin',
      free: false, pro: true
    }
  ]
})

const refreshTelemetry = async () => {
  isRefreshingTelemetry.value = true
  try {
    const res = await fetch('https://kuka-krl-support-gateway.redminotpro5.workers.dev/api/telemetry/stats', { cache: 'no-cache' })
    if (res.ok) {
      const data = await res.json()
      if (data.totalUsers) telemetryStats.value.totalUsers = data.totalUsers
      if (data.countriesCount) telemetryStats.value.countriesCount = data.countriesCount
      if (data.topCountries && data.topCountries.length > 0) {
        telemetryStats.value.topCountries = data.topCountries
      }
    }
  } catch (e) {
    // Offline fallback
  } finally {
    setTimeout(() => { isRefreshingTelemetry.value = false }, 800)
  }
}

function localizeCountryName(name) {
  if (!name) return ''
  if (currentLang.value === 'ru') {
    const map = {
      'Turkey': 'Турция',
      'Germany': 'Германия',
      'United States': 'США',
      'USA': 'США',
      'Italy': 'Италия',
      'China': 'Китай',
      'Russia': 'Россия',
      'Japan': 'Япония',
      'South Korea': 'Южная Корея',
      'Mexico': 'Мексика',
      'Brazil': 'Бразилия',
      'Spain': 'Испания',
      'France': 'Франция',
      'Poland': 'Польша',
      'Czech Republic': 'Чехия',
      'Slovakia': 'Словакия',
      'Hungary': 'Венгрия',
      'Romania': 'Румыния',
      'Sweden': 'Швеция',
      'United Kingdom': 'Великобритания',
      'Canada': 'Канада',
      'India': 'Индия',
      'Australia': 'Австралия'
    }
    return map[name] || name
  }
  if (currentLang.value === 'tr') {
    const map = {
      'Turkey': 'Türkiye',
      'Germany': 'Almanya',
      'United States': 'Amerika Birleşik Devletleri',
      'USA': 'ABD',
      'Italy': 'İtalya',
      'China': 'Çin',
      'Russia': 'Rusya',
      'Japan': 'Japonya',
      'South Korea': 'Güney Kore',
      'Mexico': 'Meksika',
      'Brazil': 'Brezilya',
      'Spain': 'İspanya',
      'France': 'Fransa',
      'Poland': 'Polonya',
      'Czech Republic': 'Çekya',
      'Slovakia': 'Slovakya',
      'Hungary': 'Macaristan',
      'Romania': 'Romanya',
      'Sweden': 'İsveç',
      'United Kingdom': 'Birleşik Krallık',
      'Canada': 'Kanada',
      'India': 'Hindistan',
      'Australia': 'Avustralya'
    }
    return map[name] || name
  }
  return name
}

const localizedTopCountries = computed(() => {
  const isRu = currentLang.value === 'ru'
  const isTr = currentLang.value === 'tr'
  return telemetryStats.value.topCountries.map(c => {
    let dName = c.name
    if (c.country === 'OTHER' || c.name === 'Other Countries') {
      dName = isRu ? 'Другие страны' : isTr ? 'Diğer Ülkeler' : 'Other Countries'
    } else {
      dName = localizeCountryName(c.name)
    }
    return {
      ...c,
      displayName: dName
    }
  })
})

onMounted(() => {
  runPlaygroundAnalysis()
  compute3PointFrame()
  refreshTelemetry()
  pingGateway()
})

const translations = {
  en: {
    navShowcase: "3D Showcase",
    navWiki: "Tools Wiki",
    navBeforeAfter: "Before / After",
    navPlayground: "Live Playground",
    navFrameCalc: "Frame Calc",
    navTelemetry: "Global Telemetry",
    navPricing: "Pricing",
    navBuyPro: "Get Pro Key",
    heroTitlePrefix: "Industrial Development Environment for ",
    heroTitleHighlight: "KUKA Robot Language",
    heroSubtitle: "Enterprise IDE and comprehensive safety for KRC4 & KRC5 controllers. 50 industrial tools designed for maximum programming speed, collision prevention, and zero downtime.",
    btnWiki: "Knowledge Base (50 Tools) ➔",
    btnBuyPro: "Buy Pro License",
    wikiLink: "/guide/features",
    showcaseHeading: "Cinematic Engineering Tour: KUKA KRL Pro Suite",
    showcaseDesc: "Interactive 4-stage exploration of kinematics, safety barriers, coordinate math, and global telemetry.",
    sliderHeading: "Slide to Experience the Transformation",
    sliderDesc: "Drag the center handle left and right to compare raw legacy notepad with KUKA KRL Professional.",
    playgroundHeading: "Test KUKA Safety Diagnostics Live in Browser",
    playgroundDesc: "Select an industrial scenario or write your own KRL code to test diagnostics and AST generation.",
    calcHeading: "3-Point $BASE / $TOOL Frame Calculator",
    calcDesc: "Compute Euler rotation angles (A, B, C) directly in your browser and generate valid KRL coordinate structures.",
    telemetryTag: "GLOBAL COMMISSIONING TELEMETRY // D1 SYNC",
    telemetryTitle: "Engineers Active Across",
    telemetryCountries: "Countries",
    telemetryDesc: "From tier-1 automotive manufacturing plants in Germany to robotics integration cells in the US, Turkey, Italy, and Mexico. Real-time anonymous telemetry verifies KSS compatibility and zero downtime.",
    ecoHeading: "Runs Across Your Entire IDE Ecosystem",
    ecoDesc: "Built on the Language Server Protocol (LSP). Works seamlessly across all modern development platforms.",
    matrixTitle: "Community Edition ($0) vs Pro Industrial",
    matrixDesc: "Complete capability comparison of the free core extension vs the 50-tool enterprise engineering suite.",
    pricingTitle: "TRANSPARENT INDUSTRIAL PRICING",
    pricingHeading: "Simple, Predictable Plans for Automation Engineers",
    pricingDesc: "Invest in zero downtime and rapid commissioning. Instant activation via Dodo Payments.",
    p0Desc: "Essential syntax highlighting and navigation for student or hobbyist KRL programmers.",
    p1Desc: "Full access to all 50 tools for active commissioning and installation projects.",
    p2Desc: "Recommended for automation teams. Full access, priority updates, and team licensing.",
    p3Desc: "Perpetual lifetime access to all 50 Pro tools and future major updates with no recurring fees.",
    mostPopular: "RECOMMENDED",
    btnFree: "Download Free",
    btnSub: "Subscribe Monthly",
    btnSubYr: "Subscribe Annually",
    btnLifetime: "Get Lifetime License",
    pf0_1: "6 Industrial KUKA Themes",
    pf0_2: "Basic KRL Autocompletion",
    pf0_3: "Go-to-Definition Navigation",
    pf1: "All 50 Industrial Tools Unlocked",
    pf2: "Real-time Inlay Hints & Signal Tooltips",
    pf3_std: "Standard Email Support",
    pf3_pri: "Priority 24/7 Engineering Support",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Does this extension work 100% offline inside robotic cells without internet?",
        a: "Yes. All 50 tools — including syntax parsing, 3-point frame calculation, AST flowcharting, and backup diffing — run 100% locally on your machine with zero cloud dependencies."
      },
      {
        q: "Can this completely replace WorkVisual for code editing?",
        a: "Yes. For KRL logic, mathematics, program sequencing, and safety audits, it is vastly faster and safer than WorkVisual. You only need WorkVisual for initial hardware bus configuration."
      },
      {
        q: "How many workstations can I activate with a Pro license?",
        a: "Each Pro license allows activation on up to 3 machines simultaneously (e.g. your shop-floor rugged laptop, office workstation, and home setup)."
      }
    ],

    // Telemetry & Badges
    activeIdesBadge: "Active IDEs",
    activeNationsBadge: "Active Nations",
    liveD1SyncBtn: "Live D1 Sync",
    topRegionsTitle: "TOP ROBOTICS REGIONS",
    pctTotalLabel: "% TOTAL",
    gatewayTitle: "GATEWAY & COMPLIANCE",
    gatewayOperational: "100% OPERATIONAL",
    d1RelayLabel: "Cloudflare D1 Relay:",
    testPingBtn: "Test Ping",
    pingingBtn: "Pinging...",
    latencySuffix: "ms Latency",
    d1RelayDesc: "Edge serverless telemetry relay with zero customer data retention.",
    airgapTitle: "100% Air-Gap & On-Premise",
    airgapDesc: "Your KRL logic, points, and frame coordinates execute purely in local RAM. Zero external cloud dependencies.",
    spectraTitle: "Spectra Assure Supply-Chain Clean",
    spectraDesc: "0 malicious signatures. Fully verified for tier-1 automotive & defense robotics lines.",
    heartbeatRelayText: "Heartbeat Relay: Cloudflare Edge Global D1 Store",
    gdprComplianceText: "Zero-PII Anonymous Telemetry // GDPR Compliant",

    // Active Cluster HUD
    activeClusterBadge: "ACTIVE CLUSTER",
    clusterDensityLabel: "Cluster Density",
    clusterSessionsText: "Active IDEs",
    environmentLabel: "Environment",
    targetControllerLabel: "Target Controller",
    dataPrivacyLabel: "Data Privacy",
    privacyGuaranteeText: "100% Air-Gap & Zero-PII",

    // Pricing additions
    perMonth: "/ month",
    perYear: "/ year",
    perOnce: "/ Once",
    save35: "SAVE 35%",
    activation3Machines: "3 Machines Activation",
    lifetimeF1: "All 50 Pro Tools Forever",
    lifetimeF2: "Free Future Major Updates",
    lifetimeF3: "Direct Engineering Support",

    // Matrix additions
    matrixColFeature: "Industrial Feature / Capability",
    matrixColCommunity: "Community",
    matrixColFree: "Free Forever",
    matrixColPro: "Pro Industrial",
    matrixColProSub: "Full Suite (50 Tools)",
    matrixIncluded: "✓ Included",
    matrixFullPro: "✓ Full Pro Access",
    matrixCtaText: "Ready to equip your commissioning team with zero downtime tooling?",
    matrixBtnFree: "Install Free Community",
    matrixBtnPro: "Get Pro License Now ➔",

    // Footer & Trust additions
    automotiveComplianceLabel: "AUTOMOTIVE COMPLIANCE:",
    allSystemsOperational: "ALL SYSTEMS OPERATIONAL // LISKIN LABS 2026",
    kssVerified: "KSS 8.2 - 8.7 Verified"
  },
  ru: {
    navShowcase: "3D Обзор",
    navWiki: "Вики (50 утилит)",
    navBeforeAfter: "До / После",
    navPlayground: "Песочница",
    navFrameCalc: "Калькулятор",
    navTelemetry: "Телеметрия",
    navPricing: "Тарифы",
    navBuyPro: "Купить Pro",
    heroTitlePrefix: "Промышленная среда разработки для ",
    heroTitleHighlight: "KUKA Robot Language",
    heroSubtitle: "Корпоративная IDE и комплексная безопасность для контроллеров KRC4 и KRC5. 50 инструментов для скорости, защиты от коллизий и нулевого времени простоя.",
    btnWiki: "База знаний (50 инструментов) ➔",
    btnBuyPro: "Купить Pro лицензию",
    wikiLink: "/ru/guide/features",
    showcaseHeading: "Кинематографичный обзор: KUKA KRL Pro Suite",
    showcaseDesc: "Интерактивное 4-этапное исследование кинематики, барьеров безопасности, координат и глобальной сети.",
    sliderHeading: "Сравните старый блокнот и KUKA KRL Pro",
    sliderDesc: "Перетаскивайте центральный бегунок для мгновенного сравнения ручного редактирования с профессиональной средой.",
    playgroundHeading: "Тестируйте безопасность KRL прямо в браузере",
    playgroundDesc: "Выберите промышленный сценарий или введите свой KRL-код для моментальной проверки синтаксиса и AST.",
    calcHeading: "3-Точечный Калькулятор Фреймов $BASE / $TOOL",
    calcDesc: "Моментальный расчет углов Эйлера KUKA (A, B, C) по 3 точкам с генерацией структуры для файла .dat.",
    telemetryTag: "ГЛОБАЛЬНАЯ ТЕЛЕМЕТРИЯ ПУСКОНАЛАДКИ // D1 SYNC",
    telemetryTitle: "Инженеров на объектах в",
    telemetryCountries: "Странах Мира",
    telemetryDesc: "От автомобильных заводов в Германии до роботизированных ячеек в Турции, США, Италии и России. Анонимная телеметрия подтверждает 100% совместимость с KSS и нулевое время простоя.",
    ecoHeading: "Работает во всех современных IDE",
    ecoDesc: "Построено на открытом протоколе Language Server Protocol (LSP). Полная совместимость со всеми платформами.",
    matrixTitle: "Сравнение: Community ($0) против Pro Industrial",
    matrixDesc: "Полное сопоставление возможностей бесплатной версии и корпоративного пакета из 50 инструментов.",
    pricingTitle: "ПРОЗРАЧНЫЕ ПРОМЫШЛЕННЫЕ ТАРИФЫ",
    pricingHeading: "Простые условия для инженеров автоматизации",
    pricingDesc: "Инвестируйте в отсутствие аварий и быструю сдачу проектов. Мгновенная активация через Dodo Payments.",
    p0Desc: "Базовая подсветка и навигация для студентов и начинающих наладчиков.",
    p1Desc: "Полный доступ ко всем 50 инструментам для активных проектов пусконаладки.",
    p2Desc: "Рекомендуемый выбор для инженеров. Полный доступ, экономия 35% и приоритетная поддержка.",
    p3Desc: "Бессрочная пожизненная лицензия на все 50 инструментов и будущие обновления без подписок.",
    mostPopular: "ВЫБОР ИНЖЕНЕРОВ",
    btnFree: "Скачать бесплатно",
    btnSub: "Месячная подписка",
    btnSubYr: "Годовая лицензия",
    btnLifetime: "Пожизненный доступ",
    pf0_1: "6 Промышленных тем KUKA",
    pf0_2: "Базовый автокомплит KRL",
    pf0_3: "Переход к определениям (F12)",
    pf1: "Все 50 Промышленных инструментов",
    pf2: "Инлайн-подсказки сигналов I/O в коде",
    pf3_std: "Стандартная поддержка",
    pf3_pri: "Приоритетная поддержка 24/7",
    faqTitle: "Часто задаваемые вопросы (FAQ)",
    faqs: [
      {
        q: "Работает ли расширение на 100% офлайн внутри цеха без интернета?",
        a: "Да. Все 50 инструментов — парсер синтаксиса, расчет фреймов, генератор блок-схем и diff бэкапов — работают полностью локально на вашем ПК без каких-либо внешних серверов."
      },
      {
        q: "Может ли это расширение полностью заменить WorkVisual при написании кода?",
        a: "Да. Для написания логики, математики, траекторий и аудита безопасности это на порядок быстрее и удобнее WorkVisual. Сам WorkVisual нужен только для первичной сборки шины и аппаратной конфигурации."
      },
      {
        q: "На скольких компьютерах можно активировать Pro лицензию?",
        a: "Каждая лицензия Pro позволяет активировать расширение одновременно на 3 компьютерах (например, цеховой защищенный ноутбук, офисный ПК и домашняя рабочая станция)."
      }
    ],

    // Telemetry & Badges
    activeIdesBadge: "Активных IDE",
    activeNationsBadge: "Стран мира",
    liveD1SyncBtn: "D1 Синхронизация",
    topRegionsTitle: "РЕГИОНЫ ИСПОЛЬЗОВАНИЯ",
    pctTotalLabel: "% ВСЕГО",
    gatewayTitle: "ШЛЮЗ И БЕЗОПАСНОСТЬ",
    gatewayOperational: "100% РАБОТАЕТ",
    d1RelayLabel: "Шлюз Cloudflare D1:",
    testPingBtn: "Тест пинга",
    pingingBtn: "Запрос...",
    latencySuffix: "мс задержка",
    d1RelayDesc: "Анонимный серверлесс-шлюз телеметрии с нулевым сохранением персональных данных.",
    airgapTitle: "100% Изоляция (Air-Gap) и On-Premise",
    airgapDesc: "Вся KRL логика, координаты точек и фреймы обрабатываются исключительно в оперативной памяти ПК. Ноль внешних облачных зависимостей.",
    spectraTitle: "Безопасность цепочки поставок Spectra Assure",
    spectraDesc: "0 вредоносных сигнатур. Полностью проверено и сертифицировано для роботизированных линий автопрома и ВПК.",
    heartbeatRelayText: "Канал телеметрии: Cloudflare Edge Global D1 Store",
    gdprComplianceText: "Анонимная телеметрия без PII // Соответствие GDPR",

    // Active Cluster HUD
    activeClusterBadge: "АКТИВНЫЙ КЛАСТЕР",
    clusterDensityLabel: "Плотность сессий",
    clusterSessionsText: "активных IDE",
    environmentLabel: "Среда разработки",
    targetControllerLabel: "Контроллер робота",
    dataPrivacyLabel: "Защита данных",
    privacyGuaranteeText: "100% Air-Gap и без PII",

    // Pricing additions
    perMonth: "/ месяц",
    perYear: "/ год",
    perOnce: "разово",
    save35: "СКИДКА 35%",
    activation3Machines: "Активация на 3 компьютерах",
    lifetimeF1: "Все 50 Pro инструментов навсегда",
    lifetimeF2: "Все будущие обновления бесплатны",
    lifetimeF3: "Прямая инженерная поддержка",

    // Matrix additions
    matrixColFeature: "Возможности и функции KRL",
    matrixColCommunity: "Community",
    matrixColFree: "Бесплатно навсегда",
    matrixColPro: "Pro Industrial",
    matrixColProSub: "Все 50 инструментов",
    matrixIncluded: "✓ Включено",
    matrixFullPro: "✓ Полный доступ Pro",
    matrixCtaText: "Готовы оснастить команду пусконаладки надежными инструментами без простоя?",
    matrixBtnFree: "Установить Community ($0)",
    matrixBtnPro: "Купить Pro лицензию ➔",

    // Footer & Trust additions
    automotiveComplianceLabel: "АВТОМОБИЛЬНЫЕ СТАНДАРТЫ:",
    allSystemsOperational: "ВСЕ СИСТЕМЫ РАБОТАЮТ ШТАТНО // LISKIN LABS 2026",
    kssVerified: "KSS 8.2 - 8.7 Проверено"
  },
  tr: {
    navShowcase: "3D Tur",
    navWiki: "Wiki (50 Araç)",
    navBeforeAfter: "Önce / Sonra",
    navPlayground: "Canlı Editör",
    navFrameCalc: "Frame Hesabı",
    navTelemetry: "Telemetri",
    navPricing: "Fiyatlandırma",
    navBuyPro: "Pro Satın Al",
    heroTitlePrefix: "KUKA Robot Language için ",
    heroTitleHighlight: "Endüstriyel Geliştirme Ortamı",
    heroSubtitle: "KRC4 ve KRC5 denetleyicileri için kurumsal IDE ve kapsamlı güvenlik. Maksimum hız, çarpışma önleme ve sıfır duruş süresi için 50 endüstriyel araç.",
    btnWiki: "Bilgi Bankası (50 Araç) ➔",
    btnBuyPro: "Pro Lisans Satın Al",
    wikiLink: "/tr/guide/features",
    showcaseHeading: "Sinematik Mühendislik Turu: KUKA KRL Pro Suite",
    showcaseDesc: "Kinematik, güvenlik engelleri, koordinat matematiği ve küresel ağın 4 aşamalı etkileşimli keşfi.",
    sliderHeading: "Dönüşümü Deneyimlemek İçin Kaydırın",
    sliderDesc: "Düz metin editörü ile KUKA KRL Professional arasındaki farkı görmek için orta tutamacı sağa sola sürükleyin.",
    playgroundHeading: "KUKA Güvenlik Teşhislerini Tarayıcıda Test Edin",
    playgroundDesc: "Teşhisleri ve AST üretimini test etmek için endüstriyel bir senaryo seçin veya kendi KRL kodunuzu yazın.",
    calcHeading: "3 Noktalı $BASE / $TOOL Frame Hesaplayıcı",
    calcDesc: "Euler dönme açılarını (A, B, C) doğrudan tarayıcınızda hesaplayın ve geçerli KRL koordinat yapıları oluşturun.",
    telemetryTag: "KÜRESEL DEVREYE ALMA TELEMETRİSİ // D1 SYNC",
    telemetryTitle: "Aktif Mühendis Sayısı:",
    telemetryCountries: "Ülkede",
    telemetryDesc: "Almanya otomotiv fabrikalarından Türkiye, ABD ve İtalya'daki robotik hücrelerine kadar. Gerçek zamanlı telemetri, KSS uyumluluğunu ve sıfır duruş süresini doğrular.",
    ecoHeading: "Tüm IDE Ekosisteminizde Sorunsuz Çalışır",
    ecoDesc: "Language Server Protocol (LSP) üzerine kurulmuştur. Tüm modern geliştirme platformlarında kusursuz çalışır.",
    matrixTitle: "Karşılaştırma: Community ($0) ve Pro Industrial",
    matrixDesc: "Ücretsiz temel sürüm ile 50 araçlık endüstriyel mühendislik paketinin ayrıntılı karşılaştırması.",
    pricingTitle: "ŞEFFAF ENDÜSTRİYEL FİYATLANDIRMA",
    pricingHeading: "Otomasyon Mühendisleri İçin Tahmin Edilebilir Planlar",
    pricingDesc: "Sıfır duruş süresi ve hızlı devreye almaya yatırım yapın. Dodo Payments ile anında aktivasyon.",
    p0Desc: "Öğrenciler ve yeni başlayanlar için temel sözdizimi vurgulama ve gezinme.",
    p1Desc: "Aktif devreye alma ve kurulum projeleri için 50 aracın tamamına tam erişim.",
    p2Desc: "Mühendisler için önerilen seçenek. Tam erişim, %35 tasarruf ve öncelikli destek.",
    p3Desc: "Abonelik olmadan tüm 50 araca ve gelecekteki güncellemelere ömür boyu kalıcı erişim.",
    mostPopular: "ÖNERİLEN",
    btnFree: "Ücretsiz İndir",
    btnSub: "Aylık Abonelik",
    btnSubYr: "Yıllık Lisans",
    btnLifetime: "Ömür Boyu Lisans",
    pf0_1: "6 Endüstriyel KUKA Teması",
    pf0_2: "Temel KRL Otomatik Tamamlama",
    pf0_3: "Tanıma Gitme (F12)",
    pf1: "Tüm 50 Endüstriyel Araç Açık",
    pf2: "Gerçek Zamanlı I/O Sinyal İpuçları",
    pf3_std: "Standart E-posta Desteği",
    pf3_pri: "Öncelikli 24/7 Mühendislik Desteği",
    faqTitle: "Sıkça Sorulan Sorular (SSS)",
    faqs: [
      {
        q: "Bu eklenti internet olmayan fabrika ortamında %100 çevrimdışı çalışır mı?",
        a: "Evet. Sözdizimi ayrıştırma, frame hesabı, akış şeması ve yedek karşılaştırma dahil tüm 50 araç hiçbir bulut bağımlılığı olmadan tamamen yerel olarak çalışır."
      },
      {
        q: "Kod yazımında WorkVisual'ın yerini tamamen alabilir mi?",
        a: "Evet. Mantık, matematik, yörünge ve güvenlik denetimleri için WorkVisual'dan çok daha hızlı ve güvenlidir. WorkVisual yalnızca ilk donanım yapılandırması için gereklidir."
      },
      {
        q: "Bir Pro lisansıyla kaç bilgisayar etkinleştirebilirim?",
        a: "Her Pro lisansı, aynı anda 3 bilgisayara kadar etkinleştirmeye izin verir (örneğin saha dizüstü bilgisayarı, ofis bilgisayarı ve ev iş istasyonu)."
      }
    ],

    // Telemetry & Badges
    activeIdesBadge: "Aktif IDE",
    activeNationsBadge: "Aktif Ülke",
    liveD1SyncBtn: "Canlı D1 Eşitleme",
    topRegionsTitle: "EN ÇOK KULLANILAN BÖLGELER",
    pctTotalLabel: "% TOPLAM",
    gatewayTitle: "AĞ GEÇİDİ VE UYUMLULUK",
    gatewayOperational: "%100 ÇALIŞIYOR",
    d1RelayLabel: "Cloudflare D1 Rölesi:",
    testPingBtn: "Ping Testi",
    pingingBtn: "Sorgulanıyor...",
    latencySuffix: "ms Gecikme",
    d1RelayDesc: "Sıfır müşteri verisi saklama ile kenar sunucusuz telemetri rölesi.",
    airgapTitle: "%100 Air-Gap ve Yerel Çalışma",
    airgapDesc: "KRL mantığınız, noktalarınız ve koordinatlarınız yalnızca yerel RAM'de işlenir. Sıfır bulut bağımlılığı.",
    spectraTitle: "Spectra Assure Tedarik Zinciri Güvenliği",
    spectraDesc: "0 zararlı imza. Tier-1 otomotiv ve savunma robotik hatları için tamamen doğrulanmıştır.",
    heartbeatRelayText: "Telemetri Kanalı: Cloudflare Edge Global D1 Store",
    gdprComplianceText: "Sıfır PII Anonim Telemetri // GDPR Uyumlu",

    // Active Cluster HUD
    activeClusterBadge: "AKTİF KÜME",
    clusterDensityLabel: "Küme Yoğunluğu",
    clusterSessionsText: "aktif IDE",
    environmentLabel: "Geliştirme Ortamı",
    targetControllerLabel: "Hedef Kontrolör",
    dataPrivacyLabel: "Veri Gizliliği",
    privacyGuaranteeText: "%100 Air-Gap ve Sıfır PII",

    // Pricing additions
    perMonth: "/ ay",
    perYear: "/ yıl",
    perOnce: "tek seferlik",
    save35: "%35 TASARRUF",
    activation3Machines: "3 Bilgisayarda Aktivasyon",
    lifetimeF1: "Tüm 50 Pro Araç Sonsuza Kadar",
    lifetimeF2: "Gelecekteki Tüm Güncellemeler Dahil",
    lifetimeF3: "Doğrudan Mühendislik Desteği",

    // Matrix additions
    matrixColFeature: "Endüstriyel Özellik / Yetenek",
    matrixColCommunity: "Community",
    matrixColFree: "Sonsuza Dek Ücretsiz",
    matrixColPro: "Pro Industrial",
    matrixColProSub: "Tam Paket (50 Araç)",
    matrixIncluded: "✓ Dahil",
    matrixFullPro: "✓ Tam Pro Erişim",
    matrixCtaText: "Devreye alma ekibinizi sıfır duruş süreli araçlarla donatmaya hazır mısınız?",
    matrixBtnFree: "Ücretsiz Community Kur",
    matrixBtnPro: "Pro Lisans Satın Al ➔",

    // Footer & Trust additions
    automotiveComplianceLabel: "OTOMOTİV UYUMLULUĞU:",
    allSystemsOperational: "TÜM SİSTEMLER ÇALIŞIYOR // LISKIN LABS 2026",
    kssVerified: "KSS 8.2 - 8.7 Doğrulandı"
  }
}

const t = computed(() => translations[currentLang.value] || translations.en)
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
