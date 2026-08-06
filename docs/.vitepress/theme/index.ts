import DefaultTheme from 'vitepress/theme'
import './tailwind.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Custom components can be registered here if needed
  }
}
