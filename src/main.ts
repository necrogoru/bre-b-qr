import { ViteSSG } from 'vite-ssg'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import App from './App.vue'

import './assets/main.css'

export const createApp = ViteSSG(
  { render: () => h(RouterView) },
  { routes: [{ path: '/', component: App }] },
)
