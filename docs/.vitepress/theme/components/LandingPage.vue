<template>
  <div
    :class="[
      'kuka-landing min-h-dvh transition-colors duration-200 selection:bg-[#FF5E00] selection:text-white',
      isDark ? 'bg-[#0D0F12] text-[#E6E8EC]' : 'bg-[#F8F9FB] text-[#111827]'
    ]"
  >
    <a
      href="#main-content"
      class="visually-hidden fixed left-4 top-4 z-50 rounded-md bg-[#D94A00] px-4 py-2 text-sm font-medium text-white shadow-sm"
    >
      {{ t.skipToContent }}
    </a>

    <!-- Sticky Header (64px) -->
    <header
      :class="[
        'sticky top-0 z-40 border-b backdrop-blur-md transition-colors',
        isDark
          ? 'border-white/[0.08] bg-[#0D0F12]/85'
          : 'border-slate-900/10 bg-[#F8F9FB]/90'
      ]"
    >
      <div class="mx-auto flex min-h-[4rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <!-- Brand -->
        <a :href="withBase(localePath)" class="flex shrink-0 items-center gap-3">
          <img
            :src="withBase(isDark ? '/logo-dark.svg' : '/logo-light.svg')"
            alt="LiskinLabs"
            width="28"
            height="28"
            class="h-7 w-7 object-contain"
          />
          <div class="flex flex-col leading-tight">
            <span class="text-sm font-semibold tracking-tight">LiskinLabs</span>
            <span :class="['text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.header.brandSubtitle }}
            </span>
          </div>
        </a>

        <!-- Center Navigation (5 items max) -->
        <nav :aria-label="t.header.navAriaLabel" class="hidden items-center gap-6 text-sm lg:flex">
          <a
            href="#workflows"
            :class="['transition-colors hover:text-[#FF7A2F]', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']"
          >
            {{ t.header.navItems.workflows }}
          </a>
          <a
            href="#comparison"
            :class="['transition-colors hover:text-[#FF7A2F]', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']"
          >
            {{ t.header.navItems.comparison }}
          </a>
          <a
            href="#pricing"
            :class="['transition-colors hover:text-[#FF7A2F]', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']"
          >
            {{ t.header.navItems.pricing }}
          </a>
          <a
            href="#security"
            :class="['transition-colors hover:text-[#FF7A2F]', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']"
          >
            {{ t.header.navItems.security }}
          </a>
          <a
            :href="withBase(t.header.docsLink)"
            :class="['transition-colors hover:text-[#FF7A2F]', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']"
          >
            {{ t.header.navItems.docs }}
          </a>
        </nav>

        <!-- Right Controls: Language Dropdown, Theme Toggle, Install CTA -->
        <div class="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <!-- Compact Language Dropdown -->
          <div ref="langMenuRef" class="relative">
            <button
              type="button"
              :aria-label="t.header.langButtonAria"
              :aria-expanded="langMenuOpen ? 'true' : 'false'"
              aria-haspopup="listbox"
              @click="langMenuOpen = !langMenuOpen"
              :class="[
                'inline-flex min-h-[36px] items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
                isDark
                  ? 'border-white/20 bg-[#13161B] text-[#E6E8EC] hover:border-white/35'
                  : 'border-slate-900/20 bg-white text-[#111827] hover:border-slate-900/35'
              ]"
            >
              <span>{{ t.label }}</span>
              <svg class="h-3.5 w-3.5 opacity-75" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <div
              v-if="langMenuOpen"
              role="listbox"
              :aria-label="t.header.langButtonAria"
              :class="[
                'absolute right-0 mt-1.5 w-36 rounded-lg border p-1 shadow-lg',
                isDark
                  ? 'border-white/15 bg-[#13161B] text-[#E6E8EC]'
                  : 'border-slate-900/15 bg-white text-[#111827]'
              ]"
            >
              <a
                v-for="item in languageOptions"
                :key="item.code"
                :href="withBase(item.path)"
                role="option"
                :aria-selected="item.code === currentLang ? 'true' : 'false'"
                @click="langMenuOpen = false"
                :class="[
                  'flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors',
                  item.code === currentLang
                    ? (isDark ? 'bg-white/10 font-semibold text-[#FF7A2F]' : 'bg-slate-100 font-semibold text-[#C2410C]')
                    : (isDark ? 'text-[#CBD2DC] hover:bg-white/5' : 'text-[#374151] hover:bg-slate-100')
                ]"
              >
                <span>{{ item.nativeName }}</span>
                <span class="font-mono text-xs opacity-70">{{ item.code.toUpperCase() }}</span>
              </a>
            </div>
          </div>

          <!-- 2-State Theme Toggle -->
          <button
            type="button"
            @click="toggleTheme"
            :aria-label="isDark ? t.header.themeToggleToLight : t.header.themeToggleToDark"
            :class="[
              'inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md border p-2 transition-colors',
              isDark
                ? 'border-white/20 bg-[#13161B] text-[#E6E8EC] hover:border-white/35'
                : 'border-slate-900/20 bg-white text-[#111827] hover:border-slate-900/35'
            ]"
          >
            <svg
              v-if="isDark"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
            </svg>
            <svg
              v-else
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          <!-- Primary Header CTA -->
          <a
            href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden min-h-[36px] items-center rounded-md bg-[#D94A00] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#B83E00] sm:inline-flex"
          >
            {{ t.header.ctaInstall }}
          </a>

          <!-- Mobile Navigation Toggle -->
          <button
            type="button"
            @click="mobileMenuOpen = !mobileMenuOpen"
            :aria-label="mobileMenuOpen ? t.header.mobileMenuCloseAria : t.header.mobileMenuOpenAria"
            :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
            :class="[
              'inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md border p-2 lg:hidden',
              isDark
                ? 'border-white/20 bg-[#13161B] text-[#E6E8EC]'
                : 'border-slate-900/20 bg-white text-[#111827]'
            ]"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path v-if="!mobileMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <nav
        v-if="mobileMenuOpen"
        :aria-label="t.header.navAriaLabel"
        :class="[
          'border-t px-4 py-4 lg:hidden',
          isDark ? 'border-white/[0.08] bg-[#0D0F12]' : 'border-slate-900/10 bg-[#F8F9FB]'
        ]"
      >
        <div class="flex flex-col gap-2 text-sm">
          <a @click="mobileMenuOpen = false" href="#workflows" class="rounded-md px-3 py-2 hover:text-[#FF7A2F]">
            {{ t.header.navItems.workflows }}
          </a>
          <a @click="mobileMenuOpen = false" href="#comparison" class="rounded-md px-3 py-2 hover:text-[#FF7A2F]">
            {{ t.header.navItems.comparison }}
          </a>
          <a @click="mobileMenuOpen = false" href="#pricing" class="rounded-md px-3 py-2 hover:text-[#FF7A2F]">
            {{ t.header.navItems.pricing }}
          </a>
          <a @click="mobileMenuOpen = false" href="#security" class="rounded-md px-3 py-2 hover:text-[#FF7A2F]">
            {{ t.header.navItems.security }}
          </a>
          <a @click="mobileMenuOpen = false" :href="withBase(t.header.docsLink)" class="rounded-md px-3 py-2 hover:text-[#FF7A2F]">
            {{ t.header.navItems.docs }}
          </a>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 inline-flex min-h-[40px] items-center justify-center rounded-md bg-[#D94A00] px-4 py-2 text-sm font-semibold text-white"
          >
            {{ t.header.ctaInstall }}
          </a>
        </div>
      </nav>
    </header>

    <main id="main-content" tabindex="-1" class="mx-auto max-w-6xl px-4 sm:px-6">
      <!-- SECTION 1: HERO -->
      <section id="hero" class="py-16 lg:py-24">
        <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <!-- Copy Column -->
          <div class="space-y-6 lg:col-span-6">
            <p :class="['text-xs font-medium sm:text-sm', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.hero.eyebrow }}
            </p>

            <h1 class="text-[clamp(1.75rem,1.25rem+1.8vw,2.75rem)] font-bold leading-[1.15] tracking-tight">
              {{ t.hero.h1 }}
            </h1>

            <p :class="['max-w-[60ch] text-base leading-relaxed', isDark ? 'text-[#CBD2DC]' : 'text-[#374151]']">
              {{ t.hero.subtitle }}
            </p>

            <!-- Exact 2 CTAs -->
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#D94A00] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B83E00]"
              >
                <span>{{ t.hero.ctaInstall }}</span>
              </a>

              <button
                type="button"
                @click="openTrialDialog"
                :class="[
                  'inline-flex min-h-[44px] items-center rounded-md border px-5 py-2.5 text-sm font-semibold transition-colors',
                  isDark
                    ? 'border-white/20 bg-[#13161B] text-[#E6E8EC] hover:border-white/35 hover:bg-[#1A1E25]'
                    : 'border-slate-900/20 bg-white text-[#111827] hover:border-slate-900/35 hover:bg-slate-50'
                ]"
              >
                {{ t.hero.ctaTrial }}
              </button>
            </div>

            <!-- CLI Copy Snippet -->
            <div
              :class="[
                'flex max-w-xl items-center justify-between gap-3 rounded-md border px-3.5 py-2.5',
                isDark ? 'border-white/15 bg-[#13161B]' : 'border-slate-900/15 bg-white'
              ]"
            >
              <code class="truncate font-mono text-xs sm:text-sm">
                code --install-extension LiskinLabs.kuka-krl-extension
              </code>
              <button
                type="button"
                :aria-label="t.hero.copyCliAria"
                @click="copyCliInstall"
                :class="[
                  'shrink-0 rounded px-2 py-1 text-xs font-semibold transition-colors',
                  isDark ? 'text-[#FF7A2F] hover:bg-white/5' : 'text-[#C2410C] hover:bg-slate-100'
                ]"
              >
                {{ copiedCli ? t.hero.copiedLabel : t.hero.copyLabel }}
              </button>
            </div>

            <!-- Honest Fact Line -->
            <p :class="['text-xs sm:text-sm', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.hero.factsLine }}
            </p>
          </div>

          <!-- Visual Proof Column (Real VS Code GIFs + 3D Toggle) -->
          <div class="lg:col-span-6">
            <div
              :class="[
                'overflow-hidden rounded-lg border',
                isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
              ]"
            >
              <!-- View Switcher Header -->
              <div
                :class="[
                  'flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2.5',
                  isDark ? 'border-white/[0.08] bg-[#101318]' : 'border-slate-900/10 bg-[#F1F3F6]'
                ]"
              >
                <div class="inline-flex rounded-md p-0.5 text-xs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    :aria-selected="heroVisualMode === 'screenshots' ? 'true' : 'false'"
                    @click="heroVisualMode = 'screenshots'"
                    :class="[
                      'rounded-md px-3 py-1.5 font-medium transition-colors',
                      heroVisualMode === 'screenshots'
                        ? (isDark ? 'bg-[#1F242D] text-white' : 'bg-white text-[#111827] shadow-sm')
                        : (isDark ? 'text-[#9AA3B2] hover:text-white' : 'text-[#4B5563] hover:text-[#111827]')
                    ]"
                  >
                    {{ t.hero.viewModeScreenshots }}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    :aria-selected="heroVisualMode === '3d' ? 'true' : 'false'"
                    @click="heroVisualMode = '3d'"
                    :class="[
                      'rounded-md px-3 py-1.5 font-medium transition-colors',
                      heroVisualMode === '3d'
                        ? (isDark ? 'bg-[#1F242D] text-white' : 'bg-white text-[#111827] shadow-sm')
                        : (isDark ? 'text-[#9AA3B2] hover:text-white' : 'text-[#4B5563] hover:text-[#111827]')
                    ]"
                  >
                    {{ t.hero.viewMode3d }}
                  </button>
                </div>

                <div v-if="heroVisualMode === 'screenshots'" class="flex flex-wrap gap-1">
                  <button
                    v-for="(slide, idx) in t.hero.mediaSlides"
                    :key="slide.id"
                    type="button"
                    @click="activeHeroSlide = idx"
                    :class="[
                      'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                      activeHeroSlide === idx
                        ? 'bg-[#D94A00] text-white'
                        : (isDark ? 'text-[#9AA3B2] hover:bg-white/5 hover:text-white' : 'text-[#4B5563] hover:bg-slate-200/70 hover:text-[#111827]')
                    ]"
                  >
                    {{ slide.label }}
                  </button>
                </div>
              </div>

              <!-- Real VS Code GIF Showcase -->
              <div v-if="heroVisualMode === 'screenshots'" class="p-3">
                <div class="aspect-video overflow-hidden rounded-md bg-[#0A0C0F]">
                  <img
                    :src="withBase(currentHeroSlide.src)"
                    :alt="currentHeroSlide.alt"
                    fetchpriority="high"
                    class="h-full w-full object-contain"
                  />
                </div>
                <p :class="['mt-2.5 px-1 text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ currentHeroSlide.caption }}
                </p>
              </div>

              <!-- Optional 3D Trajectory Viewer -->
              <div v-else class="p-3">
                <div class="aspect-video overflow-hidden rounded-md bg-[#0A0C0F]">
                  <ClientOnly>
                    <iframe
                      ref="simIframeRef"
                      :src="withBase(simIframeSrc)"
                      :title="t.hero.simFrameTitle"
                      @load="syncSimIframe"
                      class="h-full w-full border-0"
                    ></iframe>
                  </ClientOnly>
                </div>
                <p :class="['mt-2.5 px-1 text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ t.hero.simHint }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: 3 KEY WORKFLOWS -->
      <section
        id="workflows"
        :class="['border-t py-20 lg:py-28', isDark ? 'border-white/[0.08]' : 'border-slate-900/10']"
      >
        <div class="max-w-3xl space-y-3">
          <p :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
            {{ t.workflows.eyebrow }}
          </p>
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t.workflows.heading }}
          </h2>
          <p :class="['max-w-[65ch] text-base leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
            {{ t.workflows.subtitle }}
          </p>
        </div>

        <div class="mt-14 space-y-20">
          <!-- Workflow 1: Backup Diff -->
          <article class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div class="space-y-4 lg:col-span-5">
              <span
                :class="[
                  'inline-block rounded-md border px-2.5 py-1 text-xs font-medium',
                  isDark ? 'border-white/15 bg-[#13161B] text-[#CBD2DC]' : 'border-slate-900/15 bg-white text-[#374151]'
                ]"
              >
                {{ t.workflows.w1.badge }}
              </span>
              <h3 class="text-xl font-semibold tracking-tight sm:text-2xl">
                {{ t.workflows.w1.title }}
              </h3>
              <p :class="['text-sm leading-relaxed sm:text-base', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ t.workflows.w1.body }}
              </p>
              <ul :class="['space-y-2 text-sm', isDark ? 'text-[#CBD2DC]' : 'text-[#374151]']">
                <li v-for="(bullet, i) in t.workflows.w1.bullets" :key="i" class="flex items-start gap-2.5">
                  <svg
                    class="mt-1 h-4 w-4 shrink-0 text-[#22C55E]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </div>

            <figure
              :class="[
                'overflow-hidden rounded-lg border p-3 lg:col-span-7',
                isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
              ]"
            >
              <div class="aspect-video overflow-hidden rounded-md bg-[#0A0C0F]">
                <img
                  :src="withBase(t.workflows.w1.mediaSrc)"
                  :alt="t.workflows.w1.mediaAlt"
                  loading="lazy"
                  class="h-full w-full object-contain"
                />
              </div>
              <figcaption :class="['mt-2.5 px-1 text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ t.workflows.w1.mediaCaption }}
              </figcaption>
            </figure>
          </article>

          <!-- Workflow 2: Static Audit & Diff Examples -->
          <article class="space-y-8">
            <div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <figure
                :class="[
                  'order-2 overflow-hidden rounded-lg border p-3 lg:order-1 lg:col-span-7',
                  isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
                ]"
              >
                <div class="aspect-video overflow-hidden rounded-md bg-[#0A0C0F]">
                  <img
                    :src="withBase(t.workflows.w2.mediaSrc)"
                    :alt="t.workflows.w2.mediaAlt"
                    loading="lazy"
                    class="h-full w-full object-contain"
                  />
                </div>
                <figcaption :class="['mt-2.5 px-1 text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ t.workflows.w2.mediaCaption }}
                </figcaption>
              </figure>

              <div class="order-1 space-y-4 lg:order-2 lg:col-span-5">
                <span
                  :class="[
                    'inline-block rounded-md border px-2.5 py-1 text-xs font-medium',
                    isDark ? 'border-white/15 bg-[#13161B] text-[#CBD2DC]' : 'border-slate-900/15 bg-white text-[#374151]'
                  ]"
                >
                  {{ t.workflows.w2.badge }}
                </span>
                <h3 class="text-xl font-semibold tracking-tight sm:text-2xl">
                  {{ t.workflows.w2.title }}
                </h3>
                <p :class="['text-sm leading-relaxed sm:text-base', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ t.workflows.w2.body }}
                </p>
                <ul :class="['space-y-2 text-sm', isDark ? 'text-[#CBD2DC]' : 'text-[#374151]']">
                  <li v-for="(bullet, i) in t.workflows.w2.bullets" :key="i" class="flex items-start gap-2.5">
                    <svg
                      class="mt-1 h-4 w-4 shrink-0 text-[#22C55E]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ bullet }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Before / After Technical KRL Code Card -->
            <div
              :class="[
                'rounded-lg border p-5 sm:p-6',
                isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
              ]"
            >
              <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span class="text-sm font-semibold">{{ t.workflows.w2.diffHeading }}</span>
                <div class="flex flex-wrap gap-1.5" role="tablist">
                  <button
                    v-for="(sc, idx) in t.workflows.w2.scenarios"
                    :key="sc.id"
                    type="button"
                    role="tab"
                    :aria-selected="activeDiffIdx === idx ? 'true' : 'false'"
                    @click="activeDiffIdx = idx"
                    :class="[
                      'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                      activeDiffIdx === idx
                        ? 'border-[#D94A00] bg-[#D94A00] text-white'
                        : (isDark ? 'border-white/15 bg-[#0D0F12] text-[#9AA3B2] hover:text-white' : 'border-slate-900/15 bg-[#F8F9FB] text-[#4B5563] hover:text-[#111827]')
                    ]"
                  >
                    {{ sc.tabLabel }}
                  </button>
                </div>
              </div>

              <div class="mb-4 space-y-1">
                <div class="text-sm font-semibold">{{ currentDiffScenario.issueTitle }}</div>
                <p :class="['text-sm leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ currentDiffScenario.consequence }}
                </p>
              </div>

              <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div class="overflow-hidden rounded-md border border-red-500/30 bg-[#0A0C0F]">
                  <div class="border-b border-white/10 px-3.5 py-2 font-mono text-xs text-red-400">
                    {{ currentDiffScenario.beforeLabel }}
                  </div>
                  <pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[#E6E8EC]"><code>{{ currentDiffScenario.beforeCode }}</code></pre>
                </div>

                <div class="overflow-hidden rounded-md border border-emerald-500/30 bg-[#0A0C0F]">
                  <div class="border-b border-white/10 px-3.5 py-2 font-mono text-xs text-emerald-400">
                    {{ currentDiffScenario.afterLabel }}
                  </div>
                  <pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[#E6E8EC]"><code>{{ currentDiffScenario.afterCode }}</code></pre>
                </div>
              </div>
            </div>
          </article>

          <!-- Workflow 3: .wvs, .vcmx & Live Monitor -->
          <article class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div class="space-y-4 lg:col-span-5">
              <span
                :class="[
                  'inline-block rounded-md border px-2.5 py-1 text-xs font-medium',
                  isDark ? 'border-white/15 bg-[#13161B] text-[#CBD2DC]' : 'border-slate-900/15 bg-white text-[#374151]'
                ]"
              >
                {{ t.workflows.w3.badge }}
              </span>
              <h3 class="text-xl font-semibold tracking-tight sm:text-2xl">
                {{ t.workflows.w3.title }}
              </h3>
              <p :class="['text-sm leading-relaxed sm:text-base', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ t.workflows.w3.body }}
              </p>
              <ul :class="['space-y-2 text-sm', isDark ? 'text-[#CBD2DC]' : 'text-[#374151]']">
                <li v-for="(bullet, i) in t.workflows.w3.bullets" :key="i" class="flex items-start gap-2.5">
                  <svg
                    class="mt-1 h-4 w-4 shrink-0 text-[#22C55E]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </div>

            <figure
              :class="[
                'overflow-hidden rounded-lg border p-3 lg:col-span-7',
                isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
              ]"
            >
              <div class="aspect-video overflow-hidden rounded-md bg-[#0A0C0F]">
                <img
                  :src="withBase(t.workflows.w3.mediaSrc)"
                  :alt="t.workflows.w3.mediaAlt"
                  loading="lazy"
                  class="h-full w-full object-contain"
                />
              </div>
              <figcaption :class="['mt-2.5 px-1 text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ t.workflows.w3.mediaCaption }}
              </figcaption>
            </figure>
          </article>
        </div>
      </section>

      <!-- SECTION 3: HONEST COMPARISON -->
      <section
        id="comparison"
        :class="['border-t py-20 lg:py-28', isDark ? 'border-white/[0.08]' : 'border-slate-900/10']"
      >
        <div class="max-w-3xl space-y-3">
          <p :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
            {{ t.comparison.eyebrow }}
          </p>
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t.comparison.heading }}
          </h2>
          <p :class="['max-w-[65ch] text-base leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
            {{ t.comparison.subtitle }}
          </p>
        </div>

        <div
          :class="[
            'mt-10 overflow-x-auto rounded-lg border',
            isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
          ]"
        >
          <table class="w-full min-w-[680px] border-collapse text-left text-sm">
            <caption class="visually-hidden">
              {{ t.comparison.tableCaption }}
            </caption>
            <thead>
              <tr :class="['border-b', isDark ? 'border-white/10 bg-[#101318]' : 'border-slate-900/10 bg-[#F1F3F6]']">
                <th scope="col" class="px-4 py-3.5 font-semibold">{{ t.comparison.colCapability }}</th>
                <th scope="col" :class="['px-4 py-3.5 font-semibold', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ t.comparison.colPlain }}
                </th>
                <th scope="col" :class="['px-4 py-3.5 font-semibold', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ t.comparison.colWorkVisual }}
                </th>
                <th scope="col" :class="['px-4 py-3.5 font-semibold', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
                  {{ t.comparison.colToolkit }}
                </th>
              </tr>
            </thead>
            <tbody :class="['divide-y', isDark ? 'divide-white/[0.08]' : 'divide-slate-900/10']">
              <tr v-for="row in t.comparison.rows" :key="row.feature">
                <th scope="row" class="px-4 py-3.5 font-medium">{{ row.feature }}</th>
                <td :class="['px-4 py-3.5', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">{{ row.plainSyntax }}</td>
                <td :class="['px-4 py-3.5', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">{{ row.workVisual }}</td>
                <td class="px-4 py-3.5 font-medium">{{ row.krlToolkit }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          :class="[
            'mt-6 rounded-lg border p-4 sm:p-5',
            isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
          ]"
        >
          <div class="text-sm font-semibold">{{ t.comparison.honestNoteTitle }}</div>
          <p :class="['mt-1 text-sm leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
            {{ t.comparison.honestNoteBody }}
          </p>
        </div>
      </section>

      <!-- SECTION 4: COMPACT CAPABILITIES CATALOG -->
      <section
        id="capabilities"
        :class="['border-t py-20 lg:py-28', isDark ? 'border-white/[0.08]' : 'border-slate-900/10']"
      >
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-2xl space-y-3">
            <p :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
              {{ t.capabilities.eyebrow }}
            </p>
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              {{ t.capabilities.heading }}
            </h2>
            <p :class="['text-base leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.capabilities.subtitle }}
            </p>
          </div>

          <button
            type="button"
            @click="toggleAllCapabilities"
            :aria-expanded="showFullCatalog ? 'true' : 'false'"
            :class="[
              'inline-flex min-h-[40px] items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors',
              isDark
                ? 'border-white/20 bg-[#13161B] text-[#E6E8EC] hover:border-white/35'
                : 'border-slate-900/20 bg-white text-[#111827] hover:border-slate-900/35'
            ]"
          >
            {{ showFullCatalog ? t.capabilities.collapseBtn : `${t.capabilities.showAllBtn} (${allInventory.length})` }}
          </button>
        </div>

        <!-- Default Curated 8 Modules -->
        <div v-if="!showFullCatalog" class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="item in t.capabilities.featured"
            :key="item.id"
            :class="[
              'flex flex-col justify-between rounded-lg border p-5 transition-colors',
              isDark
                ? 'border-white/[0.08] bg-[#13161B] hover:border-white/25'
                : 'border-slate-900/10 bg-white hover:border-slate-900/25'
            ]"
          >
            <div class="space-y-2.5">
              <div class="flex items-center justify-between gap-2 text-xs">
                <span :class="isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]'">{{ item.category }}</span>
                <span
                  :class="[
                    'rounded px-2 py-0.5 font-medium',
                    item.tier === 'Pro'
                      ? (isDark ? 'bg-[#FF5E00]/15 text-[#FF7A2F]' : 'bg-orange-100 text-[#C2410C]')
                      : (isDark ? 'bg-white/10 text-[#CBD2DC]' : 'bg-slate-100 text-[#374151]')
                  ]"
                >
                  {{ item.tier === 'Pro' ? t.capabilities.badgePro : t.capabilities.badgeFree }}
                </span>
              </div>
              <h3 class="text-base font-semibold leading-snug">{{ item.title }}</h3>
              <p :class="['text-sm leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ item.description }}
              </p>
            </div>

            <div
              :class="[
                'mt-5 flex items-center justify-between gap-2 border-t pt-3 text-xs',
                isDark ? 'border-white/[0.08]' : 'border-slate-900/10'
              ]"
            >
              <code :class="['truncate font-mono', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ item.commandId }}
              </code>
              <button
                type="button"
                @click="openToolPreview({ title: item.title, id: item.commandId, category: item.category, status: item.tier, valueProposition: item.description, mediaSrc: item.mediaSrc, mediaAlt: item.mediaAlt })"
                :class="['shrink-0 font-semibold hover:underline', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']"
              >
                {{ t.capabilities.viewDemoBtn }}
              </button>
            </div>
          </article>
        </div>

        <!-- Expanded Filterable Registry -->
        <div v-else class="mt-8 space-y-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p :class="['text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.capabilities.registryNote }}
            </p>
            <input
              v-model="toolSearchQuery"
              type="search"
              :aria-label="t.capabilities.searchAria"
              :placeholder="t.capabilities.searchPlaceholder"
              :class="[
                'w-full rounded-md border px-3.5 py-2 text-sm sm:w-80',
                isDark
                  ? 'border-white/20 bg-[#13161B] text-[#E6E8EC] placeholder:text-[#7D8696]'
                  : 'border-slate-900/20 bg-white text-[#111827] placeholder:text-[#6B7280]'
              ]"
            />
          </div>

          <!-- Category Pills -->
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="cat in toolCategories"
              :key="cat"
              type="button"
              @click="selectedCategory = cat"
              :class="[
                'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                selectedCategory === cat
                  ? 'border-[#D94A00] bg-[#D94A00] text-white'
                  : (isDark ? 'border-white/15 bg-[#13161B] text-[#9AA3B2] hover:text-white' : 'border-slate-900/15 bg-white text-[#4B5563] hover:text-[#111827]')
              ]"
            >
              {{ translateCategory(cat) }}
            </button>
          </div>

          <div v-if="filteredTools.length === 0" :class="['rounded-lg border p-6 text-sm', isDark ? 'border-white/10 bg-[#13161B] text-[#9AA3B2]' : 'border-slate-900/12 bg-white text-[#4B5563]']">
            {{ t.capabilities.emptyResults }}
          </div>

          <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="tool in filteredTools"
              :key="tool.id"
              :class="[
                'flex flex-col justify-between rounded-lg border p-4',
                isDark ? 'border-white/[0.08] bg-[#13161B]' : 'border-slate-900/10 bg-white'
              ]"
            >
              <div class="space-y-1.5">
                <div class="flex items-center justify-between gap-2 text-xs">
                  <span :class="['truncate', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                    {{ translateCategory(tool.category) }}
                  </span>
                  <span
                    :class="[
                      'rounded px-1.5 py-0.5 text-xs font-medium',
                      (tool.status || '').toLowerCase() === 'pro'
                        ? (isDark ? 'bg-[#FF5E00]/15 text-[#FF7A2F]' : 'bg-orange-100 text-[#C2410C]')
                        : (isDark ? 'bg-white/10 text-[#CBD2DC]' : 'bg-slate-100 text-[#374151]')
                    ]"
                  >
                    {{ (tool.status || '').toLowerCase() === 'pro' ? t.capabilities.badgePro : t.capabilities.badgeFree }}
                  </span>
                </div>
                <h3 class="truncate text-sm font-semibold">{{ tool.title }}</h3>
                <code :class="['block truncate font-mono text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ tool.id }}
                </code>
                <p :class="['line-clamp-2 text-xs leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ tool.valueProposition }}
                </p>
              </div>
              <div
                :class="[
                  'mt-3 flex items-center justify-between border-t pt-2.5 text-xs',
                  isDark ? 'border-white/[0.08]' : 'border-slate-900/10'
                ]"
              >
                <span :class="isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]'">{{ translateType(tool.type) }}</span>
                <button
                  type="button"
                  @click="openToolPreview(tool)"
                  :class="['font-semibold hover:underline', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']"
                >
                  {{ t.capabilities.viewDemoBtn }}
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION 5: PRICING & B2B PROCUREMENT -->
      <section
        id="pricing"
        :class="['border-t py-20 lg:py-28', isDark ? 'border-white/[0.08]' : 'border-slate-900/10']"
      >
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl space-y-3">
            <p :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
              {{ t.pricing.eyebrow }}
            </p>
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              {{ t.pricing.heading }}
            </h2>
            <p :class="['text-base leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.pricing.subtitle }}
            </p>
          </div>

          <!-- Currency Switcher inside Pricing -->
          <div class="flex flex-wrap items-center gap-3">
            <div
              role="group"
              :aria-label="t.pricing.currencyAria"
              :class="[
                'inline-flex rounded-md border p-1 text-xs font-medium',
                isDark ? 'border-white/15 bg-[#13161B]' : 'border-slate-900/15 bg-white'
              ]"
            >
              <button
                v-for="curr in ['USD', 'EUR', 'RUB', 'TRY']"
                :key="curr"
                type="button"
                @click="currentCurrency = curr"
                :class="[
                  'rounded px-2.5 py-1 transition-colors',
                  currentCurrency === curr
                    ? 'bg-[#D94A00] text-white'
                    : (isDark ? 'text-[#9AA3B2] hover:text-white' : 'text-[#4B5563] hover:text-[#111827]')
                ]"
              >
                {{ curr }}
              </button>
            </div>
          </div>
        </div>

        <!-- 4 Pricing Cards in One Row -->
        <div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="tier in t.pricing.tiers"
            :key="tier.id"
            :class="[
              'flex flex-col justify-between rounded-lg border p-6',
              tier.isPrimary
                ? (isDark ? 'border-[#FF5E00]/70 bg-[#13161B]' : 'border-[#D94A00] bg-white')
                : (isDark ? 'border-white/[0.08] bg-[#13161B]' : 'border-slate-900/10 bg-white')
            ]"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-base font-semibold">{{ tier.name }}</h3>
                <span
                  :class="[
                    'rounded px-2 py-0.5 text-xs font-medium',
                    tier.isPrimary
                      ? (isDark ? 'bg-[#FF5E00]/15 text-[#FF7A2F]' : 'bg-orange-100 text-[#C2410C]')
                      : (isDark ? 'bg-white/10 text-[#CBD2DC]' : 'bg-slate-100 text-[#374151]')
                  ]"
                >
                  {{ tier.seatsLabel }}
                </span>
              </div>

              <!-- Price + Annual/Monthly Toggle on Pro -->
              <div class="space-y-2">
                <div class="flex items-baseline gap-1.5">
                  <span v-if="tier.isCommunity" class="text-3xl font-bold tracking-tight">
                    {{ tier.freeLabel }}
                  </span>
                  <template v-else>
                    <span class="text-3xl font-bold tracking-tight tabular-nums">
                      {{
                        tier.id === 'pro' && proBillingCycle === 'monthly'
                          ? formatPrice(tier.monthlyUsd)
                          : formatPrice(tier.priceUsd)
                      }}
                    </span>
                    <span :class="['text-sm', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                      {{
                        tier.id === 'pro' && proBillingCycle === 'monthly'
                          ? tier.periodMonth
                          : tier.periodYear
                      }}
                    </span>
                  </template>
                </div>

                <div v-if="tier.id === 'pro'" class="inline-flex rounded-md border p-0.5 text-xs" :class="isDark ? 'border-white/15 bg-[#0D0F12]' : 'border-slate-900/15 bg-[#F8F9FB]'">
                  <button
                    type="button"
                    @click="proBillingCycle = 'annual'"
                    :class="[
                      'rounded px-2.5 py-1 font-medium transition-colors',
                      proBillingCycle === 'annual'
                        ? (isDark ? 'bg-[#1F242D] text-white' : 'bg-white text-[#111827] shadow-sm')
                        : (isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]')
                    ]"
                  >
                    {{ t.pricing.billingAnnual }}
                  </button>
                  <button
                    type="button"
                    @click="proBillingCycle = 'monthly'"
                    :class="[
                      'rounded px-2.5 py-1 font-medium transition-colors',
                      proBillingCycle === 'monthly'
                        ? (isDark ? 'bg-[#1F242D] text-white' : 'bg-white text-[#111827] shadow-sm')
                        : (isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]')
                    ]"
                  >
                    {{ t.pricing.billingMonthly }}
                  </button>
                </div>
              </div>

              <p :class="['text-sm leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ tier.description }}
              </p>

              <ul
                :class="[
                  'space-y-2 border-t pt-4 text-sm',
                  isDark ? 'border-white/[0.08] text-[#CBD2DC]' : 'border-slate-900/10 text-[#374151]'
                ]"
              >
                <li v-for="(feat, i) in tier.features" :key="i" class="flex items-start gap-2">
                  <svg
                    class="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-6">
              <a
                v-if="tier.isCommunity"
                href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                  'inline-flex min-h-[42px] w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors',
                  isDark
                    ? 'border-white/20 bg-[#0D0F12] text-[#E6E8EC] hover:border-white/35'
                    : 'border-slate-900/20 bg-[#F8F9FB] text-[#111827] hover:border-slate-900/35'
                ]"
              >
                {{ tier.ctaLabel }}
              </a>

              <a
                v-else
                :href="buildCheckoutUrl(activeTierProductId(tier))"
                @click.prevent="startCheckout(activeTierProductId(tier))"
                :class="[
                  'inline-flex min-h-[42px] w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                  tier.isPrimary
                    ? 'bg-[#D94A00] text-white hover:bg-[#B83E00]'
                    : (isDark ? 'border border-white/20 bg-[#0D0F12] text-[#E6E8EC] hover:border-white/35' : 'border border-slate-900/20 bg-[#F8F9FB] text-[#111827] hover:border-slate-900/35')
                ]"
              >
                {{ checkoutBusy === activeTierProductId(tier) ? t.pricing.openingCheckout : tier.ctaLabel }}
              </a>
            </div>
          </article>
        </div>

        <!-- Lifetime & 100-Seat Plant Note -->
        <div :class="['mt-5 flex flex-col gap-1.5 text-sm', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
          <p>
            {{ t.pricing.lifetimeNotePrefix }}
            <a
              :href="buildCheckoutUrl('pdt_0NmAcoqVCfuwQ6Xx7qyqr')"
              @click.prevent="startCheckout('pdt_0NmAcoqVCfuwQ6Xx7qyqr')"
              :class="['font-semibold underline underline-offset-4', isDark ? 'text-[#E6E8EC] hover:text-[#FF7A2F]' : 'text-[#111827] hover:text-[#C2410C]']"
            >
              {{ t.pricing.lifetimeLinkLabel }} ({{ formatPrice(699) }})
            </a>
            {{ t.pricing.lifetimeNoteSuffix }}
          </p>
          <p>{{ t.pricing.enterprise100Note }}</p>
        </div>

        <!-- Calm Billing / Refund Strip -->
        <div
          :class="[
            'mt-8 grid grid-cols-1 gap-6 rounded-lg border p-5 md:grid-cols-3',
            isDark ? 'border-white/[0.08] bg-[#13161B]' : 'border-slate-900/10 bg-white'
          ]"
        >
          <div class="space-y-1">
            <h3 class="text-sm font-semibold">{{ t.pricing.billingStrip.dodoTitle }}</h3>
            <p :class="['text-xs leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.pricing.billingStrip.dodoText }}
            </p>
          </div>
          <div class="space-y-1">
            <h3 class="text-sm font-semibold">{{ t.pricing.billingStrip.cancelTitle }}</h3>
            <p :class="['text-xs leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.pricing.billingStrip.cancelText }}
            </p>
          </div>
          <div class="space-y-1">
            <h3 class="text-sm font-semibold">{{ t.pricing.billingStrip.refundTitle }}</h3>
            <p :class="['text-xs leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.pricing.billingStrip.refundText }}
            </p>
          </div>
        </div>

        <!-- Quiet Promo Footnote -->
        <p :class="['mt-4 text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
          {{ t.pricing.promoFootnote }}
        </p>

        <!-- Compact B2B Procurement Block -->
        <div
          id="procurement"
          :class="[
            'mt-10 rounded-lg border p-6 sm:p-8',
            isDark ? 'border-white/10 bg-[#13161B]' : 'border-slate-900/12 bg-white'
          ]"
        >
          <div class="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div class="space-y-3 lg:col-span-7">
              <p :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
                {{ t.pricing.procurement.eyebrow }}
              </p>
              <h3 class="text-xl font-semibold tracking-tight">
                {{ t.pricing.procurement.heading }}
              </h3>
              <p :class="['text-sm leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                {{ t.pricing.procurement.body }}
              </p>
              <ul :class="['space-y-1.5 text-sm', isDark ? 'text-[#CBD2DC]' : 'text-[#374151]']">
                <li v-for="(pt, idx) in t.pricing.procurement.points" :key="idx" class="flex items-start gap-2">
                  <span aria-hidden="true" class="text-[#22C55E]">•</span>
                  <span>{{ pt }}</span>
                </li>
              </ul>
            </div>

            <div class="flex flex-col gap-2.5 lg:col-span-5">
              <a
                href="https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-[42px] items-center justify-center rounded-md bg-[#D94A00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#B83E00]"
              >
                {{ t.pricing.procurement.btnPortal }}
              </a>
              <a
                href="https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                  'inline-flex min-h-[42px] items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                  isDark
                    ? 'border-white/20 bg-[#0D0F12] text-[#E6E8EC] hover:border-white/35'
                    : 'border-slate-900/20 bg-[#F8F9FB] text-[#111827] hover:border-slate-900/35'
                ]"
              >
                {{ t.pricing.procurement.btnAirGap }}
              </a>
              <a
                href="vscode://LiskinLabs.kuka-krl-extension/support"
                :class="[
                  'inline-flex min-h-[42px] items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                  isDark
                    ? 'border-white/20 bg-[#0D0F12] text-[#E6E8EC] hover:border-white/35'
                    : 'border-slate-900/20 bg-[#F8F9FB] text-[#111827] hover:border-slate-900/35'
                ]"
              >
                {{ t.pricing.procurement.btnVsCodeInvoice }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: SECURITY & AIR-GAP -->
      <section
        id="security"
        :class="['border-t py-20 lg:py-28', isDark ? 'border-white/[0.08]' : 'border-slate-900/10']"
      >
        <div class="max-w-3xl space-y-3">
          <p :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
            {{ t.security.eyebrow }}
          </p>
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t.security.heading }}
          </h2>
          <p :class="['max-w-[65ch] text-base leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
            {{ t.security.subtitle }}
          </p>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article
            v-for="item in t.security.items"
            :key="item.title"
            :class="[
              'rounded-lg border p-6',
              isDark ? 'border-white/[0.08] bg-[#13161B]' : 'border-slate-900/10 bg-white'
            ]"
          >
            <h3 class="text-base font-semibold">{{ item.title }}</h3>
            <p :class="['mt-2 text-sm leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ item.body }}
            </p>
          </article>
        </div>

        <div class="mt-6 flex flex-wrap gap-6 text-sm font-medium">
          <a
            href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"
            target="_blank"
            rel="noopener noreferrer"
            :class="['underline underline-offset-4', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']"
          >
            {{ t.security.spectraLink }}
          </a>
          <a
            href="https://github.com/LiskinLabs/kuka-krl-extension"
            target="_blank"
            rel="noopener noreferrer"
            :class="['underline underline-offset-4', isDark ? 'text-[#E6E8EC] hover:text-[#FF7A2F]' : 'text-[#111827] hover:text-[#C2410C]']"
          >
            {{ t.security.githubLink }}
          </a>
          <a
            href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md"
            target="_blank"
            rel="noopener noreferrer"
            :class="['underline underline-offset-4', isDark ? 'text-[#E6E8EC] hover:text-[#FF7A2F]' : 'text-[#111827] hover:text-[#C2410C]']"
          >
            {{ t.security.privacyLink }}
          </a>
        </div>
      </section>

      <!-- SECTION 7: AUTHOR & VERIFIED CHANNELS -->
      <section
        id="author"
        :class="['border-t py-20 lg:py-28', isDark ? 'border-white/[0.08]' : 'border-slate-900/10']"
      >
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div class="space-y-5 lg:col-span-7">
            <p :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]']">
              {{ t.author.eyebrow }}
            </p>
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              {{ t.author.heading }}
            </h2>

            <div class="flex items-center gap-4 pt-1">
              <!-- Optional drop-in photo slot: add /docs/public/author.jpg if desired -->
              <div
                :aria-label="t.author.photoSlotNote"
                :class="[
                  'flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border text-lg font-semibold',
                  isDark ? 'border-white/15 bg-[#13161B] text-[#E6E8EC]' : 'border-slate-900/15 bg-white text-[#111827]'
                ]"
              >
                SL
              </div>
              <div>
                <div class="text-lg font-semibold">{{ t.author.name }}</div>
                <div :class="['text-sm', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ t.author.role }}
                </div>
              </div>
            </div>

            <p :class="['max-w-[65ch] text-base leading-relaxed', isDark ? 'text-[#CBD2DC]' : 'text-[#374151]']">
              {{ t.author.bio1 }}
            </p>
            <p :class="['max-w-[65ch] text-base leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ t.author.bio2 }}
            </p>
          </div>

          <div class="space-y-4 lg:col-span-5">
            <h3 class="text-base font-semibold">{{ t.author.channelsHeading }}</h3>
            <div class="space-y-3">
              <a
                v-for="ch in t.author.channels"
                :key="ch.label"
                :href="ch.href"
                :target="ch.external ? '_blank' : undefined"
                :rel="ch.external ? 'noopener noreferrer' : undefined"
                :class="[
                  'block rounded-lg border p-4 transition-colors',
                  isDark
                    ? 'border-white/10 bg-[#13161B] hover:border-[#FF5E00]/60'
                    : 'border-slate-900/12 bg-white hover:border-[#D94A00]'
                ]"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-sm font-semibold">{{ ch.label }}</span>
                  <span aria-hidden="true" :class="isDark ? 'text-[#FF7A2F]' : 'text-[#C2410C]'">→</span>
                </div>
                <p :class="['mt-1 text-xs leading-relaxed', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
                  {{ ch.detail }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer
      :class="[
        'border-t py-14 text-sm',
        isDark ? 'border-white/[0.08] bg-[#0A0C0F] text-[#9AA3B2]' : 'border-slate-900/10 bg-[#F1F3F6] text-[#4B5563]'
      ]"
    >
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div class="space-y-3 md:col-span-4">
            <div class="flex items-center gap-2.5">
              <img
                :src="withBase(isDark ? '/logo-dark.svg' : '/logo-light.svg')"
                alt="LiskinLabs"
                width="24"
                height="24"
                class="h-6 w-6 object-contain"
              />
              <span :class="['font-semibold', isDark ? 'text-[#E6E8EC]' : 'text-[#111827]']">
                {{ t.footer.brandName }}
              </span>
            </div>
            <p class="text-xs leading-relaxed">{{ t.footer.brandDesc }}</p>
          </div>

          <div class="space-y-2 md:col-span-2">
            <div :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#E6E8EC]' : 'text-[#111827]']">
              {{ t.footer.colProduct }}
            </div>
            <ul class="space-y-1.5 text-xs">
              <li><a href="#workflows" class="hover:text-[#FF7A2F]">{{ t.footer.links.workflows }}</a></li>
              <li><a href="#comparison" class="hover:text-[#FF7A2F]">{{ t.footer.links.comparison }}</a></li>
              <li><a href="#pricing" class="hover:text-[#FF7A2F]">{{ t.footer.links.pricing }}</a></li>
              <li><a href="#security" class="hover:text-[#FF7A2F]">{{ t.footer.links.security }}</a></li>
            </ul>
          </div>

          <div class="space-y-2 md:col-span-3">
            <div :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#E6E8EC]' : 'text-[#111827]']">
              {{ t.footer.colResources }}
            </div>
            <ul class="space-y-1.5 text-xs">
              <li><a :href="withBase(t.header.docsLink)" class="hover:text-[#FF7A2F]">{{ t.footer.links.docs }}</a></li>
              <li>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[#FF7A2F]"
                >
                  {{ t.footer.links.marketplace }}
                </a>
              </li>
              <li>
                <a
                  href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[#FF7A2F]"
                >
                  {{ t.footer.links.openVsx }}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LiskinLabs/kuka-krl-extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[#FF7A2F]"
                >
                  {{ t.footer.links.github }}
                </a>
              </li>
              <li>
                <a
                  href="https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[#FF7A2F]"
                >
                  {{ t.footer.links.portal }}
                </a>
              </li>
            </ul>
          </div>

          <div class="space-y-2 md:col-span-3">
            <div :class="['text-xs font-semibold uppercase tracking-wider', isDark ? 'text-[#E6E8EC]' : 'text-[#111827]']">
              {{ t.footer.colLegal }}
            </div>
            <p class="text-xs leading-relaxed">{{ t.footer.disclaimer }}</p>
          </div>
        </div>

        <div
          :class="[
            'mt-10 border-t pt-6 text-xs',
            isDark ? 'border-white/[0.08]' : 'border-slate-900/10'
          ]"
        >
          {{ t.footer.copyright }}
        </div>
      </div>
    </footer>

    <!-- NATIVE DIALOG: 14-DAY PRO TRIAL -->
    <dialog
      ref="trialDialogRef"
      aria-labelledby="trial-dialog-title"
      @click="onBackdropClick($event, closeTrialDialog)"
      :class="[
        'w-full max-w-lg rounded-lg border p-6 shadow-xl',
        isDark ? 'border-white/15 bg-[#13161B] text-[#E6E8EC]' : 'border-slate-900/15 bg-white text-[#111827]'
      ]"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 id="trial-dialog-title" class="text-lg font-semibold">
            {{ t.modals.trialTitle }}
          </h2>
          <p :class="['mt-1 text-sm', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
            {{ t.modals.trialSubtitle }}
          </p>
        </div>
        <button
          type="button"
          :aria-label="t.modals.closeAria"
          @click="closeTrialDialog"
          :class="['rounded p-1.5', isDark ? 'text-[#9AA3B2] hover:bg-white/5 hover:text-white' : 'text-[#4B5563] hover:bg-slate-100']"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ol
        :class="[
          'my-5 space-y-3 border-y py-4 text-sm',
          isDark ? 'border-white/10' : 'border-slate-900/10'
        ]"
      >
        <li v-for="(s, idx) in t.modals.trialSteps" :key="idx" class="space-y-0.5">
          <div class="font-semibold">{{ s.step }}</div>
          <div :class="isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]'">{{ s.text }}</div>
        </li>
      </ol>

      <div class="flex flex-wrap justify-end gap-2.5">
        <a
          href="vscode://LiskinLabs.kuka-krl-extension/control-center"
          :class="[
            'inline-flex min-h-[38px] items-center rounded-md border px-4 py-2 text-sm font-medium',
            isDark ? 'border-white/20 text-[#E6E8EC] hover:bg-white/5' : 'border-slate-900/20 text-[#111827] hover:bg-slate-50'
          ]"
        >
          {{ t.modals.trialOpenVsCode }}
        </a>
        <button
          type="button"
          @click="closeTrialDialog"
          class="inline-flex min-h-[38px] items-center rounded-md bg-[#D94A00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B83E00]"
        >
          {{ t.modals.trialGotIt }}
        </button>
      </div>
    </dialog>

    <!-- NATIVE DIALOG: TOOL PREVIEW -->
    <dialog
      ref="toolDialogRef"
      aria-labelledby="tool-dialog-title"
      @click="onBackdropClick($event, closeToolPreview)"
      :class="[
        'w-full max-w-2xl rounded-lg border p-6 shadow-xl',
        isDark ? 'border-white/15 bg-[#13161B] text-[#E6E8EC]' : 'border-slate-900/15 bg-white text-[#111827]'
      ]"
    >
      <template v-if="selectedTool">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span
                :class="[
                  'rounded px-2 py-0.5 text-xs font-medium',
                  (selectedTool.status || '').toLowerCase() === 'pro'
                    ? (isDark ? 'bg-[#FF5E00]/15 text-[#FF7A2F]' : 'bg-orange-100 text-[#C2410C]')
                    : (isDark ? 'bg-white/10 text-[#CBD2DC]' : 'bg-slate-100 text-[#374151]')
                ]"
              >
                {{ (selectedTool.status || '').toLowerCase() === 'pro' ? t.capabilities.badgePro : t.capabilities.badgeFree }}
              </span>
              <h2 id="tool-dialog-title" class="text-lg font-semibold">
                {{ selectedTool.title }}
              </h2>
            </div>
            <p :class="['font-mono text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
              {{ selectedTool.id }} · {{ t.modals.toolModalCategoryLabel }}: {{ translateCategory(selectedTool.category) }}
            </p>
          </div>
          <button
            type="button"
            :aria-label="t.modals.closeAria"
            @click="closeToolPreview"
            :class="['rounded p-1.5', isDark ? 'text-[#9AA3B2] hover:bg-white/5 hover:text-white' : 'text-[#4B5563] hover:bg-slate-100']"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p :class="['mt-4 text-sm leading-relaxed', isDark ? 'text-[#CBD2DC]' : 'text-[#374151]']">
          {{ selectedTool.valueProposition }}
        </p>

        <div class="mt-4 aspect-video overflow-hidden rounded-md bg-[#0A0C0F]">
          <img
            :src="withBase(selectedTool.mediaSrc || getToolMediaSrc(selectedTool))"
            :alt="selectedTool.mediaAlt || selectedTool.title"
            @error="onMediaError"
            class="h-full w-full object-contain"
          />
        </div>

        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span :class="['text-xs', isDark ? 'text-[#9AA3B2]' : 'text-[#4B5563]']">
            {{ t.modals.toolModalCompat }}
          </span>
          <button
            type="button"
            @click="closeToolPreview"
            :class="[
              'inline-flex min-h-[36px] items-center rounded-md border px-4 py-1.5 text-sm font-medium',
              isDark ? 'border-white/20 text-[#E6E8EC] hover:bg-white/5' : 'border-slate-900/20 text-[#111827] hover:bg-slate-50'
            ]"
          >
            {{ t.modals.closeBtn }}
          </button>
        </div>
      </template>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase, useData } from 'vitepress'
