import { localStore } from './index'
console.log(localStore);
const state = {
  theme: localStore.get('theme') || 'Pomotroid'
}

const getters = {
  theme() {
    return state.theme
  }
}

const mutations = {
  SET_SETTING(state, payload) {
    localStore.set(payload.key, payload.val)
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
