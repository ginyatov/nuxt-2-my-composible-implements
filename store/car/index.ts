import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState, ActionAugments, RootGetters } from '~/types/store'

export type State = {
  car: string
}

export type Mutations = {
  setCar(state: State, car: string): void
}

export type Actions = {
  setCar(context: ActionAugments<State, Mutations>, car: string): void
}

export type Getters = {
  getCar(
    state: State,
    getters: Getters,
    rootState: RootState,
    rootGetters: RootGetters
  ): string
}

const state = (): State => ({
  car: 'foo',
})
const getters: GetterTree<State, RootState> & Getters = {
  getCar(state, getters, rootState, rootGetters) {
    console.log(333)
    console.log(rootGetters['cart/product/getImageWithDescription'])
    return state.car
  },
}

const mutations: MutationTree<State> & Mutations = {
  setCar(state: State, car) {
    state.car = car
  },
}

const actions: ActionTree<State, RootState> & Actions = {
  setCar({ commit }, car) {
    commit('setCar', car)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