import inventoryData from './krl_tools_inventory.json'
import { LANDING_LOCALES, LOCALE_PATHS, type LocaleCode, type PricingTier } from './landingI18n'

const { lang } = useData()

const currentLang = computed<LocaleCode>(() => {
  const val = (lang.value || 'en').toLowerCase()
  if (val.startsWith('ru')) return 'ru'
  if (val.startsWith('de')) return 'de'
  if (val.startsWith('tr')) return 'tr'
  if (val.startsWith('es')) return 'es'
  if (val.startsWith('it')) return 'it'
  return 'en'
})

const t = computed(() => LANDING_LOCALES[currentLang.value] || LANDING_LOCALES.en)
const localePath = computed(() => LOCALE_PATHS[currentLang.value] || '/')

const languageOptions: { code: LocaleCode; nativeName: string; path: string }[] = [
  { code: 'ru', nativeName: 'Русский', path: '/ru/' },
  { code: 'en', nativeName: 'English', path: '/' },
  { code: 'de', nativeName: 'Deutsch', path: '/de/' },
  { code: 'tr', nativeName: 'Türkçe', path: '/tr/' },
  { code: 'es', nativeName: 'Español', path: '/es/' },
  { code: 'it', nativeName: 'Italiano', path: '/it/' }
]

// 2-State Color Scheme Sync (System default + explicit override in localStorage)
const THEME_STORAGE_KEY = 'krl-color-scheme'
const isDark = ref(true)
let mediaQuery: MediaQueryList | null = null

