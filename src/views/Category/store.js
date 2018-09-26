import {fetch} from '@/utils/fetch'
import {toast} from '@/main'

const Category = {
  state: {
    HotCategoryList: [],
    ChildCategoryList: []
  },
  mutations: {
    // 设置热门分类的结果数据
    SET_HotCategoryList (state, list) {
      state.HotCategoryList = list
    },
    // 设置二三级分类的结果数据
    SET_ChildCategoryList (state, list) {
      state.ChildCategoryList = list
    }
  },
  actions: {
    // 获取当前大类下面的热门分类
    async getHotCategoryList (store, catId) {
      let url = '/mobileGoodsCat/getHotGoodsCatList.do'
      let body = {catId: catId}
      let res = await fetch(url, body)
      if (res.code == 1) {
        store.commit('SET_HotCategoryList', res.data.goodsCatArray)
      }
      // console.log('获取当前大类下面的热门分类', res)
    },
    // 获取当前大类下面的所有子分类
    async getChildCategoryList (store, catId) {
      let url = '/mobileGoodsCat/getGoodsCatListByFirstLevelCatId.do'
      let body = {catId: catId}
      let res = await fetch(url, body)
      if (res.code == 1) {
        store.commit('SET_ChildCategoryList', res.data.goodsCatArray)
      } else {
        toast(res.message)
      }
      // console.log('获取当前大类下面的所有子分类', res)
    }
  },
  getters: {
    GET_HotCategoryList (state) {
      return state.HotCategoryList
    },
    GET_ChildCategoryList (state) {
      return state.ChildCategoryList
    },
    GET_HasChridren (state) {
      let counter = 0
      state.ChildCategoryList.map(item => {
        if (item.childrenGoodsCatArray) {
          counter += item.childrenGoodsCatArray.length > 0
        }
      })
      return counter > 0
    },
    GET_HasHotCategory (state) {
      return state.HotCategoryList.length > 0
    }
  }
}

export default Category
