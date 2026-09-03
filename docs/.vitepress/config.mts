import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

const getBase = () => {
  if (process.env.BASE_URL) return process.env.BASE_URL
  if (process.env.CI_PAGES_URL) {
    try {
      const pathname = new URL(process.env.CI_PAGES_URL).pathname
      return pathname.endsWith('/') ? pathname : `${pathname}/`
    } catch {
      return '/'
    }
  }
  return '/kuka-krl-extension/'
}

export default defineConfig({
  title: "KUKA KRL Professional",
  appearance: 'force-dark',
  base: getBase(),
  outDir: '../public',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/kuka-krl-extension/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/kuka-krl-extension/logo.png' }],
    ['meta', { name: 'theme-color', content: '#FF6600' }],
    ['meta', { name: 'keywords', content: 'KUKA, KRL, KRC4, KRC5, Robot, Robotics, Industrial Automation, WorkVisual, VS Code' }],
    ['meta', { name: 'description', content: 'Enterprise-grade VS Code IDE extension for KUKA KRL robot programming. 50 industrial tools: Flowchart, Safety Diagnostics, Delta Math, Frame Calculator, and Offline Commissioning for KRC4 & KRC5 controllers.' }],
    ['meta', { property: 'og:title', content: 'KUKA KRL Professional — Industrial Robotics IDE Suite' }],
    ['meta', { property: 'og:description', content: 'Enterprise-grade VS Code IDE extension for KUKA KRL with Flowchart, Diagnostics, Delta Math, and Offline Commissioning.' }],
    ['meta', { property: 'og:image', content: 'https://liskinlabs.github.io/kuka-krl-extension/logo.png' }]
  ],
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            content: [
              path.resolve(__dirname, '../*.md'),
              path.resolve(__dirname, '../guide/**/*.md'),
              path.resolve(__dirname, '../ru/**/*.md'),
              path.resolve(__dirname, '../tr/**/*.md'),
              path.resolve(__dirname, './**/*.{vue,ts,js}')
            ],
            darkMode: 'class',
            theme: {
              extend: {
                colors: {
                  'kuka-orange': '#FF6600',
                  'kuka-dark': '#0D1117',
                  'kuka-darker': '#090C10',
                  'kuka-gray': '#161B22',
                  'kuka-border': '#30363D'
                },
                fontFamily: {
                  sans: ['Inter', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                  mono: ['JetBrains Mono', 'Roboto Mono', 'ui-monospace', 'monospace']
                }
              }
            }
          }),
          autoprefixer()
        ]
      }
    }
  },
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LiskinLabs/kuka-krl-extension' }
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      description: "The definitive industrial development suite for KUKA Robot Language.",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Features Wiki (50 Tools)', link: '/guide/features' },
          { text: 'Community', link: '/guide/community-features' },
          { text: 'Pro Features', link: '/guide/pro-features' },
          { text: 'Buy Pro License', link: 'https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ' }
        ],
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Installation & Setup', link: '/guide/installation' }
            ]
          },
          {
            text: 'Features Wiki',
            items: [
              { text: 'Full Features Wiki (50 Tools)', link: '/guide/features' },
              { text: 'Community Features (Free)', link: '/guide/community-features' },
              { text: 'Pro & Industrial Features', link: '/guide/pro-features' }
            ]
          },
          {
            text: 'Pro Deep-Dives',
            items: [
              { text: 'Interactive Flowchart', link: '/guide/flowchart' },
              { text: 'Industrial Diagnostics & Safety', link: '/guide/diagnostics' },
              { text: 'Dead-Code Analysis', link: '/guide/dead-code' },
              { text: 'KRC Backup Diff & Delta Inspector', link: '/guide/backup-diff' },
              { text: 'Real-time Inlay Hints', link: '/guide/inlay-hints' }
            ]
          }
        ],
        footer: {
          message: 'Licensed under Proprietary EULA.',
          copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
        }
      }
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      description: "Профессиональная среда разработки для KUKA Robot Language.",
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Вики (50 инструментов)', link: '/ru/guide/features' },
          { text: 'Бесплатно (Community)', link: '/ru/guide/community-features' },
          { text: 'Pro функции', link: '/ru/guide/pro-features' },
          { text: 'Купить Pro', link: 'https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ' }
        ],
        sidebar: [
          {
            text: 'С чего начать',
            items: [
              { text: 'Установка и настройка', link: '/ru/guide/installation' }
            ]
          },
          {
            text: 'База знаний (Wiki)',
            items: [
              { text: 'Полный справочник (50 инструментов)', link: '/ru/guide/features' },
              { text: 'Бесплатные функции (Community)', link: '/ru/guide/community-features' },
              { text: 'Промышленные Pro-функции', link: '/ru/guide/pro-features' }
            ]
          },
          {
            text: 'Обзор Pro-функций',
            items: [
              { text: 'Интерактивная блок-схема', link: '/ru/guide/flowchart' },
              { text: 'Диагностика и безопасность', link: '/ru/guide/diagnostics' },
              { text: 'Анализ неиспользуемого кода', link: '/ru/guide/dead-code' },
              { text: 'Сравнение бэкапов KRC Diff', link: '/ru/guide/backup-diff' },
              { text: 'Инлайн-подсказки сигналов', link: '/ru/guide/inlay-hints' }
            ]
          }
        ],
        footer: {
          message: 'Проприетарная лицензия (EULA).',
          copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
        }
      }
    },
    tr: {
      label: 'Türkçe',
      lang: 'tr',
      link: '/tr/',
      description: "KUKA Robot Language için kesin endüstriyel geliştirme paketi.",
      themeConfig: {
        nav: [
          { text: 'Ana Sayfa', link: '/tr/' },
          { text: 'Özellikler Wiki (50 Araç)', link: '/tr/guide/features' },
          { text: 'Ücretsiz (Community)', link: '/tr/guide/community-features' },
          { text: 'Pro Özellikler', link: '/tr/guide/pro-features' },
          { text: 'Pro Satın Al', link: 'https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ' }
        ],
        sidebar: [
          {
            text: 'Başlangıç',
            items: [
              { text: 'Kurulum ve Ayarlar', link: '/tr/guide/installation' }
            ]
          },
          {
            text: 'Özellikler Wiki',
            items: [
              { text: 'Tüm Özellikler Listesi (50 Araç)', link: '/tr/guide/features' },
              { text: 'Ücretsiz Topluluk Özellikleri', link: '/tr/guide/community-features' },
              { text: 'Pro ve Endüstriyel Özellikler', link: '/tr/guide/pro-features' }
            ]
          },
          {
            text: 'Pro Derinlemesine İncelemeler',
            items: [
              { text: 'Etkileşimli Akış Şeması', link: '/tr/guide/flowchart' },
              { text: 'Endüstriyel Güvenlik ve Teşhisler', link: '/tr/guide/diagnostics' },
              { text: 'Kullanılmayan Kod Analizi', link: '/tr/guide/dead-code' },
              { text: 'KRC Yedekleme Farkı ve Delta Denetçisi', link: '/tr/guide/backup-diff' },
              { text: 'Donanım Sinyali İpuçları (Inlay Hints)', link: '/tr/guide/inlay-hints' }
            ]
          }
        ],
        footer: {
          message: 'Özel EULA altında lisanslanmıştır.',
          copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
        }
      }
    }
  }
})
