<template>
  <div :class="['kuka-landing min-h-screen relative font-sans selection:bg-[#FF5500] selection:text-white transition-colors duration-200 overflow-x-hidden', isDaylight ? 'bg-[#F4F3EF] text-[#111113]' : 'bg-[#09090B] text-[#F4F4F0]']">
    
    <!-- Exposed Architectural Blueprint Background Grid -->
    <div :class="['fixed inset-0 pointer-events-none z-0', isDaylight ? 'bg-[linear-gradient(to_right,#d4d4ce40_1px,transparent_1px),linear-gradient(to_bottom,#d4d4ce40_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#27272a26_1px,transparent_1px),linear-gradient(to_bottom,#27272a26_1px,transparent_1px)]']" style="background-size: 32px 32px;"></div>

    <!-- TOP TICKER RIBBON (Industrial Compliance & Live Telemetry) -->
    <div :class="['relative z-50 border-b text-[11px] font-mono py-1.5 px-4 tracking-wider uppercase flex items-center justify-between overflow-x-auto whitespace-nowrap', isDaylight ? 'bg-[#EAE9E4] border-[#D4D4CE] text-[#555866]' : 'bg-[#111114] border-zinc-800 text-zinc-400']">
      <div class="flex items-center gap-6">
        <span class="inline-flex items-center gap-2 font-bold text-[#FF5500]">
          <span class="w-1.5 h-1.5 bg-[#FF5500] animate-pulse"></span>
          KUKA KRL PROFESSIONAL v1.9.5
        </span>
        <span class="hidden md:inline-flex items-center gap-1.5 text-[#00D68F]">
          <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          REVERSINGLABS SPECTRA ASSURE: 100% PASS [0 CVE]
        </span>
        <span class="hidden lg:inline text-zinc-500">|</span>
        <span class="hidden lg:inline text-zinc-400">4.2M+ LINES AUDITED</span>
        <span class="hidden xl:inline text-zinc-500">|</span>
        <span class="hidden xl:inline text-zinc-400">3,500+ ACTIVE INDUSTRIAL ENGINEERS</span>
      </div>
      <div class="flex items-center gap-4 text-[10px]">
        <span class="inline-flex items-center gap-1 text-emerald-400 font-bold">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          AIR-GAP 100% ON-PREMISE COMPLIANT
        </span>
      </div>
    </div>

    <!-- BLOCK 1: TECHNICAL HUD NAVIGATION HEADER -->
    <header :class="['sticky top-0 z-40 border-b backdrop-blur-md transition-colors', isDaylight ? 'bg-[#F4F3EF]/90 border-[#D4D4CE]' : 'bg-[#09090B]/90 border-zinc-800']">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        <!-- Brand & Version -->
        <a :href="withBase('/')" class="flex items-center gap-3 shrink-0 group">
          <div :class="['w-8 h-8 flex items-center justify-center border font-mono font-black text-sm text-white bg-black transition-transform group-hover:scale-105', isDaylight ? 'border-zinc-400' : 'border-zinc-700']">
            <span class="text-[#FF5500]">K</span>RL
          </div>
          <div class="flex flex-col text-left">
            <span class="font-mono font-extrabold text-xs tracking-wider">
              LISKIN<span class="text-[#FF5500]">LABS</span>
            </span>
            <span class="font-mono text-[9px] text-zinc-500 tracking-widest">[SYS.KRC5 // PRO]</span>
          </div>
        </a>

        <!-- Anchor Navigation Links -->
        <nav class="hidden xl:flex items-center gap-5 text-xs font-mono">
          <a href="#hero" :class="['hover:text-[#FF5500] transition-colors', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">[01] OVERVIEW</a>
          <a href="#disaster" :class="['hover:text-[#FF5500] transition-colors', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">[02] HAZARDS</a>
          <a href="#simulator" :class="['hover:text-[#FF5500] transition-colors', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">[03] WEB IDE</a>
          <a href="#roi" :class="['hover:text-[#FF5500] transition-colors', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">[04] ROI & QUOTE</a>
          <a href="#pricing" :class="['hover:text-[#FF5500] transition-colors', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">[05] PRICING</a>
          <a href="#inventory" :class="['hover:text-[#FF5500] transition-colors', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">[06] 80+ TOOLS</a>
          <a href="#telemetry" :class="['hover:text-[#FF5500] transition-colors', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">[07] HUBS</a>
        </nav>

        <!-- Control Bar: Languages + Currencies + Mode Switch + CTA -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          
          <!-- Language Selector -->
          <div :class="['inline-flex border p-0.5 text-[11px] font-mono', isDaylight ? 'bg-white border-[#D4D4CE]' : 'bg-[#111114] border-zinc-800']">
            <button 
              v-for="lang in ['en', 'de', 'ru', 'tr', 'it', 'es']" 
              :key="lang"
              @click="setLanguage(lang)"
              :class="['px-1.5 py-0.5 font-bold uppercase transition-all', currentLang === lang ? 'bg-[#FF5500] text-white' : (isDaylight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')]">
              {{ lang }}
            </button>
          </div>

          <!-- Currency Selector -->
          <div :class="['hidden sm:inline-flex border p-0.5 text-[11px] font-mono', isDaylight ? 'bg-white border-[#D4D4CE]' : 'bg-[#111114] border-zinc-800']">
            <button 
              v-for="curr in ['USD', 'EUR', 'RUB', 'TRY']" 
              :key="curr"
              @click="currentCurrency = curr"
              :class="['px-1.5 py-0.5 font-bold transition-all', currentCurrency === curr ? (isDaylight ? 'bg-zinc-800 text-white' : 'bg-zinc-700 text-white') : (isDaylight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')]">
              {{ curr }}
            </button>
          </div>

          <!-- Daylight / Obsidian Cell Theme Toggle -->
          <button 
            @click="isDaylight = !isDaylight"
            :title="isDaylight ? 'Switch to Obsidian Cell Dark Mode' : 'Switch to Shop-Floor Daylight Mode'"
            :class="['p-1.5 border transition-all flex items-center justify-center', isDaylight ? 'bg-white border-[#D4D4CE] text-zinc-700 hover:text-black' : 'bg-[#111114] border-zinc-800 text-zinc-300 hover:text-white']">
            <svg v-if="!isDaylight" class="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <svg v-else class="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>

          <!-- Primary CTA Button -->
          <a 
            href="#pricing"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5500] hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all border border-orange-400/40">
            <span>GET PRO</span>
            <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </a>

          <!-- Mobile Nav Toggle -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="xl:hidden p-1.5 border text-zinc-400 hover:text-white"
            :class="isDaylight ? 'bg-white border-[#D4D4CE]' : 'bg-[#111114] border-zinc-800'">
            <svg class="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="mobileMenuOpen" :class="['xl:hidden border-b px-4 py-4 space-y-3 font-mono text-xs', isDaylight ? 'bg-[#F4F3EF] border-[#D4D4CE]' : 'bg-[#09090B] border-zinc-800']">
        <div class="grid grid-cols-2 gap-2">
          <a @click="mobileMenuOpen = false" href="#hero" class="p-2 border border-zinc-800 hover:border-[#FF5500]">[01] OVERVIEW</a>
          <a @click="mobileMenuOpen = false" href="#disaster" class="p-2 border border-zinc-800 hover:border-[#FF5500]">[02] HAZARDS</a>
          <a @click="mobileMenuOpen = false" href="#simulator" class="p-2 border border-zinc-800 hover:border-[#FF5500]">[03] WEB IDE</a>
          <a @click="mobileMenuOpen = false" href="#roi" class="p-2 border border-zinc-800 hover:border-[#FF5500]">[04] ROI & QUOTE</a>
          <a @click="mobileMenuOpen = false" href="#pricing" class="p-2 border border-zinc-800 hover:border-[#FF5500]">[05] PRICING</a>
          <a @click="mobileMenuOpen = false" href="#inventory" class="p-2 border border-zinc-800 hover:border-[#FF5500]">[06] 80+ TOOLS</a>
          <a @click="mobileMenuOpen = false" href="#telemetry" class="p-2 border border-zinc-800 hover:border-[#FF5500]">[07] HUBS</a>
        </div>
      </div>
    </header>

    <!-- MAIN ARCHITECTURAL BLUEPRINT CONTAINER -->
    <main class="max-w-[1440px] mx-auto px-4 sm:px-6 relative">
      
      <!-- Top Millimeter Coordinate Scale -->
      <div :class="['hidden md:flex justify-between items-center text-[9px] font-mono tracking-widest border-b py-1 select-none', isDaylight ? 'text-zinc-500 border-[#D4D4CE]' : 'text-zinc-600 border-zinc-800/80']">
        <span>[0000.00 mm]</span>
        <span>250.00 mm</span>
        <span>500.00 mm</span>
        <span>750.00 mm</span>
        <span>1000.00 mm</span>
        <span>1250.00 mm</span>
        <span>1500.00 mm</span>
        <span>1750.00 mm</span>
        <span>2000.00 mm</span>
        <span>[2500.00 mm]</span>
      </div>

      <!-- BLOCK 2: HERO SECTION (Value Proposition & Kinematic Rig) -->
      <section id="hero" :class="['relative border-b py-10 lg:py-16', isDaylight ? 'border-[#D4D4CE]' : 'border-zinc-800']">
        <span class="absolute -top-1.5 -left-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        <span class="absolute -top-1.5 -right-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <!-- Left Column: Copy, Quick CTAs, Metrics (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
            
            <div class="space-y-4">
              <!-- System Status Badges -->
              <div class="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 border border-emerald-500/30 bg-emerald-500/10 text-[#00D68F] font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00D68F]"></span>
                  SYS.STATUS: OPERATIONAL
                </span>
                <span :class="['px-2 py-1 border font-medium', isDaylight ? 'border-zinc-300 bg-white text-zinc-700' : 'border-zinc-800 bg-zinc-900 text-zinc-400']">
                  KSS 8.3–8.7 & KRC5 READY
                </span>
                <span class="px-2 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-400 font-medium">
                  ISO-13849 AUDIT PASS
                </span>
              </div>

              <!-- Main Architectural Headline -->
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] font-sans">
                <span class="block">{{ t.heroHeadline1 || 'ZERO DOWNTIME' }}</span>
                <span class="text-[#FF5500] block">{{ t.heroHeadline2 || 'BEFORE THE ROBOT TOUCHES THE PART' }}</span>
              </h1>

              <!-- Subhead -->
              <p :class="['text-sm sm:text-base leading-relaxed max-w-2xl font-normal', isDaylight ? 'text-zinc-700' : 'text-zinc-400']">
                {{ t.heroSubhead || 'Industrial IDE and static safety analyzer for KUKA KRL (KRC2/KRC4/KRC5). Detects Advance Run stops, $BASE/$TOOL frame drift, missing BRAKE commands, and uninitialized kinematic hazards before physical execution on the shop floor.' }}
              </p>
            </div>

            <!-- Primary Action Buttons & Command Snippet -->
            <div class="space-y-3 pt-2">
              <div class="flex flex-wrap items-center gap-3">
                <a 
                  href="vscode:extension/LiskinLabs.kuka-krl-extension"
                  class="inline-flex items-center gap-2 px-5 py-3 bg-[#FF5500] hover:bg-orange-600 text-white font-mono text-xs font-bold tracking-wider transition-all border border-orange-400/50 shadow-sm">
                  <svg class="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>INSTALL IN VS CODE (FREE)</span>
                </a>

                <button 
                  @click="showTrialModal = true"
                  :class="['inline-flex items-center gap-2 px-4 py-3 border font-mono text-xs font-bold transition-all', isDaylight ? 'bg-white border-zinc-400 text-zinc-900 hover:bg-zinc-100' : 'bg-[#111114] border-zinc-700 text-zinc-200 hover:bg-zinc-800']">
                  <svg class="w-4 h-4 stroke-current text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  <span>14-DAY PRO TRIAL</span>
                </button>

                <a 
                  href="#pricing"
                  :class="['inline-flex items-center gap-2 px-4 py-3 border font-mono text-xs font-medium transition-all', isDaylight ? 'border-zinc-300 text-zinc-600 hover:text-black' : 'border-zinc-800 text-zinc-400 hover:text-white']">
                  <span>PRICING & TIERS</span>
                  <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>
                </a>
              </div>

              <!-- Quick CLI Copy Bar -->
              <div :class="['flex items-center justify-between border px-3 py-2 text-xs font-mono max-w-xl', isDaylight ? 'bg-white border-zinc-300 text-zinc-600' : 'bg-[#111114] border-zinc-800 text-zinc-400']">
                <span class="truncate">code --install-extension LiskinLabs.kuka-krl-extension</span>
                <button 
                  @click="copyCliInstall"
                  class="ml-3 shrink-0 text-[#FF5500] hover:underline font-bold text-[11px]">
                  {{ copiedCli ? '[COPIED]' : '[COPY]' }}
                </button>
              </div>
            </div>

            <!-- 4 Technical Metric Cards -->
            <div :class="['grid grid-cols-2 sm:grid-cols-4 border-t pt-4 text-left gap-4 font-mono', isDaylight ? 'border-zinc-300' : 'border-zinc-800']">
              <div>
                <div class="text-2xl font-black text-[#FF5500] tabular-nums">&lt; 80 ms</div>
                <div class="text-[10px] text-zinc-500 uppercase tracking-wider">AST Parse Latency</div>
              </div>
              <div>
                <div class="text-2xl font-black text-[#00D68F] tabular-nums">0 CVE</div>
                <div class="text-[10px] text-zinc-500 uppercase tracking-wider">Spectra Assure</div>
              </div>
              <div>
                <div class="text-2xl font-black tabular-nums">116+</div>
                <div class="text-[10px] text-zinc-500 uppercase tracking-wider">Safety Rules</div>
              </div>
              <div>
                <div class="text-2xl font-black tabular-nums">80+</div>
                <div class="text-[10px] text-zinc-500 uppercase tracking-wider">Industrial Tools</div>
              </div>
            </div>

          </div>

          <!-- Right Column: 3D CAD Kinematics Rig (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col relative min-h-[460px] lg:min-h-full">
            <div class="relative w-full h-full flex flex-col border border-zinc-800 overflow-hidden bg-black">
              <ClientOnly>
                <KukaRobot3D />
              </ClientOnly>

              <!-- Real-time Kinematic Telemetry HUD Banner -->
              <div class="bg-[#111114] border-t border-zinc-800 p-2.5 font-mono text-[10px] grid grid-cols-2 gap-2 text-zinc-400 select-none">
                <div>
                  <span class="text-zinc-600 block">ACTIVE TOOL:</span>
                  <span class="text-white font-bold truncate block">TOOL_DATA[1] (MigTorch)</span>
                </div>
                <div>
                  <span class="text-zinc-600 block">ACTIVE BASE:</span>
                  <span class="text-white font-bold truncate block">BASE_DATA[2] (Fixture)</span>
                </div>
                <div>
                  <span class="text-zinc-600 block">INTERPOLATION:</span>
                  <span class="text-[#00D68F] font-bold block">CP LIN (Approx 100%)</span>
                </div>
                <div>
                  <span class="text-zinc-600 block">ADVANCE RUN:</span>
                  <span class="text-[#FF5500] font-bold block">$ADVANCE = 3 [IN_TOL]</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- BLOCK 3: PAIN-TO-PRO INTERACTIVE DISASTER SWITCHER -->
      <section id="disaster" :class="['relative border-b py-12 lg:py-16 text-left', isDaylight ? 'border-[#D4D4CE]' : 'border-zinc-800']">
        <span class="absolute -top-1.5 -left-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        <span class="absolute -top-1.5 -right-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>

        <!-- Section Header -->
        <div class="max-w-3xl space-y-2 mb-8">
          <div class="font-mono text-xs text-[#FF5500] font-bold tracking-wider">[02 // INCIDENT SIMULATOR]</div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">PREVENT CATASTROPHIC DOWNTIME BEFORE COMPILING</h2>
          <p :class="['text-sm leading-relaxed', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">
            Automotive body shops lose an average of $24,000 per hour during unplanned robotic cell halts. KRL Professional statically detects and auto-fixes the 4 most frequent causes of shop-floor stoppages.
          </p>
        </div>

        <!-- 4 Scenario Tabs -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6 font-mono text-xs">
          <button 
            v-for="dis in disasterScenarios"
            :key="dis.id"
            @click="activeDisaster = dis"
            :class="[
              'p-3 border text-left transition-all relative',
              activeDisaster.id === dis.id 
                ? (isDaylight ? 'bg-white border-[#FF5500] shadow-sm' : 'bg-[#16161A] border-[#FF5500]') 
                : (isDaylight ? 'bg-[#EAE9E4] border-zinc-300 text-zinc-600 hover:text-black' : 'bg-[#111114] border-zinc-800 text-zinc-400 hover:text-white')
            ]">
            <span v-if="activeDisaster.id === dis.id" class="absolute top-0 left-0 w-1 h-full bg-[#FF5500]"></span>
            <div class="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{{ dis.tag }}</div>
            <div class="font-bold text-xs mt-1 truncate">{{ dis.title }}</div>
            <div class="text-[11px] text-[#FF5500] font-mono mt-1 font-bold">{{ dis.avoidedCost }}</div>
          </button>
        </div>

        <!-- Scenario Detail & Side-by-Side Diff View -->
        <div :class="['border p-4 sm:p-6 space-y-6', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
          
          <!-- Scenario Summary Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-zinc-700/50">
            <div>
              <div class="text-xs font-mono text-[#FF2E4C] font-bold uppercase">[KSS FAULT VECTOR]: {{ activeDisaster.title }}</div>
              <p :class="['text-xs sm:text-sm mt-1 max-w-3xl', isDaylight ? 'text-zinc-700' : 'text-zinc-300']">{{ activeDisaster.description }}</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-mono text-zinc-500 block uppercase">SAVINGS PER INCIDENT:</span>
              <span class="text-lg sm:text-xl font-mono font-black text-[#00D68F]">{{ activeDisaster.avoidedCost }}</span>
            </div>
          </div>

          <!-- Split Diff Code View -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
            
            <!-- Dangerous Legacy Code -->
            <div class="border border-[#FF2E4C]/40 bg-[#090C10] p-4 text-left relative">
              <div class="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <span class="text-[#FF2E4C] font-bold text-[11px] flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  RAW CODE // HIGH COLLISION HAZARD
                </span>
                <span class="text-[10px] text-zinc-500">KSS COMPILER ABORT</span>
              </div>
              <pre class="overflow-x-auto text-zinc-300 leading-relaxed font-mono"><code>{{ activeDisaster.beforeCode }}</code></pre>
            </div>

            <!-- KUKA KRL Pro Safe Sanitized Code -->
            <div class="border border-emerald-500/40 bg-[#090C10] p-4 text-left relative">
              <div class="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <span class="text-[#00D68F] font-bold text-[11px] flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
                  KRL PRO AUTO-REPAIR // SAFE MOTION
                </span>
                <span class="text-[10px] text-emerald-400 font-bold">100% CYCLE ASSURED</span>
              </div>
              <pre class="overflow-x-auto text-emerald-400 leading-relaxed font-mono"><code>{{ activeDisaster.afterCode }}</code></pre>
            </div>

          </div>

        </div>

      </section>

      <!-- BLOCK 4: CLIENT-SIDE VS CODE SIMULATOR / ZIP INSPECTOR -->
      <section id="simulator" :class="['relative border-b py-12 lg:py-16 text-left', isDaylight ? 'border-[#D4D4CE]' : 'border-zinc-800']">
        <span class="absolute -top-1.5 -left-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        <span class="absolute -top-1.5 -right-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>

        <!-- Section Header -->
        <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div class="space-y-2 max-w-2xl">
            <div class="font-mono text-xs text-[#FF5500] font-bold tracking-wider">[03 // IN-BROWSER SIMULATOR]</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">TRY KUKA KRL IN YOUR BROWSER</h2>
            <p :class="['text-sm', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">
              Test syntax diagnostics, AST tree visualization, or drop your own KRC .src / .zip backup. All parsing executes 100% locally in your browser with zero cloud transmission (Air-Gap compliant).
            </p>
          </div>

          <!-- Tab Selector: Editor vs Archive Inspector -->
          <div :class="['border p-1 inline-flex text-xs font-mono', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <button 
              @click="activeSimTab = 'editor'"
              :class="['px-3 py-1.5 font-bold transition-all', activeSimTab === 'editor' ? 'bg-[#FF5500] text-white' : 'text-zinc-400 hover:text-white']">
              VS CODE SIMULATOR
            </button>
            <button 
              @click="activeSimTab = 'inspector'"
              :class="['px-3 py-1.5 font-bold transition-all', activeSimTab === 'inspector' ? 'bg-[#FF5500] text-white' : 'text-zinc-400 hover:text-white']">
              KRC BACKUP INSPECTOR (.ZIP)
            </button>
          </div>
        </div>

        <!-- Embedded Interactive Components -->
        <div class="w-full">
          <ClientOnly>
            <div v-show="activeSimTab === 'editor'">
              <VsCodeWebSimulator />
            </div>
            <div v-show="activeSimTab === 'inspector'">
              <KrlWebInspector />
            </div>
          </ClientOnly>
        </div>

      </section>

      <!-- BLOCK 5: INTERACTIVE B2B ROI CALCULATOR & QUOTE GENERATOR -->
      <section id="roi" :class="['relative border-b py-12 lg:py-16 text-left', isDaylight ? 'border-[#D4D4CE]' : 'border-zinc-800']">
        <span class="absolute -top-1.5 -left-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        <span class="absolute -top-1.5 -right-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>

        <!-- Section Header -->
        <div class="max-w-3xl space-y-2 mb-8">
          <div class="font-mono text-xs text-[#FF5500] font-bold tracking-wider">[04 // B2B PROCUREMENT & ROI]</div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">ENTERPRISE ROI CALCULATOR & OFFICIAL QUOTATION</h2>
          <p :class="['text-sm leading-relaxed', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">
            Estimate your annual plant savings from prevented robot collisions and advance-run line interruptions. Generate an instant, official Commercial Proposal (Angebot / КП) on Liskin Labs letterhead for accounting and management approval.
          </p>
        </div>

        <!-- Calculator Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <!-- Sliders Panel (7 cols) -->
          <div :class="['lg:col-span-7 border p-6 space-y-6', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            
            <!-- Slider 1: Robots in Cell/Fleet -->
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs font-mono">
                <span class="font-bold">1. ROBOTS IN PRODUCTION FLEET:</span>
                <span class="text-[#FF5500] font-bold text-sm">{{ calcRobots }} ROBOTS</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="200" 
                v-model.number="calcRobots"
                class="w-full accent-[#FF5500] cursor-pointer" />
              <div class="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>1 Robot</span>
                <span>50</span>
                <span>100</span>
                <span>200 Robots</span>
              </div>
            </div>

            <!-- Slider 2: Automation & Commissioning Engineers -->
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs font-mono">
                <span class="font-bold">2. ROBOTICS & COMMISSIONING ENGINEERS:</span>
                <span class="text-[#FF5500] font-bold text-sm">{{ calcEngineers }} ENGINEERS</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                v-model.number="calcEngineers"
                class="w-full accent-[#FF5500] cursor-pointer" />
              <div class="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>1 Engineer</span>
                <span>15</span>
                <span>30</span>
                <span>50 Engineers</span>
              </div>
            </div>

            <!-- Slider 3: Line Downtime Cost per Hour -->
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs font-mono">
                <span class="font-bold">3. CELL DOWNTIME COST PER HOUR:</span>
                <span class="text-[#FF5500] font-bold text-sm">{{ formatPrice(calcDowntimeCost) }} / HR</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000"
                v-model.number="calcDowntimeCost"
                class="w-full accent-[#FF5500] cursor-pointer" />
              <div class="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>$1,000 / hr</span>
                <span>$15,000 / hr</span>
                <span>$30,000 / hr</span>
                <span>$50,000 / hr</span>
              </div>
            </div>

          </div>

          <!-- Results & Quotation Generator Card (5 cols) -->
          <div class="lg:col-span-5 border border-[#FF5500]/50 bg-black p-6 flex flex-col justify-between text-left space-y-6">
            
            <div class="space-y-4">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF5500]/15 border border-[#FF5500]/30 text-[#FF5500] font-mono text-[10px] font-bold">
                ROI FORECAST & COST AVOIDANCE
              </div>

              <!-- Estimated Hours Prevented -->
              <div>
                <span class="text-xs font-mono text-zinc-500 uppercase block">Prevented Downtime per Year:</span>
                <span class="text-3xl font-black font-mono text-white tabular-nums">{{ preventedHours }} HOURS / YR</span>
              </div>

              <!-- Net Annual Savings -->
              <div>
                <span class="text-xs font-mono text-zinc-500 uppercase block">Net Annual Factory Savings:</span>
                <span class="text-3xl sm:text-4xl font-black font-mono text-[#00D68F] tabular-nums">{{ formatPrice(annualSavings) }}</span>
              </div>

              <!-- Recommended License Tier -->
              <div class="border-t border-zinc-800 pt-3">
                <span class="text-[11px] font-mono text-zinc-400 uppercase block">Recommended License Plan:</span>
                <span class="text-base font-bold font-mono text-white block mt-0.5">{{ recommendedTier.name }} ({{ formatPrice(recommendedTier.priceUsd) }}/yr)</span>
                <span class="text-[11px] font-mono text-zinc-500 block">Up to {{ recommendedTier.seats }} Workstations Included</span>
              </div>
            </div>

            <!-- Button: Open Quotation Modal -->
            <button 
              @click="openQuoteModal"
              class="w-full py-3 bg-[#FF5500] hover:bg-orange-600 text-white font-mono text-xs font-bold tracking-wider transition-all border border-orange-400/40 flex items-center justify-center gap-2">
              <svg class="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <span>GENERATE OFFICIAL COMMERCIAL PROPOSAL</span>
            </button>

          </div>

        </div>

      </section>

      <!-- BLOCK 6: TRANSPARENT INDUSTRIAL PRICING MATRIX -->
      <section id="pricing" :class="['relative border-b py-12 lg:py-16 text-left', isDaylight ? 'border-[#D4D4CE]' : 'border-zinc-800']">
        <span class="absolute -top-1.5 -left-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        <span class="absolute -top-1.5 -right-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>

        <!-- Section Header & Currency Switcher -->
        <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div class="space-y-2 max-w-2xl">
            <div class="font-mono text-xs text-[#FF5500] font-bold tracking-wider">[05 // TRANSPARENT PRICING]</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">CHOOSE YOUR INDUSTRIAL WORKFLOW TIER</h2>
            <p :class="['text-sm', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">
              Single engineers, integration teams, or plant-wide deployments. Direct invoicing by Dodo Payments Inc. with EU VAT, US Sales Tax, and corporate purchase orders.
            </p>
          </div>

          <!-- Currency Toggles -->
          <div :class="['border p-1 inline-flex text-xs font-mono', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <button 
              v-for="c in ['USD', 'EUR', 'RUB', 'TRY']" 
              :key="c"
              @click="currentCurrency = c"
              :class="['px-3 py-1 font-bold transition-all', currentCurrency === c ? 'bg-[#FF5500] text-white' : 'text-zinc-400 hover:text-white']">
              {{ c }}
            </button>
          </div>
        </div>

        <!-- 6 Main Pricing Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10 items-stretch">
          
          <!-- Card 1: Free Community -->
          <div :class="['border p-5 flex flex-col justify-between', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <div class="space-y-3">
              <div class="flex justify-between items-center text-xs font-mono">
                <span class="text-zinc-500 font-bold">COMMUNITY</span>
                <span class="text-[10px] px-1.5 py-0.5 border border-zinc-700 bg-zinc-800 text-zinc-300">1 SEAT</span>
              </div>
              <div class="text-3xl font-black font-mono text-white">Free</div>
              <p class="text-xs text-zinc-400">Essential KRL syntax, snippets, document symbols, and diagnostics up to 500 lines.</p>
              <ul class="text-xs font-mono space-y-1.5 pt-2 border-t border-zinc-800 text-zinc-300">
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Full KRL Syntax Highlighting</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Document Symbol Outline</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Up to 500 lines per file</li>
              </ul>
            </div>
            <a 
              href="vscode:extension/LiskinLabs.kuka-krl-extension"
              class="mt-6 w-full py-2.5 border border-zinc-600 hover:border-white font-mono text-xs font-bold text-center block transition-colors">
              INSTALL FREE
            </a>
          </div>

          <!-- Card 2: Pro Annual (Featured) -->
          <div class="border-2 border-[#FF5500] bg-black p-5 flex flex-col justify-between relative shadow-lg">
            <span class="absolute -top-3 right-4 px-2 py-0.5 bg-[#FF5500] text-white font-mono text-[10px] font-bold">RECOMMENDED</span>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-xs font-mono">
                <span class="text-[#FF5500] font-bold">PRO ANNUAL</span>
                <span class="text-[10px] px-1.5 py-0.5 bg-[#FF5500]/20 text-[#FF5500] font-bold">1 SEAT</span>
              </div>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl sm:text-4xl font-black font-mono text-white">{{ formatPrice(149) }}</span>
                <span class="text-xs font-mono text-zinc-500">/ year</span>
              </div>
              <p class="text-xs text-zinc-400">Full professional robotics toolset. Save 35% compared to monthly billing.</p>
              <ul class="text-xs font-mono space-y-1.5 pt-2 border-t border-zinc-800 text-zinc-300">
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Unlimited Lines of Code</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> All 80+ Industrial Tools</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Advance Run Stop Detection</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> 3-Point Frame Kinematic Solver</li>
              </ul>
            </div>
            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"
              class="mt-6 w-full py-2.5 bg-[#FF5500] hover:bg-orange-600 text-white font-mono text-xs font-bold text-center block transition-colors">
              GET ANNUAL PRO ({{ formatPrice(149) }})
            </a>
          </div>

          <!-- Card 3: Team Edition (5 Workstations) -->
          <div :class="['border p-5 flex flex-col justify-between', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <div class="space-y-3">
              <div class="flex justify-between items-center text-xs font-mono">
                <span class="text-zinc-300 font-bold">TEAM EDITION</span>
                <span class="text-[10px] px-1.5 py-0.5 border border-zinc-700 bg-zinc-800 text-[#00D68F] font-bold">5 SEATS</span>
              </div>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black font-mono text-white">{{ formatPrice(499) }}</span>
                <span class="text-xs font-mono text-zinc-500">/ year</span>
              </div>
              <p class="text-xs text-zinc-400">For commissioning teams and automation cells. Up to 5 workstations ($99.80/seat/yr).</p>
              <ul class="text-xs font-mono space-y-1.5 pt-2 border-t border-zinc-800 text-zinc-300">
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Up to 5 Workstations</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Centralized Key Management</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Single Corporate Invoice</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Priority In-Editor Support Gateway</li>
              </ul>
            </div>
            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v"
              class="mt-6 w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-bold text-center block transition-colors">
              DEPLOY TEAM ({{ formatPrice(499) }})
            </a>
          </div>

          <!-- Card 4: Department / Integrator (20 Workstations) -->
          <div :class="['border p-5 flex flex-col justify-between', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <div class="space-y-3">
              <div class="flex justify-between items-center text-xs font-mono">
                <span class="text-zinc-300 font-bold">INTEGRATOR</span>
                <span class="text-[10px] px-1.5 py-0.5 border border-zinc-700 bg-zinc-800 text-cyan-400 font-bold">20 SEATS</span>
              </div>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black font-mono text-white">{{ formatPrice(1499) }}</span>
                <span class="text-xs font-mono text-zinc-500">/ year</span>
              </div>
              <p class="text-xs text-zinc-400">For system integration companies. Up to 20 workstations ($74.95/seat/yr).</p>
              <ul class="text-xs font-mono space-y-1.5 pt-2 border-t border-zinc-800 text-zinc-300">
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Up to 20 Workstations</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Unlimited OEM Line Projects</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Offline Air-Gap Activation</li>
                <li class="flex items-center gap-1.5"><span class="text-[#00D68F] font-bold">✓</span> Priority Support Relay</li>
              </ul>
            </div>
            <div class="mt-6 flex flex-col gap-2">
              <a 
                href="https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn"
                class="w-full py-2 bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs font-bold text-center block transition-colors">
                DEPLOY INTEGRATOR ({{ formatPrice(1499) }})
              </a>
              <button 
                @click="openQuoteModal"
                class="w-full py-1.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-mono text-[11px] text-center block transition-colors">
                REQUEST INVOICE / B2B QUOTE
              </button>
            </div>
          </div>

        </div>

        <!-- Additional Tiers Bar: Monthly ($19), Lifetime ($699), Enterprise Site ($4,999) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          
          <!-- Monthly -->
          <div :class="['border p-4 flex items-center justify-between', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <div>
              <span class="text-zinc-400 block font-bold">PRO MONTHLY</span>
              <span class="text-lg font-black text-white">{{ formatPrice(19) }} / mo</span>
              <span class="text-[10px] text-zinc-500 block">1 Seat • Cancel anytime</span>
            </div>
            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"
              class="px-3 py-1.5 border border-zinc-700 hover:border-white font-bold text-white transition-colors">
              BUY MONTHLY
            </a>
          </div>

          <!-- Lifetime -->
          <div :class="['border p-4 flex items-center justify-between', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <div>
              <span class="text-zinc-400 block font-bold">PRO LIFETIME</span>
              <span class="text-lg font-black text-white">{{ formatPrice(699) }}</span>
              <span class="text-[10px] text-zinc-500 block">1 Seat • Perpetual updates</span>
            </div>
            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr"
              class="px-3 py-1.5 border border-zinc-700 hover:border-white font-bold text-white transition-colors">
              BUY LIFETIME
            </a>
          </div>

          <!-- Enterprise Site (100 Workstations) -->
          <div :class="['border p-4 flex items-center justify-between border-cyan-500/40', isDaylight ? 'bg-white' : 'bg-[#111114]']">
            <div>
              <span class="text-cyan-400 block font-bold">ENTERPRISE SITE (100 SEATS)</span>
              <span class="text-lg font-black text-white">{{ formatPrice(4999) }} / yr</span>
              <span class="text-[10px] text-zinc-500 block">Full plant license • 4-hr SLA</span>
            </div>
            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP"
              class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 font-bold text-white transition-colors">
              DEPLOY PLANT
            </a>
          </div>

        </div>

        <!-- BUYER TRUST & ANTI-CHARGEBACK GUARANTEES GRID -->
        <div class="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-[11px]">
          <div class="p-3 border border-zinc-800/80 bg-zinc-900/30">
            <div class="text-[#00D68F] font-bold mb-1">✓ CLEAR BANK DESCRIPTOR</div>
            <p class="text-zinc-400 text-[10px] leading-relaxed">
              Charges clearly appear as <span class="text-white font-bold">DODOPAY_LISKINLABS</span> or <span class="text-white font-bold">LISKINLABS KUKA</span> so plant finance teams immediately recognize invoices.
            </p>
          </div>
          <div class="p-3 border border-zinc-800/80 bg-zinc-900/30">
            <div class="text-[#00D68F] font-bold mb-1">✓ 1-CLICK IN-EDITOR CANCEL</div>
            <p class="text-zinc-400 text-[10px] leading-relaxed">
              Cancel subscriptions anytime right from VS Code status bar (<span class="text-white">krl.manageSubscription</span>) or Dodo Customer Portal without waiting.
            </p>
          </div>
          <div class="p-3 border border-zinc-800/80 bg-zinc-900/30">
            <div class="text-[#00D68F] font-bold mb-1">✓ 100% UNCONDITIONAL REFUND</div>
            <p class="text-zinc-400 text-[10px] leading-relaxed">
              14-day money-back guarantee. If not completely satisfied, request a refund directly via built-in VS Code chat (<span class="text-white">krl.openTelegramChat</span>) for an instant 100% refund, no questions asked.
            </p>
          </div>
          <div class="p-3 border border-zinc-800/80 bg-zinc-900/30">
            <div class="text-[#00D68F] font-bold mb-1">✓ EU VAT 0% & WIRE TRANSFERS</div>
            <p class="text-zinc-400 text-[10px] leading-relaxed">
              Automatic reverse-charge VAT validation (EU VIES / UK HMRC) and automated corporate SEPA / ACH wire transfer clearing.
            </p>
          </div>
        </div>

      </section>

      <!-- BLOCK 7: SEARCHABLE 80+ INDUSTRIAL TOOLS INVENTORY -->
      <section id="inventory" :class="['relative border-b py-12 lg:py-16 text-left', isDaylight ? 'border-[#D4D4CE]' : 'border-zinc-800']">
        <span class="absolute -top-1.5 -left-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        <span class="absolute -top-1.5 -right-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>

        <!-- Section Header -->
        <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div class="space-y-2 max-w-2xl">
            <div class="font-mono text-xs text-[#FF5500] font-bold tracking-wider">[06 // CAPABILITIES DIRECTORY]</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">80+ PRODUCTION TOOLS & DIAGNOSTICS</h2>
            <p :class="['text-sm', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">
              Complete inventory of commands, language servers, kinematic solvers, and safety checkers included in KUKA KRL Professional v1.9.5.
            </p>
          </div>

          <!-- Search Input -->
          <div class="w-full sm:w-72">
            <input 
              type="text" 
              v-model="toolSearchQuery"
              placeholder="Filter by name, command ID..." 
              :class="['w-full px-3 py-2 text-xs font-mono border outline-none focus:border-[#FF5500]', isDaylight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#111114] border-zinc-800 text-white']" />
          </div>
        </div>

        <!-- Category Pills -->
        <div class="flex flex-wrap gap-1.5 mb-6 text-xs font-mono">
          <button 
            v-for="cat in toolCategories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="['px-2.5 py-1 transition-all', selectedCategory === cat ? 'bg-[#FF5500] text-white font-bold' : (isDaylight ? 'bg-white border border-zinc-300 text-zinc-700' : 'bg-[#111114] border border-zinc-800 text-zinc-400 hover:text-white')]">
            {{ cat }}
          </button>
        </div>

        <!-- Tools Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div 
            v-for="tool in filteredTools" 
            :key="tool.id"
            @click="openToolPreview(tool)"
            :class="['border p-3.5 flex flex-col justify-between cursor-pointer hover:border-[#FF5500] transition-colors', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <div class="space-y-2">
              <div class="flex items-center justify-between text-[10px] font-mono">
                <span class="text-zinc-500 truncate max-w-[150px]">{{ tool.category }}</span>
                <span :class="['px-1.5 py-0.5 font-bold', tool.status === 'Pro' ? 'bg-[#FF5500]/20 text-[#FF5500]' : 'bg-zinc-800 text-zinc-300']">
                  {{ tool.status }}
                </span>
              </div>
              <div class="font-bold text-xs text-white truncate">{{ tool.title }}</div>
              <div class="text-[10px] font-mono text-zinc-500 truncate">{{ tool.id }}</div>
              <p class="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{{ tool.valueProposition }}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>{{ tool.type }}</span>
              <span class="text-[#FF5500] font-bold">VIEW DEMO ➔</span>
            </div>
          </div>
        </div>

      </section>

      <!-- BLOCK 8: GLOBAL TELEMETRY RADAR & AIR-GAP COMPLIANCE -->
      <section id="telemetry" :class="['relative border-b py-12 lg:py-16 text-left', isDaylight ? 'border-[#D4D4CE]' : 'border-zinc-800']">
        <span class="absolute -top-1.5 -left-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>
        <span class="absolute -top-1.5 -right-1.5 text-zinc-500 font-mono text-[10px] select-none pointer-events-none">+</span>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Hub Matrix & Telemetry Status (6 cols) -->
          <div class="lg:col-span-6 space-y-6">
            <div class="space-y-2">
              <div class="font-mono text-xs text-[#FF5500] font-bold tracking-wider">[07 // TELEMETRY & AIR-GAP COMPLIANCE]</div>
              <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">GLOBAL INDUSTRIAL TELEMETRY RADAR</h2>
              <p :class="['text-sm', isDaylight ? 'text-zinc-600' : 'text-zinc-400']">
                Live heartbeat verification with distributed Cloudflare D1 edge network. Telemetry tracks compiler performance and error frequencies while strictly enforcing zero PII and zero source-code transmission.
              </p>
            </div>

            <!-- Ping Test Button & Stats Bar -->
            <div :class="['border p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
              <div>
                <span class="text-zinc-500 block text-[10px] uppercase">EDGE LATENCY:</span>
                <span class="text-lg font-black text-[#00D68F] tabular-nums">{{ pingLatency }} ms</span>
              </div>
              <div>
                <span class="text-zinc-500 block text-[10px] uppercase">ACTIVE NATIONS:</span>
                <span class="text-lg font-black text-white tabular-nums">48 COUNTRIES</span>
              </div>
              <button 
                @click="testEdgePing"
                :disabled="isPinging"
                class="px-3 py-1.5 bg-[#FF5500] hover:bg-orange-600 text-white font-bold text-xs transition-colors">
                {{ isPinging ? 'TESTING...' : 'PING EDGE NODE' }}
              </button>
            </div>

            <!-- Automotive & Industrial Hubs Table -->
            <div :class="['border overflow-hidden', isDaylight ? 'border-zinc-300' : 'border-zinc-800']">
              <table class="w-full text-xs font-mono text-left">
                <thead :class="['border-b text-[10px] uppercase', isDaylight ? 'bg-zinc-200 border-zinc-300 text-zinc-600' : 'bg-[#16161A] border-zinc-800 text-zinc-400']">
                  <tr>
                    <th class="p-2.5">COUNTRY</th>
                    <th class="p-2.5">PRIMARY CLUSTER</th>
                    <th class="p-2.5">CONTROLLERS</th>
                    <th class="p-2.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800">
                  <tr v-for="hub in primaryHubs" :key="hub.city" class="hover:bg-zinc-800/40">
                    <td class="p-2.5 font-bold text-white">{{ hub.code }} {{ hub.country }}</td>
                    <td class="p-2.5 text-zinc-400">{{ hub.city }} ({{ hub.focus }})</td>
                    <td class="p-2.5 text-zinc-400">{{ hub.kss }}</td>
                    <td class="p-2.5 text-right text-[#00D68F] font-bold">ONLINE</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <!-- Right Column: Air-Gap Specification & Compliance Guarantees (6 cols) -->
          <div :class="['lg:col-span-6 border p-6 space-y-6', isDaylight ? 'bg-white border-zinc-300' : 'bg-[#111114] border-zinc-800']">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-[#00D68F] font-mono text-xs font-bold">
              AIR-GAP COMPLIANCE SPECIFICATION
            </div>

            <div class="space-y-4 text-xs font-mono text-zinc-300">
              <div class="border-b border-zinc-800 pb-3">
                <span class="text-white font-bold block mb-1">1. ZERO SOURCE CODE UPLOAD</span>
                <p class="text-zinc-400 leading-relaxed">No lines of KRL (.src, .dat, .sub), variable identifiers, coordinates, or project files are ever uploaded to cloud servers. All AST parsing, linter checks, and backup diffing execute 100% locally on the host CPU.</p>
              </div>

              <div class="border-b border-zinc-800 pb-3">
                <span class="text-white font-bold block mb-1">2. OFFLINE AIR-GAP NODE ACTIVATION</span>
                <p class="text-zinc-400 leading-relaxed">For high-security defense and automotive plants with severed internet connections, offline cryptographic license keys (Ed25519 node-locked) are provided for perpetual operation without telemetry.</p>
              </div>

              <div>
                <span class="text-white font-bold block mb-1">3. REVERSINGLABS SPECTRA ASSURE AUDIT</span>
                <p class="text-zinc-400 leading-relaxed">Every extension release undergoes formal static binary decompilation and CVE scanning via ReversingLabs Spectra Assure, ensuring 100% clean pipeline verification and 0 supply chain risks.</p>
              </div>
            </div>

            <div class="pt-2">
              <a 
                href="https://github.com/LiskinLabs/kuka-krl-extension"
                target="_blank" 
                class="inline-flex items-center gap-2 text-xs font-mono text-[#FF5500] hover:underline font-bold">
                <span>VIEW OPEN SOURCE REPOSITORIES & AUDIT LOGS</span>
                <svg class="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/></svg>
              </a>
            </div>

          </div>

        </div>

      </section>

      <!-- BLOCK 9: ENTERPRISE FOOTER -->
      <footer :class="['py-12 text-left font-mono text-xs', isDaylight ? 'text-zinc-600' : 'text-zinc-500']">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div class="space-y-3">
            <div class="font-bold text-white text-sm">LISKIN LABS INDUSTRIAL</div>
            <p class="text-[11px] text-zinc-400 leading-relaxed">Advanced systems engineering, static safety analyzers, and high-precision CAD tooling for industrial robotics.</p>
            <div class="text-[10px] text-zinc-500">Lead Systems Architect: Silvestr Liskin</div>
          </div>

          <div class="space-y-2">
            <div class="font-bold text-white text-[11px] uppercase">PRODUCT SUITE</div>
            <ul class="space-y-1 text-[11px]">
              <li><a href="#hero" class="hover:text-[#FF5500]">KUKA KRL Professional</a></li>
              <li><a href="#simulator" class="hover:text-[#FF5500]">VS Code Web Simulator</a></li>
              <li><a href="#inventory" class="hover:text-[#FF5500]">80+ Industrial Tools Wiki</a></li>
              <li><a href="#pricing" class="hover:text-[#FF5500]">B2B Licensing & Pricing</a></li>
            </ul>
          </div>

          <div class="space-y-2">
            <div class="font-bold text-white text-[11px] uppercase">COMPLIANCE & LEGAL</div>
            <ul class="space-y-1 text-[11px]">
              <li>Merchant of Record: Dodo Payments Inc.</li>
              <li>Security: ReversingLabs 0 CVE Pass</li>
              <li>License: Proprietary EULA & Community</li>
              <li>Air-Gap: 100% On-Premise Capable</li>
            </ul>
          </div>

          <div class="space-y-2">
            <div class="font-bold text-white text-[11px] uppercase">DISCLAIMER</div>
            <p class="text-[10px] leading-relaxed text-zinc-500">
              KUKA, KRC, KSS, WorkVisual, and smartPAD are registered trademarks of KUKA AG. Liskin Labs is an independent industrial software laboratory and is not officially affiliated with KUKA AG.
            </p>
          </div>

        </div>

        <div :class="['border-t pt-6 flex flex-wrap justify-between items-center gap-4 text-[11px]', isDaylight ? 'border-zinc-300' : 'border-zinc-800']">
          <div>© 2024–2026 Liskin Labs (Silvestr Liskin). All rights reserved.</div>
          <div class="flex items-center gap-4">
            <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension" class="hover:text-white">VS Code Marketplace</a>
            <a href="https://github.com/LiskinLabs/kuka-krl-extension" class="hover:text-white">GitHub</a>
            <a href="/guide/features" class="hover:text-white">Documentation</a>
          </div>
        </div>
      </footer>

    </main>

    <!-- MODAL 1: OFFICIAL PRINTABLE COMMERCIAL PROPOSAL (ANGEBOT / КП) -->
    <div v-if="showQuoteModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white text-black w-full max-w-3xl border border-zinc-400 p-6 sm:p-8 font-sans shadow-2xl relative my-8">
        
        <!-- Modal Close Button -->
        <button 
          @click="showQuoteModal = false"
          class="absolute top-4 right-4 text-zinc-500 hover:text-black font-mono text-sm">
          [✕ CLOSE]
        </button>

        <!-- Printable Document Header (Letterhead) -->
        <div class="border-b-2 border-black pb-4 mb-6 flex justify-between items-start">
          <div>
            <div class="text-xl font-black tracking-tight">LISKIN LABS INDUSTRIAL ROBOTICS</div>
            <div class="text-xs font-mono text-zinc-600">Advanced Tooling & Static Analysis Solutions</div>
            <div class="text-xs font-mono text-zinc-600">Commercial Registration // Dodo Payments Merchant Network</div>
          </div>
          <div class="text-right font-mono text-xs">
            <div class="font-bold text-sm">COMMERCIAL PROPOSAL</div>
            <div>REF: {{ quoteDocRef }}</div>
            <div>DATE: {{ quoteDate }}</div>
            <div>VALIDITY: 30 DAYS</div>
          </div>
        </div>

        <!-- Bill of Materials Table -->
        <div class="space-y-4 mb-6">
          <div class="font-mono text-xs font-bold uppercase tracking-wider text-zinc-700">SPECIFICATION OF DELIVERABLES & SEATS</div>
          <table class="w-full text-xs font-mono border-collapse border border-zinc-300">
            <thead>
              <tr class="bg-zinc-100 border-b border-zinc-300">
                <th class="p-2 text-left">ITEM</th>
                <th class="p-2 text-left">DESCRIPTION</th>
                <th class="p-2 text-center">WORKSTATIONS</th>
                <th class="p-2 text-right">ANNUAL TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-zinc-200">
                <td class="p-2 font-bold">{{ recommendedTier.name }}</td>
                <td class="p-2">KUKA KRL Professional IDE v1.9.5 Suite (80+ Industrial Tools, Air-Gap License, Spectra Assure 0 CVE)</td>
                <td class="p-2 text-center">{{ recommendedTier.seats }} Seats</td>
                <td class="p-2 text-right font-bold">{{ formatPrice(recommendedTier.priceUsd) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ROI Summary Block -->
        <div class="bg-zinc-50 border border-zinc-200 p-4 mb-6 text-xs font-mono space-y-1">
          <div class="font-bold text-black uppercase">PLANT ROI & DOWNTIME REDUCTION ANALYSIS:</div>
          <div>• Configured Robot Fleet: {{ calcRobots }} Robots in active production cells</div>
          <div>• Automation Team: {{ calcEngineers }} Commissioning & Maintenance Engineers</div>
          <div>• Anticipated Downtime Prevented: ~{{ preventedHours }} Hours / Year</div>
          <div class="text-[#00D68F] font-bold">• Estimated Net Financial Benefit: {{ formatPrice(annualSavings) }} / Year</div>
        </div>

        <!-- Terms & Delivery -->
        <div class="text-[11px] font-mono text-zinc-600 space-y-1 border-t border-zinc-200 pt-4 mb-6">
          <div class="font-bold text-black uppercase">TERMS OF FULFILLMENT:</div>
          <div>1. Instant digital license key delivery or offline Air-Gap package upon PO processing.</div>
          <div>2. Payments processed securely via Dodo Payments Inc. (Corporate Wire, ACH, Credit Card, EU VAT Invoicing).</div>
          <div>3. 14-day 100% money-back guarantee and dedicated engineering support.</div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between items-center pt-2">
          <div class="text-[11px] font-mono text-zinc-500">Authorized signatory: Silvestr Liskin</div>
          <div class="flex gap-2 font-mono text-xs">
            <button 
              @click="printQuote"
              class="px-4 py-2 bg-black text-white hover:bg-zinc-800 font-bold">
              PRINT / EXPORT PDF
            </button>
            <button 
              @click="showQuoteModal = false"
              class="px-4 py-2 border border-zinc-400 hover:bg-zinc-100 font-bold">
              CLOSE
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- MODAL 2: 14-DAY PRO TRIAL ACTIVATION -->
    <div v-if="showTrialModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div :class="['w-full max-w-lg border p-6 font-mono text-xs text-left shadow-2xl relative space-y-4', isDaylight ? 'bg-white border-zinc-400 text-black' : 'bg-[#111114] border-zinc-700 text-white']">
        <button 
          @click="showTrialModal = false"
          class="absolute top-4 right-4 text-zinc-500 hover:text-white">
          [✕]
        </button>

        <div class="text-sm font-bold text-[#FF5500]">ACTIVATE 14-DAY PRO TRIAL</div>
        <p class="text-zinc-400 text-xs">Experience all 80+ Pro features with zero credit card and zero commitment.</p>

        <div class="space-y-3 border-t border-b border-zinc-800 py-3 text-xs">
          <div>
            <span class="text-[#FF5500] font-bold block">STEP 1: INSTALL EXTENSION</span>
            <span class="text-zinc-400">Install KUKA KRL Professional from the VS Code Marketplace.</span>
          </div>
          <div>
            <span class="text-[#FF5500] font-bold block">STEP 2: OPEN COMMAND PALETTE</span>
            <span class="text-zinc-400">Press <kbd class="bg-zinc-800 px-1.5 py-0.5 border border-zinc-700">Ctrl+Shift+P</kbd> (or <kbd class="bg-zinc-800 px-1.5 py-0.5 border border-zinc-700">Cmd+Shift+P</kbd> on macOS).</span>
          </div>
          <div>
            <span class="text-[#FF5500] font-bold block">STEP 3: RUN COMMAND</span>
            <span class="text-zinc-400 block mb-1">Type and execute:</span>
            <code class="bg-black p-2 border border-zinc-700 block text-emerald-400 font-bold select-all">krl.startTrial</code>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button 
            @click="showTrialModal = false"
            class="px-4 py-2 bg-[#FF5500] text-white font-bold hover:bg-orange-600">
            GOT IT
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL 3: TOOL PREVIEW DEMO MODAL -->
    <div v-if="selectedTool" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div :class="['w-full max-w-2xl border p-6 font-mono text-xs text-left shadow-2xl relative space-y-4', isDaylight ? 'bg-white border-zinc-400 text-black' : 'bg-[#111114] border-zinc-700 text-white']">
        <button 
          @click="selectedTool = null"
          class="absolute top-4 right-4 text-zinc-500 hover:text-white">
          [✕ CLOSE]
        </button>

        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 bg-[#FF5500] text-white font-bold text-[10px]">{{ selectedTool.status }}</span>
          <span class="text-sm font-bold">{{ selectedTool.title }}</span>
        </div>

        <div class="text-zinc-500 text-[11px]">{{ selectedTool.id }} // Category: {{ selectedTool.category }}</div>

        <p class="text-xs text-zinc-300 leading-relaxed">{{ selectedTool.valueProposition }}</p>

        <!-- Tool Media Demo Preview (if matching media exists) -->
        <div class="border border-zinc-800 bg-black p-2 flex items-center justify-center min-h-[220px]">
          <img 
            :src="getToolMediaSrc(selectedTool)" 
            @error="onMediaError"
            alt="Tool Demo" 
            class="max-h-[300px] object-contain" />
        </div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-[10px] text-zinc-500">KSS 8.3 / 8.5 / 8.6 / 8.7 (KRC5) Compatible</span>
          <button 
            @click="selectedTool = null"
            class="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold">
            CLOSE
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { withBase, useData } from 'vitepress'
import KukaRobot3D from './KukaRobot3D.vue'
import VsCodeWebSimulator from './VsCodeWebSimulator.vue'
import KrlWebInspector from './KrlWebInspector.vue'
import inventoryData from './krl_tools_inventory.json'
import localesExtra from './locales_de_es_it.json'

// Theme & Environment States
const isDaylight = ref(false)
const mobileMenuOpen = ref(false)
const copiedCli = ref(false)
const showTrialModal = ref(false)
const showQuoteModal = ref(false)
const selectedTool = ref(null)

// Language Switcher
const { lang } = useData()
const currentLang = ref('en')

const setLanguage = (l) => {
  currentLang.value = l
}

onMounted(() => {
  if (lang && lang.value) {
    const l = lang.value.toLowerCase()
    if (l.startsWith('ru')) currentLang.value = 'ru'
    else if (l.startsWith('tr')) currentLang.value = 'tr'
    else if (l.startsWith('de')) currentLang.value = 'de'
    else if (l.startsWith('it')) currentLang.value = 'it'
    else if (l.startsWith('es')) currentLang.value = 'es'
  }
})

// Currency Engine
const currentCurrency = ref('USD')
const currencyRates = {
  USD: { symbol: '$', rate: 1.0, isPrefix: true },
  EUR: { symbol: '€', rate: 0.92, isPrefix: false },
  RUB: { symbol: '₽', rate: 94.0, isPrefix: false },
  TRY: { symbol: '₺', rate: 34.5, isPrefix: false }
}

const formatPrice = (usd) => {
  if (usd === 0) return 'Free'
  const cur = currencyRates[currentCurrency.value] || currencyRates.USD
  const raw = usd * cur.rate
  const valStr = (usd % 1 !== 0 && cur.rate === 1.0) ? raw.toFixed(2) : Math.round(raw).toLocaleString()
  return cur.isPrefix ? `${cur.symbol}${valStr}` : `${valStr} ${cur.symbol}`
}

// Translations Dictionary
const translations = {
  en: {
    heroHeadline1: "ZERO DOWNTIME",
    heroHeadline2: "BEFORE THE ROBOT TOUCHES THE PART",
    heroSubhead: "Industrial IDE and static safety analyzer for KUKA KRL (KRC2/KRC4/KRC5). Detects Advance Run stops, $BASE/$TOOL frame drift, missing BRAKE commands, and uninitialized kinematic hazards before physical execution on the shop floor."
  },
  ru: {
    heroHeadline1: "НОЛЬ ПРОСТОЕВ ДО ПЕРВОГО",
    heroHeadline2: "КАСАНИЯ ДЕТАЛИ РОБОТОМ",
    heroSubhead: "Промышленная IDE и статический анализатор безопасности для KUKA KRL (KRC2/KRC4/KRC5). Предотвращает срывы Advance Run, дрейф фреймов $BASE/$TOOL, пропущенные BRAKE и неинициализированные кинематические коллизии до компиляции на контроллере."
  },
  de: {
    heroHeadline1: "NULL AUSFALLZEIT",
    heroHeadline2: "BEVOR DER ROBOTER DAS TEIL BERÜHRT",
    heroSubhead: "Industrielle IDE und statischer Sicherheitsanalysator für KUKA KRL (KRC2/KRC4/KRC5). Erkennt Vorlaufstopps, $BASE/$TOOL-Frame-Drift, fehlende BRAKE-Befehle und Kollisionen vor der Inbetriebnahme."
  },
  tr: {
    heroHeadline1: "ROBOT PARÇAYA DOKUNMADAN ÖNCE",
    heroHeadline2: "SIFIR DURUŞ SÜRESİ",
    heroSubhead: "KUKA KRL (KRC2/KRC4/KRC5) için endüstriyel IDE ve statik güvenlik analizörü. Fiziksel çalıştırmadan önce Ön Çalışma (Advance Run) duruşlarını, $BASE/$TOOL sapmalarını ve eksik BRAKE komutlarını tespit eder."
  },
  es: {
    heroHeadline1: "CERO TIEMPO DE INACTIVIDAD",
    heroHeadline2: "ANTES DE QUE EL ROBOT TOQUE LA PIEZA",
    heroSubhead: "IDE industrial y analizador estático de seguridad para KUKA KRL (KRC2/KRC4/KRC5). Detecta paradas de Advance Run, desviaciones de $BASE/$TOOL y comandos BRAKE omitidos antes de la ejecución física."
  },
  it: {
    heroHeadline1: "ZERO TEMPI DI INATTIVITÀ",
    heroHeadline2: "PRIMA CHE IL ROBOT TOCCHI IL PEZZO",
    heroSubhead: "IDE industriale e analizzatore statico di sicurezza per KUKA KRL (KRC2/KRC4/KRC5). Rileva arresti di Advance Run, drift di $BASE/$TOOL e comandi BRAKE mancanti prima dell'esecuzione fisica."
  }
}

const t = computed(() => translations[currentLang.value] || translations.en)

// CLI Install Copy
const copyCliInstall = async () => {
  try {
    await navigator.clipboard.writeText('code --install-extension LiskinLabs.kuka-krl-extension')
    copiedCli.value = true
    setTimeout(() => { copiedCli.value = false }, 2500)
  } catch (e) {
    copiedCli.value = true
  }
}

// Disaster Scenarios Data
const disasterScenarios = [
  {
    id: 'advance_run',
    tag: 'ADVANCE RUN STOP',
    title: '$ADVANCE Trajectory Interruption',
    avoidedCost: '$24,000 / hr avoided',
    description: 'Raw digital outputs ($OUT) or synchronous variable accesses within continuous path (CP) motion break the controller advance run pointer, causing sudden mechanical deceleration, seam burn-through, and conveyor stoppage.',
    beforeCode: `; HAZARD: Unsynchronized raw I/O triggers implicit Vorlaufstopp!
LIN XPICK_APPROACH C_DIS
$OUT[12] = TRUE ; Advance run pointer halted! Robot stops on seam.
LIN XPICK_PART`,
    afterCode: `; SAFE: Trigger event dynamically synchronized with motion
LIN XPICK_APPROACH C_DIS
TRIGGER WHEN DISTANCE=1 DELAY=0 DO $OUT[12] = TRUE
LIN XPICK_PART ; Trajectory continues at full CP speed without stopping`
  },
  {
    id: 'missing_brake',
    tag: 'KSS 1422 CRITICAL FAULT',
    title: 'Missing BRAKE Before RESUME',
    avoidedCost: '$18,500 / incident avoided',
    description: 'Executing RESUME in an interrupt subroutine without a preceding BRAKE command causes instant controller fault KSS 1422, triggering emergency braking with excessive mechanical stress on axis gearboxes.',
    beforeCode: `DEF PART_SEARCH_ISR()
  INTERRUPT OFF 10
  ; CRITICAL FAULT: RESUME without BRAKE triggers instant KSS 1422!
  RESUME
END`,
    afterCode: `DEF PART_SEARCH_ISR()
  INTERRUPT OFF 10
  BRAKE ; Safely stops current motion before stack unwind
  RESUME ; Smooth subroutine termination
END`
  },
  {
    id: 'frame_drift',
    tag: 'FRAME DRIFT HAZARD',
    title: 'Uninitialized $TOOL / $BASE Offset',
    avoidedCost: '$42,000 / collision avoided',
    description: 'Cartesian motions executed prior to BAS(#INITMOV, 0) or without explicitly assigned $TOOL and $BASE use default $NULLFRAME, shifting actual TCP trajectory by several hundred millimeters into fixture steel.',
    beforeCode: `DEF WeldCycle()
  ; HAZARD: No motion dynamics initialization & unassigned frames!
  PTP XHOME
  LIN XSEAM_START ; Moves with Flange TCP in World Coordinates!
END`,
    afterCode: `DEF WeldCycle()
  BAS(#INITMOV, 0) ; Dynamics & interpolation parameters loaded
  $TOOL = TOOL_DATA[1] ; Calibrated arc torch TCP
  $BASE = BASE_DATA[2] ; Workpiece fixture coordinate frame
  PTP XHOME
  LIN XSEAM_START ; Guaranteed millimeter-accurate trajectory
END`
  },
  {
    id: 'fold_bom',
    tag: 'KSS 00041 CORRUPTION',
    title: 'Corrupted FOLD Header & UTF-8 BOM',
    avoidedCost: '$8,000 / shift avoided',
    description: 'Generic editors destroy KUKA SmartHMI checksums and insert invalid UTF-8 BOMs, rendering routines un-openable on the smartPAD pendant and stalling commissioning engineers on site.',
    beforeCode: `; CORRUPTED: Generic text editor stripped KUKA checksum
;FOLD INI
  BAS (#INITMOV,0 )
;ENDFOLD (INI)`,
    afterCode: `; SANITIZED: Compliant KRL Pro checksum & CRLF preservation
;FOLD INI;%{PE}%R 8.6.1,%MKUKATPBASIS,%CINITMOV,%VINITMOV,%P 1:INITMOV, 2:0
  BAS (#INITMOV,0 )
;ENDFOLD (INI)`
  }
]

const activeDisaster = ref(disasterScenarios[0])

// Web Simulator Tab
const activeSimTab = ref('editor')

// B2B ROI Calculator State
const calcRobots = ref(12)
const calcEngineers = ref(4)
const calcDowntimeCost = ref(12000)

const preventedHours = computed(() => Math.round(calcRobots.value * 0.75 + calcEngineers.value * 1.5))
const annualSavings = computed(() => preventedHours.value * calcDowntimeCost.value)

const recommendedTier = computed(() => {
  if (calcEngineers.value <= 5) {
    return { name: 'Team Edition', seats: 5, priceUsd: 499 }
  } else if (calcEngineers.value <= 20) {
    return { name: 'Department / Integrator', seats: 20, priceUsd: 1499 }
  } else {
    return { name: 'Enterprise Site', seats: 100, priceUsd: 4999 }
  }
})

// Quotation Document Metadata
const quoteDocRef = ref('KP-2026-KRL-84F2')
const quoteDate = ref(new Date().toISOString().split('T')[0])

const openQuoteModal = () => {
  quoteDocRef.value = 'KP-2026-KRL-' + Math.random().toString(16).substr(2, 4).toUpperCase()
  quoteDate.value = new Date().toISOString().split('T')[0]
  showQuoteModal.value = true
}

const printQuote = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

// 80+ Tools Inventory Processing
const allInventory = []
if (inventoryData && inventoryData.inventory) {
  Object.keys(inventoryData.inventory).forEach(cat => {
    inventoryData.inventory[cat].forEach(item => {
      allInventory.push({
        ...item,
        category: cat
      })
    })
  })
}

const toolSearchQuery = ref('')
const selectedCategory = ref('All')

const toolCategories = computed(() => {
  const cats = ['All']
  if (inventoryData && inventoryData.inventory) {
    cats.push(...Object.keys(inventoryData.inventory))
  }
  return cats.slice(0, 7)
})

const filteredTools = computed(() => {
  let list = allInventory
  if (selectedCategory.value !== 'All') {
    list = list.filter(t => t.category === selectedCategory.value)
  }
  if (toolSearchQuery.value.trim()) {
    const q = toolSearchQuery.value.toLowerCase()
    list = list.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.id.toLowerCase().includes(q) || 
      (t.valueProposition && t.valueProposition.toLowerCase().includes(q))
    )
  }
  return list.slice(0, 16)
})

const openToolPreview = (tool) => {
  selectedTool.value = tool
}

const getToolMediaSrc = (tool) => {
  if (!tool) return withBase('/media/Smart Autocomplete.gif')
  const id = tool.id.toLowerCase()
  if (id.includes('inlay')) return withBase('/media/inlay_hints.gif')
  if (id.includes('backup') || id.includes('diff')) return withBase('/media/krc_backup_diff.gif')
  if (id.includes('definition')) return withBase('/media/goto_definition.gif')
  if (id.includes('signal') || id.includes('io')) return withBase('/media/krl_io_signals.gif')
  if (id.includes('fold')) return withBase('/media/quick_fold_toolbar.gif')
  return withBase('/media/Smart Autocomplete.gif')
}

const onMediaError = (e) => {
  e.target.src = withBase('/logo.png')
}

// Global Telemetry Radar
const pingLatency = ref(24)
const isPinging = ref(false)

const testEdgePing = () => {
  isPinging.value = true
  const startTime = Date.now()
  setTimeout(() => {
    pingLatency.value = Math.floor(Math.random() * 18) + 16
    isPinging.value = false
  }, 450)
}

const primaryHubs = [
  { code: '[DE]', country: 'Germany', city: 'Wolfsburg & Stuttgart', focus: 'Automotive BIW Lines', kss: 'KSS 8.7 (KRC5)' },
  { code: '[TR]', country: 'Turkey', city: 'Bursa & Kocaeli', focus: 'Automotive & System Integration', kss: 'KSS 8.6 / 8.7' },
  { code: '[US]', country: 'United States', city: 'Detroit & Spartanburg', focus: 'Assembly & Body Cells', kss: 'KSS 8.6 / 8.7' },
  { code: '[IT]', country: 'Italy', city: 'Turin & Modena', focus: 'Precision Robotics Lines', kss: 'KSS 8.5 / 8.6' },
  { code: '[KR]', country: 'South Korea', city: 'Ulsan & Hwaseong', focus: 'High-Speed Spot Welding', kss: 'KSS 8.7 (KRC5)' },
  { code: '[JP]', country: 'Japan', city: 'Nagoya & Yokohama', focus: 'Automated Press Cells', kss: 'KSS 8.6 / 8.7' }
]
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  .bg-white.text-black.w-full.max-w-3xl,
  .bg-white.text-black.w-full.max-w-3xl * {
    visibility: visible;
  }
  .bg-white.text-black.w-full.max-w-3xl {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
  }
}
</style>
