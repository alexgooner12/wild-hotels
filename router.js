import Vue from 'vue'
import Router from 'vue-router'
const dynamicRoutes = require('./routes.json')

import BasicPage from './pages/BasicPage'

const components = [
  BasicPage
]
 
Vue.use(Router)
 
export function createRouter() {
  let routes = []
  _.each(dynamicRoutes, route => {
    let comp = _.find(components, component => {
      return component.name == route.component
    })

    routes.push({
        path: route.url,
        name: route.url,
        component: comp
    })

  })
  return new Router({
    mode: 'history',
    routes
  })
}