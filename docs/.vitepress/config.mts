import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "KUKA KRL Professional",
  base: '/kuka-krl-extension/',
  outDir: '../public',
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
          { text: 'Features Wiki', link: '/guide/features' },
          { text: 'Community', link: '/guide/community-features' },
          { text: 'Pro Features', link: '/guide/pro-features' },
          { text: 'Buy Pro License', link: 'https://liskinlabs.lemonsqueezy.com' }
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
              { text: 'Full Features Wiki (26 Features)', link: '/guide/features' },
              { text: 'Community Features (Free)', link: '/guide/community-features' },
              { text: 'Pro & Industrial Features', link: '/guide/pro-features' }
            ]
          },
          {
            text: 'Pro Deep-Dives',
            items: [
              { text: 'Interactive Flowchart', link: '/guide/flowchart' },
              { text: 'Industrial Diagnostics & Safety', link: '/guide/diagnostics' },
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
          { text: 'Вики (26 функций)', link: '/ru/guide/features' },
          { text: 'Бесплатные (Community)', link: '/ru/guide/community-features' },
          { text: 'Pro функции', link: '/ru/guide/pro-features' },
          { text: 'Купить Pro', link: 'https://liskinlabs.lemonsqueezy.com' }
        ],
        sidebar: [
          {
            text: 'Быстрый старт',
            items: [
              { text: 'Установка и настройка', link: '/ru/guide/installation' }
            ]
          },
          {
            text: 'Вики функций (Wiki)',
            items: [
              { text: 'Полный справочник (26 функций)', link: '/ru/guide/features' },
              { text: 'Бесплатные функции (Community)', link: '/ru/guide/community-features' },
              { text: 'Промышленные Pro-функции', link: '/ru/guide/pro-features' }
            ]
          },
          {
            text: 'Обзор Pro-модулей',
            items: [
              { text: 'Интерактивные блок-схемы', link: '/ru/guide/flowchart' },
              { text: 'Диагностика и безопасность', link: '/ru/guide/diagnostics' },
              { text: 'Сравнение бэкапов KRC Diff', link: '/ru/guide/backup-diff' },
              { text: 'Подсказки сигналов Inlay Hints', link: '/ru/guide/inlay-hints' }
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
          { text: 'Özellikler Wiki', link: '/tr/guide/features' },
          { text: 'Pro Satın Al', link: 'https://liskinlabs.lemonsqueezy.com' }
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
              { text: 'Tüm Özellikler Listesi (26 Özellik)', link: '/tr/guide/features' }
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
