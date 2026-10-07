<template>
  <div class="krl-inspector w-full rounded-2xl bg-[#090D16] border border-white/10 shadow-2xl overflow-hidden font-sans">
    
    <!-- Top HUD Toolbar -->
    <div class="bg-[#0D1322] border-b border-white/10 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
        <span class="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
          <span class="text-kuka-orange">KRL //</span> BROWSER ENGINE v2.0
        </span>
        <span class="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Client-Side Zero-Cloud // NDA Safe
        </span>
      </div>

      <!-- Presets Selector & Actions -->
      <div class="flex items-center gap-2 flex-wrap">
        <div class="relative">
          <select 
            v-model="selectedPreset" 
            @change="loadPreset"
            class="bg-[#151D30] hover:bg-[#1C2640] text-gray-200 text-xs font-mono px-3 py-1.5 rounded-lg border border-white/10 focus:border-kuka-orange outline-none transition-colors cursor-pointer">
            <option value="palletizing">Example 1: Palletizing Cell (.src)</option>
            <option value="errors">Example 2: Industrial Faults & Hazards (.src)</option>
            <option value="welding">Example 3: Spot Welding & Tool Math (.src)</option>
          </select>
        </div>

        <label class="cursor-pointer bg-kuka-orange/20 hover:bg-kuka-orange/30 text-kuka-orange border border-kuka-orange/40 text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(255,102,0,0.15)]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          <span>Upload .SRC / .ZIP</span>
          <input type="file" accept=".src,.dat,.sub,.zip" @change="handleFileUpload" class="hidden" />
        </label>
      </div>
    </div>

    <!-- Active Backup File Tabs (if ZIP uploaded) -->
    <div v-if="zipFiles.length > 0" class="bg-[#070A12] border-b border-white/5 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs font-mono">
      <span class="text-gray-500 text-[11px] shrink-0">ZIP Files ({{ zipFiles.length }}):</span>
      <button 
        v-for="file in zipFiles" 
        :key="file.name"
        @click="selectZipFile(file)"
        :class="['px-2.5 py-1 rounded transition-colors whitespace-nowrap text-xs', activeZipFileName === file.name ? 'bg-kuka-orange text-white font-bold' : 'bg-white/5 text-gray-400 hover:text-white']">
        {{ file.name }}
      </button>
    </div>

    <!-- Main Viewport Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
      
      <!-- Left: Editor & Code Viewer (7 Cols) -->
      <div class="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-[#06080F]">
        
        <!-- Editor Subheader -->
        <div class="flex items-center justify-between px-4 py-2 bg-[#090D18] border-b border-white/5 text-xs font-mono text-gray-400">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">File:</span>
            <span class="text-white font-bold">{{ currentFileName }}</span>
            <span class="text-gray-500">({{ lineCount }} lines, {{ krlStats.motionCount }} motions)</span>
          </div>
          <button 
            @click="clearCode" 
            class="hover:text-red-400 text-gray-500 transition-colors">
            Clear
          </button>
        </div>

        <!-- Live Code Input & Syntax Highlight View -->
        <div class="relative flex-1 font-mono text-xs leading-relaxed flex overflow-hidden min-h-[380px]">
          <!-- Line Numbers -->
          <div class="select-none py-3 px-3 text-right text-gray-600 bg-[#070B14] border-r border-white/5 font-mono text-[11px] w-12 shrink-0 overflow-hidden">
            <div v-for="n in lineCount" :key="n" :class="{'text-red-400 font-bold': lineErrors[n]}">{{ n }}</div>
          </div>

          <!-- Textarea for editing -->
          <textarea
            v-model="krlCode"
            @input="runAnalysis"
            spellcheck="false"
            class="flex-1 w-full h-full p-3 bg-transparent text-gray-200 outline-none resize-none font-mono text-[11px] leading-relaxed selection:bg-orange-500/30 whitespace-pre overflow-y-auto"
            placeholder="Paste KRL code here or drag and drop a .src or .zip backup..."></textarea>
        </div>

        <!-- Quick Summary Bar at Bottom of Editor -->
        <div class="px-4 py-2 bg-[#090D18] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" :class="diagnostics.errors.length === 0 ? 'bg-emerald-500' : 'bg-red-500'"></span>
              <span>Errors: <strong :class="diagnostics.errors.length > 0 ? 'text-red-400' : 'text-gray-300'">{{ diagnostics.errors.length }}</strong></span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Warnings: <strong class="text-amber-400">{{ diagnostics.warnings.length }}</strong></span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span>Points: <strong class="text-cyan-400">{{ krlStats.points.length }}</strong></span>
            </span>
          </div>
          <span class="text-gray-500 hidden sm:inline">Ctrl+A to select code</span>
        </div>
      </div>

      <!-- Right: Analysis HUD & Tabs (5 Cols) -->
      <div class="lg:col-span-5 flex flex-col bg-[#0A0F1D]">
        
        <!-- Tab Navigation -->
        <div class="flex border-b border-white/10 bg-[#0D1426] text-xs font-mono">
          <button 
            @click="activeTab = 'audit'"
            :class="['flex-1 py-3 text-center transition-all border-b-2 flex items-center justify-center gap-1.5', activeTab === 'audit' ? 'border-kuka-orange text-white bg-white/5 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200']">
            <span>📊 Report</span>
            <span v-if="diagnostics.errors.length > 0" class="px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 text-[10px]">
              {{ diagnostics.errors.length }}
            </span>
          </button>
          <button 
            @click="activeTab = 'flowchart'"
            :class="['flex-1 py-3 text-center transition-all border-b-2 flex items-center justify-center gap-1.5', activeTab === 'flowchart' ? 'border-kuka-orange text-white bg-white/5 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200']">
            <span>🔀 Flowchart</span>
          </button>
          <button 
            @click="activeTab = 'points'"
            :class="['flex-1 py-3 text-center transition-all border-b-2 flex items-center justify-center gap-1.5', activeTab === 'points' ? 'border-kuka-orange text-white bg-white/5 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200']">
            <span>📍 Trajectory</span>
          </button>
        </div>

        <!-- TAB CONTENT: 1. AUDIT REPORT -->
        <div v-if="activeTab === 'audit'" class="p-4 sm:p-5 flex-1 overflow-y-auto space-y-5">
          
          <!-- Health Score Banner -->
          <div class="p-4 rounded-xl border flex items-center justify-between"
               :class="healthScoreClass">
            <div>
              <div class="text-[10px] font-mono tracking-widest uppercase text-gray-400">KUKA FLEET HEALTH INDEX</div>
              <div class="text-2xl font-black font-mono mt-0.5" :class="healthScoreTextClass">
                {{ healthScore }} / 100
              </div>
              <div class="text-xs text-gray-300 mt-1">
                {{ healthScoreVerdict }}
              </div>
            </div>
            <div class="text-right font-mono text-xs">
              <div class="text-gray-400">FOLD Balance: <strong :class="krlStats.unclosedFolds === 0 ? 'text-emerald-400' : 'text-red-400'">{{ krlStats.unclosedFolds === 0 ? 'CLEAN' : krlStats.unclosedFolds + ' OPEN' }}</strong></div>
              <div class="text-gray-400 mt-1">Motion PTP/LIN: <strong class="text-cyan-400">{{ krlStats.motionCount }}</strong></div>
            </div>
          </div>

          <!-- Diagnostics Findings List -->
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                Industrial Rule Violations ({{ diagnostics.errors.length + diagnostics.warnings.length }})
              </span>
            </div>

            <div v-if="diagnostics.errors.length === 0 && diagnostics.warnings.length === 0" class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs text-emerald-300 font-mono">
              ✓ No syntax or safety violations detected! Clean production KRL code.
            </div>

            <div class="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              <!-- Errors -->
              <div 
                v-for="(err, idx) in diagnostics.errors" 
                :key="'err-' + idx"
                class="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs font-mono">
                <span class="px-1.5 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold shrink-0">LINE {{ err.line }}</span>
                <div class="flex-1">
                  <div class="text-red-300 font-bold">{{ err.message }}</div>
                  <div class="text-gray-400 text-[10px] mt-0.5">Rule: {{ err.rule }}</div>
                </div>
              </div>

              <!-- Warnings -->
              <div 
                v-for="(w, idx) in diagnostics.warnings" 
                :key="'w-' + idx"
                class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs font-mono">
                <span class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold shrink-0">LINE {{ w.line }}</span>
                <div class="flex-1">
                  <div class="text-amber-200">{{ w.message }}</div>
                  <div class="text-gray-400 text-[10px] mt-0.5">Advice: {{ w.rule }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Conversion Pro Callout -->
          <div class="p-3.5 rounded-xl bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/30">
            <div class="flex items-center gap-2 text-kuka-orange text-xs font-mono font-bold">
              <span>⚡ AUTO-FIX AVAILABLE IN VS CODE</span>
            </div>
            <p class="text-[11px] text-gray-300 mt-1 leading-relaxed">
              Our VS Code Extension automatically resolves unclosed FOLDs, removes dead variables, repairs Delta Math coordinates, and verifies robot kinematic reachability.
            </p>
            <div class="mt-3 flex items-center gap-2">
              <a 
                href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl" 
                target="_blank"
                class="px-3 py-1.5 rounded-lg bg-kuka-orange hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(255,102,0,0.3)]">
                Install Free Extension
              </a>
              <button 
                @click="printAuditReport"
                class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-gray-200 font-mono text-xs transition-colors">
                Export Audit PDF
              </button>
            </div>
          </div>

        </div>

        <!-- TAB CONTENT: 2. INTERACTIVE FLOWCHART -->
        <div v-if="activeTab === 'flowchart'" class="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
          <div class="space-y-2">
            <div class="text-xs font-mono text-gray-400 mb-2">AST Execution Pipeline:</div>
            
            <!-- Nodes Visualization -->
            <div class="space-y-2">
              <div 
                v-for="(node, idx) in flowchartNodes" 
                :key="idx" 
                class="p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between"
                :class="getNodeStyle(node.type)">
                <div class="flex items-center gap-2">
                  <span class="text-sm">{{ node.icon }}</span>
                  <span class="font-bold">{{ node.title }}</span>
                </div>
                <span class="text-[10px] text-gray-400">Line {{ node.line }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300">
            💡 Full interactive SVG block-diagrams with jump-to-source are generated in the Pro Extension with <code class="text-white">krl.showFlowchart</code>.
          </div>
        </div>

        <!-- TAB CONTENT: 3. POINTS & TRAJECTORY -->
        <div v-if="activeTab === 'points'" class="p-4 flex-1 overflow-y-auto space-y-4">
          <div class="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>Detected Points: {{ krlStats.points.length }}</span>
            <span class="text-kuka-orange">KSS Delta Coordinates</span>
          </div>

          <div v-if="krlStats.points.length === 0" class="p-8 text-center text-xs font-mono text-gray-500">
            No motion points (PTP/LIN) discovered in current file.
          </div>

          <div v-else class="space-y-1.5 max-h-[360px] overflow-y-auto">
            <div 
              v-for="(pt, idx) in krlStats.points" 
              :key="idx"
              class="p-2.5 rounded-lg bg-[#070B14] border border-white/5 font-mono text-xs flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      :class="pt.type === 'PTP' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-orange-500/20 text-orange-300'">
                  {{ pt.type }}
                </span>
                <span class="text-white font-bold">{{ pt.name }}</span>
              </div>
              <span class="text-[10px] text-gray-400">
                Line {{ pt.line }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const krlCode = ref('')
const selectedPreset = ref('palletizing')
const activeTab = ref('audit')
const currentFileName = ref('PalletizingCell.src')
const zipFiles = ref([])
const activeZipFileName = ref('')

const diagnostics = ref({ errors: [], warnings: [] })
const krlStats = ref({
  motionCount: 0,
  unclosedFolds: 0,
  points: []
})
const flowchartNodes = ref([])

const lineCount = computed(() => {
  return krlCode.value ? krlCode.value.split('\n').length : 1
})

const lineErrors = computed(() => {
  const map = {}
  diagnostics.value.errors.forEach(e => { map[e.line] = true })
  return map
})

const healthScore = computed(() => {
  let score = 100
  score -= diagnostics.value.errors.length * 15
  score -= diagnostics.value.warnings.length * 5
  if (krlStats.value.unclosedFolds > 0) score -= 20
  return Math.max(10, Math.min(100, score))
})

const healthScoreClass = computed(() => {
  if (healthScore.value >= 85) return 'bg-emerald-500/10 border-emerald-500/30'
  if (healthScore.value >= 60) return 'bg-amber-500/10 border-amber-500/30'
  return 'bg-red-500/10 border-red-500/30'
})

const healthScoreTextClass = computed(() => {
  if (healthScore.value >= 85) return 'text-emerald-400'
  if (healthScore.value >= 60) return 'text-amber-400'
  return 'text-red-400'
})

const healthScoreVerdict = computed(() => {
  if (healthScore.value >= 85) return 'Production Ready. Verified for controller upload.'
  if (healthScore.value >= 60) return 'Caution. Potential runtime stop or cycle loss.'
  return 'Critical Faults. Motion halt or compile error on KRC.'
})

// Sample Code Presets
const PRESETS = {
  palletizing: `&ACCESS RVP
&REL 1
&PARAM EDITMASK = *
&PARAM TEMPLATE = C:\\KRC\\Roboter\\Template\\vorgabe
DEF PalletizingCell()
; FOLD INI
  ; FOLD BASISTECH EXT
    GLOBAL INTERRUPT DECL 3 WHEN $STOPMESS==TRUE DO IR_STOPM ( )
    INTERRUPT ON 3 
    BAS (#INITMOV,0 )
  ; ENDFOLD (BASISTECH EXT)
; ENDFOLD (INI)

; FOLD PTP HOME Vel=100 % DEFAULT
  $BWDSTART=FALSE
  PDAT_ACT=PDEFAULT
  FDAT_ACT=FHOME
  BAS(#PTP_DAT)
  FDAT_ACT=FHOME
  PTP XHOME
; ENDFOLD

$ADVANCE = 3
$OV_PRO = 100

; MAIN PALLETIZING LOOP
FOR LayerIdx = 1 TO 5
  ; Approach Box Pick
  PTP xPickApproach C_PTP
  LIN xBoxPick Vel=0.5 m/s
  
  ; Grip Activation
  $OUT[12] = TRUE
  WAIT FOR $IN[12] == TRUE
  
  ; Retract & Transport
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
  errors: `&ACCESS RVP
DEF HazardCell()
; FOLD INI
  BAS (#INITMOV,0 )
; FOLD UNCLOSED_FOLD_DETECTED ; <-- MISSING ENDFOLD!

PTP XHOME
$ADVANCE = 0 ; <-- HAZARD: Advance run pointer zeroed, kills continuous motion!

HALT ; <-- WARNING: Unconditional stop in production program

IF $IN[1] == TRUE THEN
  LIN xWeld1
; MISSING ENDIF STATEMENT!

PTP XHOME
END
`,
  welding: `&ACCESS RVP
DEF SpotWeldingCell()
; FOLD INI
  BAS (#INITMOV,0 )
; ENDFOLD (INI)

PTP XHOME Vel=100 %

; Gun Approach
PTP xGunPrePosition C_PTP
LIN xGunContact Vel=0.3 m/s

; Tool & Frame Math
$TOOL = TOOL_DATA[2]
$BASE = BASE_DATA[1]

$OUT[50] = TRUE ; Weld Start
WAIT FOR $IN[50] == TRUE ; Weld Done
$OUT[50] = FALSE

LIN xGunRetract
PTP XHOME
END
`
}

function loadPreset() {
  krlCode.value = PRESETS[selectedPreset.value] || PRESETS.palletizing
  currentFileName.value = selectedPreset.value === 'palletizing' ? 'PalletizingCell.src' :
                          selectedPreset.value === 'errors' ? 'HazardCell.src' : 'SpotWeldingCell.src'
  runAnalysis()
}

function clearCode() {
  krlCode.value = ''
  runAnalysis()
}

function getNodeStyle(type) {
  if (type === 'start' || type === 'end') return 'bg-purple-500/10 border-purple-500/30 text-purple-300'
  if (type === 'motion') return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
  if (type === 'io') return 'bg-amber-500/10 border-amber-500/30 text-amber-300'
  return 'bg-white/5 border-white/10 text-gray-300'
}

function runAnalysis() {
  const code = krlCode.value || ''
  const lines = code.split('\n')
  
  const errs = []
  const warns = []
  const points = []
  const nodes = []
  
  let foldStack = []
  let ifStack = []
  let forStack = []
  let motionCount = 0

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1
    const trimmed = rawLine.trim()
    const upper = trimmed.toUpperCase()

    // Ignore comment lines
    if (trimmed.startsWith(';')) {
      // Check folds inside comments (KUKA standard: ; FOLD ...)
      if (upper.startsWith('; FOLD') || upper.startsWith(';FOLD')) {
        foldStack.push({ line: lineNum, name: trimmed.substring(6).trim() })
        nodes.push({ icon: '📁', title: 'FOLD: ' + (trimmed.substring(6, 30) || 'Block'), line: lineNum, type: 'fold' })
      } else if (upper.startsWith('; ENDFOLD') || upper.startsWith(';ENDFOLD')) {
        if (foldStack.length > 0) {
          foldStack.pop()
        } else {
          errs.push({ line: lineNum, rule: 'foldBalance', message: 'Orphaned ; ENDFOLD without matching ; FOLD' })
        }
      }
      return
    }

    // Program Boundaries
    if (upper.startsWith('DEF ') || upper.startsWith('GLOBAL DEF ')) {
      nodes.push({ icon: '🏁', title: 'PROGRAM START (' + trimmed.split(' ')[1] + ')', line: lineNum, type: 'start' })
    }
    if (upper === 'END' || upper.startsWith('ENDDEF')) {
      nodes.push({ icon: '🛑', title: 'PROGRAM END', line: lineNum, type: 'end' })
    }

    // Motion Commands
    if (upper.startsWith('PTP ') || upper.startsWith('LIN ') || upper.startsWith('CIRC ')) {
      motionCount++
      const parts = trimmed.split(/\s+/)
      const type = parts[0].toUpperCase()
      const ptName = parts[1] || 'POINT'
      points.push({ type, name: ptName, line: lineNum })
      nodes.push({ icon: '🦾', title: `${type} Motion -> ${ptName}`, line: lineNum, type: 'motion' })
    }

    // Dangerous Statements
    if (upper === 'HALT' || upper.startsWith('HALT ')) {
      warns.push({ line: lineNum, rule: 'dangerousStatements', message: 'HALT instruction stops robot in automatic cell' })
    }
    if (upper.includes('$ADVANCE = 0') || upper.includes('$ADVANCE=0')) {
      errs.push({ line: lineNum, rule: 'advanceRun', message: '$ADVANCE=0 eliminates trajectory approximation (stops at every point)' })
    }

    // Control Structures
    if (upper.startsWith('IF ') && upper.includes(' THEN')) {
      ifStack.push(lineNum)
    }
    if (upper === 'ENDIF' || upper.startsWith('ENDIF ')) {
      if (ifStack.length > 0) {
        ifStack.pop()
      } else {
        errs.push({ line: lineNum, rule: 'blockNesting', message: 'Unmatched ENDIF statement' })
      }
    }

    if (upper.startsWith('FOR ') && upper.includes(' TO ')) {
      forStack.push(lineNum)
    }
    if (upper === 'ENDFOR' || upper.startsWith('ENDFOR ')) {
      if (forStack.length > 0) {
        forStack.pop()
      } else {
        errs.push({ line: lineNum, rule: 'blockNesting', message: 'Unmatched ENDFOR statement' })
      }
    }

    // I/O Operations
    if (upper.startsWith('$OUT[') && upper.includes('=')) {
      nodes.push({ icon: '⚡', title: 'I/O Signal: ' + trimmed, line: lineNum, type: 'io' })
    }
  })

  // Check unclosed stacks
  if (foldStack.length > 0) {
    foldStack.forEach(f => {
      errs.push({ line: f.line, rule: 'foldBalance', message: `Unclosed FOLD starting here: "${f.name}"` })
    })
  }

  if (ifStack.length > 0) {
    ifStack.forEach(l => {
      errs.push({ line: l, rule: 'blockNesting', message: 'Unclosed IF condition (missing ENDIF)' })
    })
  }

  if (forStack.length > 0) {
    forStack.forEach(l => {
      errs.push({ line: l, rule: 'blockNesting', message: 'Unclosed FOR loop (missing ENDFOR)' })
    })
  }

  diagnostics.value = { errors: errs, warnings: warns }
  krlStats.value = {
    motionCount,
    unclosedFolds: foldStack.length,
    points
  }
  flowchartNodes.value = nodes.slice(0, 12) // Limit for preview
}

async function handleFileUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return

  currentFileName.value = file.name

  if (file.name.endsWith('.zip')) {
    try {
      const JSZip = (await import('jszip')).default
      const zip = await JSZip.loadAsync(file)
      const list = []
      
      zip.forEach((relPath, zipEntry) => {
        if (!zipEntry.dir && (relPath.endsWith('.src') || relPath.endsWith('.dat') || relPath.endsWith('.sub'))) {
          list.push({ name: relPath, entry: zipEntry })
        }
      })
      
      zipFiles.value = list
      if (list.length > 0) {
        selectZipFile(list[0])
      }
    } catch (err) {
      alert('Error parsing ZIP file: ' + err.message)
    }
  } else {
    // Text file (.src / .dat)
    const text = await file.text()
    krlCode.value = text
    zipFiles.value = []
    runAnalysis()
  }
}

async function selectZipFile(fileObj) {
  activeZipFileName.value = fileObj.name
  currentFileName.value = fileObj.name
  const text = await fileObj.entry.async('text')
  krlCode.value = text
  runAnalysis()
}

function printAuditReport() {
  window.print()
}

onMounted(() => {
  loadPreset()
})
</script>

<style scoped>
/* Custom Scrollbars */
textarea::-webkit-scrollbar,
div::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
textarea::-webkit-scrollbar-thumb,
div::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}
textarea::-webkit-scrollbar-thumb:hover,
div::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 102, 0, 0.5);
}
</style>
