import { Module } from 'vuex'
import { RootState } from '@/types/store'

interface User {
  id: string
  name: string
  email: string
}

export interface UserState {
  currentUser: User | null
  loading: boolean
  test: {
    foo: string
  }
}

const userProfileModule: Module<UserState, RootState> = {
  namespaced: true,
  state: () => ({
    currentUser: null,
    loading: false,
    test: {
      foo: 'bar',
    },
  }),
  mutations: {
    SET_USER(state, user: User | null) {
      state.currentUser = user
    },
  },
  actions: {
    async fetchUser({ commit }): Promise<void> {
      try {
        // Simulating an asynchronous request
        await new Promise((resolve) => setTimeout(resolve, 550))
        const userData: User = {
          email: 'test@example.com',
          id: '222',
          name: 'Test User',
        }
        commit('SET_USER', userData)
      } catch (error) {
        console.error('Error fetching user:', error)
        commit('SET_USER', null)
      }
    },
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
  },
}

export default userProfileModule
