import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/lib/locale/es';
import VueMask from 'v-mask'
import VueSession from 'vue-session'

Vue.use(Vuetify);
Vue.use(VueMask);
Vue.use(VueSession);
 
export default new Vuetify({
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    options: {
      customProperties: true,
    },
  themes: {
    light: {
      primary: '#ee44aa',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    },
  },
},

  lang: {
    locales: { es },
    current: 'es',
  },
});
 