const applySchemeToDom = (dark: boolean, explicitOverride: 'light' | 'dark' | null) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark)
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) {
    meta.setAttribute('content', explicitOverride ?? 'light dark')
  }
}

const syncSchemeFromSystemOrStorage = () => {
  if (typeof window === 'undefined') return
  let stored: string | null = null
  try {
    stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    stored = null
  }
  if (stored === 'light' || stored === 'dark') {
    isDark.value = stored === 'dark'
    applySchemeToDom(isDark.value, stored)
    return
  }
  const prefersDark = mediaQuery ? mediaQuery.matches : true
  isDark.value = prefersDark
  applySchemeToDom(prefersDark, null)
}

const toggleTheme = () => {
  const nextDark = !isDark.value
  const target: 'light' | 'dark' = nextDark ? 'dark' : 'light'
  const systemDark = mediaQuery ? mediaQuery.matches : true
  isDark.value = nextDark

  if (typeof window !== 'undefined') {
    try {
      if (nextDark === systemDark) {
        window.localStorage.removeItem(THEME_STORAGE_KEY)
        applySchemeToDom(nextDark, null)
      } else {
        window.localStorage.setItem(THEME_STORAGE_KEY, target)
        applySchemeToDom(nextDark, target)
      }
    } catch {
      applySchemeToDom(nextDark, target)
    }
  }
}

