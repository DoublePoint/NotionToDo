import { createLocalStore } from "../../util/LocalStore";
const localStore = createLocalStore();
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
    const localStore = createLocalStore();
    localStore.set("SECRET_KEY", secretKey)
    state.secretKey = secretKey
  },
  SET_NOTION_PAGE_URL(state, notionPageUrl) {
    const localStore = createLocalStore();
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
