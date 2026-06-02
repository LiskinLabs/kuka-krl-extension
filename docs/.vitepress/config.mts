import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "KUKA KRL Professional",
  description: "The definitive industrial development suite for KUKA Robot Language.",
  base: '/kuka-krl-extension/',
  outDir: '../public',
  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Buy Pro License', link: 'https://liskin.lemonsqueezy.com' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/guide/installation' }
        ]
      },
      {
        text: 'Pro Features',
        items: [
          { text: 'Interactive Flowchart', link: '/guide/flowchart' },
          { text: 'Industrial Diagnostics', link: '/guide/diagnostics' },
          { text: 'Dead-Code Analysis', link: '/guide/dead-code' },
          { text: 'Real-time Inlay Hints', link: '/guide/inlay-hints' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LiskinLabs/kuka-krl-extension' }
    ],
    
    footer: {
      message: 'Licensed under Proprietary EULA.',
      copyright: 'Copyright © 2024-2026 LiskinLabs (Silvestr Liskin)'
    }
  }
})