const onSystemSchemeChange = (e: MediaQueryListEvent) => {
  let stored: string | null = null
  try {
    stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    stored = null
  }
  if (stored !== 'light' && stored !== 'dark') {
    isDark.value = e.matches
    applySchemeToDom(e.matches, null)
  }
}

const onStorageSync = (e: StorageEvent) => {
  if (e.key === THEME_STORAGE_KEY) {
    syncSchemeFromSystemOrStorage()
  }
}

// Header dropdown & mobile menu state
const langMenuOpen = ref(false)
const langMenuRef = ref<HTMLElement | null>(null)
const mobileMenuOpen = ref(false)

const handleDocClick = (e: MouseEvent) => {
  if (langMenuOpen.value && langMenuRef.value && !langMenuRef.value.contains(e.target as Node)) {
    langMenuOpen.value = false
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    langMenuOpen.value = false
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  syncSchemeFromSystemOrStorage()
  mediaQuery.addEventListener('change', onSystemSchemeChange)
  window.addEventListener('storage', onStorageSync)
  document.addEventListener('click', handleDocClick)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', onSystemSchemeChange)
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('storage', onStorageSync)
  }
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleDocClick)
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Hero visual controls
const heroVisualMode = ref<'screenshots' | '3d'>('screenshots')
const activeHeroSlide = ref(0)
const currentHeroSlide = computed(() => t.value.hero.mediaSlides[activeHeroSlide.value] || t.value.hero.mediaSlides[0])
const simIframeRef = ref<HTMLIFrameElement | null>(null)
const initialSimTheme = ref<'dark' | 'light'>('dark')
const simIframeSrc = computed(() => `/sim/?embed=1&lang=${currentLang.value}&theme=${initialSimTheme.value}`)

