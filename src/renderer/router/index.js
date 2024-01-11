import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'landing-page',
//       component: require('@/components/LandingPage').default
//     },
//     {
//       path: '*',
//       redirect: '/'
//     }
//   ]
// })

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index-page',
      redirect: "/ToDo",
      component: require('@/components/IndexPage').default,
      children:[{
        path:"/ToDo",
        name:'/ToDo',
        component: require("@/components/MainPage/ToDo.vue").default
      }]
    },
    {
      path: '*',
      redirect: '/ToDo'
    }
  ]
})
