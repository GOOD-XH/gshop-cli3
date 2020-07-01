import {RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT, CLEAR_CART} from "../mutation-types";
import {reqGoods, reqInfo, reqRatings} from "../../api";
import Vue from 'vue'

const state = {
  goods: [],
  ratings: [],
  info: {},
  cartFoods: []
}
const mutations = {
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [ADD_FOOD_COUNT] (state, {food}) {
    if (!food.count) {
      Vue.set(food, 'count' ,1)
      state.cartFoods.push(food)
    } else {
      food.count ++
    }
  },
  [REDUCE_FOOD_COUNT] (state, {food}) {
   if (food.count) {
     food.count --
     if (food.count === 0) {
       state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
     }
   }
  },
  [CLEAR_CART] (state) {
    state.cartFoods.forEach(food => food.count = 0)
    state.cartFoods = []
  }
}
const actions = {
  async getGoods ({commit}) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },
  async getRatings ({commit}) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },
  async getInfo ({commit}) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, {food})
    } else {
      commit(REDUCE_FOOD_COUNT, {food})
    }
  }
}
const getters = {
  totalCount (state) {
    return state.cartFoods.reduce((pre, food)=> pre + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food)=> pre + food.count * food.price, 0)
  },
  totalRatingsCount(state) {
    return state.ratings.length
  },
  positiveRatingsCount(state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