const syncSimIframe = () => {
  if (typeof window === 'undefined') return
  const win = simIframeRef.value?.contentWindow
  if (!win) return
  win.postMessage(
    {
      type: 'liskin-sim-sync',
      theme: isDark.value ? 'dark' : 'light',
      lang: currentLang.value
    },
    window.location.origin
  )
}

watch(
  heroVisualMode,
  (mode) => {
    if (mode === '3d') {
      initialSimTheme.value = isDark.value ? 'dark' : 'light'
    }
  },
  { flush: 'sync' }
)

watch([isDark, currentLang], () => {
  syncSimIframe()
})

// CLI copy
const copiedCli = ref(false)
const copyCliInstall = async () => {
  try {
    await navigator.clipboard.writeText('code --install-extension LiskinLabs.kuka-krl-extension')
    copiedCli.value = true
    setTimeout(() => {
      copiedCli.value = false
    }, 2500)
  } catch {
    copiedCli.value = true
  }
}

// Workflow 2 diff switcher
const activeDiffIdx = ref(0)
const currentDiffScenario = computed(
  () => t.value.workflows.w2.scenarios[activeDiffIdx.value] || t.value.workflows.w2.scenarios[0]
)

// Capabilities catalog (8 featured by default; full 163 on toggle)
interface InventoryEntry {
  type: string
  id: string
  title: string
  status: string
  valueProposition: string
  category: string
  mediaSrc?: string
  mediaAlt?: string
}

