import DefaultTheme from 'vitepress/theme'
import './tailwind.css'
import FeaturesWiki from './components/FeaturesWiki.vue'
import LandingPage from './components/LandingPage.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FeaturesWiki', FeaturesWiki)
    app.component('LandingPage', LandingPage)
  }
}

