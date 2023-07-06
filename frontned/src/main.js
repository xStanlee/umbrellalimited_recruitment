import { createApp } from 'vue'

import App from './App.vue'

import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const vuetify = createVuetify({
  components,
  directives
})

createApp(App).use(vuetify).use(VueSweetalert2).mount('#app')
