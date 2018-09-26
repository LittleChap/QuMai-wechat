import {fetch} from '@/utils/fetch'
import {toast} from '@/main'

const Index = {
  state: {
    searchHistory: [],
    searchHasMore: true,
    searchResult: [],
    searchParams: {
      currentPage: 1,
      showCount: 10,
      catId: 0,
      goodsName: '',
      type: 0,
      totalResult: 11
    },
    hasNewMessage: 0
  },
  mutations: {
    // 添加新的关键词到搜索历史里面去
    ADD_SearchHistory (state, searchParams) {
      if (searchParams.goodsName) {
        searchParams.goodsName.trim()
      }
      if (searchParams.goodsName == '') { return }
      state.searchHistory.unshift(searchParams.goodsName)
      state.searchHistory = Array.from(new Set(state.searchHistory))  // 去重
      localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory))
    },
    // 第一次加载的时候，读取本地的搜索历史
    READ_SearchHistory (state) {
      let sh = localStorage.getItem('searchHistory') || '[]'
      state.searchHistory = JSON.parse(sh)
    },
    // 清空搜索历史
    CLEAR_SearchHistory (state) {
      state.searchHistory = []
      localStorage.setItem('searchHistory', '[]')
    },
    // 删除某个搜索历史
    DELETE_SearchHistory (state, key) {
      for (let i = 0; i < state.searchHistory.length; i++) {
        if (state.searchHistory[i] === key) {
          state.searchHistory.splice(i, 1)
        }
      }
      localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory))
    },
    // 以下是关于搜索的
    // 以下是关于搜索的
    // 重置搜索条件
    RESET_SearchParam (state, data) {
      state.searchResult = []
      state.searchHasMore = true
      state.searchParams.currentPage = 1
      state.searchParams.showCount = 10
      if (data.goodsName) {
        state.searchParams.goodsName = data.goodsName
        state.searchParams.catId = 0
      }
      if (data.catId) {
        state.searchParams.goodsName = ''
        state.searchParams.catId = data.catId
      }
      if (data.type || data.type === 0) { state.searchParams.type = data.type }
    },
    // 更新搜索的请求参数
    UPDATE_SearchParams (state, data) {
      state.searchParams = Object.assign(state.searchParams, data)
      state.searchParams.currentPage++
      if ((state.searchParams.currentPage - 1) * state.searchParams.showCount >= state.searchParams.totalResult) {
        state.searchHasMore = false
      }
    },
    // 追加保存搜索结果
    APPEND_SearchResult (state, data) {
      state.searchResult = state.searchResult.concat(data)
    },
    // 以下是关于消息的
    // 以下是关于消息的
    // 设置是否有消息
    SET_HasNewMessage (state, data) {
      state.hasNewMessage = data
    }
  },
  actions: {
    // 根据过滤条件 搜索商品
    async searchProducts (store, searchParams = null) {
      let done = null
      if (typeof searchParams == 'function') {
        done = searchParams
      }
      if (searchParams != null && typeof searchParams == 'object') {
        store.commit('RESET_SearchParam', searchParams)
        store.commit('ADD_SearchHistory', searchParams)
      }
      if (searchParams === null) {
        searchParams = {}
        store.commit('RESET_SearchParam', searchParams)
      }

      let url = '/mobileGoods/getGoodsList.do'
      let res = await fetch(url, store.state.searchParams)
      if (res.code == 1) {
        store.commit('APPEND_SearchResult', res.data.goodsArray)
        searchParams.totalResult = res.data.totalResult
        store.commit('UPDATE_SearchParams', searchParams)
        if (done) { done() }
      } else {
        toast(res.message)
      }
      // console.log('搜索结果', res)
    },
    // 判断是否有新消息
    async getHasNewMessage (store, searchParams) {
      let userInfo = store.getters.GET_USERINFO
      if (JSON.stringify(userInfo).length < 10) { return }
      let url = '/mobileInstationMessage/isExistUnReadMessage.do'
      let res = await fetch(url, {})
      if (res.code == 1) {
        store.commit('SET_HasNewMessage', res.data.UnReadMessageNumber)
      } else {
        console.log(res.message)
      }
      // console.log('判断是否有新消息', res)
    }
  },
  getters: {
    GET_SearchHistory (state) {
      return state.searchHistory
    },
    GET_SearchResult (state) {
      return state.searchResult
    },
    GET_SearchParam (state) {
      return state.searchParams
    },
    GET_HasNewMessage (state) {
      return state.hasNewMessage
    },
    GET_HasMoreSearchResult (state) {
      return state.searchHasMore
    }
  }
}

export default Index
