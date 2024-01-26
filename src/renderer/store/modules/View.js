import { createLocalStore } from '../../util/LocalStore'
//console.log(localStore);
const state = {
  theme: createLocalStore().get('theme') || 'Pomotroid',
  alwaysOnTop: createLocalStore().get('alwaysOnTop') || true,
  refreshTime: createLocalStore().get('refreshTime') || 15,
}

const getters = {
  theme(state) {
    return state.theme
  },
  alwaysOnTop(state){
    return state.alwaysOnTop
  },
  refreshTime(state){
    return state.refreshTime
  }
}

const mutations = {
  SET_SETTING(state, payload) {
    createLocalStore().set(payload.key, payload.val)
    state[payload.key] = payload.val
    console.log(state);
  },
}

const actions = {
  setSetting({ commit }, payload) {
    commit('SET_SETTING', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
