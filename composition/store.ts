import { Store } from 'vuex'
import { useInstance } from '~/composition'
import { RootState } from '~/types/store'

export const useStore = () => {
  const vm = useInstance('useStore')

  const store: Store<RootState> = vm.$store

  return {
    store,
    state: store.state,
    getters: store.getters,
    commit: store.commit,
    dispatch: store.dispatch,
  }
}

export const useGetters = () => {
  const { getters } = useStore()

  return getters
}
