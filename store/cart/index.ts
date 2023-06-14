import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState, ActionAugments } from '~/types/store'

export type State = {
  name: string
}

export type Mutations = {
  setName(state: State, name: string): void
}

export type Actions = {
  setName(context: ActionAugments<State, Mutations>, name: string): void
  removeName(context: ActionAugments<State, Mutations>): Promise<number>
}

export type Getters = {
  nameWithNumber(state: State): string
  nameWithNumber2(state: State): string
}

const state = (): State => ({
  name: 'test',
})

const mutations: MutationTree<State> & Mutations = {
  setName(state: State, name) {
    state.name = name
  },
}

const actions: ActionTree<State, RootState> & Actions = {
  removeName({ commit }) {
    commit('setName', '')
    return Promise.resolve(1)
  },
  setName({ commit }, name) {
    commit('setName', name)
  },
}

const getters: GetterTree<State, RootState> & Getters = {
  nameWithNumber2(state: State): string {
    return state.name + '2'
  },
  nameWithNumber(state): string {
    return state.name + '1'
  },
}

/* export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} */

export default {
  state,
  mutations,
  actions,
  getters,
}
