import { localStore } from './index'
const state = {
  secretKey: localStore.get('secretkey') ,
  notionPageUrl: localStore.get('notionPageUrl') ,
}

const getters = {
  secretKey(state) {
    return state.secretKey
  },
  notionPageUrl(state){
    return state.notionPageUrl
  }
}

const mutations = {
  SET_SECRET_KEY(state, secretKey) {
    localStore.set("SECRET_KEY", secretKey)
    state.secretKey = secretKey
  },
  SET_NOTION_PAGE_URL(state, notionPageUrl) {
    localStore.set("NOTION_PAGE_URL", notionPageUrl)
    state.notionPageUrl = notionPageUrl
  },
}

const actions = {
  SET_SECRET_KEY({ commit }, secretKey) {
    commit('SET_SECRET_KEY', secretKey)
  },
  SET_NOTION_PAGE_URL({ commit }, notionPageUrl) {
    commit('SET_NOTION_PAGE_URL', notionPageUrl)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