const allInventory: InventoryEntry[] = []
if (inventoryData && (inventoryData as Record<string, any>).inventory) {
  const inv = (inventoryData as Record<string, any>).inventory as Record<string, Omit<InventoryEntry, 'category'>[]>
  Object.keys(inv).forEach((cat) => {
    inv[cat].forEach((item) => {
      allInventory.push({ ...item, category: cat })
    })
  })
}

const showFullCatalog = ref(false)
const toolSearchQuery = ref('')
const selectedCategory = ref('All')

const toggleAllCapabilities = () => {
  showFullCatalog.value = !showFullCatalog.value
  if (!showFullCatalog.value) {
    toolSearchQuery.value = ''
    selectedCategory.value = 'All'
  }
}

const toolCategories = computed(() => {
  const cats = ['All']
  if (inventoryData && (inventoryData as Record<string, any>).inventory) {
    cats.push(...Object.keys((inventoryData as Record<string, any>).inventory))
  }
  return cats
})

const filteredTools = computed(() => {
  let list = allInventory
  if (selectedCategory.value !== 'All') {
    list = list.filter((item) => item.category === selectedCategory.value)
  }
  if (toolSearchQuery.value.trim()) {
    const q = toolSearchQuery.value.toLowerCase()
    list = list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.valueProposition && item.valueProposition.toLowerCase().includes(q))
    )
  }
  return list
})

