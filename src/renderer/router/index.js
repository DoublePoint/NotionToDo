import Vue from "vue";
import Router from "vue-router";
import {createLocalStore} from "../util/LocalStore";
import vuex from '@/store/index.js'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index-page",
      redirect: "/ToDo",
      component: require("@/components/IndexPage").default,
      children: [
        {
          path: "/ToDo",
          name: "/ToDo",
          component: require("@/components/MainPage/ToDo.vue").default,
        },
        {
          path: "/Setting",
          name: "/Setting",
          component: require("@/components/Setting/Index").default,
          children: [
            {
              path: "/Setting/Index",
              name: "/Setting/Index",
              component: require("@/components/Setting/SettingSecret").default,
            },
            {
              path:"/Setting/Theme",
              name:"/Setting/Theme",
              component: require("@/components/Setting/SettingTheme").default,
            },
            {
              path:"/Setting/About",
              name:"/Setting/About",
              component: require("@/components/Setting/SettingAbout").default,
            }
          ],
        },
      ],
    },
    {
      path: "*",
      redirect: "/ToDo",
    },
  ],
});
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
  const localStore = createLocalStore()
  // debugger
  if(to.name==="/Setting/Index" || localStore.get("SECRET_KEY")){
    next()
  }
  else{
    vuex.dispatch('Menu/COMMIT_MENU',"/Setting/Index")
    next({name:"/Setting/Index"})
  }
})

export default router