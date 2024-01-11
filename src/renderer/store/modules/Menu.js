const state = {
    currentMenu: 'ToDo'
  }
  
  const mutations = {
    SET_CURRENT_MENU (state,menu) {
      state.menu = menu
    }
  }
  
  const actions = {
    COMMIT_MENU ({ commit },menu) {
      // do something async
      commit('SET_CURRENT_MENU',menu)
    }
  }

  const getters={
    currentMenu(state){
        return state.currentMenu;
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
  }
  