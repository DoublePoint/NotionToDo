import { localStore } from './index'
import { createLocalStore } from '../../util/LocalStore'
//console.log(localStore);
const state = {
  theme: localStore.get('theme') || 'Pomotroid',
}

const getters = {
  theme() {
    return state.theme
  }
}

const mutations = {
  SET_SETTING(state, payload) {
    createLocalStore().set(payload.key, payload.val)
    state[payload.key] = payload.val
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
