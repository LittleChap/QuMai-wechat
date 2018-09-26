/**
 * Created by yangzhanpeng on 2018/1/20.
 */

const mainStore = {
  state: {
    globalUrl: ''
  },
  mutations: {
    SET_GLOBALURL: (state, url) => {
      state.globalUrl = url
    }
  }
}

export default mainStore
