import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState, ActionAugments } from '~/types/store'

type Image = {
  url: string
  alt: string
}

export type State = {
  name: string
  price: number
  description: string
  image: Image
}

export type Mutations = {
  setName(state: State, name: string): void
  setImage(state: State, image: Image): void
}

export type Actions = {
  setName(context: ActionAugments<State, Mutations>, name: string): void
  setImage(context: ActionAugments<State, Mutations>, image: Image): void
}

export type Getters = {
  getImage(state: State): Image
  getImageWithDescription(state: State): Image & { description: string }
}

const state = (): State => ({
  name: 'test',
  price: 0,
  description: '',
  image: {
    url: '',
    alt: '',
  },
})

const mutations: MutationTree<State> & Mutations = {
  setImage(state, image): void {
    state.image = image
  },
  setName(state, name): void {
    state.name = name
  },
}

const actions: ActionTree<State, RootState> & Actions = {
  setImage({ commit }, image) {
    commit('setImage', image)
  },
  setName({ commit }, name) {
    commit('setName', name)
  },
}

const getters: GetterTree<State, RootState> & Getters = {
  getImage(state) {
    return state.image
  },
  getImageWithDescription(state) {
    return {
      ...state.image,
      description: state.description,
    }
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
