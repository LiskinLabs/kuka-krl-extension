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
    ['meta', { name: 'theme-color', content: '#FF5500' }],
    ['meta', { name: 'keywords', content: 'KUKA, KRL, KRC4, KRC5, Robot, Robotics, Industrial Automation, WorkVisual, VS Code, SCADA, MCP' }],
    ['meta', { property: 'og:title', content: 'KUKA KRL Professional — Industrial Robotics IDE Suite' }],
    ['meta', { property: 'og:description', content: 'Enterprise-grade VS Code IDE extension for KUKA KRL with Live SCADA, Flowchart, Diagnostics, Delta Math, and Offline Commissioning.' }],
    ['meta', { property: 'og:image', content: '/kuka-krl-extension/logo.png' }],
    ['meta', { property: 'og:site_name', content: 'KUKA KRL Professional' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'KUKA KRL Professional — Industrial Robotics IDE Suite' }],
    ['meta', { name: 'twitter:description', content: 'Enterprise-grade VS Code IDE extension for KUKA KRL with Live SCADA, Flowchart, Diagnostics, Delta Math, and Offline Commissioning.' }],
    ['meta', { name: 'twitter:image', content: '/kuka-krl-extension/logo.png' }]
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
                  'kuka-orange': '#FF5500',
                  'kuka-dark': '#09090B',
                  'kuka-darker': '#09090B',
                  'kuka-gray': '#111114',
                  'kuka-border': '#27272A'
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
          { text: 'SCADA Live', link: '/guide/scada-live-monitor' },
          { text: 'Features Wiki', link: '/guide/features' },
          { text: 'Community', link: '/guide/community-features' },
          { text: 'Pro Features', link: '/guide/pro-features' },
          { text: 'Buy Pro License', link: 'https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6' },
          { text: 'Invoices / Portal', link: 'https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1' }
        ],
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Installation & Setup', link: '/guide/installation' }
            ]
          },
          {
            text: 'v1.9.8 Engineering Suites',
            items: [
              { text: 'SCADA Live Monitor & Telemetry', link: '/guide/scada-live-monitor' },
              { text: 'Point Table & .DAT Synchronizer', link: '/guide/point-synchronizer' },
              { text: 'WorkVisual & KUKA.Sim (VCMX)', link: '/guide/wvs-and-vcmx' },
              { text: 'KUKA.RSI Real-Time & CAM Importer', link: '/guide/rsi-and-cam' },
              { text: 'Model Context Protocol (MCP) Bridge', link: '/guide/mcp-ai-copilot' }
            ]
          },
          {
            text: 'Features Wiki',
            items: [
              { text: 'Full Features Wiki', link: '/guide/features' },
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
          message: 'Licensed under Proprietary EULA. Independent tool by Liskin Labs; not affiliated with KUKA AG.',
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
          { text: 'SCADA Live', link: '/ru/guide/scada-live-monitor' },
          { text: 'Вики функций', link: '/ru/guide/features' },
          { text: 'Бесплатно (Community)', link: '/ru/guide/community-features' },
          { text: 'Pro функции', link: '/ru/guide/pro-features' },
          { text: 'Купить Pro', link: 'https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6' },
          { text: 'Инвойсы / Портал', link: 'https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1' }
        ],
        sidebar: [
          {
            text: 'С чего начать',
            items: [
              { text: 'Установка и настройка', link: '/ru/guide/installation' }
            ]
          },
          {
            text: 'Инженерные комплексы v1.9.8',
            items: [
              { text: 'SCADA Live Monitor реального времени', link: '/ru/guide/scada-live-monitor' },
              { text: 'Таблица точек и синхронизатор .DAT', link: '/ru/guide/point-synchronizer' },
              { text: 'WorkVisual и KUKA.Sim (VCMX)', link: '/ru/guide/wvs-and-vcmx' },
              { text: 'KUKA.RSI реального времени и CAM-импортер', link: '/ru/guide/rsi-and-cam' },
              { text: 'Мост Model Context Protocol (MCP) ИИ', link: '/ru/guide/mcp-ai-copilot' }
            ]
          },
          {
            text: 'База знаний (Wiki)',
            items: [
              { text: 'Полный справочник функций', link: '/ru/guide/features' },
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
          message: 'Проприетарная лицензия (EULA). Независимая разработка Liskin Labs; не аффилировано с KUKA AG.',
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
          { text: 'SCADA Canlı', link: '/tr/guide/scada-live-monitor' },
          { text: 'Özellikler Wiki', link: '/tr/guide/features' },
          { text: 'Ücretsiz (Community)', link: '/tr/guide/community-features' },
          { text: 'Pro Özellikler', link: '/tr/guide/pro-features' },
          { text: 'Pro Satın Al', link: 'https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6' },
          { text: 'Faturalar / Portal', link: 'https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1' }
        ],
        sidebar: [
          {
            text: 'Başlangıç',
            items: [
              { text: 'Kurulum ve Ayarlar', link: '/tr/guide/installation' }
            ]
          },
          {
            text: 'v1.9.8 Mühendislik Paketleri',
            items: [
              { text: 'SCADA Canlı İzleyici ve Telemetri', link: '/tr/guide/scada-live-monitor' },
              { text: 'Nokta Tablosu ve .DAT Senkronizasyonu', link: '/tr/guide/point-synchronizer' },
              { text: 'WorkVisual ve KUKA.Sim (VCMX)', link: '/tr/guide/wvs-and-vcmx' },
              { text: 'KUKA.RSI Gerçek Zamanlı ve CAM İçe Aktarıcı', link: '/tr/guide/rsi-and-cam' },
              { text: 'Model Context Protocol (MCP) Yapay Zeka', link: '/tr/guide/mcp-ai-copilot' }
            ]
          },
          {
            text: 'Özellikler Wiki',
            items: [
              { text: 'Tüm Özellikler Listesi', link: '/tr/guide/features' },
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
          message: 'Özel EULA altında lisanslanmıştır. Liskin Labs bağımsız geliştirme; KUKA AG ile bağlantılı değildir.',
          copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
        }
      }
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/',
      description: "Die definitive industrielle Entwicklungsumgebung für KUKA Robot Language.",
      themeConfig: {
        nav: [
          { text: 'Startseite', link: '/de/' },
          { text: 'SCADA Live', link: '/de/guide/scada-live-monitor' },
          { text: 'Features Wiki', link: '/de/guide/features' },
          { text: 'Community (Kostenlos)', link: '/de/guide/community-features' },
          { text: 'Pro-Funktionen', link: '/de/guide/pro-features' },
          { text: 'Pro kaufen', link: 'https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6' },
          { text: 'Rechnungen / Portal', link: 'https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1' }
        ],
        sidebar: [
          {
            text: 'Erste Schritte',
            items: [
              { text: 'Installation & Einrichtung', link: '/de/guide/installation' }
            ]
          },
          {
            text: 'v1.9.8 Engineering Suites',
            items: [
              { text: 'SCADA Live Monitor & Telemetrie', link: '/de/guide/scada-live-monitor' },
              { text: 'Punkttabelle & .DAT-Synchronisation', link: '/de/guide/point-synchronizer' },
              { text: 'WorkVisual & KUKA.Sim (VCMX)', link: '/de/guide/wvs-and-vcmx' },
              { text: 'KUKA.RSI Echtzeit & CAM-Importer', link: '/de/guide/rsi-and-cam' },
              { text: 'Model Context Protocol (MCP) KI', link: '/de/guide/mcp-ai-copilot' }
            ]
          },
          {
            text: 'Features Wiki',
            items: [
              { text: 'Vollständige Funktionsübersicht', link: '/de/guide/features' },
              { text: 'Community-Funktionen (Kostenlos)', link: '/de/guide/community-features' },
              { text: 'Pro & Industrielle Funktionen', link: '/de/guide/pro-features' }
            ]
          },
          {
            text: 'Pro Detailansichten',
            items: [
              { text: 'Interaktiver Ablaufplan', link: '/de/guide/flowchart' },
              { text: 'Industrielle Diagnose & Sicherheit', link: '/de/guide/diagnostics' },
              { text: 'Totcode-Analyse', link: '/de/guide/dead-code' },
              { text: 'KRC Backup-Diff & Delta-Inspektor', link: '/de/guide/backup-diff' },
              { text: 'Echtzeit-Inlay-Hints', link: '/de/guide/inlay-hints' }
            ]
          }
        ],
        footer: {
          message: 'Proprietäre EULA-Lizenz. Unabhängige Entwicklung von Liskin Labs; nicht mit der KUKA AG verbunden.',
          copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
        }
      }
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      description: "La suite de desarrollo industrial definitiva para KUKA Robot Language.",
      themeConfig: {
        nav: [
          { text: 'Inicio', link: '/es/' },
          { text: 'SCADA en Vivo', link: '/es/guide/scada-live-monitor' },
          { text: 'Wiki de Funciones', link: '/es/guide/features' },
          { text: 'Community (Gratis)', link: '/es/guide/community-features' },
          { text: 'Funciones Pro', link: '/es/guide/pro-features' },
          { text: 'Comprar Pro', link: 'https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6' },
          { text: 'Facturas / Portal', link: 'https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1' }
        ],
        sidebar: [
          {
            text: 'Primeros Pasos',
            items: [
              { text: 'Instalación y Configuración', link: '/es/guide/installation' }
            ]
          },
          {
            text: 'v1.9.8 Suites de Ingeniería',
            items: [
              { text: 'Monitor SCADA en Vivo y Telemetría', link: '/es/guide/scada-live-monitor' },
              { text: 'Tabla de Puntos y Sincronizador .DAT', link: '/es/guide/point-synchronizer' },
              { text: 'WorkVisual y KUKA.Sim (VCMX)', link: '/es/guide/wvs-and-vcmx' },
              { text: 'KUKA.RSI en Tiempo Real e Importador CAM', link: '/es/guide/rsi-and-cam' },
              { text: 'Model Context Protocol (MCP) IA', link: '/es/guide/mcp-ai-copilot' }
            ]
          },
          {
            text: 'Wiki de Funciones',
            items: [
              { text: 'Catálogo Completo de Funciones', link: '/es/guide/features' },
              { text: 'Funciones Community (Gratis)', link: '/es/guide/community-features' },
              { text: 'Funciones Pro e Industriales', link: '/es/guide/pro-features' }
            ]
          },
          {
            text: 'Análisis Detallado Pro',
            items: [
              { text: 'Diagrama de Flujo Interactivo', link: '/es/guide/flowchart' },
              { text: 'Diagnóstico de Seguridad Industrial', link: '/es/guide/diagnostics' },
              { text: 'Análisis de Código Muerto', link: '/es/guide/dead-code' },
              { text: 'Diferencias de Backup KRC y Delta', link: '/es/guide/backup-diff' },
              { text: 'Pistas de Señales Inlay Hints', link: '/es/guide/inlay-hints' }
            ]
          }
        ],
        footer: {
          message: 'Licenciado bajo EULA propietaria. Desarrollo independiente de Liskin Labs; no afiliado a KUKA AG.',
          copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
        }
      }
    },
    it: {
      label: 'Italiano',
      lang: 'it',
      link: '/it/',
      description: "La suite definitiva di sviluppo industriale per KUKA Robot Language.",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/it/' },
          { text: 'SCADA Live', link: '/it/guide/scada-live-monitor' },
          { text: 'Wiki Funzioni', link: '/it/guide/features' },
          { text: 'Community (Gratis)', link: '/it/guide/community-features' },
          { text: 'Funzioni Pro', link: '/it/guide/pro-features' },
          { text: 'Acquista Pro', link: 'https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6' },
          { text: 'Fatture / Portale', link: 'https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1' }
        ],
        sidebar: [
          {
            text: 'Guida Introduttiva',
            items: [
              { text: 'Installazione e Configurazione', link: '/it/guide/installation' }
            ]
          },
          {
            text: 'v1.9.8 Suite Ingegneristiche',
            items: [
              { text: 'Monitor SCADA Live e Telemetria', link: '/it/guide/scada-live-monitor' },
              { text: 'Tabella Punti e Sincronizzatore .DAT', link: '/it/guide/point-synchronizer' },
              { text: 'WorkVisual e KUKA.Sim (VCMX)', link: '/it/guide/wvs-and-vcmx' },
              { text: 'KUKA.RSI in Tempo Reale e Importatore CAM', link: '/it/guide/rsi-and-cam' },
              { text: 'Model Context Protocol (MCP) IA', link: '/it/guide/mcp-ai-copilot' }
            ]
          },
          {
            text: 'Wiki Funzioni',
            items: [
              { text: 'Indice Completo Funzionalità', link: '/it/guide/features' },
              { text: 'Funzioni Community (Gratis)', link: '/it/guide/community-features' },
              { text: 'Funzioni Pro e Industriali', link: '/it/guide/pro-features' }
            ]
          },
          {
            text: 'Approfondimenti Pro',
            items: [
              { text: 'Diagramma di Flusso Interattivo', link: '/it/guide/flowchart' },
              { text: 'Diagnostica e Sicurezza Industriale', link: '/it/guide/diagnostics' },
              { text: 'Analisi Codice Morto', link: '/it/guide/dead-code' },
              { text: 'Differenze Backup KRC e Ispettore Delta', link: '/it/guide/backup-diff' },
              { text: 'Suggerimenti Segnali Inlay Hints', link: '/it/guide/inlay-hints' }
            ]
          }
        ],
        footer: {
          message: 'Licenza proprietaria EULA. Sviluppo indipendente di Liskin Labs; non affiliato a KUKA AG.',
          copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
        }
      }
    }
  }
})