const translateCategory = (cat: string) => {
  return t.value.capabilities.categoryNames[cat] || cat
}

const translateType = (type: string) => {
  return t.value.capabilities.typeNames[type] || type
}

// Currency & Pricing
const currentCurrency = ref<'USD' | 'EUR' | 'RUB' | 'TRY'>('USD')
const proBillingCycle = ref<'annual' | 'monthly'>('annual')

const currencyRates: Record<string, { symbol: string; rate: number; isPrefix: boolean }> = {
  USD: { symbol: '$', rate: 1.0, isPrefix: true },
  EUR: { symbol: '€', rate: 0.92, isPrefix: false },
  RUB: { symbol: '₽', rate: 94.0, isPrefix: false },
  TRY: { symbol: '₺', rate: 34.5, isPrefix: false }
}

const formatPrice = (usd?: number) => {
  if (!usd) return ''
  const cur = currencyRates[currentCurrency.value] || currencyRates.USD
  const raw = usd * cur.rate
  const valStr = Math.round(raw).toLocaleString(currentLang.value === 'en' ? 'en-US' : currentLang.value)
  return cur.isPrefix ? `${cur.symbol}${valStr}` : `${valStr} ${cur.symbol}`
}

const activeTierProductId = (tier: PricingTier) => {
  if (tier.id === 'pro' && proBillingCycle.value === 'monthly' && tier.productIdMonthly) {
    return tier.productIdMonthly
  }
  return tier.productIdAnnual || ''
}

