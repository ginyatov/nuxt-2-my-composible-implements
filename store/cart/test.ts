import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState, ActionAugments } from '~/types/store'

export type State = {
  foo: string
}

export type Mutations = {}

export type Actions = {}

export type Getters = {
  getFoo(state: State): string
}

const state = (): State => ({
  foo: 'foo',
})
const getters: GetterTree<State, RootState> & Getters = {
  getFoo(state) {
    return state.foo
  },
}

export default {
  state,
  getters,
}
