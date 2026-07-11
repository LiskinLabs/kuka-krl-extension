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
          { text: 'Buy Pro License', link: 'https://liskin.lemonsqueezy.com' }
        ],
        sidebar: [
          {
            text: 'Documentation',
            items: [
              { text: 'Full Features Wiki', link: '/guide/features' }
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
          { text: 'Вики (Функции)', link: '/ru/guide/features' },
          { text: 'Купить Pro', link: 'https://liskin.lemonsqueezy.com' }
        ],
        sidebar: [
          {
            text: 'Документация',
            items: [
              { text: 'Полный список функций', link: '/ru/guide/features' }
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
          { text: 'Pro Satın Al', link: 'https://liskin.lemonsqueezy.com' }
        ],
        sidebar: [
          {
            text: 'Dokümantasyon',
            items: [
              { text: 'Tüm Özellikler Listesi', link: '/tr/guide/features' }
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