// Dodo Payments Checkout
const GATEWAY_URL = 'https://kuka-krl-support-gateway.redminotpro5.workers.dev'
const checkoutBusy = ref<string | null>(null)

const buildCheckoutUrl = (productId: string) => {
  const locale = encodeURIComponent(currentLang.value || 'en')
  const returnUrl = encodeURIComponent(`${GATEWAY_URL}/checkout/success?lang=${locale}`)
  return `https://checkout.dodopayments.com/buy/${productId}?redirect_url=${returnUrl}&singlePage=true&showDiscounts=true&discountCode=LAUNCH30`
}

const startCheckout = async (productId: string) => {
  if (!productId || checkoutBusy.value) return
  checkoutBusy.value = productId
  const fallback = buildCheckoutUrl(productId)
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(`${GATEWAY_URL}/api/v1/checkout/create-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        discountCode: 'LAUNCH30',
        source: 'landing_page',
        locale: currentLang.value || 'en'
      }),
      signal: controller.signal
    })
    clearTimeout(timer)
    if (res.ok) {
      const data = await res.json()
      if (data && data.url) {
        window.location.href = data.url
        return
      }
    }
  } catch {
    // Fallback to static Dodo Payments URL
  } finally {
    checkoutBusy.value = null
  }
  window.location.href = fallback
}

// Native <dialog> Modals
const trialDialogRef = ref<HTMLDialogElement | null>(null)
const toolDialogRef = ref<HTMLDialogElement | null>(null)
const selectedTool = ref<Partial<InventoryEntry> | null>(null)

const openTrialDialog = () => {
  if (trialDialogRef.value && typeof trialDialogRef.value.showModal === 'function') {
    trialDialogRef.value.showModal()
  }
}

const closeTrialDialog = () => {
  if (trialDialogRef.value && typeof trialDialogRef.value.close === 'function') {
    trialDialogRef.value.close()
  }
}

const openToolPreview = async (tool: Partial<InventoryEntry>) => {
  selectedTool.value = tool
  await nextTick()
  if (toolDialogRef.value && typeof toolDialogRef.value.showModal === 'function') {
    toolDialogRef.value.showModal()
  }
}

const closeToolPreview = () => {
  if (toolDialogRef.value && typeof toolDialogRef.value.close === 'function') {
    toolDialogRef.value.close()
  }
  selectedTool.value = null
}

const onBackdropClick = (e: MouseEvent, closeFn: () => void) => {
  if (e.target === e.currentTarget) {
    closeFn()
  }
}

const getToolMediaSrc = (tool: Partial<InventoryEntry>) => {
  const id = (tool.id || '').toLowerCase()
  if (id.includes('inlay')) return '/media/inlay_hints.gif'
  if (id.includes('backup') || id.includes('diff')) return '/media/krc_backup_diff.gif'
  if (id.includes('definition')) return '/media/goto_definition.gif'
  if (id.includes('signal') || id.includes('io') || id.includes('fieldbus')) return '/media/krl_io_signals.gif'
  if (id.includes('fold')) return '/media/quick_fold_toolbar.gif'
  if (id.includes('flowchart')) return '/media/control_flow_graph.gif'
  if (id.includes('dead') || id.includes('cleanup')) return '/media/dead-code-demo.gif'
  return '/media/smart_autocomplete.gif'
}

const onMediaError = (e: Event) => {
  const img = e.target as HTMLImageElement | null
  if (img) {
    img.src = withBase('/logo.png')
  }
}
</script>
