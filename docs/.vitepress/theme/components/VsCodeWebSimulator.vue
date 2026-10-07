<template>
  <div class="vscode-simulator w-full rounded-2xl bg-[#181818] border border-[#2d2d2d] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden font-sans select-none text-left">
    
    <!-- 1. VS Code Titlebar (Window Controls & Search / Command Bar) -->
    <div class="h-9 bg-[#1f1f1f] border-b border-[#2d2d2d] flex items-center justify-between px-3 text-[#cccccc] text-xs font-sans">
      <!-- Left: Mac Window Dots / App Title -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1.5 mr-2">
          <span class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></span>
          <span class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></span>
          <span class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></span>
        </div>
        <span class="text-[#858585] text-[11px] hidden sm:inline">KUKA KRL Professional — VS Code Web IDE [Online Simulator]</span>
      </div>

      <!-- Center: Clickable Command Palette Launcher (Ctrl+Shift+P) -->
      <button 
        @click="openCommandPalette" 
        class="bg-[#2d2d2d] hover:bg-[#383838] border border-[#3c3c3c] rounded-md px-3 py-1 flex items-center gap-2 text-[11px] text-[#cccccc] transition-colors shadow-sm w-56 sm:w-80 justify-between">
        <span class="flex items-center gap-1.5 truncate">
          <svg class="w-3.5 h-3.5 text-kuka-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span class="text-[#999999] truncate">kuka-cell-04 &gt; {{ activeFileName }}</span>
        </span>
        <kbd class="hidden sm:inline-block bg-[#1f1f1f] text-[10px] text-[#858585] px-1.5 py-0.5 rounded border border-[#3c3c3c]">Ctrl+Shift+P</kbd>
      </button>

      <!-- Right: Action Badges -->
      <div class="flex items-center gap-2">
        <span class="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
          ● KSS 8.7 AST ONLINE
        </span>
        <button 
          @click="togglePanel" 
          title="Toggle Bottom Diagnostics Panel"
          class="p-1 hover:bg-[#2d2d2d] rounded text-[#858585] hover:text-[#cccccc] transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>
      </div>
    </div>

    <!-- 2. Main Workspace Body (Activity Bar + Sidebar + Editor + Minimap) -->
    <div class="flex h-[560px] relative">
      
      <!-- 2.A Activity Bar (Left 48px) -->
      <div class="w-12 bg-[#181818] border-r border-[#2d2d2d] flex flex-col items-center justify-between py-2 shrink-0 z-10 text-[#858585]">
        <div class="flex flex-col items-center gap-4 w-full">
          <!-- Explorer (Active) -->
          <button 
            @click="activeSideTab = 'explorer'" 
            :class="['w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative', activeSideTab === 'explorer' ? 'text-white' : 'hover:text-white']">
            <span v-if="activeSideTab === 'explorer'" class="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-kuka-orange"></span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
          </button>

          <!-- KRL Tools / Control Center -->
          <button 
            @click="activeSideTab = 'krlTools'" 
            :class="['w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative', activeSideTab === 'krlTools' ? 'text-kuka-orange font-bold' : 'hover:text-white']">
            <span v-if="activeSideTab === 'krlTools'" class="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-kuka-orange"></span>
            <svg class="w-5 h-5 text-kuka-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </button>

          <!-- Git / Backup Diff -->
          <button 
            @click="activeSideTab = 'git'" 
            :class="['w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative', activeSideTab === 'git' ? 'text-white' : 'hover:text-white']">
            <span v-if="activeSideTab === 'git'" class="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-kuka-orange"></span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
            <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-kuka-orange"></span>
          </button>
        </div>

        <div class="flex flex-col items-center gap-3 w-full">
          <button @click="openCommandPalette" title="Settings / Commands" class="w-10 h-10 rounded-lg flex items-center justify-center hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </button>
        </div>
      </div>

      <!-- 2.B Side Bar (Explorer / File Tree) (210px) -->
      <div v-if="sidebarVisible" class="w-56 bg-[#181818] border-r border-[#2d2d2d] flex flex-col shrink-0 text-[#cccccc] text-xs font-sans">
        
        <!-- Sidebar Title -->
        <div class="px-3 py-2 uppercase tracking-wider text-[11px] font-bold text-[#858585] flex items-center justify-between border-b border-[#252525]">
          <span>{{ activeSideTab === 'explorer' ? 'Explorer' : activeSideTab === 'krlTools' ? 'KRL Control Center' : 'Source Control' }}</span>
          <button @click="sidebarVisible = false" class="hover:text-white text-xs">✕</button>
        </div>

        <!-- EXPLORER TAB CONTENT -->
        <div v-if="activeSideTab === 'explorer'" class="p-2 space-y-1 overflow-y-auto flex-1 font-mono text-[11px]">
          <div class="text-[#858585] px-1.5 py-0.5 flex items-center gap-1 font-bold">
            <span>▼</span>
            <span>KUKA_CELL_04 [KRC4]</span>
          </div>

          <div class="pl-2 space-y-0.5">
            <div class="text-[#858585] px-1.5 py-0.5 flex items-center gap-1">
              <span>▼</span>
              <span>📁 R1/Program</span>
            </div>

            <!-- Program Files List -->
            <button 
              v-for="file in projectFiles" 
              :key="file.name"
              @click="openFile(file)"
              :class="['w-full text-left pl-6 pr-2 py-1 rounded flex items-center justify-between gap-1.5 transition-colors', activeFileName === file.name ? 'bg-[#37373d] text-white font-bold' : 'hover:bg-[#2a2d2e] text-[#cccccc]']">
              <span class="flex items-center gap-1.5 truncate">
                <span :class="file.name.endsWith('.src') ? 'text-kuka-orange' : file.name.endsWith('.dat') ? 'text-cyan-400' : 'text-emerald-400'">
                  {{ file.name.endsWith('.src') ? '⚡' : file.name.endsWith('.dat') ? '📍' : '⚙️' }}
                </span>
                <span class="truncate">{{ file.name }}</span>
              </span>
              <span v-if="file.hasErrors" class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            </button>
          </div>

          <!-- Mounted Backup ZIP Section -->
          <div class="pt-3 pl-2">
            <div class="text-[#858585] px-1.5 py-0.5 flex items-center gap-1">
              <span>▼</span>
              <span>📦 KRCDiag_2026.zip [MOUNT]</span>
            </div>
            <div class="pl-6 text-[10px] text-gray-500 py-0.5">
              • Auto-Patch Enabled (&lt;80ms)
            </div>
          </div>
        </div>

        <!-- KRL TOOLS TAB CONTENT -->
        <div v-if="activeSideTab === 'krlTools'" class="p-3 space-y-2 overflow-y-auto flex-1 font-mono text-xs">
          <div class="text-kuka-orange font-bold text-[11px] uppercase tracking-wider mb-2">159 Native Commands:</div>
          <button 
            v-for="cmd in quickTools" 
            :key="cmd.id"
            @click="executeTool(cmd)"
            class="w-full text-left p-2 rounded bg-[#252526] hover:bg-[#2d2d30] border border-[#333333] transition-colors text-gray-200">
            <div class="font-bold text-white text-[11px]">{{ cmd.name }}</div>
            <div class="text-[10px] text-gray-400 mt-0.5">{{ cmd.desc }}</div>
          </button>
        </div>

        <!-- GIT TAB CONTENT -->
        <div v-if="activeSideTab === 'git'" class="p-3 space-y-2 text-xs font-mono">
          <div class="text-gray-400 text-[11px]">Branch: <strong class="text-white">main</strong></div>
          <div class="p-2 rounded bg-[#252526] border border-[#333333] text-[11px]">
            <div class="text-amber-400">M WeldingCell.src</div>
            <div class="text-[10px] text-gray-500 mt-1">+2 points modified by Night Shift</div>
          </div>
          <button @click="showBackupDiffModal = true" class="w-full py-1.5 rounded bg-kuka-orange text-white font-bold text-[11px] shadow-sm">
            Inspect Backup Delta (ΔX, ΔY)
          </button>
        </div>

      </div>

      <!-- 2.C Editor Workspace Area (Tabs + Code Buffer + Minimap) -->
      <div class="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden min-w-0">
        
        <!-- Tab Bar -->
        <div class="h-9 bg-[#252526] flex items-center border-b border-[#181818] overflow-x-auto select-none">
          <button 
            v-for="tab in openTabs" 
            :key="tab.name"
            @click="activeFileName = tab.name"
            :class="['h-full px-3.5 flex items-center gap-2 border-r border-[#181818] text-xs font-mono transition-colors border-t-2', activeFileName === tab.name ? 'bg-[#1e1e1e] text-white border-t-kuka-orange font-bold' : 'bg-[#2d2d2d] text-[#969696] hover:text-[#cccccc] border-t-transparent']">
            <span>{{ tab.name.endsWith('.src') ? '⚡' : '📍' }}</span>
            <span>{{ tab.name }}</span>
            <span v-if="tab.isDirty" class="w-2 h-2 rounded-full bg-white"></span>
            <span @click.stop="closeTab(tab.name)" class="hover:text-white ml-1 text-xs">✕</span>
          </button>
        </div>

        <!-- Breadcrumbs Navigation Bar -->
        <div class="h-6 bg-[#1e1e1e] px-4 flex items-center text-[11px] font-mono text-[#858585] border-b border-[#252525]">
          <span>KRC</span>
          <span class="mx-1">›</span>
          <span>R1</span>
          <span class="mx-1">›</span>
          <span>Program</span>
          <span class="mx-1">›</span>
          <span class="text-white font-bold">{{ activeFileName }}</span>
          <span class="mx-1">›</span>
          <span class="text-kuka-orange font-bold">{{ activeSymbolName }}</span>
        </div>

        <!-- Code Editing Viewport with Monospaced Tokens -->
        <div class="flex-1 flex overflow-hidden font-mono text-xs leading-relaxed relative bg-[#1e1e1e]">
          
          <!-- Line Numbers Gutter with Fold Icons -->
          <div class="w-12 bg-[#1e1e1e] py-3 text-right pr-2 select-none text-[#5c5c5c] font-mono text-[11px] shrink-0 border-r border-[#2a2a2a]">
            <div 
              v-for="line in currentLines" 
              :key="line.num" 
              class="h-5 flex items-center justify-end gap-1">
              <span v-if="line.isFoldStart" @click="toggleFold(line.num)" class="cursor-pointer text-gray-400 hover:text-white text-[10px]">▼</span>
              <span :class="{'text-red-400 font-bold': line.hasError}">{{ line.num }}</span>
            </div>
          </div>

          <!-- Code Lines Area -->
          <div class="flex-1 py-3 px-3 overflow-y-auto overflow-x-auto text-[#d4d4d4] font-mono text-[12px] leading-5 select-text">
            <div 
              v-for="line in currentLines" 
              :key="line.num" 
              :class="['h-5 flex items-center whitespace-pre relative group hover:bg-[#282828] px-1 rounded', line.hasError ? 'bg-red-500/10' : '']">
              
              <!-- Syntax Tokenizer Output (Simulated KRL Lexer) -->
              <span v-html="highlightKrlLine(line.text)"></span>

              <!-- Inline Inlay Hints (Pro Feature Showcase) -->
              <span v-if="line.inlayHint" class="ml-2 px-1.5 py-0.2 rounded text-[10px] bg-[#2a2d2e] text-[#858585] border border-[#3c3c3c] select-none font-mono">
                {{ line.inlayHint }}
              </span>

              <!-- Inline ErrorLens Badge -->
              <span v-if="line.hasError" class="ml-3 px-2 py-0.2 rounded text-[10px] bg-red-900/60 text-red-200 border border-red-500/40 select-none font-mono">
                ⚠️ {{ line.errorMsg }}
              </span>
            </div>
          </div>

          <!-- Minimap (Visual Right Strip) -->
          <div class="w-16 bg-[#181818] hidden lg:flex flex-col py-2 px-1 select-none opacity-40 shrink-0 border-l border-[#252525]">
            <div v-for="i in 28" :key="i" class="h-1 bg-gray-500 rounded-sm mb-0.5" :style="{ width: ((i * 37) % 70 + 20) + '%' }"></div>
          </div>

        </div>

        <!-- 2.D Bottom Panel: Problems, Flowchart, Output (Collapsible) -->
        <div v-if="bottomPanelOpen" class="h-44 bg-[#181818] border-t border-[#2d2d2d] flex flex-col font-mono text-xs">
          
          <!-- Panel Header Tabs -->
          <div class="h-7 bg-[#1f1f1f] border-b border-[#2d2d2d] flex items-center justify-between px-3 text-[#cccccc] text-[11px]">
            <div class="flex items-center gap-4">
              <button 
                @click="panelTab = 'problems'"
                :class="['flex items-center gap-1.5 transition-colors', panelTab === 'problems' ? 'text-white font-bold border-b-2 border-kuka-orange pb-0.5' : 'text-[#858585] hover:text-[#cccccc]']">
                <span>PROBLEMS</span>
                <span class="px-1 rounded-full bg-red-500/30 text-red-300 text-[10px] font-bold">{{ activeFileErrors.length }}</span>
              </button>
              <button 
                @click="panelTab = 'flowchart'"
                :class="['flex items-center gap-1.5 transition-colors', panelTab === 'flowchart' ? 'text-white font-bold border-b-2 border-kuka-orange pb-0.5' : 'text-[#858585] hover:text-[#cccccc]']">
                <span>KRL FLOWCHART</span>
                <span class="px-1 rounded bg-purple-500/20 text-purple-300 text-[10px]">PRO</span>
              </button>
              <button 
                @click="panelTab = 'output'"
                :class="['flex items-center gap-1.5 transition-colors', panelTab === 'output' ? 'text-white font-bold border-b-2 border-kuka-orange pb-0.5' : 'text-[#858585] hover:text-[#cccccc]']">
                <span>OUTPUT (AST Engine)</span>
              </button>
            </div>
            <button @click="bottomPanelOpen = false" class="hover:text-white">✕</button>
          </div>

          <!-- Panel Tab 1: Problems -->
          <div v-if="panelTab === 'problems'" class="flex-1 p-2.5 overflow-y-auto space-y-1.5 text-[11px]">
            <div v-if="activeFileErrors.length === 0" class="text-emerald-400 py-3 text-center">
              ✓ No problems detected in workspace. Controller AST check passed (100%).
            </div>
            <div 
              v-for="(err, idx) in activeFileErrors" 
              :key="idx"
              class="flex items-center gap-2 p-1.5 rounded hover:bg-[#252526] text-red-300 cursor-pointer">
              <span class="text-red-400">❌</span>
              <span class="text-gray-300">{{ err.msg }}</span>
              <span class="text-gray-500">[{{ activeFileName }} : Line {{ err.line }}]</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-gray-400 border border-white/5">{{ err.rule }}</span>
            </div>
          </div>

          <!-- Panel Tab 2: Interactive SVG Flowchart -->
          <div v-if="panelTab === 'flowchart'" class="flex-1 p-3 overflow-y-auto flex items-center justify-center bg-[#0e1117]">
            <div class="flex items-center gap-2 font-mono text-xs">
              <div class="p-2 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold">DEF Start()</div>
              <span class="text-gray-500">➔</span>
              <div class="p-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300">FOLD INI</div>
              <span class="text-gray-500">➔</span>
              <div class="p-2 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">PTP XHOME</div>
              <span class="text-gray-500">➔</span>
              <div class="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">PickLoop()</div>
              <span class="text-gray-500">➔</span>
              <div class="p-2 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300">END</div>
            </div>
          </div>

          <!-- Panel Tab 3: Output Log -->
          <div v-if="panelTab === 'output'" class="flex-1 p-2.5 overflow-y-auto text-[11px] text-gray-400 space-y-0.5">
            <div>[LanguageServer - 14:00:02] KUKA KRL Professional Language Server v1.9.3 started.</div>
            <div>[LanguageServer - 14:00:03] Indexed 10,327 symbols in 42ms. Controller scope: KSS 8.7.</div>
            <div>[LanguageServer - 14:00:04] AST Verified. 0 exceptions. Client HWID license node-locked.</div>
          </div>

        </div>

      </div>

    </div>

    <!-- 3. VS Code Status Bar (Bottom 24px) -->
    <div class="h-6 bg-[#007acc] text-white px-3 flex items-center justify-between text-[11px] font-mono select-none">
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1 font-bold">
          <span>⚡</span> KUKA KRL Pro
        </span>
        <span class="flex items-center gap-1">
          <span>❌</span> {{ activeFileErrors.length }}
        </span>
        <span class="hidden sm:inline">KSS 8.7 AST: Ready</span>
      </div>

      <div class="flex items-center gap-4">
        <span>Ln 14, Col 22</span>
        <span>Spaces: 3</span>
        <span>UTF-8</span>
        <span class="bg-black/20 px-2 py-0.2 rounded font-bold text-amber-200">
          PRO EDITION
        </span>
      </div>
    </div>

    <!-- 4. Interactive Command Palette Modal (Ctrl+Shift+P) -->
    <div 
      v-if="commandPaletteOpen" 
      @click.self="commandPaletteOpen = false"
      class="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-12">
      <div class="w-[520px] bg-[#252526] rounded-xl border border-[#454545] shadow-2xl overflow-hidden font-mono text-xs">
        <div class="p-2 border-b border-[#3c3c3c] flex items-center gap-2">
          <span class="text-kuka-orange font-bold text-sm">&gt;</span>
          <input 
            ref="paletteInput"
            v-model="paletteQuery"
            type="text" 
            placeholder="Type a KRL command (e.g. format, lint, diff, backup)..."
            class="w-full bg-transparent text-white outline-none placeholder:text-gray-500 text-xs" />
          <button @click="commandPaletteOpen = false" class="text-gray-400 hover:text-white">✕</button>
        </div>

        <div class="max-h-64 overflow-y-auto p-1 space-y-0.5">
          <button 
            v-for="cmd in filteredCommands" 
            :key="cmd.id"
            @click="runCommand(cmd)"
            class="w-full text-left p-2 rounded hover:bg-[#04395e] hover:text-white text-gray-200 flex items-center justify-between transition-colors">
            <div>
              <span class="text-kuka-orange font-bold">&gt; {{ cmd.name }}</span>
              <div class="text-[10px] text-gray-400">{{ cmd.desc }}</div>
            </div>
            <span class="text-[10px] text-gray-500 font-mono">{{ cmd.shortcut || 'PRO' }}</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const activeSideTab = ref('explorer')
const sidebarVisible = ref(true)
const bottomPanelOpen = ref(true)
const panelTab = ref('problems')
const commandPaletteOpen = ref(false)
const paletteQuery = ref('')
const paletteInput = ref(null)

const activeFileName = ref('PalletizingCell.src')
const openTabs = ref([
  { name: 'PalletizingCell.src', isDirty: false },
  { name: 'PalletizingCell.dat', isDirty: false },
  { name: 'WeldingFault.src', isDirty: false }
])

const activeSymbolName = computed(() => {
  return activeFileName.value.endsWith('.src') ? 'DEF PalletizingCell()' : 'DAT DEFINITIONS'
})

// File Contents Database
const fileBuffers = {
  'PalletizingCell.src': `&ACCESS RVP
&REL 1
&PARAM EDITMASK = *
&PARAM TEMPLATE = C:\\KRC\\Roboter\\Template\\vorgabe
DEF PalletizingCell()
; FOLD INI
  ; FOLD BASISTECH EXT
    GLOBAL INTERRUPT DECL 3 WHEN $STOPMESS==TRUE DO IR_STOPM()
    INTERRUPT ON 3 
    BAS(#INITMOV, 0)
  ; ENDFOLD (BASISTECH EXT)
; ENDFOLD (INI)

; FOLD PTP HOME Vel=100 % DEFAULT
  $BWDSTART=FALSE
  PDAT_ACT=PDEFAULT
  FDAT_ACT=FHOME
  BAS(#PTP_DAT)
  PTP XHOME
; ENDFOLD

$ADVANCE = 3
$OV_PRO = 100

; MAIN AUTOMATION CYCLE
FOR LayerIdx = 1 TO 5
  ; Approach Box Pick
  PTP xPickApproach C_PTP
  LIN xBoxPick Vel=0.5 m/s
  
  ; Tool Activation
  $OUT[12] = TRUE
  WAIT FOR $IN[12] == TRUE
  
  ; Transport to Pallet
  LIN xPickRetract
  PTP xPalletApproach C_PTP
  LIN xPalletPlace
  
  $OUT[12] = FALSE
  WAIT SEC 0.2
ENDFOR

; Return Home
PTP XHOME
END
`,
  'PalletizingCell.dat': `&ACCESS RVP
&REL 1
DEFDAT PalletizingCell
; FOLD GLOBAL CONSTANTS
  GLOBAL CONST INT MAX_LAYERS = 5
; ENDFOLD

; FOLD POINTS & FRAMES
  DECL E6POS xPickApproach={X 1250.0, Y 300.0, Z 850.0, A 0.0, B 90.0, C 0.0, S 2, T 35}
  DECL E6POS xBoxPick={X 1250.0, Y 300.0, Z 450.0, A 0.0, B 90.0, C 0.0, S 2, T 35}
  DECL E6POS xPickRetract={X 1250.0, Y 300.0, Z 850.0, A 0.0, B 90.0, C 0.0, S 2, T 35}
  DECL E6POS xPalletApproach={X 800.0, Y -600.0, Z 900.0, A -45.0, B 90.0, C 0.0, S 2, T 35}
  DECL E6POS xPalletPlace={X 800.0, Y -600.0, Z 300.0, A -45.0, B 90.0, C 0.0, S 2, T 35}
; ENDFOLD
ENDDAT
`,
  'WeldingFault.src': `&ACCESS RVP
DEF WeldingFault()
; FOLD INI
  BAS(#INITMOV, 0)
; FOLD HAZARD_UNCLOSED_FOLD ; <-- MISSING ENDFOLD!

PTP XHOME
$ADVANCE = 0 ; <-- Advance run killed!

HALT ; <-- Unconditional stop in production program!

IF $IN[1] == TRUE THEN
  LIN xWeldPoint
; MISSING ENDIF!

PTP XHOME
END
`
}

const projectFiles = ref([
  { name: 'PalletizingCell.src', hasErrors: false },
  { name: 'PalletizingCell.dat', hasErrors: false },
  { name: 'WeldingFault.src', hasErrors: true }
])

const currentLines = computed(() => {
  const content = fileBuffers[activeFileName.value] || fileBuffers['PalletizingCell.src']
  const rawLines = content.split('\n')
  return rawLines.map((text, idx) => {
    const num = idx + 1
    const isError = activeFileName.value === 'WeldingFault.src' && (num === 5 || num === 8 || num === 10 || num === 14)
    let errorMsg = ''
    if (num === 5) errorMsg = '[foldBalance] Unclosed FOLD: HAZARD_UNCLOSED_FOLD'
    if (num === 8) errorMsg = '[advanceRun] $ADVANCE=0 eliminates continuous trajectory'
    if (num === 10) errorMsg = '[dangerousStatements] HALT stops robot automatic mode'
    if (num === 14) errorMsg = '[blockNesting] Unclosed IF statement (missing ENDIF)'

    let inlayHint = ''
    if (text.includes('PTP XHOME')) inlayHint = 'Tool: 1, Base: 0'
    if (text.includes('xBoxPick')) inlayHint = 'Z: 450.0mm'

    return {
      num,
      text,
      isFoldStart: text.trim().startsWith('; FOLD') || text.trim().startsWith(';FOLD'),
      hasError: isError,
      errorMsg,
      inlayHint
    }
  })
})

const activeFileErrors = computed(() => {
  if (activeFileName.value !== 'WeldingFault.src') return []
  return [
    { line: 5, rule: 'foldBalance', msg: 'Missing matching ; ENDFOLD for inline form FOLD' },
    { line: 8, rule: 'advanceRun', msg: '$ADVANCE pointer zeroed; robot stops at each point' },
    { line: 10, rule: 'dangerousStatements', msg: 'HALT instruction in production routine' },
    { line: 14, rule: 'blockNesting', msg: 'Unclosed IF condition before END' }
  ]
})

function highlightKrlLine(line) {
  if (!line) return '&nbsp;'
  let html = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments
  if (html.trim().startsWith(';')) {
    return `<span class="text-[#6A9955] italic">${html}</span>`
  }

  // Keywords
  const keywords = ['DEF', 'END', 'DEFDAT', 'ENDDAT', 'GLOBAL', 'DECL', 'CONST', 'IF', 'THEN', 'ELSE', 'ENDIF', 'FOR', 'TO', 'ENDFOR', 'LOOP', 'ENDLOOP', 'WHILE', 'ENDWHILE', 'WAIT', 'SEC', 'FOR', 'HALT', 'INTERRUPT', 'ON', 'OFF', 'WHEN', 'DO']
  keywords.forEach(kw => {
    const re = new RegExp(`\\b(${kw})\\b`, 'g')
    html = html.replace(re, '<span class="text-[#C586C0] font-bold">$1</span>')
  })

  // Motions
  const motions = ['PTP', 'LIN', 'CIRC', 'SPL', 'PTP_REL', 'LIN_REL']
  motions.forEach(m => {
    const re = new RegExp(`\\b(${m})\\b`, 'g')
    html = html.replace(re, '<span class="text-kuka-orange font-bold">$1</span>')
  })

  // System variables
  html = html.replace(/(\$[A-Z0-9_]+)/g, '<span class="text-[#4FC1FF]">$1</span>')

  // Types
  const types = ['E6POS', 'E6AXIS', 'FRAME', 'INT', 'REAL', 'BOOL', 'CHAR']
  types.forEach(t => {
    const re = new RegExp(`\\b(${t})\\b`, 'g')
    html = html.replace(re, '<span class="text-[#4EC9B0]">$1</span>')
  })

  // Numbers
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="text-[#B5CEA8]">$1</span>')

  return html
}

function openFile(f) {
  activeFileName.value = f.name
  if (!openTabs.value.find(t => t.name === f.name)) {
    openTabs.value.push({ name: f.name, isDirty: false })
  }
}

function closeTab(name) {
  openTabs.value = openTabs.value.filter(t => t.name !== name)
  if (activeFileName.value === name && openTabs.value.length > 0) {
    activeFileName.value = openTabs.value[0].name
  }
}

function togglePanel() {
  bottomPanelOpen.value = !bottomPanelOpen.value
}

function toggleFold(lineNum) {
  // Visual fold feedback
}

const commands = [
  { id: 'validate', name: 'KRL: Validate Workspace (Check All Files)', desc: 'Full AST syntax check against KSS 8.7 specs', shortcut: 'Ctrl+F7' },
  { id: 'flowchart', name: 'KRL: Show Control Flow Diagram (Flowchart)', desc: 'Generates clickable SVG logic tree', shortcut: 'Alt+F' },
  { id: 'format', name: 'KRL: Format Document & Align Declarations', desc: 'Applies official 3-space KUKA indentation', shortcut: 'Shift+Alt+F' },
  { id: 'diff', name: 'KRL: Compare KRC Backup (.zip Diff)', desc: 'Detects night-shift touch-up point deltas', shortcut: 'PRO' },
  { id: 'calc', name: 'KRL: Compute 3-Point Base/Tool Frame Math', desc: 'Euler angles calibration matrix', shortcut: 'PRO' },
  { id: 'clean', name: 'KRL: Clean Git WorkVisual Headers', desc: 'Strips proprietary binaries for clean Git commits', shortcut: 'Ctrl+K' }
]

const quickTools = [
  { id: 'validate', name: 'AST Diagnostics', desc: '41 Industrial safety rules' },
  { id: 'flowchart', name: 'Interactive Flowchart', desc: 'Visual logic graph' },
  { id: 'diff', name: 'Backup Delta Diff', desc: '6-axis ΔX, ΔY coordinate math' },
  { id: 'format', name: 'Code Formatter', desc: 'Authentic 3-space indentation' }
]

const filteredCommands = computed(() => {
  if (!paletteQuery.value) return commands
  const q = paletteQuery.value.toLowerCase()
  return commands.filter(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
})

function openCommandPalette() {
  commandPaletteOpen.value = true
  paletteQuery.value = ''
  nextTick(() => {
    paletteInput.value?.focus()
  })
}

function runCommand(cmd) {
  commandPaletteOpen.value = false
  if (cmd.id === 'validate') {
    bottomPanelOpen.value = true
    panelTab.value = 'problems'
  } else if (cmd.id === 'flowchart') {
    bottomPanelOpen.value = true
    panelTab.value = 'flowchart'
  }
}

function executeTool(tool) {
  if (tool.id === 'validate') {
    bottomPanelOpen.value = true
    panelTab.value = 'problems'
  } else if (tool.id === 'flowchart') {
    bottomPanelOpen.value = true
    panelTab.value = 'flowchart'
  }
}
</script>

<style scoped>
/* VS Code Scrollbars */
div::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
div::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
div::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
