const state = {
  currentMenu: "ToDo",
};

const mutations = {
  SET_CURRENT_MENU(state, menu) {
    state.currentMenu = menu;
  },
};

const actions = {
  COMMIT_MENU({ commit }, menu) {
    commit("SET_CURRENT_MENU", menu);
  },
};

const getters = {
  currentMenu(state) {
    return state.currentMenu;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
