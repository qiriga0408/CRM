import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

//封装分页全局注册
import PaginaTion from '@/components/Pagination';

Vue.component('pagina-tion', PaginaTion);

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as filters from './filters' // global filters

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
Vue.use(ElementUI)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//对话框拖拽事件
import './directive/el-drag-dialog'
//时间拖拽事件
// import './directive/el-data-picker'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明


// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})