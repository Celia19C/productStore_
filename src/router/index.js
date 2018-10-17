import Vue from 'vue'
import Router from 'vue-router'
import inputForm from '@/components/inputForm'
import itemList from '@/components/itemList'
import buttonComponent from '@/components/buttonComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inputForm',
      component: inputForm,
    },
    {
      path: '/',
      name: 'itemList',
      component: itemList,
    },
    {
      path: '/',
      name: 'buttonComponent',
      component: buttonComponent,
    },
  ]
})
