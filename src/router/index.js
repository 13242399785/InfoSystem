import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  // mode: 'history',
  routes: [
    // {path: '/login',name: 'login',component: ()=>import('@/components/login/login')},
    // {path: '/alarm',name: 'alarm',component: ()=>import('@/pages/alarm/alarm')},
    // {path: '/soe',name: 'soe',component: ()=>import('@/pages/soe/soe')},
    // {path: '/ledger',name: 'ledger',component: ()=>import('@/pages/d_ledger/d_ledger')},
    // {path: '/kwh',name: 'kwh',component: ()=>import('@/pages/kwh/kwh')},
    // {path: '/analyze',name: 'analyze',component: ()=>import('@/pages/analyze/analyze')},
    // {path: '/power',name: 'power',component: ()=>import('@/pages/power/power')},
    // {path: '/service',name: 'service',component: ()=>import('@/pages/service/service')},
    // {path: '/state',name: 'state',component: ()=>import('@/pages/state/state')},
    {path: '/list',name: 'list',component: ()=>import('@/pages/employees/employees')},
    {path: '/history',name: 'history',component: ()=>import('@/pages/history/history')},
    {path: '/pushinfo',name: 'pushinfo',component: ()=>import('@/pages/pushinfo/pushinfo')},
    {path: '/',name: 'list',component: ()=>import('@/pages/employees/employees')},
  ]
})
